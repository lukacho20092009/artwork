let startX = 0;
let endX = 0;

let currentModalMediaList = []; // NEW: List of all media URLs for the current product
let currentModalIndex = 0;      // NEW: Index of the currently displayed media in the modal

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const modal = document.getElementById('modal');
  const isModalOpen = modal && modal.style.display === "block";

  const diffX = endX - startX;

  if (Math.abs(diffX) > 50) { 
    if (isModalOpen && currentModalMediaList.length > 1) { // If modal is open and has multiple items, handle modal swipe
        if (diffX > 0) { // Swipe right -> Previous
            showPrevMedia();
        } else { // Swipe left -> Next
            showNextMedia();
        }
    } else {
        // Original history navigation logic
        if (diffX > 0) {
          window.history.back();
        } else {
          window.history.forward();
        }
    }
}
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.gallery": "Gallery",
    "nav.print": "Print", 
    "nav.order": "Order",
    "nav.about": "About the Artist",
    "hero.title": "David Gelbakhiani Arts",
    "hero.subtitle": "Discover emotional and expressive paintings that capture the essence of color and soul.",
    "hero.cta": "View Gallery",
    "hero.atc":"Contact",
    "nav.print-on-cloth": "Print on Cloth" 
  },
  ka: {
    "nav.home": "მთავარი",
    "nav.gallery": "გალერეა",
    "nav.print": "პრინტი", 
    "nav.order": "შეკვეთა",
    "nav.about": "მხატვარის შესახებ",
    "hero.title": "დავით გელბახიანის ნამუშევრები",
    "hero.subtitle": "აღმოაჩინე ემოციური და უნიკალური ნახატები, რომლებიც გადმოსცემენ სულის ფერებს.",
    "hero.cta": "ნახე გალერეა",
    "hero.atc":"კონტაქტი",
    "nav.print-on-cloth": "ბეჭდვა ქსოვილზე" 
  },
  es: {
    "nav.home": "Casa",
    "nav.gallery": "Galería",
    "nav.print": "Impresión",
    "nav.order": "orden",
    "nav.about": "Acerca del artista",
    "hero.title": "Arte pescante gelbakhiano",
    "hero.subtitle": "Descubre pinturas emocionales y expresivas que capturan la esencia del color y el alma.",
    "hero.cta": "Ver Galería",
    "hero.atc":"Contacto",
    "nav.print-on-cloth": "Impresión en Tela"
  },
  ru: {
    "nav.home": "Главная",
    "nav.gallery": "Галерея",
    "nav.print": "Печать",
    "nav.order": "заказ",
    "nav.about": "Об художнике",
    "hero.title": "Давид Гелбахян искусство",
    "hero.subtitle": "Откройте для себя эмоциональные и выразительные картины, которые передают суть цвета и души.",
    "hero.cta": "Смотреть галерею",
    "hero.atc":"Kонтакт",
    "nav.print-on-cloth": "Печать на Ткани"
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) el.innerText = translations[lang][key];
  });
}

document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    const lang = e.target.getAttribute("data-lang");
    setLanguage(lang);
    document.getElementById('lang-popup').style.display = 'none';
  });
});

const langSelector = document.querySelector('.lang-selector span');
if (langSelector) {
  langSelector.addEventListener('click', (e) => {
    e.stopPropagation();
    const popup = document.getElementById('lang-popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  });
}

document.body.addEventListener('click', () => {
  const popup = document.getElementById('lang-popup');
  if(popup) popup.style.display = 'none';
});

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
  });
}

document.querySelectorAll('nav a, .cta-btn').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.classList.remove('active');
      }
    }
  });
});

// =======================================================================================

