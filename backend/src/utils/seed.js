require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");
const Post = require("../models/Post.model");

/**
 * 25 realistic blog posts spanning six categories with a mix of
 * Draft and Published statuses.  Used by `npm run seed`.
 */
const posts = [
  // ───────────────── Technology (5) ─────────────────
  {
    title: "The Rise of Artificial Intelligence in 2026",
    author: "Sarah Chen",
    email: "sarah.chen@techblog.com",
    category: "Technology",
    tags: ["AI", "Machine Learning", "Future Tech"],
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    shortDescription: "Exploring how artificial intelligence is reshaping industries and our daily lives in unprecedented ways.",
    content:
      "Artificial intelligence has moved from the realm of science fiction into everyday reality. From virtual assistants to autonomous vehicles, AI is transforming how we work, live, and interact with the world around us. In this comprehensive guide, we explore the latest breakthroughs in AI technology, including large language models, computer vision, and reinforcement learning. We also examine the ethical implications and the ongoing debate about regulation in the AI space. The pace of innovation shows no signs of slowing down.",
    status: "Published",
  },
  {
    title: "Understanding Quantum Computing Basics",
    author: "James Rodriguez",
    email: "james.r@quantumweekly.com",
    category: "Technology",
    tags: ["Quantum Computing", "Physics", "Innovation"],
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    shortDescription: "A beginner-friendly introduction to the fascinating world of quantum computing and its potential.",
    content:
      "Quantum computing represents a fundamental shift in how we process information. Unlike classical computers that use bits, quantum computers use qubits that can exist in multiple states simultaneously through a phenomenon called superposition. This article breaks down complex quantum concepts into digestible explanations, covering quantum entanglement, quantum gates, and error correction. We also look at practical applications from drug discovery to cryptography and which companies are leading the quantum race.",
    status: "Published",
  },
  {
    title: "5G Networks: Transforming Connectivity Worldwide",
    author: "Aisha Patel",
    email: "aisha.patel@networld.io",
    category: "Technology",
    tags: ["5G", "Networking", "IoT"],
    thumbnail: "https://images.unsplash.com/photo-1562408590-e32931084e23",
    shortDescription: "How 5G technology is revolutionising mobile connectivity, IoT, and smart city infrastructure globally.",
    content:
      "The rollout of 5G networks is accelerating across the globe, promising download speeds up to 100 times faster than 4G and latency as low as one millisecond. This technological leap is not just about faster smartphones — it is the backbone of the Internet of Things, autonomous vehicles, remote surgery, and smart cities. In this article, we dive deep into the technical specifications of 5G, the challenges of deployment, the health concerns that have been raised, and the economic impact on telecommunications companies and consumers alike.",
    status: "Draft",
  },
  {
    title: "Blockchain Beyond Cryptocurrency",
    author: "Marcus Thompson",
    email: "marcus.t@blockinsights.com",
    category: "Technology",
    tags: ["Blockchain", "Web3", "Decentralization"],
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    shortDescription: "Discovering real-world blockchain applications in supply chain, healthcare, and government sectors.",
    content:
      "While blockchain technology first gained attention through Bitcoin and cryptocurrencies, its applications extend far beyond digital currencies. Supply chain management companies are using blockchain to track products from origin to consumer, ensuring authenticity and reducing fraud. Healthcare providers are leveraging blockchain for secure patient data sharing. Governments are exploring blockchain-based voting systems and digital identity solutions. This article examines the most promising non-crypto blockchain applications, the technical challenges of scaling, and what the future holds for this transformative technology.",
    status: "Published",
  },
  {
    title: "Edge Computing: The Next Frontier in Cloud",
    author: "Lina Johansson",
    email: "lina.j@cloudtechreview.com",
    category: "Technology",
    tags: ["Edge Computing", "Cloud", "Infrastructure"],
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    shortDescription: "Why edge computing is becoming essential for real-time processing and reduced latency applications.",
    content:
      "Edge computing brings data processing closer to the source of data generation, reducing latency and bandwidth usage. As IoT devices proliferate and applications demand real-time responses, traditional cloud architectures are hitting their limits. Edge computing addresses these challenges by placing compute resources at the network edge — in cell towers, factory floors, and retail stores. This article explores the architecture of edge computing systems, the relationship between edge and cloud, use cases in manufacturing, retail, and autonomous vehicles, and the security considerations that come with distributing compute infrastructure.",
    status: "Draft",
  },

  // ───────────────── Design (4) ─────────────────
  {
    title: "Mastering Color Theory for Digital Design",
    author: "Elena Vasquez",
    email: "elena.v@designstudio.co",
    category: "Design",
    tags: ["Color Theory", "UI Design", "Visual Design"],
    thumbnail: "https://images.unsplash.com/photo-1541462608143-67571c6738dd",
    shortDescription: "A complete guide to understanding and applying color theory in your digital design projects.",
    content:
      "Color is one of the most powerful tools in a designer's arsenal. Understanding color theory — the science and art of using color — is essential for creating visually compelling and effective designs. This guide covers the color wheel, color harmonies such as complementary, analogous, and triadic schemes, and the psychology of color in branding. We also explore practical tips for choosing accessible color palettes, working with contrast ratios for WCAG compliance, and leveraging tools like Adobe Color and Coolors to streamline your workflow.",
    status: "Published",
  },
  {
    title: "Typography Best Practices for the Web",
    author: "David Kim",
    email: "david.kim@typeface.dev",
    category: "Design",
    tags: ["Typography", "Web Design", "UX"],
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    shortDescription: "Learn how to choose and pair fonts effectively to create beautiful and readable web experiences.",
    content:
      "Typography is the backbone of web design, directly impacting readability, user experience, and brand perception. Choosing the right typeface involves more than aesthetics — it requires understanding font classifications, x-height, kerning, and line spacing. In this article, we explore best practices for font pairing, responsive typography using CSS clamp and fluid type scales, performance optimisation with font-display and subsetting, and the rise of variable fonts. Whether you are a seasoned designer or just starting out, these principles will elevate your typographic skills to the next level.",
    status: "Published",
  },
  {
    title: "Creating Accessible User Interfaces",
    author: "Priya Sharma",
    email: "priya.s@a11ydesign.org",
    category: "Design",
    tags: ["Accessibility", "UI/UX", "Inclusive Design"],
    thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
    shortDescription: "Essential accessibility guidelines every designer must follow to build inclusive digital products.",
    content:
      "Designing accessible user interfaces is not just a legal requirement — it is a moral imperative and a business advantage. Over one billion people worldwide live with some form of disability, and accessible design ensures that digital products work for everyone. This article covers WCAG 2.1 guidelines, ARIA roles and landmarks, keyboard navigation patterns, colour contrast requirements, screen reader best practices, and common accessibility pitfalls. We also provide a practical checklist that teams can integrate into their design review process to catch accessibility issues before they reach production.",
    status: "Draft",
  },
  {
    title: "The Evolution of Material Design Systems",
    author: "Tomasz Nowak",
    email: "tomasz.n@uicraft.io",
    category: "Design",
    tags: ["Material Design", "Design Systems", "Google"],
    thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698",
    shortDescription: "Tracing the journey of Material Design from its origins to Material You and beyond.",
    content:
      "Google's Material Design has been one of the most influential design systems of the past decade. First introduced in 2014, it established a comprehensive visual language based on print design principles, bold colours, and responsive animations. Material Design 2 refined the system with more flexibility, and Material You introduced dynamic colour theming that adapts to user preferences. This article traces the evolution of Material Design, examines its core principles of material metaphor, bold graphic design, and meaningful motion, and discusses how organisations are building their own design systems inspired by Material's approach.",
    status: "Published",
  },

  // ───────────────── Development (5) ─────────────────
  {
    title: "Building RESTful APIs with Node.js and Express",
    author: "Michael Chang",
    email: "michael.c@devblog.net",
    category: "Development",
    tags: ["Node.js", "Express", "REST API", "JavaScript"],
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    shortDescription: "A step-by-step tutorial on building production-ready RESTful APIs using Node.js and Express.",
    content:
      "Building RESTful APIs is a fundamental skill for modern web developers. Node.js combined with Express.js provides a lightweight yet powerful platform for creating scalable server-side applications. In this tutorial, we walk through setting up a project from scratch, designing RESTful endpoints, implementing middleware for authentication and validation, connecting to MongoDB with Mongoose, handling errors gracefully, and deploying to production. We also cover best practices like rate limiting, input sanitisation, and API versioning that separate amateur APIs from professional-grade services.",
    status: "Published",
  },
  {
    title: "React Server Components: A Deep Dive",
    author: "Anna Kowalski",
    email: "anna.k@reactweekly.com",
    category: "Development",
    tags: ["React", "Server Components", "JavaScript", "Frontend"],
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    shortDescription: "Understanding React Server Components and how they change the way we build React applications.",
    content:
      "React Server Components represent a paradigm shift in how we think about building React applications. By allowing components to render on the server without sending their JavaScript to the client, RSC dramatically reduces bundle sizes and improves performance. This deep dive explores the mental model behind Server Components, the difference between server and client components, how data fetching works with async server components, the streaming architecture, and practical patterns for building applications with Next.js App Router. We also address common misconceptions and migration strategies for existing React applications.",
    status: "Published",
  },
  {
    title: "Getting Started with Docker for Developers",
    author: "Carlos Mendez",
    email: "carlos.m@containerdev.io",
    category: "Development",
    tags: ["Docker", "DevOps", "Containers"],
    thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b",
    shortDescription: "A practical introduction to Docker containers for software developers new to containerisation.",
    content:
      "Docker has revolutionised the way developers build, ship, and run applications. By packaging an application and its dependencies into a lightweight container, Docker ensures consistency across development, staging, and production environments. This beginner-friendly guide covers Docker fundamentals including images, containers, and registries. We walk through writing Dockerfiles, using Docker Compose for multi-service applications, managing volumes for persistent data, networking between containers, and security best practices. By the end, you will be able to containerise any application and understand the container ecosystem.",
    status: "Draft",
  },
  {
    title: "Mastering Git Branching Strategies",
    author: "Fatima Al-Said",
    email: "fatima.a@gitpro.dev",
    category: "Development",
    tags: ["Git", "Version Control", "DevOps"],
    thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498",
    shortDescription: "Comparing Git branching strategies like GitFlow, GitHub Flow, and trunk-based development.",
    content:
      "Choosing the right Git branching strategy can make or break a team's productivity. In this comprehensive comparison, we examine the most popular approaches: GitFlow with its structured release branches, GitHub Flow's simplicity for continuous deployment, GitLab Flow's environment-based approach, and trunk-based development's emphasis on small frequent merges. For each strategy, we cover the workflow, ideal team size, release cadence, and real-world examples from companies like Google, Facebook, and Microsoft. We also discuss how to transition between strategies and common pitfalls to avoid during migration.",
    status: "Published",
  },
  {
    title: "Introduction to Test-Driven Development",
    author: "Robert Fischer",
    email: "robert.f@testcraft.com",
    category: "Development",
    tags: ["TDD", "Testing", "Best Practices"],
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
    shortDescription: "Learn the fundamentals of TDD and how writing tests first leads to better software design.",
    content:
      "Test-Driven Development is a software development approach where you write tests before writing the actual code. The red-green-refactor cycle — write a failing test, make it pass, then refactor — leads to cleaner, more modular, and more maintainable code. This article introduces TDD principles, walks through practical examples using Jest and Mocha, covers different types of tests including unit, integration, and end-to-end, and addresses common objections like slower initial development speed. We also explore how TDD fits into CI/CD pipelines and how it improves code coverage and reduces production bugs.",
    status: "Draft",
  },

  // ───────────────── Business (4) ─────────────────
  {
    title: "Building a Successful SaaS Product in 2026",
    author: "Jennifer Liu",
    email: "jennifer.l@saasworld.biz",
    category: "Business",
    tags: ["SaaS", "Startup", "Product Management"],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    shortDescription: "Key strategies and lessons for building and scaling a SaaS product in today's competitive market.",
    content:
      "The SaaS market continues to grow but competition is fiercer than ever. Building a successful SaaS product requires more than just great technology — it demands deep customer understanding, a clear value proposition, and a sustainable business model. This article covers the critical stages of SaaS development from ideation and market research through MVP development, pricing strategy, customer acquisition, and scaling. We share lessons learned from founders who have built products reaching millions in annual recurring revenue, and common mistakes that cause most SaaS startups to fail within their first two years.",
    status: "Published",
  },
  {
    title: "Remote Work Culture: Building Strong Teams",
    author: "Olivia Martinez",
    email: "olivia.m@remotework.co",
    category: "Business",
    tags: ["Remote Work", "Team Building", "Culture"],
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    shortDescription: "Practical strategies for building cohesive and productive remote teams in the modern workplace.",
    content:
      "Remote work has evolved from an emergency response into a permanent feature of the modern workplace. Building a strong remote culture requires intentional effort in communication, trust-building, and inclusive practices. This article explores proven strategies for remote team success, including asynchronous communication frameworks, virtual team-building activities, performance measurement without micromanagement, maintaining work-life boundaries, and creating equitable experiences for remote and hybrid employees. We draw on research from organisations that have thrived with distributed teams and provide actionable templates for remote team agreements and communication protocols.",
    status: "Published",
  },
  {
    title: "Understanding Venture Capital Funding Stages",
    author: "Daniel Park",
    email: "daniel.p@vcinsights.com",
    category: "Business",
    tags: ["Venture Capital", "Funding", "Startups"],
    thumbnail: "https://images.unsplash.com/photo-1553729459-afe8f2e2ed65",
    shortDescription: "A clear breakdown of startup funding stages from pre-seed through IPO and what investors expect.",
    content:
      "Navigating the world of venture capital can be daunting for first-time founders. Understanding the different funding stages — pre-seed, seed, Series A through Series E, and beyond — is crucial for developing an effective fundraising strategy. Each stage has different expectations for traction, team size, revenue, and growth metrics. This guide explains what investors look for at each stage, typical check sizes and valuations, the due diligence process, term sheet negotiation, and how to build relationships with the right investors. We also discuss alternatives to VC funding including bootstrapping, revenue-based financing, and crowdfunding.",
    status: "Draft",
  },
  {
    title: "Data-Driven Decision Making for Managers",
    author: "Sophie Williams",
    email: "sophie.w@datamanage.org",
    category: "Business",
    tags: ["Data Analytics", "Management", "Strategy"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    shortDescription: "How managers can leverage data analytics to make better, faster, and more objective business decisions.",
    content:
      "In an era of information abundance, the ability to make data-driven decisions is a critical competitive advantage. Yet many managers still rely primarily on intuition and experience. This article bridges the gap between data science and management practice, covering key concepts like setting up KPIs and OKRs, building dashboards that drive action, understanding statistical significance, avoiding common cognitive biases, A/B testing frameworks, and creating a data culture within your organisation. We include practical examples from marketing, operations, and product management to show how data-driven approaches lead to measurably better outcomes.",
    status: "Published",
  },

  // ───────────────── Lifestyle (4) ─────────────────
  {
    title: "Mindful Productivity: Working Smarter Not Harder",
    author: "Rachel Green",
    email: "rachel.g@mindfulwork.co",
    category: "Lifestyle",
    tags: ["Productivity", "Mindfulness", "Work-Life Balance"],
    thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    shortDescription: "Combining mindfulness practices with productivity techniques for sustainable high performance.",
    content:
      "The hustle culture glorification of overwork has led to epidemic levels of burnout. Mindful productivity offers an alternative approach that combines the focus and presence of mindfulness with proven productivity techniques. This article explores how practices like meditation, single-tasking, and intentional rest can actually increase your output while reducing stress. We cover the Pomodoro Technique enhanced with mindful breaks, digital minimalism strategies, journaling for clarity, and the science behind why taking breaks improves cognitive performance. Readers will find a practical 30-day plan for transitioning from hustle mode to sustainable productivity.",
    status: "Published",
  },
  {
    title: "The Art of Minimalist Living in Urban Spaces",
    author: "Kenji Tanaka",
    email: "kenji.t@simplelife.jp",
    category: "Lifestyle",
    tags: ["Minimalism", "Urban Living", "Decluttering"],
    thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    shortDescription: "Practical minimalist strategies for making the most of small urban living spaces and simpler lives.",
    content:
      "Living minimally in a city apartment is not about deprivation — it is about intentionality. By carefully curating your possessions and optimising your space, you can create a calm, functional home that supports your lifestyle. This article shares practical strategies for urban minimalism including the KonMari method adapted for apartments, multi-functional furniture solutions, capsule wardrobe principles, digital decluttering, and the financial benefits of consuming less. We also explore the environmental impact of minimalist living and how reducing consumption contributes to sustainability goals. Interviews with city-dwelling minimalists provide real-world inspiration and tips.",
    status: "Draft",
  },
  {
    title: "Plant-Based Nutrition for Active Lifestyles",
    author: "Isabella Rossi",
    email: "isabella.r@greenfit.com",
    category: "Lifestyle",
    tags: ["Nutrition", "Plant-Based", "Fitness"],
    thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    shortDescription: "How to fuel an active lifestyle with plant-based nutrition without compromising on performance.",
    content:
      "More athletes and fitness enthusiasts are turning to plant-based diets for health, ethical, and environmental reasons. But getting adequate nutrition — especially protein, iron, B12, and omega-3 fatty acids — requires careful planning. This comprehensive guide covers macronutrient and micronutrient needs for active individuals, meal planning strategies, supplement recommendations, pre and post-workout nutrition, and debunking myths about plant-based protein. We include sample meal plans for different calorie targets and activity levels, along with quick and easy recipes that provide complete nutrition for strength training, endurance sports, and general fitness.",
    status: "Published",
  },
  {
    title: "Digital Detox: Reclaiming Your Attention",
    author: "Nathan Brooks",
    email: "nathan.b@unpluglife.com",
    category: "Lifestyle",
    tags: ["Digital Detox", "Mental Health", "Wellness"],
    thumbnail: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8",
    shortDescription: "A practical guide to reducing screen time and reclaiming your focus in an always-connected world.",
    content:
      "The average person spends over seven hours a day looking at screens, and the psychological toll is becoming increasingly clear. Digital detox does not mean abandoning technology entirely — it means developing a healthier relationship with our devices. This article provides a structured approach to reducing screen time, including app audits, notification management, creating tech-free zones and times, replacing screen habits with analog alternatives, and using technology tools to limit technology use. We also examine the neuroscience of digital addiction, the impact of social media on mental health, and how to maintain a digital detox practice long-term without feeling disconnected.",
    status: "Published",
  },

  // ───────────────── Science (3) ─────────────────
  {
    title: "CRISPR Gene Editing: Promises and Ethical Debates",
    author: "Dr. Alexandra Moore",
    email: "alex.moore@scijournal.edu",
    category: "Science",
    tags: ["CRISPR", "Genetics", "Bioethics"],
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69",
    shortDescription: "Exploring the revolutionary potential of CRISPR technology and the ethical questions it raises.",
    content:
      "CRISPR-Cas9 gene editing technology has opened unprecedented possibilities in medicine, agriculture, and biology. From curing genetic diseases to creating drought-resistant crops, the potential applications are vast. However, the technology also raises profound ethical questions about designer babies, ecological risks of gene drives, and equitable access to genetic therapies. This article provides a thorough overview of how CRISPR works, current clinical trials and their results, agricultural applications, the regulatory landscape across different countries, and the ongoing philosophical debate about the limits of human intervention in natural genomes. We interview leading researchers and ethicists to present balanced perspectives.",
    status: "Published",
  },
  {
    title: "The Search for Life on Mars and Beyond",
    author: "Dr. Viktor Petrov",
    email: "viktor.p@astrofront.org",
    category: "Science",
    tags: ["Space", "Mars", "Astrobiology"],
    thumbnail: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9",
    shortDescription: "Latest discoveries in astrobiology and the ongoing missions searching for extraterrestrial life.",
    content:
      "The search for life beyond Earth has entered an exciting new chapter. NASA's Perseverance rover is actively collecting Martian samples for future return to Earth, while the James Webb Space Telescope is analysing the atmospheres of exoplanets for biosignatures. Meanwhile, missions to Jupiter's moon Europa and Saturn's moon Enceladus are being planned to explore subsurface oceans that may harbour microbial life. This article reviews the latest findings from ongoing missions, the science of biosignature detection, the Drake equation revisited with modern data, and what the discovery of extraterrestrial life would mean for humanity from scientific, philosophical, and sociological perspectives.",
    status: "Draft",
  },
  {
    title: "Climate Change: Understanding the Latest IPCC Report",
    author: "Dr. Maria Santos",
    email: "maria.s@climateresearch.org",
    category: "Science",
    tags: ["Climate Change", "Environment", "Sustainability"],
    thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce",
    shortDescription: "Breaking down the key findings from the latest IPCC assessment report on global climate change.",
    content:
      "The Intergovernmental Panel on Climate Change continues to provide the most comprehensive scientific assessments of climate change. The latest report paints a sobering picture of current warming trends while highlighting pathways to limit global temperature rise. This article breaks down the report's key findings on observed climate changes, attribution science linking specific events to climate change, updated carbon budgets, tipping point risks, and mitigation and adaptation strategies. We translate complex climate science into accessible language and focus on the most actionable takeaways for policymakers, businesses, and individuals who want to understand what the science actually says.",
    status: "Published",
  },
];

/**
 * Seed script — drops existing posts and inserts the sample data.
 * Run with: npm run seed
 */
const seedDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/blog-management";
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB for seeding");

    await Post.deleteMany({});
    console.log("🗑️  Cleared existing posts");

    const created = await Post.insertMany(posts);
    console.log(`🌱 Seeded ${created.length} blog posts`);

    const byCategory = {};
    const byStatus = { Draft: 0, Published: 0 };
    created.forEach((p) => {
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
      byStatus[p.status]++;
    });

    console.log("\n📊 Seed Summary:");
    console.log("   Categories:", byCategory);
    console.log("   Statuses:", byStatus);

    await mongoose.connection.close();
    console.log("\n✅ Seeding complete — connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
