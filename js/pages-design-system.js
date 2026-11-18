/* ==========================================================================
   CareerConnect – Design System Showcase & Mobile Responsive Previewer
   ========================================================================== */

function renderDesignSystemPage(mobileTab = 'm-dashboard') {
  const colors = [
    { name: 'Primary Blue', hex: '#2563EB', role: 'Primary CTAs, active links, highlights' },
    { name: 'Secondary Navy', hex: '#14213D', role: 'Headings, footer, high-contrast surfaces' },
    { name: 'Background Light', hex: '#F8FAFC', role: 'Page canvas background' },
    { name: 'Card Surface', hex: '#FFFFFF', role: 'Elevated cards, modals, tables' },
    { name: 'Text Primary', hex: '#1E293B', role: 'Body copy & table text' },
    { name: 'Muted Slate', hex: '#64748B', role: 'Metadata, labels, secondary text' },
    { name: 'Success Green', hex: '#16A34A', role: 'Accepted status & verified badges' },
    { name: 'Warning Amber', hex: '#D97706', role: 'Pending status & deadlines' },
    { name: 'Danger Red', hex: '#DC2626', role: 'Rejected status & destructive actions' }
  ];

  const student = getStudent(AppState.currentStudentId);
  const sampleJobs = AppState.jobs.slice(0, 3);

  return `
    <div class="container section-sm">
      <div class="flex-between mb-lg" style="flex-wrap:wrap;">
        <div>
          <span class="badge badge-blue">Figma Deliverables • Section 1 & Section 5</span>
          <h1 style="font-size:1.75rem;margin-top:8px;">CareerConnect Design System & Mobile UI</h1>
          <p class="text-muted text-sm">Reusable tokens, typography scale, component library, and interactive 390px mobile responsive screens.</p>
        </div>
        <button type="button" class="btn btn-primary btn-sm" data-switch-role="guest" data-nav="landing">Back to Web App</button>
      </div>

      <!-- 1. Color Palette -->
      <div class="card mb-lg">
        <h2 style="font-size:1.2rem;margin-bottom:14px;">1. Color System</h2>
        <div class="swatch-grid">
          ${colors.map(c => `
            <div class="swatch-card">
              <div class="swatch-color" style="background:${c.hex};border-bottom:1px solid var(--color-border);"></div>
              <div class="swatch-meta">
                <div class="font-semibold">${c.name}</div>
                <div class="text-xs" style="color:var(--color-primary);font-family:monospace;">${c.hex}</div>
                <div class="text-xs text-muted mt-sm">${c.role}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 2. Typography & Buttons -->
      <div class="grid grid-2 mb-lg">
        <div class="card">
          <h2 style="font-size:1.2rem;margin-bottom:14px;">2. Typography (Poppins & Inter)</h2>
          <div class="flex" style="flex-direction:column;gap:12px;">
            <div>
              <span class="text-xs text-muted">H1 Display • Poppins Bold 36px</span>
              <div style="font-family:var(--font-heading);font-size:2rem;font-weight:700;color:var(--color-secondary);">Find Your Future Career</div>
            </div>
            <div>
              <span class="text-xs text-muted">H2 Section • Poppins SemiBold 24px</span>
              <div style="font-family:var(--font-heading);font-size:1.45rem;font-weight:600;color:var(--color-secondary);">Featured Internships</div>
            </div>
            <div>
              <span class="text-xs text-muted">H3 Card Title • Poppins SemiBold 18px</span>
              <div style="font-family:var(--font-heading);font-size:1.1rem;font-weight:600;color:var(--color-secondary);">Frontend Developer Intern</div>
            </div>
            <div>
              <span class="text-xs text-muted">Body • Inter Regular 15px / 1.6</span>
              <p class="text-sm text-muted">Clean, legible hierarchy optimized for CADT university students scanning job requirements on desktop and mobile.</p>
            </div>
          </div>
        </div>

        <div class="card">
          <h2 style="font-size:1.2rem;margin-bottom:14px;">3. Buttons, Badges & Form Controls</h2>
          <div class="flex" style="flex-wrap:wrap;gap:10px;margin-bottom:18px;">
            <button type="button" class="btn btn-primary">Primary Action</button>
            <button type="button" class="btn btn-secondary">Secondary Navy</button>
            <button type="button" class="btn btn-outline">Outline</button>
            <button type="button" class="btn btn-success">Accept</button>
            <button type="button" class="btn btn-danger-outline">Reject</button>
          </div>
          <div class="flex" style="flex-wrap:wrap;gap:8px;margin-bottom:18px;">
            ${statusBadge('Pending')}
            ${statusBadge('Under Review')}
            ${statusBadge('Accepted')}
            ${statusBadge('Rejected')}
            ${jobTypeBadge('Internship')}
          </div>
          <div class="input-icon-wrap">
            <span class="input-icon">${icon('search')}</span>
            <input type="text" class="form-control" placeholder="Reusable Search Input Component..." />
          </div>
        </div>
      </div>

      <!-- 4. Mobile Design Preview (390px Responsive Frame) -->
      <div class="card">
        <div class="flex-between mb-lg" style="flex-wrap:wrap;">
          <div>
            <h2 style="font-size:1.25rem;">4. Mobile Responsive Screens (390 × 760 Frame)</h2>
            <p class="text-xs text-muted">Interactive mobile views designed for students checking internships on their phones.</p>
          </div>
          <div class="items-center" style="gap:6px;flex-wrap:wrap;">
            <button type="button" class="btn btn-sm ${mobileTab === 'm-dashboard' ? 'btn-primary' : 'btn-outline'}" data-mobile-tab="m-dashboard">Student Home</button>
            <button type="button" class="btn btn-sm ${mobileTab === 'm-jobs' ? 'btn-primary' : 'btn-outline'}" data-mobile-tab="m-jobs">Find Jobs</button>
            <button type="button" class="btn btn-sm ${mobileTab === 'm-apps' ? 'btn-primary' : 'btn-outline'}" data-mobile-tab="m-apps">Applications</button>
            <button type="button" class="btn btn-sm ${mobileTab === 'm-profile' ? 'btn-primary' : 'btn-outline'}" data-mobile-tab="m-profile">Profile</button>
          </div>
        </div>

        <div class="mobile-device-frame">
          <div class="mobile-device-notch"><span></span></div>
          <div class="mobile-device-screen">
            <div class="flex-between mb-md" style="padding-bottom:10px;border-bottom:1px solid var(--color-border);">
              <span class="font-semibold text-sm" style="color:var(--color-secondary);">Career<em style="font-style:normal;color:var(--color-primary);">Connect</em></span>
              <div class="user-avatar" style="width:28px;height:28px;font-size:0.7rem;">${escapeHtml(student.initials)}</div>
            </div>

            ${mobileTab === 'm-dashboard' ? `
              <div class="card card-compact mb-md" style="background:linear-gradient(135deg,#2563EB,#14213D);color:#FFFFFF;">
                <div class="text-xs" style="opacity:0.85;">CADT Student Portal</div>
                <div class="font-semibold" style="font-size:1.05rem;margin-top:2px;">Hi, ${escapeHtml(student.fullName.split(' ')[0])}!</div>
                <div class="text-xs mt-sm" style="opacity:0.9;">${AppState.applications.filter(a => a.studentId === student.id).length} Applications • ${AppState.savedJobIds.length} Saved Jobs</div>
              </div>
              <div class="font-semibold text-sm mb-sm" style="margin-bottom:8px;">Recommended Internships</div>
              <div class="flex" style="flex-direction:column;gap:10px;">
                ${sampleJobs.map(j => renderJobCard(j, { compact: true, showActions: false })).join('')}
              </div>
            ` : ''}

            ${mobileTab === 'm-jobs' ? `
              <div class="input-icon-wrap mb-md">
                <span class="input-icon">${icon('search')}</span>
                <input type="text" class="form-control" placeholder="Search React, Python, Figma..." />
              </div>
              <div class="flex" style="gap:6px;overflow-x:auto;margin-bottom:12px;">
                <span class="badge badge-blue">All</span>
                <span class="badge badge-navy">Internship</span>
                <span class="badge badge-navy">Phnom Penh</span>
                <span class="badge badge-navy">Remote</span>
              </div>
              <div class="flex" style="flex-direction:column;gap:10px;">
                ${sampleJobs.map(j => renderJobCard(j, { compact: true })).join('')}
              </div>
            ` : ''}

            ${mobileTab === 'm-apps' ? `
              <div class="font-semibold text-sm" style="margin-bottom:10px;">My Applications</div>
              <div class="flex" style="flex-direction:column;gap:10px;">
                ${AppState.applications.filter(a => a.studentId === student.id).map(app => {
                  const j = getJob(app.jobId);
                  const c = j ? getCompany(j.companyId) : { name: 'Company' };
                  return j ? `
                    <div class="card card-compact">
                      <div class="flex-between">
                        <div class="font-semibold text-sm">${escapeHtml(j.title)}</div>
                        ${statusBadge(app.status)}
                      </div>
                      <div class="text-xs text-muted mt-sm">${escapeHtml(c.name)} • ${formatDate(app.appliedDate)}</div>
                    </div>
                  ` : '';
                }).join('')}
              </div>
            ` : ''}

            ${mobileTab === 'm-profile' ? `
              <div style="text-align:center;" class="mb-md">
                <div class="user-avatar" style="width:64px;height:64px;margin:0 auto 8px;font-size:1.3rem;">${escapeHtml(student.initials)}</div>
                <div class="font-semibold">${escapeHtml(student.fullName)}</div>
                <div class="text-xs text-muted">${escapeHtml(student.major)}</div>
                <div class="text-xs" style="color:var(--color-primary);">${escapeHtml(student.university)}</div>
              </div>
              <div class="card card-compact mb-md">
                <div class="text-xs font-semibold mb-sm" style="margin-bottom:6px;">Skills</div>
                <div class="flex" style="flex-wrap:wrap;gap:5px;">
                  ${student.skills.map(s => `<span class="skill-tag matched">${escapeHtml(s)}</span>`).join('')}
                </div>
              </div>
              <div class="card card-compact">
                <div class="text-xs font-semibold">Uploaded CV</div>
                <div class="text-xs text-muted mt-sm">${student.cv ? escapeHtml(student.cv.fileName) : 'None'}</div>
              </div>
            ` : ''}
          </div>

          <div class="mobile-bottom-nav">
            <button type="button" class="${mobileTab === 'm-dashboard' ? 'active' : ''}" data-mobile-tab="m-dashboard">${icon('home')}<span>Home</span></button>
            <button type="button" class="${mobileTab === 'm-jobs' ? 'active' : ''}" data-mobile-tab="m-jobs">${icon('search')}<span>Jobs</span></button>
            <button type="button" class="${mobileTab === 'm-apps' ? 'active' : ''}" data-mobile-tab="m-apps">${icon('fileText')}<span>Applied</span></button>
            <button type="button" class="${mobileTab === 'm-profile' ? 'active' : ''}" data-mobile-tab="m-profile">${icon('user')}<span>Profile</span></button>
          </div>
        </div>
      </div>
    </div>
  `;
}