const paintings = [
  { id: 1,
    title: 
    'Sunset Glow',
    price: 250,
    img: 'imgs/1.jpg',
    desc: 'A warm evening light over calm waters, expressing peace and reflection.',
    sold: false,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 2,
    title: 
    'Blue Motion',
    price: 180,
    img: 'imgs/2.jpg',
    desc: 'Dynamic ocean hues capture the raw movement of life and freedom.',
    sold: true,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                  'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 3,
    title: 
    'City Reflections',
    price: 300,
    img: 'imgs/3.jpg',
    desc: 'The shimmer of modern city lights mirrored on wet streets — alive yet calm.',
    sold: false,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 4,
    title: 
    'Golden Fields',
    price: 270,
    img: 'imgs/4.jpg',
    desc: 'Golden tones of endless wheat fields — the beauty of summer’s simplicity.',
    sold: true,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                  'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 5,
    title: 
    'Sunset Glow',
    price: 250,
    img: 'imgs/5.jpg',
    desc: 'A warm evening light over calm waters, expressing peace and reflection.',
    sold: true,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 6,
    title: 
    'Sunset Glow',
    price: 250,
    img: 'imgs/6.jpg',
    desc: 'A warm evening light over calm waters, expressing peace and reflection.',
    sold: false,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 7,
    title: 
    'Blue Motion',
    price: 180,
    img: 'imgs/7.jpg',
    desc: 'Dynamic ocean hues capture the raw movement of life and freedom.',
    sold: false,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 8,
    title: 
    'City Reflections',
    price: 300,
    img: 'imgs/8.jpg',
    desc: 'The shimmer of modern city lights mirrored on wet streets — alive yet calm.',
    sold: false,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 9,
    title:
    'Golden Fields',
    price: 270,
    img: 'imgs/9.jpg',
    desc: 'Golden tones of endless wheat fields — the beauty of summer’s simplicity.',
    sold: true,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 10,
    title: 
    'Sunset Glow',
    price: 250,
    img: 'imgs/10.jpg',
    desc: 'A warm evening light over calm waters, expressing peace and reflection.',
    sold: true,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 11,
    title: 
    'Sunset Glow',
    price: 250,
    img: 'imgs/11.jpg',
    desc: 'A warm evening light over calm waters, expressing peace and reflection.',
    sold: true,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 12,
    title: 
    'Blue Motion',
    price: 180,
    img: 'imgs/12.jpg',
    desc: 'Dynamic ocean hues capture the raw movement of life and freedom.',
    sold: false,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 13,
    title: 
    'City Reflections',
    price: 300,
    img: 'imgs/13.jpg',
    desc: 'The shimmer of modern city lights mirrored on wet streets — alive yet calm.',
    sold: false,
    variations: ['imgs/gal-imgs/gal-1.jpg', 'imgs/gal-imgs/gal-2.jpg', 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 14,
    title: 
    'Golden Fields',
    price: 270,
    img: 'imgs/14.jpg',
    desc: 'Golden tones of endless wheat fields.',
    sold: true,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 15,
    title: 
    'Sunset Glow',
    price: 250,
    img: 'imgs/15.jpg',
    desc: 'A warm evening light over calm waters, expressing peace and reflection.',
    sold: false,
    variations: ['imgs/1.jpg',
                 'imgs/2.jpg',
                 'imgs/3.jpg'],

  },

  ];


const clothPrints = [
  { id: 21,
    title: 
    'Hero Painting 1',
    price: 270,
    img: 'imgs/first-imgs/a4.png',
    desc: 'The shimmer of modern city lights.', sold: true,
    hidden: true,
    variations: ['imgs/1.jpg',
                 'imgs/2.jpg', 
                 'imgs/3.jpg'],

  },

  { id: 22,
    title: 
    'Hero Painting 2',
    price: 270,
    img: 'imgs/first-imgs/a2.png',
    desc: 'The shimmer.', sold: false,
    variations: ['imgs/1.jpg', 
                 'imgs/2.jpg',
                 'imgs/3.jpg'],

  },

  { id: 23,
    title: 
    'Golden tones',
    price: 270,
    img: 'imgs/first-imgs/a3.png', desc: 'Hero Painting 3', sold: true, 
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],

  },

  { id: 24,
    title: 
    'Hero Painting 4',
    price: 270,
    img: 'imgs/first-imgs/a4.png',
    desc: 'The shimmer of modern city.',
    sold: true,
    variations: ['imgs/1.jpg',
                 'imgs/2.jpg',
                 'imgs/3.jpg'],

  },

  { id: 25,
    title: 
    'Hero Painting 5',
    price: 270,
    img: 'imgs/first-imgs/a5.png',
    desc: 'The shimmer of s.', 
    sold: false,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 22,
    title: 
    'Hero Painting 2',
    price: 270,
    img: 'imgs/first-imgs/a2.png',
    desc: 'The shimmer of modern city lights.', sold: false,
    variations: ['imgs/1.jpg', 
                 'imgs/2.jpg',
                 'imgs/3.jpg'],
  },

  { id: 23,
    title: 
    'Golden tones.',
    price: 270,
    img: 'imgs/first-imgs/a1.png', desc: 'Hero Painting 3',
    sold: false, 
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

  { id: 24,
    title: 
    'Hero Painting 4',
    price: 270,
    img: 'imgs/first-imgs/a4.png',
    desc: 'The shimmer of modern city.',
    sold: false,
    variations: ['imgs/1.jpg',
                 'imgs/2.jpg',
                 'imgs/3.jpg'],
  },

  { id: 25,
    title: 
    'Hero Painting 5',
    price: 270,
    img: 'imgs/first-imgs/a3.png',
    desc: 'The shimmer of modern city lights.', 
    sold: false,
    variations: ['imgs/gal-imgs/gal-1.jpg',
                 'imgs/gal-imgs/gal-2.jpg',
                 'imgs/gal-imgs/gal-3.jpg'],
  },

 { id: 26,
    title: 
    'Hero Painting 6',
    price: 270,
    img: 'imgs/first-imgs/a1.png',
    desc: 'The shimmer of modern city lights.',
    sold: true,
    variations: ['imgs/1.jpg',
                 'imgs/2.jpg',
                 'imgs/3.jpg'],
  },

    { id: 32,
    title: 
    'Hero Painting 2',
    price: 270,
    img: 'imgs/first-imgs/a6.png',
    desc: 'The shimmer of modern city lights.', sold: false,
    variations: ['imgs/1.jpg', 
                 'imgs/2.jpg',
                 'imgs/3.jpg'],
  },               
                 
];


const heroImages = document.querySelectorAll('.hero-image-wrapper .hero-img');
heroImages.forEach(img => {
  img.addEventListener('click', () => {
    const paintingId = img.getAttribute('data-id');
    if (paintingId) window.location.href = `painting.html?id=${paintingId}`;
  });
});

/**
 * @param {string} path 
 * @returns {boolean}
 */
function isVideo(path) {
  if (!path) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg'];
  const lowerCasePath = path.toLowerCase();
  return videoExtensions.some(ext => lowerCasePath.endsWith(ext));
}


// ⭐⭐⭐ renderGallery ფუნქცია ⭐⭐⭐
function renderGallery(dataArray, listId, detailsPage = 'painting.html') {
  const galleryList = document.getElementById(listId);
  if (!galleryList) return;

  const isCloth = listId === 'cloth-gallery-list';

  const signatureText = isCloth
    ? `<p class="signature-note" style="font-size: 0.8em; margin-top: 5px; color: #f0f0f0;">
         All prints come with the artist's original signature.
       </p>`
    : '';

  dataArray
    .filter(p => !p.hidden)
    .forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      if (p.sold) card.classList.add('sold');

      const mediaElement = `<img class="gallery-img" src="${p.img}" alt="${escapeHtml(p.title)}" data-id="${p.id}">`;

      card.innerHTML = `
        ${mediaElement}
        <div class="overlay">
          <h3>${escapeHtml(p.title)}</h3>
          <p>$${p.price}</p>
          ${signatureText}
        </div>
        ${p.sold ? '<div class="sold-label">SOLD</div>' : ''}
      `;

      card.addEventListener('click', (e) => {
        window.location.href = `${detailsPage}?id=${p.id}`;
      });

      galleryList.appendChild(card);
    });
}
// ⭐⭐⭐ renderGallery ფუნქციის დასასრული ⭐⭐⭐

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

