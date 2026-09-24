import { Certification } from '../types';

export const profile = {
  name: "PARTH CHAUDHARI",
  title: "AI & DATA SCIENCE ENGINEER",
  email: "chaudhari.parth@outlook.com",
  phone: "+91-8767896259",
  linkedin: "https://linkedin.com/in/parthchaudhari",
  github: "https://github.com/ChaudhariParthh",
  youtube: "https://youtube.com/@securitymatrixx?si=7BbFA5danYy9FULV",
  medium: "https://medium.com/@parthchaudhari973",
  summary: "Entry-level Security Operations Center (SOC) Analyst and AI & Data Science Engineer with hands-on experience in threat detection, alert triage, incident response, and data analytics. I am deeply interested in Cybersecurity, SOC operations, Data Analytics, and PowerBI. I love to hunt bugs and have tested various websites (currently learning and hunting for my first bounty). Highly flexible and always ready to learn anything new. Skilled in developing automated n8n workflows, alert management systems, and real-time security monitoring.",
  domains: ["AI", "Data Science", "Software Engineering", "Cybersecurity", "Automation", "Data Analytics"]
};

export const skills = {
  cybersecurity: ["SIEM (Splunk, Wazuh)", "Log Analysis", "Alert Triage", "Incident Response", "TCP/IP", "DNS", "HTTP/HTTPS", "Firewall", "Bug Hunting", "Web Security Testing"],
  tools: ["Wireshark", "Burp Suite", "VirusTotal", "Shodan", "OpenClaw", "n8n", "Make", "PowerBI"],
  os: ["Windows", "Ubuntu/Server", "Kali Linux"],
  scripting: ["Python", "Bash", "PowerShell"],
  data_ai: ["Data Analytics", "PowerBI Analyst", "AI Analysis", "Splunk SPL"]
};

export const experience = [
  {
    title: "Cybersecurity Virtual Intern",
    company: "AICTE | Palo Alto Networks",
    date: "Oct 2024 - Dec 2024",
    location: "Remote",
    description: [
      "Completed Palo Alto Networks' Cybersecurity Virtual Internship covering Information Security, Network Security, Cloud Security, and Security Operations",
      "Gained applied exposure to data protection, firewall defense, cloud threat management, and incident response techniques used in enterprise security teams"
    ]
  }
];

export const certifications: Certification[] = [
  {
    id: "aws-cloud-practitioner",
    name: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    date: "2024",
    category: "Cloud",
    skills: ["Cloud Architecture", "AWS Core Services", "Security & Compliance", "Cloud Economics"],
    description: "Fundamental understanding of AWS Cloud concepts, security, architecture, pricing, and support.",
    fileName: "aws-cloud-practitioner-essentials.jpg"
  },
  {
    id: "ethical-hacking-bootcamp",
    name: "Ethical Hacking Bootcamp",
    issuer: "Udemy",
    date: "Nov 2024",
    category: "Cybersecurity",
    skills: ["Ethical Hacking", "Penetration Testing", "Network Scanning", "Vulnerability Assessment"],
    description: "Hands-on training in network penetration testing, web app vulnerability scanning, and defense methodologies.",
    fileName: "ethical-hacking-bootcamp-udemy.jpg"
  },
  {
    id: "student-cyber-guardian",
    name: "Student Cyber Guardian Program",
    issuer: "Cyber Security Initiative",
    date: "2024",
    category: "Cybersecurity",
    skills: ["Cyber Hygiene", "Threat Awareness", "Digital Safety", "Incident Reporting"],
    description: "Specialized training focused on student cyber safety, active threat awareness, and defense best practices.",
    fileName: "student-cyber-guardian-program.png"
  },
  {
    id: "palo-alto-cybersecurity",
    name: "Cybersecurity Virtual Internship",
    issuer: "AICTE | Palo Alto Networks",
    date: "Oct 2024 - Dec 2024",
    category: "Cybersecurity",
    skills: ["Palo Alto Firewalls", "Network Security", "Cloud Threat Defense", "SOC Operations"],
    description: "Enterprise cybersecurity internship covering Information Security, Network Security, Cloud Security, and SOC defense.",
    fileName: "palo-alto-networks-cybersecurity.jpg"
  },
  {
    id: "certified-siem-engineer",
    name: "Certified SIEM Engineer",
    issuer: "LetsDefend",
    date: "Feb 2026",
    category: "Cybersecurity",
    skills: ["SIEM Engineering", "Splunk", "Wazuh", "Log Ingestion", "Alert Rule Creation"],
    description: "Comprehensive practical credential in SIEM deployment, log aggregation, correlation rules, and triage workflows.",
    fileName: "certified-siem-engineer-letsdefend.jpg"
  },
  {
    id: "google-ai-professional",
    name: "Google AI Professional Certification",
    issuer: "Coursera | Google",
    date: "2026",
    category: "AI & Data",
    skills: ["Machine Learning", "Generative AI", "Deep Learning", "Data Pipelines"],
    description: "Professional certification covering modern artificial intelligence architectures, machine learning workflows, and model deployment.",
    fileName: "google-ai-professional-certification.jpg"
  },
  {
    id: "google-ai-app-building",
    name: "Google AI for App Building",
    issuer: "Coursera | Google",
    date: "2026",
    category: "AI & Data",
    skills: ["AI Application Development", "Gemini API", "Prompt Engineering", "Full-Stack AI"],
    description: "Comprehensive credential covering building, integrating, and deploying AI-powered applications with modern AI tooling.",
    fileName: "google-ai-for-app-building.jpg"
  },
  {
    id: "security-operation-fundamentals",
    name: "Security Operation Fundamentals",
    issuer: "Palo Alto Networks",
    date: "2024",
    category: "Cybersecurity",
    skills: ["SOC Fundamentals", "Security Operations", "Threat Triage", "Incident Response"],
    description: "Foundational credential covering SOC workflows, security monitoring, alert handling, and network defense architectures.",
    fileName: "security-operation-fundamentals.jpg"
  },
  {
    id: "vp-aids-department",
    name: "Vice President of AI&DS Department (3rd Year)",
    issuer: "MET's Institute of Engineering",
    date: "2024",
    category: "Leadership",
    skills: ["Leadership", "Event Management", "Technical Coordination", "Team Mentorship"],
    description: "Managed departmental technical events, coordinated student hackathons, and ensured smooth execution of engineering initiatives.",
    fileName: "vp-aids-department-met.jpg"
  }
];

