// 1. Pull the settings instantly from your configuration file
import { siteConfig as config } from './config.js';

// Map configuration settings to global access (needed for slideshow/SEO engines)
window.siteConfig = config;  
const siteConfig = config;

// =========================================================================
// LOCAL SEO SCHEMA COMPILER (Fires on load to optimize for Google Search)
// =========================================================================
function populateSchemaSEO(config) {
    if (!config || !config.contactPage) return;

    const cp = config.contactPage;
    const sp = config.servicesPage;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "CafeOrCoffeeShop",
        "name": config.businessName || "Copperwheats",
        "description": config.homePage?.heroDesc || "Specialty coffee house.",
        "url": window.location.href,
        "telephone": cp.contactTelephone || "",
        "image": cp.featuredImage || "",
        "servesCuisine": cp.servesCuisine || "Coffee, Cafe",
        "priceRange": cp.priceRange || "££",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": cp.address ? cp.address.replace("📍", "").trim() : "The Pier",
            "addressLocality": cp.locality || "Brodick",
            "addressRegion": cp.region || "Isle of Arran",
            "postalCode": cp.postalCode || "KA27",
            "addressCountry": cp.countryCode || "GB"
        }
    };

    if (cp.latitude && cp.longitude) {
        schemaData.geo = {
            "@type": "GeoCoordinates",
            "latitude": cp.latitude,
            "longitude": cp.longitude
        };
    }

    if (sp && sp.openingHours) {
        const rawHours = sp.openingHours.monday || "10:00 AM – 4:30 PM";
        const times = rawHours.split(/[–-]/);
        let opens = "10:00";
        let closes = "16:30";

        if (times.length === 2) {
            const cleanTime = (t) => {
                let [time, modifier] = t.trim().split(" ");
                let [hours, minutes] = time.split(":");
                if (modifier === "PM" && hours !== "12") hours = parseInt(hours, 10) + 12;
                if (modifier === "AM" && hours === "12") hours = "00";
                return `${String(hours).padStart(2, '0')}:${minutes}`;
            };
            try {
                opens = cleanTime(times[0]);
                closes = cleanTime(times[1]);
            } catch (e) {}
        }

        schemaData.openingHoursSpecification = [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": opens,
            "closes": closes
        }];
    }

    const schemaElement = document.getElementById('seo-schema');
    if (schemaElement) {
        schemaElement.textContent = JSON.stringify(schemaData, null, 2);
    }
}

