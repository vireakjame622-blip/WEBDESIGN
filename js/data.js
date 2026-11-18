/**
 * InternLens KH – Curated Phnom Penh Tech Internships Dataset (n = 28)
 * Course: CADT Year 2 Fundamental Web Design (Term 1)
 * 
 * Strict 4 Tracks:
 * - Frontend
 * - Backend/Full-Stack
 * - Data/BI
 * - QA/IT Support
 */

const TRACKS = [
  'Frontend',
  'Backend/Full-Stack',
  'Data/BI',
  'QA/IT Support'
];

const ALLOWANCE_TYPES = [
  'Paid',
  'Unpaid',
  'Not Stated'
];

const INTERNSHIPS = [
  // ==================== FRONTEND (7 Roles) ====================
  {
    id: 'intern-01',
    title: 'Junior Frontend Developer Intern',
    company: 'Wing Bank (Cambodia) Plc',
    sector: 'Banking / FinTech',
    roleTrack: 'Frontend',
    allowance: 'Paid',
    salary: '$300 - $400 / month',
    location: 'Phnom Penh',
    postedDate: '2026-11-08',
    mandatorySkills: ['HTML5', 'CSS3', 'JavaScript'],
    preferredSkills: ['Git', 'Figma', 'Tailwind CSS'],
    description: 'Collaborate with the consumer digital banking UI squad to build responsive mobile-first web components. Ideal for students with solid DOM fundamentals and semantic HTML skills.'
  },
  {
    id: 'intern-02',
    title: 'Web UI Engineering Intern',
    company: 'Pathmazing Inc.',
    sector: 'Software Studio',
    roleTrack: 'Frontend',
    allowance: 'Paid',
    salary: '$250 - $350 / month',
    location: 'Phnom Penh',
    postedDate: '2026-11-06',
    preferredSkills: ['TypeScript', 'Git', 'React Basics'],
    mandatorySkills: ['HTML5', 'CSS3', 'JavaScript'],
    description: 'Work alongside senior designers and engineers converting client design prototypes into accessible web applications. Focuses heavily on CSS Grid, Flexbox, and cross-browser responsiveness.'
  },
  {
    id: 'intern-03',
    title: 'Frontend Web Intern',
    company: 'Sala Tech',
    sector: 'EdTech / Digital Services',
    roleTrack: 'Frontend',
    allowance: 'Paid',
    salary: '$200 - $300 / month',
    location: 'Phnom Penh',
    postedDate: '2026-11-04',
    mandatorySkills: ['HTML5', 'CSS3', 'JavaScript'],
    preferredSkills: ['Figma', 'Git', 'REST APIs'],
    description: 'Assist in developing learner-facing web portals and high school orientation platforms. You will practice pure DOM manipulation and responsive layout optimization.'
  },
  {
    id: 'intern-04',
    title: 'Junior Web Designer & UI Intern',
    company: 'Codingate',
    sector: 'Software Studio',
    roleTrack: 'Frontend',
    allowance: 'Paid',
    salary: '$220 - $320 / month',
    location: 'Phnom Penh',
    postedDate: '2026-11-01',
    mandatorySkills: ['HTML5', 'CSS3', 'Figma'],
    preferredSkills: ['JavaScript', 'Tailwind CSS', 'Git'],
    description: 'Bridge creative visual wireframes and clean semantic code for local enterprise clients. Great opportunity to refine typography, color theory, and responsive CSS workflows.'
  },
  {
    id: 'intern-05',
    title: 'Frontend Application Intern',
    company: 'BookMeBus',
    sector: 'E-Commerce / Logistics',
    roleTrack: 'Frontend',
    allowance: 'Paid',
    salary: '$250 - $350 / month',
    location: 'Phnom Penh',
    postedDate: '2026-10-29',
    mandatorySkills: ['HTML5', 'CSS3', 'JavaScript'],
    preferredSkills: ['Git', 'REST APIs', 'Postman'],
    description: 'Build fast, mobile-friendly ticket booking interfaces and customer checkout screens across ASEAN routes. Gain hands-on experience handling API responses and real-time form validation.'
  },
  {
    id: 'intern-06',
    title: 'Web Content & UI Intern',
    company: 'Sabay Digital Corp',
    sector: 'Digital Entertainment & Media',
    roleTrack: 'Frontend',
    allowance: 'Not Stated',
    salary: 'Stipend Provided',
    location: 'Phnom Penh',
    postedDate: '2026-10-25',
    mandatorySkills: ['HTML5', 'CSS3', 'JavaScript'],
    preferredSkills: ['Figma', 'Git', 'SEO Basics'],
    description: 'Support interactive landing page production for news and digital esports properties. You will optimize web assets, write clean markup, and improve page loading performance.'
  },
  {
    id: 'intern-07',
    title: 'Junior Frontend Intern',
    company: 'CamCyber Digital Solution',
    sector: 'Web & Mobile Development',
    roleTrack: 'Frontend',
    allowance: 'Unpaid',
    salary: 'Unpaid (Academic Credit)',
    location: 'Phnom Penh',
    postedDate: '2026-10-20',
    mandatorySkills: ['HTML5', 'CSS3'],
    preferredSkills: ['JavaScript', 'Figma', 'Git'],
    description: 'Shadow frontend leads on client corporate web projects while fulfilling Year 2 academic internship requirements. Focuses on learning semantic HTML standards and modern CSS layout techniques.'
  },

  // ==================== BACKEND / FULL-STACK (8 Roles) ====================
  {
    id: 'intern-08',
    title: 'Junior Backend Engineering Intern',
    company: 'ABA Bank',
    sector: 'Banking / FinTech',
    roleTrack: 'Backend/Full-Stack',
    allowance: 'Paid',
    salary: '$350 - $450 / month',
    location: 'Phnom Penh',
    postedDate: '2026-11-10',
    mandatorySkills: ['Node.js', 'SQL', 'Git'],
    preferredSkills: ['Docker', 'REST APIs', 'PostgreSQL'],
    description: 'Assist in maintaining high-volume internal service APIs and transaction processing pipelines. Learn enterprise software architecture, database indexing, and automated unit testing.'
  },
  {
    id: 'intern-09',
    title: 'Cloud & Backend Developer Intern',
    company: 'Smart Axiata',
    sector: 'Telecommunications',
    roleTrack: 'Backend/Full-Stack',
    allowance: 'Paid',
    salary: '$300 - $400 / month',
    location: 'Phnom Penh',
    postedDate: '2026-11-06',
    mandatorySkills: ['Python', 'SQL', 'Git'],
    preferredSkills: ['Docker', 'Linux / Bash', 'REST APIs'],
    description: 'Support telecom automation scripts and cloud API services within the Smart digital engineering division. Excellent for students building backend web systems and server deployment knowledge.'
  },
  {
    id: 'intern-10',
    title: 'Core Banking API Developer Intern',
    company: 'Morakot Technology',
    sector: 'Banking / FinTech',
    roleTrack: 'Backend/Full-Stack',
    allowance: 'Paid',
    salary: '$280 - $380 / month',
    location: 'Phnom Penh',
    postedDate: '2026-11-02',
    mandatorySkills: ['Node.js', 'Express', 'SQL'],
    preferredSkills: ['PostgreSQL', 'Postman', 'Git'],
    description: 'Develop RESTful endpoints for cloud core banking solutions used by microfinance institutions across Cambodia. Gain deep insights into financial ledger transactions and relational data models.'
  },
  {
    id: 'intern-11',
    title: 'Payment Gateway API Intern',
    company: 'Bongloy Payments',
    sector: 'Banking / FinTech',
    roleTrack: 'Backend/Full-Stack',
    allowance: 'Paid',
    salary: '$300 - $420 / month',
    location: 'Phnom Penh',
    postedDate: '2026-10-31',
    mandatorySkills: ['JavaScript', 'Node.js', 'Git'],
    preferredSkills: ['REST APIs', 'PostgreSQL', 'Docker'],
    description: 'Build and document developer-friendly payment checkout webhooks and merchant integration APIs. Focuses on secure HTTP requests, cryptographic signatures, and asynchronous processing.'
  },
  {
    id: 'intern-12',
    title: 'Junior Full-Stack Web Intern',
    company: 'NHAM24',
    sector: 'E-Commerce / Logistics',
    roleTrack: 'Backend/Full-Stack',
    allowance: 'Paid',
    salary: '$250 - $350 / month',
    location: 'Phnom Penh',
    postedDate: '2026-10-27',
    mandatorySkills: ['HTML5', 'JavaScript', 'Node.js'],
    preferredSkills: ['SQL', 'Git', 'REST APIs'],
    description: 'Implement merchant partner dashboard features connecting web frontends to ordering backend services. Provides comprehensive full-stack exposure across data fetching, rendering, and database queries.'
  },
  {
    id: 'intern-13',
    title: 'Web Application Backend Intern',
    company: 'BanhJi',
    sector: 'Banking / FinTech',
    roleTrack: 'Backend/Full-Stack',
    allowance: 'Not Stated',
    salary: 'Meal & Travel Stipend',
    location: 'Phnom Penh',
    postedDate: '2026-10-24',
    mandatorySkills: ['Node.js', 'SQL', 'Git'],
    preferredSkills: ['Express', 'Excel', 'REST APIs'],
    description: 'Support small-business accounting integrations and automated invoicing web services. Learn how financial transaction records are securely validated, stored, and exported.'
  },
  {
    id: 'intern-14',
    title: 'Full-Stack Development Intern',
    company: 'Ten100 Digital',
    sector: 'Software Studio',
    roleTrack: 'Backend/Full-Stack',
    allowance: 'Paid',
    salary: '$250 - $350 / month',
    location: 'Phnom Penh',
    postedDate: '2026-10-18',
    mandatorySkills: ['JavaScript', 'HTML5', 'SQL'],
    preferredSkills: ['Node.js', 'Git', 'CSS3'],
    description: 'Collaborate in agile sprints delivering custom web portals and content management systems. Perfect for students seeking balanced exposure to both user interfaces and backend logic.'
  },
  {
    id: 'intern-15',
    title: 'Backend Systems Intern',
    company: 'Kess Innovation',
    sector: 'Banking / FinTech',
    roleTrack: 'Backend/Full-Stack',
    allowance: 'Unpaid',
    salary: 'Unpaid (Mentorship Program)',
    location: 'Phnom Penh',
    postedDate: '2026-10-15',
    mandatorySkills: ['Python', 'SQL'],
    preferredSkills: ['Git', 'Linux / Bash', 'REST APIs'],
    description: 'Participate in structured code reviews and backend database design workshops under experienced engineers. Ideal for motivated students who want rigorous server-side foundation practice.'
  },

  // ==================== DATA / BI (7 Roles) ====================
  {
    id: 'intern-16',
    title: 'Business Intelligence Intern',
    company: 'ABA Bank',
    sector: 'Banking / FinTech',
    roleTrack: 'Data/BI',
    allowance: 'Paid',
    salary: '$320 - $420 / month',
    location: 'Phnom Penh',
    postedDate: '2026-11-09',
    mandatorySkills: ['SQL', 'Power BI', 'Excel'],
    preferredSkills: ['Python', 'Data Analysis', 'Git'],
    description: 'Extract customer banking KPIs and design automated visual dashboards for business branch managers. Focuses on advanced SQL aggregation, relational queries, and executive data presentation.'
  },
  {
    id: 'intern-17',
    title: 'Data Analytics & Reporting Intern',
    company: 'Smart Axiata',
    sector: 'Telecommunications',
    roleTrack: 'Data/BI',
    allowance: 'Paid',
    salary: '$300 - $400 / month',
    location: 'Phnom Penh',
    postedDate: '2026-11-05',
    mandatorySkills: ['SQL', 'Python', 'Excel'],
    preferredSkills: ['Pandas', 'Power BI', 'Data Analysis'],
    description: 'Analyze network subscriber churn and mobile data usage patterns using Python and database queries. You will clean large telecom datasets and generate automated weekly insights reports.'
  },
  {
    id: 'intern-18',
    title: 'Junior Data Engineer Intern',
    company: 'Wing Bank (Cambodia) Plc',
    sector: 'Banking / FinTech',
    roleTrack: 'Data/BI',
    allowance: 'Paid',
    salary: '$320 - $450 / month',
    location: 'Phnom Penh',
    postedDate: '2026-10-30',
    mandatorySkills: ['SQL', 'Python', 'Git'],
    preferredSkills: ['PostgreSQL', 'Linux / Bash', 'Docker'],
    description: 'Support data warehouse pipelines and verify financial reconciliation data feeds across banking channels. Strengthen your understanding of database schemas, ETL jobs, and query performance.'
  },
  {
    id: 'intern-19',
    title: 'Commercial Data Analyst Intern',
    company: 'Chip Mong Group',
    sector: 'Conglomerate / Enterprise Tech',
    roleTrack: 'Data/BI',
    allowance: 'Paid',
    salary: '$280 - $380 / month',
    location: 'Phnom Penh',
    postedDate: '2026-10-26',
    mandatorySkills: ['Excel', 'SQL', 'Data Analysis'],
    preferredSkills: ['Power BI', 'Python', 'Git'],
    description: 'Consolidate sales performance and supply chain metrics across retail, manufacturing, and beverage units. Practical application of spreadsheet modeling and multi-table SQL queries.'
  },
  {
    id: 'intern-20',
    title: 'Database & MIS Intern',
    company: 'ACLEDA Bank Plc',
    sector: 'Banking / FinTech',
    roleTrack: 'Data/BI',
    allowance: 'Paid',
    salary: '$250 - $350 / month',
    location: 'Phnom Penh',
    postedDate: '2026-10-22',
    mandatorySkills: ['SQL', 'Excel'],
    preferredSkills: ['PostgreSQL', 'Data Analysis', 'Linux / Bash'],
    description: 'Assist the Management Information Systems department in generating statutory regulatory reports and monitoring database health. Solid grounding in formal banking data compliance.'
  },
  {
    id: 'intern-21',
    title: 'E-Commerce Operations Data Intern',
    company: 'Delishop.asia',
    sector: 'E-Commerce / Logistics',
    roleTrack: 'Data/BI',
    allowance: 'Not Stated',
    salary: 'Monthly Allowance Provided',
    location: 'Phnom Penh',
    postedDate: '2026-10-17',
    mandatorySkills: ['Excel', 'Data Analysis'],
    preferredSkills: ['SQL', 'Python', 'Google Sheets'],
    description: 'Monitor daily grocery delivery fulfillment rates, inventory reorder triggers, and customer retention. Translates operational delivery logs into actionable inventory summaries.'
  },
  {
    id: 'intern-22',
    title: 'Audience Insights Data Intern',
    company: 'Mediaload',
    sector: 'Digital Entertainment & Media',
    roleTrack: 'Data/BI',
    allowance: 'Unpaid',
    salary: 'Unpaid (Academic Internship)',
    location: 'Phnom Penh',
    postedDate: '2026-10-12',
    mandatorySkills: ['Excel', 'Data Analysis'],
    preferredSkills: ['SQL', 'Python', 'Power BI'],
    description: 'Evaluate social engagement numbers, video viewing retention curves, and reader demographics for online publications. Great starting ground for students interested in digital media analytics.'
  },

  // ==================== QA / IT SUPPORT (6 Roles) ====================
  {
    id: 'intern-23',
    title: 'Software Quality Assurance (QA) Intern',
    company: 'Pathmazing Inc.',
    sector: 'Software Studio',
    roleTrack: 'QA/IT Support',
    allowance: 'Paid',
    salary: '$250 - $350 / month',
    location: 'Phnom Penh',
    postedDate: '2026-11-07',
    mandatorySkills: ['Manual Testing', 'Test Cases', 'Jira'],
    preferredSkills: ['Postman', 'Git', 'Selenium'],
    description: 'Execute structured functional test matrices and report reproducible software defects for web and mobile apps. Work directly with development squads during pre-release regression sprints.'
  },
  {
    id: 'intern-24',
    title: 'QA & Software Test Intern',
    company: 'TrueMoney Cambodia',
    sector: 'Banking / FinTech',
    roleTrack: 'QA/IT Support',
    allowance: 'Paid',
    salary: '$250 - $350 / month',
    location: 'Phnom Penh',
    postedDate: '2026-11-03',
    mandatorySkills: ['Manual Testing', 'Test Cases', 'Postman'],
    preferredSkills: ['SQL', 'Jira', 'Git'],
    description: 'Validate agent wallet mobile transactions and payment gateway REST APIs for correctness. You will verify expected HTTP response status codes and test boundary edge cases.'
  },
  {
    id: 'intern-25',
    title: 'IT Helpdesk & Systems Support Intern',
    company: 'Cellcard (CamGSM)',
    sector: 'Telecommunications',
    roleTrack: 'QA/IT Support',
    allowance: 'Paid',
    salary: '$220 - $300 / month',
    location: 'Phnom Penh',
    postedDate: '2026-10-28',
    mandatorySkills: ['Technical Support', 'Networking Basics'],
    preferredSkills: ['Linux / Bash', 'Jira', 'Hardware Troubleshooting'],
    description: 'Provide level-1 technical support for workstation configuration, LAN connectivity, and office peripherals. Build solid understanding of corporate IT networks and troubleshooting steps.'
  },
  {
    id: 'intern-26',
    title: 'IT Operations & Infrastructure Intern',
    company: 'Prince Bank Plc',
    sector: 'Banking / FinTech',
    roleTrack: 'QA/IT Support',
    allowance: 'Not Stated',
    salary: 'Stipend Provided',
    location: 'Phnom Penh',
    postedDate: '2026-10-21',
    mandatorySkills: ['Networking Basics', 'Technical Support'],
    preferredSkills: ['Linux / Bash', 'SQL', 'Git'],
    description: 'Assist system administrators in routine server monitoring, hardware inventory audits, and workstation setup. Excellent environment to observe enterprise banking IT security policies.'
  },
  {
    id: 'intern-27',
    title: 'Application Testing & Support Intern',
    company: 'Canadia Bank Plc',
    sector: 'Banking / FinTech',
    roleTrack: 'QA/IT Support',
    allowance: 'Paid',
    salary: '$280 - $360 / month',
    location: 'Phnom Penh',
    postedDate: '2026-10-19',
    mandatorySkills: ['Manual Testing', 'SQL', 'Test Cases'],
    preferredSkills: ['Postman', 'Excel', 'Jira'],
    description: 'Verify banking portal features against functional specifications and query staging databases to validate data integrity. Practical blend of software QA and relational database inspection.'
  },
  {
    id: 'intern-28',
    title: 'Junior QA & Automation Intern',
    company: 'Wowee Digital',
    sector: 'Web & Mobile Development',
    roleTrack: 'QA/IT Support',
    allowance: 'Unpaid',
    salary: 'Unpaid (Training Program)',
    location: 'Phnom Penh',
    postedDate: '2026-10-14',
    mandatorySkills: ['Manual Testing', 'Test Cases'],
    preferredSkills: ['JavaScript', 'Postman', 'Git'],
    description: 'Learn foundational software quality assurance methodologies while testing responsive websites across devices. Great first internship for students developing an eye for detail.'
  }
];
