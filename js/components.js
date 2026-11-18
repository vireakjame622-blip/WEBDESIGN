/* ==========================================================================
   CareerConnect – Reusable UI Components & Icon Library
   ========================================================================== */

const ICONS = {
  briefcase: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  mapPin: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  dollar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  bookmark: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  bookmarkFilled: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  user: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  fileText: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  building: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
  plus: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  checkCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  x: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  shield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`,
  code: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  cpu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
  layout: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
  wifi: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>`,
  barChart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`,
  layers: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  upload: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`,
  menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  arrowLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  calendar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  edit: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
  trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  eye: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  smartphone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,
  palette: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  logout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
  graduation: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`
};

function icon(name) {
  return ICONS[name] || ICONS.briefcase;
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getCompany(companyId) {
  return AppState.companies.find(c => c.id === companyId) || {
    name: 'Partner Company',
    initials: 'PC',
    color: '#2563EB',
    industry: 'Technology',
    location: 'Phnom Penh',
    verified: true
  };
}

function getStudent(studentId) {
  return AppState.students.find(s => s.id === studentId) || AppState.students[0];
}

function getJob(jobId) {
  return AppState.jobs.find(j => j.id === jobId);
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function statusBadge(status) {
  const map = {
    'Pending': 'badge-amber',
    'Under Review': 'badge-info',
    'Accepted': 'badge-green',
    'Rejected': 'badge-red',
    'Active': 'badge-green',
    'Paused': 'badge-amber',
    'Closed': 'badge-navy',
    'Suspended': 'badge-red'
  };
  return `<span class="badge ${map[status] || 'badge-navy'}">${escapeHtml(status)}</span>`;
}

function jobTypeBadge(type) {
  const map = {
    'Internship': 'badge-blue',
    'Full-time': 'badge-green',
    'Part-time': 'badge-purple'
  };
  return `<span class="badge ${map[type] || 'badge-navy'}">${escapeHtml(type)}</span>`;
}

function renderBrandLogo(clickable = true) {
  return `
    <button type="button" class="brand-logo" ${clickable ? 'data-nav="landing"' : ''}>
      <span class="brand-mark">${icon('briefcase')}</span>
      <span>Career<em>Connect</em></span>
    </button>
  `;
}

function renderEmptyState({ iconName = 'search', title, description, actionLabel = '', actionAttrs = '' }) {
  return `
    <div class="empty-state">
      <div class="empty-state-icon">${icon(iconName)}</div>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
      ${actionLabel ? `<button type="button" class="btn btn-primary" ${actionAttrs}>${escapeHtml(actionLabel)}</button>` : ''}
    </div>
  `;
}

function renderJobCard(job, { showActions = true, compact = false, removeSavedOnly = false } = {}) {
  const company = getCompany(job.companyId);
  const isSaved = AppState.savedJobIds.includes(job.id);
  const studentApp = AppState.applications.find(
    a => a.jobId === job.id && a.studentId === AppState.currentStudentId
  );

  return `
    <article class="card card-interactive job-card ${compact ? 'card-compact' : ''}">
      <div class="job-card-header">
        <div class="job-card-company">
          <div class="company-logo" style="background:${company.color}">${escapeHtml(company.initials)}</div>
          <div>
            <button type="button" class="job-title-link" data-open-job="${job.id}">
              ${escapeHtml(job.title)}
            </button>
            <div class="items-center mt-sm" style="margin-top:3px;">
              <span class="text-sm font-medium">${escapeHtml(company.name)}</span>
              ${company.verified ? `<span class="badge badge-blue" style="padding:2px 7px;font-size:0.68rem;">Verified</span>` : ''}
            </div>
          </div>
        </div>
        ${jobTypeBadge(job.jobType)}
      </div>

      <div class="job-meta-row">
        <span class="job-meta-item">${icon('mapPin')} ${escapeHtml(job.location)}</span>
        ${job.salary ? `<span class="job-meta-item">${icon('dollar')} ${escapeHtml(job.salary)}</span>` : ''}
        <span class="job-meta-item">${icon('clock')} Posted ${formatDate(job.postedDate)}</span>
      </div>

      ${!compact ? `
        <div class="flex" style="flex-wrap:wrap;gap:6px;">
          ${job.skills.slice(0, 4).map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      ` : ''}

      ${showActions ? `
        <div class="job-card-footer">
          <button type="button" class="btn btn-ghost btn-sm" data-open-job="${job.id}">
            View Details ${icon('arrowRight')}
          </button>
          <div class="items-center">
            ${removeSavedOnly ? `
              <button type="button" class="btn btn-danger-outline btn-sm" data-toggle-save="${job.id}">
                ${icon('trash')} Remove
              </button>
            ` : `
              <button type="button" class="btn btn-outline btn-sm btn-save ${isSaved ? 'saved' : ''}" data-toggle-save="${job.id}" title="${isSaved ? 'Remove from Saved' : 'Save Job'}">
                ${isSaved ? icon('bookmarkFilled') : icon('bookmark')}
                ${isSaved ? 'Saved' : 'Save'}
              </button>
            `}
            ${studentApp ? `
              <span class="badge badge-green">${icon('check')} Applied (${escapeHtml(studentApp.status)})</span>
            ` : `
              <button type="button" class="btn btn-primary btn-sm" data-apply-job="${job.id}">
                Apply Now
              </button>
            `}
          </div>
        </div>
      ` : ''}
    </article>
  `;
}

/* Toast Notification System */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span style="margin-top:1px;">${icon(type === 'danger' ? 'x' : 'checkCircle')}</span>
    <span style="flex:1;">${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(16px)';
    toast.style.transition = 'all 180ms ease';
    setTimeout(() => toast.remove(), 200);
  }, 3400);
}

/* Modal & Confirmation Dialog System */
function openModal({ title, bodyHtml, footerHtml = '', large = false }) {
  const backdrop = document.getElementById('app-modal');
  const dialog = backdrop.querySelector('.modal-dialog');
  dialog.classList.toggle('modal-dialog-lg', large);
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-footer').innerHTML = footerHtml;
  backdrop.classList.add('open');
}

function closeModal() {
  const backdrop = document.getElementById('app-modal');
  if (backdrop) backdrop.classList.remove('open');
}

function showConfirmDialog({ title, message, confirmLabel = 'Confirm', danger = false, onConfirm }) {
  openModal({
    title,
    bodyHtml: `<p style="color:var(--color-text);line-height:1.6;">${escapeHtml(message)}</p>`,
    footerHtml: `
      <button type="button" class="btn btn-outline" id="confirm-cancel-btn">Cancel</button>
      <button type="button" class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="confirm-ok-btn">${escapeHtml(confirmLabel)}</button>
    `
  });
  document.getElementById('confirm-cancel-btn').onclick = closeModal;
  document.getElementById('confirm-ok-btn').onclick = () => {
    closeModal();
    onConfirm();
  };
}
