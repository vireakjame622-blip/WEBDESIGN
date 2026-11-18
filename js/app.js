/* ==========================================================================
   CareerConnect – Main Application Controller & Router
   ========================================================================== */

const UIState = {
  appStatusTab: 'All',
  applicantJobFilter: 'All',
  applicantStatusFilter: 'All',
  adminTab: 'overview',
  adminSearch: '',
  mobilePreviewTab: 'm-dashboard',
  sidebarOpen: false
};

function switchRole(role, defaultRoute) {
  AppState.role = role;
  if (defaultRoute) {
    AppState.currentRoute = defaultRoute;
  } else if (role === 'guest') {
    AppState.currentRoute = 'landing';
  } else if (role === 'student') {
    AppState.currentRoute = 'student-dashboard';
  } else if (role === 'company') {
    AppState.currentRoute = 'company-dashboard';
  } else if (role === 'admin') {
    AppState.currentRoute = 'admin-dashboard';
  } else if (role === 'design-system') {
    AppState.currentRoute = 'design-system';
  }
  UIState.sidebarOpen = false;
  saveAppState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPrototypeBar() {
  const r = AppState.role;
  return `
    <div class="prototype-bar">
      <div class="prototype-bar-left">
        <span class="prototype-badge">CAREERCONNECT UI/UX</span>
        <div class="prototype-roles">
          <button type="button" class="role-switch-btn ${r === 'guest' ? 'active' : ''}" data-switch-role="guest" data-nav="landing">Landing / Public</button>
          <button type="button" class="role-switch-btn ${r === 'student' ? 'active' : ''}" data-switch-role="student" data-nav="student-dashboard">Student Portal</button>
          <button type="button" class="role-switch-btn ${r === 'company' ? 'active' : ''}" data-switch-role="company" data-nav="company-dashboard">Company Portal</button>
          <button type="button" class="role-switch-btn ${r === 'admin' ? 'active' : ''}" data-switch-role="admin" data-nav="admin-dashboard">Admin Dashboard</button>
        </div>
      </div>
      <div class="prototype-bar-right">
        <button type="button" class="role-switch-btn ${r === 'design-system' ? 'active' : ''}" data-switch-role="design-system" data-nav="design-system">
          ${icon('palette')} Design System & Mobile
        </button>
        <button type="button" class="proto-action-btn" id="reset-demo-btn" title="Restore initial sample data">
          Reset Demo
        </button>
      </div>
    </div>
  `;
}

function renderPortalShell(contentHtml) {
  const role = AppState.role;
  const route = AppState.currentRoute;
  const student = getStudent(AppState.currentStudentId);
  const company = getCompany(AppState.currentCompanyId);

  let navItems = [];
  let roleLabel = '';
  let profileBadgeHtml = '';

  if (role === 'student') {
    roleLabel = 'Student Account';
    const appCount = AppState.applications.filter(a => a.studentId === student.id).length;
    const savedCount = AppState.savedJobIds.length;
    navItems = [
      { id: 'student-dashboard', label: 'Dashboard', icon: 'home' },
      { id: 'student-jobs', label: 'Find Jobs', icon: 'search' },
      { id: 'student-applications', label: 'My Applications', icon: 'fileText', count: appCount },
      { id: 'student-saved', label: 'Saved Jobs', icon: 'bookmark', count: savedCount },
      { id: 'student-profile', label: 'My Profile', icon: 'user' }
    ];
    profileBadgeHtml = `
      <div class="items-center" style="gap:10px;">
        <div class="user-avatar" style="width:36px;height:36px;font-size:0.8rem;">${escapeHtml(student.initials)}</div>
        <div class="text-xs">
          <div class="font-semibold" style="color:var(--color-secondary);">${escapeHtml(student.fullName)}</div>
          <div class="text-muted">CADT Student</div>
        </div>
      </div>
    `;
  } else if (role === 'company') {
    roleLabel = 'Employer Portal';
    const myJobIds = new Set(AppState.jobs.filter(j => j.companyId === company.id).map(j => j.id));
    const appCount = AppState.applications.filter(a => myJobIds.has(a.jobId)).length;
    navItems = [
      { id: 'company-dashboard', label: 'Company Dashboard', icon: 'home' },
      { id: 'company-post-job', label: 'Post a Job', icon: 'plus' },
      { id: 'company-applicants', label: 'Manage Applicants', icon: 'users', count: appCount }
    ];
    profileBadgeHtml = `
      <div class="items-center" style="gap:10px;">
        <div class="company-logo" style="width:36px;height:36px;font-size:0.78rem;background:${company.color}">${escapeHtml(company.initials)}</div>
        <div class="text-xs">
          <div class="font-semibold" style="color:var(--color-secondary);">${escapeHtml(company.name)}</div>
          <div class="text-muted">Verified Employer</div>
        </div>
      </div>
    `;
  } else if (role === 'admin') {
    roleLabel = 'Administrator';
    navItems = [
      { id: 'admin-dashboard', label: 'Overview & Stats', icon: 'barChart', adminTab: 'overview' },
      { id: 'admin-students', label: 'Manage Students', icon: 'graduation', adminTab: 'students' },
      { id: 'admin-companies', label: 'Manage Companies', icon: 'building', adminTab: 'companies' },
      { id: 'admin-jobs', label: 'Manage Job Postings', icon: 'briefcase', adminTab: 'jobs' },
      { id: 'admin-categories', label: 'Manage Categories', icon: 'layers', adminTab: 'categories' }
    ];
    profileBadgeHtml = `
      <div class="items-center" style="gap:10px;">
        <div class="user-avatar" style="width:36px;height:36px;font-size:0.8rem;background:var(--color-secondary);">AD</div>
        <div class="text-xs">
          <div class="font-semibold" style="color:var(--color-secondary);">Admin Console</div>
          <div class="text-muted">CADT Career Center</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="portal-shell">
      <div class="sidebar-backdrop ${UIState.sidebarOpen ? 'open' : ''}" id="sidebar-backdrop"></div>
      <aside class="portal-sidebar ${UIState.sidebarOpen ? 'open' : ''}">
        <div class="sidebar-brand">
          ${renderBrandLogo(true)}
          <div><span class="sidebar-role-pill">${roleLabel}</span></div>
        </div>

        <nav class="sidebar-nav" aria-label="Portal Navigation">
          ${navItems.map(item => {
            const isActive = role === 'admin'
              ? UIState.adminTab === item.adminTab
              : route === item.id || (route === 'student-job-details' && item.id === 'student-jobs');
            return `
              <button type="button"
                class="sidebar-item ${isActive ? 'active' : ''}"
                ${item.adminTab ? `data-admin-tab="${item.adminTab}"` : `data-nav="${item.id}"`}>
                <span class="sidebar-item-left">${icon(item.icon)} ${escapeHtml(item.label)}</span>
                ${typeof item.count === 'number' ? `<span class="sidebar-count">${item.count}</span>` : ''}
              </button>
            `;
          }).join('')}
        </nav>

        <div class="sidebar-footer">
          <button type="button" class="sidebar-item" data-switch-role="guest" data-nav="landing">
            <span class="sidebar-item-left">${icon('logout')} Back to Public Site</span>
          </button>
        </div>
      </aside>

      <div class="portal-main">
        <header class="portal-topbar">
          <div class="items-center" style="gap:12px;">
            <button type="button" class="mobile-menu-toggle" id="portal-mobile-toggle" aria-label="Open Navigation">
              ${icon('menu')}
            </button>
            <span class="text-sm font-medium text-muted">${roleLabel}</span>
          </div>
          <div class="items-center" style="gap:14px;">
            ${profileBadgeHtml}
          </div>
        </header>

        <main class="portal-content">
          ${contentHtml}
        </main>
      </div>
    </div>
  `;
}

function renderApp() {
  const root = document.getElementById('app-root');
  const route = AppState.currentRoute;
  const role = AppState.role;
  let bodyHtml = '';

  if (role === 'design-system' || route === 'design-system') {
    bodyHtml = renderDesignSystemPage(UIState.mobilePreviewTab);
  } else if (role === 'guest') {
    if (route === 'public-jobs') bodyHtml = renderFindJobsPage(true);
    else if (route === 'public-job-details') bodyHtml = renderJobDetailsPage(true);
    else if (route === 'companies') bodyHtml = renderCompaniesDirectoryPage();
    else if (route === 'about') bodyHtml = renderAboutPage();
    else bodyHtml = renderLandingPage();
  } else if (role === 'student') {
    let page = '';
    if (route === 'student-jobs') page = renderFindJobsPage(false);
    else if (route === 'student-job-details') page = renderJobDetailsPage(false);
    else if (route === 'student-profile') page = renderStudentProfilePage();
    else if (route === 'student-applications') page = renderMyApplicationsPage(UIState.appStatusTab);
    else if (route === 'student-saved') page = renderSavedJobsPage();
    else page = renderStudentDashboard();
    bodyHtml = renderPortalShell(page);
  } else if (role === 'company') {
    let page = '';
    if (route === 'company-post-job') page = renderPostJobPage();
    else if (route === 'company-applicants') page = renderManageApplicantsPage(UIState.applicantJobFilter, UIState.applicantStatusFilter);
    else page = renderCompanyDashboard();
    bodyHtml = renderPortalShell(page);
  } else if (role === 'admin') {
    bodyHtml = renderPortalShell(renderAdminDashboard(UIState.adminTab, UIState.adminSearch));
  }

  root.innerHTML = renderPrototypeBar() + bodyHtml;
  attachDynamicHandlers();
}

function handleApplicantDecision(appId, decision) {
  const app = AppState.applications.find(a => a.id === appId);
  if (!app) return;
  const stu = getStudent(app.studentId);
  showConfirmDialog({
    title: `${decision === 'Accepted' ? 'Accept' : 'Reject'} Candidate`,
    message: `Are you sure you want to mark ${stu.fullName}'s application as "${decision}"?`,
    confirmLabel: decision === 'Accepted' ? 'Confirm Accept' : 'Confirm Reject',
    danger: decision === 'Rejected',
    onConfirm: () => {
      app.status = decision;
      app.timeline.push({
        date: new Date().toISOString().slice(0, 10),
        label: decision === 'Accepted' ? 'Accepted by Hiring Team' : 'Application Not Selected'
      });
      saveAppState();
      showToast(`${stu.fullName} marked as ${decision}.`, decision === 'Accepted' ? 'success' : 'info');
      renderApp();
    }
  });
}

function attachDynamicHandlers() {
  // Public mobile menu toggle
  const pubToggle = document.getElementById('public-mobile-toggle');
  if (pubToggle) {
    pubToggle.onclick = () => {
      document.getElementById('public-nav').classList.toggle('mobile-open');
    };
  }

  // Portal mobile sidebar toggle
  const portalToggle = document.getElementById('portal-mobile-toggle');
  if (portalToggle) {
    portalToggle.onclick = () => {
      UIState.sidebarOpen = !UIState.sidebarOpen;
      renderApp();
    };
  }
  const backdrop = document.getElementById('sidebar-backdrop');
  if (backdrop) {
    backdrop.onclick = () => {
      UIState.sidebarOpen = false;
      renderApp();
    };
  }

  // Auth triggers
  const loginBtn = document.getElementById('open-login-btn');
  if (loginBtn) loginBtn.onclick = () => openAuthModal('login');
  const signupBtn = document.getElementById('open-signup-btn');
  if (signupBtn) signupBtn.onclick = () => openAuthModal('signup');

  // Reset demo data
  const resetBtn = document.getElementById('reset-demo-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      showConfirmDialog({
        title: 'Reset Demo Data',
        message: 'Restore all sample jobs, applications, saved jobs, and CADT student profiles to their defaults?',
        confirmLabel: 'Reset Data',
        onConfirm: () => {
          resetAppState();
          UIState.appStatusTab = 'All';
          UIState.applicantJobFilter = 'All';
          UIState.applicantStatusFilter = 'All';
          UIState.adminTab = 'overview';
          UIState.adminSearch = '';
          showToast('Demo data restored to defaults.', 'info');
          renderApp();
        }
      });
    };
  }

  // Hero search form
  const heroForm = document.getElementById('hero-search-form');
  if (heroForm) {
    heroForm.onsubmit = (e) => {
      e.preventDefault();
      AppState.jobFilters.search = document.getElementById('hero-search-input').value;
      AppState.jobFilters.location = document.getElementById('hero-location-select').value;
      AppState.currentRoute = 'public-jobs';
      saveAppState();
      renderApp();
    };
  }

  // Find Jobs search & filters
  const jobSearchInput = document.getElementById('job-search-input');
  if (jobSearchInput) {
    jobSearchInput.oninput = (e) => {
      AppState.jobFilters.search = e.target.value;
      saveAppState();
      const pos = e.target.selectionStart;
      renderApp();
      const refreshed = document.getElementById('job-search-input');
      if (refreshed) {
        refreshed.focus();
        refreshed.setSelectionRange(pos, pos);
      }
    };
  }
  const bindFilter = (id, key) => {
    const el = document.getElementById(id);
    if (el) {
      el.onchange = (e) => {
        AppState.jobFilters[key] = e.target.value;
        saveAppState();
        renderApp();
      };
    }
  };
  bindFilter('filter-category', 'category');
  bindFilter('filter-location', 'location');
  bindFilter('filter-jobtype', 'jobType');
  bindFilter('filter-experience', 'experience');
  bindFilter('filter-skill', 'skill');

  ['reset-job-filters-btn', 'clear-filters-link', 'empty-reset-filters-btn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => {
        AppState.jobFilters = { search: '', category: 'All', location: 'All', jobType: 'All', experience: 'All', skill: '' };
        saveAppState();
        renderApp();
      };
    }
  });

  // Student Profile actions
  const addSkillForm = document.getElementById('add-skill-form');
  if (addSkillForm) {
    addSkillForm.onsubmit = (e) => {
      e.preventDefault();
      const val = document.getElementById('new-skill-input').value.trim();
      const stu = getStudent(AppState.currentStudentId);
      if (val && !stu.skills.includes(val)) {
        stu.skills.push(val);
        saveAppState();
        showToast(`Added skill "${val}" to your profile.`);
        renderApp();
      }
    };
  }

  const cvInput = document.getElementById('cv-file-input');
  if (cvInput) {
    cvInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const stu = getStudent(AppState.currentStudentId);
      stu.cv = {
        fileName: file.name,
        fileSize: Math.max(1, Math.round(file.size / 1024)) + ' KB',
        uploadedAt: new Date().toISOString().slice(0, 10)
      };
      saveAppState();
      showToast(`Uploaded CV: ${file.name}`);
      renderApp();
    };
  }

  const previewMyCv = document.getElementById('preview-my-cv-btn');
  if (previewMyCv) {
    previewMyCv.onclick = () => {
      const stu = getStudent(AppState.currentStudentId);
      openModal({
        title: `Resume Preview — ${stu.cv.fileName}`,
        bodyHtml: `
          <div class="card card-compact" style="background:var(--color-bg);box-shadow:none;">
            <h3>${escapeHtml(stu.fullName)}</h3>
            <p class="text-xs text-muted">${escapeHtml(stu.university)} • ${escapeHtml(stu.major)}</p>
            <p class="text-sm mt-md">${escapeHtml(stu.bio)}</p>
            <div class="mt-md"><strong>Skills:</strong> ${stu.skills.map(escapeHtml).join(', ')}</div>
          </div>
        `,
        footerHtml: `<button type="button" class="btn btn-primary" onclick="closeModal()">Done</button>`
      });
    };
  }

  const removeMyCv = document.getElementById('remove-my-cv-btn');
  if (removeMyCv) {
    removeMyCv.onclick = () => {
      showConfirmDialog({
        title: 'Remove Uploaded CV',
        message: 'Are you sure you want to remove your current CV file? You can upload a replacement anytime.',
        confirmLabel: 'Remove CV',
        danger: true,
        onConfirm: () => {
          const stu = getStudent(AppState.currentStudentId);
          stu.cv = null;
          saveAppState();
          showToast('CV removed from profile.', 'info');
          renderApp();
        }
      });
    };
  }

  const editProfileBtn = document.getElementById('edit-student-profile-btn');
  if (editProfileBtn) {
    editProfileBtn.onclick = () => {
      const stu = getStudent(AppState.currentStudentId);
      openModal({
        title: 'Edit Student Profile',
        bodyHtml: `
          <form id="edit-profile-form">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-control" id="ep-name" value="${escapeHtml(stu.fullName)}" required />
            </div>
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">University</label>
                <input type="text" class="form-control" id="ep-uni" value="${escapeHtml(stu.university)}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Major</label>
                <input type="text" class="form-control" id="ep-major" value="${escapeHtml(stu.major)}" required />
              </div>
            </div>
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">Year / Class</label>
                <input type="text" class="form-control" id="ep-year" value="${escapeHtml(stu.year)}" />
              </div>
              <div class="form-group">
                <label class="form-label">GPA</label>
                <input type="text" class="form-control" id="ep-gpa" value="${escapeHtml(stu.gpa)}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Headline</label>
              <input type="text" class="form-control" id="ep-headline" value="${escapeHtml(stu.headline)}" />
            </div>
            <div class="form-group">
              <label class="form-label">About / Bio</label>
              <textarea class="form-control" id="ep-bio">${escapeHtml(stu.bio)}</textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Save Profile Changes</button>
          </form>
        `
      });
      document.getElementById('edit-profile-form').onsubmit = (e) => {
        e.preventDefault();
        stu.fullName = document.getElementById('ep-name').value.trim();
        stu.initials = stu.fullName.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();
        stu.university = document.getElementById('ep-uni').value.trim();
        stu.major = document.getElementById('ep-major').value.trim();
        stu.year = document.getElementById('ep-year').value.trim();
        stu.gpa = document.getElementById('ep-gpa').value.trim();
        stu.headline = document.getElementById('ep-headline').value.trim();
        stu.bio = document.getElementById('ep-bio').value.trim();
        saveAppState();
        closeModal();
        showToast('Student profile updated successfully!');
        renderApp();
      };
    };
  }

  const addExpBtn = document.getElementById('add-exp-btn');
  if (addExpBtn) {
    addExpBtn.onclick = () => {
      openModal({
        title: 'Add Work Experience',
        bodyHtml: `
          <form id="add-exp-form">
            <div class="form-group">
              <label class="form-label">Role / Title</label>
              <input type="text" class="form-control" id="ex-role" placeholder="e.g. Web Development Intern" required />
            </div>
            <div class="form-group">
              <label class="form-label">Organization / Company</label>
              <input type="text" class="form-control" id="ex-org" placeholder="e.g. CADT Innovation Center" required />
            </div>
            <div class="form-group">
              <label class="form-label">Period</label>
              <input type="text" class="form-control" id="ex-period" placeholder="e.g. Jun 2026 – Sep 2026" required />
            </div>
            <div class="form-group">
              <label class="form-label">Summary</label>
              <textarea class="form-control" id="ex-details" placeholder="What did you build or achieve?"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Add Experience</button>
          </form>
        `
      });
      document.getElementById('add-exp-form').onsubmit = (e) => {
        e.preventDefault();
        const stu = getStudent(AppState.currentStudentId);
        stu.experience.unshift({
          role: document.getElementById('ex-role').value.trim(),
          org: document.getElementById('ex-org').value.trim(),
          period: document.getElementById('ex-period').value.trim(),
          details: document.getElementById('ex-details').value.trim()
        });
        saveAppState();
        closeModal();
        showToast('Work experience added.');
        renderApp();
      };
    };
  }

  const addProjBtn = document.getElementById('add-project-btn');
  if (addProjBtn) {
    addProjBtn.onclick = () => {
      openModal({
        title: 'Add Portfolio Project',
        bodyHtml: `
          <form id="add-proj-form">
            <div class="form-group">
              <label class="form-label">Project Name</label>
              <input type="text" class="form-control" id="pr-name" placeholder="e.g. Smart Attendance System" required />
            </div>
            <div class="form-group">
              <label class="form-label">Tech Stack</label>
              <input type="text" class="form-control" id="pr-tech" placeholder="e.g. Node.js, MySQL, React" required />
            </div>
            <div class="form-group">
              <label class="form-label">Repository / Live URL</label>
              <input type="text" class="form-control" id="pr-link" placeholder="github.com/username/repo" />
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-control" id="pr-summary" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Add Project</button>
          </form>
        `
      });
      document.getElementById('add-proj-form').onsubmit = (e) => {
        e.preventDefault();
        const stu = getStudent(AppState.currentStudentId);
        stu.projects.unshift({
          name: document.getElementById('pr-name').value.trim(),
          tech: document.getElementById('pr-tech').value.trim(),
          link: document.getElementById('pr-link').value.trim() || 'github.com/cadt-student',
          summary: document.getElementById('pr-summary').value.trim()
        });
        saveAppState();
        closeModal();
        showToast('Project added to your portfolio!');
        renderApp();
      };
    };
  }

  // Company: Post a Job Form
  const postJobForm = document.getElementById('post-job-form');
  if (postJobForm) {
    postJobForm.onsubmit = (e) => {
      e.preventDefault();
      const newJob = {
        id: 'job-' + Date.now(),
        companyId: AppState.currentCompanyId,
        title: document.getElementById('pj-title').value.trim(),
        category: document.getElementById('pj-category').value,
        location: document.getElementById('pj-location').value.trim(),
        jobType: document.getElementById('pj-type').value,
        experienceLevel: document.getElementById('pj-exp').value,
        salary: document.getElementById('pj-salary').value.trim(),
        postedDate: new Date().toISOString().slice(0, 10),
        deadline: document.getElementById('pj-deadline').value,
        featured: true,
        status: 'Active',
        skills: document.getElementById('pj-skills').value.split(',').map(s => s.trim()).filter(Boolean),
        description: document.getElementById('pj-description').value.trim(),
        responsibilities: ['Collaborate with cross-functional engineering and product teams.', 'Deliver clean, well-documented code and weekly progress demos.'],
        qualifications: document.getElementById('pj-qualifications').value.split('\n').map(s => s.trim()).filter(Boolean)
      };
      AppState.jobs.unshift(newJob);
      saveAppState();
      showToast(`Job "${newJob.title}" published live!`);
      AppState.currentRoute = 'company-dashboard';
      renderApp();
    };
  }

  // Company: Edit Company Modal
  const editCompBtn = document.getElementById('edit-company-profile-btn');
  if (editCompBtn) {
    editCompBtn.onclick = () => {
      const comp = getCompany(AppState.currentCompanyId);
      openModal({
        title: 'Edit Company Profile',
        bodyHtml: `
          <form id="edit-company-form">
            <div class="form-group">
              <label class="form-label">Company Name</label>
              <input type="text" class="form-control" id="ec-name" value="${escapeHtml(comp.name)}" required />
            </div>
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">Industry</label>
                <input type="text" class="form-control" id="ec-ind" value="${escapeHtml(comp.industry)}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Location</label>
                <input type="text" class="form-control" id="ec-loc" value="${escapeHtml(comp.location)}" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-control" id="ec-desc">${escapeHtml(comp.description)}</textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Save Company Info</button>
          </form>
        `
      });
      document.getElementById('edit-company-form').onsubmit = (e) => {
        e.preventDefault();
        comp.name = document.getElementById('ec-name').value.trim();
        comp.industry = document.getElementById('ec-ind').value.trim();
        comp.location = document.getElementById('ec-loc').value.trim();
        comp.description = document.getElementById('ec-desc').value.trim();
        saveAppState();
        closeModal();
        showToast('Company profile updated.');
        renderApp();
      };
    };
  }

  // Company: Applicant Filters
  const appJobFilter = document.getElementById('applicant-job-filter');
  if (appJobFilter) {
    appJobFilter.onchange = (e) => {
      UIState.applicantJobFilter = e.target.value;
      renderApp();
    };
  }
  const appStatusFilter = document.getElementById('applicant-status-filter');
  if (appStatusFilter) {
    appStatusFilter.onchange = (e) => {
      UIState.applicantStatusFilter = e.target.value;
      renderApp();
    };
  }
  const resetAppFiltersBtn = document.getElementById('reset-applicant-filters-btn');
  if (resetAppFiltersBtn) {
    resetAppFiltersBtn.onclick = () => {
      UIState.applicantJobFilter = 'All';
      UIState.applicantStatusFilter = 'All';
      renderApp();
    };
  }

  // Admin: Search & Add Category
  const adminSearch = document.getElementById('admin-search-input');
  if (adminSearch) {
    adminSearch.oninput = (e) => {
      UIState.adminSearch = e.target.value;
      const pos = e.target.selectionStart;
      renderApp();
      const refreshed = document.getElementById('admin-search-input');
      if (refreshed) {
        refreshed.focus();
        refreshed.setSelectionRange(pos, pos);
      }
    };
  }
  const addCatForm = document.getElementById('add-category-form');
  if (addCatForm) {
    addCatForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('new-cat-name').value.trim();
      const desc = document.getElementById('new-cat-desc').value.trim();
      const iconName = document.getElementById('new-cat-icon').value;
      AppState.categories.push({
        id: 'cat-' + Date.now(),
        name,
        description: desc,
        icon: iconName,
        active: true
      });
      saveAppState();
      showToast(`Category "${name}" created.`);
      renderApp();
    };
  }
}

