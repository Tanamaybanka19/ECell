import type { SiteContent } from "./types";

export const defaultContent: SiteContent = {
  hero: {
    headingLine1: "Where bold ideas",
    headingLine2: "become ventures",
    subhead:
      "A student-run community of builders, dreamers and doers turning campus curiosity into real startups.",
    cardTop: "St. Xavier's College · Mumbai",
    cardBottom: "Est. 2012 · By students, for founders",
  },
  stats: [
    { value: "2012", label: "Founded by students" },
    { value: "120+", label: "Events hosted" },
    { value: "5K+", label: "E-Summit footfall" },
    { value: "30+", label: "Startups backed" },
  ],
  whoWeAre: {
    heading: "Who we are",
    paragraphs: [
      "The **Entrepreneurship Cell of St. Xavier's College (Mumbai)** is a student-run body that exists for one reason: to make starting up feel less like a distant dream and more like a campus habit.",
      "We host the annual **E-Summit**, run B-plan competitions and founder talk series, publish a monthly newsletter, produce a podcast, and maintain an archive of everything we have ever built.",
      "No experience needed to join, just **curiosity and consistency**. The rest, we build together.",
    ],
  },
  flagships: [
    {
      id: "e-summit",
      icon: "trophy",
      name: "E-Summit",
      edition: "Annual flagship fest",
      date: "Every February",
      description:
        "Two days of competitions, keynotes and a startup expo: the biggest entrepreneurship celebration on campus.",
    },
    {
      id: "pitch-perfect",
      icon: "event",
      name: "Pitch Perfect",
      edition: "B-plan competition",
      date: "Semesterly",
      description:
        "Student ventures face a panel of founders and investors for mentorship, prizes and a shot at incubation.",
    },
    {
      id: "founder-fireside",
      icon: "mic",
      name: "Founder Fireside",
      edition: "Talk series",
      date: "Monthly",
      description:
        "Unfiltered conversations with founders who started from a hostel room, a classroom or a crazy idea.",
    },
  ],
  departments: [
    {
      id: "projects-partnerships",
      icon: "handshake",
      name: "Projects & Partnerships",
      tagline: "The connectors",
      description:
        "Conceptualises flagship projects and builds lasting partnerships with startups, VCs and student communities.",
      responsibilities: ["Flagship projects", "Partner network", "Collaborations"],
      heads: [
        {
          name: "Rhea Kulkarni",
          role: "Head",
          bio: "Leads flagship projects and the partner network across the cell.",
        },
      ],
      subheads: [],
      associates: [
        { name: "Mihir Joshi", role: "Associate" },
        { name: "Kiara D'Souza", role: "Associate" },
      ],
    },
    {
      id: "incubation-innovation",
      icon: "lightbulb",
      name: "Incubation & Innovation",
      tagline: "The startup nursery",
      description:
        "Guides student ventures from idea to launch through mentorship, incubation drives and innovation challenges.",
      responsibilities: ["Startup incubation", "Mentor network", "Innovation challenges"],
      heads: [
        {
          name: "Vivaan Sharma",
          role: "Head",
          bio: "Runs incubation drives and the mentor network for student ventures.",
        },
      ],
      subheads: [],
      associates: [{ name: "Aryan Saxena", role: "Associate" }],
    },
    {
      id: "sponsorships-finance",
      icon: "account_balance",
      name: "Sponsorships & Finance",
      tagline: "The money managers",
      description:
        "Raises funds from brands and manages every rupee of the cell's budget with full transparency.",
      responsibilities: ["Brand outreach", "Sponsor decks", "Budgeting"],
      heads: [
        {
          name: "Zoya Contractor",
          role: "Head",
          bio: "Owns sponsor outreach and keeps the cell's books transparent.",
        },
      ],
      subheads: [],
      associates: [
        { name: "Nitya Pillai", role: "Associate" },
        { name: "Rehan Kapadia", role: "Associate" },
      ],
    },
    {
      id: "pr-creatives",
      icon: "campaign",
      name: "PR & Creatives",
      tagline: "The voice & the look",
      description:
        "Owns the cell's voice and visual identity: social media, campus buzz, posters and brand creatives.",
      responsibilities: ["Social media", "Campus publicity", "Creatives"],
      heads: [
        {
          name: "Aditya Menon",
          role: "Head",
          bio: "Shapes the cell's voice and visual identity across channels.",
        },
      ],
      subheads: [],
      associates: [
        { name: "Ayesha Khan", role: "Associate" },
        { name: "Dhruv Naik", role: "Associate" },
      ],
    },
    {
      id: "research-learning",
      icon: "menu_book",
      name: "Research & Learning",
      tagline: "The insight engine",
      description:
        "Studies markets and startups, curates knowledge and runs learning sessions for the workforce.",
      responsibilities: ["Market studies", "Learning sessions", "Knowledge base"],
      heads: [
        {
          name: "Sara Fernandes",
          role: "Head",
          bio: "Curates market studies and runs the cell's learning sessions.",
        },
      ],
      subheads: [],
      associates: [],
    },
    {
      id: "administration",
      icon: "assignment",
      name: "Administration",
      tagline: "The backbone",
      description:
        "Keeps the cell running: documentation, records, internal coordination and faculty liaison.",
      responsibilities: ["Documentation", "Records", "Coordination"],
      heads: [
        {
          name: "Neel Bhatt",
          role: "Head",
          bio: "Keeps documentation, records and faculty liaison in order.",
        },
      ],
      subheads: [],
      associates: [{ name: "Alia Rupani", role: "Associate" }],
    },
    {
      id: "operations-logistics",
      icon: "inventory_2",
      name: "Operations & Logistics",
      tagline: "The ground crew",
      description:
        "Handles on-ground execution: venues, materials, permissions and everything that moves during events.",
      responsibilities: ["Venue management", "Materials", "Permissions"],
      heads: [
        {
          name: "Tanvi Shetty",
          role: "Head",
          bio: "Runs on-ground execution for every event the cell hosts.",
        },
      ],
      subheads: [],
      associates: [
        { name: "Myra Jain", role: "Associate" },
        { name: "Karan Vazirani", role: "Associate" },
      ],
    },
    {
      id: "filming-documentation",
      icon: "movie",
      name: "Filming & Documentation",
      tagline: "The memory keepers",
      description:
        "Films events, cuts aftermovies and documents every chapter of the cell's story.",
      responsibilities: ["Aftermovies", "Event coverage", "Photo archive"],
      heads: [
        {
          name: "Yash Agarwal",
          role: "Head",
          bio: "Films events and cuts the aftermovies in the archive.",
        },
      ],
      subheads: [],
      associates: [
        { name: "Shreya Bakshi", role: "Associate" },
        { name: "Aman Dubey", role: "Associate" },
      ],
    },
  ],
  core: [
    {
      name: "Ananya Deshpande",
      role: "Chairperson",
      bio: "Sets the cell's direction and leads it across all eight departments.",
    },
    {
      name: "Kabir Malhotra",
      role: "Vice Chairperson",
      bio: "Oversees day-to-day operations and cross-department coordination.",
    },
    {
      name: "Ishita Rao",
      role: "Vice Chairperson",
      bio: "Drives partnerships, external relations and the annual calendar.",
    },
  ],
  workforce: [
    {
      title: "Core Council",
      note: "The ones who sign off on everything",
      members: [
        { name: "Ananya Deshpande", role: "President" },
        { name: "Kabir Malhotra", role: "Vice President" },
        { name: "Ishita Rao", role: "General Secretary" },
        { name: "Arjun Khanna", role: "Treasurer" },
      ],
    },
    {
      title: "Department Leads",
      note: "One captain per crew",
      members: [
        { name: "Rhea Kulkarni", role: "Projects & Partnerships Lead" },
        { name: "Vivaan Sharma", role: "Incubation & Innovation Lead" },
        { name: "Zoya Contractor", role: "Sponsorships & Finance Lead" },
        { name: "Aditya Menon", role: "PR & Creatives Lead" },
        { name: "Sara Fernandes", role: "Research & Learning Lead" },
        { name: "Neel Bhatt", role: "Administration Lead" },
        { name: "Tanvi Shetty", role: "Operations & Logistics Lead" },
        { name: "Yash Agarwal", role: "Filming & Documentation Lead" },
      ],
    },
    {
      title: "Associates",
      note: "The workforce that ships it all",
      members: [
        { name: "Mihir Joshi", role: "Projects & Partnerships" },
        { name: "Kiara D'Souza", role: "Projects & Partnerships" },
        { name: "Aryan Saxena", role: "Incubation & Innovation" },
        { name: "Nitya Pillai", role: "Sponsorships & Finance" },
        { name: "Rehan Kapadia", role: "Sponsorships & Finance" },
        { name: "Ayesha Khan", role: "PR & Creatives" },
        { name: "Dhruv Naik", role: "PR & Creatives" },
        { name: "Myra Jain", role: "Operations & Logistics" },
        { name: "Karan Vazirani", role: "Operations & Logistics" },
        { name: "Shreya Bakshi", role: "Filming & Documentation" },
        { name: "Aman Dubey", role: "Filming & Documentation" },
        { name: "Alia Rupani", role: "Administration" },
      ],
    },
  ],
  eventsArchive: [
    {
      year: "2026",
      events: [
        {
          title: "E-Summit '26",
          date: "Feb 2026",
          type: "Fest",
          summary:
            "Two days, 5,000+ attendees, 32 speaker sessions and a startup expo that spilled out of the hall.",
        },
        {
          title: "Pitch Perfect Winter Edition",
          date: "Jan 2026",
          type: "Competition",
          summary:
            "18 student ventures pitched to a panel of founders; three walked away with incubation offers.",
        },
      ],
    },
    {
      year: "2025",
      events: [
        {
          title: "Fireside with a Unicorn CTO",
          date: "Nov 2025",
          type: "Talk",
          summary:
            "An evening on scaling engineering teams from 4 to 400, and what breaks along the way.",
        },
        {
          title: "Zero to One Workshop Series",
          date: "Aug 2025",
          type: "Workshop",
          summary:
            "A four-weekend sprint covering idea validation, MVP building, basic finance and pitch craft.",
        },
        {
          title: "E-Summit '25",
          date: "Feb 2025",
          type: "Fest",
          summary:
            "Our biggest edition yet: 40+ startups exhibited, 12 competitions ran in parallel across campus.",
        },
      ],
    },
    {
      year: "2024",
      events: [
        {
          title: "Campus Startup Expo",
          date: "Oct 2024",
          type: "Expo",
          summary:
            "Student-run stalls took over the quadrangle for a day of demos, feedback and first customers.",
        },
        {
          title: "Pitch Perfect Monsoon Edition",
          date: "Jul 2024",
          type: "Competition",
          summary:
            "The B-plan competition that started as a classroom experiment drew 60+ team registrations.",
        },
        {
          title: "Women in Entrepreneurship Panel",
          date: "Mar 2024",
          type: "Talk",
          summary:
            "Five founders on fundraising bias, bootstrapping and building networks from scratch.",
        },
      ],
    },
  ],
  aftermovies: [
    {
      id: "e-summit-2026",
      title: "E-Summit '26 Aftermovie",
      year: "2026",
      runtime: "3:42",
      thumbnail: "",
    },
    {
      id: "e-summit-2025",
      title: "E-Summit '25 Aftermovie",
      year: "2025",
      runtime: "4:10",
      thumbnail: "",
    },
    {
      id: "pitch-perfect-2025",
      title: "Pitch Perfect: The Journey",
      year: "2025",
      runtime: "2:28",
      thumbnail: "",
    },
  ],
  newsletterIssues: [
    {
      id: "quick-commerce",
      index: "Vol. V · Issue 04",
      title: "The 10-Minute Economy",
      date: "Aug 2026",
      tags: ["Quick commerce", "Unit economics"],
      excerpt:
        "How dark stores rewired Mumbai's grocery habits, and what the unit economics actually look like when delivery gets faster than the elevator.",
    },
    {
      id: "bootstrap-bharat",
      index: "Vol. V · Issue 03",
      title: "Bootstrapping in Bharat",
      date: "Jul 2026",
      tags: ["Bootstrapping", "Tier-2 India"],
      excerpt:
        "Founders outside the funding circuit on profitable from day one, growing slow, and why their churn is enviable.",
    },
    {
      id: "creator-economy",
      index: "Vol. V · Issue 02",
      title: "Creators Are the New Distributors",
      date: "Jun 2026",
      tags: ["Creator economy", "D2C"],
      excerpt:
        "Why D2C brands are hiring influencers before engineers, and how attention became the cheapest customer acquisition channel.",
    },
    {
      id: "student-startups",
      index: "Vol. V · Issue 01",
      title: "From Classroom to Cap Table",
      date: "May 2026",
      tags: ["Student founders", "Campus ventures"],
      excerpt:
        "Six startups that began as semester projects at St. Xavier's, and what happened after the grades came in.",
    },
    {
      id: "ai-stack",
      index: "Vol. IV · Issue 12",
      title: "Everyone Is an AI Company Now",
      date: "Apr 2026",
      tags: ["AI", "SaaS"],
      excerpt:
        "A field guide to separating the thin wrappers from the real moats, with a checklist investors actually use.",
    },
    {
      id: "funding-winter",
      index: "Vol. IV · Issue 11",
      title: "Surviving the Funding Winter",
      date: "Mar 2026",
      tags: ["Venture capital", "Runway"],
      excerpt:
        "Founders who raised in 2021 and cut costs in 2024 share the playbook nobody put in their pitch deck.",
    },
  ],
  podcastEpisodes: [
    {
      id: "ep-12",
      number: "EP 12",
      title: "Selling chai to a country that runs on it",
      guest: "Aarav Mehta",
      guestRole: "Founder, Chai Circuit",
      duration: "42 min",
      date: "Aug 2026",
      excerpt:
        "From one stall outside campus to 40 outlets, on pricing, pan-wallahs and the myth of the saturated market.",
    },
    {
      id: "ep-11",
      number: "EP 11",
      title: "The pitch deck that got rejected 47 times",
      guest: "Sana Qureshi",
      guestRole: "Co-founder, Ledgerly",
      duration: "38 min",
      date: "Jul 2026",
      excerpt:
        "Why rejection number 48 mattered more than the yes, and how to iterate a deck without losing the plot.",
    },
    {
      id: "ep-10",
      number: "EP 10",
      title: "Building for Bharat from a Mumbai hostel",
      guest: "Rohan Iyer",
      guestRole: "Founder, GramSeva Tech",
      duration: "45 min",
      date: "Jun 2026",
      excerpt:
        "Agri-tech between lectures, on user research in villages your textbooks have never mentioned.",
    },
    {
      id: "ep-09",
      number: "EP 09",
      title: "What VCs actually read in your numbers",
      guest: "Priya Nair",
      guestRole: "Principal, Bombay Ventures",
      duration: "51 min",
      date: "May 2026",
      excerpt:
        "An investor's honest teardown of student pitches: the metrics that matter and the buzzwords that don't.",
    },
    {
      id: "ep-08",
      number: "EP 08",
      title: "Quitting the placement to keep the startup",
      guest: "Devang Shah",
      guestRole: "Founder, Rentro",
      duration: "36 min",
      date: "Apr 2026",
      excerpt:
        "A 9 LPA offer letter, two months of leave, and choosing uncertainty over comfort, with receipts.",
    },
  ],
  contactPage: {
    heading: "Say hello",
    subhead:
      "Sponsorships, collaborations, recruitment or just a hello. Our inbox is always open.",
    infoBlocks: [
      {
        icon: "location_on",
        title: "Find us on campus",
        line1: "St. Xavier's College, 5 Mahapalika Marg, Mumbai 400001",
        line2: "E-Cell room, ground floor, above the library",
      },
      {
        icon: "mail",
        title: "Write to us",
        line1: "ecell.sxm@gmail.com",
        line2: "We usually reply within 48 hours during the semester",
      },
    ],
    followHeading: "Follow the hustle",
    instagramHandle: "@ecell_sxm",
  },
  siteConfig: {
    name: "E-Cell SXCM",
    fullName: "Entrepreneurship Cell, St. Xavier's College Mumbai",
    email: "ecell.sxm@gmail.com",
    address: "St. Xavier's College, 5 Mahapalika Marg, Mumbai 400001",
    socials: {
      instagram: "https://www.instagram.com/ecell_sxm",
      linkedin: "https://www.linkedin.com/company/ecell-sxm",
      youtube: "https://www.youtube.com/@ecellsxm",
      x: "https://x.com/ecell_sxm",
      spotify: "https://open.spotify.com/show/ecellsxm",
      podcastFeed: "https://podcasts.apple.com/ecellsxm",
    },
  },
  media: [],
};
