import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  FaAndroid,
  FaCode,
  FaDatabase,
  FaEnvelope,
  FaFileDownload,
  FaHome,
  FaLaptopCode,
  FaMicrosoft,
  FaNodeJs,
  FaPhoneAlt,
  FaReact,
  FaUser,
  FaFolder,
  FaCog,
  FaBars,
  FaTimes,
} from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { SiFlutter, SiLaravel, SiPycharm } from 'react-icons/si'

const sectionVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const skillGroups = [
  {
    title: 'Web',
    items: [
      { name: 'React', icon: FaReact },
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Laravel', icon: SiLaravel },
    ],
  },
  {
    title: 'Mobile/Desktop',
    items: [
      { name: 'Flutter', icon: SiFlutter },
      { name: 'C#', icon: FaCode },
      { name: 'SQL Server', icon: FaDatabase },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Visual Studio', icon: FaLaptopCode },
      { name: 'Android Studio', icon: FaAndroid },
      { name: 'PyCharm', icon: SiPycharm },
      { name: 'MS Office', icon: FaMicrosoft },
    ],
  },
]

const featuredProjects = [
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
]

const miniApps = ['BMI Calculator', 'CGPA Calculator', 'Dice Control', 'POS Mini System']

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionArticle = motion.article

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-cyan">{eyebrow}</p>
      <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">{title}</h2>
    </div>
  )
}

const navItems = [
  { id: 'home', label: 'Home', icon: FaHome },
  { id: 'about', label: 'About', icon: FaUser },
  { id: 'projects', label: 'Projects', icon: FaFolder },
  { id: 'expertise', label: 'Services', icon: FaCog },
  { id: 'contact', label: 'Contact', icon: FaEnvelope },
]

