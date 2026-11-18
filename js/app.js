/**
 * InternLens KH – Application Controller & In-Memory State Manager
 * Course: CADT Year 2 Fundamental Web Design (Term 1)
 * 
 * Strict Boundaries:
 * - Stateless & In-Memory: No localStorage, no sessionStorage, no cookies.
 * - Hash-based client routing with query param parsing.
 * - Deterministic weighted scoring engine.
 */

const InternLensApp = {
  // In-memory state (resets on full page reload)
  state: {
    currentRoute: 'overview',
    explorerFilters: {
      search: '',
      track: 'All',
      allowance: 'All',
      viewMode: 'grid' // 'grid' | 'table'
    },
    checker: {
      selectedJobId: null,
      checkedSkills: new Set()
    }
  },

  /**
   * Application bootstrap.
   */
  init() {
    window.addEventListener('hashchange', () => this.handleRouting());
    window.addEventListener('load', () => this.handleRouting());
    
    // Initial routing call in case page is already loaded
    this.handleRouting();
  },

  /**
   * Parse the hash and route to the corresponding view.
   */
  handleRouting() {
    const rawHash = window.location.hash.slice(1) || 'overview';
    const [path, queryString] = rawHash.split('?');
    const queryParams = new URLSearchParams(queryString || '');

    const validRoutes = ['overview', 'explorer', 'checker'];
    const activeRoute = validRoutes.includes(path) ? path : 'overview';
    this.state.currentRoute = activeRoute;

    // Update active nav links in header
    this.updateNavLinks(activeRoute);

    // Route dispatch
    const rootElement = document.getElementById('app-root');
    if (!rootElement) return;

    if (activeRoute === 'overview') {
      this.renderOverview(rootElement);
    } else if (activeRoute === 'explorer') {
      const trackParam = queryParams.get('track');
      if (trackParam && TRACKS.includes(trackParam)) {
        this.state.explorerFilters.track = trackParam;
      }
      this.renderExplorer(rootElement);
    } else if (activeRoute === 'checker') {
      const jobIdParam = queryParams.get('jobId');
      if (jobIdParam) {
        const found = INTERNSHIPS.find(j => j.id === jobIdParam);
        if (found) {
          if (this.state.checker.selectedJobId !== jobIdParam) {
            this.state.checker.selectedJobId = jobIdParam;
            this.state.checker.checkedSkills.clear();
          }
        }
      }
      this.renderChecker(rootElement);
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Highlight current active page link in header.
   */
  updateNavLinks(activeRoute) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const routeName = href.replace('#', '').split('?')[0];
      if (routeName === activeRoute) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  },

  // =========================================================================
  // PAGE 1: MARKET OVERVIEW (#overview)
  // =========================================================================

  renderOverview(rootElement) {
    const totalJobs = INTERNSHIPS.length;

    // Track distribution
    const trackCounts = {
      'Frontend': 0,
      'Backend/Full-Stack': 0,
      'Data/BI': 0,
      'QA/IT Support': 0
    };

    // Allowance distribution
    const allowanceCounts = {
      'Paid': 0,
      'Unpaid': 0,
      'Not Stated': 0
    };

    // Skill frequencies
    const skillFrequencyMap = {};

    INTERNSHIPS.forEach(job => {
      if (trackCounts[job.roleTrack] !== undefined) {
        trackCounts[job.roleTrack]++;
      }
      if (allowanceCounts[job.allowance] !== undefined) {
        allowanceCounts[job.allowance]++;
      }

      // Count unique skills per job
      const combinedSkills = new Set([...job.mandatorySkills, ...job.preferredSkills]);
      combinedSkills.forEach(skill => {
        skillFrequencyMap[skill] = (skillFrequencyMap[skill] || 0) + 1;
      });
    });

    // Top 8-10 skills
    const sortedSkills = Object.entries(skillFrequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const skillBarsHTML = sortedSkills.map(([skill, count]) => 
      Components.renderSkillBar(skill, count, totalJobs)
    ).join('');

    rootElement.innerHTML = `
      <section class="overview-section" aria-labelledby="overview-heading">
        <!-- Hero Introduction -->
        <div class="hero-banner">
          <div class="hero-content">
            <span class="badge badge-accent">CADT Term 1 • Fundamental Web Design</span>
            <h1 id="overview-heading" class="hero-title">InternLens KH</h1>
            <p class="hero-subtitle">
              Explore curated Phnom Penh tech internships and evaluate your academic skill readiness against industry job requirements with deterministic scoring.
            </p>
            <div class="hero-actions">
              <a href="#explorer" class="btn btn-primary">
                ${Components.getIcon('search', 16)} Explore Internships (${totalJobs})
              </a>
              <a href="#checker" class="btn btn-secondary">
                ${Components.getIcon('target', 16)} Check Skill Readiness
              </a>
            </div>
          </div>
        </div>

        <!-- Academic Disclaimer Banner -->
        <div class="disclaimer-callout" role="note">
          <div class="disclaimer-icon">${Components.getIcon('info', 20)}</div>
          <div class="disclaimer-text">
            <strong>Sample Disclaimer:</strong> Data reflects an exploratory curated sample of Phnom Penh tech internship listings (n = ${totalJobs}) collected for academic study.
          </div>
        </div>

        <!-- Metric KPI Cards -->
        <div class="kpi-grid">
          ${Components.renderMetricCard('Total Sample Postings', totalJobs, 'Phnom Penh Tech Roles', 'briefcase')}
          ${Components.renderMetricCard('Paid Compensation', `${allowanceCounts['Paid']} of ${totalJobs}`, `${Math.round((allowanceCounts['Paid'] / totalJobs) * 100)}% Offer Monthly Stipends`, 'dollar')}
          ${Components.renderMetricCard('Core Role Tracks', '4 Tracks', 'Frontend, Backend, Data, QA', 'layers')}
          ${Components.renderMetricCard('Unique Tech Skills', Object.keys(skillFrequencyMap).length, 'Mandatory & Preferred', 'target')}
        </div>

        <!-- Two Column Overview Details -->
        <div class="overview-two-col">
          <!-- Left: Track Distribution -->
          <div class="card overview-card">
            <div class="card-header">
              <h2 class="card-heading">Postings by Role Track</h2>
              <span class="card-subhead">Distribution of the ${totalJobs} curated opportunities</span>
            </div>
            <div class="card-body">
              <div class="track-summary-list">
                <a href="#explorer?track=Frontend" class="track-summary-item track-frontend-box">
                  <div class="track-info">
                    <span class="track-name">Frontend</span>
                    <span class="track-sub">HTML5, CSS3, DOM, Responsive Web</span>
                  </div>
                  <span class="track-count-badge">${trackCounts['Frontend']} roles</span>
                </a>

                <a href="#explorer?track=Backend%2FFull-Stack" class="track-summary-item track-backend-box">
                  <div class="track-info">
                    <span class="track-name">Backend / Full-Stack</span>
                    <span class="track-sub">Node.js, Python, SQL, REST APIs</span>
                  </div>
                  <span class="track-count-badge">${trackCounts['Backend/Full-Stack']} roles</span>
                </a>

                <a href="#explorer?track=Data%2FBI" class="track-summary-item track-data-box">
                  <div class="track-info">
                    <span class="track-name">Data / BI</span>
                    <span class="track-sub">SQL, Excel, Python, Power BI</span>
                  </div>
                  <span class="track-count-badge">${trackCounts['Data/BI']} roles</span>
                </a>

                <a href="#explorer?track=QA%2FIT%20Support" class="track-summary-item track-qa-box">
                  <div class="track-info">
                    <span class="track-name">QA / IT Support</span>
                    <span class="track-sub">Manual Testing, Postman, Networks</span>
                  </div>
                  <span class="track-count-badge">${trackCounts['QA/IT Support']} roles</span>
                </a>
              </div>

              <!-- Allowance Mini Distribution -->
              <div class="allowance-breakdown-box">
                <h3 class="mini-heading">Compensation Breakdown</h3>
                <div class="allowance-pills">
                  <span class="badge allowance-paid">Paid: ${allowanceCounts['Paid']} roles</span>
                  <span class="badge allowance-notstated">Stipend / Not Stated: ${allowanceCounts['Not Stated']} roles</span>
                  <span class="badge allowance-unpaid">Unpaid: ${allowanceCounts['Unpaid']} roles</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Top Demanded Skills Chart -->
          <div class="card overview-card">
            <div class="card-header">
              <h2 class="card-heading">Top 10 Demanded Skills</h2>
              <span class="card-subhead">Frequency of appearance across Phnom Penh sample</span>
            </div>
            <div class="card-body">
              <div class="skill-freq-container">
                ${skillBarsHTML}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  // =========================================================================
  // PAGE 2: INTERNSHIP EXPLORER (#explorer)
  // =========================================================================

  renderExplorer(rootElement) {
    rootElement.innerHTML = `
      <section class="explorer-section" aria-labelledby="explorer-heading">
        <div class="page-header-row">
          <div>
            <h1 id="explorer-heading" class="page-title">Internship Explorer</h1>
            <p class="page-subtitle">Search, filter, and inspect ${INTERNSHIPS.length} curated opportunities across Phnom Penh tech companies.</p>
          </div>
          <div class="view-toggle-group" role="group" aria-label="Layout view toggle">
            <button type="button" class="btn btn-icon ${this.state.explorerFilters.viewMode === 'grid' ? 'btn-active' : 'btn-outline'}" id="view-grid-btn" aria-label="Grid view">
              ${Components.getIcon('grid', 16)} <span class="btn-text-responsive">Cards</span>
            </button>
            <button type="button" class="btn btn-icon ${this.state.explorerFilters.viewMode === 'table' ? 'btn-active' : 'btn-outline'}" id="view-table-btn" aria-label="Table view">
              ${Components.getIcon('table', 16)} <span class="btn-text-responsive">Table</span>
            </button>
          </div>
        </div>

        <!-- Filter Controls Toolbar -->
        <div class="filter-toolbar card">
          <div class="filter-grid">
            <!-- Search Input -->
            <div class="filter-field search-field">
              <label for="filter-search" class="filter-label">Search Keywords</label>
              <div class="input-icon-wrap">
                <span class="input-icon">${Components.getIcon('search', 16)}</span>
                <input 
                  type="text" 
                  id="filter-search" 
                  class="form-control" 
                  placeholder="Filter by title, company, or skill..." 
                  value="${Components.escapeHTML(this.state.explorerFilters.search)}"
                  autocomplete="off"
                />
              </div>
            </div>

            <!-- Role Track Filter -->
            <div class="filter-field">
              <label for="filter-track" class="filter-label">Role Track</label>
              <select id="filter-track" class="form-control">
                <option value="All" ${this.state.explorerFilters.track === 'All' ? 'selected' : ''}>All Tracks</option>
                ${TRACKS.map(track => `
                  <option value="${Components.escapeHTML(track)}" ${this.state.explorerFilters.track === track ? 'selected' : ''}>${Components.escapeHTML(track)}</option>
                `).join('')}
              </select>
            </div>

            <!-- Allowance Filter -->
            <div class="filter-field">
              <label for="filter-allowance" class="filter-label">Compensation</label>
              <select id="filter-allowance" class="form-control">
                <option value="All" ${this.state.explorerFilters.allowance === 'All' ? 'selected' : ''}>All Allowances</option>
                ${ALLOWANCE_TYPES.map(type => `
                  <option value="${Components.escapeHTML(type)}" ${this.state.explorerFilters.allowance === type ? 'selected' : ''}>${Components.escapeHTML(type)}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Active Filter Status & Reset -->
          <div class="filter-status-row">
            <span class="filter-results-count" id="results-count">Filtering postings...</span>
            <button type="button" class="btn btn-ghost btn-xs" id="reset-filters-btn">
              ${Components.getIcon('reset', 12)} Reset Filters
            </button>
          </div>
        </div>

        <!-- Dynamic Results Container -->
        <div id="explorer-results-container" class="explorer-results-area"></div>
      </section>
    `;

    // Attach Event Listeners to Explorer controls
    this.attachExplorerListeners();

    // Render results based on current filter state
    this.updateExplorerResults();
  },

  attachExplorerListeners() {
    const searchInput = document.getElementById('filter-search');
    const trackSelect = document.getElementById('filter-track');
    const allowanceSelect = document.getElementById('filter-allowance');
    const resetBtn = document.getElementById('reset-filters-btn');
    const gridBtn = document.getElementById('view-grid-btn');
    const tableBtn = document.getElementById('view-table-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.state.explorerFilters.search = e.target.value;
        this.updateExplorerResults();
      });
    }

    if (trackSelect) {
      trackSelect.addEventListener('change', (e) => {
        this.state.explorerFilters.track = e.target.value;
        this.updateExplorerResults();
      });
    }

    if (allowanceSelect) {
      allowanceSelect.addEventListener('change', (e) => {
        this.state.explorerFilters.allowance = e.target.value;
        this.updateExplorerResults();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetExplorerFilters();
      });
    }

    if (gridBtn) {
      gridBtn.addEventListener('click', () => {
        this.state.explorerFilters.viewMode = 'grid';
        gridBtn.classList.add('btn-active');
        gridBtn.classList.remove('btn-outline');
        if (tableBtn) {
          tableBtn.classList.remove('btn-active');
          tableBtn.classList.add('btn-outline');
        }
        this.updateExplorerResults();
      });
    }

    if (tableBtn) {
      tableBtn.addEventListener('click', () => {
        this.state.explorerFilters.viewMode = 'table';
        tableBtn.classList.add('btn-active');
        tableBtn.classList.remove('btn-outline');
        if (gridBtn) {
          gridBtn.classList.remove('btn-active');
          gridBtn.classList.add('btn-outline');
        }
        this.updateExplorerResults();
      });
    }
  },

  resetExplorerFilters() {
    this.state.explorerFilters.search = '';
    this.state.explorerFilters.track = 'All';
    this.state.explorerFilters.allowance = 'All';

    const searchInput = document.getElementById('filter-search');
    const trackSelect = document.getElementById('filter-track');
    const allowanceSelect = document.getElementById('filter-allowance');

    if (searchInput) searchInput.value = '';
    if (trackSelect) trackSelect.value = 'All';
    if (allowanceSelect) allowanceSelect.value = 'All';

    this.updateExplorerResults();
  },

  updateExplorerResults() {
    const resultsContainer = document.getElementById('explorer-results-container');
    const resultsCount = document.getElementById('results-count');
    if (!resultsContainer) return;

    const searchTerm = this.state.explorerFilters.search.trim().toLowerCase();
    const trackFilter = this.state.explorerFilters.track;
    const allowanceFilter = this.state.explorerFilters.allowance;

    // Deterministic in-memory filtering
    const filteredJobs = INTERNSHIPS.filter(job => {
      // Track match
      if (trackFilter !== 'All' && job.roleTrack !== trackFilter) {
        return false;
      }

      // Allowance match
      if (allowanceFilter !== 'All' && job.allowance !== allowanceFilter) {
        return false;
      }

      // Keyword match
      if (searchTerm) {
        const titleMatch = job.title.toLowerCase().includes(searchTerm);
        const companyMatch = job.company.toLowerCase().includes(searchTerm);
        const sectorMatch = job.sector.toLowerCase().includes(searchTerm);
        const mandatorySkillMatch = job.mandatorySkills.some(skill => skill.toLowerCase().includes(searchTerm));
        const preferredSkillMatch = job.preferredSkills.some(skill => skill.toLowerCase().includes(searchTerm));

        if (!titleMatch && !companyMatch && !sectorMatch && !mandatorySkillMatch && !preferredSkillMatch) {
          return false;
        }
      }

      return true;
    });

    // Update count display
    if (resultsCount) {
      resultsCount.textContent = `Showing ${filteredJobs.length} of ${INTERNSHIPS.length} internships`;
    }

    // Zero-State Handling
    if (filteredJobs.length === 0) {
      resultsContainer.innerHTML = Components.renderEmptyState(
        'No matching internships found',
        'No roles matched your current search keywords and filter selections. Try clearing your filters or selecting a different track.'
      );
      return;
    }

    // View Rendering: Grid or Table
    if (this.state.explorerFilters.viewMode === 'grid') {
      const cardsHTML = filteredJobs.map(job => Components.renderInternshipCard(job)).join('');
      resultsContainer.innerHTML = `<div class="internships-grid">${cardsHTML}</div>`;
    } else {
      const rowsHTML = filteredJobs.map(job => Components.renderInternshipTableRow(job)).join('');
      resultsContainer.innerHTML = `
        <div class="table-responsive">
          <table class="comparison-table" aria-label="Internship Comparison Table">
            <thead>
              <tr>
                <th scope="col" style="min-width: 240px;">Role & Company</th>
                <th scope="col">Track</th>
                <th scope="col">Compensation</th>
                <th scope="col" style="min-width: 200px;">Mandatory Skills</th>
                <th scope="col" style="min-width: 200px;">Preferred Skills</th>
                <th scope="col" class="cell-action">Action</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      `;
    }
  },

  // =========================================================================
  // PAGE 3: SKILL-GAP CHECKER (#checker)
  // =========================================================================

  renderChecker(rootElement) {
    const selectedJob = INTERNSHIPS.find(j => j.id === this.state.checker.selectedJobId);

    // Group all jobs by track for organized dropdown
    const groupedOptions = TRACKS.map(track => {
      const jobsInTrack = INTERNSHIPS.filter(j => j.roleTrack === track);
      const optionsHTML = jobsInTrack.map(job => `
        <option value="${Components.escapeHTML(job.id)}" ${this.state.checker.selectedJobId === job.id ? 'selected' : ''}>
          ${Components.escapeHTML(job.company)} – ${Components.escapeHTML(job.title)}
        </option>
      `).join('');
      return `<optgroup label="${Components.escapeHTML(track)}">${optionsHTML}</optgroup>`;
    }).join('');

    rootElement.innerHTML = `
      <section class="checker-section" aria-labelledby="checker-heading">
        <div class="page-header-row">
          <div>
            <h1 id="checker-heading" class="page-title">Skill-Gap Checker</h1>
            <p class="page-subtitle">Test your current skill set against specific Phnom Penh tech internships using deterministic weighted scoring.</p>
          </div>
        </div>

        <!-- 2-Column Responsive Layout -->
        <div class="checker-two-col">
          <!-- Left Column: Form & Checkboxes -->
          <div class="checker-left-col">
            <div class="card checker-form-card">
              <!-- Step 1: Job Selector -->
              <div class="form-step-section">
                <label for="checker-job-select" class="step-label">
                  <span class="step-badge">Step 1</span> Select Target Internship:
                </label>
                <select id="checker-job-select" class="form-control form-control-lg">
                  <option value="">-- Choose an Internship to Assess --</option>
                  ${groupedOptions}
                </select>
              </div>

              <!-- Step 2: Dynamic Skill Checklist -->
              <div id="checker-skills-form-area">
                <!-- Dynamically populated or guidance prompt -->
              </div>
            </div>
          </div>

          <!-- Right Column: Live Readiness Match Report -->
          <div class="checker-right-col">
            <div id="checker-report-card" class="card checker-report-card">
              <!-- Dynamically populated report -->
            </div>
          </div>
        </div>
      </section>
    `;

    // Dropdown change listener
    const jobSelect = document.getElementById('checker-job-select');
    if (jobSelect) {
      jobSelect.addEventListener('change', (e) => {
        const newJobId = e.target.value;
        if (newJobId) {
          // Update URL hash to support browser history and deep linking
          window.location.hash = `#checker?jobId=${encodeURIComponent(newJobId)}`;
        } else {
          this.state.checker.selectedJobId = null;
          this.state.checker.checkedSkills.clear();
          window.location.hash = '#checker';
          this.renderCheckerSkillsAndReport();
        }
      });
    }

    // Render inner content
    this.renderCheckerSkillsAndReport();
  },

  renderCheckerSkillsAndReport() {
    const formArea = document.getElementById('checker-skills-form-area');
    const reportCard = document.getElementById('checker-report-card');
    if (!formArea || !reportCard) return;

    const selectedJob = INTERNSHIPS.find(j => j.id === this.state.checker.selectedJobId);

    // If no job is selected yet: Guidance default state
    if (!selectedJob) {
      formArea.innerHTML = `
        <div class="guidance-prompt-box">
          <div class="guidance-icon">${Components.getIcon('target', 32)}</div>
          <h3 class="guidance-title">No Internship Selected</h3>
          <p class="guidance-text">
            Choose an internship from the dropdown above to display its required skills and test your current readiness score.
          </p>
        </div>
      `;

      reportCard.innerHTML = `
        <div class="report-empty-state">
          <div class="report-empty-icon">${Components.getIcon('briefcase', 36)}</div>
          <h3 class="report-empty-title">Awaiting Selection</h3>
          <p class="report-empty-text">
            Your live readiness score, matched skills, and prioritized gap analysis will appear here once an internship is selected.
          </p>
          <div class="formula-explainer">
            <span class="formula-title">Scoring Formula</span>
            <code>Score = ((Matched Mandatory × 2) + (Matched Preferred × 1)) / ((Total Mandatory × 2) + (Total Preferred × 1)) × 100%</code>
          </div>
        </div>
      `;
      return;
    }

    // Job Details Summary Header
    const trackClass = Components.getTrackClass(selectedJob.roleTrack);
    const allowanceClass = Components.getAllowanceClass(selectedJob.allowance);

    // Checkbox items for Mandatory skills
    const mandatoryInputsHTML = selectedJob.mandatorySkills.map((skill, index) => {
      const inputId = `skill-mand-${index}`;
      const isChecked = this.state.checker.checkedSkills.has(skill);
      return `
        <div class="checkbox-item">
          <input 
            type="checkbox" 
            id="${inputId}" 
            class="skill-checkbox mandatory-checkbox" 
            value="${Components.escapeHTML(skill)}"
            ${isChecked ? 'checked' : ''}
          />
          <label for="${inputId}" class="checkbox-label">
            <span class="checkbox-custom-mark" aria-hidden="true">${Components.getIcon('check', 12)}</span>
            <span class="skill-name">${Components.escapeHTML(skill)}</span>
            <span class="skill-weight-tag weight-mandatory">2 pts (Mandatory)</span>
          </label>
        </div>
      `;
    }).join('');

    // Checkbox items for Preferred skills
    const preferredInputsHTML = selectedJob.preferredSkills.length > 0
      ? selectedJob.preferredSkills.map((skill, index) => {
          const inputId = `skill-pref-${index}`;
          const isChecked = this.state.checker.checkedSkills.has(skill);
          return `
            <div class="checkbox-item">
              <input 
                type="checkbox" 
                id="${inputId}" 
                class="skill-checkbox preferred-checkbox" 
                value="${Components.escapeHTML(skill)}"
                ${isChecked ? 'checked' : ''}
              />
              <label for="${inputId}" class="checkbox-label">
                <span class="checkbox-custom-mark" aria-hidden="true">${Components.getIcon('check', 12)}</span>
                <span class="skill-name">${Components.escapeHTML(skill)}</span>
                <span class="skill-weight-tag weight-preferred">1 pt (Preferred)</span>
              </label>
            </div>
          `;
        }).join('')
      : `<p class="text-muted text-sm">No optional preferred skills specified for this posting.</p>`;

    formArea.innerHTML = `
      <div class="selected-job-summary">
        <div class="summary-top-row">
          <span class="badge badge-track ${trackClass}">${Components.escapeHTML(selectedJob.roleTrack)}</span>
          <span class="badge badge-allowance ${allowanceClass}">${Components.escapeHTML(selectedJob.allowance)}</span>
        </div>
        <h2 class="summary-title">${Components.escapeHTML(selectedJob.title)}</h2>
        <div class="summary-company">${Components.escapeHTML(selectedJob.company)} • ${Components.escapeHTML(selectedJob.sector)}</div>
        <div class="summary-salary">Stipend: ${Components.escapeHTML(selectedJob.salary)}</div>
      </div>

      <!-- Step 2 Instruction & Quick Select Tools -->
      <div class="skills-form-header">
        <div>
          <span class="step-badge">Step 2</span>
          <span class="step-instruction">Check all skills you currently possess:</span>
        </div>
        <div class="batch-buttons">
          <button type="button" class="btn btn-ghost btn-xs" id="btn-select-all">Select All</button>
          <button type="button" class="btn btn-ghost btn-xs" id="btn-clear-all">Clear All</button>
        </div>
      </div>

      <form id="skills-assessment-form" onsubmit="event.preventDefault();">
        <!-- Mandatory Skills Fieldset -->
        <fieldset class="skills-fieldset mandatory-fieldset">
          <legend class="skills-legend">
            ${Components.getIcon('alert', 14)} Mandatory Core Skills (Weight: 2x)
          </legend>
          <div class="checkbox-group">
            ${mandatoryInputsHTML}
          </div>
        </fieldset>

        <!-- Preferred Skills Fieldset -->
        <fieldset class="skills-fieldset preferred-fieldset">
          <legend class="skills-legend">
            ${Components.getIcon('target', 14)} Preferred / Bonus Skills (Weight: 1x)
          </legend>
          <div class="checkbox-group">
            ${preferredInputsHTML}
          </div>
        </fieldset>
      </form>
    `;

    // Attach checkbox listeners
    const checkboxes = formArea.querySelectorAll('.skill-checkbox');
    checkboxes.forEach(box => {
      box.addEventListener('change', (e) => {
        const skill = e.target.value;
        if (e.target.checked) {
          this.state.checker.checkedSkills.add(skill);
        } else {
          this.state.checker.checkedSkills.delete(skill);
        }
        this.updateLiveReport(selectedJob);
      });
    });

    // Batch buttons
    const selectAllBtn = document.getElementById('btn-select-all');
    const clearAllBtn = document.getElementById('btn-clear-all');

    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', () => {
        selectedJob.mandatorySkills.forEach(s => this.state.checker.checkedSkills.add(s));
        selectedJob.preferredSkills.forEach(s => this.state.checker.checkedSkills.add(s));
        this.renderCheckerSkillsAndReport();
      });
    }

    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        this.state.checker.checkedSkills.clear();
        this.renderCheckerSkillsAndReport();
      });
    }

    // Initial calculation of the live report
    this.updateLiveReport(selectedJob);
  },

  /**
   * Deterministic scoring engine & live match report renderer.
   * Guarded against division-by-zero (0/0 = NaN).
   */
  updateLiveReport(job) {
    const reportCard = document.getElementById('checker-report-card');
    if (!reportCard || !job) return;

    const totalMandatory = job.mandatorySkills.length;
    const totalPreferred = job.preferredSkills.length;

    // Filter matched skills
    const matchedMandatorySkills = job.mandatorySkills.filter(s => this.state.checker.checkedSkills.has(s));
    const matchedPreferredSkills = job.preferredSkills.filter(s => this.state.checker.checkedSkills.has(s));

    // Filter missing skills
    const missingMandatorySkills = job.mandatorySkills.filter(s => !this.state.checker.checkedSkills.has(s));
    const missingPreferredSkills = job.preferredSkills.filter(s => !this.state.checker.checkedSkills.has(s));

    const matchedMandatoryCount = matchedMandatorySkills.length;
    const matchedPreferredCount = matchedPreferredSkills.length;

    // Weighted calculations
    const earnedPoints = (matchedMandatoryCount * 2) + (matchedPreferredCount * 1);
    const totalPoints = (totalMandatory * 2) + (totalPreferred * 1);

    // Division by zero guard
    const scorePercentage = totalPoints > 0 
      ? Math.round((earnedPoints / totalPoints) * 100) 
      : 0;

    // Readiness Tier Classification
    let readinessTier = {
      label: 'Preparation Required',
      class: 'tier-low',
      description: 'Critical mandatory skills are missing. Focus on the core foundational skills first.'
    };

    if (scorePercentage >= 80) {
      readinessTier = {
        label: 'Ready to Apply',
        class: 'tier-high',
        description: 'Excellent match! You possess the primary core competencies required for this position.'
      };
    } else if (scorePercentage >= 50) {
      readinessTier = {
        label: 'Good Foundation – Bridge Gaps',
        class: 'tier-mid',
        description: 'You meet multiple core prerequisites. Review the missing mandatory items before applying.'
      };
    }

    // Gauge circle stroke-dasharray math (Circumference of r=52 is 2 * PI * 52 ≈ 326.7)
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

    // Render Matched Skills List
    const allMatchedSkills = [...matchedMandatorySkills, ...matchedPreferredSkills];
    const matchedSkillsHTML = allMatchedSkills.length > 0
      ? allMatchedSkills.map(s => {
          const isMandatory = job.mandatorySkills.includes(s);
          return `
            <li class="matched-item">
              <span class="match-icon">${Components.getIcon('check', 14)}</span>
              <span class="match-name">${Components.escapeHTML(s)}</span>
              <span class="match-type-tag ${isMandatory ? 'tag-mand' : 'tag-pref'}">${isMandatory ? 'Mandatory (+2)' : 'Preferred (+1)'}</span>
            </li>
          `;
        }).join('')
      : `<p class="empty-list-note">No required skills selected yet.</p>`;

    // Render Missing Skills List: Missing Mandatory ALWAYS rendered first with high-priority warning
    let missingSkillsHTML = '';
    if (missingMandatorySkills.length === 0 && missingPreferredSkills.length === 0) {
      missingSkillsHTML = `
        <div class="all-skills-matched-banner">
          ${Components.getIcon('check', 20)}
          <div>
            <strong>100% Requirements Matched!</strong>
            <p>You have checked every mandatory and preferred skill listed for this role.</p>
          </div>
        </div>
      `;
    } else {
      const missingMandatoryHTML = missingMandatorySkills.map(s => `
        <li class="missing-item missing-item-mandatory">
          <span class="missing-icon">${Components.getIcon('alert', 14)}</span>
          <div class="missing-text-group">
            <span class="missing-name">${Components.escapeHTML(s)}</span>
            <span class="missing-badge-urgent">Mandatory – Must Acquire</span>
          </div>
        </li>
      `).join('');

      const missingPreferredHTML = missingPreferredSkills.map(s => `
        <li class="missing-item missing-item-preferred">
          <span class="missing-icon">${Components.getIcon('target', 14)}</span>
          <div class="missing-text-group">
            <span class="missing-name">${Components.escapeHTML(s)}</span>
            <span class="missing-badge-bonus">Preferred – Recommended</span>
          </div>
        </li>
      `).join('');

      missingSkillsHTML = `
        <ul class="missing-skills-list">
          ${missingMandatoryHTML}
          ${missingPreferredHTML}
        </ul>
      `;
    }

    reportCard.innerHTML = `
      <div class="report-header">
        <h2 class="report-heading">Live Readiness Score</h2>
        <span class="badge ${readinessTier.class}">${Components.escapeHTML(readinessTier.label)}</span>
      </div>

      <!-- Circular Progress Gauge -->
      <div class="gauge-display-wrap">
        <svg class="progress-ring" width="130" height="130" viewBox="0 0 130 130" aria-label="Readiness score: ${scorePercentage}%">
          <circle 
            class="progress-ring-bg" 
            stroke-width="10" 
            cx="65" 
            cy="65" 
            r="${radius}" 
            fill="transparent"
          />
          <circle 
            class="progress-ring-indicator ${readinessTier.class}" 
            stroke-width="10" 
            stroke-dasharray="${circumference}" 
            stroke-dashoffset="${strokeDashoffset}" 
            stroke-linecap="round" 
            cx="65" 
            cy="65" 
            r="${radius}" 
            fill="transparent"
          />
        </svg>
        <div class="gauge-center-text">
          <span class="gauge-percentage">${scorePercentage}%</span>
          <span class="gauge-label">Match</span>
        </div>
      </div>

      <!-- Mathematical breakdown -->
      <div class="report-points-breakdown">
        <div class="points-row">
          <span class="points-label">Weighted Score:</span>
          <strong class="points-value">${earnedPoints} / ${totalPoints} pts</strong>
        </div>
        <div class="points-sub-row">
          <span>Mandatory: ${matchedMandatoryCount}/${totalMandatory} matched (×2)</span>
          <span>Preferred: ${matchedPreferredCount}/${totalPreferred} matched (×1)</span>
        </div>
        <p class="tier-guidance-text">${Components.escapeHTML(readinessTier.description)}</p>
      </div>

      <!-- Missing Skills Breakdown (Prioritizing Mandatory) -->
      <div class="report-section missing-section">
        <h3 class="section-subheading">
          Skill Gaps (${missingMandatorySkills.length + missingPreferredSkills.length} missing)
        </h3>
        ${missingSkillsHTML}
      </div>

      <!-- Matched Skills Breakdown -->
      <div class="report-section matched-section">
        <h3 class="section-subheading">
          Matched Competencies (${allMatchedSkills.length} acquired)
        </h3>
        <ul class="matched-skills-list">
          ${matchedSkillsHTML}
        </ul>
      </div>
    `;
  }
};

// Expose on global window object for clean inline event handler support
window.InternLensApp = InternLensApp;

// Auto-run initialization
InternLensApp.init();
