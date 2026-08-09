// 1. Pull the settings instantly from your configuration file
import { siteConfig as config } from './config.js';

// Map configuration settings to global access (needed for slideshow/SEO engines)
window.siteConfig = config;  
const siteConfig = config;





// #####################################################################
// ############################### Start Of Gallery JS #################
// #####################################################################

// gallery.js
function renderGallery() {
  console.log("1. renderGallery started execution");
  
  console.log("2. appConfig payload:", siteConfig);

  const container = document.getElementById('gallery-grid');
  console.log("3. gallery-grid DOM element:", container);

  if (!container || !siteConfig || !Array.isArray(siteConfig.galleryPage.images)) {
    console.log("❌ FAILED GUARD CHECK: Missing container or galleryPage array!");
    return;
  }

  // Clear existing static content
  container.innerHTML = '';

  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.getElementById('modal-close');
  const modalIsReady = modal && modalImg && modalCaption && closeBtn;

  const galleryTitle = document.querySelector('.page-title');
  const gallerySubtitle = document.querySelector('.subtitle');

  if (galleryTitle) {
    galleryTitle.textContent = siteConfig?.galleryPage?.title || 'Our Gallery';
  }

  if (gallerySubtitle) {
    gallerySubtitle.textContent = siteConfig?.galleryPage?.subtitle || 'Feel free to browse our photos.';
  }


  siteConfig.galleryPage.images.forEach(image => {
    const itemCard = document.createElement('div');
    itemCard.className = 'gallery-item';
    itemCard.style.cursor = 'pointer';

    itemCard.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
      <div class="gallery-caption">${image.caption}</div>
    `;

    if (modalIsReady) {
      itemCard.addEventListener('click', () => {
        modalImg.src = image.src;
        modalImg.alt = image.alt;
        modalCaption.textContent = image.caption;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      });
    }

    container.appendChild(itemCard);
  });

  console.log("4. Successfully appended", siteConfig.galleryPage.images.length, "cards to DOM!");

  if (modalIsReady) {
    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }
}

document.addEventListener('DOMContentLoaded', renderGallery);

// #####################################################################
// ############################### End Of Gallery JS ###################
// #####################################################################