// =========================================================================
// CONFIGURATION ENGINE CORE (Hydrates active DOM elements safely)
// =========================================================================
function hydrateTemplateEngine(config) {

    // --- DYNAMIC THEME ENGINE SWITCHER ---
    if (config.theme) {
        const themeLink = document.getElementById('theme-stylesheet');
        if (themeLink) {
            // Updated to point directly inside the new styles/ subfolder
            themeLink.setAttribute('href', `./styles/${config.theme}`);
        }
    }



    // Apply Custom Stylesheets dynamically via CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-espresso', config.themeColors.textDark);
    root.style.setProperty('--color-roast', config.themeColors.darkNeutral);
    root.style.setProperty('--color-latte', config.themeColors.midNeutral);
    root.style.setProperty('--color-cream-dark', config.themeColors.lightNeutral);
    root.style.setProperty('--color-cream-light', config.themeColors.background);

    // Global Metadata, Title, and Brand Text Slots
    const metaTitleEl = document.getElementById('meta-title');
    if (metaTitleEl) metaTitleEl.innerText = config.metaTitle;

    const lblLogoMain = document.getElementById('lbl-logo-main');
    if (lblLogoMain) lblLogoMain.innerText = config.businessName;

    const subLabel = document.getElementById('lbl-logo-sub');
    if (subLabel) subLabel.innerText = config.businessSub || "";

    const lblHeroLogoMain = document.getElementById('lbl-hero-logo-main');
    if (lblHeroLogoMain) lblHeroLogoMain.innerText = config.businessName;

    const lblHeroLogoSub = document.getElementById('lbl-hero-logo-sub');
    if (lblHeroLogoSub) lblHeroLogoSub.innerText = config.businessSub || "";

    // DYNAMIC PNG LOGO INJECTION PIPELINE
    const navVector = document.getElementById('nav-logo-vector');
    const navImage = document.getElementById('nav-logo-image');
    const heroVector = document.getElementById('hero-logo-vector');
    const heroImage = document.getElementById('hero-logo-image');

    if (config.customLogoUrl && config.customLogoUrl !== "") {
        if (navImage) navImage.src = config.customLogoUrl;
        if (heroImage) heroImage.src = config.customLogoUrl;
        if (navVector) navVector.style.display = 'none';
        if (heroVector) heroVector.style.display = 'none';
        if (navImage) navImage.style.display = 'block';
        if (heroImage) heroImage.style.display = 'block';
    }

    const logoCenterText = document.getElementById('logo-center-text');
    if (logoCenterText) logoCenterText.textContent = config.businessName;

    const heroLogoCenterText = document.getElementById('hero-logo-center-text');
    if (heroLogoCenterText) heroLogoCenterText.textContent = config.businessName;

    // --- HOME PAGE SPECIFIC ELEMENT HYDRATION ---
    const lblHeroTitle = document.getElementById('lbl-hero-title');
    if (lblHeroTitle) lblHeroTitle.innerText = config.homePage.heroTitle;

    const lblHeroDesc = document.getElementById('lbl-hero-desc');
    if (lblHeroDesc) lblHeroDesc.innerText = config.homePage.heroDesc;

    // --- DIRECT CONFIG BRAND LOGO LAYOUT CONTROLLER ---
    try {
        const logoFrame = document.getElementById('hero-logo-frame');
        const logoImg = document.getElementById('hero-logo-image');
        
        // Target your imported configuration object directly
        const settings = siteConfig?.logoSettings;

        if (logoFrame && logoImg && settings) {
            
            // 1. Process the Backdrop Frame Blueprint
            if (settings.showFrame) {
                logoFrame.style.display = "flex";

                
                logoFrame.style.setProperty('width', settings.frameWidth, 'important');
                logoFrame.style.setProperty('height', settings.frameHeight, 'important');
                logoFrame.style.setProperty('border-radius', settings.frameRadius, 'important');
                
                // Re-apply core translucent appearance rules
                logoFrame.style.background = "rgba(255, 255, 255, 0.05)";
                logoFrame.style.border = "1px solid rgba(255, 255, 255, 0.2)";
                logoFrame.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.4)";
            } else {
                // Completely strip visual frame rules if toggled off
                logoFrame.style.background = "transparent";
                logoFrame.style.border = "none";
                logoFrame.style.boxShadow = "none";
                logoFrame.style.setProperty('width', 'auto', 'important');
                logoFrame.style.setProperty('height', 'auto', 'important');
            }

            // 2. Process the Inner Image Dimensions
            logoImg.style.setProperty('width', settings.imageWidth, 'important');
            logoImg.style.setProperty('height', settings.imageHeight, 'important');
            // 🌟 Dynamic centering rules driven entirely by the configuration file
            logoImg.style.top = settings.imageTop || "50%";
            logoImg.style.left = settings.imageLeft || "50%";
        }
    } catch (e) {
        console.error("Layout engine encountered a brand asset configuration error:", e);
    }

    try {
        const splashScreen = document.getElementById('site-splash-screen');
        const splashFrame = document.getElementById('splash-logo-frame');
        const splashImg = document.getElementById('splash-logo-image');
        const settings = siteConfig?.logoSettings;

        if (splashFrame && splashImg && settings) {
            // 1. Anchor the base sizes to your config layout rules
            splashFrame.style.setProperty('width', settings.frameWidth, 'important');
            splashFrame.style.setProperty('height', settings.frameHeight, 'important');
            splashFrame.style.setProperty('border-radius', settings.frameRadius, 'important');
            
            splashImg.style.setProperty('width', settings.imageWidth, 'important');
            splashImg.style.setProperty('height', settings.imageHeight, 'important');
            splashImg.style.top = settings.imageTop || "50%";
            splashImg.style.left = settings.imageLeft || "50%";

            // 2. 🌟 INITIAL IMPACT: Force the logo to start massive when the page instantly loads
            splashFrame.style.transform = "scale(5.0)"; 
        }

        // 3. THE GRAND REVEAL: Smoothly shrink the logo and cross-dissolve into the website
        if (splashScreen && splashFrame && splashImg) {
            
            // 🌟 THE STUTTER CURE: Wait for the browser to fully paint the massive initial state 
            // before changing the transform value, guaranteeing a buttery-smooth start.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    splashFrame.style.transform = "scale(0.3)"; 
                });
            });

            // STEP A: Drop the dark background wall first to reveal the website underneath.
            setTimeout(() => {
                splashScreen.style.background = "transparent";
            }, 2200); 

            // STEP B: Melt the full-color splash logo into the website logo hiding directly behind it
            setTimeout(() => {
                splashFrame.style.transition = "opacity 0.6s ease, transform 3.0s cubic-bezier(0.25, 1, 0.5, 1)";
                splashFrame.style.opacity = "0";
            }, 2300); 

            // STEP C: Completely vanish the container from the workspace so it doesn't block clicks
            setTimeout(() => {
                splashScreen.style.visibility = "hidden";
            }, 2900); 
        }
    } catch (e) {
        console.error("Splash scale routine failed:", e);
    }




    // Highlights Generator
    const highlightsContainer = document.getElementById('container-highlights');
    if (highlightsContainer) {
        highlightsContainer.innerHTML = '';
        const vectorIcons = {
            coffee: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg>`,
            luggage: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 20V8a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"></path><path d="M7 6h10"></path></svg>`,
            users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
            sun: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
            heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
            wifi: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.94 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`,
            pound: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 7a4 4 0 0 0-7.75-1.38A4 4 0 0 0 7 9.5V19h11" /><path d="M5 14h11" /><path d="M5 19h14" /></svg>`,
        
            // --- NEW PUB-SPECIFIC ADDITIONS ---
            utensils: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>`,
            star: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
            martini: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12"></path><path d="m21 3-9 9-9-9Z"></path><path d="M3 14h18"></path></svg>`
        };
        config.homePage.highlights.forEach(item => {
            highlightsContainer.innerHTML += `
                <div class="highlight-item">
                    <div class="highlight-icon">${vectorIcons[item.icon] || vectorIcons.coffee}</div>
                    <div class="highlight-text">
                        <h4>${item.title}</h4>
                        <p>${item.desc}</p>
                    </div>
                </div>`;
        });
    }

    // Reviews & Badges
    const lblReviewScore = document.getElementById('lbl-review-score');
    if (lblReviewScore) lblReviewScore.innerText = config.homePage.reviewsScoreText;

    const lblReviewTitle = document.getElementById('lbl-review-title');
    if (lblReviewTitle) lblReviewTitle.innerText = config.homePage.reviewsHeadline;

    const lblReviewSubtitle = document.getElementById('lbl-review-subtitle');
    if (lblReviewSubtitle) lblReviewSubtitle.innerText = config.homePage.reviewsSub;

    const SummaryBoardSection = document.querySelector('.section-google-summary');
    if (config?.features?.showGoogleReviewsSummaryBoard === false) {
        if (SummaryBoardSection) SummaryBoardSection.style.setProperty('display', 'none', 'important');
    } else {
        if (SummaryBoardSection) SummaryBoardSection.style.setProperty('display', 'block', 'important');
    }

    const placeId = config.contactPage.googlePlaceId;
    const writeReviewUrl = `${config.contactPage.googleWriteReviewUrl}${placeId}`;
    const viewReviewsUrl = `${config.contactPage.googleViewReviewsUrl}${placeId}`;

    const googleBadgeLink = document.getElementById('link-google-reviews-home');
    if (googleBadgeLink && config.contactPage && viewReviewsUrl) {
        googleBadgeLink.setAttribute('href', viewReviewsUrl);
    }

    const reviewsContainer = document.getElementById('container-reviews');
    if (reviewsContainer) {
        reviewsContainer.innerHTML = '';
        config.homePage.googleReviews.forEach(rev => {
            reviewsContainer.innerHTML += `
                <div class="review-card">
                    <div class="review-header">
                        <div class="reviewer-info">
                            <div class="reviewer-avatar">${rev.initials}</div>
                            <div>
                                <div class="reviewer-name">${rev.name}</div>
                                <div class="reviewer-meta">${rev.badge}</div>
                            </div>
                        </div>
                        <span class="reviews-rating-stars">★★★★★</span>
                    </div>
                    <p class="review-text">${rev.text}</p>
                </div>`;
        });
    }

    // --- ABOUT PAGE SPECIFIC ELEMENT HYDRATION ---
    const lblAboutTitle = document.getElementById('lbl-about-title');
    if (lblAboutTitle) lblAboutTitle.innerText = config.aboutPage.title;

    const lblAboutSubtitle = document.getElementById('lbl-about-subtitle');
    if (lblAboutSubtitle) lblAboutSubtitle.innerText = config.aboutPage.subtitle;

    const StoryBoardSection = document.querySelector('.about-static-media-box');
    if (config?.features?.showCompanyStoryboard === false) {
        if (StoryBoardSection) StoryBoardSection.style.setProperty('display', 'none', 'important');
    } else {
        if (StoryBoardSection) StoryBoardSection.style.setProperty('display', 'block', 'important');
    }

    const aboutParagraphs = document.getElementById('container-about-paragraphs');
    if (aboutParagraphs) {
        aboutParagraphs.innerHTML = '';
        config.aboutPage.storyParagraphs.forEach(text => {
            aboutParagraphs.innerHTML += `<p class="about-p">${text}</p>`;
        });
    }

    const aboutFeatures = document.getElementById('container-about-features');
    if (aboutFeatures) {
        aboutFeatures.innerHTML = '';
        config.aboutPage.features.forEach(feat => {
            aboutFeatures.innerHTML += `
                <div class="feature-row">
                    <span class="feature-badge">${feat.emoji}</span>
                    <div class="feature-info">
                        <h4>${feat.title}</h4>
                        <p>${feat.desc}</p>
                    </div>
                </div>`;
        });
    }

    // --- SERVICES PAGE SPECIFIC ELEMENT HYDRATION ---
    const lblServicesTitle = document.getElementById('lbl-services-title');
    if (lblServicesTitle) lblServicesTitle.innerText = config.servicesPage.headline;

    const lblServicesSubtitle = document.getElementById('lbl-services-subtitle');
    if (lblServicesSubtitle) lblServicesSubtitle.innerText = config.servicesPage.sub;

    const servicesGrid = document.getElementById('container-services-cards');
    if (servicesGrid) {
        servicesGrid.innerHTML = '';
        config.servicesPage.menuList.forEach(item => {
            servicesGrid.innerHTML += `
                <div class="service-card">
                    <span class="service-emoji">${item.emoji}</span>
                    <h3>${item.name}</h3>
                </div>`;
        });

        // Inject dynamic relative PDF Menu button right inside the layout if turned on
        if (config.features && config.features.showMenu) {
            const menuContainer = document.querySelector('.menu-download-container');
            if (menuContainer) {
                menuContainer.style.display = 'block';
                // Safe relative path pointing directly to your images root asset directory
                const pdfLink = menuContainer.querySelector('a');
                if (pdfLink) pdfLink.setAttribute('href', './images/menu.pdf');
            }
        } else {
            // Optional: hides the container if showMenu is turned off in config
            const menuContainer = document.querySelector('.menu-download-container');
            if (menuContainer) menuContainer.style.display = 'none';
        }
    }

    const menuSection = document.querySelector('.menu-download-container');
    if (menuSection) {
        if (config.features && config.features.showMenu) {
            menuSection.style.display = 'block';
        } else {
            menuSection.style.display = 'none';
        }
    }

    // Opening Hours Table Engine
    const hoursSection = document.getElementById('section-opening-hours');
    if (config?.features?.showOpeningHours === false) {
        if (hoursSection) hoursSection.style.display = 'none';
    } else {
        if (hoursSection) {
            hoursSection.style.display = 'block';
            if (config?.servicesPage?.openingHours) {
                const hoursData = config.servicesPage.openingHours;
                const titleEl = document.getElementById('hours-title');
                const subtitleEl = document.getElementById('hours-subtitle');
                if (titleEl) titleEl.textContent = hoursData.title || "Opening Times";
                if (subtitleEl) subtitleEl.textContent = hoursData.subtitle || "";
                
                const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                days.forEach(day => {
                    const timeCell = document.getElementById(`time-${day}`);
                    if (timeCell) timeCell.textContent = hoursData[day] || "Closed";
                });
            }
        }
    }

    // --- CONTACT PAGE SPECIFIC ELEMENT HYDRATION ---
    const lblContactAddress = document.getElementById('lbl-contact-address');
    if (lblContactAddress) lblContactAddress.innerText = config.contactPage.address;

    if (config.contactPage && config.contactPage.contactTelephone) {
        const phoneNum = config.contactPage.contactTelephone;
        const cleanPhone = phoneNum.replace(/\s+/g, '');
        const phoneIconElement = document.getElementById('lbl-contact-phone-icon');
        if (phoneIconElement) phoneIconElement.innerText = config.contactPage.phoneIcon || "📞";

        const phoneTextElement = document.getElementById('lbl-contact-telephone');
        if (phoneTextElement) phoneTextElement.innerText = phoneNum;

        const phoneLinkElement = document.getElementById('lnk-contact-telephone');
        if (phoneLinkElement) phoneLinkElement.setAttribute('href', `tel:${cleanPhone}`);
    }

    const mapElement = document.getElementById('lbl-contact-map');
    if (mapElement) mapElement.src = config.contactPage.mapUrl;

    const lblContactTitle = document.getElementById('lbl-contact-title');
    if (lblContactTitle) lblContactTitle.innerText = config.contactPage.title;

    const lblContactDesc = document.getElementById('lbl-contact-desc');
    if (lblContactDesc) lblContactDesc.innerText = config.contactPage.desc;

    const btnEmailAction = document.getElementById('btn-email-action');
    if (btnEmailAction) btnEmailAction.setAttribute('href', `mailto:${config.contactEmail}`);

    const lblContactEmail = document.getElementById('lbl-contact-email');
    if (lblContactEmail) lblContactEmail.innerText = config.contactEmail;

    // Contact Form AJAX Handler Setup
    const contactForm = document.getElementById('contact-form-submit');
    if (contactForm) {
        contactForm.setAttribute('action', `https://formsubmit.co/ajax/${config.contactEmailEncrypted}`);
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const submitBtn = document.getElementById('form-submit-btn');
            const successMsg = document.getElementById('form-success-message');
            
            if (submitBtn) {
                submitBtn.innerText = "Sending...";
                submitBtn.disabled = true;
            }

            const formData = new FormData(contactForm);
            const object = {};
            formData.forEach((value, key) => object[key] = value);
            const jsonPayload = JSON.stringify(object);

            fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: jsonPayload
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === "true" || data.success === true) {
                    contactForm.style.display = 'none';
                    if (successMsg) successMsg.style.display = 'block';
                } else {
                    alert("Oops! FormSubmit rejected the request: " + data.message);
                    if (submitBtn) {
                        submitBtn.innerText = "Message Us";
                        submitBtn.disabled = false;
                    }
                }
            })
            .catch(error => {
                alert("Oops! There was a network transmission error. Please try again.");
                if (submitBtn) {
                    submitBtn.innerText = "Message Us";
                    submitBtn.disabled = false;
                }
            });
        });
    }

    // Google/TripAdvisor Review Button Node Injection Safeties
    if (!config.features.showGoogleReviews) {
        document.getElementById('btn-google-review-home')?.remove();
        document.getElementById('btn-google-review-contact')?.remove();
    } else {
        const googleHome = document.getElementById('btn-google-review-home');
        if (googleHome && writeReviewUrl) googleHome.setAttribute('href', writeReviewUrl);
        const googleContact = document.getElementById('btn-google-review-contact');
        if (googleContact && writeReviewUrl) googleContact.setAttribute('href', writeReviewUrl);
    }

    if (!config.features.showTripAdvisor) {
        document.getElementById('btn-tripadvisor-review-home')?.remove();
        document.getElementById('btn-tripadvisor-review-contact')?.remove();
    } else {
        const taHome = document.getElementById('btn-tripadvisor-review-home');
        if (taHome && config.contactPage.tripAdvisorUrl) taHome.setAttribute('href', config.contactPage.tripAdvisorUrl);
        const taContact = document.getElementById('btn-tripadvisor-review-contact');
        if (taContact && config.contactPage.tripAdvisorUrl) taContact.setAttribute('href', config.contactPage.tripAdvisorUrl);
    }

    if (!config.features.showGoogleReviews && !config.features.showTripAdvisor) {
        document.getElementById('wrapper-reviews-home')?.remove();
        document.getElementById('wrapper-reviews-contact')?.remove();
    }

    // --- GLOBAL FOOTER MANAGEMENT ---
    const lblFooterName = document.getElementById('lbl-footer-name');
    if (lblFooterName) lblFooterName.innerText = `${config.businessName} ${config.businessSub}`;

    const lblFooterTagline = document.getElementById('lbl-footer-tagline');
    if (lblFooterTagline) lblFooterTagline.innerText = `${config.footer.Tagline} ${config.locationShort}.`;

    const lblFooterEmailLink = document.getElementById('lbl-footer-email-link');
    if (lblFooterEmailLink) {
        lblFooterEmailLink.setAttribute('href', `mailto:${config.contactEmail}`);
        lblFooterEmailLink.innerText = config.contactEmail;
    }

    const lblFooterCopyright = document.getElementById('lbl-footer-copyright');
    if (lblFooterCopyright) lblFooterCopyright.innerHTML = `&copy; 2026 ${config.businessName} ${config.businessSub}. All Rights Reserved. Built by Largs Web Design.`;

    // FAQ Grid Loop Accordions
    const faqTitle = document.getElementById('faq-title');
    if (faqTitle) faqTitle.innerText = config.contactPage.faqSection.title;

    const faqSubtitle = document.getElementById('faq-subtitle');
    if (faqSubtitle) faqSubtitle.innerText = config.contactPage.faqSection.subtitle;

    const faqGrid = document.getElementById('faq-grid');
    if (faqGrid) {
        faqGrid.innerHTML = '';
        config.contactPage.faqSection.questions.forEach(item => {
            const faqBlock = document.createElement('details');
            faqBlock.className = 'faq-item';
            faqBlock.innerHTML = `
                <summary class="faq-question">
                    <span>🤔 ${item.q}</span>
                    <span class="faq-icon">＋</span>
                </summary>
                <div class="faq-answer-content">
                    <p class="faq-answer">${item.a}</p>
                </div>`;
            faqGrid.appendChild(faqBlock);
        });
    }

    // --- CINEMATIC TEXT & BACKGROUND CROSS-FADER SLIDER ---
    const bgPrimary = document.getElementById('hero-bg-primary');
    const bgSecondary = document.getElementById('hero-bg-secondary');
    const heroContentBox = document.querySelector('.hero-content');

    const slides = config.heroSlides && config.heroSlides.length > 0 ? config.heroSlides : [];
    let currentSlideIndex = 0;

    function getBgString(url) {
        return `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.7)), url('${url}')`;
    }

    if (slides.length > 0 && bgPrimary && bgSecondary) {
        bgPrimary.style.backgroundImage = getBgString(slides[currentSlideIndex].imgUrl);
        if (lblHeroTitle) lblHeroTitle.innerText = slides[currentSlideIndex].title;
        if (lblHeroDesc) lblHeroDesc.innerText = slides[currentSlideIndex].desc;

        // Auto-scroll loop interval execution
        setInterval(() => {
            const nextSlideIndex = (currentSlideIndex + 1) % slides.length;
            const nextSlide = slides[nextSlideIndex];

            if (heroContentBox) heroContentBox.classList.add('fade-out');
            bgSecondary.style.backgroundImage = getBgString(nextSlide.imgUrl);

            setTimeout(() => {
                bgSecondary.style.opacity = "1";
                if (lblHeroTitle) lblHeroTitle.innerText = nextSlide.title;
                if (lblHeroDesc) lblHeroDesc.innerText = nextSlide.desc;

                setTimeout(() => {
                    bgPrimary.style.backgroundImage = getBgString(nextSlide.imgUrl);
                    bgSecondary.style.opacity = "0";
                    if (heroContentBox) heroContentBox.classList.remove('fade-out');
                    currentSlideIndex = nextSlideIndex;
                }, 1500);
            }, 1000);
        }, 7000);
    }

    populateSchemaSEO(config);
}

// =========================================================================
// RUN ENGINE ON PAGE LOAD & AUTO-HIGHLIGHT NAV & DYNAMIC LABELS
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Fire your template content injector engine instantly
    hydrateTemplateEngine(siteConfig);

    // 2. Multi-Page Active Highlighting Engine
    // Isolates the exact HTML file name currently on screen (e.g., "about.html")
    const currentFileName = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const hrefAttribute = link.getAttribute('href');
        if (hrefAttribute && hrefAttribute.includes(currentFileName)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. SCALABLE NAVIGATION LABEL TRANSLATION ENGINE
    // Checks your config.js and automatically swaps out labels for main nav AND hero buttons
    if (siteConfig.navLabels) {
        // Target BOTH main navbar links and buttons inside the hero container
        document.querySelectorAll('.nav-link, .hero-actions .btn').forEach(link => {
            const href = link.getAttribute('href') || '';
            // Extract the filename from the link (e.g., "./services.html" becomes "services.html")
            const fileName = href.split('/').pop(); 
            
            // If this file name exists in your config settings, rewrite the text dynamically!
            if (fileName && siteConfig.navLabels[fileName]) {
                link.innerText = siteConfig.navLabels[fileName];
            }
        });
    }

    
});