/* ==========================================================================
   CareerConnect – Company Portal Pages (Pages A, B, C)
   ========================================================================== */

/* A. Company Dashboard */
function renderCompanyDashboard() {
  const company = getCompany(AppState.currentCompanyId);
  const myJobs = AppState.jobs.filter(j => j.companyId === company.id);
  const activeJobs = myJobs.filter(j => j.status === 'Active');
  const myJobIds = new Set(myJobs.map(j => j.id));
  const myApplicants = AppState.applications.filter(a => myJobIds.has(a.jobId));
  const acceptedCount = myApplicants.filter(a => a.status === 'Accepted').length;

  return `
    <div class="flex-between mb-lg" style="flex-wrap:wrap;">
      <div>
        <h1 style="font-size:1.65rem;">Company Dashboard</h1>
        <p class="text-muted text-sm">Manage your open positions and review CADT & university applicants.</p>
      </div>
      <div class="items-center" style="gap:10px;">
        <button type="button" class="btn btn-outline btn-sm" data-nav="company-applicants">${icon('users')} Manage Applicants</button>
        <button type="button" class="btn btn-primary btn-sm" data-nav="company-post-job">${icon('plus')} Post a Job</button>
      </div>
    </div>

    <!-- Company Profile Summary -->
    <div class="card mb-lg">
      <div class="flex-between" style="flex-wrap:wrap;gap:16px;">
        <div class="items-center" style="gap:16px;">
          <div class="company-logo company-logo-lg" style="background:${company.color}">${escapeHtml(company.initials)}</div>
          <div>
            <div class="items-center" style="gap:8px;flex-wrap:wrap;">
              <h2 style="font-size:1.25rem;">${escapeHtml(company.name)}</h2>
              ${company.verified ? `<span class="badge badge-green">${icon('check')} Verified Employer</span>` : `<span class="badge badge-amber">Pending Verification</span>`}
            </div>
            <p class="text-xs text-muted" style="margin-top:4px;">${escapeHtml(company.industry)} • ${escapeHtml(company.location)} • ${escapeHtml(company.size)}</p>
            <p class="text-sm text-muted mt-sm" style="max-width:680px;">${escapeHtml(company.description)}</p>
          </div>
        </div>
        <button type="button" class="btn btn-outline btn-sm" id="edit-company-profile-btn">${icon('edit')} Edit Company</button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-4 mb-lg">
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Total Job Postings</span>
          <div class="stat-value">${myJobs.length}</div>
          <span class="text-xs text-muted">All-time published</span>
        </div>
        <div class="stat-icon" style="background:var(--color-primary-light);color:var(--color-primary);">${icon('briefcase')}</div>
      </div>
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Active Job Postings</span>
          <div class="stat-value">${activeJobs.length}</div>
          <span class="text-xs" style="color:var(--color-success);">Visible to students</span>
        </div>
        <div class="stat-icon" style="background:var(--color-success-bg);color:var(--color-success);">${icon('checkCircle')}</div>
      </div>
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Total Applicants</span>
          <div class="stat-value">${myApplicants.length}</div>
          <span class="text-xs text-muted">Across open roles</span>
        </div>
        <div class="stat-icon" style="background:var(--color-info-bg);color:var(--color-info);">${icon('users')}</div>
      </div>
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Accepted Candidates</span>
          <div class="stat-value">${acceptedCount}</div>
          <span class="text-xs" style="color:var(--color-purple);">Ready for onboarding</span>
        </div>
        <div class="stat-icon" style="background:var(--color-purple-bg);color:var(--color-purple);">${icon('graduation')}</div>
      </div>
    </div>

    <!-- Recent Applications + Job Postings -->
    <div class="grid grid-2">
      <div class="card">
        <div class="flex-between mb-md">
          <h3 style="font-size:1.08rem;">Recent Applications</h3>
          <button type="button" class="btn btn-ghost btn-sm" data-nav="company-applicants">View All ${icon('arrowRight')}</button>
        </div>
        ${myApplicants.length === 0 ? `
          <p class="text-sm text-muted">No applications received yet. Publish an internship or junior job to start receiving student CVs.</p>
        ` : `
          <div class="flex" style="flex-direction:column;gap:10px;">
            ${myApplicants.slice(0, 4).map(app => {
              const stu = getStudent(app.studentId);
              const job = getJob(app.jobId);
              return `
                <div class="flex-between" style="padding:10px 12px;border:1px solid var(--color-border);border-radius:var(--radius-sm);">
                  <div class="items-center" style="gap:10px;">
                    <div class="user-avatar" style="width:36px;height:36px;font-size:0.78rem;">${escapeHtml(stu.initials)}</div>
                    <div>
                      <div class="font-semibold text-sm">${escapeHtml(stu.fullName)}</div>
                      <div class="text-xs text-muted">${escapeHtml(stu.major)} • ${escapeHtml(job ? job.title : '')}</div>
                    </div>
                  </div>
                  ${statusBadge(app.status)}
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <div class="card">
        <div class="flex-between mb-md">
          <h3 style="font-size:1.08rem;">Your Job Postings</h3>
          <button type="button" class="btn btn-outline btn-sm" data-nav="company-post-job">${icon('plus')} New Job</button>
        </div>
        ${myJobs.length === 0 ? renderEmptyState({
          iconName: 'briefcase',
          title: 'No jobs posted yet',
          description: 'Create your first internship or graduate role to reach CADT students.',
          actionLabel: 'Post a Job',
          actionAttrs: 'data-nav="company-post-job"'
        }) : `
          <div class="flex" style="flex-direction:column;gap:10px;">
            ${myJobs.map(j => {
              const count = AppState.applications.filter(a => a.jobId === j.id).length;
              return `
                <div class="flex-between" style="padding:10px 12px;border:1px solid var(--color-border);border-radius:var(--radius-sm);gap:10px;flex-wrap:wrap;">
                  <div>
                    <div class="font-semibold text-sm">${escapeHtml(j.title)}</div>
                    <div class="text-xs text-muted">${escapeHtml(j.jobType)} • ${count} applicant${count === 1 ? '' : 's'} • Deadline ${formatDate(j.deadline)}</div>
                  </div>
                  <div class="items-center">
                    ${statusBadge(j.status)}
                    <button type="button" class="btn btn-ghost btn-sm" data-toggle-job-status="${j.id}" title="Toggle Active/Paused">
                      ${j.status === 'Active' ? 'Pause' : 'Activate'}
                    </button>
                    <button type="button" class="btn btn-ghost btn-sm" style="color:var(--color-danger);" data-delete-company-job="${j.id}" title="Delete Job">
                      ${icon('trash')}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

/* B. Post a Job Page */
function renderPostJobPage() {
  const categories = AppState.categories.filter(c => c.active);
  return `
    <div class="flex-between mb-lg" style="flex-wrap:wrap;">
      <div>
        <h1 style="font-size:1.65rem;">Post a New Job or Internship</h1>
        <p class="text-muted text-sm">Publish clear requirements so qualified CADT & university students can apply.</p>
      </div>
      <button type="button" class="btn btn-outline btn-sm" data-nav="company-dashboard">${icon('arrowLeft')} Back to Dashboard</button>
    </div>

    <form id="post-job-form" class="card" style="max-width:860px;">
      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">Job Title <span class="req">*</span></label>
          <input type="text" class="form-control" id="pj-title" placeholder="e.g. Junior Full-Stack Developer Intern" required />
        </div>
        <div class="form-group">
          <label class="form-label">Job Category <span class="req">*</span></label>
          <select class="form-control" id="pj-category" required>
            ${categories.map(c => `<option value="${escapeHtml(c.name)}">${escapeHtml(c.name)}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="grid grid-3">
        <div class="form-group">
          <label class="form-label">Location <span class="req">*</span></label>
          <input type="text" class="form-control" id="pj-location" value="Phnom Penh" placeholder="Phnom Penh, Hybrid, or Remote" required />
        </div>
        <div class="form-group">
          <label class="form-label">Job Type <span class="req">*</span></label>
          <select class="form-control" id="pj-type" required>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Experience Level</label>
          <select class="form-control" id="pj-exp">
            <option value="Student / No Experience">Student / No Experience</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Junior">Junior (1+ yr)</option>
          </select>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label">Salary Range (Optional)</label>
          <input type="text" class="form-control" id="pj-salary" placeholder="e.g. $350 – $500 / month" />
        </div>
        <div class="form-group">
          <label class="form-label">Application Deadline <span class="req">*</span></label>
          <input type="date" class="form-control" id="pj-deadline" value="2026-12-20" required />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Job Description <span class="req">*</span></label>
        <textarea class="form-control" id="pj-description" placeholder="Describe the team, project scope, and what the student will learn or build..." required></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Required Skills (comma-separated) <span class="req">*</span></label>
        <input type="text" class="form-control" id="pj-skills" placeholder="e.g. JavaScript, React, Node.js, MySQL, Git" required />
      </div>

      <div class="form-group">
        <label class="form-label">Qualifications (one per line) <span class="req">*</span></label>
        <textarea class="form-control" id="pj-qualifications" placeholder="Currently pursuing B.Sc. in Computer Science at CADT&#10;Familiarity with REST APIs and Git" required></textarea>
      </div>

      <div class="flex-between mt-md" style="padding-top:16px;border-top:1px solid var(--color-border);flex-wrap:wrap;">
        <span class="text-xs text-muted">Published jobs appear immediately in Find Jobs & Student recommendations.</span>
        <div class="items-center" style="gap:10px;">
          <button type="button" class="btn btn-outline" data-nav="company-dashboard">Cancel</button>
          <button type="submit" class="btn btn-primary">${icon('check')} Publish Job</button>
        </div>
      </div>
    </form>
  `;
}

/* C. Manage Applicants Page */
function renderManageApplicantsPage(jobFilter = 'All', statusFilter = 'All') {
  const company = getCompany(AppState.currentCompanyId);
  const myJobs = AppState.jobs.filter(j => j.companyId === company.id);
  const myJobIds = new Set(myJobs.map(j => j.id));

  let applicants = AppState.applications.filter(a => myJobIds.has(a.jobId));
  if (jobFilter !== 'All') applicants = applicants.filter(a => a.jobId === jobFilter);
  if (statusFilter !== 'All') applicants = applicants.filter(a => a.status === statusFilter);

  return `
    <div class="flex-between mb-lg" style="flex-wrap:wrap;">
      <div>
        <h1 style="font-size:1.65rem;">Manage Applicants</h1>
        <p class="text-muted text-sm">Review student profiles, preview CVs, and accept or reject candidates.</p>
      </div>
      <button type="button" class="btn btn-primary btn-sm" data-nav="company-post-job">${icon('plus')} Post a Job</button>
    </div>

    <div class="card card-compact mb-lg">
      <div class="flex" style="gap:12px;flex-wrap:wrap;">
        <div style="flex:1;min-width:220px;">
          <label class="form-label text-xs">Filter by Job Posting</label>
          <select class="form-control" id="applicant-job-filter">
            <option value="All">All Company Jobs (${myJobs.length})</option>
            ${myJobs.map(j => `<option value="${j.id}" ${jobFilter === j.id ? 'selected' : ''}>${escapeHtml(j.title)}</option>`).join('')}
          </select>
        </div>
        <div style="min-width:190px;">
          <label class="form-label text-xs">Filter by Status</label>
          <select class="form-control" id="applicant-status-filter">
            ${['All', 'Pending', 'Under Review', 'Accepted', 'Rejected'].map(st =>
              `<option value="${st}" ${statusFilter === st ? 'selected' : ''}>${st}</option>`
            ).join('')}
          </select>
        </div>
      </div>
    </div>

    ${applicants.length === 0 ? renderEmptyState({
      iconName: 'users',
      title: 'No applicants match this filter',
      description: 'Try selecting "All Company Jobs" or wait for new university student submissions.',
      actionLabel: 'Show All Applicants',
      actionAttrs: 'id="reset-applicant-filters-btn"'
    }) : `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Applied Role</th>
              <th>Skills</th>
              <th>CV Preview</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Decision Actions</th>
            </tr>
          </thead>
          <tbody>
            ${applicants.map(app => {
              const stu = getStudent(app.studentId);
              const job = getJob(app.jobId);
              return `
                <tr>
                  <td>
                    <div class="items-center" style="gap:10px;">
                      <div class="user-avatar" style="width:36px;height:36px;font-size:0.78rem;">${escapeHtml(stu.initials)}</div>
                      <div>
                        <div class="font-semibold">${escapeHtml(stu.fullName)}</div>
                        <div class="text-xs text-muted">${escapeHtml(stu.major)} • ${escapeHtml(stu.university.includes('CADT') ? 'CADT' : stu.university)}</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-sm font-medium">${escapeHtml(job ? job.title : '—')}</td>
                  <td>
                    <div class="flex" style="flex-wrap:wrap;gap:4px;max-width:210px;">
                      ${stu.skills.slice(0, 3).map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
                    </div>
                  </td>
                  <td>
                    <button type="button" class="btn btn-outline btn-sm" data-preview-cv="${app.id}">
                      ${icon('eye')} Preview CV
                    </button>
                  </td>
                  <td class="text-muted">${formatDate(app.appliedDate)}</td>
                  <td>${statusBadge(app.status)}</td>
                  <td>
                    <div class="items-center" style="gap:6px;flex-wrap:wrap;">
                      <button type="button" class="btn btn-success btn-sm" data-decide-app="${app.id}" data-decision="Accepted" ${app.status === 'Accepted' ? 'disabled style="opacity:0.5;cursor:default;"' : ''}>
                        Accept
                      </button>
                      <button type="button" class="btn btn-danger-outline btn-sm" data-decide-app="${app.id}" data-decision="Rejected" ${app.status === 'Rejected' ? 'disabled style="opacity:0.5;cursor:default;"' : ''}>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `}
  `;
}

function openApplicantCvPreviewModal(appId) {
  const app = AppState.applications.find(a => a.id === appId);
  if (!app) return;
  const stu = getStudent(app.studentId);
  const job = getJob(app.jobId);

  openModal({
    title: `CV Preview — ${stu.fullName}`,
    large: true,
    bodyHtml: `
      <div class="card card-compact mb-md" style="background:var(--color-bg);box-shadow:none;">
        <div class="flex-between" style="flex-wrap:wrap;gap:12px;">
          <div class="items-center" style="gap:14px;">
            <div class="user-avatar" style="width:52px;height:52px;font-size:1.1rem;">${escapeHtml(stu.initials)}</div>
            <div>
              <h3 style="font-size:1.15rem;">${escapeHtml(stu.fullName)}</h3>
              <p class="text-xs text-muted">${escapeHtml(stu.university)} • ${escapeHtml(stu.major)} (${escapeHtml(stu.year)})</p>
              <p class="text-xs text-muted">${escapeHtml(stu.email)} • ${escapeHtml(stu.phone)}</p>
            </div>
          </div>
          <span class="badge badge-blue">GPA ${escapeHtml(stu.gpa)}</span>
        </div>
      </div>

      <div class="mb-md">
        <div class="text-xs font-semibold text-muted" style="text-transform:uppercase;">Application Note (${escapeHtml(job ? job.title : '')})</div>
        <p class="text-sm mt-sm" style="background:var(--color-primary-light);padding:12px;border-radius:var(--radius-sm);">${escapeHtml(app.coverNote)}</p>
      </div>

      <div class="mb-md">
        <div class="text-xs font-semibold text-muted" style="text-transform:uppercase;">Skills</div>
        <div class="flex mt-sm" style="flex-wrap:wrap;gap:6px;">
          ${stu.skills.map(s => `<span class="skill-tag matched">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>

      <div class="grid grid-2">
        <div>
          <div class="text-xs font-semibold text-muted" style="text-transform:uppercase;">Education</div>
          ${stu.education.map(e => `
            <div class="mt-sm text-sm">
              <div class="font-semibold">${escapeHtml(e.degree)}</div>
              <div class="text-xs text-muted">${escapeHtml(e.school)} (${escapeHtml(e.period)})</div>
            </div>
          `).join('')}
        </div>
        <div>
          <div class="text-xs font-semibold text-muted" style="text-transform:uppercase;">Attached Document</div>
          <div class="mt-sm text-sm font-medium">${icon('fileText')} ${escapeHtml(app.cvUsed)}</div>
          <div class="text-xs text-muted mt-sm">Submitted on ${formatDate(app.appliedDate)}</div>
        </div>
      </div>
    `,
    footerHtml: `
      <button type="button" class="btn btn-outline" onclick="closeModal()">Close</button>
      <button type="button" class="btn btn-danger-outline" id="modal-reject-app">Reject</button>
      <button type="button" class="btn btn-success" id="modal-accept-app">Accept Candidate</button>
    `
  });

  document.getElementById('modal-accept-app').onclick = () => {
    closeModal();
    handleApplicantDecision(app.id, 'Accepted');
  };
  document.getElementById('modal-reject-app').onclick = () => {
    closeModal();
    handleApplicantDecision(app.id, 'Rejected');
  };
}
