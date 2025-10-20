
(() => {
  // Mobile menu toggle
  const ham = document.getElementById('hamburger');
  if (ham) {
    ham.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Slideshow
  const slidesEl = document.getElementById("slides");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const dotsEl  = document.getElementById("dots");
  const playBtn = document.getElementById("play");

  const total = (window.SLIDES || []).length;
  let index = 0;
  let timer = null;
  const INTERVAL = 3500;

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
  function goTo(i){ index = (i + total) % total; update(); }
  function next(){ goTo(index + 1); }
  function prev(){ goTo(index - 1); }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // keyboard
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft")  prev();
    if (e.key.toLowerCase() === " ") toggle();
  });

  // touch
  let startX = 0, dx = 0;
  slidesEl.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, {passive:true});
  slidesEl.addEventListener("touchmove",  (e) => { dx = e.touches[0].clientX - startX; }, {passive:true});
  slidesEl.addEventListener("touchend",   () => { if (Math.abs(dx) > 40) (dx < 0 ? next() : prev()); dx = 0; });

  function start(){ if (timer) return; playBtn.classList.add('active'); playBtn.textContent = "❚❚"; timer = setInterval(next, INTERVAL); }
  function stop(){ playBtn.classList.remove('active'); playBtn.textContent = "▸"; clearInterval(timer); timer = null; }
  function toggle(){ timer ? stop() : start(); }
  playBtn.addEventListener("click", toggle);

  update();
})();
