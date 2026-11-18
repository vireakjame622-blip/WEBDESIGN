/* ==========================================================================
   CareerConnect – Public Pages (Landing, Companies, About, Auth Modals)
   ========================================================================== */

function renderPublicNavbar(activeRoute) {
  return `
    <header class="public-nav" id="public-nav">
      <div class="container public-nav-inner">
        ${renderBrandLogo(true)}

        <nav class="public-nav-links" aria-label="Main navigation">
          <button type="button" class="nav-link ${activeRoute === 'landing' ? 'active' : ''}" data-nav="landing">Home</button>
          <button type="button" class="nav-link ${activeRoute === 'public-jobs' ? 'active' : ''}" data-nav="public-jobs">Find Jobs</button>
          <button type="button" class="nav-link ${activeRoute === 'companies' ? 'active' : ''}" data-nav="companies">Companies</button>
          <button type="button" class="nav-link ${activeRoute === 'about' ? 'active' : ''}" data-nav="about">About</button>
        </nav>

        <div class="public-nav-actions">
          <button type="button" class="btn btn-outline btn-sm" id="open-login-btn">Login</button>
          <button type="button" class="btn btn-primary btn-sm" id="open-signup-btn">Sign Up</button>
        </div>

        <button type="button" class="mobile-menu-toggle" id="public-mobile-toggle" aria-label="Toggle Menu">
          ${icon('menu')}
        </button>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="brand-logo" style="color:#FFFFFF;margin-bottom:12px;">
              <span class="brand-mark">${icon('briefcase')}</span>
              <span>Career<em style="color:#60A5FA;">Connect</em></span>
            </div>
            <p class="text-sm" style="color:#94A3B8;max-width:300px;">
              Connecting CADT and Cambodian university students with verified tech internships, graduate roles, and career-launching employers.
            </p>
            <div class="social-pills">
              <a href="#linkedin" class="social-pill" onclick="event.preventDefault();showToast('LinkedIn profile: CareerConnect Cambodia','info')" aria-label="LinkedIn">in</a>
              <a href="#facebook" class="social-pill" onclick="event.preventDefault();showToast('Facebook page: @CareerConnectKH','info')" aria-label="Facebook">f</a>
              <a href="#telegram" class="social-pill" onclick="event.preventDefault();showToast('Telegram Channel: t.me/careerconnect_cadt','info')" aria-label="Telegram">tg</a>
              <a href="#github" class="social-pill" onclick="event.preventDefault();showToast('GitHub: github.com/cadt-careerconnect','info')" aria-label="GitHub">gh</a>
            </div>
          </div>

          <div>
            <h4 class="footer-heading">For Students</h4>
            <ul class="footer-links">
              <li><button type="button" data-nav="public-jobs">Browse Internships</button></li>
              <li><button type="button" data-switch-role="student" data-nav="student-dashboard">Student Dashboard</button></li>
              <li><button type="button" data-switch-role="student" data-nav="student-profile">Build Your Profile</button></li>
              <li><button type="button" data-switch-role="student" data-nav="student-applications">Track Applications</button></li>
            </ul>
          </div>

          <div>
            <h4 class="footer-heading">For Employers</h4>
            <ul class="footer-links">
              <li><button type="button" data-switch-role="company" data-nav="company-post-job">Post a Job</button></li>
              <li><button type="button" data-switch-role="company" data-nav="company-dashboard">Company Portal</button></li>
              <li><button type="button" data-switch-role="company" data-nav="company-applicants">Review Applicants</button></li>
              <li><button type="button" data-nav="companies">Partner Directory</button></li>
            </ul>
          </div>

          <div>
            <h4 class="footer-heading">Contact Us</h4>
            <ul class="footer-links">
              <li style="color:#94A3B8;font-size:0.86rem;">Bridge 2, National Road 6A, Prek Leap, Chroy Changvar, Phnom Penh (CADT Campus)</li>
              <li><a href="mailto:careers@cadt.edu.kh">careers@cadt.edu.kh</a></li>
              <li style="color:#94A3B8;font-size:0.86rem;">+855 23 990 123</li>
            </ul>
          </div>
        </div>

        <div class="flex-between mt-lg" style="flex-wrap:wrap;font-size:0.8rem;color:#94A3B8;">
          <span>© 2026 CareerConnect Cambodia. Designed for CADT University Project.</span>
          <div class="items-center" style="gap:16px;">
            <button type="button" class="text-xs" style="color:#94A3B8;" data-switch-role="design-system" data-nav="design-system">Design System & Mobile Preview</button>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function renderLandingPage() {
  const activeJobs = AppState.jobs.filter(j => j.status === 'Active');
  const featuredJobs = activeJobs.filter(j => j.featured).slice(0, 4);
  const categories = AppState.categories.filter(c => c.active);

  return `
    ${renderPublicNavbar('landing')}
    <main>
      <!-- Hero Section -->
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="hero-eyebrow">
              ${icon('graduation')} Built for CADT & Cambodian University Students
            </div>
            <h1 class="hero-title">Find Your Future <span>Career Today.</span></h1>
            <p class="hero-desc">
              Discover verified internships, part-time developer roles, and graduate opportunities tailored to your major, technical skills, and career goals across Cambodia.
            </p>

            <form class="hero-search-box" id="hero-search-form">
              <div class="input-icon-wrap">
                <span class="input-icon">${icon('search')}</span>
                <input type="text" class="form-control" id="hero-search-input" placeholder="Job title, skills (e.g. React, Python), or company..." />
              </div>
              <div class="hero-search-divider"></div>
              <div style="min-width:140px;">
                <select class="form-control" id="hero-location-select" style="border:none;background:transparent;">
                  <option value="All">All Locations</option>
                  <option value="Phnom Penh">Phnom Penh</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Search Jobs</button>
            </form>

            <div class="hero-popular-searches">
              <span>Popular:</span>
              <button type="button" class="quick-chip" data-quick-search="Frontend">Frontend Intern</button>
              <button type="button" class="quick-chip" data-quick-search="UI/UX">UI/UX Design</button>
              <button type="button" class="quick-chip" data-quick-search="Python">Data Science</button>
              <button type="button" class="quick-chip" data-quick-search="Cybersecurity">Cybersecurity</button>
            </div>
          </div>

          <div class="hero-visual-card">
            <div class="flex-between mb-md">
              <div>
                <span class="badge badge-blue">Live Campus Hiring</span>
                <h3 style="margin-top:8px;font-size:1.1rem;">Matched for CADT Majors</h3>
              </div>
              <span class="badge badge-green">Updated Today</span>
            </div>

            <div class="flex" style="flex-direction:column;gap:12px;">
              ${activeJobs.slice(0, 3).map(j => {
                const c = getCompany(j.companyId);
                return `
                  <div class="card card-compact card-interactive" style="cursor:pointer;" data-open-job="${j.id}">
                    <div class="flex-between">
                      <div class="items-center" style="gap:12px;">
                        <div class="company-logo" style="width:40px;height:40px;font-size:0.85rem;background:${c.color}">${escapeHtml(c.initials)}</div>
                        <div>
                          <div class="font-semibold text-sm" style="color:var(--color-secondary);">${escapeHtml(j.title)}</div>
                          <div class="text-xs text-muted">${escapeHtml(c.name)} • ${escapeHtml(j.location)}</div>
                        </div>
                      </div>
                      ${jobTypeBadge(j.jobType)}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="hero-stat-row">
              <div>
                <div class="hero-stat-val">${activeJobs.length}+</div>
                <div class="hero-stat-label">Active Openings</div>
              </div>
              <div>
                <div class="hero-stat-val">${AppState.companies.filter(c => c.verified).length}+</div>
                <div class="hero-stat-label">Verified Employers</div>
              </div>
              <div>
                <div class="hero-stat-val">94%</div>
                <div class="hero-stat-label">CADT Skill Match</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Job Categories -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">Popular Job Categories</h2>
              <p class="section-subtitle">Explore roles aligned with CADT faculties and Cambodia’s fast-growing digital economy.</p>
            </div>
            <button type="button" class="btn btn-outline" data-nav="public-jobs">View All Jobs ${icon('arrowRight')}</button>
          </div>

          <div class="grid grid-3">
            ${categories.map(cat => {
              const count = activeJobs.filter(j => j.category === cat.name).length;
              return `
                <div class="card card-interactive category-card" data-filter-cat="${escapeHtml(cat.name)}">
                  <div class="category-icon">${icon(cat.icon)}</div>
                  <div>
                    <h3 style="font-size:1rem;">${escapeHtml(cat.name)}</h3>
                    <p class="text-xs text-muted" style="margin-top:2px;">${count} open position${count === 1 ? '' : 's'}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- Featured Internship & Job Opportunities -->
      <section class="section" style="padding-top:12px;">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">Featured Internships & Jobs</h2>
              <p class="section-subtitle">Hand-picked opportunities from trusted employers welcoming university talent.</p>
            </div>
            <button type="button" class="btn btn-primary" data-nav="public-jobs">Explore All Opportunities</button>
          </div>

          <div class="grid grid-2">
            ${featuredJobs.map(job => renderJobCard(job)).join('')}
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="section" style="background:var(--color-surface);border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border);">
        <div class="container">
          <div style="text-align:center;max-width:620px;margin:0 auto 40px;">
            <h2 class="section-title">How CareerConnect Works</h2>
            <p class="section-subtitle">Go from student profile to your first tech internship in three simple steps.</p>
          </div>

          <div class="grid grid-3">
            <div class="card">
              <div class="step-number">1</div>
              <h3 style="font-size:1.1rem;margin-bottom:8px;">Create Your Student Profile</h3>
              <p class="text-sm text-muted">Add your CADT major, technical skills, academic projects, and upload your CV in under 3 minutes.</p>
            </div>
            <div class="card">
              <div class="step-number">2</div>
              <h3 style="font-size:1.1rem;margin-bottom:8px;">Discover & Filter Matched Roles</h3>
              <p class="text-sm text-muted">Filter opportunities by internship or full-time, Phnom Penh or remote, and skills that match your coursework.</p>
            </div>
            <div class="card">
              <div class="step-number">3</div>
              <h3 style="font-size:1.1rem;margin-bottom:8px;">Apply & Track Real-Time Status</h3>
              <p class="text-sm text-muted">Submit one-click applications and monitor every update from Pending to Under Review and Accepted.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits for Students -->
      <section class="section">
        <div class="container">
          <div class="benefits-banner">
            <div>
              <span class="badge badge-blue" style="margin-bottom:14px;">Why Students Love CareerConnect</span>
              <h2 style="font-size:1.85rem;margin-bottom:12px;">Built Specifically for Emerging Tech Talent in Cambodia</h2>
              <p style="color:#CBD5E1;font-size:0.96rem;margin-bottom:24px;">
                No clutter, no fake listings. Every company on CareerConnect is verified by our university career center team.
              </p>
              <div class="items-center" style="gap:12px;flex-wrap:wrap;">
                <button type="button" class="btn btn-primary" data-switch-role="student" data-nav="student-dashboard">Open Student Portal</button>
                <button type="button" class="btn btn-outline" style="background:transparent;color:#FFFFFF;border-color:rgba(255,255,255,0.3);" data-switch-role="company" data-nav="company-dashboard">I’m a Company</button>
              </div>
            </div>

            <div class="grid grid-2">
              <div class="benefit-item">
                <h4 style="color:#FFFFFF;font-size:0.98rem;margin-bottom:6px;">Verified Employers Only</h4>
                <p class="text-xs" style="color:#CBD5E1;">Admin-reviewed companies like Wing Bank, Smart Axiata, and Pathmazing.</p>
              </div>
              <div class="benefit-item">
                <h4 style="color:#FFFFFF;font-size:0.98rem;margin-bottom:6px;">Zero-Experience Friendly</h4>
                <p class="text-xs" style="color:#CBD5E1;">Dedicated filters for Year 2–4 internships and student part-time schedules.</p>
              </div>
              <div class="benefit-item">
                <h4 style="color:#FFFFFF;font-size:0.98rem;margin-bottom:6px;">Transparent Salaries</h4>
                <p class="text-xs" style="color:#CBD5E1;">Clear monthly internship stipends and junior salary ranges upfront.</p>
              </div>
              <div class="benefit-item">
                <h4 style="color:#FFFFFF;font-size:0.98rem;margin-bottom:6px;">Skill & Project Highlighting</h4>
                <p class="text-xs" style="color:#CBD5E1;">Showcase GitHub repos and CADT capstone projects directly to recruiters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}
  `;
}

function renderCompaniesDirectoryPage() {
  return `
    ${renderPublicNavbar('companies')}
    <main class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <h1 class="section-title">Partner Companies & Employers</h1>
            <p class="section-subtitle">Explore verified tech firms, banks, and digital startups hiring Cambodian university students.</p>
          </div>
          <button type="button" class="btn btn-primary" data-switch-role="company" data-nav="company-post-job">
            ${icon('plus')} Post a Job as Company
          </button>
        </div>

        <div class="grid grid-3">
          ${AppState.companies.map(c => {
            const openCount = AppState.jobs.filter(j => j.companyId === c.id && j.status === 'Active').length;
            return `
              <div class="card card-interactive flex" style="flex-direction:column;justify-content:space-between;gap:16px;">
                <div>
                  <div class="flex-between mb-md">
                    <div class="company-logo company-logo-lg" style="background:${c.color}">${escapeHtml(c.initials)}</div>
                    ${c.verified ? `<span class="badge badge-green">${icon('check')} Verified</span>` : `<span class="badge badge-amber">Pending Verification</span>`}
                  </div>
                  <h3 style="font-size:1.1rem;">${escapeHtml(c.name)}</h3>
                  <p class="text-xs text-muted" style="margin-top:3px;">${escapeHtml(c.industry)} • ${escapeHtml(c.location)}</p>
                  <p class="text-sm text-muted mt-md">${escapeHtml(c.description)}</p>
                </div>
                <div class="flex-between" style="padding-top:14px;border-top:1px solid var(--color-border);">
                  <span class="text-sm font-semibold" style="color:var(--color-primary);">${openCount} Open Role${openCount === 1 ? '' : 's'}</span>
                  <button type="button" class="btn btn-outline btn-sm" data-quick-search="${escapeHtml(c.name.split(' ')[0])}">View Jobs</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

function renderAboutPage() {
  return `
    ${renderPublicNavbar('about')}
    <main class="section">
      <div class="container" style="max-width:960px;">
        <div class="card" style="padding:36px;">
          <span class="badge badge-blue">About CareerConnect</span>
          <h1 style="font-size:2rem;margin-top:12px;">Empowering CADT & University Students in Cambodia</h1>
          <p class="text-muted mt-md" style="font-size:1rem;">
            CareerConnect is a modern student job and internship platform designed to bridge the gap between university classrooms and Cambodia’s digital industry.
          </p>

          <div class="grid grid-3 mt-lg">
            <div class="card card-compact" style="background:var(--color-bg);">
              <h3 style="font-size:1rem;">For Students</h3>
              <p class="text-sm text-muted mt-sm">Build a structured tech profile, upload your CV, save favorite internships, and track application decisions transparently.</p>
            </div>
            <div class="card card-compact" style="background:var(--color-bg);">
              <h3 style="font-size:1rem;">For Companies</h3>
              <p class="text-sm text-muted mt-sm">Publish tailored internship and junior listings, preview student CVs, and shortlist CADT talent in one clean dashboard.</p>
            </div>
            <div class="card card-compact" style="background:var(--color-bg);">
              <h3 style="font-size:1rem;">For University Admins</h3>
              <p class="text-sm text-muted mt-sm">Verify employer authenticity, moderate job postings, manage categories, and monitor campus placement metrics.</p>
            </div>
          </div>

          <div class="mt-lg" style="padding-top:24px;border-top:1px solid var(--color-border);">
            <h3 style="font-size:1.1rem;margin-bottom:8px;">Implementation-Ready Architecture</h3>
            <p class="text-sm text-muted">
              Every screen and workflow in this UI prototype is architected for seamless implementation with <strong>HTML5, CSS3, Vanilla JavaScript, Node.js (Express), and MySQL</strong>.
            </p>
            <div class="items-center mt-md" style="gap:12px;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" data-nav="public-jobs">Browse Jobs Now</button>
              <button type="button" class="btn btn-outline" data-switch-role="design-system" data-nav="design-system">View Design System & UI Kit</button>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

function openAuthModal(mode = 'login') {
  const isLogin = mode === 'login';
  openModal({
    title: isLogin ? 'Welcome Back to CareerConnect' : 'Create Your CareerConnect Account',
    bodyHtml: `
      <div class="tabs" style="margin-bottom:16px;">
        <button type="button" class="tab-btn ${isLogin ? 'active' : ''}" id="auth-tab-login">Login</button>
        <button type="button" class="tab-btn ${!isLogin ? 'active' : ''}" id="auth-tab-signup">Sign Up</button>
      </div>
      <form id="auth-form">
        <div class="form-group">
          <label class="form-label">Select Account Role</label>
          <select class="form-control" id="auth-role">
            <option value="student">Student (CADT / University)</option>
            <option value="company">Company / Employer</option>
            ${isLogin ? '<option value="admin">Platform Admin</option>' : ''}
          </select>
        </div>
        ${!isLogin ? `
          <div class="form-group">
            <label class="form-label">Full Name / Company Name <span class="req">*</span></label>
            <input type="text" class="form-control" id="auth-name" placeholder="e.g. Sokha Chan or Wing Bank" required />
          </div>
        ` : ''}
        <div class="form-group">
          <label class="form-label">Email Address <span class="req">*</span></label>
          <input type="email" class="form-control" id="auth-email" value="${isLogin ? 'sokha.chan@student.cadt.edu.kh' : ''}" placeholder="name@cadt.edu.kh" required />
        </div>
        <div class="form-group">
          <label class="form-label">Password <span class="req">*</span></label>
          <input type="password" class="form-control" id="auth-password" value="${isLogin ? '••••••••' : ''}" placeholder="Enter password" required />
        </div>
        <button type="submit" class="btn btn-primary btn-block">${isLogin ? 'Login to Dashboard' : 'Create Account'}</button>
      </form>
    `
  });

  document.getElementById('auth-tab-login').onclick = () => openAuthModal('login');
  document.getElementById('auth-tab-signup').onclick = () => openAuthModal('signup');
  document.getElementById('auth-form').onsubmit = (e) => {
    e.preventDefault();
    const role = document.getElementById('auth-role').value;
    closeModal();
    if (role === 'student') {
      switchRole('student', 'student-dashboard');
      showToast(isLogin ? 'Signed in as Sokha Chan (CADT Student)' : 'Student account created! Welcome to CareerConnect.');
    } else if (role === 'company') {
      switchRole('company', 'company-dashboard');
      showToast(isLogin ? 'Signed in as Wing Bank (Company Portal)' : 'Company account registered!');
    } else {
      switchRole('admin', 'admin-dashboard');
      showToast('Signed in as Platform Administrator');
    }
  };
}
