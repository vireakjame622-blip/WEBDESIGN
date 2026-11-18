/* ==========================================================================
   CareerConnect – Student Portal & Job Discovery Pages (Pages B through G)
   ========================================================================== */

function getFilteredJobs() {
  const f = AppState.jobFilters;
  return AppState.jobs.filter(job => {
    if (job.status !== 'Active') return false;
    const company = getCompany(job.companyId);
    const q = (f.search || '').trim().toLowerCase();
    if (q) {
      const hay = [job.title, company.name, job.category, job.location, ...job.skills].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (f.category && f.category !== 'All' && job.category !== f.category) return false;
    if (f.location && f.location !== 'All' && !job.location.toLowerCase().includes(f.location.toLowerCase())) return false;
    if (f.jobType && f.jobType !== 'All' && job.jobType !== f.jobType) return false;
    if (f.experience && f.experience !== 'All' && job.experienceLevel !== f.experience) return false;
    if (f.skill && !job.skills.some(s => s.toLowerCase() === f.skill.toLowerCase())) return false;
    return true;
  });
}

function getAllUniqueSkills() {
  const set = new Set();
  AppState.jobs.forEach(j => j.skills.forEach(s => set.add(s)));
  return Array.from(set).sort();
}

/* B. Student Dashboard */
function renderStudentDashboard() {
  const student = getStudent(AppState.currentStudentId);
  const myApps = AppState.applications.filter(a => a.studentId === student.id);
  const savedJobs = AppState.jobs.filter(j => AppState.savedJobIds.includes(j.id) && j.status === 'Active');
  const activeJobs = AppState.jobs.filter(j => j.status === 'Active');

  // Compute skill-matched recommended jobs
  const recommended = activeJobs
    .map(job => {
      const overlap = job.skills.filter(s => student.skills.map(x => x.toLowerCase()).includes(s.toLowerCase())).length;
      return { job, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 2)
    .map(x => x.job);

  const recentJobs = [...activeJobs].sort((a, b) => b.postedDate.localeCompare(a.postedDate)).slice(0, 3);

  const counts = {
    total: myApps.length,
    pending: myApps.filter(a => a.status === 'Pending').length,
    review: myApps.filter(a => a.status === 'Under Review').length,
    accepted: myApps.filter(a => a.status === 'Accepted').length,
    rejected: myApps.filter(a => a.status === 'Rejected').length
  };

  // Profile completeness calculation
  let completeness = 40;
  if (student.skills.length >= 3) completeness += 20;
  if (student.projects.length > 0) completeness += 15;
  if (student.experience.length > 0) completeness += 10;
  if (student.cv && student.cv.fileName) completeness += 15;

  return `
    <div class="flex-between mb-lg" style="flex-wrap:wrap;">
      <div>
        <h1 style="font-size:1.65rem;">Welcome back, ${escapeHtml(student.fullName.split(' ')[0])}! 👋</h1>
        <p class="text-muted text-sm">Here’s your personalized CADT career snapshot and latest matched opportunities.</p>
      </div>
      <div class="items-center" style="gap:10px;">
        <button type="button" class="btn btn-outline btn-sm" data-nav="student-profile">${icon('edit')} Edit Profile</button>
        <button type="button" class="btn btn-primary btn-sm" data-nav="student-jobs">${icon('search')} Find Jobs</button>
      </div>
    </div>

    <!-- Application Statistics -->
    <div class="grid grid-4 mb-lg">
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Total Applications</span>
          <div class="stat-value">${counts.total}</div>
          <span class="text-xs text-muted">Across ${AppState.companies.length} employers</span>
        </div>
        <div class="stat-icon" style="background:var(--color-primary-light);color:var(--color-primary);">${icon('fileText')}</div>
      </div>
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Under Review</span>
          <div class="stat-value">${counts.review}</div>
          <span class="text-xs" style="color:var(--color-info);">Active recruiter screening</span>
        </div>
        <div class="stat-icon" style="background:var(--color-info-bg);color:var(--color-info);">${icon('eye')}</div>
      </div>
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Accepted Offers</span>
          <div class="stat-value">${counts.accepted}</div>
          <span class="text-xs" style="color:var(--color-success);">Interviews & offers</span>
        </div>
        <div class="stat-icon" style="background:var(--color-success-bg);color:var(--color-success);">${icon('checkCircle')}</div>
      </div>
      <div class="card stat-card">
        <div>
          <span class="text-xs text-muted font-medium">Saved Jobs</span>
          <div class="stat-value">${savedJobs.length}</div>
          <span class="text-xs text-muted">Bookmarked for later</span>
        </div>
        <div class="stat-icon" style="background:var(--color-purple-bg);color:var(--color-purple);">${icon('bookmark')}</div>
      </div>
    </div>

    <!-- Profile Summary + Application Status Overview -->
    <div class="grid grid-2 mb-lg">
      <div class="card">
        <div class="flex-between mb-md">
          <div class="items-center" style="gap:14px;">
            <div class="user-avatar" style="width:54px;height:54px;font-size:1.15rem;">${escapeHtml(student.initials)}</div>
            <div>
              <h3 style="font-size:1.08rem;">${escapeHtml(student.fullName)}</h3>
              <p class="text-xs text-muted">${escapeHtml(student.major)} • ${escapeHtml(student.year)}</p>
              <p class="text-xs font-medium" style="color:var(--color-primary);margin-top:2px;">${escapeHtml(student.university)}</p>
            </div>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" data-nav="student-profile">View Profile</button>
        </div>

        <div class="mb-md">
          <div class="flex-between text-xs mb-md" style="margin-bottom:6px;">
            <span class="font-medium">Profile Completeness</span>
            <span class="font-semibold" style="color:var(--color-primary);">${completeness}%</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:${completeness}%;"></div></div>
        </div>

        <div class="flex" style="flex-wrap:wrap;gap:6px;margin-bottom:14px;">
          ${student.skills.slice(0, 6).map(s => `<span class="skill-tag matched">${escapeHtml(s)}</span>`).join('')}
        </div>

        <div class="flex-between text-xs text-muted" style="padding-top:12px;border-top:1px solid var(--color-border);">
          <span>CV: <strong>${student.cv ? escapeHtml(student.cv.fileName) : 'Not uploaded'}</strong></span>
          <span>GPA: <strong>${escapeHtml(student.gpa)}</strong></span>
        </div>
      </div>

      <div class="card">
        <div class="flex-between mb-md">
          <h3 style="font-size:1.08rem;">Application Status Overview</h3>
          <button type="button" class="btn btn-ghost btn-sm" data-nav="student-applications">Manage All ${icon('arrowRight')}</button>
        </div>

        <div class="grid grid-2" style="gap:10px;margin-bottom:16px;">
          <div class="card card-compact" style="background:var(--color-bg);box-shadow:none;">
            <div class="flex-between"><span class="text-xs text-muted">Pending</span>${statusBadge('Pending')}</div>
            <div class="font-semibold mt-sm" style="font-size:1.2rem;">${counts.pending}</div>
          </div>
          <div class="card card-compact" style="background:var(--color-bg);box-shadow:none;">
            <div class="flex-between"><span class="text-xs text-muted">Under Review</span>${statusBadge('Under Review')}</div>
            <div class="font-semibold mt-sm" style="font-size:1.2rem;">${counts.review}</div>
          </div>
          <div class="card card-compact" style="background:var(--color-bg);box-shadow:none;">
            <div class="flex-between"><span class="text-xs text-muted">Accepted</span>${statusBadge('Accepted')}</div>
            <div class="font-semibold mt-sm" style="font-size:1.2rem;">${counts.accepted}</div>
          </div>
          <div class="card card-compact" style="background:var(--color-bg);box-shadow:none;">
            <div class="flex-between"><span class="text-xs text-muted">Rejected</span>${statusBadge('Rejected')}</div>
            <div class="font-semibold mt-sm" style="font-size:1.2rem;">${counts.rejected}</div>
          </div>
        </div>

        ${myApps.slice(0, 2).map(app => {
          const j = getJob(app.jobId);
          const c = j ? getCompany(j.companyId) : { name: 'Company' };
          return j ? `
            <div class="flex-between" style="padding:8px 0;border-top:1px solid var(--color-border);font-size:0.84rem;">
              <div>
                <div class="font-semibold">${escapeHtml(j.title)}</div>
                <div class="text-xs text-muted">${escapeHtml(c.name)} • Applied ${formatDate(app.appliedDate)}</div>
              </div>
              ${statusBadge(app.status)}
            </div>
          ` : '';
        }).join('')}
      </div>
    </div>

    <!-- Recommended Jobs -->
    <div class="mb-lg">
      <div class="flex-between mb-md">
        <div>
          <h2 style="font-size:1.25rem;">Recommended For Your Skills</h2>
          <p class="text-xs text-muted">Matched to your CADT Computer Science profile & React/Node.js skills</p>
        </div>
        <button type="button" class="btn btn-outline btn-sm" data-nav="student-jobs">See All Matches</button>
      </div>
      <div class="grid grid-2">
        ${recommended.map(j => renderJobCard(j)).join('')}
      </div>
    </div>

    <!-- Recently Posted & Saved Jobs -->
    <div class="grid grid-2">
      <div class="card">
        <div class="flex-between mb-md">
          <h3 style="font-size:1.05rem;">Recently Posted Jobs</h3>
          <button type="button" class="btn btn-ghost btn-sm" data-nav="student-jobs">Browse All</button>
        </div>
        <div class="flex" style="flex-direction:column;gap:10px;">
          ${recentJobs.map(j => {
            const c = getCompany(j.companyId);
            return `
              <div class="flex-between" style="padding:10px;border:1px solid var(--color-border);border-radius:var(--radius-sm);">
                <div>
                  <button type="button" class="font-semibold text-sm" style="color:var(--color-secondary);text-align:left;" data-open-job="${j.id}">${escapeHtml(j.title)}</button>
                  <div class="text-xs text-muted">${escapeHtml(c.name)} • ${escapeHtml(j.location)}</div>
                </div>
                ${jobTypeBadge(j.jobType)}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <div class="flex-between mb-md">
          <h3 style="font-size:1.05rem;">Saved Jobs (${savedJobs.length})</h3>
          <button type="button" class="btn btn-ghost btn-sm" data-nav="student-saved">View Saved</button>
        </div>
        ${savedJobs.length === 0 ? `
          <p class="text-sm text-muted">No jobs saved yet. Bookmark roles from Find Jobs to review them later.</p>
        ` : `
          <div class="flex" style="flex-direction:column;gap:10px;">
            ${savedJobs.slice(0, 3).map(j => {
              const c = getCompany(j.companyId);
              return `
                <div class="flex-between" style="padding:10px;border:1px solid var(--color-border);border-radius:var(--radius-sm);">
                  <div>
                    <button type="button" class="font-semibold text-sm" style="color:var(--color-secondary);text-align:left;" data-open-job="${j.id}">${escapeHtml(j.title)}</button>
                    <div class="text-xs text-muted">${escapeHtml(c.name)} • Deadline ${formatDate(j.deadline)}</div>
                  </div>
                  <button type="button" class="btn btn-primary btn-sm" data-apply-job="${j.id}">Apply</button>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

/* C. Find Jobs Page (usable in both Public & Student portal) */
function renderFindJobsPage(isPublic = false) {
  const f = AppState.jobFilters;
  const filtered = getFilteredJobs();
  const categories = AppState.categories.filter(c => c.active);
  const skills = getAllUniqueSkills();

  const inner = `
    <div class="flex-between mb-lg" style="flex-wrap:wrap;">
      <div>
        <h1 style="font-size:1.65rem;">Find Jobs & Internships</h1>
        <p class="text-muted text-sm">Showing <strong>${filtered.length}</strong> open position${filtered.length === 1 ? '' : 's'} across Cambodia</p>
      </div>
      <div class="items-center" style="gap:8px;">
        ${(f.search || f.category !== 'All' || f.location !== 'All' || f.jobType !== 'All' || f.experience !== 'All' || f.skill) ? `
          <button type="button" class="btn btn-outline btn-sm" id="reset-job-filters-btn">Reset All Filters</button>
        ` : ''}
      </div>
    </div>

    <!-- Top Search Bar -->
    <div class="card card-compact mb-lg">
      <div class="flex" style="gap:12px;flex-wrap:wrap;">
        <div class="input-icon-wrap" style="flex:1;min-width:240px;">
          <span class="input-icon">${icon('search')}</span>
          <input type="text" class="form-control" id="job-search-input" value="${escapeHtml(f.search)}" placeholder="Search by job title, company, or keyword..." />
        </div>
        <select class="form-control" id="job-sort-select" style="width:auto;min-width:170px;">
          <option value="newest">Sort: Most Recent</option>
          <option value="deadline">Sort: Earliest Deadline</option>
        </select>
      </div>
    </div>

    <div class="jobs-layout">
      <!-- Left Filter Sidebar -->
      <aside class="card filter-panel">
        <div class="flex-between mb-md">
          <h3 style="font-size:1rem;">Filters</h3>
          <button type="button" class="text-xs font-medium" style="color:var(--color-primary);" id="clear-filters-link">Clear all</button>
        </div>

        <div class="form-group">
          <label class="form-label">Job Category</label>
          <select class="form-control" id="filter-category">
            <option value="All">All Categories</option>
            ${categories.map(c => `<option value="${escapeHtml(c.name)}" ${f.category === c.name ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Location</label>
          <select class="form-control" id="filter-location">
            <option value="All" ${f.location === 'All' ? 'selected' : ''}>All Locations</option>
            <option value="Phnom Penh" ${f.location === 'Phnom Penh' ? 'selected' : ''}>Phnom Penh</option>
            <option value="Hybrid" ${f.location === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
            <option value="Remote" ${f.location === 'Remote' ? 'selected' : ''}>Remote</option>
            <option value="Siem Reap" ${f.location === 'Siem Reap' ? 'selected' : ''}>Siem Reap</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Job Type</label>
          <select class="form-control" id="filter-jobtype">
            <option value="All" ${f.jobType === 'All' ? 'selected' : ''}>All Types</option>
            <option value="Internship" ${f.jobType === 'Internship' ? 'selected' : ''}>Internship</option>
            <option value="Full-time" ${f.jobType === 'Full-time' ? 'selected' : ''}>Full-time</option>
            <option value="Part-time" ${f.jobType === 'Part-time' ? 'selected' : ''}>Part-time</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Experience Level</label>
          <select class="form-control" id="filter-experience">
            <option value="All" ${f.experience === 'All' ? 'selected' : ''}>All Levels</option>
            <option value="Student / No Experience" ${f.experience === 'Student / No Experience' ? 'selected' : ''}>Student / No Experience</option>
            <option value="Entry Level" ${f.experience === 'Entry Level' ? 'selected' : ''}>Entry Level</option>
            <option value="Junior" ${f.experience === 'Junior' ? 'selected' : ''}>Junior (1+ yr)</option>
          </select>
        </div>

        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Filter by Skill</label>
          <select class="form-control" id="filter-skill">
            <option value="">Any Skill</option>
            ${skills.map(s => `<option value="${escapeHtml(s)}" ${f.skill === s ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('')}
          </select>
        </div>
      </aside>

      <!-- Job Results -->
      <section>
        ${filtered.length === 0 ? renderEmptyState({
          iconName: 'search',
          title: 'No matching jobs found',
          description: 'Try adjusting your search keywords, location, or skill filters to discover more CADT internships and roles.',
          actionLabel: 'Reset Filters',
          actionAttrs: 'id="empty-reset-filters-btn"'
        }) : `
          <div class="grid grid-1" style="gap:16px;">
            ${filtered.map(job => renderJobCard(job)).join('')}
          </div>
        `}
      </section>
    </div>
  `;

  if (isPublic) {
    return `${renderPublicNavbar('public-jobs')}<main class="section-sm"><div class="container">${inner}</div></main>${renderFooter()}`;
  }
  return inner;
}

/* D. Job Details Page */
function renderJobDetailsPage(isPublic = false) {
  const job = getJob(AppState.selectedJobId) || AppState.jobs[0];
  if (!job) {
    return renderEmptyState({ title: 'Job not found', description: 'This job posting may have been removed.' });
  }
  const company = getCompany(job.companyId);
  const student = getStudent(AppState.currentStudentId);
  const studentSkillsLower = student.skills.map(s => s.toLowerCase());
  const isSaved = AppState.savedJobIds.includes(job.id);
  const studentApp = AppState.applications.find(a => a.jobId === job.id && a.studentId === student.id);

  const similarJobs = AppState.jobs
    .filter(j => j.id !== job.id && j.status === 'Active' && (j.category === job.category || j.jobType === job.jobType))
    .slice(0, 2);

  const backRoute = isPublic ? 'public-jobs' : 'student-jobs';

  const inner = `
    <div class="mb-md">
      <button type="button" class="btn btn-ghost btn-sm" data-nav="${backRoute}">
        ${icon('arrowLeft')} Back to Jobs
      </button>
    </div>

    <div class="job-detail-layout">
      <!-- Main Job Content -->
      <div class="card">
        <div class="flex-between" style="flex-wrap:wrap;gap:16px;padding-bottom:20px;border-bottom:1px solid var(--color-border);">
          <div class="items-center" style="gap:16px;">
            <div class="company-logo company-logo-lg" style="background:${company.color}">${escapeHtml(company.initials)}</div>
            <div>
              <div class="items-center" style="gap:8px;flex-wrap:wrap;">
                ${jobTypeBadge(job.jobType)}
                <span class="badge badge-navy">${escapeHtml(job.category)}</span>
              </div>
              <h1 style="font-size:1.5rem;margin-top:8px;">${escapeHtml(job.title)}</h1>
              <p class="text-sm text-muted" style="margin-top:4px;">
                <strong>${escapeHtml(company.name)}</strong> • ${escapeHtml(job.location)} • Posted ${formatDate(job.postedDate)}
              </p>
            </div>
          </div>

          <div class="items-center" style="gap:10px;">
            <button type="button" class="btn btn-outline btn-save ${isSaved ? 'saved' : ''}" data-toggle-save="${job.id}">
              ${isSaved ? icon('bookmarkFilled') : icon('bookmark')} ${isSaved ? 'Saved' : 'Save Job'}
            </button>
            ${studentApp ? `
              <span class="badge badge-green" style="padding:10px 14px;font-size:0.85rem;">${icon('check')} Applied (${escapeHtml(studentApp.status)})</span>
            ` : `
              <button type="button" class="btn btn-primary" data-apply-job="${job.id}">Apply Now</button>
            `}
          </div>
        </div>

        <div class="mt-lg">
          <h3 style="font-size:1.08rem;margin-bottom:8px;">Job Description</h3>
          <p class="text-sm" style="line-height:1.75;color:var(--color-text);">${escapeHtml(job.description)}</p>
        </div>

        <div class="mt-lg">
          <h3 style="font-size:1.08rem;">Key Responsibilities</h3>
          <ul class="detail-list">
            ${job.responsibilities.map(r => `<li>${icon('checkCircle')}<span>${escapeHtml(r)}</span></li>`).join('')}
          </ul>
        </div>

        <div class="mt-lg">
          <h3 style="font-size:1.08rem;">Required Qualifications</h3>
          <ul class="detail-list">
            ${job.qualifications.map(q => `<li>${icon('check')}<span>${escapeHtml(q)}</span></li>`).join('')}
          </ul>
        </div>

        <div class="mt-lg">
          <h3 style="font-size:1.08rem;margin-bottom:10px;">Required Skills</h3>
          <div class="flex" style="flex-wrap:wrap;gap:8px;">
            ${job.skills.map(s => {
              const matched = studentSkillsLower.includes(s.toLowerCase());
              return `<span class="skill-tag ${matched ? 'matched' : ''}">${escapeHtml(s)} ${matched ? '✓ Match' : ''}</span>`;
            }).join('')}
          </div>
          <p class="text-xs text-muted mt-sm">Highlighted tags match your Student Profile skills.</p>
        </div>
      </div>

      <!-- Right Sidebar Summary -->
      <aside class="flex" style="flex-direction:column;gap:20px;">
        <div class="card">
          <h3 style="font-size:1.05rem;margin-bottom:14px;">Job Overview</h3>
          <div class="flex" style="flex-direction:column;gap:12px;font-size:0.88rem;">
            <div class="flex-between">
              <span class="text-muted">Job Type</span>
              <span class="font-semibold">${escapeHtml(job.jobType)}</span>
            </div>
            <div class="flex-between">
              <span class="text-muted">Location</span>
              <span class="font-semibold">${escapeHtml(job.location)}</span>
            </div>
            <div class="flex-between">
              <span class="text-muted">Experience</span>
              <span class="font-semibold">${escapeHtml(job.experienceLevel)}</span>
            </div>
            <div class="flex-between">
              <span class="text-muted">Salary / Stipend</span>
              <span class="font-semibold">${job.salary ? escapeHtml(job.salary) : 'Not Disclosed'}</span>
            </div>
            <div class="flex-between">
              <span class="text-muted">Application Deadline</span>
              <span class="badge badge-amber">${icon('calendar')} ${formatDate(job.deadline)}</span>
            </div>
          </div>

          <div class="mt-lg">
            ${studentApp ? `
              <button type="button" class="btn btn-outline btn-block" data-switch-role="student" data-nav="student-applications">View My Application</button>
            ` : `
              <button type="button" class="btn btn-primary btn-block" data-apply-job="${job.id}">Apply Now</button>
            `}
          </div>
        </div>

        <div class="card">
          <h3 style="font-size:1.05rem;margin-bottom:10px;">About ${escapeHtml(company.name)}</h3>
          <p class="text-xs text-muted mb-md">${escapeHtml(company.industry)} • ${escapeHtml(company.size || 'Tech Employer')}</p>
          <p class="text-sm text-muted">${escapeHtml(company.description)}</p>
        </div>
      </aside>
    </div>

    <!-- Similar Job Recommendations -->
    ${similarJobs.length > 0 ? `
      <div class="mt-lg" style="margin-top:32px;">
        <h2 style="font-size:1.25rem;margin-bottom:14px;">Similar Job Recommendations</h2>
        <div class="grid grid-2">
          ${similarJobs.map(j => renderJobCard(j)).join('')}
        </div>
      </div>
    ` : ''}
  `;

  if (isPublic) {
    return `${renderPublicNavbar('public-jobs')}<main class="section-sm"><div class="container">${inner}</div></main>${renderFooter()}`;
  }
  return inner;
}

/* E. Student Profile Page */
function renderStudentProfilePage() {
  const student = getStudent(AppState.currentStudentId);
  return `
    <div class="flex-between mb-lg" style="flex-wrap:wrap;">
      <div>
        <h1 style="font-size:1.65rem;">Student Profile</h1>
        <p class="text-muted text-sm">Keep your academic profile, projects, and CV updated for recruiters.</p>
      </div>
      <button type="button" class="btn btn-primary" id="edit-student-profile-btn">${icon('edit')} Edit Profile</button>
    </div>

    <!-- Profile Header Card -->
    <div class="card mb-lg">
      <div class="flex-between" style="flex-wrap:wrap;gap:20px;">
        <div class="items-center" style="gap:20px;flex-wrap:wrap;">
          <div class="user-avatar user-avatar-xl">${escapeHtml(student.initials)}</div>
          <div>
            <div class="items-center" style="gap:10px;flex-wrap:wrap;">
              <h2 style="font-size:1.4rem;">${escapeHtml(student.fullName)}</h2>
              <span class="badge badge-blue">${escapeHtml(student.year)}</span>
            </div>
            <p class="font-medium text-sm" style="color:var(--color-primary);margin-top:4px;">${escapeHtml(student.university)} — ${escapeHtml(student.major)}</p>
            <p class="text-sm text-muted mt-sm">${escapeHtml(student.headline)}</p>
            <div class="job-meta-row mt-sm">
              <span class="job-meta-item">${icon('mapPin')} ${escapeHtml(student.location)}</span>
              <span class="job-meta-item">📧 ${escapeHtml(student.email)}</span>
              <span class="job-meta-item">📱 ${escapeHtml(student.phone)}</span>
            </div>
          </div>
        </div>
      </div>
      <p class="text-sm mt-md" style="padding-top:16px;border-top:1px solid var(--color-border);">${escapeHtml(student.bio)}</p>
    </div>

    <div class="grid grid-2 mb-lg">
      <!-- Skills Section -->
      <div class="card">
        <div class="flex-between mb-md">
          <h3 style="font-size:1.08rem;">Technical & Soft Skills</h3>
          <span class="text-xs text-muted">${student.skills.length} skills</span>
        </div>
        <div class="flex" style="flex-wrap:wrap;gap:8px;margin-bottom:16px;">
          ${student.skills.map(s => `
            <span class="skill-tag matched">
              ${escapeHtml(s)}
              <button type="button" class="skill-tag-remove" data-remove-skill="${escapeHtml(s)}" title="Remove skill">${icon('x')}</button>
            </span>
          `).join('')}
        </div>
        <form id="add-skill-form" class="flex" style="gap:8px;">
          <input type="text" class="form-control" id="new-skill-input" placeholder="Add a skill (e.g. TypeScript, Docker)..." required />
          <button type="submit" class="btn btn-outline btn-sm">${icon('plus')} Add</button>
        </form>
      </div>

      <!-- CV Upload Section -->
      <div class="card">
        <h3 style="font-size:1.08rem;margin-bottom:12px;">Resume / CV Upload</h3>
        ${student.cv ? `
          <div class="card card-compact" style="background:var(--color-bg);box-shadow:none;margin-bottom:14px;">
            <div class="flex-between">
              <div class="items-center" style="gap:10px;">
                <div class="stat-icon" style="width:40px;height:40px;background:var(--color-primary-light);color:var(--color-primary);">${icon('fileText')}</div>
                <div>
                  <div class="font-semibold text-sm">${escapeHtml(student.cv.fileName)}</div>
                  <div class="text-xs text-muted">${escapeHtml(student.cv.fileSize)} • Uploaded ${formatDate(student.cv.uploadedAt)}</div>
                </div>
              </div>
              <div class="items-center">
                <button type="button" class="btn btn-ghost btn-sm" id="preview-my-cv-btn">${icon('eye')} Preview</button>
                <button type="button" class="btn btn-danger-outline btn-sm" id="remove-my-cv-btn">${icon('trash')}</button>
              </div>
            </div>
          </div>
        ` : ''}
        <label class="upload-zone" style="display:block;cursor:pointer;">
          <input type="file" id="cv-file-input" accept=".pdf,.doc,.docx" class="sr-only" />
          <div style="color:var(--color-primary);margin-bottom:6px;">${icon('upload')}</div>
          <div class="font-semibold text-sm">${student.cv ? 'Upload a New CV (PDF / DOCX)' : 'Upload Your CV (PDF / DOCX)'}</div>
          <div class="text-xs text-muted mt-sm">Click to select a file (Max 5MB)</div>
        </label>
      </div>
    </div>

    <!-- Education & Work Experience -->
    <div class="grid grid-2 mb-lg">
      <div class="card">
        <div class="flex-between mb-md">
          <h3 style="font-size:1.08rem;">Education Information</h3>
          <span class="badge badge-blue">GPA ${escapeHtml(student.gpa)}</span>
        </div>
        <div class="flex" style="flex-direction:column;gap:14px;">
          ${student.education.map(ed => `
            <div style="padding-left:12px;border-left:3px solid var(--color-primary);">
              <div class="font-semibold text-sm">${escapeHtml(ed.degree)}</div>
              <div class="text-xs font-medium" style="color:var(--color-primary);">${escapeHtml(ed.school)}</div>
              <div class="text-xs text-muted">${escapeHtml(ed.period)}</div>
              <p class="text-xs text-muted mt-sm">${escapeHtml(ed.details)}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="flex-between mb-md">
          <h3 style="font-size:1.08rem;">Work Experience</h3>
          <button type="button" class="btn btn-outline btn-sm" id="add-exp-btn">${icon('plus')} Add Experience</button>
        </div>
        ${student.experience.length === 0 ? `
          <p class="text-sm text-muted">No work experience added yet. Academic internships, lab assistantships, and volunteering count!</p>
        ` : `
          <div class="flex" style="flex-direction:column;gap:14px;">
            ${student.experience.map(ex => `
              <div style="padding-left:12px;border-left:3px solid var(--color-secondary);">
                <div class="font-semibold text-sm">${escapeHtml(ex.role)}</div>
                <div class="text-xs font-medium text-muted">${escapeHtml(ex.org)} • ${escapeHtml(ex.period)}</div>
                <p class="text-xs text-muted mt-sm">${escapeHtml(ex.details)}</p>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>

    <!-- Academic & Personal Projects -->
    <div class="card">
      <div class="flex-between mb-md">
        <h3 style="font-size:1.08rem;">Projects Portfolio</h3>
        <button type="button" class="btn btn-outline btn-sm" id="add-project-btn">${icon('plus')} Add Project</button>
      </div>
      ${student.projects.length === 0 ? `
        <p class="text-sm text-muted">Showcase your CADT coursework, hackathons, or GitHub projects here.</p>
      ` : `
        <div class="grid grid-2">
          ${student.projects.map(p => `
            <div class="card card-compact" style="background:var(--color-bg);box-shadow:none;">
              <div class="flex-between">
                <h4 style="font-size:0.98rem;">${escapeHtml(p.name)}</h4>
                <span class="badge badge-navy">${escapeHtml(p.tech)}</span>
              </div>
              <p class="text-xs text-muted mt-sm">${escapeHtml(p.summary)}</p>
              <div class="text-xs font-medium mt-sm" style="color:var(--color-primary);">${escapeHtml(p.link)}</div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

/* F. My Applications Page */
function renderMyApplicationsPage(activeStatus = 'All') {
  const student = getStudent(AppState.currentStudentId);
  const allApps = AppState.applications.filter(a => a.studentId === student.id);
  const filtered = activeStatus === 'All' ? allApps : allApps.filter(a => a.status === activeStatus);

  const statuses = ['All', 'Pending', 'Under Review', 'Accepted', 'Rejected'];

  return `
    <div class="flex-between mb-lg" style="flex-wrap:wrap;">
      <div>
        <h1 style="font-size:1.65rem;">My Applications</h1>
        <p class="text-muted text-sm">Track your submitted applications and recruiter updates in real time.</p>
      </div>
      <button type="button" class="btn btn-primary btn-sm" data-nav="student-jobs">${icon('search')} Find More Jobs</button>
    </div>

    <div class="tabs">
      ${statuses.map(st => {
        const count = st === 'All' ? allApps.length : allApps.filter(a => a.status === st).length;
        return `<button type="button" class="tab-btn ${activeStatus === st ? 'active' : ''}" data-app-tab="${st}">${st} (${count})</button>`;
      }).join('')}
    </div>

    ${filtered.length === 0 ? renderEmptyState({
      iconName: 'fileText',
      title: activeStatus === 'All' ? 'No applications submitted yet' : `No "${activeStatus}" applications`,
      description: activeStatus === 'All'
        ? 'Start applying to internships and graduate roles matched to your CADT skills.'
        : 'You currently have no applications under this status filter.',
      actionLabel: activeStatus === 'All' ? 'Browse Jobs' : 'View All Applications',
      actionAttrs: activeStatus === 'All' ? 'data-nav="student-jobs"' : 'data-app-tab="All"'
    }) : `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Job Type</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(app => {
              const job = getJob(app.jobId);
              const company = job ? getCompany(job.companyId) : { name: 'Unknown', initials: '?', color: '#64748B' };
              return `
                <tr>
                  <td>
                    <button type="button" class="font-semibold" style="color:var(--color-secondary);text-align:left;" data-open-job="${app.jobId}">
                      ${escapeHtml(job ? job.title : 'Removed Position')}
                    </button>
                  </td>
                  <td>
                    <div class="items-center" style="gap:8px;">
                      <div class="company-logo" style="width:30px;height:30px;font-size:0.72rem;background:${company.color}">${escapeHtml(company.initials)}</div>
                      <span>${escapeHtml(company.name)}</span>
                    </div>
                  </td>
                  <td>${job ? jobTypeBadge(job.jobType) : '—'}</td>
                  <td class="text-muted">${formatDate(app.appliedDate)}</td>
                  <td>${statusBadge(app.status)}</td>
                  <td>
                    <button type="button" class="btn btn-outline btn-sm" data-view-app-detail="${app.id}">
                      View Application Details
                    </button>
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

/* G. Saved Jobs Page */
function renderSavedJobsPage() {
  const savedJobs = AppState.jobs.filter(j => AppState.savedJobIds.includes(j.id));

  return `
    <div class="flex-between mb-lg" style="flex-wrap:wrap;">
      <div>
        <h1 style="font-size:1.65rem;">Saved Jobs (${savedJobs.length})</h1>
        <p class="text-muted text-sm">Opportunities you bookmarked to review and apply to later.</p>
      </div>
      <button type="button" class="btn btn-outline btn-sm" data-nav="student-jobs">${icon('search')} Explore More Jobs</button>
    </div>

    ${savedJobs.length === 0 ? renderEmptyState({
      iconName: 'bookmark',
      title: 'Your saved jobs list is empty',
      description: 'Click the Save button on any job listing to bookmark it here for quick access before the deadline.',
      actionLabel: 'Browse Open Positions',
      actionAttrs: 'data-nav="student-jobs"'
    }) : `
      <div class="grid grid-2">
        ${savedJobs.map(j => renderJobCard(j, { removeSavedOnly: true })).join('')}
      </div>
    `}
  `;
}

/* Interactive Apply Modal */
function openApplyModal(jobId) {
  const job = getJob(jobId);
  if (!job) return;
  const company = getCompany(job.companyId);
  const student = getStudent(AppState.currentStudentId);

  openModal({
    title: `Apply for ${job.title}`,
    bodyHtml: `
      <div class="card card-compact mb-md" style="background:var(--color-bg);box-shadow:none;">
        <div class="items-center" style="gap:12px;">
          <div class="company-logo" style="background:${company.color}">${escapeHtml(company.initials)}</div>
          <div>
            <div class="font-semibold text-sm">${escapeHtml(job.title)}</div>
            <div class="text-xs text-muted">${escapeHtml(company.name)} • ${escapeHtml(job.location)}</div>
          </div>
        </div>
      </div>

      <form id="apply-job-form">
        <div class="form-group">
          <label class="form-label">Applicant</label>
          <input type="text" class="form-control" value="${escapeHtml(student.fullName)} (${escapeHtml(student.major)})" disabled />
        </div>
        <div class="form-group">
          <label class="form-label">Attached Resume / CV <span class="req">*</span></label>
          <input type="text" class="form-control" id="apply-cv-name" value="${student.cv ? escapeHtml(student.cv.fileName) : 'Sokha_Chan_CADT_CV_2026.pdf'}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Why are you a great fit for this role? <span class="req">*</span></label>
          <textarea class="form-control" id="apply-cover-note" placeholder="Highlight your CADT coursework, relevant projects, or enthusiasm..." required></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Submit Application</button>
      </form>
    `
  });

  document.getElementById('apply-job-form').onsubmit = (e) => {
    e.preventDefault();
    const cvUsed = document.getElementById('apply-cv-name').value.trim();
    const coverNote = document.getElementById('apply-cover-note').value.trim();
    const today = new Date().toISOString().slice(0, 10);

    AppState.applications.unshift({
      id: 'app-' + Date.now(),
      jobId: job.id,
      studentId: student.id,
      appliedDate: today,
      status: 'Pending',
      cvUsed,
      coverNote,
      timeline: [{ date: today, label: 'Application Submitted' }]
    });
    saveAppState();
    closeModal();
    showToast(`Application submitted to ${company.name}!`);
    renderApp();
  };
}
