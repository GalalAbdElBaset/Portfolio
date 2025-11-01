/***********************************************
 * Init & helpers
 ***********************************************/
document.getElementById('year').textContent = new Date().getFullYear();
AOS.init({once:true, easing: 'ease-out-cubic', duration:700});

// remove preloader
window.addEventListener('load', ()=> {
setTimeout(()=> {
    const pre = document.getElementById('preloader');
    if(pre) pre.style.opacity = '0';
    setTimeout(()=> pre && pre.remove(), 600);
}, 700);
});

// Typing effect
(function typing(){
const el = document.getElementById('typingLine');
const texts = [
    "Hi, I'm Galal Abdelbaset — Front-End Developer 💻",
    "I build modern, fast & accessible web experiences.",
    "JavaScript · React · Performance"
];
let idx = 0, char = 0, forward = true;
function step() {
    const t = texts[idx];
    el.textContent = t.slice(0,char);
    if(forward){ char++; if(char>t.length){ forward=false; setTimeout(step,1200); return } }
    else { char--; if(char===0){ forward=true; idx=(idx+1)%texts.length } }
    setTimeout(step, forward?60:24);
}
step();
})();

/***********************************************
 * Theme toggle (floating) + save in localStorage
 ***********************************************/
const themeFloat = document.getElementById('themeFloat');
const themeIcon = document.getElementById('themeIcon');
const bodyEl = document.body;
const saved = localStorage.getItem('site-theme');
if(saved === 'light'){ bodyEl.classList.add('light'); themeIcon.className = 'fa-solid fa-sun'; themeFloat.setAttribute('aria-pressed','true'); }
updateThemeFloat();

themeFloat.addEventListener('click', ()=>{
bodyEl.classList.toggle('light');
const isLight = bodyEl.classList.contains('light');
localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
updateThemeFloat();
bodyEl.style.transition = 'background 450ms ease, color 450ms ease';
});

function updateThemeFloat(){
const isLight = bodyEl.classList.contains('light');
themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
themeFloat.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
themeFloat.setAttribute('aria-pressed', isLight ? 'true' : 'false');
}

// Accent buttons
document.querySelectorAll('.palette').forEach(btn=>{
btn.addEventListener('click', ()=> {
    const c = btn.dataset.color;
    document.documentElement.style.setProperty('--accent', c);
    if(c === '#ef4444') document.documentElement.style.setProperty('--accent-2', '#f97316');
    else if(c === '#10b981') document.documentElement.style.setProperty('--accent-2', '#06b6d4');
    else document.documentElement.style.setProperty('--accent-2', '#8b5cf6');
});
});

/***********************************************
 * Header scroll behavior & back-to-top
 ***********************************************/
const header = document.getElementById('siteHeader');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', ()=>{
const y = window.scrollY;
if(y > 20){
    header.style.backdropFilter = 'blur(6px)';
    header.style.background = 'rgba(2,6,23,0.55)';
    header.style.boxShadow = '0 8px 30px rgba(2,6,23,0.35)';
} else {
    header.style.backdropFilter = 'none';
    header.style.background = 'transparent';
    header.style.boxShadow = 'none';
}
backToTop.style.display = (y > 600) ? 'block' : 'none';
});
backToTop.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

/***********************************************
 * Avatar parallax
 ***********************************************/
const avatar = document.getElementById('avatar');
if(avatar){
avatar.addEventListener('mousemove', (e)=>{
    const r = avatar.getBoundingClientRect();
    const cx = r.left + r.width/2;
    const cy = r.top + r.height/2;
    const dx = (e.clientX - cx) / r.width;
    const dy = (e.clientY - cy) / r.height;
    avatar.style.transform = `translate3d(${dx*8}px, ${dy*8}px, 0) rotateX(${dy*6}deg) rotateY(${dx*6}deg)`;
    const img = avatar.querySelector('img');
    if(img) img.style.transform = `scale(1.07) translate3d(${dx*6}px, ${dy*6}px, 0)`;
});
avatar.addEventListener('mouseleave', ()=> {
    avatar.style.transform = '';
    const img = avatar.querySelector('img');
    if(img) img.style.transform = '';
});
}

/***********************************************
 * Skills animate with IntersectionObserver
 ***********************************************/
const skills = document.querySelectorAll('.skill');
const skillsObs = new IntersectionObserver((entries)=>{
entries.forEach(en=>{
    if(en.isIntersecting){
    const el = en.target;
    const val = +el.dataset.skill || 70;
    const bar = el.querySelector('.bar > i');
    bar.style.transform = 'scaleX(' + (val/100) + ')';
    }
});
}, {threshold:0.3});
skills.forEach(s=>skillsObs.observe(s));

/***********************************************
 * Testimonials slider
 ***********************************************/
(function testiSlider(){
const list = document.getElementById('testiList');
if(!list) return;
let idx = 0;
const items = list.children;
const total = items.length;
list.style.width = (100 * total) + '%';
Array.from(items).forEach(it => it.style.width = (100/total) + '%');
setInterval(()=>{
    idx = (idx + 1) % total;
    list.style.transform = 'translateX(' + (-idx * 100) + '%)';
},5000);
})();

