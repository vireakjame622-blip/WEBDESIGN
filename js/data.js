/* ==========================================================================
   CareerConnect – Realistic Sample Dataset & State Persistence
   Context: Cambodia Academy of Digital Technology (CADT) & Cambodian Tech Ecosystem
   ========================================================================== */

const STORAGE_KEY = 'careerconnect_state_v1';

const DEFAULT_DATA = {
  role: 'guest', // 'guest' | 'student' | 'company' | 'admin' | 'design-system'
  currentRoute: 'landing',
  selectedJobId: 'job-1',
  currentStudentId: 'stu-1',
  currentCompanyId: 'comp-1',

  // Filters for Find Jobs
  jobFilters: {
    search: '',
    category: 'All',
    location: 'All',
    jobType: 'All',
    experience: 'All',
    skill: ''
  },

  categories: [
    { id: 'cat-1', name: 'Software Engineering', icon: 'code', active: true, description: 'Frontend, Backend, Mobile & Full-Stack development' },
    { id: 'cat-2', name: 'Data Science & AI', icon: 'cpu', active: true, description: 'Machine Learning, Data Analytics & BI' },
    { id: 'cat-3', name: 'UI/UX & Product Design', icon: 'layout', active: true, description: 'Product Design, Figma Prototyping & User Research' },
    { id: 'cat-4', name: 'Cybersecurity', icon: 'shield', active: true, description: 'SOC Analysis, Penetration Testing & InfoSec' },
    { id: 'cat-5', name: 'Networking & Telecom', icon: 'wifi', active: true, description: 'Cloud Infrastructure, DevOps & Network Engineering' },
    { id: 'cat-6', name: 'Digital Business & E-Commerce', icon: 'briefcase', active: true, description: 'Digital Marketing, Product Ops & FinTech' }
  ],

  companies: [
    {
      id: 'comp-1',
      name: 'Wing Bank (Cambodia) Plc',
      initials: 'WB',
      color: '#16A34A',
      industry: 'FinTech & Digital Banking',
      location: 'Phnom Penh',
      size: '500+ Employees',
      website: 'https://wingbank.com.kh',
      verified: true,
      status: 'Active',
      description: 'Leading digital banking and financial technology provider in Cambodia, empowering millions with mobile payments and digital banking solutions.'
    },
    {
      id: 'comp-2',
      name: 'Pathmazing Inc.',
      initials: 'PM',
      color: '#2563EB',
      industry: 'Software & Product Studio',
      location: 'Phnom Penh',
      size: '150–300 Employees',
      website: 'https://pathmazing.com',
      verified: true,
      status: 'Active',
      description: 'Award-winning Cambodian software engineering firm building enterprise platforms, mobile apps, and AI-enabled solutions for global clients.'
    },
    {
      id: 'comp-3',
      name: 'Smart Axiata',
      initials: 'SA',
      color: '#10B981',
      industry: 'Telecommunications & Digital Services',
      location: 'Phnom Penh',
      size: '1000+ Employees',
      website: 'https://smart.com.kh',
      verified: true,
      status: 'Active',
      description: 'Cambodia’s premier telecommunications and digital lifestyle company investing heavily in 5G, cloud, and university tech talent.'
    },
    {
      id: 'comp-4',
      name: 'ABA Bank Digital Lab',
      initials: 'AB',
      color: '#0284C7',
      industry: 'Banking & FinTech',
      location: 'Phnom Penh',
      size: '500+ Employees',
      website: 'https://ababank.com',
      verified: true,
      status: 'Active',
      description: 'Digital innovation division driving ABA Mobile, API banking, cybersecurity, and data engineering across Cambodia.'
    },
    {
      id: 'comp-5',
      name: 'BookMeBus',
      initials: 'BM',
      color: '#EA580C',
      industry: 'Travel Tech & E-Commerce',
      location: 'Phnom Penh (Hybrid)',
      size: '50–100 Employees',
      website: 'https://bookmebus.com',
      verified: true,
      status: 'Active',
      description: 'Cambodia’s leading online ticketing and mobility platform connecting travelers across Southeast Asia.'
    },
    {
      id: 'comp-6',
      name: 'Codingate Technology',
      initials: 'CG',
      color: '#7C3AED',
      industry: 'Web & Mobile Solutions',
      location: 'Siem Reap / Remote',
      size: '30–60 Employees',
      website: 'https://codingate.com',
      verified: false,
      status: 'Pending',
      description: 'Social enterprise tech agency crafting digital platforms, branding, and e-commerce systems for local SMEs.'
    }
  ],

  jobs: [
    {
      id: 'job-1',
      companyId: 'comp-1',
      title: 'Frontend Developer Intern (React / JavaScript)',
      category: 'Software Engineering',
      location: 'Phnom Penh',
      jobType: 'Internship',
      experienceLevel: 'Student / No Experience',
      salary: '$300 – $450 / month',
      postedDate: '2026-11-10',
      deadline: '2026-12-05',
      featured: true,
      status: 'Active',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Git', 'REST API'],
      description: 'Join Wing Bank’s Digital Channels squad to help build responsive, accessible web dashboards and customer onboarding flows used across Cambodia. Ideal for CADT 3rd- or 4th-year Computer Science students.',
      responsibilities: [
        'Build reusable UI components using React, HTML5, and modern CSS.',
        'Collaborate with UI/UX designers to translate Figma wireframes into pixel-accurate interfaces.',
        'Integrate frontend modules with Node.js / RESTful APIs.',
        'Participate in weekly sprint reviews and code quality walkthroughs.'
      ],
      qualifications: [
        'Currently pursuing a B.Sc. in Computer Science, Software Engineering, or related field at CADT or accredited university.',
        'Solid understanding of HTML, CSS, ES6+ JavaScript, and responsive web design.',
        'Familiarity with Git version control and component-based UI.',
        'Strong problem-solving mindset and eagerness to learn in a fast-paced FinTech team.'
      ]
    },
    {
      id: 'job-2',
      companyId: 'comp-2',
      title: 'UI/UX Design Intern',
      category: 'UI/UX & Product Design',
      location: 'Phnom Penh',
      jobType: 'Internship',
      experienceLevel: 'Student / No Experience',
      salary: '$250 – $400 / month',
      postedDate: '2026-11-09',
      deadline: '2026-12-01',
      featured: true,
      status: 'Active',
      skills: ['Figma', 'Wireframing', 'Design Systems', 'User Research', 'Prototyping'],
      description: 'Work alongside senior product designers at Pathmazing to craft intuitive mobile and web experiences. You will conduct user interviews, design component libraries, and build interactive Figma prototypes.',
      responsibilities: [
        'Create user flows, wireframes, and high-fidelity mockups in Figma.',
        'Maintain and expand reusable design system tokens and components.',
        'Assist in usability testing sessions with local university students and users.',
        'Hand off annotated designs smoothly to frontend engineers.'
      ],
      qualifications: [
        'Portfolio or academic projects demonstrating Figma and UI/UX thinking.',
        'Understanding of typography, color contrast, spacing, and mobile-first design.',
        'Good communication skills in Khmer and English.'
      ]
    },
    {
      id: 'job-3',
      companyId: 'comp-3',
      title: 'Junior Data Science & Analytics Associate',
      category: 'Data Science & AI',
      location: 'Phnom Penh',
      jobType: 'Full-time',
      experienceLevel: 'Entry Level',
      salary: '$650 – $900 / month',
      postedDate: '2026-11-08',
      deadline: '2026-12-12',
      featured: true,
      status: 'Active',
      skills: ['Python', 'SQL', 'MySQL', 'Data Visualization', 'Machine Learning'],
      description: 'Help Smart Axiata turn telecom and digital service datasets into actionable insights. Ideal for graduating Data Science students who love SQL, Python, and predictive modeling.',
      responsibilities: [
        'Write optimized SQL queries to extract and clean customer usage metrics.',
        'Build dashboards and visual reports for product and marketing stakeholders.',
        'Assist senior data scientists in training churn-prediction models in Python.',
        'Document data pipelines and ensure data privacy compliance.'
      ],
      qualifications: [
        'Bachelor’s degree (or final-year student) in Data Science, Computer Science, or Statistics.',
        'Proficiency in Python (pandas, scikit-learn) and relational databases (MySQL / PostgreSQL).',
        'Experience presenting analytical findings clearly.'
      ]
    },
    {
      id: 'job-4',
      companyId: 'comp-4',
      title: 'Cybersecurity Operations (SOC) Intern',
      category: 'Cybersecurity',
      location: 'Phnom Penh',
      jobType: 'Internship',
      experienceLevel: 'Student / No Experience',
      salary: '$350 – $500 / month',
      postedDate: '2026-11-07',
      deadline: '2026-11-30',
      featured: true,
      status: 'Active',
      skills: ['Linux', 'Network Security', 'SIEM', 'TCP/IP', 'Python'],
      description: 'Gain hands-on exposure to enterprise security monitoring, threat detection, and vulnerability assessment inside ABA Bank’s Digital Security Center.',
      responsibilities: [
        'Monitor SIEM alerts and assist analysts in triaging potential security incidents.',
        'Perform routine vulnerability scans and document remediation steps.',
        'Support phishing simulation awareness campaigns and security audits.'
      ],
      qualifications: [
        'Pursuing a degree in Cybersecurity, Telecommunications & Networking, or Computer Science.',
        'Foundational knowledge of TCP/IP, Linux command line, and OWASP Top 10.'
      ]
    },
    {
      id: 'job-5',
      companyId: 'comp-5',
      title: 'Backend Node.js & MySQL Developer (Part-Time)',
      category: 'Software Engineering',
      location: 'Hybrid',
      jobType: 'Part-time',
      experienceLevel: 'Entry Level',
      salary: '$450 – $650 / month',
      postedDate: '2026-11-06',
      deadline: '2026-12-15',
      featured: false,
      status: 'Active',
      skills: ['Node.js', 'Express', 'MySQL', 'JavaScript', 'REST API'],
      description: 'Flexible part-time role designed around university class schedules. Help BookMeBus enhance booking APIs, payment webhook handlers, and MySQL query performance.',
      responsibilities: [
        'Develop and maintain RESTful endpoints using Node.js and Express.',
        'Design normalized MySQL schemas, indexes, and stored queries.',
        'Write unit and integration tests for booking microservices.'
      ],
      qualifications: [
        'Strong grasp of JavaScript/Node.js asynchronous programming and MySQL.',
        'Ability to commit 20–24 hours per week in a hybrid Phnom Penh setup.'
      ]
    },
    {
      id: 'job-6',
      companyId: 'comp-3',
      title: 'Cloud & Network Engineering Trainee',
      category: 'Networking & Telecom',
      location: 'Phnom Penh',
      jobType: 'Internship',
      experienceLevel: 'Student / No Experience',
      salary: '$300 / month',
      postedDate: '2026-11-04',
      deadline: '2026-12-10',
      featured: false,
      status: 'Active',
      skills: ['Networking', 'Linux', 'Docker', 'AWS', 'Routing & Switching'],
      description: 'A 6-month structured engineering traineeship for Telecommunications & Networking majors to master enterprise routing, Linux servers, and containerized cloud deployments.',
      responsibilities: [
        'Assist in configuring switches, firewalls, and VPN tunnels in staging labs.',
        'Automate Linux server health checks using Bash and Python.',
        'Support Docker-based service deployments and uptime monitoring.'
      ],
      qualifications: [
        'CADT Telecom & Networking student (Year 3 or 4) or recent graduate.',
        'CCNA coursework or equivalent networking lab experience.'
      ]
    },
    {
      id: 'job-7',
      companyId: 'comp-6',
      title: 'Digital Marketing & E-Commerce Intern',
      category: 'Digital Business & E-Commerce',
      location: 'Remote',
      jobType: 'Internship',
      experienceLevel: 'Student / No Experience',
      salary: '',
      postedDate: '2026-11-02',
      deadline: '2026-12-08',
      featured: false,
      status: 'Active',
      skills: ['SEO', 'Social Media', 'Content Strategy', 'Google Analytics', 'E-Commerce'],
      description: 'Support local Cambodian SMEs launching online storefronts. Learn practical SEO, campaign analytics, and conversion optimization from our remote team.',
      responsibilities: [
        'Audit client e-commerce product pages and improve SEO copy.',
        'Track campaign metrics in Google Analytics and prepare weekly summaries.',
        'Assist with social media scheduling and merchant onboarding guides.'
      ],
      qualifications: [
        'Enrolled in E-Commerce, Digital Business, or Marketing degree.',
        'Creative writing skills in Khmer and English.'
      ]
    },
    {
      id: 'job-8',
      companyId: 'comp-1',
      title: 'Junior QA Automation Engineer',
      category: 'Software Engineering',
      location: 'Phnom Penh',
      jobType: 'Full-time',
      experienceLevel: 'Junior',
      salary: '$600 – $850 / month',
      postedDate: '2026-10-29',
      deadline: '2026-11-28',
      featured: false,
      status: 'Active',
      skills: ['JavaScript', 'Playwright', 'Testing', 'REST API', 'Git'],
      description: 'Ensure high reliability across Wing Bank web and mobile banking releases by building automated end-to-end test suites and API verification scripts.',
      responsibilities: [
        'Author automated UI and API regression tests.',
        'Collaborate with developers to reproduce and verify bug fixes.',
        'Maintain CI test pipelines and release checklists.'
      ],
      qualifications: [
        '1 year of internship or project experience in QA or software development.',
        'Familiarity with JavaScript testing frameworks and Postman.'
      ]
    }
  ],

  students: [
    {
      id: 'stu-1',
      fullName: 'Sokha Chan',
      initials: 'SC',
      email: 'sokha.chan@student.cadt.edu.kh',
      phone: '+855 12 489 320',
      location: 'Phnom Penh, Cambodia',
      university: 'Cambodia Academy of Digital Technology (CADT)',
      major: 'B.Sc. in Computer Science',
      year: 'Year 3 (Class of 2027)',
      gpa: '3.78 / 4.00',
      headline: 'Aspiring Full-Stack & Frontend Engineer | CADT Computer Science Student',
      bio: 'Passionate Computer Science junior at CADT focused on building clean, accessible web applications with React, Node.js, and MySQL. Looking for a dynamic internship to apply engineering fundamentals to real Cambodian products.',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MySQL', 'Figma', 'Git', 'REST API'],
      education: [
        {
          school: 'Cambodia Academy of Digital Technology (CADT)',
          degree: 'Bachelor of Science in Computer Science',
          period: '2023 – 2027 (Expected)',
          details: 'Dean’s List Scholar • Relevant coursework: Data Structures, Web Development, Database Systems (MySQL), UI/UX Design.'
        },
        {
          school: 'Sisowath High School',
          degree: 'High School Diploma (Grade A)',
          period: '2020 – 2023',
          details: 'Mathematics & Science Track.'
        }
      ],
      experience: [
        {
          role: 'Student Web Lab Assistant',
          org: 'CADT Innovation Center',
          period: 'May 2026 – Present',
          details: 'Mentored Year 1–2 students in HTML/CSS, JavaScript fundamentals, and Git workflows during weekly coding clinics.'
        }
      ],
      projects: [
        {
          name: 'CADT Campus Study Hub',
          tech: 'React, Node.js, MySQL',
          link: 'github.com/sokhachan/cadt-study-hub',
          summary: 'Peer-to-peer course note sharing and study group scheduler used by 180+ CADT students.'
        },
        {
          name: 'Khmer FinLit Budget Tracker',
          tech: 'HTML, CSS, JavaScript, Chart.js',
          link: 'github.com/sokhachan/khmer-budget',
          summary: 'Bilingual student expense tracker supporting KHR and USD budgeting.'
        }
      ],
      cv: {
        fileName: 'Sokha_Chan_CADT_CV_2026.pdf',
        fileSize: '420 KB',
        uploadedAt: '2026-11-05'
      },
      status: 'Active'
    },
    {
      id: 'stu-2',
      fullName: 'Dara Pich',
      initials: 'DP',
      email: 'dara.pich@student.cadt.edu.kh',
      phone: '+855 96 712 441',
      location: 'Phnom Penh, Cambodia',
      university: 'Cambodia Academy of Digital Technology (CADT)',
      major: 'B.Sc. in Data Science',
      year: 'Year 4 (Class of 2026)',
      gpa: '3.85 / 4.00',
      headline: 'Final-Year Data Science Major | Python, SQL & ML Enthusiast',
      bio: 'Data Science senior specializing in predictive analytics and business intelligence.',
      skills: ['Python', 'SQL', 'MySQL', 'Machine Learning', 'Data Visualization', 'Power BI'],
      education: [
        {
          school: 'Cambodia Academy of Digital Technology (CADT)',
          degree: 'Bachelor of Science in Data Science',
          period: '2022 – 2026',
          details: 'Capstone Project: Khmer Sentiment Analysis for Local E-Commerce.'
        }
      ],
      experience: [],
      projects: [
        {
          name: 'Phnom Penh Traffic Predictor',
          tech: 'Python, scikit-learn',
          link: 'github.com/darapich/traffic-ml',
          summary: 'Time-series congestion forecasting notebook.'
        }
      ],
      cv: {
        fileName: 'Dara_Pich_DataScience_CV.pdf',
        fileSize: '510 KB',
        uploadedAt: '2026-11-01'
      },
      status: 'Active'
    },
    {
      id: 'stu-3',
      fullName: 'Malis Keo',
      initials: 'MK',
      email: 'malis.keo@student.cadt.edu.kh',
      phone: '+855 77 305 890',
      location: 'Phnom Penh, Cambodia',
      university: 'Cambodia Academy of Digital Technology (CADT)',
      major: 'B.Sc. in E-Commerce',
      year: 'Year 3',
      gpa: '3.62 / 4.00',
      headline: 'UI/UX & Digital Product Student Designer',
      bio: 'Passionate about crafting human-centered digital products in Figma.',
      skills: ['Figma', 'Wireframing', 'User Research', 'Design Systems', 'HTML/CSS'],
      education: [
        {
          school: 'Cambodia Academy of Digital Technology (CADT)',
          degree: 'Bachelor of Science in E-Commerce',
          period: '2023 – 2027',
          details: 'Member of CADT Design Guild.'
        }
      ],
      experience: [],
      projects: [],
      cv: {
        fileName: 'Malis_Keo_Design_Portfolio_CV.pdf',
        fileSize: '1.1 MB',
        uploadedAt: '2026-11-04'
      },
      status: 'Active'
    },
    {
      id: 'stu-4',
      fullName: 'Vannak Ros',
      initials: 'VR',
      email: 'vannak.ros@rupp.edu.kh',
      phone: '+855 89 551 209',
      location: 'Phnom Penh, Cambodia',
      university: 'Royal University of Phnom Penh (RUPP)',
      major: 'B.Sc. in Information Technology',
      year: 'Year 4',
      gpa: '3.45 / 4.00',
      headline: 'Backend & Network Systems Student',
      bio: 'Focused on Linux administration, Node.js APIs, and cybersecurity basics.',
      skills: ['Node.js', 'MySQL', 'Linux', 'Networking', 'Docker'],
      education: [],
      experience: [],
      projects: [],
      cv: {
        fileName: 'Vannak_Ros_IT_CV.pdf',
        fileSize: '380 KB',
        uploadedAt: '2026-10-28'
      },
      status: 'Suspended'
    }
  ],

  savedJobIds: ['job-2', 'job-5'],

  applications: [
    {
      id: 'app-1',
      jobId: 'job-1',
      studentId: 'stu-1',
      appliedDate: '2026-11-10',
      status: 'Under Review',
      cvUsed: 'Sokha_Chan_CADT_CV_2026.pdf',
      coverNote: 'I am a Year 3 Computer Science student at CADT with hands-on React and REST API project experience. I would be thrilled to contribute to Wing Bank’s digital web experiences.',
      timeline: [
        { date: '2026-11-10', label: 'Application Submitted' },
        { date: '2026-11-11', label: 'Reviewed by Wing Bank HR & Frontend Lead' }
      ]
    },
    {
      id: 'app-2',
      jobId: 'job-4',
      studentId: 'stu-1',
      appliedDate: '2026-11-08',
      status: 'Pending',
      cvUsed: 'Sokha_Chan_CADT_CV_2026.pdf',
      coverNote: 'Excited to learn enterprise security monitoring and SIEM operations with ABA Bank’s team.',
      timeline: [
        { date: '2026-11-08', label: 'Application Submitted' }
      ]
    },
    {
      id: 'app-3',
      jobId: 'job-2',
      studentId: 'stu-1',
      appliedDate: '2026-11-03',
      status: 'Accepted',
      cvUsed: 'Sokha_Chan_CADT_CV_2026.pdf',
      coverNote: 'Attached my CADT Study Hub Figma prototypes and frontend component library work.',
      timeline: [
        { date: '2026-11-03', label: 'Application Submitted' },
        { date: '2026-11-05', label: 'Shortlisted for Portfolio Review' },
        { date: '2026-11-09', label: 'Accepted – Interview Invitation Sent' }
      ]
    },
    {
      id: 'app-4',
      jobId: 'job-8',
      studentId: 'stu-1',
      appliedDate: '2026-10-30',
      status: 'Rejected',
      cvUsed: 'Sokha_Chan_CADT_CV_2026.pdf',
      coverNote: 'Applying for Junior QA Automation role to grow my automated testing skills.',
      timeline: [
        { date: '2026-10-30', label: 'Application Submitted' },
        { date: '2026-11-04', label: 'Role filled by candidate with 1+ yr full-time QA experience' }
      ]
    },
    // Applicants for Company View (comp-1: Wing Bank)
    {
      id: 'app-5',
      jobId: 'job-1',
      studentId: 'stu-3',
      appliedDate: '2026-11-11',
      status: 'Pending',
      cvUsed: 'Malis_Keo_Design_Portfolio_CV.pdf',
      coverNote: 'Strong HTML/CSS and Figma collaboration background from CADT E-Commerce projects.',
      timeline: [{ date: '2026-11-11', label: 'Application Submitted' }]
    },
    {
      id: 'app-6',
      jobId: 'job-8',
      studentId: 'stu-2',
      appliedDate: '2026-11-06',
      status: 'Under Review',
      cvUsed: 'Dara_Pich_DataScience_CV.pdf',
      coverNote: 'Experienced in Python test automation and SQL data validation.',
      timeline: [
        { date: '2026-11-06', label: 'Application Submitted' },
        { date: '2026-11-08', label: 'Technical Screening Scheduled' }
      ]
    }
  ]
};

function cloneDefaults() {
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneDefaults();
    const parsed = JSON.parse(raw);
    return Object.assign(cloneDefaults(), parsed);
  } catch (err) {
    console.warn('Could not load saved state, using defaults.', err);
    return cloneDefaults();
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Could not persist state.', err);
  }
}

window.AppState = loadState();
window.saveAppState = () => saveState(window.AppState);
window.resetAppState = () => {
  window.AppState = cloneDefaults();
  saveState(window.AppState);
};
