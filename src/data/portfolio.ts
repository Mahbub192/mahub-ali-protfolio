/**
 * All public portfolio content lives in this file.
 *
 * Email and LinkedIn are the public contact channels. GitHub is not listed as a profile.
 *
 * The completed bachelor's degree is from Green University of Bangladesh.
 *
 * The research section is a proposal. Do not add publications, datasets,
 * model scores, or completed experiments here unless they exist.
 */

export const site = {
  title: "Mahbub Ali | Software Developer & Aspiring AI Researcher",
  description:
    "Academic portfolio of Mahbub Ali, a computer science graduate and software developer preparing for master's research in healthcare AI and early disease risk detection.",
  keywords: [
    "Mahbub Ali",
    "Healthcare AI",
    "Machine Learning",
    "Predictive Analytics",
    "Early Disease Risk Detection",
    "Electronic Health Records",
    "Explainable AI",
    "Master's by Research",
    "Green University of Bangladesh",
    "Software Developer",
  ],
} as const;

export const profile = {
  name: "Mahbub Ali",
  initials: "MA",
  headline: "Software Developer | Aspiring AI Researcher",
  introduction:
    "I am a Computer Science and Engineering graduate with over 3 years of professional software development experience. I am interested in applying Machine Learning and Predictive Analytics to healthcare challenges, particularly early disease risk detection.",
  currentPosition: "Software Developer",
  experienceLabel: "3+ years",
  experienceDetail: "HealthConnect, PrimeMIS, Muallim App",
  careerGoal: "Become an AI researcher specializing in healthcare AI.",
  researchGoal: "Master's by Research",
  researchGoalFull: "Master's by Research in Computer Science",
  researchAudience: "Prepared for your university",
} as const;

export const contact = {
  email: "mahbubaligub182@gmail.com",
  linkedin: "https://www.linkedin.com/in/mahbub-ali-fullstack/",
} as const;

export const documents = {
  cv: {
    href: "/documents/mahbub-ali-cv.pdf",
    fileName: "Mahbub-Ali-CV.pdf",
  },
  proposal: {
    href: "/documents/research-proposal.pdf",
    fileName: "Mahbub-Ali-Research-Proposal.pdf",
  },
  notice:
    "The CV and research proposal follow this portfolio, including the email address and LinkedIn profile.",
} as const;

export const about = {
  paragraphs: [
    "I completed a Bachelor's degree in Computer Science and Engineering at Green University of Bangladesh, with a CGPA of 3.54. I also have over three years of professional experience as a software developer.",
    "Those three years were spent on HealthConnect, PrimeMIS, and Muallim App: a patient-facing healthcare app, a hospital management system, and a separate mobile app. Building those systems is the practical base I am now directing toward research.",
    "I am preparing for a Master's by Research in Computer Science. This portfolio is prepared for your university and for the supervisors who review it. My research focus is healthcare artificial intelligence, machine learning, predictive analytics, and early disease risk detection. My career goal is to become an AI researcher specializing in healthcare AI.",
  ],
} as const;

export const academic = {
  degree: "Bachelor's in Computer Science & Engineering",
  cgpa: "3.54",
  institution: "Green University of Bangladesh",
  mediumOfInstruction:
    "A Medium of Instruction (MOI) certificate is available and can be shared with admissions offices and prospective supervisors on request.",
  intended: {
    label: "Intended postgraduate study",
    note: "Prepared for your university and the supervisors reviewing this portfolio. This is not a current enrolment.",
    degree: "Master's by Research in Computer Science",
    focusLabel: "Research focus",
    focus: [
      "Healthcare AI",
      "Machine Learning",
      "Predictive Analytics",
      "Early Disease Risk Detection",
    ],
  },
} as const;