/***********************************************
 * Project modal
 ***********************************************/
function openProjectModal(e,btn){
const projectCard = btn.closest('.project');
const data = JSON.parse(projectCard.getAttribute('data-project') || '{}');
const modal = document.getElementById('projectModal');
const content = document.getElementById('modalContent');
content.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 320px;gap:18px">
    <div>
        <img src="${data.img}" alt="${data.title}" style="width:100%;height:240px;object-fit:cover;border-radius:10px;margin-bottom:10px">
        <h3>${data.title}</h3>
        <p class="muted">${data.desc}</p>
        <div style="height:10px"></div>
        <a href="${data.live}" target="_blank" class="btn-mini"><i class="fa-solid fa-arrow-up-right-from-square"></i> View Live</a>
        <a href="${data.code}" target="_blank" class="btn-mini" style="margin-left:8px"><i class="fa-solid fa-code"></i> View Code</a>
    </div>
    <div style="padding:8px">
        <h4>Details</h4>
        <p class="muted">Technologies: HTML · CSS · JS</p>
        <p class="muted">Role: Front-end</p>
        <p class="muted">Year: 2025</p>
    </div>
    </div>
`;
modal.style.display = 'flex';
setTimeout(()=> modal.style.opacity = '1',20);
}
function closeProjectModal(){
const modal = document.getElementById('projectModal');
modal.style.opacity = '0';
setTimeout(()=> modal.style.display = 'none',220);
}
document.getElementById('projectModal').addEventListener('click', (e)=>{
if(e.target.id === 'projectModal') closeProjectModal();
});

/***********************************************
 * Cursor trail
 ***********************************************/
const cursorDot = document.getElementById('cursorDot');
window.addEventListener('mousemove', (e)=>{
cursorDot.style.left = (e.clientX - 8) + 'px';
cursorDot.style.top = (e.clientY - 8) + 'px';
cursorDot.style.width = '16px';
cursorDot.style.height = '16px';
cursorDot.style.borderRadius = '50%';
cursorDot.style.background = 'linear-gradient(90deg,var(--accent),var(--accent-2))';
cursorDot.style.boxShadow = '0 8px 30px rgba(59,130,246,0.12)';
cursorDot.style.transform = 'translateZ(0) scale(1)';
});
window.addEventListener('mouseleave', ()=> {
cursorDot.style.transform = 'scale(0.2)';
cursorDot.style.opacity = '0.6';
});

/***********************************************
 * EmailJS (placeholder) + SweetAlert2
 ***********************************************/
(function emailJsSetup(){
// Replace these with your EmailJS details:
const EMAILJS_SERVICE_ID = "service_t7iw30t";
const EMAILJS_TEMPLATE_ID = "template_a9xdpk9";
const EMAILJS_PUBLIC_KEY = "WynlS30VWiIW1B0sN";

if(window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"){
    emailjs.init(EMAILJS_PUBLIC_KEY);
} else {
    console.warn('EmailJS not initialized — replace placeholders to enable sending.');
}

const form = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
const sendSpinner = document.getElementById('sendSpinner');
const sendText = sendBtn.querySelector('.sendText');

form.addEventListener('submit', function(e){
    e.preventDefault();
    sendBtn.classList.add('loading');
    sendText.textContent = 'Sending...';
    sendSpinner.style.display = 'inline-block';
    sendBtn.disabled = true;

    const templateParams = {
    from_name: document.getElementById('name').value,
    reply_to: document.getElementById('email').value,
    message: document.getElementById('message').value
    };

    if(window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"){
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function(response) {
        sendBtn.classList.remove('loading');
        sendText.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        sendSpinner.style.display = 'none';
        sendBtn.disabled = false;
        form.reset();
        Swal.fire({ title: 'Thank you! 🎉', html: `Thank you for your message. I’ll get back to you as soon as possible 😊`, icon: 'success', confirmButtonColor: getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#3b82f6' });
    }, function(error) {
        sendBtn.classList.remove('loading');
        sendText.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        sendSpinner.style.display = 'none';
        sendBtn.disabled = false;
        console.error('EmailJS Error:', error);
        Swal.fire({ title: 'Oops...', text: 'Something went wrong while sending the message. Please try again later or email me directly.', icon: 'error' });
    });
    } else {
    sendBtn.classList.remove('loading');
    sendText.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    sendSpinner.style.display = 'none';
    sendBtn.disabled = false;
    Swal.fire({ title: 'Not configured', html: `Email isn't configured yet. Replace EmailJS placeholders in the script with SERVICE_ID, TEMPLATE_ID and PUBLIC_KEY.`, icon: 'info' });
    }
});
})();

/***********************************************
 * Accessibility: focus outlines for keyboard users
 ***********************************************/
document.addEventListener('keyup', (e)=>{
if(e.key === 'Tab') document.body.classList.add('show-focus-outlines');
});