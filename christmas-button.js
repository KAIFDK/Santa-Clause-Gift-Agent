export class ChristmasButton {
    constructor(options = {}) {
        this.onClick = options.onClick || (() => { });
        this.text = options.text || 'Click Me';
        this.containerId = options.containerId || 'button-container';
        this.init();
    }

    init() {
        this.createButton();
        this.addEventListeners();
    }

    createButton() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container with id "${this.containerId}" not found`);
            return;
        }

        const button = document.createElement('button');
        button.className = 'christmas-button';

        // Create snowflakes
        const snowflakesHTML = this.createSnowflakes();

        // Create holly decoration
        const hollyHTML = this.createHolly();

        // Create stars
        const starsHTML = this.createStars();

        // Create button content
        const buttonContent = `
      <div class="button-border"></div>
      <div class="button-inner-glow"></div>
      
      ${snowflakesHTML}
      ${hollyHTML}
      ${starsHTML}
      
      <span class="button-text">
        <svg viewBox="0 0 24 24" class="button-ornament" fill="currentColor">
          <circle cx="12" cy="14" r="8" class="fill-accent" />
          <rect x="10" y="4" width="4" height="4" rx="1" class="fill-accent" />
          <path d="M12 8v2" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="12" cy="14" rx="6" ry="4" class="fill-accent-light" />
        </svg>
        ${this.text}
        <svg viewBox="0 0 24 24" class="button-candy-cane">
          <path
            d="M14.5 4C14.5 4 18 4 18 8C18 12 14 12 14 12L6 20"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14.5 4C14.5 4 18 4 18 8C18 12 14 12 14 12L6 20"
            stroke="rgba(200, 50, 50, 0.5)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 4"
            fill="none"
          />
        </svg>
      </span>
      
      <div class="button-frost"></div>
    `;

        button.innerHTML = buttonContent;
        button.addEventListener('click', () => this.onClick());

        this.button = button;
        this.isHovered = false;

        container.appendChild(button);
    }

    createSnowflakes() {
        const snowflakes = [
            { delay: 0, left: 10, size: 8 },
            { delay: 0.5, left: 25, size: 10 },
            { delay: 1, left: 45, size: 6 },
            { delay: 1.5, left: 65, size: 9 },
            { delay: 2, left: 80, size: 7 },
            { delay: 0.3, left: 35, size: 8 },
            { delay: 1.2, left: 55, size: 6 },
            { delay: 0.8, left: 90, size: 10 },
        ];

        return snowflakes.map(flake => `
      <div class="snowflake" style="left: ${flake.left}%; animation-delay: ${flake.delay}s;">
        <svg width="${flake.size}" height="${flake.size}" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      </div>
    `).join('');
    }

    createHolly() {
        return `
      <div class="holly-decoration">
        <svg viewBox="0 0 40 40">
          <ellipse cx="14" cy="20" rx="8" ry="5" transform="rotate(-30 14 20)" class="holly-leaf" />
          <ellipse cx="26" cy="20" rx="8" ry="5" transform="rotate(30 26 20)" class="holly-leaf" />
          <circle cx="20" cy="14" r="4" class="holly-berry" />
          <circle cx="16" cy="18" r="3" class="holly-berry" />
          <circle cx="24" cy="18" r="3" class="holly-berry" />
          <circle cx="19" cy="13" r="1" class="holly-highlight" />
          <circle cx="15" cy="17" r="0.8" class="holly-highlight" />
          <circle cx="23" cy="17" r="0.8" class="holly-highlight" />
        </svg>
      </div>
    `;
    }

    createStars() {
        return `
      <svg class="button-star button-star-left" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
      </svg>
      <svg class="button-star button-star-right" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
      </svg>
    `;
    }

    addEventListeners() {
        this.button.addEventListener('mouseenter', () => this.setHovered(true));
        this.button.addEventListener('mouseleave', () => this.setHovered(false));
    }

    setHovered(hovered) {
        this.isHovered = hovered;
        if (hovered) {
            this.button.classList.add('hovered');
        } else {
            this.button.classList.remove('hovered');
        }
    }
}
