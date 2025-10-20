
(() => {
  const slidesEl = document.getElementById("slides");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const dotsEl  = document.getElementById("dots");
  const playBtn = document.getElementById("play");

  const total = window.SLIDES.length;
  let index = 0;
  let timer = null;
  const INTERVAL = 3500;

  // Build dots
  for (let i = 0; i < total; i++) {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Go to slide " + (i+1));
    b.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(b);
  }

  function update() {
    slidesEl.style.transform = 'translateX(' + (-index * 100) + '%)';
    Array.from(dotsEl.children).forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goTo(i) {
    index = (i + total) % total;
    update();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // Keyboard
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft")  prev();
    if (e.key.toLowerCase() === " ") togglePlay();
  });

  // Touch swipe
  let startX = 0, dx = 0;
  slidesEl.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, {passive: true});
  slidesEl.addEventListener("touchmove", (e) => {
    dx = e.touches[0].clientX - startX;
  }, {passive: true});
  slidesEl.addEventListener("touchend", () => {
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    dx = 0;
  });

  // Autoplay
  function start() {
    if (timer) return;
    playBtn.classList.add("active");
    playBtn.textContent = "❚❚";
    timer = setInterval(next, INTERVAL);
  }
  function stop() {
    playBtn.classList.remove("active");
    playBtn.textContent = "▸";
    clearInterval(timer);
    timer = null;
  }
  function togglePlay() { timer ? stop() : start(); }
  playBtn.addEventListener("click", togglePlay);

  // Pause on hover (desktop)
  const slideshow = document.getElementById("slideshow");
  slideshow.addEventListener("mouseenter", stop);
  slideshow.addEventListener("mouseleave", () => { if (playBtn.classList.contains("active")) start(); });

  // Start with first image visible and dots set
  update();
})();
