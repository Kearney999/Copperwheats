class ComparisonSlider extends HTMLElement {
  connectedCallback() {
    const currentDomain = window.location.hostname;

    // --- 1. DOMAIN KILL-LIST ---
    // Add unauthorized domain names here (e.g., "stolen-site.com") to disable the slider remotely
    const blockedDomains = [
        // www.thiswebsitetoexclude.com
    ];

    if (blockedDomains.includes(currentDomain)) {
      this.style.display = 'none';
      return;
    }

    // --- 2. GOOGLE ANALYTICS TELEMETRY ---
    // Exclude local development environments so your tests don't skew your analytics
    if (currentDomain !== 'localhost' && currentDomain !== '127.0.0.1') {
      const GA_MEASUREMENT_ID = 'G-T9F1HF99BM'; 
      const GA_API_SECRET = 'S-uB6JJyQyyf6yzizwslpw';

      fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`, {
        method: 'POST',
        body: JSON.stringify({
          client_id: currentDomain,
          events: [{
            name: 'widget_impression',
            params: {
              deployed_domain: currentDomain,
              page_url: window.location.href
            }
          }]
        })
      }).catch(() => {}); // Fail silently if offline or blocked
    }

    // --- 3. ATTRIBUTE PARSING ---
    const beforeImg = this.getAttribute('before-img') || '';
    const afterImg = this.getAttribute('after-img') || '';
    const beforeAlt = this.getAttribute('before-alt') || 'Before image';
    const afterAlt = this.getAttribute('after-alt') || 'After image';
    const startPosition = this.getAttribute('start-pos') || '50';

    // --- 4. SHADOW DOM INITIALIZATION ---
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .slider-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 12px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.12);
          max-width: 900px;
          margin: 20px auto;
          box-sizing: border-box;
        }

        .image-slider-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 10px;
          user-select: none;
          box-sizing: border-box;
          aspect-ratio: 16 / 9;
        }

        .img-wrapper {
          width: 100%;
          height: 100%;
        }

        .img-wrapper img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          pointer-events: none;
        }

        .img-after {
          position: absolute;
          top: 0;
          left: 0;
          clip-path: polygon(var(--slider-pos, ${startPosition}%) 0, 100% 0, 100% 100%, var(--slider-pos, ${startPosition}%) 100%);
        }

        /* Floating Badges */
        .badge {
          position: absolute;
          top: 14px;
          z-index: 4;
          padding: 4px 12px;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          border-radius: 20px;
          pointer-events: none;
        }

        .badge-before { left: 14px; }
        .badge-after { right: 14px; }

        /* Input Controls */
        .slider-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: ew-resize;
          margin: 0;
          z-index: 10;
        }

        .slider-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: var(--slider-pos, ${startPosition}%);
          width: 3px;
          background: #ffffff;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 5;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
        }

        .slider-button {
          position: absolute;
          top: 50%;
          left: var(--slider-pos, ${startPosition}%);
          transform: translate(-50%, -50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          color: #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
          pointer-events: none;
          z-index: 6;
          transition: transform 0.1s ease;
        }

        .image-slider-container:active .slider-button {
          transform: translate(-50%, -50%) scale(1.1);
        }

        /* Discrete Credit Badge */
        .slider-footer {
          margin-top: 0px;
          margin-bottom: 0px;
          text-align: center;
          width: 100%;
        }

        .credit-link {
          font-size: 0.6rem;
          color: #94a3b8;
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 0.2px;
          transition: color 0.2s ease;
          display: inline-block;
        }

        .credit-link:hover {
          color: #0284c7;
          text-decoration: underline;
        }
      </style>

      <div class="slider-card">
        <div class="image-slider-container" style="--slider-pos: ${startPosition}%;">
          <span class="badge badge-before">Before</span>
          <span class="badge badge-after">After</span>

          <div class="img-wrapper img-before">
            <img src="${beforeImg}" alt="${beforeAlt}" />
          </div>

          <div class="img-wrapper img-after">
            <img src="${afterImg}" alt="${afterAlt}" />
          </div>

          <input 
            type="range" 
            min="0" 
            max="100" 
            value="${startPosition}" 
            class="slider-input" 
            aria-label="Image comparison slider"
          />
          <div class="slider-line"></div>
          <div class="slider-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 3 12 9 6"></polyline>
              <polyline points="15 6 21 12 15 18"></polyline>
            </svg>
          </div>
        </div>
        <div class="slider-footer">
          <a 
            href="https://www.largswebdesign.co.uk" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="credit-link"
          >
            Powered and supplied by Largs Web Design
          </a>
        </div>
      </div>
    `;

    // --- 5. INTERACTION LOGIC ---
    const sliderContainer = shadow.querySelector('.image-slider-container');
    const input = shadow.querySelector('.slider-input');

    if (input && sliderContainer) {
      input.addEventListener('input', (e) => {
        sliderContainer.style.setProperty('--slider-pos', `${e.target.value}%`);
      });
    }
  }
}

// Register custom HTML tag
customElements.define('comparison-slider', ComparisonSlider);