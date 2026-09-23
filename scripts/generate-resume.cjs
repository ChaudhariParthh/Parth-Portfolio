const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 32, bottom: 32, left: 40, right: 40 }
});

const outPath = path.join(__dirname, '..', 'public', 'resume.pdf');
doc.pipe(fs.createWriteStream(outPath));

const black = '#111827';
const darkGray = '#374151';
const blue = '#1d4ed8';
const lightLine = '#cbd5e1';

// Header
doc.font('Times-Bold').fontSize(20).fillColor(black).text('PARTH CHAUDHARI', { align: 'center' });
doc.moveDown(0.2);

doc.font('Times-Roman').fontSize(9).fillColor(darkGray);
doc.text(
  'parthchaudhari973@gmail.com  |  +91-8767896259  |  linkedin.com/in/parthchaudhari  |  github.com/ChaudhariParthh  |  Portfolio',
  { align: 'center' }
);
doc.moveDown(0.5);

function sectionHeader(title) {
  doc.moveDown(0.3);
  doc.font('Times-Bold').fontSize(10.5).fillColor(black).text(title.toUpperCase());
  const y = doc.y + 1;
  doc.strokeColor(lightLine).lineWidth(0.75).moveTo(40, y).lineTo(555, y).stroke();
  doc.moveDown(0.4);
}

// PROFESSIONAL SUMMARY
sectionHeader('PROFESSIONAL SUMMARY');
doc.font('Times-Roman').fontSize(9).fillColor(darkGray).text(
  'Entry-level Security Operations Center (SOC) Analyst with hands-on experience in threat detection, alert triage, and incident response workflows. Skilled in developing automated alert management systems, threat intelligence integration, and security event correlation. Proficient in SIEM platforms, log analysis, and real-time security monitoring. Focused on reducing alert fatigue, accelerating threat identification, and supporting effective incident investigation processes.',
  { lineGap: 1.5, align: 'justify' }
);

// TECHNICAL SKILLS
sectionHeader('TECHNICAL SKILLS');
const skillsList = [
  ['Security Monitoring: ', 'SIEM (Splunk, Wazuh), Log Analysis, Alert Triage, Incident Response, MITRE ATT&CK.'],
  ['Networking: ', 'TCP/IP, DNS, HTTP/HTTPS, Firewall, Packet Analysis.'],
  ['Operating Systems: ', 'Windows, Ubuntu Server, Kali Linux.'],
  ['Security Tools: ', 'Wireshark, Burp Suite, VirusTotal, AbuseIPDB, Shodan.'],
  ['Scripting: ', 'Python, Bash, PowerShell.'],
  ['Workflow Automation: ', 'n8n, Make.']
];
skillsList.forEach(([label, val]) => {
  doc.font('Times-Bold').fontSize(9).fillColor(black).text(label, { continued: true });
  doc.font('Times-Roman').fontSize(9).fillColor(darkGray).text(val, { lineGap: 1 });
});

// PROFESSIONAL EXPERIENCE
sectionHeader('PROFESSIONAL EXPERIENCE');
const expTopY = doc.y;
doc.font('Times-Bold').fontSize(9.5).fillColor(black).text('Cybersecurity Virtual Intern AICTE | Palo Alto Networks');
doc.font('Times-Bold').fontSize(9.5).fillColor(black).text('Oct 2024 - Dec 2024', 40, expTopY, { align: 'right', width: 515 });

doc.font('Times-Italic').fontSize(8.5).fillColor(darkGray).text('Remote');
doc.moveDown(0.2);

const expBullets = [
  'Completed a 10-week cybersecurity virtual internship covering cybersecurity, network security, cloud security, and security operations fundamentals.',
  "Built foundational knowledge across security monitoring, network defense, cloud security, and SOC operations through Palo Alto Networks' cybersecurity learning program."
];
expBullets.forEach(b => {
  doc.font('Times-Roman').fontSize(8.8).fillColor(darkGray).text(`•  ${b}`, { indent: 8, lineGap: 1 });
});

// PROJECTS
sectionHeader('PROJECTS');

