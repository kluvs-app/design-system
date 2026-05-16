  
  // Surface toggle
  const surfaceToggle = document.getElementById('surface-toggle');
  const mainEl        = document.querySelector('.main');
  const toggleLabel   = document.getElementById('toggle-label');
  if (surfaceToggle) {
    surfaceToggle.addEventListener('click', () => {
      const isDark = mainEl.classList.toggle('dark-surface');
      toggleLabel.textContent = isDark ? 'Light surface' : 'Dark surface';
    });
  }

  // Active nav on scroll — only watch top-level section IDs
    const sections = document.querySelectorAll(
        "section[id], header[id]",
    );
    const links = document.querySelectorAll(".nav-link");

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (!e.isIntersecting) return;
                links.forEach((l) => l.classList.remove("active"));
                const match = document.querySelector(
                    `.nav-link[href="#${e.target.id}"]`,
                );
                if (match) match.classList.add("active");
            });
        },
        { rootMargin: "-15% 0px -75% 0px" },
    );

    sections.forEach((s) => io.observe(s));

    // Mobile nav drawer
    const toggle = document.getElementById("mobile-toggle");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("nav-overlay");

    function closeNav() {
        sidebar.classList.remove("open");
        overlay.classList.remove("open");
    }

    if (toggle) {
        toggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            overlay.classList.toggle("open");
        });
        overlay.addEventListener("click", closeNav);
        document
            .querySelectorAll(".nav-link")
            .forEach((l) => l.addEventListener("click", closeNav));
    }

    // Mobile kit iframe fallback — show message if kit fails to load on file://
    const frame = document.getElementById("kit-frame");
    const fallback = document.getElementById("kit-fallback");
    if (frame) {
        const timer = setTimeout(() => {
            // If page is on file:// protocol, the JSX files won't load via Babel XHR
            if (window.location.protocol === "file:") {
                frame.style.display = "none";
                fallback.style.display = "block";
            }
        }, 100);
        frame.addEventListener("load", () => clearTimeout(timer));
    }
