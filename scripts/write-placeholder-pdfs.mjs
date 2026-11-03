import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const documentsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "documents");

const LEFT = 54;
const RIGHT = 558;
const TOP = 736;
const BOTTOM = 58;
const CONTENT_WIDTH = RIGHT - LEFT;
const NAVY = "0.055 0.165 0.290";
const INK = "0.071 0.125 0.200";
const MUTED = "0.290 0.333 0.408";
const LINE = "0.780 0.800 0.835";

const styles = {
  title: { font: "F2", size: 22, color: NAVY, after: 3, line: 26 },
  subtitle: { font: "F1", size: 11, color: INK, after: 2, line: 15 },
  meta: { font: "F1", size: 9, color: MUTED, after: 1, line: 13 },
  h: { font: "F2", size: 12, color: NAVY, after: 8, line: 16, rule: true, keep: 46 },
  body: { font: "F1", size: 10, color: INK, after: 4, line: 14, justify: true },
  bullet: { font: "F1", size: 10, color: INK, after: 2, line: 14, indent: 16, justify: true },
};

// Helvetica widths for characters 32-126, in thousandths of an em.
const HELVETICA = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556,
  556, 556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667,
  556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 222, 556,
  556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722,
  500, 500, 500, 334, 260, 334, 584,
];

function pdfEscape(value) {
  return value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function textWidth(value, size, bold) {
  const scale = bold ? 1.06 : 1;
  let units = 0;
  for (const character of value) {
    const code = character.charCodeAt(0);
    units += code >= 32 && code <= 126 ? HELVETICA[code - 32] : 500;
  }
  return (units / 1000) * size * scale;
}

function wrap(text, size, width, bold) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = [];

  for (const word of words) {
    const trial = [...current, word];
    if (current.length > 0 && textWidth(trial.join(" "), size, bold) > width) {
      lines.push(current);
      current = [word];
    } else {
      current = trial;
    }
  }

  if (current.length > 0) lines.push(current);
  return lines.length > 0 ? lines : [[]];
}

function layout(blocks, footerLabel) {
  const pages = [];
  let commands = [];
  let y = TOP;

  function closePage() {
    if (commands.length > 0) pages.push(commands);
    commands = [];
    y = TOP;
  }

  function ensure(height) {
    if (y - height < BOTTOM) closePage();
  }

  function textLine(font, size, x, baseline, color, words, width, justify) {
    const bold = font === "F2";
    const gaps = words.length - 1;
    const natural = textWidth(words.join(" "), size, bold);
    const canJustify = justify && gaps > 0 && natural < width - 0.5;
    commands.push("BT", `${color} rg`, `/${font} ${size} Tf`, `1 0 0 1 ${x} ${Math.round(baseline)} Tm`);

    if (!canJustify) {
      commands.push(`(${pdfEscape(words.join(" "))}) Tj`, "ET");
      return;
    }

    const extra = ((width - natural) / gaps / size) * 1000;
    const parts = words.map((word, index) => {
      const chunk = index < gaps ? `${word} ` : word;
      return index < gaps ? `(${pdfEscape(chunk)}) ${(-extra).toFixed(2)}` : `(${pdfEscape(chunk)})`;
    });
    commands.push(`[${parts.join(" ")}] TJ`, "ET");
  }

  for (const block of blocks) {
    if (block.kind === "gap") {
      y -= block.amount ?? 8;
      if (y < BOTTOM) closePage();
      continue;
    }

    const style = styles[block.kind];
    const indent = style.indent ?? 0;
    const textWidthLimit = CONTENT_WIDTH - indent;
    const lines = wrap(block.text, style.size, textWidthLimit, style.font === "F2");
    const blockHeight = lines.length * style.line + style.after + (style.rule ? 6 : 0);

    if (style.keep && y - style.keep < BOTTOM) closePage();
    ensure(Math.min(blockHeight, style.line * 2));

    lines.forEach((words, index) => {
      ensure(style.line);
      const baseline = y - style.size;
      const lastLine = index === lines.length - 1;
      if (block.kind === "bullet" && index === 0) {
        textLine(style.font, style.size, LEFT, baseline, NAVY, ["-"], 12, false);
      }
      textLine(
        style.font,
        style.size,
        LEFT + indent,
        baseline,
        style.color,
        words,
        textWidthLimit,
        Boolean(style.justify) && !lastLine,
      );
      y -= style.line;
    });

    if (style.rule) {
      y -= 3;
      commands.push(`${LINE} rg`, `${LEFT} ${Math.round(y)} ${CONTENT_WIDTH} 0.8 re`, "f");
      y -= 7;
    }

    y -= style.after;
  }

  closePage();

  return pages.map((pageCommands, index) => {
    const footer = `${footerLabel}    ${index + 1} / ${pages.length}`;
    return [
      ...pageCommands,
      `${LINE} rg`,
      `${LEFT} 42 ${CONTENT_WIDTH} 0.6 re`,
      "f",
      "BT",
      `${MUTED} rg`,
      "/F1 8 Tf",
      `1 0 0 1 ${LEFT} 28 Tm`,
      `(${pdfEscape(footer)}) Tj`,
      "ET",
    ].join("\n");
  });
}

