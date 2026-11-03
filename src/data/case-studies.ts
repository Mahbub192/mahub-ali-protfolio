export type CaseStep = {
  title: string;
  detail: string;
};

export type CasePair = {
  title: string;
  detail: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  overview: readonly string[];
  problem: readonly string[];
  solved: readonly string[];
  role: readonly string[];
  features: readonly string[];
  architecture: readonly CaseStep[];
  technologies: readonly string[];
  challenges: readonly CasePair[];
  impact: readonly string[];
  future: readonly string[];
  research: readonly string[];
  limits: string;
};

const attribution =
  "I am including this system because its source is part of the software work behind this portfolio. The notes follow the code. They do not add patient volumes, accuracy percentages, or a claim that one person authored every file.";

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "mediscan-pro",
    title: "MediScan Pro",
    overview: [
      "MediScan Pro is a low-cost endoscopy software platform for Android phones and tablets. The endoscope connects over USB. The application works offline, so a hospital without an internet connection can still capture the visit and produce a report. In the Expo configuration the same application is branded Sakura Endoscope.",
      "The working path runs from patient intake, through camera capture, to a locally stored HTML report that can be printed or shared. A separate Python pipeline trains a five-class otoscopy image classifier and exports TensorFlow Lite. The Android build shows that label as a suggestion, not as a diagnosis.",
      "A field study in Dhaka in May 2025 used the platform in routine endoscopy work. Fifteen doctors used MediScan Pro in 120 procedures. Usual diagnosis took 2–3 days. A report from MediScan Pro took about 10–15 minutes. The doctors rated ease of use 7 out of 10. The reported investment could be recovered after 15–20 procedures.",
    ],
    problem: [
      "In many hospitals, endoscopy still depends on expensive dedicated hardware. Patients can wait days for a diagnosis, and a clinic without a reliable network cannot use a system that must stay online.",
      "A phone or tablet can close that gap only if it accepts a USB endoscope camera, keeps the visit on the device, and prints a report without waiting for a server. A low-confidence image label must also not be shown as a firm diagnosis.",
    ],
    solved: [
      "The app keeps intake details, images, optional video, and report HTML in device storage, so the capture workflow does not require a central server.",
      "Android can use a native USB video-class camera bridge when that module is present, and falls back to the device camera. Web capture uses the browser camera stream.",
      "Each scored image can be marked uncertain when the top class probability is below 0.62, which is the threshold written in the Android classifier.",
    ],
    role: [
      "I am including this system because its source is part of the software work behind this portfolio. The software notes follow the code. The May 2025 field summary is reported separately. It is not a claim that one person authored every file, and it is not a classifier accuracy result.",
      "The behaviour described here is what the Expo screens, the Android USB and TensorFlow Lite modules, and the mediscan-ml scripts implement. The Dhaka figures are the May 2025 field summary for this portfolio. A marketing site in the same repository is not used as evidence of regulatory compliance.",
    ],
    features: [
      "Login and session stored on the device, with passwords kept as SHA-256 hashes rather than as plain text.",
      "Clinic profile, doctor name, procedure types, and referrer lists that can be edited in the app.",
      "New-patient intake with a generated record number in the form ENT-year-five digits.",
      "Capture from USB camera, device camera, browser camera, or the image picker, then a 4-image or 6-image report layout.",
      "A web-based rich text report, A4 HTML for print or share, a local report index, and CSV export of the report list.",
      "Android on-device classification into acute otitis media, cerumen impaction, chronic otitis media, myringosclerosis, or normal.",
    ],
    architecture: [
      {
        title: "Expo application",
        detail:
          "React Native screens and Zustand stores run intake, capture, layout, reports, and profile. Report files and the index live under the app document directory.",
      },
      {
        title: "Android native layer",
        detail:
          "A USB camera package talks to UVC devices. A separate Otoscopy module loads otoscopy.tflite, resizes a centre crop to 224 pixels, and returns the top class plus an uncertain flag.",
      },
      {
        title: "Training path",
        detail:
          "Python scripts split an otoscopic image folder, train EfficientNet-B0 in TensorFlow with a frozen base and a later unfreeze stage, and export TensorFlow Lite. A notebook is included for Colab. This page does not report the training metrics.",
      },
      {
        title: "What is outside the core loop",
        detail:
          "An API base URL can be configured, but the project reference describes the capture workflow as local. Subscription and device-management screens exist in the app. They are not described here as a completed billing platform.",
      },
    ],
    technologies: [
      "Expo",
      "React Native",
      "TypeScript",
      "Zustand",
      "Kotlin and Java",
      "TensorFlow",
      "TensorFlow Lite",
      "USB Video Class",
    ],
    challenges: [
      {
        title: "More than one camera source",
        detail:
          "The capture screen branches between the native USB preview, the Expo camera, and a web stream, so the same visit flow can run on a handset and in a browser.",
      },
      {
        title: "Keeping a weak prediction from looking certain",
        detail:
          "The Android classifier withholds a firm label below a fixed confidence. The capture screen copies that uncertain state into the badge the user sees.",
      },
      {
        title: "Reports without a mandatory server",
        detail:
          "Images and HTML are archived on the device. That avoids a network dependency during capture, and it also means this build is not a multi-clinic record system.",
      },
    ],
    impact: [
      "In Dhaka, in May 2025, 15 doctors used MediScan Pro during 120 endoscopy procedures. Report generation took about 10–15 minutes, against 2–3 days for the usual diagnosis path. Ease of use was rated 7 out of 10, and the reported investment could be recovered after 15–20 procedures.",
      "The practical result in the software is the same workflow those visits used: identify the patient, capture from a USB or device camera, write the report on the handset, and print or share it without an internet connection.",
      "The on-device classifier remains a suggestion attached to that workflow. The Dhaka summary does not report sensitivity or specificity, so this page does not treat the model as a measured diagnostic test.",
    ],
    future: [
      "The same field question should be repeated in other hospitals. One city, one month, and 120 procedures are not a multi-centre result.",
      "Central sync, shared record numbers across devices, and an audit trail remain outside the current core scope described in the project notes.",
      "USB video recording is not presented as a finished feature. A later classifier study would still need an expert-labelled test set. That evaluation is not part of the May 2025 summary.",
    ],
    research: [
      "The field result is an operations finding: offline USB capture shortened report time and was acceptable to the doctors who used it. It is not an accuracy result for the five-class otoscopy model.",
      "That model is still a relevant example of medical image classification. How often the uncertain threshold fires, and how the classes compare with an expert label, remains open. SHAP is not implemented here, and this study is not the electronic-health-record risk study proposed elsewhere on the site.",
    ],
    limits:
      "The May 2025 figures are a field summary: setting, number of doctors, number of procedures, report time, a 7-out-of-10 ease-of-use score, and cost recovery after 15–20 procedures. They are not a sensitivity or specificity result, and no patient photograph is shown. Marketing copy that calls the product regulatory-compliant is not adopted.",
  },
  {
    slug: "sakura-ent-center",
    title: "Sakura ENT Center",
    overview: [
      "Sakura ENT Center is a clinic website and appointment system. The public site is an Angular application. The API is a NestJS service. A separate Android application renders the waiting-room queue on a television.",
      "The public website is available at sakuraentcenter.com. This case study describes the repositories behind that product. It does not add visit counts or business results.",
    ],
    problem: [
      "A single-doctor ENT clinic needs a public site, a way for patients to request a time, and a screen in the waiting room that shows who is being called.",
      "Staff also need chambers, slots, assistants, and a record of patients and appointments. Content such as services, news, and frequently asked questions has to be editable without rewriting the site.",
    ],
    solved: [
      "The Angular app covers the public pages and staff areas, including appointments, patients, assistants, and a TV-display module. English and Bengali translation files are part of the site.",
      "The API exposes authentication, patients, appointments, slots, chambers, public booking, and a Socket.IO channel for live booking updates.",
      "The television app polls the live queue, lists patients with serial numbers and status, shows break information, and can speak queue prompts with Android text-to-speech.",
    ],
    role: [
      attribution,
      "The backend package describes the author as the Sakura team. This page therefore reports the implemented modules, not a line-by-line authorship audit.",
    ],
    features: [
      "Public pages for the clinic, services, doctor, schedule, publications, news, blog, FAQ, and contact.",
      "Patient and assistant areas, plus doctor-side management of page content.",
      "Appointment slots, chambers, breaks, and public booking.",
      "JWT authentication, password hashing with bcrypt, and activity and login-security modules.",
      "Waiting-room display with doctor and chamber details, present and absent lists, and a scrolling banner.",
      "An SMS module is present in the API. This page does not report how many messages were sent.",
    ],
    architecture: [
      {
        title: "Angular clinic site",
        detail:
          "The frontend is organised into feature modules and calls the API. Socket.IO client code is included for live booking updates. Translation files supply English and Bengali copy.",
      },
      {
        title: "NestJS API",
        detail:
          "TypeORM maps the domain onto PostgreSQL. Passport and JWT protect staff routes. Public booking and the television endpoints sit beside the content modules for pages, uploads, and theme settings.",
      },
      {
        title: "Android TV client",
        detail:
          "The Kotlin app stores a base URL, requests live chamber data, and refreshes the list. A WebView can show chamber video. Text-to-speech is used for queue calls.",
      },
    ],
    technologies: [
      "Angular",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "Socket.IO",
      "Kotlin",
      "Android text-to-speech",
    ],
    challenges: [
      {
        title: "One queue, three surfaces",
        detail:
          "The website, the API, and the television have to agree on serial number, status, and chamber. The TV client accepts more than one JSON name for the serial field so small API differences do not blank the board.",
      },
      {
        title: "Live booking without a full page reload",
        detail:
          "A Socket.IO module on the API and a matching client on the web app carry booking updates. The television app also refreshes on a timer, so a missed socket event is not the only update path.",
      },
      {
        title: "A waiting room is not a silent webpage",
        detail:
          "The television layout has to show the current list, absent patients, a break state, and optional video, and speak a call without covering the list.",
      },
    ],
    impact: [
      "Patients can read the clinic site and book. Staff can run the appointment list. The waiting room can show the same queue on a television.",
      "That is an operational system. It is not a research dataset, and it is not evidence for the proposed disease-risk study.",
    ],
    future: [
      "The same API is called by the separate prescription-writing application for chambers, patients, and appointments. Joining the written prescription to the visit more tightly is future product work, not a result already claimed here.",
      "Queue events could later be studied as operational data. No such analysis is included in these repositories.",
    ],
    research: [
      "The appointment and queue records are a possible source of operational questions, such as waiting time and no-show patterns. Using them for research would need permission, a defined question, and a separation from routine clinical operations.",
      "They are not electronic health record features of the kind proposed for early disease risk detection, and no predictive model is trained on them in this code.",
    ],
    limits:
      "The live website link is the public clinic site. This case study does not quote traffic, revenue, or clinical outcomes. An SMS module in the API is not described as a measured messaging programme.",
  },
  {
    slug: "prescription-writing",
    title: "Prescription writing",
    overview: [
      "This is a Next.js application for writing and administering prescriptions. Doctors work in a prescribing screen. Administrators maintain medicines, generics, companies, interactions, investigations, and templates.",
      "The database is PostgreSQL, described with Drizzle migrations. A PowerSync schema mirrors the catalogue and patient records into browser SQLite so the doctor screen can work from a local copy. The doctor screen can also open Sakura chambers, patients, and appointments.",
    ],
    problem: [
      "A prescription is more than a free-text note. It needs a medicine identity, dose limits, allergy and pregnancy context, and a way to see when two generics interact.",
      "Clinics also need separate duties: a platform editor maintains the shared catalogue, while a clinic admin, doctor, or assistant works inside a tenant. A printed or shared prescription needs a status, so a draft is not treated as final.",
    ],
    solved: [
      "The schema distinguishes draft and final prescriptions, and records encounters as waiting, in progress, done, or cancelled.",
      "Generics can store an AWaRe group, a pregnancy category, and maximum dose fields. Interactions have a severity and a management note.",
      "A public route can open a prescription by token. The admin area includes audit, import, medicine requests, and specialty templates in both English and Bengali fields.",
    ],
    role: [
      attribution,
      "Sakura appointment code in this repository is a client of the clinic API. It is not a second copy of the NestJS backend.",
    ],
    features: [
      "Login, password reset, and platform roles for a super admin and a data editor.",
      "Tenant roles for clinic admin, doctor, and assistant, with tenant status of pending, active, or suspended.",
      "Catalogue screens for medicines, generics, companies, interactions, and a laboratory catalogue.",
      "Specialty templates and snippet libraries for complaints, history, investigations, diagnoses, advice, and instructions.",
      "Patient fields for consent, allergies, pregnancy status, guardian, and referral.",
      "From the doctor screen, list chambers, find a patient by phone, create or update an appointment, and add a sub-patient on an existing appointment.",
    ],
    architecture: [
      {
        title: "Next.js web application",
        detail:
          "Doctor and admin routes are React Server and client components. Zod is among the dependencies used around the application boundary.",
      },
      {
        title: "PostgreSQL and Drizzle",
        detail:
          "The SQL migration defines the catalogue, patients, encounters, and prescriptions, including the status and role enums named above.",
      },
      {
        title: "PowerSync in the browser",
        detail:
          "The client schema mirrors selected columns into SQLite. Boolean and structured values arrive in the simplified types PowerSync supports.",
      },
      {
        title: "Sakura API client",
        detail:
          "A small client and a realtime booking helper call chambers, patients, and appointments. Queue ordering and serial display are handled in the Sakura utility module of this app.",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Drizzle",
      "PowerSync",
      "Socket.IO client",
      "Zod",
    ],
    challenges: [
      {
        title: "A shared catalogue and a local prescribing screen",
        detail:
          "The server remains the system of record, while the browser keeps a synced copy for the doctor. The schema comments record which columns are mirrored and how types are reduced for SQLite.",
      },
      {
        title: "Safety information without pretending to be a decision system",
        detail:
          "Interaction severity, pregnancy category, and dose ceilings are stored as data. This page does not claim that the software has been validated as a clinical decision-support device.",
      },
      {
        title: "Two products, one visit",
        detail:
          "Prescription writing and the Sakura appointment API are separate codebases. The doctor screen bridges them for booking. A single shared clinical record is not claimed.",
      },
    ],
    impact: [
      "The implemented outcome is a structured prescribing workspace: catalogue, patient context, draft and final prescriptions, and a path into the clinic appointment list.",
      "No prescribing-error rate or adoption figure is available from the source, so none is stated.",
    ],
    future: [
      "Dose checks could be evaluated against a labelled set of prescriptions. That evaluation is not in the repository.",
      "Linking the final prescription to the Sakura visit identifier in one record would make later audit easier. The current bridge creates and updates appointments; it is not described as a unified archive.",
    ],
    research: [
      "Structured prescriptions are a possible data source for medication-safety research, including interaction alerts and antibiotic grouping. Using them would require ethics approval and a question defined before any count is treated as a result.",
      "This system does not train a predictive model, and it is not presented as the early disease risk study on the research page.",
    ],
    limits:
      "Interaction text and dose fields are data-model features. They are not reported here as measured reductions in prescribing error. No patient prescription is reproduced.",
  },
  {
    slug: "ehealth-app",
    title: "EHealth App",
    overview: [
      "EHealth App is the portfolio name for the healthcare application published as HealthConnect. It was built in React Native and Expo from the start of the product. A patient can search for a doctor, book an appointment, open reports and digital prescriptions, and request a home visit from a doctor, a nurse, or a physiotherapist.",
      "The client integrates Firebase, calls REST APIs, and handles authentication and notifications. This case study is about the harder systems problems inside that scope: who may book a clinician, how a home visit differs from a chamber appointment, and what a phone is allowed to hold when the document is clinical.",
      "The application source was not in the repositories reviewed for MediScan Pro, Sakura ENT Center, and prescription writing. Internal file names are therefore not cited. No download count, rating, or clinical outcome is stated.",
    ],
    problem: [
      "A patient-facing health app is a consistency and trust problem, not only a set of screens. Two patients can try to book the same clinician. A home visit by a nurse is not the same workflow as a chamber appointment or a physiotherapy visit. A report or prescription is a clinical document, not a chat message.",
      "Authentication has to identify the right person, and a notification has to reach that person, without making the phone a second copy of the clinical record.",
    ],
    solved: [
      "The app provides doctor search and appointment booking.",
      "It opens patient reports and digital prescriptions.",
      "It offers home services for a doctor, a nurse, and physiotherapy as separate kinds of visit.",
      "Firebase, REST APIs, authentication, and notifications are part of the client integration that supports those workflows.",
    ],
    role: [
      attribution,
      "The published store name is HealthConnect. Store links stay on the Professional Experience card and are not repeated on the SakuraEHealth card.",
    ],
    features: [
      "Doctor search followed by appointment booking, so discovery and reservation are one patient path.",
      "Patient reports and digital prescriptions as documents the patient can open, rather than as unstructured messages.",
      "Three home-service types on one client: doctor, nurse, and physiotherapy.",
      "Authentication for the signed-in patient, and notifications tied to that account.",
      "A REST API boundary, so search, booking, documents, and home visits are not stored only on the device.",
    ],
    architecture: [
      {
        title: "Expo client",
        detail:
          "React Native and Expo provide the patient interface on Android and iOS. The client starts the workflows. It is not described here as the system of record.",
      },
      {
        title: "REST API as the operational boundary",
        detail:
          "Doctor search, booking, reports, prescriptions, and home-service requests cross a REST API. That split keeps the clinical operation on the server side of the call, even though the patient starts it on the phone.",
      },
      {
        title: "Authentication and notifications",
        detail:
          "Sign-in identifies the account that may book, read a document, or request a home visit. Notifications tell that account about a change. Firebase is part of this integration. This page does not assign an unstated Firebase product to a particular call.",
      },
      {
        title: "Two visit models",
        detail:
          "A chamber appointment and a home visit are different services. The home path itself splits into doctor, nurse, and physiotherapy, because the person who attends and the reason for the visit are not the same in each case.",
      },
    ],
    technologies: ["React Native", "Expo", "Firebase", "REST APIs"],
    challenges: [
      {
        title: "Booking consistency",
        detail:
          "Search can show a clinician who is no longer free by the time the patient confirms. The advanced requirement is that a booking is a reservation against a shared schedule, not a form that only the phone remembers. This page does not claim a particular locking method, because that method was not re-read from source.",
      },
      {
        title: "Three home-service workflows",
        detail:
          "Doctor, nurse, and physiotherapy visits share a patient and a place, but not a clinical role. Treating them as one generic 'home call' would hide who is expected to attend. The app keeps them as distinct services.",
      },
      {
        title: "Clinical documents on a personal device",
        detail:
          "A report or prescription has to be readable by the patient who is signed in, and not by the next person who opens the phone. The advanced constraint is data minimization: the device displays the document, and the API remains the place the record is kept.",
      },
      {
        title: "A notification is not a clinical decision",
        detail:
          "A push alert can say that an appointment changed. It should not be the authority for the booking, the report, or the prescription. Those stay behind authentication and the API. Delivery of a notification is not treated here as proof that the patient acted on it.",
      },
    ],
    impact: [
      "The product is a published patient application covering doctor search, booking, reports, digital prescriptions, and three kinds of home visit, with authentication and notifications.",
      "No install count, rating, waiting time, or health outcome is available from a source review, so none is stated.",
    ],
    future: [
      "A later version could record why a booking failed when two requests meet, and could attach a prescription identifier to the visit. Neither control is claimed as already measured.",
      "Operational traces from search and booking could support an access or waiting-time question. That would be a new study, with permission, and it is not part of this app.",
    ],
    research: [
      "The app is relevant to healthcare systems research because it produces appointments, service type, and document access. Those are operational events. They are not a labelled set for early disease risk prediction.",
      "No machine-learning model is trained in this application. It is not the proposed research study on the research page.",
    ],
    limits:
      "This account follows the published product scope: React Native, Expo, Firebase, REST APIs, authentication, notifications, and the patient workflows named above. It does not cite unread source files, store rankings, or clinical outcomes. HealthConnect on the experience page is the same application.",
  },
  {
    slug: "sakura-ehealth",
    title: "SakuraEHealth",
    overview: [
      "SakuraEHealth is the niche company I am establishing for health-related software. Its products on this portfolio are MediScan Pro, Sakura ENT Center, prescription writing, hospital management, and the EHealth app.",
      "The company website is the Angular site in the studio repository. That source still uses the earlier Sakura IT naming in its content files. This portfolio presents the same site as SakuraEHealth. Its routes cover home, services, industries, case pages, articles, careers, about, contact, consultation, legal pages, and prayer times.",
      "The prayer-times page depends on the package @mahbub_ali/prayer-times. The site content file also contains marketing case studies, testimonials, and figures. Those figures are not repeated here, because they were not independently verified.",
    ],
    problem: [
      "The company needs a public site that explains the work and how to start a conversation, while the clinical products remain separate systems rather than one merged application.",
    ],
    solved: [
      "The Angular app renders the public information architecture from typed content modules and shared page parts.",
      "Contact and consultation pages submit an enquiry. The prayer-times page is a separate utility page, not a clinical feature.",
    ],
    role: [
      attribution,
      "I do not treat the sample client metrics inside the website content as personal achievements.",
    ],
    features: [
      "Service, industry, audience, article, and career pages driven by structured content.",
      "Contact and consultation enquiries.",
      "Search-engine files for robots and a sitemap.",
      "A prayer-times view backed by a published calculation package under the @mahbub_ali scope.",
    ],
    architecture: [
      {
        title: "Angular standalone pages",
        detail:
          "Routes map to page components. Shared header and footer wrap the site. Content objects supply the copy so pages stay consistent.",
      },
      {
        title: "Enquiry path",
        detail:
          "Consultation and contact pages collect a request. This case study does not claim a particular delivery rate for those messages.",
      },
      {
        title: "Prayer times",
        detail:
          "The page calls the prayer-times package rather than reimplementing the astronomical calculation in the page component.",
      },
    ],
    technologies: ["Angular", "TypeScript", "RxJS"],
    challenges: [
      {
        title: "Keeping marketing copy out of the academic record",
        detail:
          "The content model has fields for client metrics and testimonials. The portfolio page uses the site structure and leaves those numbers uncited.",
      },
      {
        title: "One company name, separate codebases",
        detail:
          "MediScan Pro, Sakura ENT Center, prescription writing, hospital management, and the EHealth app are grouped under SakuraEHealth. They remain separate codebases. They are not one deployed platform.",
      },
    ],
    impact: [
      "The visible result is the company website for SakuraEHealth, with a clear set of pages and an enquiry path. The five healthcare products are described on their own cards.",
    ],
    future: [
      "If a public URL is the canonical one, it can be added to the project card later. No address is inferred here.",
    ],
    research: [
      "This website is not a healthcare AI system. It is listed because the source was part of the software work under review, and it is kept separate from the research proposal.",
    ],
    limits:
      "No client results, ratings, or testimonials from the website content file are reproduced on this page. Renaming the portfolio entry to SakuraEHealth does not mean the source files have already been renamed.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
