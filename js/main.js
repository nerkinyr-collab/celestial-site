// Celestial — starfield + nav + reveal
(function(){
  // ---- starfield ----
  const cv = document.getElementById('stars');
  if (cv) {
    const ctx = cv.getContext('2d');
    let W, H, stars = [], t = 0;
    function resize(){
      W = cv.width = innerWidth; H = cv.height = innerHeight;
      stars = Array.from({length: Math.min(160, W/8)}, () => ({
        x: Math.random()*W, y: Math.random()*H,
        r: Math.random()*1.3 + .3,
        s: Math.random()*.25 + .05,
        tw: Math.random()*Math.PI*2
      }));
    }
    resize(); addEventListener('resize', resize);
    (function draw(){
      ctx.clearRect(0,0,W,H);
      t += .012;
      for (const st of stars){
        st.y -= st.s; if (st.y < -4){ st.y = H+4; st.x = Math.random()*W; }
        const a = .35 + .55*Math.abs(Math.sin(st.tw + t));
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, 6.283);
        ctx.fillStyle = st.r > 1 ? 'rgba(167,139,250,'+a+')' : 'rgba(255,255,255,'+a*.8+')';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    })();
  }

  // ---- nav burger ----
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');
  if (burger && links){
    burger.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // ---- reveal on scroll ----
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); } });
  }, {threshold: .12});
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
})();