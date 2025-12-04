document.addEventListener("DOMContentLoaded", () => {
  const mainPainting = document.getElementById('main-painting');
  const carouselBox = document.getElementById('carousel-box');
  const modal = document.getElementById('carousel-modal');
  const modalImg = document.getElementById('carousel-modal-img');
  const modalClose = document.getElementById('carousel-modal-close');

  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id")) || 1;
  const paintingData = paintings.find(p => p.id === id);

  if(paintingData){
    mainPainting.src = paintingData.img;
    mainPainting.addEventListener('click', ()=> openModal(paintingData.img));

    if(carouselBox){
      carouselBox.innerHTML = "";
      const variants = paintingData.variations || [paintingData.img];
      variants.forEach(src=>{
        const img = document.createElement("img");
        img.src = src;
        img.alt = paintingData.title;
        img.addEventListener('click', ()=>{
          mainPainting.src = src;
          openModal(src);
        });
        carouselBox.appendChild(img);
      });
    }
  }

  function openModal(src){
    modal.style.display = 'flex';
    modalImg.src = src;
  }

  modalClose.addEventListener('click', ()=> modal.style.display='none');
  modal.addEventListener('click', e=>{ if(e.target===modal) modal.style.display='none'; });
});

/// ================= VIDEO DATA =================
const videos = [
  {
    title: "პირველი ნახატი",
    src: "gal-vid.mp4",
    thumbnail: "thumbnails/thumb1.jpg"
  },
  {
    title: "მეორე",
    src: "gal-vid.mp4",
    thumbnail: "thumbnails/thumb2.jpg"
  },
  {
    title: "მეორე",
    src: "gal-vid.mp4",
    thumbnail: "thumbnails/thumb2.jpg"
  },
];

// ================= RENDER FUNCTION =================
function renderVideos() {
  const container = document.getElementById("video-list");
  container.innerHTML = "";

  videos.forEach(item => {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
      <div class="video-thumb">
        <video 
          src="${item.src}" 
          poster="${item.thumbnail}" 
          controls
          preload="metadata"
        ></video>
      </div>
      <h3 class="video-title">${item.title}</h3>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderVideos);