try {
  renderGallery(paintings, 'gallery-list', 'painting.html');
  renderGallery(clothPrints, 'cloth-gallery-list', 'painting.html');
} catch (err) {
  // console.error("Error rendering galleries:", err); // დებაგინგისთვის
}

function findProductData(id) {
  if (!id && id !== 0) return null;
  const nid = Number(id);
  let data = Array.isArray(paintings) ? paintings.find(p => Number(p.id) === nid) : undefined;
  if (!data && Array.isArray(clothPrints)) {
    data = clothPrints.find(p => Number(p.id) === nid);
  }
  return data || null;
}

const mainPainting = document.getElementById('main-painting');
const mainPaintingVideo = document.getElementById('main-painting-video');
const mainPaintingWrapper = document.getElementById('main-painting-wrapper');
const carouselBox = document.getElementById('carousel-box');

/**
 * @param {string} src 
 */
function setMainMedia(src) {
    if (isVideo(src)) {
        if (mainPaintingVideo) {
            mainPaintingVideo.src = src;
            mainPaintingVideo.style.display = 'block';
            mainPaintingVideo.play();
        }
        if (mainPainting) mainPainting.style.display = 'none';
    } else {
        if (mainPainting) {
            mainPainting.src = src;
            mainPainting.style.display = 'block';
        }
        if (mainPaintingVideo) {
            mainPaintingVideo.pause();
            mainPaintingVideo.style.display = 'none';
        }
    }
}

