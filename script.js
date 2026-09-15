const reels = [
  {name:"HOVEN", video:"assets/videos/hoven.mp4"},
  {name:"LENCY", video:"assets/videos/lency.mp4"},
  {name:"ADD RELISH", video:"assets/videos/add-relish.mp4"},
  {name:"FAYLASOFAH", video:"assets/videos/faylasofah.mp4"},
  {name:"ISIS", video:"assets/videos/isis.mp4"},
  {name:"BAE AGENCY", video:"assets/videos/bae-agency.mp4"}
];

const overlay = document.getElementById("reelsOverlay");
const videoOverlay = document.getElementById("videoOverlay");
const video = document.getElementById("reelVideo");
const placeholder = document.getElementById("videoPlaceholder");
const title = document.getElementById("videoTitle");
const project = document.getElementById("videoProject");
const counter = document.getElementById("videoCounter");

let current = 0;

function openOverlay(){
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden","false");
  document.body.classList.add("locked");
}
function closeOverlay(){
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden","true");
  if(!videoOverlay.classList.contains("open")) document.body.classList.remove("locked");
}
function showVideo(index){
  current = (index + reels.length) % reels.length;
  const item = reels[current];
  title.textContent = item.name;
  project.textContent = item.name;
  counter.textContent = String(current+1).padStart(2,"0")+" / 06";
  video.pause();
  video.removeAttribute("src");
  video.classList.remove("has-video");
  placeholder.style.display = "flex";
  video.src = item.video;
  video.load();
  videoOverlay.classList.add("open");
  videoOverlay.setAttribute("aria-hidden","false");
}
video.addEventListener("loadeddata",()=>{
  placeholder.style.display="none";
  video.classList.add("has-video");
});
video.addEventListener("error",()=>{
  placeholder.style.display="flex";
  video.classList.remove("has-video");
});
function closeVideo(){
  video.pause();
  videoOverlay.classList.remove("open");
  videoOverlay.setAttribute("aria-hidden","true");
  if(!overlay.classList.contains("open")) document.body.classList.remove("locked");
}
document.getElementById("openReels").addEventListener("click",openOverlay);
document.getElementById("openReelsFromNav").addEventListener("click",openOverlay);
document.getElementById("closeReels").addEventListener("click",closeOverlay);
document.getElementById("closeVideo").addEventListener("click",closeVideo);
document.querySelectorAll(".reel-card").forEach(card=>{
  card.addEventListener("click",()=>showVideo(Number(card.dataset.reel)));
});
document.getElementById("prevReel").addEventListener("click",()=>showVideo(current-1));
document.getElementById("nextReel").addEventListener("click",()=>showVideo(current+1));

document.addEventListener("keydown",(e)=>{
  if(e.key==="Escape"){
    if(videoOverlay.classList.contains("open")) closeVideo();
    else if(overlay.classList.contains("open")) closeOverlay();
  }
  if(videoOverlay.classList.contains("open")){
    if(e.key==="ArrowLeft") showVideo(current-1);
    if(e.key==="ArrowRight") showVideo(current+1);
  }
});
