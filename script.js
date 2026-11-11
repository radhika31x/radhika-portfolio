
document.addEventListener("DOMContentLoaded", () => {

  // MOBILE MENU
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-pill");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  }

  // SCROLL PROGRESS BAR
  let progressBar = document.getElementById("scroll-progress");

  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.id = "scroll-progress";
    document.body.appendChild(progressBar);
  }

  function updateProgress() {
    const scrollTop = window.scrollY;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0
      ? (scrollTop / scrollHeight) * 100
      : 0;

    progressBar.style.width = progress + "%";
  }

  window.addEventListener("scroll", updateProgress);
  updateProgress();

  // SCROLL REVEAL ANIMATION
  const animationTargets = document.querySelectorAll(
    ".section-kicker, .section-heading, .about-grid, .stats, " +
    ".education-card, .skill-card, .project-card, " +
    ".achievement-card, .certificate-card, .contact h2, " +
    ".contact > p, .contact > .button-primary, .socials"
  );

  animationTargets.forEach((element, index) => {
    element.classList.add("reveal-animate");

    if (
      element.classList.contains("skill-card") ||
      element.classList.contains("project-card") ||
      element.classList.contains("certificate-card")
    ) {
      element.style.transitionDelay = (index % 4) * 100 + "ms";
    }
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show", "visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    animationTargets.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    animationTargets.forEach(element => {
      element.classList.add("show", "visible");
    });
  }

  // TYPING ANIMATION
  const typingElement = document.querySelector(".typing-text");

  if (typingElement) {
    const words = [
      "Aspiring Data Analyst",
      "Python Enthusiast",
      "Data Visualization Learner",
      "Problem Solver"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (deleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typingElement.textContent = currentWord.substring(0, charIndex);

      let speed = deleting ? 50 : 100;

      if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1300;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  // ANIMATED STATS COUNTER
  const counters = document.querySelectorAll("[data-count]");

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.count);

        if (!Number.isFinite(target)) return;

        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(target * eased);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // CUSTOM CURSOR GLOW
  if (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";
    document.body.appendChild(cursorGlow);

    window.addEventListener("mousemove", event => {
      cursorGlow.style.left = event.clientX + "px";
      cursorGlow.style.top = event.clientY + "px";
      cursorGlow.classList.add("active");
    });

    document.addEventListener("mouseleave", () => {
      cursorGlow.classList.remove("active");
    });
  }

  // CERTIFICATE POPUP
  const certificateImages = document.querySelectorAll(
    ".certificate-card img"
  );

  if (certificateImages.length) {
    const lightbox = document.createElement("div");
    lightbox.className = "certificate-lightbox";

    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <img src="" alt="Certificate preview">
    `;

    document.body.appendChild(lightbox);

    const previewImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".lightbox-close");

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    certificateImages.forEach(img => {
      img.style.cursor = "zoom-in";

      img.addEventListener("click", event => {
        event.preventDefault();
        previewImage.src = img.currentSrc || img.src;
        previewImage.alt = img.alt || "Certificate preview";
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    });
  }

  // BACK TO TOP BUTTON
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.type = "button";
  backToTop.innerHTML = "↑";
  backToTop.setAttribute("aria-label", "Back to top");
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // LOADING SCREEN
  const loader = document.querySelector(".page-loader");

  if (loader) {
    const hideLoader = () => {
      loader.classList.add("loaded");

      setTimeout(() => {
        loader.remove();
      }, 700);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
    }
  }

});
