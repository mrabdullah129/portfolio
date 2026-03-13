import { FaArrowLeft, FaPlus, FaSave, FaTimes, FaTrash, FaUndo } from 'react-icons/fa'
import { skillIconOptions } from './portfolioData'

const inputClassName =
  'w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400'

function AdminSection({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-4">
        <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
        {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function AdminField({ label, value, onChange, placeholder = '' }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{label}</span>
      <input className={inputClassName} value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  )
}

function AdminTextarea({ label, value, onChange, rows = 4 }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{label}</span>
      <textarea className={inputClassName} rows={rows} value={value} onChange={onChange} />
    </label>
  )
}

function ArrayActions({ onRemove, removeLabel }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/10"
    >
      <FaTrash />
      {removeLabel}
    </button>
  )
}

function InfoRowsEditor({ title, rows, onAdd, onChange, onRemove }) {
  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-slate-950/30 p-3">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-medium text-white">{title}</h4>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
        >
          <FaPlus />
          Add Row
        </button>
      </div>

      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={`${title}-${index}`} className="space-y-3 rounded-xl border border-white/10 bg-slate-900/70 p-3">
            <AdminField
              label="Label"
              value={row.label}
              onChange={(event) => onChange(index, 'label', event.target.value)}
            />
            <AdminField
              label="Value"
              value={row.value}
              onChange={(event) => onChange(index, 'value', event.target.value)}
            />
            <ArrayActions onRemove={() => onRemove(index)} removeLabel="Remove Row" />
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminPanel({ open, onClose, data, onUpdate, onSave, onReset, saveMessage, standalone = false }) {
  return (
    <>
      {!standalone && open && (
        <button
          type="button"
          aria-label="Close admin panel"
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`${standalone ? 'inset-0 max-w-none border-l-0' : 'right-0 top-0 h-screen max-w-2xl border-l'} fixed z-50 w-full overflow-y-auto border-cyan-400/20 bg-[#091120]/95 p-4 backdrop-blur-xl transition-transform duration-300 sm:p-6 ${
          open || standalone ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Admin Panel</p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-white">Edit Portfolio Content</h2>
            <p className="mt-2 text-sm text-slate-400">
              Add, edit, and remove portfolio content. Save stores changes in this browser.
            </p>
            {standalone && (
              <a
                href="/"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
              >
                <FaArrowLeft />
                Back To Portfolio
              </a>
            )}
          </div>

          {!standalone && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white"
          >
            <FaSave />
            Save Changes
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
          >
            <FaUndo />
            Reset Default
          </button>
          {saveMessage && <p className="self-center text-sm text-cyan-200">{saveMessage}</p>}
        </div>

        <div className="space-y-5">
          <AdminSection title="Profile" description="Main hero section, image, and downloadable CV link.">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                label="Name"
                value={data.profile.name}
                onChange={(event) => onUpdate((draft) => {
                  draft.profile.name = event.target.value
                })}
              />
              <AdminField
                label="Role"
                value={data.profile.role}
                onChange={(event) => onUpdate((draft) => {
                  draft.profile.role = event.target.value
                })}
              />
            </div>
            <AdminField
              label="Hero Eyebrow"
              value={data.profile.heroEyebrow}
              onChange={(event) => onUpdate((draft) => {
                draft.profile.heroEyebrow = event.target.value
              })}
            />
            <AdminField
              label="Hero Title"
              value={data.profile.heroTitle}
              onChange={(event) => onUpdate((draft) => {
                draft.profile.heroTitle = event.target.value
              })}
            />
            <AdminTextarea
              label="Hero Description"
              rows={4}
              value={data.profile.heroDescription}
              onChange={(event) => onUpdate((draft) => {
                draft.profile.heroDescription = event.target.value
              })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                label="Photo URL"
                value={data.profile.photoUrl}
                onChange={(event) => onUpdate((draft) => {
                  draft.profile.photoUrl = event.target.value
                })}
              />
              <AdminField
                label="CV URL"
                value={data.profile.cvUrl}
                onChange={(event) => onUpdate((draft) => {
                  draft.profile.cvUrl = event.target.value
                })}
              />
            </div>
          </AdminSection>

          <AdminSection title="Info Cards" description="Edit personal info and location cards shown on the hero section.">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                label="Personal Card Title"
                value={data.infoCards.personalInfoTitle}
                onChange={(event) => onUpdate((draft) => {
                  draft.infoCards.personalInfoTitle = event.target.value
                })}
              />
              <AdminField
                label="Location Card Title"
                value={data.infoCards.locationTitle}
                onChange={(event) => onUpdate((draft) => {
                  draft.infoCards.locationTitle = event.target.value
                })}
              />
            </div>

            <InfoRowsEditor
              title="Personal Card Rows"
              rows={data.infoCards.personalInfo}
              onAdd={() => onUpdate((draft) => {
                draft.infoCards.personalInfo.push({ label: 'New Label', value: 'New Value' })
              })}
              onChange={(index, field, value) => onUpdate((draft) => {
                draft.infoCards.personalInfo[index][field] = value
              })}
              onRemove={(index) => onUpdate((draft) => {
                draft.infoCards.personalInfo.splice(index, 1)
              })}
            />

            <InfoRowsEditor
              title="Location Card Rows"
              rows={data.infoCards.locationInfo}
              onAdd={() => onUpdate((draft) => {
                draft.infoCards.locationInfo.push({ label: 'New Label', value: 'New Value' })
              })}
              onChange={(index, field, value) => onUpdate((draft) => {
                draft.infoCards.locationInfo[index][field] = value
              })}
              onRemove={(index) => onUpdate((draft) => {
                draft.infoCards.locationInfo.splice(index, 1)
              })}
            />
          </AdminSection>

          <AdminSection title="About" description="Edit the about section heading and content.">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                label="Eyebrow"
                value={data.about.eyebrow}
                onChange={(event) => onUpdate((draft) => {
                  draft.about.eyebrow = event.target.value
                })}
              />
              <AdminField
                label="Title"
                value={data.about.title}
                onChange={(event) => onUpdate((draft) => {
                  draft.about.title = event.target.value
                })}
              />
            </div>
            <AdminTextarea
              label="Description"
              rows={5}
              value={data.about.description}
              onChange={(event) => onUpdate((draft) => {
                draft.about.description = event.target.value
              })}
            />
          </AdminSection>

          <AdminSection title="Skills" description="Manage skill groups and add new items with icons.">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                label="Eyebrow"
                value={data.skills.eyebrow}
                onChange={(event) => onUpdate((draft) => {
                  draft.skills.eyebrow = event.target.value
                })}
              />
              <AdminField
                label="Title"
                value={data.skills.title}
                onChange={(event) => onUpdate((draft) => {
                  draft.skills.title = event.target.value
                })}
              />
            </div>

            <button
              type="button"
              onClick={() => onUpdate((draft) => {
                draft.skills.groups.push({
                  title: 'New Group',
                  items: [{ name: 'New Skill', iconKey: 'code' }],
                })
              })}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
            >
              <FaPlus />
              Add Skill Group
            </button>

            <div className="space-y-4">
              {data.skills.groups.map((group, groupIndex) => (
                <div key={`${group.title}-${groupIndex}`} className="space-y-4 rounded-xl border border-white/10 bg-slate-950/30 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <AdminField
                        label="Group Title"
                        value={group.title}
                        onChange={(event) => onUpdate((draft) => {
                          draft.skills.groups[groupIndex].title = event.target.value
                        })}
                      />
                    </div>
                    <ArrayActions
                      onRemove={() => onUpdate((draft) => {
                        draft.skills.groups.splice(groupIndex, 1)
                      })}
                      removeLabel="Remove Group"
                    />
                  </div>

                  <div className="space-y-3">
                    {group.items.map((item, itemIndex) => (
                      <div key={`${item.name}-${itemIndex}`} className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                        <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
                          <AdminField
                            label="Skill Name"
                            value={item.name}
                            onChange={(event) => onUpdate((draft) => {
                              draft.skills.groups[groupIndex].items[itemIndex].name = event.target.value
                            })}
                          />

                          <label className="block space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Icon</span>
                            <select
                              className={inputClassName}
                              value={item.iconKey}
                              onChange={(event) => onUpdate((draft) => {
                                draft.skills.groups[groupIndex].items[itemIndex].iconKey = event.target.value
                              })}
                            >
                              {skillIconOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>

                        <div className="mt-3">
                          <ArrayActions
                            onRemove={() => onUpdate((draft) => {
                              draft.skills.groups[groupIndex].items.splice(itemIndex, 1)
                            })}
                            removeLabel="Remove Skill"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onUpdate((draft) => {
                      draft.skills.groups[groupIndex].items.push({ name: 'New Skill', iconKey: 'code' })
                    })}
                    className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
                  >
                    <FaPlus />
                    Add Skill
                  </button>
                </div>
              ))}
            </div>
          </AdminSection>

          <AdminSection title="Projects" description="Manage featured projects and mini-apps.">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                label="Eyebrow"
                value={data.projects.eyebrow}
                onChange={(event) => onUpdate((draft) => {
                  draft.projects.eyebrow = event.target.value
                })}
              />
              <AdminField
                label="Title"
                value={data.projects.title}
                onChange={(event) => onUpdate((draft) => {
                  draft.projects.title = event.target.value
                })}
              />
            </div>

            <button
              type="button"
              onClick={() => onUpdate((draft) => {
                draft.projects.items.push({
                  title: 'New Project',
                  tag: 'Category',
                  description: 'Project description',
                  tech: 'Tech stack',
                })
              })}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
            >
              <FaPlus />
              Add Project
            </button>

            <div className="space-y-4">
              {data.projects.items.map((project, projectIndex) => (
                <div key={`${project.title}-${projectIndex}`} className="space-y-3 rounded-xl border border-white/10 bg-slate-950/30 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <AdminField
                      label="Project Title"
                      value={project.title}
                      onChange={(event) => onUpdate((draft) => {
                        draft.projects.items[projectIndex].title = event.target.value
                      })}
                    />
                    <AdminField
                      label="Tag"
                      value={project.tag}
                      onChange={(event) => onUpdate((draft) => {
                        draft.projects.items[projectIndex].tag = event.target.value
                      })}
                    />
                  </div>

                  <AdminTextarea
                    label="Description"
                    rows={4}
                    value={project.description}
                    onChange={(event) => onUpdate((draft) => {
                      draft.projects.items[projectIndex].description = event.target.value
                    })}
                  />

                  <AdminField
                    label="Tech Stack"
                    value={project.tech}
                    onChange={(event) => onUpdate((draft) => {
                      draft.projects.items[projectIndex].tech = event.target.value
                    })}
                  />

                  <ArrayActions
                    onRemove={() => onUpdate((draft) => {
                      draft.projects.items.splice(projectIndex, 1)
                    })}
                    removeLabel="Remove Project"
                  />
                </div>
              ))}
            </div>

            <AdminField
              label="Mini Apps Title"
              value={data.projects.miniAppsTitle}
              onChange={(event) => onUpdate((draft) => {
                draft.projects.miniAppsTitle = event.target.value
              })}
            />

            <div className="space-y-3 rounded-xl border border-white/10 bg-slate-950/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-medium text-white">Mini Apps</h4>
                <button
                  type="button"
                  onClick={() => onUpdate((draft) => {
                    draft.projects.miniApps.push('New Mini App')
                  })}
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
                >
                  <FaPlus />
                  Add Mini App
                </button>
              </div>

              {data.projects.miniApps.map((app, appIndex) => (
                <div key={`${app}-${appIndex}`} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-slate-900/70 p-3">
                  <div className="min-w-0 flex-1">
                    <AdminField
                      label={`Mini App ${appIndex + 1}`}
                      value={app}
                      onChange={(event) => onUpdate((draft) => {
                        draft.projects.miniApps[appIndex] = event.target.value
                      })}
                    />
                  </div>
                  <ArrayActions
                    onRemove={() => onUpdate((draft) => {
                      draft.projects.miniApps.splice(appIndex, 1)
                    })}
                    removeLabel="Remove"
                  />
                </div>
              ))}
            </div>
          </AdminSection>

          <AdminSection title="Leadership" description="Update leadership and activity cards.">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                label="Eyebrow"
                value={data.leadership.eyebrow}
                onChange={(event) => onUpdate((draft) => {
                  draft.leadership.eyebrow = event.target.value
                })}
              />
              <AdminField
                label="Title"
                value={data.leadership.title}
                onChange={(event) => onUpdate((draft) => {
                  draft.leadership.title = event.target.value
                })}
              />
            </div>

            <button
              type="button"
              onClick={() => onUpdate((draft) => {
                draft.leadership.items.push({ title: 'New Activity', description: 'Activity description' })
              })}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
            >
              <FaPlus />
              Add Activity
            </button>

            <div className="space-y-4">
              {data.leadership.items.map((item, itemIndex) => (
                <div key={`${item.title}-${itemIndex}`} className="space-y-3 rounded-xl border border-white/10 bg-slate-950/30 p-4">
                  <AdminField
                    label="Title"
                    value={item.title}
                    onChange={(event) => onUpdate((draft) => {
                      draft.leadership.items[itemIndex].title = event.target.value
                    })}
                  />
                  <AdminTextarea
                    label="Description"
                    rows={4}
                    value={item.description}
                    onChange={(event) => onUpdate((draft) => {
                      draft.leadership.items[itemIndex].description = event.target.value
                    })}
                  />
                  <ArrayActions
                    onRemove={() => onUpdate((draft) => {
                      draft.leadership.items.splice(itemIndex, 1)
                    })}
                    removeLabel="Remove Activity"
                  />
                </div>
              ))}
            </div>
          </AdminSection>

          <AdminSection title="Contact" description="Update the contact cards shown at the end of the page.">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                label="Eyebrow"
                value={data.contact.eyebrow}
                onChange={(event) => onUpdate((draft) => {
                  draft.contact.eyebrow = event.target.value
                })}
              />
              <AdminField
                label="Title"
                value={data.contact.title}
                onChange={(event) => onUpdate((draft) => {
                  draft.contact.title = event.target.value
                })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                label="Email"
                value={data.contact.email}
                onChange={(event) => onUpdate((draft) => {
                  draft.contact.email = event.target.value
                })}
              />
              <AdminField
                label="Phone"
                value={data.contact.phone}
                onChange={(event) => onUpdate((draft) => {
                  draft.contact.phone = event.target.value
                })}
              />
            </div>

            <AdminField
              label="Address"
              value={data.contact.address}
              onChange={(event) => onUpdate((draft) => {
                draft.contact.address = event.target.value
              })}
            />
          </AdminSection>
        </div>
      </aside>
    </>
  )
}

export default AdminPanel