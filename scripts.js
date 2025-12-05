function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

ready(function(){
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
    });
  });

  const menuBtn = document.getElementById('menuBtn');
  const mainMenu = document.getElementById('main-menu');
  menuBtn && menuBtn.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    if(mainMenu.style.display === 'flex' || mainMenu.style.display === 'block'){
      mainMenu.style.display = '';
    } else {
      mainMenu.style.display = 'flex';
      mainMenu.style.flexDirection = 'column';
      mainMenu.style.gap = '12px';
    }
  });
  const themeToggle = document.getElementById('themeToggle');
  const prefer = localStorage.getItem('site-theme');
  if(prefer === 'light') document.documentElement.classList.add('light'), document.body.classList.add('light');
  themeToggle && themeToggle.addEventListener('click', function(){
    const isLight = document.body.classList.toggle('light');
    if(isLight) localStorage.setItem('site-theme','light'); else localStorage.removeItem('site-theme');
    this.setAttribute('aria-pressed', String(isLight));
  });

  const modal = document.getElementById('modal');
  const modalName = document.getElementById('modalName');
  const modalDesc = document.getElementById('modalDesc');
  const modalHero = document.getElementById('modalHero');
  const modalClose = document.getElementById('modalClose');

  document.getElementById('characterGrid').addEventListener('click', function(e){
    const btn = e.target.closest('[data-action="open-detail"]');
    if(!btn) return;
    const card = btn.closest('.character-card');
    if(!card) return;
    const name = card.dataset.name || '';
    const desc = card.dataset.desc || '';
    const img = card.dataset.img || '';
    const element = card.dataset.element || '';
    modalName.textContent = name + (element ? ` — ${element}` : '');
    modalDesc.textContent = desc;
    if(img) modalHero.style.backgroundImage = `url('${img}')`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    modalClose.focus();
  });

  modalClose.addEventListener('click', function(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  });
  modal.addEventListener('click', function(e){ if(e.target === modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); } });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && modal.classList.contains('open')){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); } });
  setTimeout(()=>{
    const toast = document.createElement('div');
    toast.textContent = 'Welcome, Traveler!';
    toast.style.position = 'fixed';
    toast.style.right = '16px';
    toast.style.bottom = '16px';
    toast.style.padding = '10px 14px';
    toast.style.background = 'rgba(11,31,58,0.9)';
    toast.style.color = '#ffcc33';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 6px 18px rgba(2,8,25,0.4)';
    document.body.appendChild(toast);
    setTimeout(()=>{ toast.style.transition = 'opacity .5s ease'; toast.style.opacity = '0'; setTimeout(()=>toast.remove(),500); }, 2800);
  }, 700);
  const dl = document.querySelector('a[download]'); if(dl && !dl.getAttribute('title')) dl.setAttribute('title','Download hero image');
});