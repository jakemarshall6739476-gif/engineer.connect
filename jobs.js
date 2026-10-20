// Engineer Connect: data for the Jobs page.
// Option lists for the vacancy form, ready-made hiring templates, and example jobs.

var JOB_OPTIONS = {
  level: ["Apprentice", "Graduate", "Junior", "Mid-level", "Senior", "Lead", "Principal", "Manager"],
  type: ["Full-time", "Part-time", "Contract", "Temporary", "Apprenticeship", "Internship"],
  pattern: ["On-site", "Hybrid", "Remote"],
  salaryPeriod: ["per year", "per day", "per hour"],
  qualification: ["No formal qualification needed", "GCSEs", "NVQ / City & Guilds Level 2", "NVQ / City & Guilds Level 3",
    "HNC", "HND", "Bachelor's degree", "Master's degree", "PhD"],
  registration: ["Not required", "EngTech", "IEng", "CEng", "Working towards chartership"],
  clearance: ["None", "BPSS", "SC (Security Check)", "DV (Developed Vetting)"],
  licence: ["Not needed", "Full UK car licence", "Van licence (C1)", "HGV licence"],
  travel: ["None", "Occasional", "Up to 25%", "Up to 50%", "Frequent"],
  benefits: ["Pension", "Overtime available", "Paid training", "Flexible hours", "25+ days holiday", "Bonus scheme",
    "Private healthcare", "Company vehicle", "Tools and PPE provided", "Relocation support", "Chartership support", "Cycle to work"],
  certs: ["Coded welder (ISO 9606)", "CSWIP inspection", "CSCS card", "18th Edition wiring", "IPAF / PASMA",
    "First aid", "SMSTS / SSSTS", "NEBOSH / IOSH", "Forklift", "Confined space", "ECS card", "Six Sigma"]
};

// Ready-made templates: role and ideal-candidate details an employer can start from.
var STARTER_TEMPLATES = [
  {
    name: "Coded welder / fabricator", builtIn: true,
    data: {
      title: "Coded Welder Fabricator", area: "mechanical", level: "Mid-level", type: "Full-time", pattern: "On-site",
      salaryPeriod: "per hour",
      summary: "Join our fabrication team building steel structures and pressure parts to drawing and specification.",
      responsibilities: ["Weld to coded procedures (MIG, TIG and stick)", "Read and work to fabrication drawings", "Fit, set up and tack assemblies", "Keep the workshop safe and tidy"],
      essentialSkills: ["MIG", "TIG", "Reading drawings"], desirableSkills: ["Pipe welding", "Stainless steel"],
      experience: "3", qualification: "NVQ / City & Guilds Level 3", registration: "Not required",
      certs: ["Coded welder (ISO 9606)"], licence: "Not needed", clearance: "None", travel: "Occasional",
      benefits: ["Overtime available", "Tools and PPE provided", "Pension", "Paid training"],
      workingStyle: "Takes pride in neat, accurate work and is happy working in a small team."
    }
  },
  {
    name: "Graduate mechanical engineer", builtIn: true,
    data: {
      title: "Graduate Mechanical Engineer", area: "mechanical", level: "Graduate", type: "Full-time", pattern: "Hybrid",
      salaryPeriod: "per year",
      summary: "A structured graduate role working on design projects alongside experienced engineers.",
      responsibilities: ["Produce 3D models and drawings in CAD", "Support design calculations and reviews", "Visit sites and the workshop to see designs built", "Work towards chartership"],
      essentialSkills: ["CAD (SolidWorks or Inventor)", "Engineering maths"], desirableSkills: ["FEA", "GD&T"],
      experience: "0", qualification: "Bachelor's degree", registration: "Working towards chartership",
      certs: [], licence: "Full UK car licence", clearance: "None", travel: "Occasional",
      benefits: ["Chartership support", "Paid training", "Flexible hours", "Pension"],
      workingStyle: "Curious, asks questions, and enjoys solving practical problems."
    }
  },
  {
    name: "Electrical design engineer", builtIn: true,
    data: {
      title: "Electrical Design Engineer", area: "electrical", level: "Senior", type: "Full-time", pattern: "Hybrid",
      salaryPeriod: "per year",
      summary: "Lead the electrical design of control panels and power distribution for industrial clients.",
      responsibilities: ["Design schematics and panel layouts", "Select and size cables, protection and drives", "Check designs against BS 7671", "Support commissioning on site"],
      essentialSkills: ["EPLAN or AutoCAD Electrical", "BS 7671"], desirableSkills: ["PLC", "Motor drives"],
      experience: "5", qualification: "HNC", registration: "IEng",
      certs: ["18th Edition wiring"], licence: "Full UK car licence", clearance: "None", travel: "Up to 25%",
      benefits: ["Bonus scheme", "Pension", "Flexible hours", "Chartership support"],
      workingStyle: "Organised and clear when explaining designs to clients and installers."
    }
  },
  {
    name: "Nuclear safety engineer", builtIn: true,
    data: {
      title: "Nuclear Safety Engineer", area: "nuclear", level: "Mid-level", type: "Full-time", pattern: "Hybrid",
      salaryPeriod: "per year",
      summary: "Write and review safety cases for nuclear plant and decommissioning projects.",
      responsibilities: ["Write and review safety case documents", "Run hazard identification workshops", "Work with design teams to reduce risk"],
      essentialSkills: ["Safety cases", "Hazard analysis"], desirableSkills: ["Radiological protection"],
      experience: "3", qualification: "Bachelor's degree", registration: "Working towards chartership",
      certs: [], licence: "Full UK car licence", clearance: "SC (Security Check)", travel: "Occasional",
      benefits: ["Pension", "Private healthcare", "Chartership support", "25+ days holiday"],
      workingStyle: "Careful, methodical and confident challenging assumptions."
    }
  }
];

