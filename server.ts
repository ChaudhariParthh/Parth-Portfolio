import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // API route to persist raw original profile image without alteration
  app.post("/api/upload-profile-image", (req, res) => {
    try {
      const { imageData } = req.body;
      if (!imageData) {
        return res.status(400).json({ error: "No image data provided" });
      }

      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const targetPaths = [
        path.join(process.cwd(), "public", "assets", "parth-profile.jpg"),
        path.join(process.cwd(), "dist", "assets", "parth-profile.jpg"),
      ];

      for (const targetPath of targetPaths) {
        const dir = path.dirname(targetPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(targetPath, buffer);
      }

      res.status(200).json({ success: true, path: "/assets/parth-profile.jpg" });
    } catch (error: any) {
      console.error("Failed to save profile image:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Memory cache for GitHub API to prevent rate limits
  const githubCache = {
    data: null as any,
    timestamp: 0,
  };

  // API route for Contact Form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      // Simulate sending email/storing
      console.log(`Contact Form Submission:
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
      `);

      // Artificial delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      res.status(200).json({ success: true, message: "Message received successfully." });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Failed to send message." });
    }
  });

  // API route to proxy GitHub requests (with caching)
  app.get("/api/github/repos", async (req, res) => {
    try {
      const username = process.env.GITHUB_USERNAME || "ChaudhariParthh";
      const cacheTTL = parseInt(process.env.VITE_GITHUB_CACHE_TTL || "900", 10) * 1000;
      const now = Date.now();

      if (githubCache.data && (now - githubCache.timestamp < cacheTTL)) {
        return res.json({ source: "cache", data: githubCache.data });
      }

      const headers: Record<string, string> = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App"
      };

      if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
      }

      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers
      });

      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }

      const repos = await response.json();
      
      // Update cache
      githubCache.data = repos;
      githubCache.timestamp = now;

      res.json({ source: "api", data: repos });
    } catch (error: any) {
      console.error("GitHub API Error:", error.message);
      // Return stale cache if available
      if (githubCache.data) {
        return res.json({ source: "stale_cache", data: githubCache.data });
      }
      res.status(500).json({ error: "Failed to fetch GitHub data" });
    }
  });

  // API route for a specific repo's README
  app.get("/api/github/readme/:repo", async (req, res) => {
    try {
      const username = process.env.GITHUB_USERNAME || "ChaudhariParthh";
      const { repo } = req.params;
      
      const headers: Record<string, string> = {
        "Accept": "application/vnd.github.v3.raw",
        "User-Agent": "Portfolio-App"
      };

      if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
      }

      const response = await fetch(`https://api.github.com/repos/${username}/${repo}/readme`, {
        headers
      });

      if (!response.ok) {
        if (response.status === 404) {
          return res.status(404).json({ error: "README not found" });
        }
        throw new Error(`GitHub API returned ${response.status}`);
      }

      const readme = await response.text();
      res.send(readme);
    } catch (error: any) {
      console.error("GitHub README Error:", error.message);
      res.status(500).json({ error: "Failed to fetch README" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
