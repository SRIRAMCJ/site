const $ = (s)=>document.querySelector(s);
const $$ = (s)=>[...document.querySelectorAll(s)];
const windows = $("#windows");
let booted=false;

function boot(){
  const bar=$("#bootBar"); let p=0;
  const timer=setInterval(()=>{
    p+=Math.random()*22;
    if(p>=100){p=100;clearInterval(timer);setTimeout(()=>$("#enterBtn").classList.remove("hidden"),250)}
    bar.style.width=p+"%";
  },180);
}
boot();

$("#enterBtn").addEventListener("click",()=>{
  $("#boot").classList.add("hidden"); $("#login").classList.remove("hidden");
});
$("#loginBtn").addEventListener("click",()=>{
  $("#login").classList.add("hidden"); $("#desktop").classList.remove("hidden");
  updateClock();
});

setInterval(()=>{if(!$("#desktop").classList.contains("hidden")) updateClock()},1000);
function updateClock(){ $("#clock").textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}); }

const data={
about:{title:"About Me",html:`<h2>Sri Ram V</h2><p><b>AI Engineer</b> focused on building practical intelligent systems across Machine Learning, Generative AI, LLM applications, RAG, AI Agents, Computer Vision and NLP.</p><div class="mini-card"><h3>Education</h3><p>B.Tech in Artificial Intelligence & Data Science<br>Panimalar Engineering College, Chennai<br>2022–2026 · CGPA 7.468</p></div><div class="mini-card"><h3>Profile</h3><p>Recent B.Tech graduate with hands-on expertise in machine learning, generative AI and full-stack development. Interested in production-oriented AI systems and continuous technical learning.</p></div>`},
experience:{title:"Experience",html:`<div class="card-list"><div class="mini-card"><h3>AI Engineer — Madras MindWorks</h3><p>April 2026 – Present · Chennai</p><p>Machine learning pipelines, data preprocessing, EDA, model optimization, feature engineering, model evaluation and cross-functional delivery.</p></div><div class="mini-card"><h3>Artificial Intelligence Intern — HS WebForge</h3><p>April 2026 – June 2026</p><p>End-to-end AI solution development, algorithm design, model training, optimization, documentation and code reviews.</p></div><div class="mini-card"><h3>Full Stack Python Developer Intern — Retech Solutions</h3><p>June 2024 – August 2024</p><p>Python, Django, HTML, CSS, JavaScript, APIs, databases and production deployment.</p></div></div>`},
projects:{title:"Projects",html:`<div class="card-list"><div class="mini-card"><h3>🔍 Tamil Handwritten Character Recognition</h3><p>OCR system using Python, OpenCV, CRNN and LSTM. <b>94% accuracy</b> and <b>85% less manual data entry</b>.</p><span class="tag">Python</span><span class="tag">OpenCV</span><span class="tag">CRNN</span><span class="tag">LSTM</span></div><div class="mini-card"><h3>🚨 Multi-Hazard Disaster Detection & Response</h3><p>Deep learning system for floods, cyclones, earthquakes and landslides with <b>92% accuracy</b> and GenAI risk reports.</p><span class="tag">Deep Learning</span><span class="tag">GenAI</span><span class="tag">Real-time</span></div><div class="mini-card"><h3>₿ Cryptocurrency Market Intelligence</h3><p>CoinGecko-powered analytics for <b>500+ assets</b>, 15-minute refresh cycles and 10,000+ data points per update.</p><span class="tag">APIs</span><span class="tag">Analytics</span><span class="tag">Data Viz</span></div></div>`},
skills:{title:"Expertise",html:`<p>Core AI engineering areas:</p><div>${["AI Engineering","Generative AI","LLMs","RAG","AI Agents","Machine Learning","Deep Learning","Computer Vision","NLP","LSTM","CRNN","Multi-Modal AI","Python","JavaScript","Django","Flask","MySQL","SQL","ETL"].map(x=>`<span class="tag">${x}</span>`).join("")}</div>`},
research:{title:"Research",html:`<div class="card-list"><div class="mini-card"><h3>Artificial Intelligence in Psychological Mental Health</h3><p>SCOPUS-indexed research paper · 2026</p></div><div class="mini-card"><h3>Surfactant-Assisted Bead-Beating Analysis with Enzymatic Digestion for eDNA Recovery from Microplastic-Impacted Freshwater Matrices</h3><p>SSRG International Journal · 2026</p></div></div>`},
articles:{title:"Technical Content & Case Studies",html:`<div class="card-list"><div class="mini-card"><h3>01 · Tamil OCR for Digital Governance</h3><p>Problem framing → preprocessing → segmentation → CRNN/LSTM → Unicode mapping → measurable operational impact.</p></div><div class="mini-card"><h3>02 · Multi-Hazard AI + GenAI Reporting</h3><p>Combining detection models with Generative AI to turn hazard signals into structured risk and response information.</p></div><div class="mini-card"><h3>03 · Real-Time Cryptocurrency Intelligence</h3><p>Market-data ingestion, analytics, filtering and refresh pipelines for high-volume financial data.</p></div></div>`},
contact:{title:"Connect",html:`<h2>Let's build useful AI.</h2><p>Open the links below to connect professionally.</p><p><a href="https://www.linkedin.com/in/sri-ram-v15/" target="_blank">LinkedIn ↗</a></p><p><a href="https://github.com/SRIRAMCJ" target="_blank">GitHub ↗</a></p><p><a href="mailto:sriramv1592k4@gmail.com">sriramv1592k4@gmail.com</a></p>`},
terminal:{title:"Terminal",html:`<div class="terminal"><div id="termOut" class="terminal-output">Sri Ram V Portfolio OS\nType "help" for commands.\n\n</div><input id="termInput" class="terminal-input" autocomplete="off" placeholder=">" /></div>`},
snake:{title:"Snake",html:`<div class="snake-wrap"><p>Classic mini-game. Use arrow keys.</p><canvas id="snakeCanvas" class="snake-canvas" width="420" height="420"></canvas><br><button class="primary-btn snake-btn" id="restartSnake">Restart</button></div>`}
};

