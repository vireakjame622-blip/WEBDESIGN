/* ==========================================================================
   CareerConnect – Admin Dashboard & Platform Management Pages
   ========================================================================== */

function renderAdminDashboard(activeSection = 'overview', searchQuery = '') {
  const totalStudents = AppState.students.length;
  const totalCompanies = AppState.companies.length;
  const totalJobs = AppState.jobs.length;
  const totalApplications = AppState.applications.length;

  const sections = [
    { id: 'overview', label: 'Overview & Reports' },
    { id: 'students', label: `Manage Students (${totalStudents})` },
    { id: 'companies', label: `Manage Companies (${totalCompanies})` },
    { id: 'jobs', label: `Manage Job Postings (${totalJobs})` },
    { id: 'categories', label: `Manage Categories (${AppState.categories.length})` }
  ];

  const q = searchQuery.trim().toLowerCase();

  return `
    <div class="flex-between mb-lg" style="flex-wrap:wrap;">
      <div>
        <h1 style="font-size:1.65rem;">Admin Dashboard</h1>
        <p class="text-muted text-sm">Monitor platform activity, verify employers, and manage CADT & university users.</p>
      </div>
      <div class="items-center" style="gap:8px;">
        <span class="badge badge-blue">${icon('shield')} System Administrator</span>
      </div>
    </div>

    <!-- Top KPI Metrics -->
    <div class="grid grid-4 mb-lg">
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Total Students</span>
          <div class="stat-value">${totalStudents}</div>
          <span class="text-xs" style="color:var(--color-success);">${AppState.students.filter(s => s.status === 'Active').length} active accounts</span>
        </div>
        <div class="stat-icon" style="background:var(--color-primary-light);color:var(--color-primary);">${icon('graduation')}</div>
      </div>
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Total Companies</span>
          <div class="stat-value">${totalCompanies}</div>
          <span class="text-xs text-muted">${AppState.companies.filter(c => !c.verified).length} pending approval</span>
        </div>
        <div class="stat-icon" style="background:var(--color-info-bg);color:var(--color-info);">${icon('building')}</div>
      </div>
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Total Job Postings</span>
          <div class="stat-value">${totalJobs}</div>
          <span class="text-xs" style="color:var(--color-success);">${AppState.jobs.filter(j => j.status === 'Active').length} active listings</span>
        </div>
        <div class="stat-icon" style="background:var(--color-purple-bg);color:var(--color-purple);">${icon('briefcase')}</div>
      </div>
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Total Applications</span>
          <div class="stat-value">${totalApplications}</div>
          <span class="text-xs text-muted">${AppState.applications.filter(a => a.status === 'Accepted').length} accepted hires</span>
        </div>
        <div class="stat-icon" style="background:var(--color-success-bg);color:var(--color-success);">${icon('fileText')}</div>
      </div>
    </div>

    <!-- Admin Sub-navigation Tabs -->
    <div class="tabs">
      ${sections.map(s => `
        <button type="button" class="tab-btn ${activeSection === s.id ? 'active' : ''}" data-admin-tab="${s.id}">
          ${escapeHtml(s.label)}
        </button>
      `).join('')}
    </div>

    ${activeSection === 'overview' ? renderAdminOverviewSection() : ''}
    ${activeSection === 'students' ? renderAdminStudentsSection(q) : ''}
    ${activeSection === 'companies' ? renderAdminCompaniesSection(q) : ''}
    ${activeSection === 'jobs' ? renderAdminJobsSection(q) : ''}
    ${activeSection === 'categories' ? renderAdminCategoriesSection() : ''}
  `;
}