export const education = [
  {
    degree: "Bachelor of Engineering, Artificial Intelligence and Data Science",
    institution: "MET, Bhujbal Knowledge City Institute of Engineering, Nashik",
    date: "2022 - 2026",
    details: "First Class Graduate | CGPA: 7.3/10 | Secured admission via MHT-CET (82.55 percentile)"
  },
  {
    degree: "12th Grade (HSC) - PCM",
    institution: "People Bank College",
    date: "2022",
    details: "Score: 84% | Physics, Chemistry, Mathematics"
  },
  {
    degree: "10th Grade (SSC)",
    institution: "St Aloysius High Convent School",
    date: "2020",
    details: "Score: 85%"
  }
];

export const curatedProjects = [
  {
    name: "TriageForge",
    repo: "TriageForge",
    description: "TriageForge helps security teams process suspicious alerts automatically, investigate important indicators, and route incidents for analyst review.",
    problem: "Security Operations Centers suffer from alert fatigue, spending too much time manually investigating and enriching threat alerts.",
    solution: "A multi-stage automated pipeline that ingests alerts, analyzes indicators, and provides AI-driven recommendations.",
    howItWorks: [
      "Wazuh agents detect security events.",
      "Alerts are ingested into n8n orchestration.",
      "IOCs are extracted and enriched via VirusTotal, AbuseIPDB, AlienVault OTX.",
      "AI provides behavioral analysis and recommendations.",
      "Slack notifications route decisions to analysts.",
      "Supabase audit logging tracks all incident lifecycle decisions."
    ],
    tech: ["n8n", "Wazuh", "VirusTotal", "Slack API", "Supabase", "AI Integration"],
    status: "Completed",
    domain: "Cybersecurity & Automation"
  },
  {
    name: "Splunk Security Lab",
    repo: "Splunk-Security-Monitoring-and-Detection-Lab",
    description: "A centralized security monitoring lab that ingests synthetic security events to identify anomalous behaviors and attacks.",
    problem: "Need for practical, hands-on environments to detect modern security threats using enterprise SIEM tools.",
    solution: "Built a Splunk SIEM lab to generate and ingest 170 synthetic security events for centralized analysis.",
    howItWorks: [
      "Generates synthetic Apache, authentication, and firewall events.",
      "Ingests data into Splunk Enterprise.",
      "Uses SPL-based searches to identify failed logins, brute-force, and suspicious port activity.",
      "Visualizes data on security dashboards with automated alerts."
    ],
    tech: ["Splunk Enterprise", "Python", "SPL", "Data Analytics"],
    status: "Completed",
    domain: "Cybersecurity & Data"
  },
  {
    name: "PrakashSetu",
    repo: "PrakashSetu",
    description: "An IoT-based smart street lighting system that automates day/night control and detects real-time faults.",
    problem: "Traditional streetlights waste energy and require manual fault reporting for maintenance.",
    solution: "Automated adaptive lighting with Telegram notifications for immediate maintenance alerts.",
    howItWorks: [
      "ESP8266 gathers data from PIR and LDR sensors.",
      "Controls lighting based on motion and ambient light.",
      "Detects faults in real-time.",
      "Sends automated Telegram notifications to maintenance teams."
    ],
    tech: ["ESP8266", "IoT", "PIR Sensors", "LDR", "Telegram Bot"],
    status: "Completed",
    domain: "Systems & Automation"
  }
];

export const building = [
  {
    name: "Bug Hunting & Web Security Testing",
    description: "Actively testing various websites for vulnerabilities and learning advanced exploitation techniques.",
    tech: ["Burp Suite", "Reconnaissance", "OWASP Top 10"],
    status: "Active Research"
  },
  {
    name: "Data Analytics & PowerBI Dashboards",
    description: "Building interactive data visualizations and business intelligence reports.",
    tech: ["PowerBI", "Data Analytics", "SQL"],
    status: "Active Research"
  }
];

export const exploring = [
  "SOC Operations", "Data Analytics", "PowerBI Analyst Roles", "Bug Bounty Hunting", "n8n Workflows", "Agentic AI", "Security Automation"
];
