
  // Stamp version into every [data-version] element from version.js
  if (window.KLUVS_VERSION) {
    document.querySelectorAll('[data-version]').forEach(el => {
      el.textContent = 'v' + window.KLUVS_VERSION;
    });
  }

  // Surface toggle — default is dark (class set on <main> in HTML)
  const surfaceToggle = document.getElementById('surface-toggle');
  const mainEl        = document.querySelector('.main');
  const toggleLabel   = document.getElementById('toggle-label');

  function updateToggleLabel() {
    const isDark = mainEl.classList.contains('dark-surface');
    toggleLabel.textContent = isDark ? 'Light surface' : 'Dark surface';
  }

  if (surfaceToggle) {
    surfaceToggle.addEventListener('click', () => {
      mainEl.classList.toggle('dark-surface');
      updateToggleLabel();
    });
    updateToggleLabel(); // sync label on load
  }

  // Active nav on scroll — only watch top-level section IDs
  const sections = document.querySelectorAll('section[id], header[id]');
  const links    = document.querySelectorAll('.nav-link');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (match) match.classList.add('active');
    });
  }, { rootMargin: '-15% 0px -75% 0px' });

  sections.forEach(s => io.observe(s));

  // Preview Loader — Embeds preview/*.html files into placeholders
  // <div class="preview-embed" data-preview="components-buttons"></div>
  const embeds = document.querySelectorAll('.preview-embed');
  
  embeds.forEach(async el => {
    const name = el.getAttribute('data-preview');
    if (!name) return;

    try {
      const response = await fetch(`preview/${name}.html`);
      const html     = await response.text();
      
      // Fix asset paths for production (Vercel) and root-level injection
      // Replaces "../assets/" with "assets/"
      const fixedHtml = html.replace(/\.\.\/assets\//g, 'assets/');
      
      const parser   = new DOMParser();
      const doc      = parser.parseFromString(fixedHtml, 'text/html');
      
      // Create shadow root for isolation
      const shadow = el.attachShadow({ mode: 'open' });
      
      // Inject CSS into shadow root
      const link = document.createElement('link');
      link.rel   = 'stylesheet';
      link.href  = 'colors_and_type.css';
      shadow.appendChild(link);
      
      // Inject preview styles
      const styles = doc.querySelectorAll('style');
      styles.forEach(s => shadow.appendChild(s.cloneNode(true)));
      
      // Inject preview body content
      const container = document.createElement('div');
      container.innerHTML = doc.body.innerHTML;
      shadow.appendChild(container);

      // Handle surface toggling for the embedded content
      const syncSurface = () => {
        const isDark = mainEl.classList.contains('dark-surface');
        container.setAttribute('data-surface', isDark ? 'dark' : 'light');
      };
      
      // Initial sync and listen for site-wide toggle
      syncSurface();
      surfaceToggle.addEventListener('click', syncSurface);

    } catch (err) {
      console.error(`Failed to load preview: ${name}`, err);
      el.textContent = `Error loading preview: ${name}`;
    }
  });

  // Mobile nav drawer
  const toggle   = document.getElementById('mobile-toggle');
  const sidebar  = document.querySelector('.sidebar');
  const overlay  = document.getElementById('nav-overlay');

  function closeNav() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    overlay.addEventListener('click', closeNav);
    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeNav));
  }

  // Mobile kit iframe fallback
  const frame    = document.getElementById('kit-frame');
  const fallback = document.getElementById('kit-fallback');
  if (frame) {
    const timer = setTimeout(() => {
      if (window.location.protocol === 'file:') {
        frame.style.display = 'none';
        fallback.style.display = 'block';
      }
    }, 100);
    frame.addEventListener('load', () => clearTimeout(timer));
  }