if (mainPaintingWrapper) {
  const id = new URLSearchParams(window.location.search).get("id");
  const product = findProductData(id);

  if (product) {
    setMainMedia(product.img); 

    mainPaintingWrapper.addEventListener('click', () => openModalProduct(product));


    if (carouselBox) {
      carouselBox.innerHTML = "";
      
      // ⭐⭐ ჩასწორებული ლოგიკა Hero Section-ის ვარიანტებისთვის ⭐⭐
      const variants = (Array.isArray(product.variations) ? product.variations : [])
        .concat(Array.isArray(product.videos) ? product.videos : [])
        .filter((value, index, self) => self.indexOf(value) === index); 
      
      // თუ არ არის ვარიანტები/ვიდეოები, არ დავამატებთ მთავარ სურათს, რადგან ის უკვე ნაჩვენებია.
      // თუ გსურთ, რომ მთავარი სურათი გამოჩნდეს, დაამატეთ უკან [product.img] დასაწყისში.
      // მაგრამ მოთხოვნა იყო, რომ მთავარი სურათი არ განმეორდეს ვარიაციებში.
      // ⭐⭐ ჩასწორებული ლოგიკის დასასრული ⭐⭐

      variants.forEach(src => {
        const isMediaVideo = isVideo(src);
        
        const mediaElement = document.createElement(isMediaVideo ? "video" : "img");
        mediaElement.src = src;
        mediaElement.alt = product.title || 'variant';
        mediaElement.className = 'variant-img';
        
        if(isMediaVideo) {
            mediaElement.setAttribute('preload', 'metadata');
            mediaElement.setAttribute('poster', product.img); 
            mediaElement.setAttribute('playsinline', ''); 
        }
        
        mediaElement.addEventListener('click', (e) => {
          e.stopPropagation();
          
          if(isMediaVideo) {
              setMainMedia(src); 
          } else {
              setMainMedia(src); 
          }
          
          openModalImage(src, product.title, `$${product.price}`, product.desc); 
        });
        carouselBox.appendChild(mediaElement);
      });
    }
  }
}

const paintingImg = document.getElementById('painting-img');
const paintingVideo = document.getElementById('painting-video');
const paintingImgWrapper = document.querySelector('.painting-image'); 
const paintingTitle = document.getElementById('painting-title');
const paintingPrice = document.getElementById('painting-price');
const paintingDesc = document.getElementById('painting-desc');


/**
 * @param {string} src 
 */
function setDetailsMainMedia(src) {
    if (isVideo(src)) {
        if (paintingVideo) {
            paintingVideo.src = src;
            paintingVideo.style.display = 'block';
            paintingVideo.play();
        }
        if (paintingImg) paintingImg.style.display = 'none';
    } else {
        if (paintingImg) {
            paintingImg.src = src;
            paintingImg.style.display = 'block';
        }
        if (paintingVideo) {
            paintingVideo.pause();
            paintingVideo.style.display = 'none';
        }
    }
}