export const experience = {
  role: "Software Developer",
  duration: "3+ years",
  paragraphs: [
    "I have over three years of professional experience as a software developer. That work was on HealthConnect, PrimeMIS, and Muallim App.",
  ],
  projects: [
    {
      id: "experience-healthconnect",
      title: "HealthConnect",
      summary:
        "A React Native and Expo healthcare application, developed from the beginning and published on Google Play and the App Store.",
      contributions: [
        "Doctor search and appointment booking.",
        "Patient reports and digital prescriptions.",
        "Home doctor, nurse, and physiotherapy services.",
        "Firebase integration, REST APIs, authentication, and notifications.",
      ],
      technologies: ["React Native", "Expo", "Firebase", "REST APIs"],
      links: [
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.farazymaxit.open_mrs_mobileapp",
        },
        {
          label: "App Store",
          href: "https://apps.apple.com/us/app/healthconnect-app/id6738586759",
        },
      ],
    },
    {
      id: "experience-primemis",
      title: "PrimeMIS",
      summary:
        "A full hospital management information system with an Angular frontend, a .NET Web API backend, and a MySQL database.",
      contributions: [
        "Patient and doctor management.",
        "Appointment management.",
        "Pharmacy and laboratory management.",
        "Reports and digital prescription workflows.",
      ],
      technologies: ["Angular", ".NET Web API", "MySQL"],
      links: [
        {
          label: "View PrimeMIS",
          href: "https://primemis.farazymaxit.com/auth/login?returnUrl=%2F",
        },
      ],
    },
    {
      id: "experience-muallim",
      title: "Muallim App",
      summary: "A React Native mobile application, separate from the healthcare systems above.",
      contributions: [],
      technologies: ["React Native"],
      links: [
        {
          label: "App Store",
          href: "https://apps.apple.com/us/app/muallim-app/id6742032793",
        },
      ],
    },
  ] satisfies readonly Project[],
} as const;

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  contributions: readonly string[];
  technologies: readonly string[];
  links: readonly ProjectLink[];
  slug?: string;
  brand?: string;
};

export const projects: readonly Project[] = [
  {
    id: "project-mediscan",
    title: "MediScan Pro",
    summary:
      "A low-cost offline endoscopy platform for Android phones and tablets, connected over USB. In Dhaka in May 2025, 15 doctors used it in 120 procedures and produced reports in about 10–15 minutes, compared with 2–3 days for the usual diagnosis path.",
    contributions: [
      "Patient intake, visit metadata, and locally generated record numbers.",
      "Image and video capture, including an Android USB camera bridge.",
      "HTML report editing, A4 print or share, and a local report archive.",
      "On-device five-class otoscopy scoring, with an uncertain result when confidence is low.",
    ],
    technologies: ["React Native", "Expo", "Kotlin", "TensorFlow Lite", "TensorFlow"],
    links: [],
    slug: "mediscan-pro",
  },
  {
    id: "project-sakura",
    title: "Sakura ENT Center",
    summary:
      "A healthcare website and appointment management system, including patient queue and sequence management through Sakura TV.",
    contributions: [
      "Healthcare website for the ENT center.",
      "Appointment management.",
      "Patient queue and sequence management through Sakura TV.",
    ],
    technologies: ["Angular", "NestJS", "PostgreSQL", "Socket.IO", "Kotlin"],
    links: [
      {
        label: "Visit website",
        href: "https://sakuraentcenter.com/",
      },
    ],
    slug: "sakura-ent-center",
  },
  {
    id: "project-prescription",
    title: "Prescription writing",
    summary:
      "A Next.js prescribing workspace with a medicine catalogue, interaction records, specialty templates, and a link to the Sakura appointment API.",
    contributions: [
      "Doctor and admin screens for medicines, generics, companies, and templates.",
      "PostgreSQL schema for patients, encounters, and draft or final prescriptions.",
      "Browser-side sync of the catalogue through PowerSync.",
      "Appointment and queue actions against the Sakura clinic API.",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "PowerSync"],
    links: [
      {
        label: "Visit website",
        href: "https://prescpetion-api.sakurapharmabd.com/",
      },
    ],
    slug: "prescription-writing",
  },
  {
    id: "project-primemis",
    title: "Hospital Management",
    summary:
      "A full hospital management information system with an Angular frontend, a .NET Web API backend, and a MySQL database. The deployed system is PrimeMIS.",
    contributions: [
      "Patient and doctor management.",
      "Appointment management.",
      "Pharmacy and laboratory management.",
      "Reports and digital prescription workflows.",
    ],
    technologies: ["Angular", ".NET Web API", "MySQL"],
    links: [
      {
        label: "View PrimeMIS",
        href: "https://primemis.farazymaxit.com/auth/login?returnUrl=%2F",
      },
    ],
  },
  {
    id: "project-healthconnect",
    title: "EHealth App",
    summary:
      "A React Native and Expo healthcare application, developed from the beginning. The published store listing is HealthConnect.",
    contributions: [
      "Doctor search and appointment booking.",
      "Patient reports and digital prescriptions.",
      "Home doctor, nurse, and physiotherapy services.",
      "Firebase integration, REST APIs, authentication, and notifications.",
    ],
    technologies: ["React Native", "Expo", "Firebase", "REST APIs"],
    links: [],
    slug: "ehealth-app",
  },
  {
    id: "project-sakura-it",
    title: "SakuraEHealth",
    summary:
      "The website for SakuraEHealth, the niche health-software company I am establishing. The Angular source was built as the studio site and still uses the earlier Sakura IT naming. Marketing figures from that source are not repeated.",
    contributions: [
      "Public pages for services, industries, articles, careers, and contact.",
      "An enquiry flow for consultation requests.",
      "A prayer-times page using the @mahbub_ali/prayer-times package.",
    ],
    technologies: ["Angular", "TypeScript"],
    links: [],
    slug: "sakura-ehealth",
    brand: "Company website",
  },
];

