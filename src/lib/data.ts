// Single source of truth. Every string here comes from the résumé.

export const PROFILE = {
  name: "Muhammadsahal Thakor",
  firstName: "Muhammadsahal",
  initials: "MT",
  role: "Software Developer",
  headline: "Computer Engineer | Software Developer | Data & AI/ML Enthusiast",
  email: "sahalthakor598@gmail.com",
  phone: "9313193816",
  phoneHref: "tel:9313193816",
  location: "Anand, Gujarat, India",
  resumeSummary:
    "Computer Engineer graduated in 2025 with hands-on experience developing web, software, mobile, data analysis, AI/ML, ERP, and blockchain-based applications. Experienced with Python, Java, JavaScript, Django, Flutter, SQL, HTML, CSS, ERPNext/Frappe, MySQL, Git/GitHub, and machine learning technologies. Strong interest in software development, data analysis, AI/ML, ERP development, and IT solutions, with practical experience building complete projects from development through deployment.",
  extraLine:
    "Experience developing responsive business websites and Django web applications, including deployment and GitHub project management.",
  quote: "Complete projects, taken from the first line of code through to deployment.",
  github: "https://github.com/sahalthakor28/sahalthakor28",
  linkedin: "https://www.linkedin.com/in/muhammadsahalthakor",
  resume: "/resume.pdf",
} as const;

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type SkillItem = { name: string; aka?: string[] };
export type SkillGroup = { family: string; items: SkillItem[] };

export const SKILL_GROUPS: SkillGroup[] = [
  { family: "Languages", items: [{ name: "Python" }, { name: "Java" }, { name: "JavaScript" }, { name: "SQL" }] },
  {
    family: "Web",
    items: [
      { name: "HTML5", aka: ["HTML"] },
      { name: "CSS3", aka: ["CSS"] },
      { name: "Django" },
      { name: "REST APIs" },
      { name: "Responsive Web", aka: ["Responsive Web Design"] },
    ],
  },
  { family: "Mobile", items: [{ name: "Flutter" }, { name: "Android Studio" }] },
  {
    family: "Data & AI/ML",
    items: [
      { name: "Machine Learning" },
      { name: "Artificial Intelligence" },
      { name: "Data Analysis" },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Matplotlib" },
      { name: "Scikit-learn" },
      { name: "TF-IDF" },
      { name: "LinearSVC" },
      { name: "OpenCV" },
      { name: "MediaPipe" },
    ],
  },
  { family: "Databases", items: [{ name: "MySQL" }, { name: "SQLite" }] },
  { family: "ERP", items: [{ name: "ERPNext" }, { name: "Frappe", aka: ["Frappe Framework"] }, { name: "Odoo" }] },
  {
    family: "Blockchain",
    items: [
      { name: "Blockchain" },
      { name: "Smart Contracts" },
      { name: "Solidity" },
      { name: "Truffle" },
      { name: "Ganache" },
      { name: "Remix IDE" },
    ],
  },
  { family: "Cloud", items: [{ name: "AWS" }, { name: "Google Cloud" }, { name: "Render" }, { name: "GitHub" }] },
  {
    family: "Tools",
    items: [
      { name: "VS Code" },
      { name: "Git" },
      { name: "JIRA" },
      { name: "SVN" },
      { name: "Bitbucket" },
      { name: "PowerShell" },
      { name: "Web Scraping" },
      { name: "Web Crawling" },
      { name: "Data Visualization" },
    ],
  },
];

export type MockKind =
  | "web" | "filter" | "form" | "table" | "doc" | "query"
  | "phone" | "chat" | "chart" | "alerts" | "gallery";

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  mock: MockKind;
};