if (paintingImgWrapper && paintingTitle && paintingPrice && paintingDesc) {
  const id = new URLSearchParams(window.location.search).get("id");
  const product = findProductData(id);

  if (product) {
    setDetailsMainMedia(product.img); 

    paintingTitle.innerText = product.title || '';
    paintingPrice.innerText = `$${product.price || 0}`;
    paintingDesc.innerText = product.desc || '';

    const isClothProduct = Array.isArray(clothPrints) && clothPrints.some(p => Number(p.id) === Number(product.id));
    
    if (isClothProduct && !document.querySelector('.signature-highlight')) {
      const signatureNote = document.createElement('p');
      signatureNote.className = 'signature-highlight';
      signatureNote.style.cssText = `
        font-size: 1.1em;
        margin-top: 15px;
        padding: 10px;
        border: 1px dashed #FF6B6B;
        color: #FF6B6B;
        background-color: #FFF0F0;
        font-weight: bold;
        text-align: center;
        border-radius: 5px;
      `;
      signatureNote.innerText = "⭐ All prints come with the artist's original signature. ⭐";
      paintingDesc.after(signatureNote);
    }

    paintingImgWrapper.addEventListener('click', () => {
        let currentSrc = paintingImg.style.display === 'block' ? paintingImg.src : paintingVideo.src;
        openModalImage(currentSrc, product.title, `$${product.price}`, product.desc);
    });
    
    // ⭐ ვარიანტების რენდერირების ლოგიკა ⭐
    const detailsVariantsContainer = document.getElementById('details-variants');
    const fallbackVariantsContainer = document.getElementById('carousel-box'); 
    const containerToUse = detailsVariantsContainer || fallbackVariantsContainer;


    if (containerToUse) {
      containerToUse.innerHTML = ''; 
      
      // ⭐⭐ ჩასწორებული ლოგიკა Details Page-ის ვარიანტებისთვის ⭐⭐
      const variants = (product.variations && product.variations.length ? product.variations : [])
        .concat(product.videos && product.videos.length ? product.videos : [])
        .filter((value, index, self) => self.indexOf(value) === index); 
      // ⭐⭐ ჩასწორებული ლოგიკის დასასრული ⭐⭐


      variants.forEach(src => {
        const isMediaVideo = isVideo(src);
        
        const v = document.createElement(isMediaVideo ? "video" : "img");
        v.src = src;
        v.alt = product.title || 'variant';
        v.className = 'variant-img';
        
        if(isMediaVideo) {
            v.setAttribute('preload', 'metadata');
            v.setAttribute('poster', product.img); 
            v.setAttribute('loop', '');
            v.setAttribute('muted', '');
            v.setAttribute('playsinline', ''); 
        }

        v.addEventListener('click', () => {
            setDetailsMainMedia(src); 
            openModalImage(src, product.title, `$${product.price}`, product.desc); 
        });
        containerToUse.appendChild(v);
      });
    }

    // ⭐ ლოგიკის დასასრული ⭐


    if (product.sold) {
      const soldBadge = document.createElement('div');
      soldBadge.className = 'sold-label';
      soldBadge.innerText = 'SOLD';

      const wrapper = paintingImgWrapper;
      wrapper.appendChild(soldBadge);
    }
  }
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.innerText = new Date().getFullYear();
// 1. HTML ელემენტების ინიციალიზაცია (კავშირი)
const range = document.getElementById("sizeRange");
const sizeValue = document.getElementById("sizeValue");
const priceValue = document.getElementById("priceValue");
const resValue = document.getElementById("resValue");
const painting = document.getElementById("paintingSlider"); 
const unitSelect = document.getElementById("unitSelect");

// 2. საბაზისო მნიშვნელობები
let baseSize = 30; 
let basePrice = 100; 
let pricePer10cm = 10; 
let baseResolution = { width: 3000, height: 2000 }; 

// 3. ფუნქცია: მიმდინარე ზომის მიღება (სმ-ში)
function getSizeCM() {
    if (!range) return baseSize;
    return parseInt(range.value, 10) || baseSize;
}

// 4. ფუნქცია: ზომის ტექსტის განახლება (სმ ან ფუტი)
function updateSize() {
    if (!sizeValue || !unitSelect) return;
    const sizeCM = getSizeCM();
    
    // შეცვლილი ლოგიკა: ერთეულის მიწერა (ან "cm" ან "ft")
    if (unitSelect.value === "cm") {
        sizeValue.textContent = sizeCM + " cm";
    } else {
        // 1 ფუტი = 30.48 სმ
        sizeValue.textContent = (sizeCM / 30.48).toFixed(2) + " ft";
    }
}

// 5. ფუნქცია: ყველაფრის განახლება (ფასი, რეზოლუცია, ვიზუალური ზომა)
function updateEverything() {
    if (!priceValue || !resValue || !painting) return;
    const newSize = getSizeCM();
    
    // განაახლეთ ზომის ჩვენება (სმ ან ფუტით)
    updateSize();

    // --- ფასის გაანგარიშება ---
    const sizeDifference = newSize - baseSize;
    const added = (sizeDifference / 10) * pricePer10cm;
    const newPrice = basePrice + added;
    priceValue.textContent = newPrice.toFixed(2);

    // --- ნახატის ვიზუალური ზომის გაზრდა ---
    const scale = 1 + sizeDifference / 200;
    painting.style.transform = `scale(${scale})`;

    // --- რეზოლუციის გაანგარიშება ---
    const resolutionScale = newSize / baseSize;
    
    const newW = Math.round(baseResolution.width * resolutionScale);
    const newH = Math.round(baseResolution.height * resolutionScale);
    resValue.textContent = `${newW} x ${newH}`;
}

// 6. ივენთების მიბმა (Listener-ები)
if (range) {
    range.addEventListener("input", updateEverything);
}

if (unitSelect) {
    unitSelect.addEventListener("change", updateEverything); 
}

// 7. საწყისი მნიშვნელობების დაყენება ჩატვირთვისას
updateEverything();

const aboutBtn = document.querySelector('.about-btn');
if (aboutBtn) {
  aboutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const gallery = document.querySelector('#gallery');
    if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
  });
}