function buildPdf(pages) {
  const fontRegular = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  const fontBold = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";
  const bodies = [null, null, fontRegular, fontBold];
  const pageObjectNumbers = [];

  for (const stream of pages) {
    const pageNumber = bodies.length + 1;
    const contentNumber = pageNumber + 1;
    pageObjectNumbers.push(pageNumber);
    bodies.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents ${contentNumber} 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> >>`,
    );
    bodies.push(
      `<< /Length ${Buffer.byteLength(`${stream}\n`, "utf8")} >>\nstream\n${stream}\nendstream`,
    );
  }

  bodies[0] = "<< /Type /Catalog /Pages 2 0 R >>";
  bodies[1] = `<< /Type /Pages /Count ${pages.length} /Kids [${pageObjectNumbers
    .map((number) => `${number} 0 R`)
    .join(" ")}] >>`;

  let output = "%PDF-1.4\n";
  const offsets = [0];

  bodies.forEach((body, index) => {
    offsets.push(Buffer.byteLength(output, "utf8"));
    output += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefAt = Buffer.byteLength(output, "utf8");
  output += `xref\n0 ${bodies.length + 1}\n`;
  output += "0000000000 65535 f \n";
  for (let index = 1; index < offsets.length; index += 1) {
    output += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  output += `trailer\n<< /Size ${bodies.length + 1} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF`;
  return output;
}

const cv = layout(
  [
    { kind: "title", text: "Mahbub Ali" },
    { kind: "subtitle", text: "Software Developer | Aspiring AI Researcher" },
    { kind: "meta", text: "Email  mahbubaligub182@gmail.com" },
    { kind: "meta", text: "LinkedIn  linkedin.com/in/mahbub-ali-fullstack" },
    { kind: "gap", amount: 10 },
    { kind: "h", text: "Profile" },
    {
      kind: "body",
      text: "Computer Science and Engineering graduate of Green University of Bangladesh, with a CGPA of 3.54 and over three years of professional software development. The three years of practice were on HealthConnect, PrimeMIS, and Muallim App. The current direction is a Master's by Research in Computer Science. This curriculum vitae is prepared for your university and for the supervisors who review it. The research focus is healthcare artificial intelligence, machine learning, predictive analytics, and early disease risk detection. The career goal is to become an AI researcher specializing in healthcare AI.",
    },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Education" },
    { kind: "body", text: "Bachelor's in Computer Science and Engineering, Green University of Bangladesh. CGPA 3.54." },
    {
      kind: "body",
      text: "A Medium of Instruction certificate is available and can be shared with admissions offices and prospective supervisors on request.",
    },
    {
      kind: "body",
      text: "Intended postgraduate study, not a current enrolment: Master's by Research in Computer Science, prepared for your university. Research focus: Healthcare AI, Machine Learning, Predictive Analytics, and Early Disease Risk Detection.",
    },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Professional experience" },
    { kind: "body", text: "Software Developer, 3+ years. The work in that period was HealthConnect, PrimeMIS, and Muallim App." },
    { kind: "gap", amount: 4 },
    { kind: "body", text: "HealthConnect. React Native and Expo healthcare application, published on Google Play and the App Store." },
    { kind: "bullet", text: "Doctor search and appointment booking." },
    { kind: "bullet", text: "Patient reports and digital prescriptions." },
    { kind: "bullet", text: "Home doctor, nurse, and physiotherapy services." },
    { kind: "bullet", text: "Firebase integration, REST APIs, authentication, and notifications." },
    { kind: "body", text: "Technologies: React Native, Expo, Firebase, REST APIs." },
    { kind: "gap", amount: 4 },
    { kind: "body", text: "PrimeMIS. Hospital management information system with an Angular frontend, a .NET Web API backend, and MySQL." },
    { kind: "bullet", text: "Patient and doctor management." },
    { kind: "bullet", text: "Appointment management." },
    { kind: "bullet", text: "Pharmacy and laboratory management." },
    { kind: "bullet", text: "Reports and digital prescription workflows." },
    { kind: "body", text: "Technologies: Angular, .NET Web API, MySQL." },
    { kind: "gap", amount: 4 },
    { kind: "body", text: "Muallim App. React Native mobile application, separate from the healthcare systems above. Published on the App Store." },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "SakuraEHealth" },
    {
      kind: "body",
      text: "SakuraEHealth is the niche company being established for health-related software. The products below are separate systems. They are not one deployed platform, and they are not the three-year employment record above.",
    },
    { kind: "gap", amount: 4 },
    {
      kind: "body",
      text: "MediScan Pro. Low-cost offline endoscopy platform for Android phones and tablets, connected over USB. The capture path runs from patient intake to a local HTML report. An Android module scores otoscopy images on device and marks a low-confidence result as uncertain. That score is a suggestion, not a diagnosis.",
    },
    {
      kind: "bullet",
      text: "Field summary, Dhaka, May 2025: 15 doctors used the platform in 120 endoscopy procedures. A report took about 10-15 minutes, compared with 2-3 days for the usual diagnosis path. Ease of use was rated 7 out of 10. The reported investment could be recovered after 15-20 procedures.",
    },
    {
      kind: "bullet",
      text: "That summary is a workflow result. It does not report sensitivity or specificity for the on-device classifier.",
    },
    { kind: "body", text: "Technologies: React Native, Expo, Kotlin, TensorFlow, TensorFlow Lite." },
    { kind: "gap", amount: 4 },
    {
      kind: "body",
      text: "Sakura ENT Center. Healthcare website and appointment system, with patient queue and sequence display through Sakura TV. Public site: sakuraentcenter.com.",
    },
    { kind: "body", text: "Technologies: Angular, NestJS, PostgreSQL, Socket.IO, Kotlin." },
    { kind: "gap", amount: 4 },
    {
      kind: "body",
      text: "Prescription writing. Next.js workspace for a medicine catalogue, interaction records, specialty templates, and draft or final prescriptions, with a link to the Sakura appointment API.",
    },
    { kind: "body", text: "Technologies: Next.js, TypeScript, PostgreSQL, Drizzle, PowerSync." },
    { kind: "gap", amount: 4 },
    {
      kind: "body",
      text: "Hospital Management. The deployed hospital system is PrimeMIS, listed under professional experience.",
    },
    { kind: "gap", amount: 4 },
    {
      kind: "body",
      text: "EHealth App. Portfolio name for the application published as HealthConnect, listed under professional experience. The case study treats booking consistency, separate home-visit workflows, clinical documents on a phone, and authentication.",
    },
    { kind: "gap", amount: 4 },
    {
      kind: "body",
      text: "SakuraEHealth website. Public company site. The Angular source was first built as a studio site and is presented under the company name. Marketing figures from that source are not repeated.",
    },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Technical skills" },
    { kind: "body", text: "Frontend: React, React Native, Expo, Angular, Next.js, TypeScript, Tailwind CSS." },
    { kind: "body", text: "Backend: Node.js, Express.js, NestJS, .NET Web API." },
    { kind: "body", text: "Database: MongoDB, MySQL, PostgreSQL." },
    { kind: "body", text: "Tools: Git, GitHub, Firebase, Azure DevOps." },
    {
      kind: "body",
      text: "Evidenced in project source: TensorFlow, TensorFlow Lite, and Kotlin, from MediScan Pro and Sakura TV. This is implementation evidence, not a published classifier accuracy figure.",
    },
    {
      kind: "body",
      text: "Currently learning, for research preparation: Python, Pandas, NumPy, Scikit-learn, and Machine Learning. These are not presented as completed research practice.",
    },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Research preparation" },
    { kind: "bullet", text: "Drafting a proposal on early disease risk detection from electronic health records." },
    { kind: "bullet", text: "Looking for a public or approved dataset. No dataset has been selected, and no analysis has been completed." },
    { kind: "bullet", text: "Studying logistic regression, random forests, gradient boosting, and support vector machines." },
    { kind: "bullet", text: "Studying Python, Pandas, and NumPy for tabular health data." },
    { kind: "bullet", text: "Studying SHAP. It has not been applied to a project model." },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Proposed research" },
    {
      kind: "body",
      text: "Working title: Machine Learning-Based Predictive Analytics for Early Disease Risk Detection Using Electronic Health Records.",
    },
    {
      kind: "body",
      text: "Status: proposal in preparation for a Master's by Research in Computer Science. It is not a publication, and it does not report trained models or scores. The full proposal is the companion PDF.",
    },
  ],
  "Mahbub Ali  |  Curriculum vitae",
);

const proposal = layout(
  [
    { kind: "title", text: "Mahbub Ali" },
    { kind: "subtitle", text: "Research proposal" },
    { kind: "gap", amount: 6 },
    {
      kind: "h",
      text: "Machine Learning-Based Predictive Analytics for Early Disease Risk Detection Using Electronic Health Records",
    },
    { kind: "gap", amount: 4 },
    { kind: "body", text: "Level: Master's by Research. Field: Computer Science." },
    { kind: "body", text: "Prepared for your university and the supervisors reviewing this proposal. This is not a current enrolment." },
    { kind: "body", text: "Candidate background: Bachelor's in Computer Science and Engineering, Green University of Bangladesh, CGPA 3.54. Software Developer, 3+ years." },
    { kind: "body", text: "Status: proposal in preparation. This document is not completed research, not a publication, and it does not report experiments or model results." },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Background" },
    {
      kind: "body",
      text: "Electronic health records collect diagnoses, medications, laboratory results, and encounter histories over time. That longitudinal record may contain signals of disease risk earlier than a single visit would show. Machine learning has been studied for this kind of prediction, but a useful model still depends on the outcome definition, the validation design, and whether a reviewer can see why a prediction was made.",
    },
    {
      kind: "body",
      text: "What follows is the study I intend to pursue. The specific condition, outcome label, and prediction window are not fixed yet. They should be chosen after a literature review and after a suitable dataset is identified, and they should be locked before any model comparison begins.",
    },
    {
      kind: "body",
      text: "The practical background is healthcare software, not a finished prediction study. That work includes HealthConnect, PrimeMIS, Sakura ENT Center, prescription writing, and MediScan Pro, grouped in part under the company name SakuraEHealth. A May 2025 field summary for MediScan Pro, in Dhaka, reports report time, ease of use, and cost for an offline USB endoscopy workflow. It does not report classifier accuracy, and it is not this electronic-health-record study.",
    },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Problem statement" },
    {
      kind: "body",
      text: "Disease risk is often recognised only after symptoms are established, when the opportunity to act earlier may already be narrower. Electronic health records hold information that could support earlier risk stratification, but those records are uneven, sometimes incomplete, and always sensitive.",
    },
    {
      kind: "body",
      text: "The problem this proposal addresses is how to compare standard predictive models for early disease risk detection on electronic health record data, and how to explain the predictions, without treating a research metric as a clinical decision.",
    },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Objectives" },
    { kind: "bullet", text: "Review published research on machine learning for early disease risk detection using electronic health records." },
    { kind: "bullet", text: "Select one ethically accessible dataset and document its population, features, missingness, and known biases." },
    { kind: "bullet", text: "Define the prediction outcome and time horizon, then prepare the data without leaking information into the test set." },
    { kind: "bullet", text: "Train and compare logistic regression, random forest, XGBoost, and support vector machine models." },
    { kind: "bullet", text: "Evaluate the models with accuracy, precision, recall, F1-score, and ROC-AUC." },
    { kind: "bullet", text: "Apply SHAP to interpret feature contributions for the selected model or models." },
    { kind: "bullet", text: "State the privacy, bias, and clinical-use limits of any finding." },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Research questions" },
    { kind: "bullet", text: "To what extent can these models estimate early disease risk from the features available in the selected electronic health records?" },
    { kind: "bullet", text: "How do logistic regression, random forest, XGBoost, and support vector machines compare on accuracy, precision, recall, F1-score, and ROC-AUC?" },
    { kind: "bullet", text: "Which features contribute most to the predictions according to SHAP, and how should those explanations be read?" },
    { kind: "bullet", text: "What limits of data quality, bias, and privacy must qualify the findings?" },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Methodology" },
    {
      kind: "body",
      text: "The study is planned in six stages. None of these stages has been carried out, and no dataset has been selected.",
    },
    {
      kind: "body",
      text: "1. Literature review. Survey peer-reviewed work on electronic health record risk prediction, evaluation practice, and explainable AI in healthcare. Use that review to fix the clinical question, the outcome definition, and the prediction horizon before any model is trained.",
    },
    {
      kind: "body",
      text: "2. Dataset selection. Use a public dataset with a clear licence, or a dataset available under institutional approval. Record who it represents and what it cannot support. No identifiable patient data is collected for this proposal.",
    },
    {
      kind: "body",
      text: "3. Data preparation. Define the cohort and the outcome from the selected records. Inspect missing values, coding differences, and class balance before choosing how to handle them. Where records are longitudinal, split training, validation, and test data by patient so that one person's later visits do not leak into training.",
    },
    {
      kind: "body",
      text: "4. Model development. Train logistic regression, random forest, XGBoost, and a support vector machine as comparable candidates. Tune hyperparameters on validation data only. Reserve the test set for one final comparison.",
    },
    {
      kind: "body",
      text: "5. Evaluation and explanation. Compare the models with accuracy, precision, recall, F1-score, and ROC-AUC. Discuss the decision threshold in relation to false negatives and false positives. Apply SHAP so feature contributions can be read alongside the scores.",
    },
    {
      kind: "body",
      text: "6. Ethical boundary. Keep the work inside research evaluation. A later clinical use would need separate validation, clinical collaboration, and the appropriate regulatory review. This proposal is not a plan to deploy a diagnostic system.",
    },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Candidate algorithms" },
    {
      kind: "body",
      text: "These are candidate algorithms for the comparison. They have not been trained for this project, and no ranking among them is claimed.",
    },
    { kind: "bullet", text: "Logistic regression. A transparent linear baseline for binary risk estimation." },
    { kind: "bullet", text: "Random forest. An ensemble of decision trees that can represent non-linear relationships among mixed clinical features." },
    { kind: "bullet", text: "XGBoost. Gradient-boosted trees, included because they are often strong on structured tables when validation is kept strict." },
    { kind: "bullet", text: "Support vector machine. A margin-based classifier trained on the same prediction task, included for comparison." },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Evaluation metrics" },
    {
      kind: "body",
      text: "The planned metrics are accuracy, precision, recall, F1-score, and ROC-AUC. There are no scores to report, because the models have not been trained. A high score on one metric would not, by itself, show that a model is suitable for clinical use.",
    },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Explainable AI" },
    {
      kind: "body",
      text: "SHAP (SHapley Additive exPlanations) is the explainability method planned for this study. The intention is to report global feature importance and to inspect local explanations for individual records.",
    },
    {
      kind: "body",
      text: "SHAP has not been applied in this project. When explanations exist, they will be a way to scrutinise the model. They will not be described as proof of clinical cause, and they will not replace a clinician's judgement.",
    },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Expected outcomes" },
    {
      kind: "body",
      text: "If the study is completed under supervision, the expected outputs are prospective. This proposal does not report them as achieved.",
    },
    { kind: "bullet", text: "A written comparison of the four candidate models on one defined early-risk task." },
    { kind: "bullet", text: "A clear account of the dataset, including the population it represents and the limits of that data." },
    { kind: "bullet", text: "A SHAP-based discussion of feature contributions for the model chosen for interpretation." },
    { kind: "bullet", text: "An explicit statement of privacy, bias, and the boundary between research performance and clinical use." },
    { kind: "bullet", text: "Thesis material suitable for a Master's by Research in Computer Science, directed toward healthcare AI." },
    { kind: "gap", amount: 8 },
    { kind: "h", text: "Preparation already underway" },
    { kind: "bullet", text: "The proposal text on this page and on the portfolio site." },
    { kind: "bullet", text: "Reading on logistic regression, random forests, gradient boosting, and support vector machines." },
    { kind: "bullet", text: "Study of Python, Pandas, and NumPy for later tabular preparation. No analysis has been run." },
    { kind: "bullet", text: "Study of SHAP and its limits. The method has not been applied." },
  ],
  "Mahbub Ali  |  Research proposal",
);

mkdirSync(documentsDir, { recursive: true });
writeFileSync(join(documentsDir, "mahbub-ali-cv.pdf"), buildPdf(cv));
writeFileSync(join(documentsDir, "research-proposal.pdf"), buildPdf(proposal));
console.log(`Wrote CV (${cv.length} pages) and research proposal (${proposal.length} pages).`);
