const products=[
{id:1,emoji:"🖕",category:"prank",price:"€1.95",reviews:"★ 4.9 · 38 reviews",score:98,hook:"A BOX THAT FLIPS YOU OFF.",title:"Creative 3D Pop-Up Finger Prank Gift Box",tagA:"WHY?",tagB:"€1.95 CHAOS",bg:"linear-gradient(150deg,#ffdb58 0%,#ff7b72 56%,#ffb5cf 100%)"},
{id:2,emoji:"👽",category:"cursed",price:"€1.31",reviews:"★ 4.6 · 187 reviews",score:91,hook:"FINALLY. LEGAL ID FOR ALIENS.",title:"ZORG Alien ID Card — funny fake UFO operator license",tagA:"EARTH?",tagB:"VALID-ish",bg:"linear-gradient(150deg,#b4f0d7 0%,#63d4ad 52%,#b8a9ff 100%)"},
{id:3,emoji:"🧟",category:"cursed",price:"€1.77",reviews:"★ 5.0 · 6 reviews",score:96,hook:"YOUR COWORKER WILL LOVE THIS. PROBABLY.",title:"Mummy doll with 10 randomly colored needles — black humor prank gift",tagA:"HR SAID NO",tagB:"10 NEEDLES",bg:"linear-gradient(155deg,#d7d0ff 0%,#8b79ff 48%,#ffc7a8 100%)"},
{id:4,emoji:"👄",category:"tiny chaos",price:"€3.19",reviews:"Temu listing snapshot",score:88,hook:"WIND IT UP. RELEASE THE MOUTH.",title:"4pcs Funny Wind-Up Walking Mouth Clockwork Toys",tagA:"WALKING LIPS",tagB:"4 PACK",bg:"linear-gradient(145deg,#ffd4dc 0%,#ff6b9f 45%,#ffd567 100%)"},
{id:5,emoji:"🦖",category:"why",price:"€13.73",reviews:"★ 4.7 · 48 reviews",score:90,hook:"14 DINOSAURS. ONE TERRIBLE IDEA.",title:"14pcs Novelty Dinosaur Launcher Prank Toys",tagA:"AIRBORNE",tagB:"14×",bg:"linear-gradient(145deg,#bff6a7 0%,#6fd48a 47%,#6bbcff 100%)"},
{id:6,emoji:"🐻",category:"actually useful",price:"Temu",reviews:"mechanical · 60 min",score:73,hook:"A BEAR THAT SCREAMS WHEN DINNER IS READY.",title:"Cute Bear 60-Minute Mechanical Kitchen Timer",tagA:"TICK TICK",tagB:"NO APP",bg:"linear-gradient(145deg,#ffd9ef 0%,#ff9bcd 50%,#ffe79a 100%)"},
{id:7,emoji:"🥑",category:"kitchen crimes",price:"€4.49",reviews:"Temu public search",score:79,hook:"AVOCADOS WERE APPARENTLY TOO DIFFICULT.",title:"2-in-1 Avocado Pitter — multi-functional kitchen gadget",tagA:"2-IN-1",tagB:"PROGRESS?",bg:"linear-gradient(145deg,#d8f6a4 0%,#9ad96a 50%,#ffd489 100%)"},
{id:8,emoji:"🍅",category:"kitchen crimes",price:"€7.98",reviews:"Temu public search",score:84,hook:"A MACHINE FOR THE BURDEN OF… SLICING TOMATOES.",title:"Stainless Steel Tomato Slicer — manual fruit & vegetable cutter",tagA:"MANUAL TECH",tagB:"PERFECT SLICES",bg:"linear-gradient(145deg,#ffd3c8 0%,#ff776e 50%,#ffcf6d 100%)"},
{id:9,emoji:"🤖",category:"desk goblin",price:"Temu",reviews:"78K+ sold snapshot",score:81,hook:"YOUR FIDGET SPINNER EVOLVED.",title:"Mechanical Deformation Fidget Spinner Robot",tagA:"ROBOT?",tagB:"SPIN MODE",bg:"linear-gradient(145deg,#d7e6ff 0%,#7ca9ff 48%,#a8f0e8 100%)"},
{id:10,emoji:"🐀",category:"internet",price:"Temu",reviews:"funny possum sticker",score:86,hook:"SCREAMING IS SELF CARE.",title:"Funny Possum / Opossum Vinyl Sticker",tagA:"THERAPY?",tagB:"OPOSSUM",bg:"linear-gradient(145deg,#eee6da 0%,#c7b8a8 45%,#ffd96a 100%)"}
];

const filters=["for you","cursed","prank","kitchen crimes","actually useful","under €5"];
let currentFilter="for you";
const feed=document.querySelector("#feed");
const chips=document.querySelector("#chips");
const template=document.querySelector("#cardTemplate");
const railFill=document.querySelector("#railFill");
const toast=document.querySelector("#toast");

