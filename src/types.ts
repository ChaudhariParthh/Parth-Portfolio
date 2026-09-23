export type CertificateCategory = 'All' | 'Cybersecurity' | 'Cloud' | 'AI & Data' | 'Leadership';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: 'Cybersecurity' | 'Cloud' | 'AI & Data' | 'Leadership';
  skills: string[];
  description?: string;
  fileName?: string; // Canonical filename if placed in /public/certificates/ (e.g. "aws-cloud-practitioner-essentials.jpg")
  verificationUrl?: string;
  credentialId?: string;
}