// Project 1
let pY = doc.y;
doc.font('Times-Bold').fontSize(9.5).fillColor(black).text('TriageForge : SOC Alert Triage & Investigation Automation', { continued: true });
doc.font('Times-Roman').fontSize(9).fillColor(blue).text(' - Github');
doc.font('Times-Italic').fontSize(8.5).fillColor(darkGray).text('n8n Orchestration , Threat Intelligence Integration , AI Analysis');
doc.moveDown(0.15);
[
  'Multi-stage threat investigation pipeline — Wazuh agents detect security events that trigger alerts in Wazuh, which are automatically ingested into TriageForge\'s n8n orchestration',
  'IOC extraction, threat enrichment (VirusTotal, AbuseIPDB, AlienVault OTX), behavioral analysis, and AI-driven recommendations within orchestrated workflows',
  'Slack-integrated approval workflows — real-time analyst notifications with decision routing; Supabase audit logging tracks all triage decisions and incident lifecycle from detection to closure'
].forEach(b => {
  doc.font('Times-Roman').fontSize(8.5).fillColor(darkGray).text(`•  ${b}`, { indent: 8, lineGap: 1 });
});
doc.moveDown(0.3);

// Project 2
pY = doc.y;
doc.font('Times-Bold').fontSize(9.5).fillColor(black).text('Splunk-Security-Monitoring-and-Detection-Lab', { continued: true });
doc.font('Times-Roman').fontSize(9).fillColor(blue).text(' - Github');
doc.font('Times-Italic').fontSize(8.5).fillColor(darkGray).text('Splunk Enterprise, Python, SPL, Security Data Analytics');
doc.moveDown(0.15);
[
  'Built a hands-on Splunk SIEM lab to generate and ingest 170 synthetic Apache, authentication, and firewall security events for centralized monitoring and analysis',
  'Developed SPL-based security searches and detection rules to identify failed logins, brute-force attacks, suspicious s, port activity, HTTP anomalies, and privilege escalation',
  'Created security dashboards and automated alerts to visualize authentication, firewall, and web activity, investigate suspicious incidents, and document findings with recommended response actions'
].forEach(b => {
  doc.font('Times-Roman').fontSize(8.5).fillColor(darkGray).text(`•  ${b}`, { indent: 8, lineGap: 1 });
});
doc.moveDown(0.3);

// Project 3
pY = doc.y;
doc.font('Times-Bold').fontSize(9.5).fillColor(black).text('PrakashSetu: IoT-Based Smart Street Light Monitoring & Fault Detection System', { continued: true });
doc.font('Times-Roman').fontSize(9).fillColor(blue).text(' - Github');
doc.font('Times-Italic').fontSize(8.5).fillColor(darkGray).text('ESP8266, IoT, PIR Sensors, LDR, Telegram Bot');
doc.moveDown(0.15);
[
  'Developed an IoT-based smart street-light system with automated day/night control, motion-based lighting, real-time fault detection, and Telegram notifications for maintenance alerts.',
  'Automated fault reporting and adaptive lighting to reduce manual maintenance effort and energy consumption while improving street-light monitoring and public safety.'
].forEach(b => {
  doc.font('Times-Roman').fontSize(8.5).fillColor(darkGray).text(`•  ${b}`, { indent: 8, lineGap: 1 });
});

// CERTIFICATIONS & ACHIEVEMENTS
sectionHeader('CERTIFICATIONS & ACHIEVEMENTS');
const certsList = [
  'Google AI Professional Certification – Coursera',
  'Google AI for App Building – Coursera',
  'Security Operation Fundamentals – Palo Alto Networks',
  'Elected Vice President of AI&DS Department (3rd Year) — Managed events, coordinated activities, and ensured smooth execution of departmental initiatives.'
];
certsList.forEach(c => {
  doc.font('Times-Roman').fontSize(8.8).fillColor(darkGray).text(`•  ${c}`, { indent: 8, lineGap: 1 });
});

// EDUCATION
sectionHeader('EDUCATION');
const eduY = doc.y;
doc.font('Times-Bold').fontSize(9.5).fillColor(black).text('Bachelor of Engineering, Artificial Intelligence and Data Science');
doc.font('Times-Bold').fontSize(9.5).fillColor(black).text('2022 - 2026', 40, eduY, { align: 'right', width: 515 });
doc.font('Times-Roman').fontSize(8.8).fillColor(darkGray).text("MET's Institute of Engineering, Nashik, Maharashtra | CGPA: 7.3/10");

doc.end();
console.log('Exact resume generated at: ' + outPath);