function temuSearch(title){
  return "https://www.temu.com/search_result.html?search_key="+encodeURIComponent(title);
}
function displayProducts(){
  if(currentFilter==="for you") return products;
  if(currentFilter==="under €5") return products.filter(p=>/^€/.test(p.price)&&Number(p.price.replace("€",""))<5);
  return products.filter(p=>p.category===currentFilter);
}
function renderChips(){
  chips.innerHTML="";
  filters.forEach(f=>{
    const b=document.createElement("button");
    b.className="chip"+(f===currentFilter?" active":"");
    b.textContent=f;
    b.onclick=()=>{currentFilter=f;renderChips();renderFeed();};
    chips.appendChild(b);
  });
}
function renderFeed(){
  feed.innerHTML="";
  const list=displayProducts();
  list.forEach((p,i)=>{
    const node=template.content.cloneNode(true);
    const card=node.querySelector(".card");
    card.dataset.id=p.id;
    card.style.setProperty("--bg",p.bg);
    card.style.setProperty("--score",p.score+"%");
    node.querySelector(".emoji-orb").textContent=p.emoji;
    node.querySelector(".category").textContent=p.category;
    node.querySelector(".rank").textContent="#"+String(i+1).padStart(2,"0")+" / "+String(list.length).padStart(2,"0");
    node.querySelector(".hook").textContent=p.hook;
    node.querySelector(".title").textContent=p.title;
    node.querySelector(".price").textContent=p.price;
    node.querySelector(".reviews").textContent=p.reviews;
    node.querySelector(".score").textContent=p.score;
    node.querySelector(".tag-a").textContent=p.tagA;
    node.querySelector(".tag-b").textContent=p.tagB;
    const buy=node.querySelector(".buy");
    buy.href=temuSearch(p.title);
    buy.onclick=()=>track("buy",p.id);
    const like=node.querySelector(".like");
    const likeCount=1100+p.score*37+p.id*111;
    like.querySelector("small").textContent=compact(likeCount);
    like.onclick=()=>toggleAction(like,"liked",p.id);
    const save=node.querySelector(".save");
    save.onclick=()=>toggleAction(save,"saved",p.id);
    node.querySelector(".share").onclick=()=>shareProduct(p);
    node.querySelector(".why").onclick=()=>showToast("Because the internet demanded it.");
    node.querySelector(".skip").onclick=()=>nextCard(card);
    feed.appendChild(node);
  });
  hydrateStates();
  setupObserver();
  feed.scrollTop=0;
}
function compact(n){return n>999?(n/1000).toFixed(1)+"K":String(n)}
function key(type,id){return "wtf:"+type+":"+id}
function toggleAction(el,type,id){
  const next=!el.classList.contains("is-on");
  el.classList.toggle("is-on",next);
  localStorage.setItem(key(type,id),next?"1":"0");
  showToast(next?(type==="saved"?"Saved for later":"You chose chaos"):"Undone");
}
function hydrateStates(){
  document.querySelectorAll(".card").forEach(card=>{
    const id=card.dataset.id;
    if(localStorage.getItem(key("liked",id))==="1") card.querySelector(".like").classList.add("is-on");
    if(localStorage.getItem(key("saved",id))==="1") card.querySelector(".save").classList.add("is-on");
  });
}
function nextCard(card){
  const n=card.nextElementSibling;
  if(n)n.scrollIntoView({behavior:"smooth"});
  else feed.firstElementChild?.scrollIntoView({behavior:"smooth"});
}
async function shareProduct(p){
  const data={title:"WTF? Look at this",text:p.hook,url:temuSearch(p.title)};
  try{if(navigator.share) await navigator.share(data); else await navigator.clipboard.writeText(data.url),showToast("Temu link copied");}
  catch(e){}
}
function showToast(msg){
  toast.textContent=msg;toast.classList.add("show");
  clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove("show"),1200);
}
function track(event,id){
  const log=JSON.parse(localStorage.getItem("wtf:events")||"[]");
  log.push({event,id,t:Date.now()});
  localStorage.setItem("wtf:events",JSON.stringify(log.slice(-200)));
}
let observer;
function setupObserver(){
  observer?.disconnect();
  const cards=[...document.querySelectorAll(".card")];
  observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting&&e.intersectionRatio>.6){
        cards.forEach(c=>c.classList.remove("is-active"));
        e.target.classList.add("is-active");
        const idx=cards.indexOf(e.target);
        railFill.style.height=((idx+1)/cards.length*100)+"%";
        track("view",e.target.dataset.id);
      }
    })
  },{root:feed,threshold:[.6]});
  cards.forEach(c=>observer.observe(c));
}
document.addEventListener("keydown",e=>{
  if(!["ArrowDown","ArrowUp"," "].includes(e.key))return;
  e.preventDefault();
  const cards=[...document.querySelectorAll(".card")];
  const active=document.querySelector(".card.is-active")||cards[0];
  let idx=cards.indexOf(active);
  idx=e.key==="ArrowUp"?Math.max(0,idx-1):Math.min(cards.length-1,idx+1);
  cards[idx]?.scrollIntoView({behavior:"smooth"});
});
document.querySelector('[data-nav="random"]').onclick=()=>{
  const cards=[...document.querySelectorAll(".card")];
  cards[Math.floor(Math.random()*cards.length)]?.scrollIntoView({behavior:"smooth"});
};
document.querySelector('[data-nav="saved"]').onclick=()=>{
  const first=[...document.querySelectorAll(".card")].find(c=>localStorage.getItem(key("saved",c.dataset.id))==="1");
  if(first) first.scrollIntoView({behavior:"smooth"}); else showToast("Save something weird first");
};
document.querySelector('[data-nav="friends"]').onclick=()=>showToast("Use ↗ on any product to send it");
document.querySelector('[data-nav="profile"]').onclick=()=>showToast("Profile comes in V2");
document.querySelector("#soundBtn").onclick=()=>showToast("Silent feed — product chaos only");

renderChips();
renderFeed();