var SAMPLE_JOBS = [
  {
    id: 1, company: "Midlands Steel Fabrications", website: "", location: "Wolverhampton", title: "Coded Welder Fabricator",
    area: "mechanical", level: "Mid-level", type: "Full-time", pattern: "On-site",
    salaryMin: "17", salaryMax: "21", salaryPeriod: "per hour", positions: "2", startDate: "", closingDate: "",
    summary: "Busy structural and pressure fabrication shop looking for two coded welders to join a friendly team.",
    responsibilities: ["Weld to coded procedures (MIG, TIG and stick)", "Read fabrication drawings", "Fit and tack assemblies"],
    essentialSkills: ["MIG", "TIG", "Reading drawings"], desirableSkills: ["Pipe welding"],
    experience: "3", qualification: "NVQ / City & Guilds Level 3", registration: "Not required",
    certs: ["Coded welder (ISO 9606)"], licence: "Not needed", clearance: "None", travel: "None", rightToWork: true,
    benefits: ["Overtime available", "Tools and PPE provided", "Pension"],
    workingStyle: "Neat, accurate work and a good team attitude.",
    applyMethod: "email", applyTarget: "jobs@example.com", applyNotes: "Send your CV and a copy of your welding certificates.",
    posted: "2026-10-15"
  },
  {
    id: 2, company: "Brightline Controls", website: "", location: "Bristol", title: "Electrical Design Engineer",
    area: "electrical", level: "Senior", type: "Full-time", pattern: "Hybrid",
    salaryMin: "48000", salaryMax: "58000", salaryPeriod: "per year", positions: "1", startDate: "", closingDate: "",
    summary: "Lead electrical design for control panels used in water treatment and food manufacturing.",
    responsibilities: ["Design schematics and panel layouts", "Size cables and protection", "Support commissioning"],
    essentialSkills: ["EPLAN", "BS 7671"], desirableSkills: ["PLC"],
    experience: "5", qualification: "HNC", registration: "IEng",
    certs: ["18th Edition wiring"], licence: "Full UK car licence", clearance: "None", travel: "Up to 25%", rightToWork: true,
    benefits: ["Bonus scheme", "Pension", "Flexible hours"],
    workingStyle: "Clear communicator who enjoys mentoring juniors.",
    applyMethod: "email", applyTarget: "careers@example.com", applyNotes: "",
    posted: "2026-10-12"
  },
  {
    id: 3, company: "Northshore Process Engineering", website: "", location: "Teesside", title: "Graduate Process Engineer",
    area: "chemical", level: "Graduate", type: "Full-time", pattern: "On-site",
    salaryMin: "32000", salaryMax: "35000", salaryPeriod: "per year", positions: "3", startDate: "", closingDate: "",
    summary: "Two-year graduate scheme on hydrogen and carbon capture projects.",
    responsibilities: ["Support process simulations", "Help prepare P&IDs and data sheets", "Take part in HAZOP studies"],
    essentialSkills: ["Mass and energy balances"], desirableSkills: ["Aspen HYSYS"],
    experience: "0", qualification: "Bachelor's degree", registration: "Working towards chartership",
    certs: [], licence: "Not needed", clearance: "None", travel: "Occasional", rightToWork: true,
    benefits: ["Chartership support", "Paid training", "Relocation support", "Pension"],
    workingStyle: "Enthusiastic about the energy transition.",
    applyMethod: "email", applyTarget: "graduates@example.com", applyNotes: "",
    posted: "2026-10-18"
  },
  {
    id: 4, company: "Cumbria Decommissioning Services", website: "", location: "Whitehaven", title: "Nuclear Safety Engineer",
    area: "nuclear", level: "Mid-level", type: "Full-time", pattern: "Hybrid",
    salaryMin: "45000", salaryMax: "55000", salaryPeriod: "per year", positions: "1", startDate: "", closingDate: "",
    summary: "Write and review safety cases for decommissioning projects.",
    responsibilities: ["Write safety case documents", "Run hazard workshops"],
    essentialSkills: ["Safety cases"], desirableSkills: ["Radiological protection"],
    experience: "3", qualification: "Bachelor's degree", registration: "Working towards chartership",
    certs: [], licence: "Full UK car licence", clearance: "SC (Security Check)", travel: "Occasional", rightToWork: true,
    benefits: ["Pension", "Private healthcare", "Chartership support"],
    workingStyle: "Careful and methodical.",
    applyMethod: "email", applyTarget: "hr@example.com", applyNotes: "",
    posted: "2026-10-09"
  }
];