export type ResearchInterest = {
  id:
    | "healthcare-ai"
    | "machine-learning"
    | "predictive-analytics"
    | "early-risk"
    | "ehr"
    | "xai"
    | "medical-data";
  title: string;
  summary: string;
};

export const researchInterests: readonly ResearchInterest[] = [
  {
    id: "healthcare-ai",
    title: "Healthcare Artificial Intelligence",
    summary:
      "Artificial intelligence applied to clinical and health-system questions, with attention to whether a method can be examined and justified.",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    summary:
      "Supervised learning for classification and risk estimation, judged by validation design rather than by model complexity.",
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics",
    summary:
      "Using historical records to estimate a future health outcome, and stating clearly what the data can and cannot support.",
  },
  {
    id: "early-risk",
    title: "Early Disease Risk Detection",
    summary:
      "Identifying elevated disease risk early enough to inform further review. This is a research interest, not a claim of a working clinical system.",
  },
  {
    id: "ehr",
    title: "Electronic Health Records (EHR)",
    summary:
      "Encounters, diagnoses, medications, and laboratory results as a research source, subject to data quality, bias, and privacy constraints.",
  },
  {
    id: "xai",
    title: "Explainable AI (XAI)",
    summary:
      "Methods, including SHAP, that make model behaviour open to inspection by researchers and clinicians.",
  },
  {
    id: "medical-data",
    title: "Medical Data Analysis",
    summary:
      "Preparing and examining healthcare data before modelling, including missing values, coding differences, and class balance.",
  },
];