// NEW FUNCTION: Updates the modal content (media and text) based on currentModalIndex
function updateModalContent() { 
    if (currentModalMediaList.length === 0) return;

    const mediaSrc = currentModalMediaList[currentModalIndex];
    const modalImg = document.getElementById('modal-img');
    const modalVideo = document.getElementById('modal-video');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');

    const isMediaVideo = isVideo(mediaSrc);

    if (modalImg) modalImg.style.display = 'none';
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.style.display = 'none';
    }

    if (isMediaVideo) {
        if (modalVideo) {
            modalVideo.src = mediaSrc;
            modalVideo.style.display = 'block';
            modalVideo.play();
        }
    } else {
        if (modalImg) {
            modalImg.src = mediaSrc;
            modalImg.style.display = 'block';
        }
    }
    
    // Logic for updating text (handling cloth video case)
    const isCloth = Array.isArray(clothPrints) &&
                  clothPrints.some(p => 
                      (p.variations && p.variations.includes(mediaSrc)) || 
                      (p.videos && p.videos.includes(mediaSrc)) || 
                      (p.img === mediaSrc)
                  );
    
    const currentProductId = new URLSearchParams(window.location.search).get("id");
    const currentProduct = findProductData(currentProductId);

    if (isCloth && isMediaVideo) { 
        // Cloth video: remove info text
        if (modalTitle) modalTitle.innerText = '';
        if (modalPrice) modalPrice.innerText = '';
        if (modalDesc) modalDesc.innerText = '';
    } else if (currentProduct) {
        // Any other case on product detail page: show product info
        if (modalTitle) modalTitle.innerText = currentProduct.title || '';
        if (modalPrice) modalPrice.innerText = `$${currentProduct.price || 0}`;
        if (modalDesc) modalDesc.innerText = currentProduct.desc || '';
    }
}

// NEW FUNCTION: Show the next media item in the modal
function showNextMedia() { 
    if (currentModalMediaList.length > 1) {
        currentModalIndex = (currentModalIndex + 1) % currentModalMediaList.length;
        updateModalContent();
    }
}

