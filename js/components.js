/**
 * InternLens KH – Reusable UI Components & Rendering Helpers
 * Course: CADT Year 2 Fundamental Web Design (Term 1)
 */

const Components = {
  /**
   * Escape HTML special characters to prevent XSS.
   */
  escapeHTML(text) {
    if (text === null || text === undefined) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, char => map[char]);
  },

  /**
   * Accessible, inline SVG icons.
   */
  getIcon(name, size = 18) {
    const icons = {
      search: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
      grid: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
      table: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"></path></svg>`,
      check: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
      alert: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
      briefcase: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
      building: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="2"></line><line x1="8" y1="6" x2="10" y2="6"></line><line x1="14" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="10" y2="10"></line><line x1="14" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="10" y2="14"></line><line x1="14" y1="14" x2="16" y2="14"></line></svg>`,
      dollar: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
      target: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
      arrowRight: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
      reset: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v6h6"></path><path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path><path d="M21 22v-6h-6"></path><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path></svg>`,
      layers: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
      info: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    };
    return icons[name] || '';
  },

  /**
   * Helper to format track-specific CSS class.
   */
  getTrackClass(track) {
    switch (track) {
      case 'Frontend': return 'track-frontend';
      case 'Backend/Full-Stack': return 'track-backend';
      case 'Data/BI': return 'track-data';
      case 'QA/IT Support': return 'track-qa';
      default: return 'track-default';
    }
  },

  /**
   * Helper to format allowance-specific CSS class.
   */
  getAllowanceClass(allowance) {
    switch (allowance) {
      case 'Paid': return 'allowance-paid';
      case 'Unpaid': return 'allowance-unpaid';
      case 'Not Stated': return 'allowance-notstated';
      default: return 'allowance-default';
    }
  },

  /**
   * Render a badge element.
   */
  renderBadge(label, modifierClass) {
    return `<span class="badge ${modifierClass}">${this.escapeHTML(label)}</span>`;
  },

  /**
   * Render a single internship card for the grid view.
   */
  renderInternshipCard(job) {
    const trackClass = this.getTrackClass(job.roleTrack);
    const allowanceClass = this.getAllowanceClass(job.allowance);

    const mandatoryBadges = job.mandatorySkills.map(skill => 
      `<span class="skill-tag skill-tag-mandatory" title="Mandatory Skill: ${this.escapeHTML(skill)}">${this.escapeHTML(skill)}</span>`
    ).join('');

    const preferredBadges = job.preferredSkills.map(skill => 
      `<span class="skill-tag skill-tag-preferred" title="Preferred Skill: ${this.escapeHTML(skill)}">${this.escapeHTML(skill)}</span>`
    ).join('');

    return `
      <article class="card internship-card" data-id="${this.escapeHTML(job.id)}">
        <div class="card-header">
          <div class="card-meta-top">
            <span class="badge badge-track ${trackClass}">${this.escapeHTML(job.roleTrack)}</span>
            <span class="badge badge-allowance ${allowanceClass}">${this.escapeHTML(job.allowance)}</span>
          </div>
          <h3 class="card-title">${this.escapeHTML(job.title)}</h3>
          <div class="company-row">
            <span class="company-name">${this.escapeHTML(job.company)}</span>
            <span class="company-sector">• ${this.escapeHTML(job.sector)}</span>
          </div>
        </div>

        <div class="card-body">
          <p class="job-description">${this.escapeHTML(job.description)}</p>

          <div class="job-compensation">
            <span class="compensation-label">Stipend / Comp:</span>
            <span class="compensation-value">${this.escapeHTML(job.salary)}</span>
          </div>

          <div class="skills-block">
            <div class="skills-subgroup">
              <span class="skills-group-label">Mandatory (Core):</span>
              <div class="skills-tag-wrap">${mandatoryBadges}</div>
            </div>
            <div class="skills-subgroup">
              <span class="skills-group-label">Preferred (Bonus):</span>
              <div class="skills-tag-wrap">${preferredBadges}</div>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <span class="location-text">📍 ${this.escapeHTML(job.location)}</span>
          <a href="#checker?jobId=${encodeURIComponent(job.id)}" class="btn btn-primary btn-sm">
            Check Skill Gap ${this.getIcon('arrowRight', 14)}
          </a>
        </div>
      </article>
    `;
  },

  /**
   * Render a single row for the comparison table.
   */
  renderInternshipTableRow(job) {
    const trackClass = this.getTrackClass(job.roleTrack);
    const allowanceClass = this.getAllowanceClass(job.allowance);

    const mandatoryBadges = job.mandatorySkills.map(skill => 
      `<span class="skill-tag skill-tag-mandatory skill-tag-sm">${this.escapeHTML(skill)}</span>`
    ).join(' ');

    const preferredBadges = job.preferredSkills.map(skill => 
      `<span class="skill-tag skill-tag-preferred skill-tag-sm">${this.escapeHTML(skill)}</span>`
    ).join(' ');

    return `
      <tr>
        <td class="cell-primary">
          <div class="table-role-title">${this.escapeHTML(job.title)}</div>
          <div class="table-role-sub">${this.escapeHTML(job.company)} <span class="table-sector">(${this.escapeHTML(job.sector)})</span></div>
        </td>
        <td>
          <span class="badge badge-track ${trackClass}">${this.escapeHTML(job.roleTrack)}</span>
        </td>
        <td>
          <span class="badge badge-allowance ${allowanceClass}">${this.escapeHTML(job.allowance)}</span>
          <div class="table-salary-sub">${this.escapeHTML(job.salary)}</div>
        </td>
        <td class="cell-skills">${mandatoryBadges}</td>
        <td class="cell-skills">${preferredBadges}</td>
        <td class="cell-action">
          <a href="#checker?jobId=${encodeURIComponent(job.id)}" class="btn btn-outline btn-xs" aria-label="Check skill gap for ${this.escapeHTML(job.title)}">
            Check Gap
          </a>
        </td>
      </tr>
    `;
  },

  /**
   * Render empty state when search/filter yields 0 results.
   */
  renderEmptyState(headline, message, resetCallbackName = 'InternLensApp.resetExplorerFilters') {
    return `
      <div class="empty-state-box" role="status" aria-live="polite">
        <div class="empty-state-icon">
          ${this.getIcon('search', 40)}
        </div>
        <h3 class="empty-state-title">${this.escapeHTML(headline)}</h3>
        <p class="empty-state-text">${this.escapeHTML(message)}</p>
        <button type="button" class="btn btn-outline btn-sm" onclick="${resetCallbackName}()">
          ${this.getIcon('reset', 14)} Reset All Filters
        </button>
      </div>
    `;
  },

  /**
   * Render a metric KPI card for Market Overview.
   */
  renderMetricCard(title, value, subtitle, iconName) {
    return `
      <div class="kpi-card">
        <div class="kpi-icon-wrap">${this.getIcon(iconName, 24)}</div>
        <div class="kpi-content">
          <span class="kpi-title">${this.escapeHTML(title)}</span>
          <span class="kpi-value">${this.escapeHTML(value)}</span>
          <span class="kpi-sub">${this.escapeHTML(subtitle)}</span>
        </div>
      </div>
    `;
  },

  /**
   * Render horizontal skill frequency bar for Market Overview.
   */
  renderSkillBar(skillName, count, totalJobs) {
    const percentage = Math.round((count / totalJobs) * 100);
    return `
      <div class="skill-freq-item">
        <div class="skill-freq-header">
          <span class="skill-freq-name">${this.escapeHTML(skillName)}</span>
          <span class="skill-freq-stats">${count} listings (${percentage}%)</span>
        </div>
        <div class="skill-freq-track" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" aria-label="${this.escapeHTML(skillName)} demanded in ${percentage}% of sample">
          <div class="skill-freq-fill" style="width: ${percentage}%;"></div>
        </div>
      </div>
    `;
  }
};