export const proposedResearch = {
  title:
    "Machine Learning-Based Predictive Analytics for Early Disease Risk Detection Using Electronic Health Records",
  disclaimer:
    "It is not completed research, it is not a publication, and it does not report experiments or model results.",
  facts: [
    { label: "Level", value: "Master's by Research" },
    { label: "Field", value: "Computer Science" },
    { label: "Prepared for", value: "Your university" },
    { label: "Status", value: "Proposal in preparation" },
  ],
  background: [
    "Electronic health records collect diagnoses, medications, laboratory results, and encounter histories over time. That longitudinal record may contain signals of disease risk earlier than a single visit would show. Machine learning has been studied for this kind of prediction, but a useful model still depends on the outcome definition, the validation design, and whether a reviewer can see why a prediction was made.",
    "What follows is the study I intend to pursue. The specific condition, outcome label, and prediction window are not fixed yet. They should be chosen after a literature review and after a suitable dataset is identified, and they should be locked before any model comparison begins.",
  ],
  problem: [
    "Disease risk is often recognised only after symptoms are established, when the opportunity to act earlier may already be narrower. Electronic health records hold information that could support earlier risk stratification, but those records are uneven, sometimes incomplete, and always sensitive.",
    "The problem this proposal addresses is how to compare standard predictive models for early disease risk detection on electronic health record data, and how to explain the predictions, without treating a research metric as a clinical decision.",
  ],
  objectives: [
    "Review published research on machine learning for early disease risk detection using electronic health records.",
    "Select one ethically accessible dataset and document its population, features, missingness, and known biases.",
    "Define the prediction outcome and time horizon, then prepare the data without leaking information into the test set.",
    "Train and compare logistic regression, random forest, XGBoost, and support vector machine models.",
    "Evaluate the models with accuracy, precision, recall, F1-score, and ROC-AUC.",
    "Apply SHAP to interpret feature contributions for the selected model or models.",
    "State the privacy, bias, and clinical-use limits of any finding.",
  ],
  questions: [
    "To what extent can these models estimate early disease risk from the features available in the selected electronic health records?",
    "How do logistic regression, random forest, XGBoost, and support vector machines compare on accuracy, precision, recall, F1-score, and ROC-AUC?",
    "Which features contribute most to the predictions according to SHAP, and how should those explanations be read?",
    "What limits of data quality, bias, and privacy must qualify the findings?",
  ],
  methodologyIntro:
    "The study is planned in six stages. None of these stages has been carried out, and no dataset has been selected.",
  methodology: [
    {
      title: "Literature review",
      detail:
        "Survey peer-reviewed work on electronic health record risk prediction, evaluation practice, and explainable AI in healthcare. Use that review to fix the clinical question, the outcome definition, and the prediction horizon before any model is trained.",
    },
    {
      title: "Dataset selection",
      detail:
        "Use a public dataset with a clear licence, or a dataset available under institutional approval. Record who it represents and what it cannot support. No identifiable patient data is collected through this website.",
    },
    {
      title: "Data preparation",
      detail:
        "Define the cohort and the outcome from the selected records. Inspect missing values, coding differences, and class balance before choosing how to handle them. Where records are longitudinal, split training, validation, and test data by patient so that one person's later visits do not leak into training.",
    },
    {
      title: "Model development",
      detail:
        "Train logistic regression, random forest, XGBoost, and a support vector machine as comparable candidates. Tune hyperparameters on validation data only. Reserve the test set for one final comparison.",
    },
    {
      title: "Evaluation and explanation",
      detail:
        "Compare the models with accuracy, precision, recall, F1-score, and ROC-AUC. Discuss the decision threshold in relation to false negatives and false positives. Apply SHAP so feature contributions can be read alongside the scores.",
    },
    {
      title: "Ethical boundary",
      detail:
        "Keep the work inside research evaluation. A later clinical use would need separate validation, clinical collaboration, and the appropriate regulatory review. This proposal is not a plan to deploy a diagnostic system.",
    },
  ],
  algorithmsIntro:
    "These are candidate algorithms for the comparison. They have not been trained for this project, and no ranking among them is claimed.",
  algorithms: [
    {
      name: "Logistic regression",
      detail: "A transparent linear baseline for binary risk estimation.",
    },
    {
      name: "Random forest",
      detail:
        "An ensemble of decision trees that can represent non-linear relationships among mixed clinical features.",
    },
    {
      name: "XGBoost",
      detail:
        "Gradient-boosted trees, included because they are often strong on structured tables when validation is kept strict.",
    },
    {
      name: "Support vector machine (SVM)",
      detail:
        "A margin-based classifier trained on the same prediction task, included for comparison.",
    },
  ],
  evaluationIntro:
    "These metrics are the planned evaluation criteria. There are no scores to report, because the models have not been trained. A high score on one metric would not, by itself, show that a model is suitable for clinical use.",
  metrics: ["Accuracy", "Precision", "Recall", "F1-score", "ROC-AUC"],
  explainability: [
    "SHAP (SHapley Additive exPlanations) is the explainability method planned for this study. The intention is to report global feature importance and to inspect local explanations for individual records.",
    "SHAP has not been applied in this project. When explanations exist, they will be a way to scrutinise the model. They will not be described as proof of clinical cause, and they will not replace a clinician's judgement.",
  ],
  outcomesIntro:
    "If the study is completed under supervision, the expected outputs are listed below. They are prospective. This page does not report them as achieved.",
  outcomes: [
    "A written comparison of the four candidate models on one defined early-risk task.",
    "A clear account of the dataset, including the population it represents and the limits of that data.",
    "A SHAP-based discussion of feature contributions for the model chosen for interpretation.",
    "An explicit statement of privacy, bias, and the boundary between research performance and clinical use.",
    "Thesis material suitable for a Master's by Research in Computer Science, directed toward healthcare AI.",
  ],
} as const;

