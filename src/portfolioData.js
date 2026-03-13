import {
  FaAndroid,
  FaCode,
  FaDatabase,
  FaLaptopCode,
  FaMicrosoft,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa'
import { SiFlutter, SiLaravel, SiPycharm } from 'react-icons/si'

export const portfolioStorageKey = 'portfolio-admin-data'

export const skillIconMap = {
  react: FaReact,
  nodejs: FaNodeJs,
  laravel: SiLaravel,
  flutter: SiFlutter,
  code: FaCode,
  database: FaDatabase,
  laptop: FaLaptopCode,
  android: FaAndroid,
  pycharm: SiPycharm,
  microsoft: FaMicrosoft,
}

export const skillIconOptions = [
  { value: 'react', label: 'React' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'laravel', label: 'Laravel' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'code', label: 'Code' },
  { value: 'database', label: 'Database' },
  { value: 'laptop', label: 'Laptop' },
  { value: 'android', label: 'Android' },
  { value: 'pycharm', label: 'PyCharm' },
  { value: 'microsoft', label: 'Microsoft' },
]

export const defaultPortfolioData = {
  profile: {
    name: 'Muhammad Abdullah',
    role: 'AI Web & Custom Software Developer',
    heroEyebrow: 'Modern Teal Tech',
    heroTitle: "Hi, I'm Muhammad Abdullah",
    heroDescription:
      'Building functional Desktop, Mobile, and Web solutions with a focus on clean architecture and modern development practices.',
    cvUrl: '/Muhammad_Abdullah_CV.pdf',
    photoUrl: '/my-photo.png',
  },
  infoCards: {
    personalInfoTitle: 'Personal Info',
    personalInfo: [
      { label: 'Full Name', value: 'Muhammad Abdullah' },
      { label: 'Email', value: 'javaidabdullah509@gmail.com' },
    ],
    locationTitle: 'Location',
    locationInfo: [
      { label: 'Address', value: 'Tahir Colony, Old Hasilpur' },
      { label: 'Country', value: 'Pakistan' },
    ],
  },
  about: {
    eyebrow: 'About Me',
    title: 'Academic Journey & Background',
    description:
      'I am currently pursuing BS Software Engineering (2023–2027) at COMSATS. My academic path started in Pre-Medical, and the shift to engineering reflects my adaptability, growth mindset, and strong commitment to technology-driven problem solving.',
  },
  skills: {
    eyebrow: 'Services',
    title: 'Skills & Tools',
    groups: [
      {
        title: 'Web',
        items: [
          { name: 'React', iconKey: 'react' },
          { name: 'Node.js', iconKey: 'nodejs' },
          { name: 'Laravel', iconKey: 'laravel' },
        ],
      },
      {
        title: 'Mobile/Desktop',
        items: [
          { name: 'Flutter', iconKey: 'flutter' },
          { name: 'C#', iconKey: 'code' },
          { name: 'SQL Server', iconKey: 'database' },
        ],
      },
      {
        title: 'Tools',
        items: [
          { name: 'Visual Studio', iconKey: 'laptop' },
          { name: 'Android Studio', iconKey: 'android' },
          { name: 'PyCharm', iconKey: 'pycharm' },
          { name: 'MS Office', iconKey: 'microsoft' },
        ],
      },
    ],
  },
  projects: {
    eyebrow: 'Featured Projects',
    title: 'Core Work',
    items: [
      {
        title: 'Pharmacy Management System',
        tag: 'Desktop App',
        description:
          'A complete pharmacy workflow desktop solution with inventory, billing, and reporting features built for reliability.',
        tech: 'C# + SQL Server',
      },
      {
        title: 'Cosmetics E-commerce',
        tag: 'Web App',
        description:
          'A modern online store flow with product browsing, cart handling, and backend business logic for scalable growth.',
        tech: 'Laravel Backend',
      },
      {
        title: 'Mobile App Project',
        tag: '5th Semester Focus',
        description:
          'A semester-focused mobile application project emphasizing usability, clean architecture, and practical deployment flow.',
        tech: 'Flutter',
      },
    ],
    miniAppsTitle: 'Mini-Apps Bundle',
    miniApps: ['BMI Calculator', 'CGPA Calculator', 'Dice Control', 'POS Mini System'],
  },
  leadership: {
    eyebrow: 'Leadership & Activities',
    title: 'Beyond Development',
    items: [
      {
        title: 'Event Organizer',
        description: 'Contributed to Sports Gala 2025 and Orientation Session execution.',
      },
      {
        title: 'Social Impact',
        description: 'Participated in awareness seminar on Flood Awareness initiatives.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's Connect",
    email: 'javaidabdullah509@gmail.com',
    phone: '+92 301 8075447',
    address: 'Tahir Colony, Old Hasilpur',
  },
}

export function clonePortfolioData(data) {
  return JSON.parse(JSON.stringify(data))
}

export function mergePortfolioData(base, incoming) {
  if (Array.isArray(base)) {
    return Array.isArray(incoming) ? incoming : base
  }

  if (base && typeof base === 'object') {
    const merged = { ...base }

    Object.keys(base).forEach((key) => {
      merged[key] = mergePortfolioData(base[key], incoming?.[key])
    })

    return merged
  }

  return incoming ?? base
}