// NEW FUNCTION: Show the previous media item in the modal
function showPrevMedia() { 
    if (currentModalMediaList.length > 1) {
        currentModalIndex = (currentModalIndex - 1 + currentModalMediaList.length) % currentModalMediaList.length;
        updateModalContent();
    }
}


function openModalProduct(product) {
  if (!product) return;
  
    // Initialize media list for swipe (Index.html or Main Image Click)
    currentModalMediaList = [product.img]
        .concat(Array.isArray(product.variations) ? product.variations : [])
        .concat(Array.isArray(product.videos) ? product.videos : [])
        .filter((value, index, self) => self.indexOf(value) === index); 

    let currentSrc;
    if (mainPainting && mainPainting.style.display === 'block') {
        currentSrc = mainPainting.src;
    } else if (mainPaintingVideo && mainPaintingVideo.style.display === 'block') {
        currentSrc = mainPaintingVideo.src;
    } else if (paintingImg && paintingImg.style.display === 'block') { 
        currentSrc = paintingImg.src;
    } else if (paintingVideo && paintingVideo.style.display === 'block') { 
        currentSrc = paintingVideo.src;
    } else {
        currentSrc = product.img; 
    }
    
    currentModalIndex = currentModalMediaList.indexOf(currentSrc);
    if(currentModalIndex === -1) currentModalIndex = 0; // Default to first item

  // openModalImage will handle the final display
  openModalImage(currentSrc, product.title || '', `$${product.price || 0}`, product.desc || '');
}

function openModalImage(mediaSrc, title, price, desc) { 
    const modal = document.getElementById('modal');
    if (!modal) return;

    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');
    
    // Fallback/Detail Page Initialization (if not called via openModalProduct)
    if (window.location.pathname.includes('painting.html')) {
        const currentProductId = new URLSearchParams(window.location.search).get("id");
        const currentProduct = findProductData(currentProductId);
        if (currentProduct) {
             currentModalMediaList = [currentProduct.img]
                .concat(currentProduct.variations && currentProduct.variations.length ? currentProduct.variations : [])
                .concat(currentProduct.videos && currentProduct.videos.length ? currentProduct.videos : [])
                .filter((value, index, self) => self.indexOf(value) === index); 
            
            currentModalIndex = currentModalMediaList.indexOf(mediaSrc);
            if(currentModalIndex === -1) currentModalIndex = 0; 
            
            // Set text initially based on passed data (if available)
            if (modalTitle) modalTitle.innerText = title || '';
            if (modalPrice) modalPrice.innerText = price || '';
            if (modalDesc) modalDesc.innerText = desc || '';
        }
    } else if (currentModalMediaList.length === 0) {
        // If coming from index.html (e.g. hero image click) but openModalProduct was somehow bypassed
         currentModalMediaList = [mediaSrc];
         currentModalIndex = 0;
         if (modalTitle) modalTitle.innerText = title || '';
         if (modalPrice) modalPrice.innerText = price || '';
         if (modalDesc) modalDesc.innerText = desc || '';
    }


    // Display modal
    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
    
    // Update content based on the (now set) global state
    updateModalContent(); 
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;

  const modalVideo = document.getElementById('modal-video');
  if (modalVideo) modalVideo.pause();

  modal.style.display = "none";
  document.body.style.overflow = '';
  currentModalMediaList = []; 
  currentModalIndex = 0;
}

(function modalInit() {
  const modal = document.getElementById('modal');
  if (!modal) return;

  const closeBtn = document.querySelector('.modal-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();

// NEW: Attach listeners to the navigation buttons
(function modalNavButtonsInit() {
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop click from closing the modal
            showPrevMedia();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop click from closing the modal
            showNextMedia();
        });
    }
})();

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('scrollToContact');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      const target = document.getElementById('contact');
      if (!target) {
        console.warn('Element with id="contact" not found.');
        return;
      }
      // თუ ბრაუზერი უჭერს CSS scroll-behavior-ს, ჩააქროლებს სმუზად.
      // სხვა შემთხვევაში გამოვიყენებთ window.scrollTo და smooth behaviour.
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });