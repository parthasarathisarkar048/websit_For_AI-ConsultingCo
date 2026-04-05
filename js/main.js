// ======================================================
// 1. CHAT WIDGET
// ======================================================

const openChatBtn = document.getElementById('open-chat');
const closeChatBtn = document.getElementById('close-chat');
const chatWidget = document.getElementById('chat-widget');
const sendChatBtn = document.getElementById('send-chat');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

openChatBtn.addEventListener('click', () => {
    chatWidget.classList.add('active');
    openChatBtn.style.opacity = '0';
});

closeChatBtn.addEventListener('click', () => {
    chatWidget.classList.remove('active');
    openChatBtn.style.opacity = '1';
});

function addMessage(text,type){
    const msg = document.createElement('div');
    msg.classList.add('message',type);
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendChatBtn.addEventListener('click',()=>{
    const text = chatInput.value.trim();
    if(!text) return;

    addMessage(text,'user');
    chatInput.value='';

    setTimeout(()=>{
        addMessage("Thanks for your message! One of our analytics experts will respond soon.","bot");
    },1000);
});

chatInput.addEventListener("keypress",(e)=>{
    if(e.key==="Enter") sendChatBtn.click();
});


// ======================================================
// 2. NAVBAR SCROLL EFFECT
// ======================================================

window.addEventListener("scroll",()=>{
    const navbar = document.querySelector(".navbar");

    if(window.scrollY>50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }
});


// ======================================================
// 3. SECTION SCROLL ANIMATION
// ======================================================

const revealElements = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.style.opacity=1;
            entry.target.style.transform="translateY(0)";
        }
    });
});

revealElements.forEach(el=>{
    el.style.opacity=0;
    el.style.transform="translateY(40px)";
    el.style.transition="all 0.9s ease";
    revealObserver.observe(el);
});


// ======================================================
// 4. INDUSTRY SWITCHER
// ======================================================

const industryData = {

bfsi:{
title:"Banking & Insurance",
desc:"Implementing high-end risk management, fraud detection, and customer segmentation models for global financial institutions.",
features:["Risk Scoring","Claims Modeling"]
},

retail:{
title:"Retail & Consumer Products",
desc:"Enhancing customer lifetime value through AI-driven demand forecasting and hyper-personalized marketing engines.",
features:["Demand Forecasting","Churn Analysis"]
},

mfg:{
title:"Manufacturing & Supply Chain",
desc:"Optimizing operations with predictive maintenance and logistics optimization algorithms.",
features:["Predictive Maintenance","Logistics IQ"]
},

tmt:{
title:"Tech, Media & Telecom",
desc:"Leveraging big data to improve user retention and optimize content delivery.",
features:["Sentiment Analysis","User Growth"]
}

};

const industryList = document.querySelectorAll(".industry-list li");
const indTitle = document.getElementById("ind-title");
const indDesc = document.getElementById("ind-desc");
const indFeatures = document.querySelector(".ind-features");

industryList.forEach(item=>{

item.addEventListener("mouseenter",()=>{

const data = industryData[item.dataset.industry];

industryList.forEach(li=>li.classList.remove("active"));
item.classList.add("active");

indTitle.textContent = data.title;
indDesc.textContent = data.desc;

indFeatures.innerHTML = data.features.map(f=>
`<span>✔ ${f}</span>`
).join("");

});

});


// ======================================================
// 5. HERO DATA NETWORK BACKGROUND
// ======================================================

const canvas = document.getElementById("data-network");
const ctx = canvas.getContext("2d");

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', initCanvas);
initCanvas();

let particles = [];
for(let i=0; i<80; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        color: `hsl(${Math.random()*360},70%,60%)`
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = p.color; // dots color

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
        ctx.fill();
    });

    // Draw the connections
    for(let i=0; i<particles.length; i++) {
        for(let j=i+1; j<particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx*dx + dy*dy);

            if(dist < 150) {
                ctx.strokeStyle = `hsla(${200 + Math.random()*60},70%,60%,${0.25 * (1 - dist/150)})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();

// ======================================================
// 6. ABOUT SECTION IMAGE SLIDER
// ======================================================
const slides = document.querySelectorAll(".about-slider");
let index = 0;

function showSlide() {
    slides.forEach((slide) => slide.classList.remove("active"));

    index++;
    if (index >= slides.length) {
        index = 0;
    }

    slides[index].classList.add("active");
}

setInterval(showSlide, 3000);