export const PROJECTS: Project[] = [
  {
    id: "unity-fire-safety",
    index: "01",
    title: "Unity Fire & Safety Services",
    kicker: "Business website",
    description: "A professional responsive website for Unity Fire & Safety Services, Umreth, Gujarat.",
    features: [
      "Sections for company information, fire-safety services, products, industries, process, gallery, contact, and quotation requests",
      "Responsive design for desktop, tablet, and mobile",
      "Contact, call, WhatsApp, Google Maps, and business information",
      "Website structure optimized for SEO and deployment",
      "Uploaded to GitHub and deployed with Render",
    ],
    tech: ["HTML", "CSS", "JavaScript", "GitHub", "Render"],
    mock: "web",
  },
  {
    id: "range-filter",
    index: "02",
    title: "Range Filter",
    kicker: "Dynamic product segmentation",
    description: "A Django-based dynamic product filtering and segmentation application.",
    features: [
      "Range-based filtering by selected parameters",
      "Django views, templates, models, and URL routing",
      "Project structured for deployment with WSGI and Gunicorn",
      "A dynamic and user-friendly product discovery system",
    ],
    tech: ["Python", "Django", "HTML", "CSS", "JavaScript", "SQLite", "MySQL"],
    mock: "filter",
  },
  {
    id: "student-registration",
    index: "03",
    title: "Student Registration & ERPNext Management",
    kicker: "ERP customization",
    description: "A customized Student Registration Doctype in ERPNext/Frappe.",
    features: [
      "Personal details, education, documents, course, category, nationality, and other registration information",
      "Document and image upload with file validation",
      "Custom reports with filters for student information",
      "Draft/Submitted status visualization and course-based row highlighting",
      "Age calculation and read-only fields",
      "Custom JavaScript and Python report scripts",
    ],
    tech: ["ERPNext", "Frappe", "Python", "JavaScript", "HTML", "CSS"],
    mock: "form",
  },
  {
    id: "dataframe-management",
    index: "04",
    title: "DataFrame Management",
    kicker: "Django application",
    description: "A Django application to import and manage tabular data using Pandas.",
    features: [
      "Stores DataFrame columns as database fields",
      "Date-field handling and dynamic data processing",
      "Upload functionality for CSV-based data",
      "Database-backed interface for viewing and managing uploaded records",
    ],
    tech: ["Python", "Django", "Pandas", "SQLite", "HTML", "CSS"],
    mock: "table",
  },
  {
    id: "html-to-pdf",
    index: "05",
    title: "HTML to PDF Generator",
    kicker: "Reusable Django app",
    description: "A reusable Django application for converting HTML content into PDF documents.",
    features: [
      "GUI-based file-upload workflow",
      "Supports HTML documents containing inline CSS",
      "Designed for easy integration into other Django projects",
      "Configured for development and debugging through VS Code",
    ],
    tech: ["Python", "Django", "HTML", "CSS"],
    mock: "doc",
  },
  {
    id: "dynamic-filtration",
    index: "06",
    title: "Dynamic Filtration Using Q Objects",
    kicker: "Django ORM",
    description: "Dynamic database filtering using the Django ORM.",
    features: [
      "Complex search conditions using Django Q objects",
      "Flexible filtering logic for multiple search parameters",
      "Reusable query logic for dynamic data retrieval",
    ],
    tech: ["Python", "Django"],
    mock: "query",
  },
  {
    id: "hostel-finder",
    index: "07",
    title: "Hostel Finder",
    kicker: "Student mobile app",
    description: "A hostel-finding application designed for students, associated with CVM University.",
    features: [
      "Helps students discover suitable hostel and accommodation options",
      "Location and hostel information management",
      "A practical, student-focused application",
    ],
    tech: ["Flutter"],
    mock: "phone",
  },
  {
    id: "blockchain-chat",
    index: "08",
    title: "Blockchain Chat Application",
    kicker: "Decentralized app",
    description: "A decentralized chat application concept using blockchain technology.",
    features: [
      "Smart contracts to manage application functionality",
      "Truffle and Ganache for smart-contract development and local blockchain testing",
      "Remix IDE for Solidity development and testing",
      "Explored decentralized application architecture and blockchain transactions",
    ],
    tech: ["Solidity", "Truffle", "Ganache", "Remix IDE", "JavaScript"],
    mock: "chat",
  },
  {
    id: "car-price-prediction",
    index: "09",
    title: "Car Price Prediction",
    kicker: "Machine learning",
    description: "A machine-learning project for predicting vehicle prices.",
    features: [
      "Data preprocessing and analysis",
      "Machine-learning algorithms to find relationships between vehicle attributes and prices",
      "Python data-science libraries for data preparation and model development",
      "Model performance evaluated to improve prediction accuracy",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    mock: "chart",
  },
  {
    id: "intrusion-detection",
    index: "10",
    title: "Intrusion Detection System",
    kicker: "AI/ML for security",
    description: "A machine-learning-based intrusion detection concept.",
    features: [
      "Analyzes network-related data to identify potentially abnormal activities",
      "Data preprocessing and machine-learning techniques for classification",
      "Explores AI/ML for cybersecurity and network monitoring",
    ],
    tech: ["Python"],
    mock: "alerts",
  },
  {
    id: "image-viewer",
    index: "11",
    title: "Multiple Image Viewer",
    kicker: "Desktop app",
    description: "A desktop-based multiple image viewer built with Python and Tkinter.",
    features: [
      "Image loading and navigation functionality",
      "A simple graphical user interface for viewing multiple images",
      "Structured for easy local execution and GitHub deployment",
    ],
    tech: ["Python", "Tkinter"],
    mock: "gallery",
  },
];

export const CERTIFICATIONS: string[] = [
  "Python Programming",
  "Web Development",
  "Django Development",
  "Data Analysis",
  "Machine Learning",
  "Artificial Intelligence",
  "Cloud Computing / AWS",
  "Google Cloud / Qwiklabs",
  "Blockchain Development",
];

export type Stop = { when: string; title: string; place: string; detail: string[] };

export const EXPERIENCE: Stop[] = [
  {
    when: "17-day program",
    title: "Code Unnati",
    place: "MBIT",
    detail: [
      "An intensive technical training program focused on practical computer and software-development skills.",
      "Programming, development concepts, and hands-on technical activities.",
    ],
  },
  {
    when: "May 2024 – Jun 2024",
    title: "Data Analyst",
    place: "TECHeLECON",
    detail: [
      "Data cleaning, preprocessing, and analysis using Excel and Python.",
      "Analyzed business data to identify useful patterns and insights, using Pandas, NumPy, and data visualization.",
    ],
  },
  {
    when: "Jan 2025 – May 2025",
    title: "ERP Developer",
    place: "NDDB, Anand",
    detail: [
      "ERPNext-based enterprise applications using the Frappe Framework and Python, on live ERP systems.",
      "Student registration and management, PIN-code verification and validation, and external API integration.",
    ],
  },
];

export const EDUCATION: Stop[] = [
  {
    when: "2025",
    title: "Computer Engineering",
    place: "Gujarat, India",
    detail: [
      "Graduated 2025. Areas: Software Engineering, Web Development, Database Management, Data Structures, Computer Networks, AI, Machine Learning, Cloud Computing, Cybersecurity.",
    ],
  },
];

export const ACHIEVEMENTS: never[] = []; // nothing in the résumé, so the section is not rendered