export type SkillGroup = {
  id: string;
  title: string;
  items: readonly string[];
  learning?: boolean;
  wide?: boolean;
  note?: string;
};

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      "React",
      "React Native",
      "Expo",
      "Angular",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: ["Node.js", "Express.js", "NestJS", ".NET Web API"],
  },
  {
    id: "database",
    title: "Database",
    items: ["MongoDB", "MySQL", "PostgreSQL"],
  },
  {
    id: "tools",
    title: "Tools",
    items: ["Git", "GitHub", "Firebase", "Azure DevOps"],
  },
  {
    id: "repository-evidence",
    title: "Evidenced in project source",
    wide: true,
    note: "TensorFlow, TensorFlow Lite, and Kotlin appear in the MediScan Pro and Sakura TV repositories. This is implementation evidence. It is not the May 2025 field result, and it is not a published accuracy figure for the classifier. Pandas, NumPy, and Scikit-learn stay in the preparation list below.",
    items: ["TensorFlow", "TensorFlow Lite", "Kotlin"],
  },
  {
    id: "research-preparation",
    title: "Currently Learning / Research Preparation",
    learning: true,
    note: "Python and these machine-learning libraries are part of current preparation. They are not presented as completed research practice, and no study results are claimed from them.",
    items: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning"],
  },
];

export const preparation = {
  disclaimer:
    "The items below are current preparation. They are not publications, completed experiments, or research results.",
  items: [
    {
      title: "Developing a research proposal",
      detail:
        "Drafting the background, questions, and methodology for the early disease risk detection topic on this page.",
    },
    {
      title: "Exploring healthcare datasets",
      detail:
        "Looking for publicly documented datasets that could support a supervised risk-prediction study. No dataset has been selected, and no analysis has been completed.",
    },
    {
      title: "Studying machine learning algorithms",
      detail:
        "Reading how logistic regression, random forests, gradient boosting, and support vector machines are trained, validated, and compared.",
    },
    {
      title: "Learning Python-based data analysis",
      detail:
        "Studying Python, Pandas, and NumPy in order to prepare and inspect tabular health data.",
    },
    {
      title: "Exploring explainable AI",
      detail:
        "Studying SHAP and the limits of feature explanations in clinical modelling. This method has not yet been applied to a project model.",
    },
  ],
} as const;

export type NavItem = {
  href: string;
  label: string;
  id: string;
  match?: readonly string[];
};

export const navigation: readonly NavItem[] = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#academic", label: "Academic", id: "academic" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#projects", label: "SakuraEHealth", id: "projects" },
  {
    href: "/#interests",
    label: "Research",
    id: "interests",
    match: ["interests", "research"],
  },
  { href: "/#skills", label: "Skills", id: "skills" },
  { href: "/#preparation", label: "Preparation", id: "preparation" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export const sectionIds = [
  "about",
  "academic",
  "experience",
  "projects",
  "interests",
  "research",
  "skills",
  "preparation",
  "contact",
] as const;
