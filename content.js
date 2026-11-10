// ============================================================
//  EDIT THIS FILE — all of your site's content lives here.
//  You never need to touch index.html, styles.css or main.js.
// ============================================================

// Google Analytics 4 Measurement ID (looks like "G-ABC123XYZ").
// Leave empty "" until you have one — analytics stays off.
const GA_MEASUREMENT_ID = "";

const SITE = {
  name: "Prasidha Laudari",
  initials: "PL",
  // Photos of you. The first shows at the top, the second in About.
  // Clicking either one opens the full-size photo viewer.
  photos: [
    { src: "me.jpg", width: 800, height: 800, alt: "Headshot of Prasidha Laudari wearing glasses and a blue checked blazer" },
    { src: "portrait.jpg", width: 1000, height: 1250, alt: "Prasidha Laudari in a blue checked blazer, standing in a park in Auckland" },
  ],
  role: "Bachelor of Information Technology · Software Development",
  availability: "Open to internship and graduate roles",
  tagline:
    "Final-year IT student in Auckland, building desktop, web and mobile apps — open to internship and graduate roles.",
  about: [
    "Hi! I'm Prasidha, a final-year Bachelor of Information Technology student at Auckland Institute of Studies, majoring in Software Development.",
    "I've built booking systems with C# and SQL Server, and websites and mobile apps for companies using C# and Kotlin. Right now I'm wrapping up a six-month industry project with a company in Tonga.",
    "I'm looking for internship or graduate opportunities in software engineering in New Zealand.",
  ],
  facts: [
    ["Based in", "Auckland, New Zealand"],
    ["Studying", "Bachelor of IT, Software Development"],
    ["College", "Auckland Institute of Studies"],
    ["Graduating", "December 2026"],
    ["I speak", "English, Nepali, Hindi"],
  ],
  graduates: "Dec 2026", // shown in the numbers strip at the top
  resumeUrl: "", // e.g. "resume.pdf" (put the file in this folder) — leave "" to hide the button

  // ---- Things you've DONE ----
  // To add screenshots, put the image files in this folder and list them:
  //   images: [{ src: "hospital-1.png", caption: "Booking screen" }, { src: "hospital-2.png" }],
  // Until then, each project shows its drawn cover (hospital, gym, devices or island).
  projects: [
    {
      title: "Industry Project — Tonga",
      description:
        "A six-month software project for a company based in Tonga. Currently in the final stage before submission.",
      status: "In progress",
      featured: true,
      cover: "island",
      tags: ["Industry", "Client work"],
      images: [],
      link: "",
      code: "",
    },
    {
      title: "Websites & Mobile Apps for Companies",
      description:
        "Websites and mobile applications built for several companies using C# and Kotlin.",
      cover: "devices",
      tags: ["C#", "Kotlin", "Android Studio"],
      images: [],
      link: "",
      code: "",
    },
    {
      title: "Hospital Booking System",
      description:
        "A booking management system for appointments and scheduling, with SQL database integration for storing and retrieving records and a focus on user-friendly design.",
      cover: "hospital",
      tags: ["C#", "SQL Server", "Windows Forms"],
      images: [],
      link: "",
      code: "https://github.com/prasidhalaudari/hospital_booking_system",
    },
    {
      title: "Gym Booking System",
      description:
        "An application to manage gym session bookings and member schedules — a working prototype covering the full development lifecycle.",
      cover: "gym",
      tags: ["C#", "SQL Server", "Windows Forms"],
      images: [],
      link: "",
      code: "https://github.com/prasidhalaudari/Gym_Booking_System",
    },
  ],

  // ---- Skills ----
  skills: [
    { group: "Languages", items: ["C#", "Java", "Python", "Kotlin", "SQL"] },
    { group: "Web, mobile & desktop", items: ["Web application development", "Android apps (Kotlin)", "Android Studio", ".NET Windows Forms"] },
    { group: "Software engineering", items: ["Object-oriented programming", "Systems analysis & design", "Requirements modelling", "Software testing", "Human-computer interaction (UX)"] },
    { group: "Databases & business systems", items: ["Database design", "SQL Server (SSMS)", "ERP systems", "E-business & m-commerce"] },
    { group: "Networking & security", items: ["Computer networking", "Network security", "Information systems security", "Operating systems", "Cisco Packet Tracer"] },
    { group: "IT operations", items: ["IT service management", "Systems maintenance", "Hardware & software provisioning"] },
    { group: "Professional", items: ["IT project management", "Software development lifecycle", "Debugging & problem solving", "Maths & statistics"] },
  ],

  // ---- Courses at Auckland Institute of Studies ----
  // Each course: [code, title, level, credits]
  coursework: [
    {
      year: "2024",
      courses: [
        ["COMP518", "Information Technology Systems Maintenance and Service Management", 5, 15],
        ["COMP517", "Hardware and Software Service Provisioning", 5, 15],
        ["COMP510", "Fundamentals of Information Systems and Technology", 5, 15],
        ["COMP511", "Information Technology Professional Skills", 5, 15],
        ["COMP514", "Fundamentals of Computer Databases", 5, 15],
        ["COMP516", "Fundamentals of Network Security", 5, 15],
        ["COMP515", "Fundamentals of Computer Networking", 5, 15],
        ["COMP513", "Fundamentals of Computer Programming", 5, 15],
      ],
    },
    {
      year: "2025",
      courses: [
        ["COMP621", "Operating Systems", 6, 15],
        ["SOFT605", "Object Oriented Programming", 6, 15],
        ["COMP601", "Systems Analysis and Design", 6, 15],
        ["MATH501", "Essentials of Mathematics and Statistics", 5, 15],
        ["COMP602", "Computer System Testing", 6, 15],
        ["COMP617", "Requirements Modelling", 6, 15],
        ["COMP609", "Information Systems Security", 6, 15],
        ["SOFT606", "Desktop Applications Development", 6, 15],
      ],
    },
    {
      year: "2026",
      courses: [
        ["COMP701", "Information Technology Project Management", 7, 15],
        ["SOFT708", "Mobile Applications Development", 7, 15],
        ["INFO620", "Enterprise Resource Planning Systems", 6, 15],
        ["COMP720", "Information Technology Project", 7, 30],
        ["SOFT703", "Web Applications Development", 7, 15],
        ["SOFT704", "Human-Computer Interaction", 7, 15],
        ["INFO714", "E-Business Strategies and M-Commerce", 7, 15],
      ],
    },
  ],

  // ---- Things you're LEARNING / working on now ----
  // progress: 0–100 shows a bar; leave it out to hide the bar
  learning: [
    {
      topic: "Six-month industry project with a company in Tonga",
      note: "Real-world client delivery, teamwork and project management — final stage of submission",
      progress: 90,
    },
    {
      topic: "Final year of my Bachelor of IT",
      note: "Software Development major at Auckland Institute of Studies — graduating Dec 2026",
    },
  ],

  // ---- Timeline (education, jobs, milestones) — newest first ----
  journey: [
    { when: "Dec 2026", what: "Expected graduation — Bachelor of Information Technology", where: "Auckland Institute of Studies" },
    { when: "2026", what: "Six-month industry project", where: "Company based in Tonga" },
    { when: "May 2026 – Present", what: "Turndown Attendant", where: "Park Hyatt Auckland — balancing five-star service with full-time study" },
    { when: "Feb 2024 – Apr 2026", what: "Housekeeping Staff", where: "Auckland City Hotel" },
  ],

  contactBlurb:
    "Open to internships, graduate roles and collaborations. If you think I'd be a good fit for your team, I'd love to hear from you.",
  contact: [
    { label: "Email", url: "mailto:prasidhala@gmail.com" },
    { label: "GitHub", url: "https://github.com/prasidhalaudari" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/prasidha-laudari" },
  ],
};
