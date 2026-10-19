// Engineer Connect: the links shown on the News & Links page.
// area: "general" or one of the DISCIPLINES keys in app.js.
// To add a link, copy a line and change the details.

var LINK_TYPES = ["News", "Science", "Magazine", "Professional body", "Learning & tools"];

var LINKS = [
  // ---- General engineering and technology news ----
  { name: "The Engineer", url: "https://www.theengineer.co.uk/", area: "general", type: "News", about: "UK engineering and technology news, updated daily." },
  { name: "E&T (Engineering & Technology)", url: "https://eandt.theiet.org/", area: "general", type: "Magazine", about: "The IET's magazine on engineering and technology developments." },
  { name: "Engineering.com", url: "https://www.engineering.com/", area: "general", type: "News", about: "News, design software and manufacturing for engineers." },
  { name: "Interesting Engineering", url: "https://interestingengineering.com/", area: "general", type: "News", about: "Daily stories on new inventions, science and technology." },
  { name: "Engineer Live", url: "https://www.engineerlive.com/", area: "general", type: "News", about: "Engineering news across many sectors, from chemical to mining." },
  { name: "Design World", url: "https://www.designworldonline.com/", area: "general", type: "Magazine", about: "Product developments and design engineering trends." },
  { name: "Design News", url: "https://www.designnews.com/", area: "general", type: "News", about: "Design engineering news, from automation to materials." },
  { name: "New Atlas", url: "https://newatlas.com/", area: "general", type: "News", about: "Today's developments in technology, science and design." },
  { name: "Popular Mechanics", url: "https://www.popularmechanics.com/", area: "general", type: "Magazine", about: "Technology, science and how things work." },
  { name: "MIT Technology Review", url: "https://www.technologyreview.com/", area: "general", type: "Magazine", about: "In-depth reporting on emerging technology." },
  { name: "Wired", url: "https://www.wired.com/", area: "general", type: "Magazine", about: "Technology, science and how they shape the world." },
  { name: "Ars Technica", url: "https://arstechnica.com/", area: "general", type: "News", about: "Detailed technology and science news." },
  { name: "Engineering UK", url: "https://www.engineeringuk.com/", area: "general", type: "Professional body", about: "Research and news on the UK engineering workforce." },
  { name: "Engineering Council", url: "https://www.engc.org.uk/", area: "general", type: "Professional body", about: "UK registration for Chartered and Incorporated Engineers." },
  { name: "Royal Academy of Engineering", url: "https://raeng.org.uk/", area: "general", type: "Professional body", about: "The UK's national academy for engineering." },
  { name: "The Engineering ToolBox", url: "https://www.engineeringtoolbox.com/", area: "general", type: "Learning & tools", about: "Free engineering data, tables and calculators." },
  { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", area: "general", type: "Learning & tools", about: "Free MIT course materials across all of engineering." },

  // ---- Science news ----
  { name: "ScienceDaily", url: "https://www.sciencedaily.com/", area: "general", type: "Science", about: "Latest research news from universities and labs." },
  { name: "ScienceDaily: Engineering", url: "https://www.sciencedaily.com/news/matter_energy/engineering/", area: "general", type: "Science", about: "ScienceDaily's engineering research section." },
  { name: "Tech Xplore", url: "https://techxplore.com/", area: "general", type: "Science", about: "Research news on technology and engineering." },
  { name: "Phys.org", url: "https://phys.org/", area: "general", type: "Science", about: "Physics, materials and technology research news." },
  { name: "New Scientist", url: "https://www.newscientist.com/", area: "general", type: "Science", about: "Science and technology news and features." },
  { name: "Nature: Engineering", url: "https://www.nature.com/subjects/engineering", area: "general", type: "Science", about: "Engineering research published in Nature journals." },

  // ---- Mechanical and manufacturing ----
  { name: "Professional Engineering (IMechE)", url: "https://www.imeche.org/news", area: "mechanical", type: "News", about: "Mechanical engineering news from IMechE." },
  { name: "IMechE", url: "https://www.imeche.org/", area: "mechanical", type: "Professional body", about: "Institution of Mechanical Engineers." },
  { name: "ASME", url: "https://www.asme.org/", area: "mechanical", type: "Professional body", about: "American Society of Mechanical Engineers: news and standards." },
  { name: "The Manufacturer", url: "https://www.themanufacturer.com/", area: "mechanical", type: "News", about: "UK manufacturing industry news." },
  { name: "The Fabricator", url: "https://www.thefabricator.com/", area: "mechanical", type: "Magazine", about: "Metal fabrication, welding and forming." },
  { name: "TWI (The Welding Institute)", url: "https://www.twi-global.com/", area: "mechanical", type: "Professional body", about: "Welding and joining research, training and advice." },
  { name: "Machinery", url: "https://www.machinery.co.uk/", area: "mechanical", type: "Magazine", about: "UK machine tools and metalworking news." },

  // ---- Electrical and electronics ----
  { name: "IEEE Spectrum", url: "https://spectrum.ieee.org/", area: "electrical", type: "Magazine", about: "IEEE's magazine on electrical engineering and technology." },
  { name: "IET", url: "https://www.theiet.org/", area: "electrical", type: "Professional body", about: "Institution of Engineering and Technology." },
  { name: "Electronics Weekly", url: "https://www.electronicsweekly.com/", area: "electrical", type: "News", about: "UK electronics industry news." },
  { name: "EE Times", url: "https://www.eetimes.com/", area: "electrical", type: "News", about: "Electronics and semiconductor news." },
  { name: "All About Circuits", url: "https://www.allaboutcircuits.com/", area: "electrical", type: "Learning & tools", about: "Electronics news, textbooks and tools." },
  { name: "Hackaday", url: "https://hackaday.com/", area: "electrical", type: "News", about: "Hardware hacking, electronics projects and builds." },

  // ---- Chemical ----
  { name: "The Chemical Engineer", url: "https://www.thechemicalengineer.com/", area: "chemical", type: "Magazine", about: "IChemE's magazine for chemical and process engineers." },
  { name: "IChemE", url: "https://www.icheme.org/", area: "chemical", type: "Professional body", about: "Institution of Chemical Engineers." },
  { name: "Chemistry World", url: "https://www.chemistryworld.com/", area: "chemical", type: "Magazine", about: "Royal Society of Chemistry news and features." },
  { name: "Chemical & Engineering News", url: "https://cen.acs.org/", area: "chemical", type: "News", about: "American Chemical Society news." },
  { name: "AIChE", url: "https://www.aiche.org/", area: "chemical", type: "Professional body", about: "American Institute of Chemical Engineers." },

  // ---- Civil ----
  { name: "New Civil Engineer", url: "https://www.newcivilengineer.com/", area: "civil", type: "News", about: "UK civil engineering and infrastructure news." },
  { name: "ICE", url: "https://www.ice.org.uk/", area: "civil", type: "Professional body", about: "Institution of Civil Engineers." },
  { name: "Engineering News-Record (ENR)", url: "https://www.enr.com/", area: "civil", type: "News", about: "Construction and engineering industry news." },
  { name: "Construction News", url: "https://www.constructionnews.co.uk/", area: "civil", type: "News", about: "UK construction industry news." },
  { name: "The Structural Engineer", url: "https://www.istructe.org/", area: "civil", type: "Professional body", about: "Institution of Structural Engineers." },
  { name: "ASCE", url: "https://www.asce.org/", area: "civil", type: "Professional body", about: "American Society of Civil Engineers." },

  // ---- Aerospace ----
  { name: "Royal Aeronautical Society", url: "https://www.aerosociety.com/", area: "aerospace", type: "Professional body", about: "Aerospace news, events and membership." },
  { name: "FlightGlobal", url: "https://www.flightglobal.com/", area: "aerospace", type: "News", about: "Aviation and aerospace industry news." },
  { name: "Aerospace America", url: "https://aerospaceamerica.aiaa.org/", area: "aerospace", type: "Magazine", about: "AIAA's aerospace magazine." },
  { name: "SpaceNews", url: "https://spacenews.com/", area: "aerospace", type: "News", about: "Space industry news." },
  { name: "Aerospace Testing International", url: "https://www.aerospacetestinginternational.com/", area: "aerospace", type: "Magazine", about: "Aircraft and spacecraft testing and development." },
  { name: "NASA News", url: "https://www.nasa.gov/news/", area: "aerospace", type: "Science", about: "Missions, research and technology from NASA." },

  // ---- Software ----
  { name: "InfoQ", url: "https://www.infoq.com/", area: "software", type: "News", about: "Software engineering practice and architecture." },
  { name: "Hacker News", url: "https://news.ycombinator.com/", area: "software", type: "News", about: "Tech and programming links voted on by readers." },
  { name: "The Stack Overflow Blog", url: "https://stackoverflow.blog/", area: "software", type: "Magazine", about: "Articles on software development." },
  { name: "The Register", url: "https://www.theregister.com/", area: "software", type: "News", about: "UK tech and IT industry news." },
  { name: "BCS", url: "https://www.bcs.org/", area: "software", type: "Professional body", about: "The Chartered Institute for IT." },

  // ---- Nuclear ----
  { name: "World Nuclear News", url: "https://www.world-nuclear-news.org/", area: "nuclear", type: "News", about: "Daily nuclear industry news." },
  { name: "Nuclear Engineering International", url: "https://www.neimagazine.com/", area: "nuclear", type: "Magazine", about: "Nuclear power plant technology and projects." },
  { name: "Nuclear Institute", url: "https://www.nuclearinst.com/", area: "nuclear", type: "Professional body", about: "The UK's professional body for the nuclear sector." },
  { name: "IAEA News", url: "https://www.iaea.org/news", area: "nuclear", type: "News", about: "International Atomic Energy Agency news." },
  { name: "American Nuclear Society", url: "https://www.ans.org/", area: "nuclear", type: "Professional body", about: "Nuclear news, standards and membership." }
];
