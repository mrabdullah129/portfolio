import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  FaBars,
  FaCode,
  FaCog,
  FaEnvelope,
  FaFileDownload,
  FaFolder,
  FaHome,
  FaPhoneAlt,
  FaTimes,
  FaUser,
} from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import AdminPanel from './AdminPanel'
import {
  clonePortfolioData,
  defaultPortfolioData,
  mergePortfolioData,
  portfolioStorageKey,
  skillIconMap,
} from './portfolioData'

const sectionVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const MotionSection = motion.section
const MotionArticle = motion.article

const navItems = [
  { id: 'home', label: 'Home', icon: FaHome },
  { id: 'about', label: 'About', icon: FaUser },
  { id: 'projects', label: 'Projects', icon: FaFolder },
  { id: 'expertise', label: 'Services', icon: FaCog },
  { id: 'contact', label: 'Contact', icon: FaEnvelope },
]

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-cyan">{eyebrow}</p>
      <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">{title}</h2>
    </div>
  )
}

function loadPortfolioData() {
  if (typeof window === 'undefined') {
    return clonePortfolioData(defaultPortfolioData)
  }

  try {
    const storedValue = window.localStorage.getItem(portfolioStorageKey)

    if (!storedValue) {
      return clonePortfolioData(defaultPortfolioData)
    }

    return mergePortfolioData(defaultPortfolioData, JSON.parse(storedValue))
  } catch {
    return clonePortfolioData(defaultPortfolioData)
  }
}