function App() {
  const [activeNav, setActiveNav] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleNavClick = (id) => {
    setActiveNav(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-brand-navy text-white">
      {/* Background Bokeh Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bokeh-float-1 absolute -left-20 top-20 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"></div>
        <div className="bokeh-float-2 absolute right-40 top-40 h-80 w-80 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 blur-3xl"></div>
        <div className="bokeh-float-3 absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-3xl"></div>
        <div className="bokeh-float-4 absolute -right-10 bottom-40 h-96 w-96 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 blur-3xl"></div>
      </div>

      {/* Left Sidebar */}
      <aside
        className={`sidebar-transition fixed left-0 top-0 z-10 flex h-screen flex-col overflow-hidden border-r border-brand-teal/20 bg-brand-slate/95 backdrop-blur-md ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Toggle Button - Inside Sidebar */}
        <div className="flex items-center justify-end border-b border-brand-teal/20 p-2">
          <button
            onClick={toggleSidebar}
            className="rounded-lg bg-brand-panel/90 p-2 text-brand-cyan backdrop-blur-sm transition-all hover:bg-brand-teal/20 hover:text-white"
            title={sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
          >
            {sidebarOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center border-b border-brand-teal/20 px-3 py-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`profile-image-float profile-image-container relative mb-2 ${
              sidebarOpen ? 'h-28 w-28' : 'h-14 w-14'
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-75 blur-xl"></div>
            <img
              src="/my-photo.png"
              alt="Muhammad Abdullah"
              className="relative h-full w-full rounded-full border-4 border-brand-cyan/60 object-cover shadow-2xl"
            />
          </motion.div>
          {sidebarOpen && (
            <>
              <h2 className="text-center font-heading text-base font-bold text-white">Muhammad Abdullah</h2>
              <p className="mt-1 text-center text-xs text-slate-300">AI Web & Custom Software Developer</p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-2 py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-brand-panel/50 text-slate-300 hover:bg-brand-panel hover:text-white'
                } ${
                  sidebarOpen ? 'justify-start' : 'justify-center'
                }`}
                title={item.label}
              >
                <Icon
                  className={`text-lg shrink-0 ${
                    isActive ? 'text-white' : 'text-brand-teal group-hover:text-brand-cyan'
                  }`}
                />
                {sidebarOpen && <span className="sidebar-text">{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`main-content-transition relative flex-1 overflow-y-auto ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-16">
          {/* Hero Section */}
          <MotionSection
            id="home"
            className="min-h-[60vh] pt-8"
            initial="hidden"
            animate="visible"
            variants={sectionVariant}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="max-w-3xl">
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-brand-cyan">Modern Teal Tech</p>
              <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl">
                Hi, I&apos;m Muhammad Abdullah
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
                Building functional Desktop, Mobile, and Web solutions with a focus on clean architecture and modern
                development practices.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/Muhammad_Abdullah_CV.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/50 transition hover:shadow-cyan-500/70"
                >
                  <FaFileDownload />
                  Download CV
                </a>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-cyan bg-brand-panel/50 px-6 py-3 text-sm font-semibold text-brand-cyan backdrop-blur-sm transition hover:bg-brand-cyan/10"
                >
                  <FaEnvelope />
                  Contact Me
                </button>
              </div>
            </div>

            {/* Glassmorphism Cards */}
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 p-2">
                    <FaUser className="text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white">Personal Info</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>
                    <span className="font-medium text-brand-cyan">Full Name:</span> Muhammad Abdullah
                  </p>
                  <p>
                    <span className="font-medium text-brand-cyan">Email:</span> javaidabdullah509@gmail.com
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 p-2">
                    <MdLocationOn className="text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white">Location</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>
                    <span className="font-medium text-brand-cyan">Address:</span> Tahir Colony, Old Hasilpur
                  </p>
                  <p>
                    <span className="font-medium text-brand-cyan">Country:</span> Pakistan
                  </p>
                </div>
              </motion.div>
            </div>
          </MotionSection>

          {/* About Section */}
          <MotionSection
            id="about"
            className="mt-20 rounded-2xl border border-brand-teal/20 bg-brand-panel/50 p-8 backdrop-blur-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariant}
            transition={{ duration: 0.45 }}
          >
            <SectionHeading eyebrow="About Me" title="Academic Journey & Background" />
            <p className="text-base leading-relaxed text-slate-200">
              I am currently pursuing BS Software Engineering (2023–2027) at COMSATS. My academic path started in
              Pre-Medical, and the shift to engineering reflects my adaptability, growth mindset, and strong commitment
              to technology-driven problem solving.
            </p>
          </MotionSection>

          {/* Expertise Section */}
          <MotionSection
            id="expertise"
            className="mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariant}
            transition={{ duration: 0.45 }}
          >
            <SectionHeading eyebrow="Services" title="Skills & Tools" />
            <div className="grid gap-5 md:grid-cols-3">
              {skillGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-xl border border-brand-teal/20 bg-brand-panel/50 p-6 backdrop-blur-sm"
                >
                  <h3 className="mb-4 font-heading text-xl font-semibold text-white">{group.title}</h3>
                  <ul className="space-y-3">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <li key={item.name} className="flex items-center gap-3 text-slate-200">
                          <Icon className="text-brand-cyan" />
                          <span>{item.name}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </MotionSection>

          {/* Projects Section */}
          <MotionSection
            id="projects"
            className="mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariant}
            transition={{ duration: 0.45 }}
          >
            <SectionHeading eyebrow="Featured Projects" title="Core Work" />
            <div className="grid gap-5 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <MotionArticle
                  key={project.title}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-brand-teal/20 bg-brand-panel/50 p-6 backdrop-blur-sm"
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-cyan">{project.tag}</p>
                  <h3 className="font-heading text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">{project.description}</p>
                  <p className="mt-4 inline-flex rounded-md bg-brand-teal/20 px-3 py-1 text-sm font-medium text-brand-cyan">
                    {project.tech}
                  </p>
                </MotionArticle>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-brand-cyan/30 bg-brand-panel/60 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <FaCode className="text-brand-cyan" />
                <h3 className="font-heading text-xl font-semibold">Mini-Apps Bundle</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {miniApps.map((app) => (
                  <div
                    key={app}
                    className="rounded-lg border border-brand-teal/20 bg-brand-slate/80 px-4 py-3 text-center"
                  >
                    <p className="text-sm font-medium text-slate-200">{app}</p>
                  </div>
                ))}
              </div>
            </div>
          </MotionSection>

          {/* Leadership Section */}
          <MotionSection
            id="leadership"
            className="mt-20 rounded-2xl border border-brand-teal/20 bg-brand-panel/50 p-8 backdrop-blur-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariant}
            transition={{ duration: 0.45 }}
          >
            <SectionHeading eyebrow="Leadership & Activities" title="Beyond Development" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-brand-teal/20 bg-brand-slate/80 p-5">
                <p className="text-sm uppercase tracking-wider text-brand-cyan">Event Organizer</p>
                <p className="mt-2 text-slate-200">
                  Contributed to Sports Gala 2025 and Orientation Session execution.
                </p>
              </div>
              <div className="rounded-lg border border-brand-teal/20 bg-brand-slate/80 p-5">
                <p className="text-sm uppercase tracking-wider text-brand-cyan">Social Impact</p>
                <p className="mt-2 text-slate-200">
                  Participated in awareness seminar on Flood Awareness initiatives.
                </p>
              </div>
            </div>
          </MotionSection>

          {/* Contact Section */}
          <MotionSection
            id="contact"
            className="mt-20 mb-10 rounded-2xl border border-brand-cyan/30 bg-brand-panel/70 p-8 backdrop-blur-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariant}
            transition={{ duration: 0.45 }}
          >
            <SectionHeading eyebrow="Contact" title="Let&apos;s Connect" />
            <div className="grid gap-4 md:grid-cols-3">
              <a
                href="mailto:javaidabdullah509@gmail.com"
                className="flex items-center gap-3 rounded-lg border border-brand-teal/20 bg-brand-slate/80 p-4 transition hover:border-brand-cyan"
              >
                <FaEnvelope className="text-brand-cyan" />
                <span className="text-sm text-slate-100">javaidabdullah509@gmail.com</span>
              </a>
              <a
                href="tel:+923018075447"
                className="flex items-center gap-3 rounded-lg border border-brand-teal/20 bg-brand-slate/80 p-4 transition hover:border-brand-cyan"
              >
                <FaPhoneAlt className="text-brand-cyan" />
                <span className="text-sm text-slate-100">+92 301 8075447</span>
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-brand-teal/20 bg-brand-slate/80 p-4">
                <MdLocationOn className="text-brand-cyan" />
                <span className="text-sm text-slate-100">Tahir Colony, Old Hasilpur</span>
              </div>
            </div>
          </MotionSection>
        </div>
      </main>
    </div>
  )
}

export default App
