(function () {
  var overlay = document.getElementById("navOverlay");
  var drawer = document.getElementById("mobileNav");
  var openBtn = document.querySelector(".menu-toggle");
  var closeBtn = document.querySelector(".mobile-nav__close");
  var fab = document.getElementById("fabTop");

  function openNav() {
    if (overlay) overlay.classList.add("is-open");
    if (drawer) drawer.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    if (overlay) overlay.classList.remove("is-open");
    if (drawer) drawer.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (openBtn) openBtn.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
  if (overlay) overlay.addEventListener("click", closeNav);

  if (fab) {
    window.addEventListener("scroll", function () {
      fab.classList.toggle("is-visible", window.scrollY > 280);
    });
    fab.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var slides = document.querySelectorAll("[data-announce-slide]");
  var idx = 0;
  var prev = document.querySelector("[data-announce-prev]");
  var next = document.querySelector("[data-announce-next]");
  var pause = document.querySelector("[data-announce-pause]");
  var paused = false;

  function showSlide(i) {
    if (!slides.length) return;
    idx = (i + slides.length) % slides.length;
    slides.forEach(function (el, j) {
      el.style.display = j === idx ? "block" : "none";
    });
  }

  if (slides.length) {
    showSlide(0);
    if (prev)
      prev.addEventListener("click", function () {
        showSlide(idx - 1);
      });
    if (next)
      next.addEventListener("click", function () {
        showSlide(idx + 1);
      });
    if (pause)
      pause.addEventListener("click", function () {
        paused = !paused;
        pause.innerHTML = paused
          ? '<i class="fa-solid fa-play"></i>'
          : '<i class="fa-solid fa-pause"></i>';
      });

    var timer = setInterval(function () {
      if (!paused) showSlide(idx + 1);
    }, 8000);
    window.addEventListener("beforeunload", function () {
      clearInterval(timer);
    });
  }
})();