/* Global Delegated Click Listener */
document.addEventListener('click', (e) => {
  const roleSwitch = e.target.closest('[data-switch-role]');
  const navBtn = e.target.closest('[data-nav]');
  if (roleSwitch) {
    switchRole(roleSwitch.dataset.switchRole, roleSwitch.dataset.nav || null);
    return;
  }
  if (navBtn) {
    AppState.currentRoute = navBtn.dataset.nav;
    UIState.sidebarOpen = false;
    saveAppState();
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const openJobBtn = e.target.closest('[data-open-job]');
  if (openJobBtn) {
    AppState.selectedJobId = openJobBtn.dataset.openJob;
    AppState.currentRoute = AppState.role === 'guest' ? 'public-job-details' : 'student-job-details';
    saveAppState();
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const quickSearch = e.target.closest('[data-quick-search]');
  if (quickSearch) {
    AppState.jobFilters.search = quickSearch.dataset.quickSearch;
    AppState.currentRoute = AppState.role === 'guest' ? 'public-jobs' : 'student-jobs';
    saveAppState();
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const filterCat = e.target.closest('[data-filter-cat]');
  if (filterCat) {
    AppState.jobFilters.category = filterCat.dataset.filterCat;
    AppState.currentRoute = AppState.role === 'guest' ? 'public-jobs' : 'student-jobs';
    saveAppState();
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const toggleSave = e.target.closest('[data-toggle-save]');
  if (toggleSave) {
    const jobId = toggleSave.dataset.toggleSave;
    const idx = AppState.savedJobIds.indexOf(jobId);
    if (idx >= 0) {
      AppState.savedJobIds.splice(idx, 1);
      showToast('Removed from Saved Jobs.', 'info');
    } else {
      AppState.savedJobIds.push(jobId);
      showToast('Job saved to your bookmarks!');
    }
    saveAppState();
    renderApp();
    return;
  }

  const applyBtn = e.target.closest('[data-apply-job]');
  if (applyBtn) {
    openApplyModal(applyBtn.dataset.applyJob);
    return;
  }

  const removeSkill = e.target.closest('[data-remove-skill]');
  if (removeSkill) {
    const sk = removeSkill.dataset.removeSkill;
    const stu = getStudent(AppState.currentStudentId);
    stu.skills = stu.skills.filter(s => s !== sk);
    saveAppState();
    showToast(`Removed skill "${sk}".`, 'info');
    renderApp();
    return;
  }

  const appTab = e.target.closest('[data-app-tab]');
  if (appTab) {
    UIState.appStatusTab = appTab.dataset.appTab;
    renderApp();
    return;
  }

  const viewAppDetail = e.target.closest('[data-view-app-detail]');
  if (viewAppDetail) {
    const app = AppState.applications.find(a => a.id === viewAppDetail.dataset.viewAppDetail);
    if (!app) return;
    const job = getJob(app.jobId);
    const company = job ? getCompany(job.companyId) : { name: 'Company' };
    openModal({
      title: 'Application Details',
      bodyHtml: `
        <div class="flex-between mb-md">
          <div>
            <h3 style="font-size:1.1rem;">${escapeHtml(job ? job.title : 'Position')}</h3>
            <div class="text-xs text-muted">${escapeHtml(company.name)} • Applied ${formatDate(app.appliedDate)}</div>
          </div>
          ${statusBadge(app.status)}
        </div>
        <div class="mb-md">
          <div class="text-xs font-semibold text-muted">Submitted CV</div>
          <div class="text-sm font-medium mt-sm">${escapeHtml(app.cvUsed)}</div>
        </div>
        <div class="mb-md">
          <div class="text-xs font-semibold text-muted">Cover Note</div>
          <p class="text-sm mt-sm" style="background:var(--color-bg);padding:12px;border-radius:var(--radius-sm);">${escapeHtml(app.coverNote)}</p>
        </div>
        <div>
          <div class="text-xs font-semibold text-muted mb-sm" style="margin-bottom:8px;">Status Timeline</div>
          <div class="flex" style="flex-direction:column;gap:8px;">
            ${app.timeline.map(t => `
              <div class="items-center text-sm" style="gap:8px;">
                <span style="color:var(--color-primary);">${icon('checkCircle')}</span>
                <span><strong>${formatDate(t.date)}:</strong> ${escapeHtml(t.label)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `,
      footerHtml: `
        <button type="button" class="btn btn-danger-outline" id="withdraw-app-btn">Withdraw Application</button>
        <button type="button" class="btn btn-primary" onclick="closeModal()">Close</button>
      `
    });
    document.getElementById('withdraw-app-btn').onclick = () => {
      closeModal();
      showConfirmDialog({
        title: 'Withdraw Application',
        message: 'Are you sure you want to withdraw this application? This action cannot be undone.',
        confirmLabel: 'Withdraw',
        danger: true,
        onConfirm: () => {
          AppState.applications = AppState.applications.filter(a => a.id !== app.id);
          saveAppState();
          showToast('Application withdrawn.', 'info');
          renderApp();
        }
      });
    };
    return;
  }

  const previewCv = e.target.closest('[data-preview-cv]');
  if (previewCv) {
    openApplicantCvPreviewModal(previewCv.dataset.previewCv);
    return;
  }

  const decideApp = e.target.closest('[data-decide-app]');
  if (decideApp) {
    handleApplicantDecision(decideApp.dataset.decideApp, decideApp.dataset.decision);
    return;
  }

  const toggleJobStatus = e.target.closest('[data-toggle-job-status]');
  if (toggleJobStatus) {
    const job = getJob(toggleJobStatus.dataset.toggleJobStatus);
    if (job) {
      job.status = job.status === 'Active' ? 'Paused' : 'Active';
      saveAppState();
      showToast(`Job "${job.title}" is now ${job.status}.`, 'info');
      renderApp();
    }
    return;
  }

  const delCompanyJob = e.target.closest('[data-delete-company-job], [data-delete-admin-job]');
  if (delCompanyJob) {
    const id = delCompanyJob.dataset.deleteCompanyJob || delCompanyJob.dataset.deleteAdminJob;
    const job = getJob(id);
    showConfirmDialog({
      title: 'Delete Job Posting',
      message: `Are you sure you want to permanently delete "${job ? job.title : 'this job'}"?`,
      confirmLabel: 'Delete Job',
      danger: true,
      onConfirm: () => {
        AppState.jobs = AppState.jobs.filter(j => j.id !== id);
        saveAppState();
        showToast('Job posting deleted.', 'info');
        renderApp();
      }
    });
    return;
  }

  // Admin handlers
  const adminTabBtn = e.target.closest('[data-admin-tab]');
  if (adminTabBtn) {
    UIState.adminTab = adminTabBtn.dataset.adminTab;
    UIState.sidebarOpen = false;
    renderApp();
    return;
  }

  const toggleStu = e.target.closest('[data-toggle-student-status]');
  if (toggleStu) {
    const stu = getStudent(toggleStu.dataset.toggleStudentStatus);
    stu.status = stu.status === 'Active' ? 'Suspended' : 'Active';
    saveAppState();
    showToast(`${stu.fullName} is now ${stu.status}.`, 'info');
    renderApp();
    return;
  }

  const delStu = e.target.closest('[data-delete-student]');
  if (delStu) {
    const id = delStu.dataset.deleteStudent;
    const stu = getStudent(id);
    showConfirmDialog({
      title: 'Remove Student Account',
      message: `Remove ${stu.fullName} from CareerConnect?`,
      confirmLabel: 'Remove',
      danger: true,
      onConfirm: () => {
        AppState.students = AppState.students.filter(s => s.id !== id);
        saveAppState();
        showToast('Student account removed.', 'info');
        renderApp();
      }
    });
    return;
  }

  const verifyComp = e.target.closest('[data-verify-company]');
  if (verifyComp) {
    const comp = getCompany(verifyComp.dataset.verifyCompany);
    comp.verified = true;
    comp.status = 'Active';
    saveAppState();
    showToast(`${comp.name} is now verified!`);
    renderApp();
    return;
  }

  const toggleComp = e.target.closest('[data-toggle-company-status]');
  if (toggleComp) {
    const comp = getCompany(toggleComp.dataset.toggleCompanyStatus);
    comp.status = comp.status === 'Active' ? 'Suspended' : 'Active';
    saveAppState();
    showToast(`${comp.name} status set to ${comp.status}.`, 'info');
    renderApp();
    return;
  }

  const toggleCat = e.target.closest('[data-toggle-cat]');
  if (toggleCat) {
    const cat = AppState.categories.find(c => c.id === toggleCat.dataset.toggleCat);
    if (cat) {
      cat.active = !cat.active;
      saveAppState();
      showToast(`Category "${cat.name}" ${cat.active ? 'enabled' : 'disabled'}.`, 'info');
      renderApp();
    }
    return;
  }

  const delCat = e.target.closest('[data-delete-cat]');
  if (delCat) {
    const id = delCat.dataset.deleteCat;
    showConfirmDialog({
      title: 'Delete Category',
      message: 'Remove this job category from the platform?',
      confirmLabel: 'Delete',
      danger: true,
      onConfirm: () => {
        AppState.categories = AppState.categories.filter(c => c.id !== id);
        saveAppState();
        showToast('Category deleted.', 'info');
        renderApp();
      }
    });
    return;
  }

  const mobileTab = e.target.closest('[data-mobile-tab]');
  if (mobileTab) {
    UIState.mobilePreviewTab = mobileTab.dataset.mobileTab;
    renderApp();
    return;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn) modalCloseBtn.onclick = closeModal;
  const backdrop = document.getElementById('app-modal');
  if (backdrop) {
    backdrop.onclick = (e) => {
      if (e.target === backdrop) closeModal();
    };
  }
  renderApp();
});