function App() {
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname === '/admin'
  const [activeNav, setActiveNav] = useState('home')
  const [isDesktop, setIsDesktop] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [portfolioData, setPortfolioData] = useState(loadPortfolioData)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    const syncLayout = (event) => {
      const desktop = event.matches
      setIsDesktop(desktop)
      setSidebarOpen(desktop)
    }

    syncLayout(mediaQuery)
    mediaQuery.addEventListener('change', syncLayout)

    return () => mediaQuery.removeEventListener('change', syncLayout)
  }, [])

  useEffect(() => {
    if (!saveMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setSaveMessage('')
    }, 2500)

    return () => window.clearTimeout(timeoutId)
  }, [saveMessage])

  const handleNavClick = (id) => {
    setActiveNav(id)
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }

    if (!isDesktop) {
      setSidebarOpen(false)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open)
  }

  const updatePortfolioData = (recipe) => {
    setPortfolioData((currentData) => {
      const nextData = clonePortfolioData(currentData)
      recipe(nextData)
      return nextData
    })
  }

  const savePortfolioData = () => {
    try {
      window.localStorage.setItem(portfolioStorageKey, JSON.stringify(portfolioData))
      setSaveMessage('Changes saved in this browser.')
    } catch {
      setSaveMessage('Save failed on this device.')
    }
  }

  const resetPortfolioData = () => {
    const nextData = clonePortfolioData(defaultPortfolioData)
    setPortfolioData(nextData)

    try {
      window.localStorage.removeItem(portfolioStorageKey)
    } catch {
      // Ignore storage reset failures and keep defaults in state.
    }

    setSaveMessage('Defaults restored.')
  }

  const showExpandedSidebar = isDesktop ? sidebarOpen : true
  const { profile, infoCards, about, skills, projects, leadership, contact } = portfolioData

  if (isAdminRoute) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-brand-navy text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bokeh-float-1 absolute -left-20 top-20 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"></div>
          <div className="bokeh-float-2 absolute right-40 top-40 h-80 w-80 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 blur-3xl"></div>
          <div className="bokeh-float-3 absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-3xl"></div>
          <div className="bokeh-float-4 absolute -right-10 bottom-40 h-96 w-96 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 blur-3xl"></div>
        </div>

        <AdminPanel
          open
          onClose={() => {}}
          data={portfolioData}
          onUpdate={updatePortfolioData}
          onSave={savePortfolioData}
          onReset={resetPortfolioData}
          saveMessage={saveMessage}
          standalone
        />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-brand-navy text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bokeh-float-1 absolute -left-20 top-20 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"></div>
        <div className="bokeh-float-2 absolute right-40 top-40 h-80 w-80 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 blur-3xl"></div>
        <div className="bokeh-float-3 absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-3xl"></div>
        <div className="bokeh-float-4 absolute -right-10 bottom-40 h-96 w-96 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 blur-3xl"></div>
      </div>

      {!isDesktop && sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="absolute inset-0 z-20 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`sidebar-transition fixed left-0 top-0 z-30 flex h-screen flex-col overflow-hidden border-r border-brand-teal/20 bg-brand-slate/95 backdrop-blur-md ${
          isDesktop
            ? sidebarOpen
              ? 'w-64'
              : 'w-20'
            : sidebarOpen
              ? 'w-[82vw] max-w-[20rem] translate-x-0'
              : 'w-[82vw] max-w-[20rem] -translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end border-b border-brand-teal/20 p-2">
          <button
            onClick={toggleSidebar}
            className="rounded-lg bg-brand-panel/90 p-2 text-brand-cyan backdrop-blur-sm transition-all hover:bg-brand-teal/20 hover:text-white"
            title={sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
          >
            {sidebarOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>

        <div className="flex flex-col items-center border-b border-brand-teal/20 px-3 py-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`profile-image-float profile-image-container relative mb-2 ${
              showExpandedSidebar ? 'h-24 w-24 sm:h-28 sm:w-28' : 'h-14 w-14'
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-75 blur-xl"></div>
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="relative h-full w-full rounded-full border-4 border-brand-cyan/60 object-cover shadow-2xl"
            />
          </motion.div>
          {showExpandedSidebar && (
            <>
              <h2 className="text-center font-heading text-base font-bold text-white">{profile.name}</h2>
              <p className="mt-1 text-center text-xs text-slate-300">{profile.role}</p>
            </>
          )}
        </div>

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
                } ${showExpandedSidebar ? 'justify-start' : 'justify-center'}`}
                title={item.label}
              >
                <Icon
                  className={`shrink-0 text-lg ${
                    isActive ? 'text-white' : 'text-brand-teal group-hover:text-brand-cyan'
                  }`}
                />
                {showExpandedSidebar && <span className="sidebar-text">{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </aside>

      <main
        className={`main-content-transition relative flex-1 overflow-y-auto ${
          isDesktop ? (sidebarOpen ? 'lg:ml-64' : 'lg:ml-20') : 'ml-0'
        }`}
      >
        {!isDesktop && (
          <div className="sticky top-0 z-10 border-b border-brand-teal/20 bg-brand-slate/80 px-4 py-3 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSidebar}
                  className="rounded-lg bg-brand-panel/90 p-2 text-brand-cyan transition hover:bg-brand-teal/20 hover:text-white"
                  aria-label="Open navigation menu"
                >
                  <FaBars className="text-lg" />
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-brand-cyan">Portfolio</p>
                  <p className="font-heading text-sm font-semibold text-white">{profile.name}</p>
                </div>
              </div>
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="h-10 w-10 rounded-full border-2 border-brand-cyan/60 object-cover"
              />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:px-10 lg:px-16 lg:py-10">
          <MotionSection
            id="home"
            className="min-h-[60vh] pt-4 sm:pt-6 lg:pt-8"
            initial="hidden"
            animate="visible"
            variants={sectionVariant}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="max-w-3xl">
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-brand-cyan">{profile.heroEyebrow}</p>
              <h1 className="font-heading text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
                {profile.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {profile.heroDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={profile.cvUrl}
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

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 p-2">
                    <FaUser className="text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white">{infoCards.personalInfoTitle}</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  {infoCards.personalInfo.map((item, index) => (
                    <p key={`${item.label}-${index}`}>
                      <span className="font-medium text-brand-cyan">{item.label}:</span> {item.value}
                    </p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 p-2">
                    <MdLocationOn className="text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white">{infoCards.locationTitle}</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  {infoCards.locationInfo.map((item, index) => (
                    <p key={`${item.label}-${index}`}>
                      <span className="font-medium text-brand-cyan">{item.label}:</span> {item.value}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </MotionSection>

          <MotionSection
            id="about"
            className="mt-16 rounded-2xl border border-brand-teal/20 bg-brand-panel/50 p-6 backdrop-blur-sm sm:p-8 lg:mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariant}
            transition={{ duration: 0.45 }}
          >
            <SectionHeading eyebrow={about.eyebrow} title={about.title} />
            <p className="text-base leading-relaxed text-slate-200">{about.description}</p>
          </MotionSection>

          <MotionSection
            id="expertise"
            className="mt-16 lg:mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariant}
            transition={{ duration: 0.45 }}
          >
            <SectionHeading eyebrow={skills.eyebrow} title={skills.title} />
            <div className="grid gap-5 md:grid-cols-3">
              {skills.groups.map((group, groupIndex) => (
                <div
                  key={`${group.title}-${groupIndex}`}
                  className="rounded-xl border border-brand-teal/20 bg-brand-panel/50 p-6 backdrop-blur-sm"
                >
                  <h3 className="mb-4 font-heading text-xl font-semibold text-white">{group.title}</h3>
                  <ul className="space-y-3">
                    {group.items.map((item, itemIndex) => {
                      const Icon = skillIconMap[item.iconKey] || FaCode

                      return (
                        <li key={`${item.name}-${itemIndex}`} className="flex items-center gap-3 text-slate-200">
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

          <MotionSection
            id="projects"
            className="mt-16 lg:mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariant}
            transition={{ duration: 0.45 }}
          >
            <SectionHeading eyebrow={projects.eyebrow} title={projects.title} />
            <div className="grid gap-5 md:grid-cols-3">
              {projects.items.map((project, index) => (
                <MotionArticle
                  key={`${project.title}-${index}`}
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
                <h3 className="font-heading text-xl font-semibold">{projects.miniAppsTitle}</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {projects.miniApps.map((app, index) => (
                  <div
                    key={`${app}-${index}`}
                    className="rounded-lg border border-brand-teal/20 bg-brand-slate/80 px-4 py-3 text-center"
                  >
                    <p className="text-sm font-medium text-slate-200">{app}</p>
                  </div>
                ))}
              </div>
            </div>
          </MotionSection>

          <MotionSection
            id="leadership"
            className="mt-16 rounded-2xl border border-brand-teal/20 bg-brand-panel/50 p-6 backdrop-blur-sm sm:p-8 lg:mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariant}
            transition={{ duration: 0.45 }}
          >
            <SectionHeading eyebrow={leadership.eyebrow} title={leadership.title} />
            <div className="grid gap-4 md:grid-cols-2">
              {leadership.items.map((item, index) => (
                <div key={`${item.title}-${index}`} className="rounded-lg border border-brand-teal/20 bg-brand-slate/80 p-5">
                  <p className="text-sm uppercase tracking-wider text-brand-cyan">{item.title}</p>
                  <p className="mt-2 text-slate-200">{item.description}</p>
                </div>
              ))}
            </div>
          </MotionSection>

          <MotionSection
            id="contact"
            className="mt-16 mb-10 rounded-2xl border border-brand-cyan/30 bg-brand-panel/70 p-6 backdrop-blur-sm sm:p-8 lg:mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariant}
            transition={{ duration: 0.45 }}
          >
            <SectionHeading eyebrow={contact.eyebrow} title={contact.title} />
            <div className="grid gap-4 md:grid-cols-3">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 rounded-lg border border-brand-teal/20 bg-brand-slate/80 p-4 transition hover:border-brand-cyan"
              >
                <FaEnvelope className="text-brand-cyan" />
                <span className="text-sm text-slate-100">{contact.email}</span>
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 rounded-lg border border-brand-teal/20 bg-brand-slate/80 p-4 transition hover:border-brand-cyan"
              >
                <FaPhoneAlt className="text-brand-cyan" />
                <span className="text-sm text-slate-100">{contact.phone}</span>
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-brand-teal/20 bg-brand-slate/80 p-4">
                <MdLocationOn className="text-brand-cyan" />
                <span className="text-sm text-slate-100">{contact.address}</span>
              </div>
            </div>
          </MotionSection>
        </div>
      </main>

    </div>
  )
}

export default App