function openWindow(id){
  if(!data[id]) return;
  const existing=document.querySelector(`[data-window="${id}"]`);
  if(existing){existing.style.zIndex=40;return;}
  const w=document.createElement("section"); w.className="window"; w.dataset.window=id;
  w.innerHTML=`<div class="window-head"><b>${data[id].title}</b><div class="win-controls"><button data-min>—</button><button data-close>×</button></div></div><div class="window-body">${data[id].html}</div>`;
  windows.appendChild(w);
  w.querySelector("[data-close]").onclick=()=>w.remove();
  w.querySelector("[data-min]").onclick=()=>w.classList.toggle("hidden");
  if(id==="terminal") initTerminal(w);
  if(id==="snake") initSnake(w);
}
$$("[data-open]").forEach(b=>b.addEventListener("click",()=>openWindow(b.dataset.open)));

function initTerminal(w){
  const out=w.querySelector("#termOut"), input=w.querySelector("#termInput");
  input.focus();
  input.addEventListener("keydown",e=>{
    if(e.key!=="Enter") return;
    const cmd=input.value.trim().toLowerCase(); input.value="";
    const answers={
      help:"about  skills  projects  experience  research  contact  clear",
      about:"Sri Ram V — AI Engineer. GenAI, LLMs, RAG, AI Agents, ML, Computer Vision.",
      skills:"AI Engineering | GenAI | LLM | RAG | AI Agents | ML | DL | CV | NLP | Python",
      projects:"Tamil OCR | Multi-Hazard Disaster AI | Cryptocurrency Intelligence",
      experience:"Madras MindWorks | HS WebForge | Retech Solutions",
      research:"2 listed publications — 2026",
      contact:"sriramv1592k4@gmail.com | LinkedIn | GitHub"
    };
    if(cmd==="clear"){out.textContent="";return}
    out.textContent+=`> ${cmd}\n${answers[cmd]||"Command not found. Type help."}\n\n`;
    out.scrollTop=out.scrollHeight;
  });
}
function initSnake(w){
  const c=w.querySelector("#snakeCanvas"),ctx=c.getContext("2d"),n=21,cell=c.width/n;
  let snake,dir,food,running;
  function reset(){snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];dir={x:1,y:0};food={x:15,y:10};running=true;draw();}
  function placeFood(){food={x:Math.floor(Math.random()*n),y:Math.floor(Math.random()*n)}}
  function draw(){ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle="#0b1712";ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle="#b8f35b";snake.forEach(p=>ctx.fillRect(p.x*cell+2,p.y*cell+2,cell-4,cell-4));ctx.fillStyle="#ff8c69";ctx.fillRect(food.x*cell+3,food.y*cell+3,cell-6,cell-6)}
  function tick(){if(!running)return;let h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};if(h.x<0||h.y<0||h.x>=n||h.y>=n||snake.some(p=>p.x===h.x&&p.y===h.y)){running=false;return}snake.unshift(h);if(h.x===food.x&&h.y===food.y)placeFood();else snake.pop();draw();}
  document.onkeydown=(e)=>{const k=e.key;if(k==="ArrowUp"&&dir.y===0)dir={x:0,y:-1};if(k==="ArrowDown"&&dir.y===0)dir={x:0,y:1};if(k==="ArrowLeft"&&dir.x===0)dir={x:-1,y:0};if(k==="ArrowRight"&&dir.x===0)dir={x:1,y:0}};
  w.querySelector("#restartSnake").onclick=reset; reset(); setInterval(tick,110);
}
$("#themeBtn").addEventListener("click",()=>document.body.classList.toggle("light-ui"));