function renderAdminOverviewSection() {
  const maxApps = Math.max(1, ...AppState.categories.map(c =>
    AppState.jobs.filter(j => j.category === c.name).length
  ));

  const monthlyData = [
    { month: 'Jun', jobs: 48, apps: 92 },
    { month: 'Jul', jobs: 56, apps: 118 },
    { month: 'Aug', jobs: 64, apps: 135 },
    { month: 'Sep', jobs: 82, apps: 168 },
    { month: 'Oct', jobs: 95, apps: 190 },
    { month: 'Nov', jobs: 112, apps: 224 }
  ];

  return `
    <div class="grid grid-2 mb-lg">
      <!-- Report & Statistics: Monthly Growth -->
      <div class="card">
        <div class="flex-between mb-md">
          <div>
            <h3 style="font-size:1.08rem;">Reports & Statistics: Monthly Activity</h3>
            <p class="text-xs text-muted">Job postings vs. student applications (Jun – Nov 2026)</p>
          </div>
          <div class="items-center text-xs" style="gap:10px;">
            <span><span style="display:inline-block;width:10px;height:10px;background:var(--color-primary);border-radius:2px;"></span> Apps</span>
            <span><span style="display:inline-block;width:10px;height:10px;background:var(--color-secondary);border-radius:2px;"></span> Jobs</span>
          </div>
        </div>
        <div class="column-chart">
          ${monthlyData.map(m => {
            const appH = Math.round((m.apps / 240) * 125);
            const jobH = Math.round((m.jobs / 240) * 125);
            return `
              <div class="column-group">
                <div class="column-bars">
                  <div class="col-bar col-bar-navy" style="height:${jobH}px;" title="Jobs: ${m.jobs}"></div>
                  <div class="col-bar col-bar-primary" style="height:${appH}px;" title="Applications: ${m.apps}"></div>
                </div>
                <span class="text-xs text-muted">${m.month}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Job Postings by Category -->
      <div class="card">
        <div class="flex-between mb-md">
          <div>
            <h3 style="font-size:1.08rem;">Job Distribution by Category</h3>
            <p class="text-xs text-muted">Active demand across CADT tech tracks</p>
          </div>
          <button type="button" class="btn btn-outline btn-sm" data-admin-tab="categories">Manage Categories</button>
        </div>
        <div class="bar-chart">
          ${AppState.categories.map(cat => {
            const count = AppState.jobs.filter(j => j.category === cat.name).length;
            const pct = Math.round((count / maxApps) * 100);
            return `
              <div class="bar-row">
                <div class="bar-row-head">
                  <span class="font-medium">${escapeHtml(cat.name)}</span>
                  <span class="text-muted">${count} posting${count === 1 ? '' : 's'}</span>
                </div>
                <div class="progress-track"><div class="progress-fill" style="width:${pct}%;"></div></div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- Pending Approvals & Quick Actions -->
    <div class="card">
      <div class="flex-between mb-md">
        <h3 style="font-size:1.08rem;">Platform Moderation Queue</h3>
        <span class="text-xs text-muted">Quick actions for admin review</span>
      </div>
      <div class="grid grid-2">
        ${AppState.companies.filter(c => !c.verified).length === 0 ? `
          <div class="card card-compact" style="background:var(--color-bg);box-shadow:none;">
            <div class="font-semibold text-sm">${icon('checkCircle')} All companies verified</div>
            <p class="text-xs text-muted mt-sm">No pending employer verification requests right now.</p>
          </div>
        ` : AppState.companies.filter(c => !c.verified).map(c => `
          <div class="card card-compact" style="background:var(--color-warning-bg);border-color:#FCD34D;box-shadow:none;">
            <div class="flex-between">
              <div>
                <div class="font-semibold text-sm">${escapeHtml(c.name)}</div>
                <div class="text-xs text-muted">Awaiting employer verification • ${escapeHtml(c.location)}</div>
              </div>
              <button type="button" class="btn btn-primary btn-sm" data-verify-company="${c.id}">Verify Now</button>
            </div>
          </div>
        `).join('')}

        <div class="card card-compact" style="background:var(--color-bg);box-shadow:none;">
          <div class="flex-between">
            <div>
              <div class="font-semibold text-sm">Application Conversion Rate</div>
              <div class="text-xs text-muted">
                ${Math.round((AppState.applications.filter(a => a.status === 'Accepted').length / Math.max(1, AppState.applications.length)) * 100)}% accepted across ${AppState.applications.length} total submissions
              </div>
            </div>
            <button type="button" class="btn btn-outline btn-sm" data-admin-tab="jobs">Review Jobs</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAdminStudentsSection(q) {
  const list = AppState.students.filter(s =>
    !q || [s.fullName, s.email, s.university, s.major].join(' ').toLowerCase().includes(q)
  );

  return `
    <div class="flex-between mb-md" style="flex-wrap:wrap;gap:12px;">
      <div class="input-icon-wrap" style="max-width:340px;">
        <span class="input-icon">${icon('search')}</span>
        <input type="text" class="form-control" id="admin-search-input" value="${escapeHtml(q)}" placeholder="Search students by name, major, university..." />
      </div>
    </div>

    ${list.length === 0 ? renderEmptyState({
      iconName: 'users',
      title: 'No matching students',
      description: 'Adjust your search query to view registered student accounts.'
    }) : `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>University & Major</th>
              <th>Skills</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(s => `
              <tr>
                <td>
                  <div class="items-center" style="gap:10px;">
                    <div class="user-avatar" style="width:34px;height:34px;font-size:0.75rem;">${escapeHtml(s.initials)}</div>
                    <div>
                      <div class="font-semibold">${escapeHtml(s.fullName)}</div>
                      <div class="text-xs text-muted">${escapeHtml(s.email)}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="text-sm font-medium">${escapeHtml(s.major)}</div>
                  <div class="text-xs text-muted">${escapeHtml(s.university)}</div>
                </td>
                <td>
                  <div class="flex" style="flex-wrap:wrap;gap:4px;">
                    ${s.skills.slice(0, 3).map(sk => `<span class="skill-tag">${escapeHtml(sk)}</span>`).join('')}
                  </div>
                </td>
                <td>${statusBadge(s.status)}</td>
                <td>
                  <div class="items-center">
                    <button type="button" class="btn btn-outline btn-sm" data-toggle-student-status="${s.id}">
                      ${s.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                    <button type="button" class="btn btn-danger-outline btn-sm" data-delete-student="${s.id}">
                      ${icon('trash')}
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `}
  `;
}

function renderAdminCompaniesSection(q) {
  const list = AppState.companies.filter(c =>
    !q || [c.name, c.industry, c.location].join(' ').toLowerCase().includes(q)
  );

  return `
    <div class="flex-between mb-md" style="flex-wrap:wrap;gap:12px;">
      <div class="input-icon-wrap" style="max-width:340px;">
        <span class="input-icon">${icon('search')}</span>
        <input type="text" class="form-control" id="admin-search-input" value="${escapeHtml(q)}" placeholder="Search companies by name or industry..." />
      </div>
    </div>

    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Industry & Location</th>
            <th>Open Jobs</th>
            <th>Verification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${list.map(c => {
            const jobCount = AppState.jobs.filter(j => j.companyId === c.id).length;
            return `
              <tr>
                <td>
                  <div class="items-center" style="gap:10px;">
                    <div class="company-logo" style="width:36px;height:36px;font-size:0.8rem;background:${c.color}">${escapeHtml(c.initials)}</div>
                    <div>
                      <div class="font-semibold">${escapeHtml(c.name)}</div>
                      <div class="text-xs text-muted">${escapeHtml(c.size)}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="text-sm">${escapeHtml(c.industry)}</div>
                  <div class="text-xs text-muted">${escapeHtml(c.location)}</div>
                </td>
                <td class="font-semibold">${jobCount}</td>
                <td>${c.verified ? `<span class="badge badge-green">Verified</span>` : `<span class="badge badge-amber">Pending</span>`}</td>
                <td>
                  <div class="items-center">
                    ${!c.verified ? `<button type="button" class="btn btn-primary btn-sm" data-verify-company="${c.id}">Verify</button>` : ''}
                    <button type="button" class="btn btn-outline btn-sm" data-toggle-company-status="${c.id}">
                      ${c.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminJobsSection(q) {
  const list = AppState.jobs.filter(j => {
    const c = getCompany(j.companyId);
    return !q || [j.title, c.name, j.category, j.location].join(' ').toLowerCase().includes(q);
  });

  return `
    <div class="flex-between mb-md" style="flex-wrap:wrap;gap:12px;">
      <div class="input-icon-wrap" style="max-width:340px;">
        <span class="input-icon">${icon('search')}</span>
        <input type="text" class="form-control" id="admin-search-input" value="${escapeHtml(q)}" placeholder="Search job postings..." />
      </div>
    </div>

    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Category</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${list.map(j => {
            const c = getCompany(j.companyId);
            return `
              <tr>
                <td>
                  <button type="button" class="font-semibold" style="color:var(--color-secondary);text-align:left;" data-open-job="${j.id}">${escapeHtml(j.title)}</button>
                  <div class="text-xs text-muted">Posted ${formatDate(j.postedDate)}</div>
                </td>
                <td>${escapeHtml(c.name)}</td>
                <td class="text-sm">${escapeHtml(j.category)}</td>
                <td>${jobTypeBadge(j.jobType)}</td>
                <td>${statusBadge(j.status)}</td>
                <td>
                  <div class="items-center">
                    <button type="button" class="btn btn-outline btn-sm" data-toggle-job-status="${j.id}">
                      ${j.status === 'Active' ? 'Pause' : 'Approve'}
                    </button>
                    <button type="button" class="btn btn-danger-outline btn-sm" data-delete-admin-job="${j.id}">
                      ${icon('trash')}
                    </button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminCategoriesSection() {
  return `
    <div class="grid grid-2" style="align-items:start;">
      <div class="card">
        <h3 style="font-size:1.08rem;margin-bottom:14px;">Platform Job Categories</h3>
        <div class="flex" style="flex-direction:column;gap:10px;">
          ${AppState.categories.map(cat => {
            const count = AppState.jobs.filter(j => j.category === cat.name).length;
            return `
              <div class="flex-between" style="padding:12px;border:1px solid var(--color-border);border-radius:var(--radius-sm);">
                <div class="items-center" style="gap:10px;">
                  <div class="category-icon" style="width:36px;height:36px;">${icon(cat.icon)}</div>
                  <div>
                    <div class="font-semibold text-sm">${escapeHtml(cat.name)}</div>
                    <div class="text-xs text-muted">${count} job${count === 1 ? '' : 's'} • ${cat.active ? 'Visible' : 'Hidden'}</div>
                  </div>
                </div>
                <div class="items-center">
                  <button type="button" class="btn btn-outline btn-sm" data-toggle-cat="${cat.id}">
                    ${cat.active ? 'Disable' : 'Enable'}
                  </button>
                  <button type="button" class="btn btn-danger-outline btn-sm" data-delete-cat="${cat.id}">
                    ${icon('trash')}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <h3 style="font-size:1.08rem;margin-bottom:14px;">Add New Job Category</h3>
        <form id="add-category-form">
          <div class="form-group">
            <label class="form-label">Category Name <span class="req">*</span></label>
            <input type="text" class="form-control" id="new-cat-name" placeholder="e.g. Cloud & DevOps" required />
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <input type="text" class="form-control" id="new-cat-desc" placeholder="Short summary of roles in this track..." />
          </div>
          <div class="form-group">
            <label class="form-label">Icon Style</label>
            <select class="form-control" id="new-cat-icon">
              <option value="code">Code / Engineering</option>
              <option value="cpu">AI / Data</option>
              <option value="layout">UI/UX Design</option>
              <option value="shield">Security</option>
              <option value="wifi">Networking</option>
              <option value="briefcase">Business</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-block">${icon('plus')} Create Category</button>
        </form>
      </div>
    </div>
  `;
}
