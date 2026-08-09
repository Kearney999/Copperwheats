// 1. Pull the settings instantly from your configuration file
import { siteConfig as config } from './config.js';

// Map configuration settings to global access (needed for slideshow/SEO engines)
window.siteConfig = config;  
const siteConfig = config;


// #####################################################################
// ############################### Start Of Prices JS #################
// #####################################################################

function renderPrices() {
  
  const container = document.getElementById('prices-container');

  // Title elements setup
  const pageTitle = document.querySelector('.page-title');
  const pageSubtitle = document.querySelector('.subtitle');

if (!container || !siteConfig || !Array.isArray(siteConfig.pricesPage.categories)) {
    console.log("❌ FAILED GUARD CHECK: Missing container or pricesPage categories!");
    return;
  }



  if (pageTitle && siteConfig?.pricesPage?.title) {
    pageTitle.textContent = siteConfig.pricesPage.title;
  }
  if (pageSubtitle && siteConfig?.pricesPage?.subtitle) {
    pageSubtitle.textContent = siteConfig.pricesPage.subtitle;
  }

  // Guard check for container & config data
  if (!container || !siteConfig?.pricesPage?.categories) return;

  // Clear existing static content
  container.innerHTML = '';

  // Generate price categories and items
  container.innerHTML = siteConfig.pricesPage.categories.map(category => `
    <section class="price-category">
      <h2 class="price-category-title">${category.name}</h2>
      <div class="price-items-list">
        ${category.items.map(item => `
          <div class="price-item ${item.favorite ? 'is-favorite' : ''}">
            <div style="flex: 1;">
              <div class="price-item-header">
                <span>${item.name}</span>
                ${item.favorite ? '<span class="price-badge-fav">Favorite</span>' : ''}
              </div>
              ${item.description ? `<p class="price-item-description">${item.description}</p>` : ''}
            </div>
            <div class="price-dots"></div>
            <div class="price-value">${item.price}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderPrices);

// #####################################################################
// ############################### End Of Prices JS ###################
// #####################################################################
