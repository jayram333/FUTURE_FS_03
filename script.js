'use strict';

/* ---- NAVBAR SCROLL ---- */
const navbar=document.getElementById('navbar');
const btt=document.getElementById('btt');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY>60);
  btt.classList.toggle('on',window.scrollY>400);
  highlightNav();
});
btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){
      e.preventDefault();
      window.scrollTo({top:t.offsetTop-75,behavior:'smooth'});
      document.getElementById('navLinks').classList.remove('open');
    }
  });
});

/* ---- HAMBURGER ---- */
const ham=document.getElementById('ham');
const navLinks=document.getElementById('navLinks');
ham.addEventListener('click',()=>navLinks.classList.toggle('open'));

/* ---- HIGHLIGHT NAV ---- */
function highlightNav(){
  document.querySelectorAll('section[id]').forEach(s=>{
    const top=s.offsetTop-120;
    const bot=top+s.offsetHeight;
    if(window.scrollY>=top&&window.scrollY<bot){
      document.querySelectorAll('.nav-links a').forEach(a=>{
        a.style.color=a.getAttribute('href')==='#'+s.id?'var(--blue)':'';
      });
    }
  });
}

/* ---- LOGIN MODAL ---- */
const modalBg=document.getElementById('modalBg');
const openLogin=document.getElementById('openLogin');
const modalClose=document.getElementById('modalClose');

openLogin.addEventListener('click',()=>modalBg.classList.add('open'));
modalClose.addEventListener('click',()=>modalBg.classList.remove('open'));
modalBg.addEventListener('click',e=>{if(e.target===modalBg)modalBg.classList.remove('open');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')modalBg.classList.remove('open');});

document.getElementById('loginForm').addEventListener('submit',e=>{
  e.preventDefault();
  const btn=e.target.querySelector('.btn-login');
  btn.textContent='SigningIn...';
  btn.disabled=true;
  setTimeout(()=>{
    modalBg.classList.remove('open');
    btn.textContent='SignIn';
    btn.disabled=false;
    openLogin.innerHTML='<i class="fas fa-user-check"></i>LoggedIn';
    openLogin.style.borderColor='#00ff88';
    openLogin.style.color='#00ff88';
    showToast('LoginSuccessful!Welcome.');
  },1500);
});

document.getElementById('goSignup').addEventListener('click',e=>{
  e.preventDefault();
  const h=document.querySelector('.modal h2');
  const p=document.querySelector('.modal>p');
  h.textContent='CreateAccount';
  p.textContent='SignUpToBookAppointments';
});

/* ---- TABS ---- */
document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tp').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    const panel=document.getElementById('tp-'+btn.dataset.t);
    if(panel)panel.classList.add('active');
  });
});

/* ---- CONTACT FORM ---- */
document.getElementById('cForm').addEventListener('submit',e=>{
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');
  btn.textContent='Booking...';
  btn.disabled=true;
  setTimeout(()=>{
    btn.innerHTML='<i class="fas fa-calendar-check"></i>ConfirmBooking';
    btn.disabled=false;
    e.target.reset();
    showToast('AppointmentBooked!WellCallYouSoon.');
  },1600);
});

/* ---- TOAST ---- */
function showToast(msg){
  const t=document.getElementById('toast');
  t.querySelector('span').textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),4000);
}

/* ---- GALLERY LIGHTBOX ---- */
document.querySelectorAll('.gi').forEach(g=>{
  g.addEventListener('click',()=>{
    const src=g.querySelector('img').src;
    const cap=g.querySelector('.gcap')?.textContent||'';
    const ov=document.createElement('div');
    ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(2,13,20,.96);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;cursor:pointer;';
    const img=document.createElement('img');
    img.src=src;
    img.style.cssText='max-width:90vw;max-height:80vh;object-fit:contain;border:2px solid #00cfff;';
    const p=document.createElement('p');
    p.textContent=cap;
    p.style.cssText='font-family:Playfair Display,serif;font-style:italic;font-size:1.1rem;color:#00cfff;margin-top:1rem;';
    const x=document.createElement('button');
    x.innerHTML='✕';
    x.style.cssText='position:absolute;top:1.5rem;right:1.5rem;color:#fff;font-size:1.4rem;background:none;border:1px solid rgba(0,207,255,.4);width:40px;height:40px;cursor:pointer;display:flex;align-items:center;justify-content:center;';
    ov.append(x,img,p);
    document.body.appendChild(ov);
    const close=()=>ov.remove();
    ov.addEventListener('click',e=>{if(e.target===ov||e.target===x)close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();},{once:true});
  });
});

/* ---- NEWSLETTER ---- */
const nfBtn=document.querySelector('.nf button');
const nfIn=document.querySelector('.nf input');
if(nfBtn){
  nfBtn.addEventListener('click',()=>{
    if(nfIn.value.includes('@')){
      nfBtn.innerHTML='<i class="fas fa-check"></i>';
      nfIn.value='';
      setTimeout(()=>{nfBtn.innerHTML='<i class="fas fa-paper-plane"></i>';},3000);
    }else{
      nfIn.style.borderColor='#f44';
      setTimeout(()=>{nfIn.style.borderColor='';},2000);
    }
  });
}
