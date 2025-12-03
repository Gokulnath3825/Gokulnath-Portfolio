 /* ========== Basic helpers ========== */
    const navLinks = document.querySelectorAll('.navLink');
    document.getElementById('year').textContent = new Date().getFullYear();

    // Active nav on scroll
    const sections = [...document.querySelectorAll('main .section')];
    const setActiveNav = () => {
      const y = window.scrollY + (window.innerHeight/3);
      sections.forEach(sec => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        const id = sec.id;
        const link = document.querySelector('.navLink[href="#'+id+'"]');
        if(!link) return;
        if(y >= top && y <= bottom){
          navLinks.forEach(n=>n.classList.remove('active'));
          link.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', setActiveNav);
    window.addEventListener('load', () => { setActiveNav(); revealSkillProgress(); });

    // Smooth adjustment for anchor clicks: close mobile behaviours if needed
    navLinks.forEach(a=> a.addEventListener('click', (e)=>{
      // no extra behavior needed — smooth scroll built-in
    }));

    /* ========== Dark mode toggle ========== */
    const darkToggle = document.getElementById('darkToggle');
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });

    /* ========== Typing effect (hero) ========== */
    const typingEl = document.getElementById('typingText');
    const phrases = ['Software Developer'];
    let pt = 0, pi = 0, forward = true;
    const typeLoop = () => {
      const cur = phrases[pt];
      if(forward) {
        typingEl.textContent = cur.slice(0, ++pi);
        if(pi === cur.length) { forward = false; setTimeout(typeLoop, 900); return; }
      } else {
        typingEl.textContent = cur.slice(0, --pi);
        if(pi === 0) { forward = true; pt = (pt+1)%phrases.length; }
      }
      setTimeout(typeLoop, forward ? 80 : 36);
    };
    typeLoop();

    /* ========== Skills Data + render (interactive) ========== */
    const skills = [
      {name:'JavaScript', pct:85, detail:'ES6, DOM, Fetch API, small projects'},
      {name:'Java', pct:80, detail:'Core Java, OOP, small console & GUI apps'},
      {name:'Python', pct:75, detail:'Scripting, small Flask prototypes, data parsing'},
      {name:'HTML', pct:95, detail:'Semantic HTML, accessibility basics'},
      {name:'CSS', pct:90, detail:'Layouts, Flexbox, Grid, animations'},
      {name:'C Programming', pct:70, detail:'Foundations, pointers, arrays'},
      {name:'MySQL', pct:60, detail:'Basic queries, relational design'},
      {name:'DSA (Basics)', pct:55, detail:'Arrays, linked lists, searching & sorting'}
    ];

    const grid = document.getElementById('skillGrid');
    skills.forEach((s, idx) => {
      const card = document.createElement('div');
      card.className = 'skillCard';
      card.innerHTML = `
        <h3>${s.name}</h3>
        <div class="bar"><div data-pct="${s.pct}"></div></div>
        <div class="skillDetail">${s.detail}</div>
      `;
      // click toggle detail
      card.addEventListener('click', () => {
        const det = card.querySelector('.skillDetail');
        det.style.display = det.style.display === 'block' ? 'none' : 'block';
      });
      grid.appendChild(card);
    });

    // animate bars when in view
    function revealSkillProgress(){
      const bars = document.querySelectorAll('.bar > div');
      bars.forEach(b => {
        const pct = b.getAttribute('data-pct');
        const rect = b.getBoundingClientRect();
        if(rect.top < window.innerHeight){
          b.style.width = pct + '%';
        }
      });
    }
    window.addEventListener('scroll', revealSkillProgress);

    /* ========== Contact form placeholder ========= */
    function handleContact(e){
      e.preventDefault();
      const status = document.getElementById('formStatus');
      status.textContent = 'Sending...';
      // demo: simulate send
      setTimeout(()=> {
        status.textContent = 'Message sent — I will reply soon!';
        document.getElementById('contactForm').reset();
      }, 900);
    }

    /* ========== Small accessibility: keyboard nav focus ========= */
    document.querySelectorAll('.navLink').forEach(n => n.setAttribute('tabindex', '0'));
