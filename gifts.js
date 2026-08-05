// 1. Pull the settings instantly from your configuration file
import { siteConfig as config } from './config.js';

// Map configuration settings to global access (needed for slideshow/SEO engines)
window.siteConfig = config;  
const siteConfig = config;


function renderGifts() {
  const container = document.getElementById('gifts-container');
  const giftsList = siteConfig && siteConfig.giftsPage ? (siteConfig.giftsPage.items || siteConfig.giftsPage.gifts) : null;

  if (!container || !giftsList || !Array.isArray(giftsList)) return;

  container.innerHTML = '';

  giftsList.forEach(gift => {
    const badgeHTML = gift.badge 
      ? `<span class="gift-badge">${gift.badge}</span>` 
      : '';

    // Inside your renderGifts function:

const giftCardHTML = `
  <div class="gift-card" id="${gift.id}">
    <div class="gift-image-wrap">
      <!-- 🌟 Put badge and img TOGETHER in this tight wrapper -->
      <div class="img-badge-box">
        ${badgeHTML}
        <img src="${gift.image}" alt="${gift.name}" class="gift-image">
      </div>
    </div>
    <div class="gift-details">
      <h3 class="gift-title">${gift.name}</h3>
      <p class="gift-desc">${gift.desc}</p>
      <div class="gift-footer">
        <span class="gift-price">£${parseFloat(gift.price).toFixed(2)}</span>
        <button class="btn btn-primary gift-buy-btn" 
                data-item-id="${gift.id}"
                data-item-name="${gift.name}" 
                data-item-price="${gift.price}">
          ${siteConfig.giftsPage.buttontext}
        </button>
      </div>
    </div>
  </div>
`;

    container.insertAdjacentHTML('beforeend', giftCardHTML);
  });

  // 🌟 INITIALIZE LIGHTBOX LISTENERS
  setupImageModal();
}


// THE SHOPPING CART CODE beginning ////////////
// Array to hold items customer wants kept aside
let reservedItems = [];

// Event Listener for "Keep Aside" Buttons
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('gift-buy-btn')) {
    const btn = event.target;


    // Cleanly parse string prices like "25.00" or "$25.00"
    const rawPrice = btn.dataset.itemPrice || btn.dataset.price || "0";
    const cleanPrice = parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 0;

    const item = {
      id: btn.dataset.itemId || btn.dataset.id || btn.dataset.itemid || 'gift-item',
      name: btn.dataset.itemName || 'Gift Item',
      price: cleanPrice
    };


    // Add item to reservation list
    reservedItems.push(item);
    
    // Feedback animation/text on button
    btn.textContent = 'Added to Cart!';
    setTimeout(() => { btn.textContent = 'Keep Aside'; }, 2000);

    // Refresh cart UI & total sum
    updateReservationSummary();
  }
});

// Function to calculate total and render summary
function updateReservationSummary() {
  const summaryBar = document.getElementById('reservation-summary-bar');
  const countDisplay = document.getElementById('reservation-count');
  const totalDisplay = document.getElementById('reservation-total');
  const itemsListContainer = document.getElementById('reserved-items-list');

  if (!summaryBar) return;

  // 🌟 Teleport out of image-modal directly onto document.body
  if (summaryBar.parentElement !== document.body) {
    document.body.appendChild(summaryBar);
  }


  const totalItems = reservedItems.length;
  const totalPrice = reservedItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  // Toggle Visibility
  if (totalItems > 0) {
    summaryBar.classList.remove('hidden');
    
  } else {
    summaryBar.classList.add('hidden');
    
  }

  // Update Badge & Price
  if (countDisplay) countDisplay.textContent = totalItems;
  if (totalDisplay) totalDisplay.textContent = `£${totalPrice.toFixed(2)}`;

  // Update Itemized List safely
  if (itemsListContainer) {
    // 1. Map items to HTML string array first
    const listItemsHTML = reservedItems.map((item, index) => {
      const priceNum = Number(item.price) || 0;
      return `
        <li class="reserved-item-row">
          <span>${item.name}</span>
          <div>
            <strong>£${priceNum.toFixed(2)}</strong>
            <button class="remove-item-btn" data-index="${index}">✕</button>
          </div>
        </li>
      `;
    }).join('');

    // 2. Assign the joined string to innerHTML ONLY ONCE outside the loop
    itemsListContainer.innerHTML = listItemsHTML;
  }
}

// 2. Remove item function
function removeReservedItem(index) {
  if (index >= 0 && index < reservedItems.length) {
    reservedItems.splice(index, 1);
    updateReservationSummary();
  }
}

  

document.addEventListener('click', (event) => {
  // 1. Open the reservation submit modal when clicking "Order"
  if (event.target.closest('#view-pickup-btn')) {
    const reservationModal = document.getElementById('reservation-modal');
    if (reservationModal) {
      reservationModal.style.display = 'block';
    }
  }

  // 2. Remove item when clicking "✕" inside the reserved list
  if (event.target.classList.contains('remove-item-btn')) {
    const index = parseInt(event.target.dataset.index, 10);
    removeReservedItem(index);
  }
});








// THE SHOPPING CART CODE ends ////////////



function setupImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.getElementById('modal-close');

  if (!modal || !modalImg) return;

  // Listen for clicks on any product image
  document.querySelectorAll('.gift-image').forEach(img => {
    img.addEventListener('click', (e) => {
      modalImg.src = e.target.src;
      modalImg.alt = e.target.alt;
      modal.style.display = 'flex';
    });
  });

  // Close modal when clicking 'X' or background
  const closeModal = () => { modal.style.display = 'none'; };
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Close modal on 'ESC' key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderGifts);
} else {
  renderGifts();
}

/////////////////////////////////////////////////////////////
/////////////////////// Start of ORDER FORM /////////////////
/////////////////////////////////////////////////////////////

// 1. Pre-fill form action URL from your site dynamic config
document.addEventListener('DOMContentLoaded', () => {
  const reservationForm = document.getElementById('reservation-form-submit');
  const contactForm = document.getElementById('contact-form-submit');
  
  // Set form action using your configured endpoint/encrypted email logic
  if (reservationForm && contactForm) {
    reservationForm.action = contactForm.action;
  }

  // Prevent selecting past dates
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }
});

// 2. Control Modal Display Logic
document.addEventListener('click', (event) => {
  // Open modal when clicking Place Order / Review Items button
  if (event.target.closest('#open-order-btn') || event.target.closest('#view-pickup-btn')) {
    if (reservedItems.length === 0) return;

    const modal = document.getElementById('reservation-modal');
    const totalDisplay = document.getElementById('res-modal-total');
    const totalPrice = reservedItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

    if (totalDisplay) totalDisplay.textContent = `£${totalPrice.toFixed(2)}`;
    if (modal) modal.style.display = 'flex';
  }

  // Close modal via (X) button or backdrop click
  if (event.target.id === 'close-reservation-modal' || event.target.id === 'reservation-modal') {
    closeReservationModal();
  }
});

function closeReservationModal() {
  const modal = document.getElementById('reservation-modal');
  if (modal) modal.style.display = 'none';
}

// 3. Form Submit Handler
// Reservation Form FormSubmit Handler
const reservationForm = document.getElementById('reservation-form-submit');

if (reservationForm) {
  reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('res-submit-btn');
    const successMsg = document.getElementById('res-success-message');
    const surname = document.getElementById('res-surname').value;
    const pickupDate = document.getElementById('res-date').value;
    const customerEmail = document.getElementById('res-email').value;

    const totalPrice = reservedItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

    // Format item list for the email body
    const itemListText = reservedItems
      .map(item => `- ${item.name}: £${(Number(item.price) || 0).toFixed(2)}`)
      .join('\n');

    


    // Build the structured email payload
    const payload = {
      name: `Reservation: ${surname}`,

      email: customerEmail,
      
      
      ...(config.contactCC && { _cc: config.contactCC }), // 👈 Adds _cc only if config.contactCC is truthy
      
      // _replyto: customerEmail, // 👈 Ensures FormSubmit targets this email for replies & autoresponses
      // _autoresponse: `Thank you for your reservation with ${config.businessName}! We have received your order and will have your items ready for pickup.`, // 👈 Custom message sent to customer
      
      subject: ` ${config.businessName} Reservation - ${surname} (${pickupDate})`,
      surname: surname,
      collection_date: pickupDate,
      total_amount: `£${totalPrice.toFixed(2)}`,
      message: `RESERVATION DETAILS:\n\nSurname: ${surname}\nCollection Date: ${pickupDate}\nTotal: £${totalPrice.toFixed(2)}\n\nItems Reserved:\n${itemListText}`
    };

    // UI Loading state
    if (submitBtn) {
      submitBtn.innerText = "Sending Reservation...";
      submitBtn.disabled = true;
    }

    // Post directly to FormSubmit endpoint using your encrypted email config
    const endpoint = `https://formsubmit.co/ajax/${config.contactEmailEncrypted}`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === "true" || data.success === true) {
          
          
          // 1. Populate screen summary details
          document.getElementById('summary-res-name').textContent = surname;
          document.getElementById('summary-res-date').textContent = pickupDate;
          document.getElementById('summary-res-total').textContent = `£${totalPrice.toFixed(2)}`;

          // 2. Render reserved items list
          const itemsListEl = document.getElementById('summary-res-items');
          itemsListEl.innerHTML = reservedItems
            .map(item => `<li>${item.name} — £${(Number(item.price) || 0).toFixed(2)}</li>`)
            .join('');

          
          
          // Hide form & show inline success message
          reservationForm.style.display = 'none';
          if (successMsg) successMsg.style.display = 'block';

          // Clear cart memory & hide summary drawer
          reservedItems = [];
          if (typeof updateReservationSummary === 'function') {
            updateReservationSummary();
          }
        } else {
          alert("Oops! Reservation request rejected: " + data.message);
          if (submitBtn) {
            submitBtn.innerText = "Confirm Reservation";
            submitBtn.disabled = false;
          }
        }
      })
      .catch(error => {
        alert("Network error processing reservation. Please try again.");
        if (submitBtn) {
          submitBtn.innerText = "Confirm Reservation";
          submitBtn.disabled = false;
        }
      });
  });
}

/////////////////////////////////////////////////////////////
/////////////////////// End of ORDER FORM ///////////////////
/////////////////////////////////////////////////////////////