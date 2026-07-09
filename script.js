

        // 1. Pull the settings instantly from your new file sitting right next door
        import { siteConfig as config } from './config.js';

        // Add this line immediately beneath your import statement!
        // It maps the configuration settings directly into your slideshow script engines.
        window.siteConfig = config;  // This line pushes it onto the global window dashboard!
        const siteConfig = config;

        // At the very top of script.js
        const basePath = window.location.hostname.includes('github.io') 
        ? `/${config.repositoryName}` 
        : '';


        // =========================================================================
        // LOCAL SEO SCHEMA COMPILER (Defined first so the hydrator can call it)
        // =========================================================================
        /**
         * Compiles and injects the dynamic Local SEO Schema.org data into the document head.
         * @param {Object} config - The site configuration object (siteConfig)
         */
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

                // 🚀 1. INJECT UNIQUE CUISINE SPECIALTIES (Default backup if missing)
                "servesCuisine": cp.servesCuisine || "Coffee, Cafe",
                
                // 🚀 2. INJECT STANDARDIZED PRICE SELECTION (Default backup if missing)
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
        // CONFIGURATION ENGINE CORE
        // =========================================================================
        function hydrateTemplateEngine(config) {
            // Apply Custom Stylesheets dynamically via JSON variables
            const root = document.documentElement;
            root.style.setProperty('--color-espresso', config.themeColors.textDark);
            root.style.setProperty('--color-roast', config.themeColors.darkNeutral);
            root.style.setProperty('--color-latte', config.themeColors.midNeutral);
            root.style.setProperty('--color-cream-dark', config.themeColors.lightNeutral);
            root.style.setProperty('--color-cream-light', config.themeColors.background);

            // Global Metadata & Typography
            document.getElementById('meta-title').innerText = config.metaTitle;
            //SKSK07/06/26 REMOVED document.getElementById('hero-bg-target').style.backgroundImage = `linear-gradient(rgba(44, 26, 17, 0.7), rgba(44, 26, 17, 0.7)), url('${config.heroImageUrl}')`;

            // Application Brand Text Slots
            document.getElementById('lbl-logo-main').innerText = config.businessName;


            // document.getElementById('lbl-logo-sub').innerText = config.businessSub;
            // If you have a subtitle span, ensure it hooks here:
            const subLabel = document.getElementById('lbl-logo-sub');
            if (subLabel) subLabel.innerText = config.businessSub || "";

            document.getElementById('lbl-hero-logo-main').innerText = config.businessName;
            document.getElementById('lbl-hero-logo-sub').innerText = config.businessSub;

            // Dynamically applies your brand colors straight from the config object
            // document.getElementById('lbl-logo-main').style.color = config.themeColors.espresso;
            // document.getElementById('lbl-logo-sub').style.color = config.themeColors.latte;


            // =========================================================================
            // DYNAMIC PNG LOGO INJECTION PIPELINE
            // =========================================================================
            const navVector = document.getElementById('nav-logo-vector');
            const navImage = document.getElementById('nav-logo-image');
            const heroVector = document.getElementById('hero-logo-vector');
            const heroImage = document.getElementById('hero-logo-image');

            // If a custom logo URL is provided in the JSON configuration file
            if (config.customLogoUrl && config.customLogoUrl !== "") {
                // 1. Assign the PNG path source straight to the image objects
                navImage.src = config.customLogoUrl;
                heroImage.src = config.customLogoUrl;

                // 2. Hide the old structural SVG circle vector stamps
                if (navVector) navVector.style.display = 'none';
                if (heroVector) heroVector.style.display = 'none';

                // 3. Make your premium transparent PNG elements visible on screen
                navImage.style.display = 'block';
                heroImage.style.display = 'block';
            }


            // Dynamic Vector Stamp Graphics Texts
            // Safe Vector Stamp Graphic Text Checks (Prevents script crashes!)
            const logoCenterText = document.getElementById('logo-center-text');
            if (logoCenterText) logoCenterText.textContent = config.businessName;

            const heroLogoCenterText = document.getElementById('hero-logo-center-text');
            if (heroLogoCenterText) heroLogoCenterText.textContent = config.businessName;


            // Hero Context
            document.getElementById('lbl-hero-title').innerText = config.homePage.heroTitle;
            document.getElementById('lbl-hero-desc').innerText = config.homePage.heroDesc;

            // Generate Dynamic Home Page Feature Icons
            const highlightsContainer = document.getElementById('container-highlights');
            highlightsContainer.innerHTML = '';

            // Define Inline SVG lookup mappings corresponding to keys
            // Got them from this website https://lucide.dev/icons/
            const vectorIcons = {
                coffee: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg>`,
                luggage: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 20V8a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"></path><path d="M7 6h10"></path></svg>`,
                users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
                sun: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
                heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
                wifi: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.94 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`,
                
                // THE OFFICIAL GEOMETRIC STERLING POUND ICON
                pound: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 7a4 4 0 0 0-7.75-1.38A4 4 0 0 0 7 9.5V19h11" />
                    <path d="M5 14h11" />
                    <path d="M5 19h14" />
                </svg>`,

                
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

            // Social Proof Injection Loop
            document.getElementById('lbl-review-score').innerText = config.homePage.reviewsScoreText;
            document.getElementById('lbl-review-title').innerText = config.homePage.reviewsHeadline;
            document.getElementById('lbl-review-subtitle').innerText = config.homePage.reviewsSub;


            /// SKSK28/06/26 ADDED code below
            ///THE PLACE THAT SHOWS THE GOOGLE REVIEWS SUMMARY BOARD
            // Use querySelector with a dot (.) to target the class instead of an ID
            const SummaryBoardSection = document.querySelector('.section-google-summary');

            if (config && config.features && config.features.showGoogleReviewsSummaryBoard === false) {
                if (SummaryBoardSection) {
                    // Overrides inline '!important' rules on the container
                    SummaryBoardSection.style.setProperty('display', 'none', 'important');
                }
            } else {
                if (SummaryBoardSection) {
                    SummaryBoardSection.style.setProperty('display', 'block', 'important');
                }
            }
            /// SKSK28/06/26 ADDED code above



            // HYDRATE THE GOOGLE BADGE CLICKABLE REVIEW LINK

            const placeId = config.contactPage.googlePlaceId;
            
            // URL 1: Forces open the direct pop-up form to WRITE a review
            const writeReviewUrl = `${config.contactPage.googleWriteReviewUrl}${placeId}`;
            // console.log("MY ABSOLUTE WRITE URL IS:", writeReviewUrl);

            // URL 2: Opens the Google Maps overview page to VIEW existing reviews
            const viewReviewsUrl = `${config.contactPage.googleViewReviewsUrl}${placeId}`;

            const googleBadgeLink = document.getElementById('link-google-reviews-home');
            // if (googleBadgeLink && config.contactPage && config.contactPage.googleViewReviewsUrl) {
            //     googleBadgeLink.setAttribute('href', config.contactPage.googleViewReviewsUrl);
            // }

            if (googleBadgeLink && config.contactPage && viewReviewsUrl) {
                googleBadgeLink.setAttribute('href', viewReviewsUrl);
            }

            const reviewsContainer = document.getElementById('container-reviews');
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

            // About View Content Loops
            document.getElementById('lbl-about-title').innerText = config.aboutPage.title;
            document.getElementById('lbl-about-subtitle').innerText = config.aboutPage.subtitle;

            /// SKSK28/06/26 ADDED code below
            ///THE PLACE THAT SHOWS THE GOOGLE REVIEWS SUMMARY BOARD
            // Use querySelector with a dot (.) to target the class instead of an ID
            const StoryBoardSection = document.querySelector('.about-static-media-box');

            if (config && config.features && config.features.showCompanyStoryboard === false) {
                if (StoryBoardSection) {
                    // Overrides inline '!important' rules on the container
                    StoryBoardSection.style.setProperty('display', 'none', 'important');
                }
            } else {
                if (StoryBoardSection) {
                    StoryBoardSection.style.setProperty('display', 'block', 'important');
                }
            }
            /// SKSK28/06/26 ADDED code above



            const aboutParagraphs = document.getElementById('container-about-paragraphs');
            //SKSK15/06/26 REMOVED aboutParagraphs.innerHTML = `<h3>${config.businessName} ${config.businessSub}</h3>`;
            config.aboutPage.storyParagraphs.forEach(text => {
                aboutParagraphs.innerHTML += `<p class="about-p">${text}</p>`;
            });

            const aboutFeatures = document.getElementById('container-about-features');
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

            // Services Grid Card Components Injection
            document.getElementById('lbl-services-title').innerText = config.servicesPage.headline;
            document.getElementById('lbl-services-subtitle').innerText = config.servicesPage.sub;
            const servicesGrid = document.getElementById('container-services-cards');
            servicesGrid.innerHTML = '';
            config.servicesPage.menuList.forEach(item => {
                servicesGrid.innerHTML += `
                    <div class="service-card">
                        <span class="service-emoji">${item.emoji}</span>
                        <h3>${item.name}</h3>
                    </div>`;
            });


            // --- TOGGLE MENU VISIBILITY ---
            // Run this directly right after the HTML elements are drawn so it targets it accurately
            const menuSection = document.querySelector('.menu-download-container');

            if (menuSection) {
                // Making sure it matches your specific layout config nested path: config.features.showMenu
                if (config.features && config.features.showMenu) {
                    menuSection.style.display = 'block'; // Shows the menu block
                } else {
                    menuSection.style.display = 'none';  // Hides and collapses the space completely
                }
            };	


            // HYDRATE OPENING TIMES FROM CONFIG FILE

            // 1. Grab the section element
            const hoursSection = document.getElementById('section-opening-hours');

            // 2. Check if the feature toggle is explicitly turned OFF
            if (config && config.features && config.features.showOpeningHours === false) {
                if (hoursSection) hoursSection.style.display = 'none';
            } else {
                // 3. Otherwise, if it's true (or enabled), show it and fill in the data
                if (hoursSection) hoursSection.style.display = 'block';

                if (config && config.servicesPage && config.servicesPage.openingHours) {
                    const hoursData = config.servicesPage.openingHours;
                    
                    const titleEl = document.getElementById('hours-title');
                    const subtitleEl = document.getElementById('hours-subtitle');
                    if (titleEl) titleEl.textContent = hoursData.title || "Opening Times";
                    if (subtitleEl) subtitleEl.textContent = hoursData.subtitle || "";
                    
                    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                    days.forEach(day => {
                        const timeCell = document.getElementById(`time-${day}`);
                        if (timeCell) {
                            timeCell.textContent = hoursData[day] || "Closed";
                        }
                    });
                }
            }



            // Contact Actions & Node Parameters
            document.getElementById('lbl-contact-address').innerText = config.contactPage.address;

            // --- DYNAMIC TELEPHONE BUTTON LOGIC ---
            if (config.contactPage && config.contactPage.contactTelephone) {
                const phoneNum = config.contactPage.contactTelephone;
                
                // 1. Clean out whitespace for proper native device routing
                const cleanPhone = phoneNum.replace(/\s+/g, '');

                // 2. Set the custom config icon (or default to 📞 if missing)
                const phoneIconElement = document.getElementById('lbl-contact-phone-icon');
                if (phoneIconElement) {
                    phoneIconElement.innerText = config.contactPage.phoneIcon || "📞";
                }

                // 3. Update the inner text of the button
                const phoneTextElement = document.getElementById('lbl-contact-telephone');
                if (phoneTextElement) {
                    phoneTextElement.innerText = phoneNum;
                }

                // 4. Transform the anchor link into a mobile trigger action
                const phoneLinkElement = document.getElementById('lnk-contact-telephone');
                if (phoneLinkElement) {
                    phoneLinkElement.setAttribute('href', `tel:${cleanPhone}`);
                }
            }


            // TARGET THE SRC PROPERTY DIRECTLY FOR THE MAP:
            const mapElement = document.getElementById('lbl-contact-map');
            if (mapElement) {
                mapElement.src = config.contactPage.mapUrl;
            }

            document.getElementById('lbl-contact-title').innerText = config.contactPage.title;
            document.getElementById('lbl-contact-desc').innerText = config.contactPage.desc;

            document.getElementById('btn-email-action').setAttribute('href', `mailto:${config.contactEmail}`);
            //document.getElementById('lbl-contact-address').innerText = config.locationFull;
            document.getElementById('lbl-contact-email').innerText = config.contactEmail;


            //***************************************************
            ///Form Submit, Message Me javascript AJAX logic
            //***************************************************
            const contactForm = document.getElementById('contact-form-submit');
            if (contactForm) {
                // 1. NOTICE THE /ajax/ ADDITION HERE - This fixes the API routing endpoint!
                contactForm.setAttribute('action', `https://formsubmit.co/ajax/${config.contactEmailEncrypted}`);

                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault(); 

                    const submitBtn = document.getElementById('form-submit-btn');
                    const successMsg = document.getElementById('form-success-message');
                    
                    if (submitBtn) {
                        submitBtn.innerText = "Sending...";
                        submitBtn.disabled = true;
                    }

                    // 2. Convert form elements cleanly into a regular JavaScript Object
                    const formData = new FormData(contactForm);
                    const object = {};
                    formData.forEach((value, key) => object[key] = value);
                    
                    // 3. Package it into a JSON string payload
                    const jsonPayload = JSON.stringify(object);

                    // Send the JSON packet to the FormSubmit AJAX backend
                    fetch(contactForm.action, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: jsonPayload
                    })
                    .then(response => response.json()) // FormSubmit responds with a JSON confirmation message
                    .then(data => {
                        if (data.success === "true" || data.success === true) {
                            // Success! Switch out the views
                            contactForm.style.display = 'none';
                            successMsg.style.display = 'block';
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


            // =========================================================
            // HYDRATION LOGIC: GOOGLE WRITE REVIEWS
            // =========================================================
            if (!config.features.showGoogleReviews) {
                // Delete layout nodes completely if turned off
                document.getElementById('btn-google-review-home')?.remove();
                document.getElementById('btn-google-review-contact')?.remove();
            } else {
                // If active, safely bind the configuration paths
                const googleHome = document.getElementById('btn-google-review-home');
                if (googleHome && writeReviewUrl) {
                    googleHome.setAttribute('href', writeReviewUrl);
                }
                const googleContact = document.getElementById('btn-google-review-contact');
                if (googleContact && writeReviewUrl) {
                    googleContact.setAttribute('href', writeReviewUrl);
                }
            }


            // =========================================================
            // HYDRATION LOGIC: TRIPADVISOR Write REVIEWS
            // =========================================================
            if (!config.features.showTripAdvisor) {
                // Delete layout nodes completely if turned off
                document.getElementById('btn-tripadvisor-review-home')?.remove();
                document.getElementById('btn-tripadvisor-review-contact')?.remove();
            } else {
                // If active, safely bind the configuration paths
                const taHome = document.getElementById('btn-tripadvisor-review-home');
                if (taHome && config.contactPage.tripAdvisorUrl) {
                    taHome.setAttribute('href', config.contactPage.tripAdvisorUrl);
                }
                const taContact = document.getElementById('btn-tripadvisor-review-contact');
                if (taContact && config.contactPage.tripAdvisorUrl) {
                    taContact.setAttribute('href', config.contactPage.tripAdvisorUrl);
                }
            }

            // =========================================================
            // CONTAINER SAFETY CLEANUP
            // =========================================================
            // If a client turns off BOTH switches, erase the parent wrapper frames 
            // to prevent empty ghost margins/spacing from breaking your layout.
            if (!config.features.showGoogleReviews && !config.features.showTripAdvisor) {
                document.getElementById('wrapper-reviews-home')?.remove();
                document.getElementById('wrapper-reviews-contact')?.remove();
            }


            // Global Footer Block Values
            document.getElementById('lbl-footer-name').innerText = `${config.businessName} ${config.businessSub}`;
            // document.getElementById('lbl-footer-tagline').innerText = `Your cozy island escape, looking out towards the peak of Goat Fell. Enjoy the finest coffee on the isle, conveniently located, ${config.locationShort}.`;
            document.getElementById('lbl-footer-tagline').innerText = `${config.footer.Tagline} ${config.locationShort}.`;
            document.getElementById('lbl-footer-email-link').setAttribute('href', `mailto:${config.contactEmail}`);
            document.getElementById('lbl-footer-email-link').innerText = config.contactEmail;
            document.getElementById('lbl-footer-copyright').innerHTML = `&copy; 2026 ${config.businessName} ${config.businessSub}. All Rights Reserved. Built by Largs Web Design.`;

            // Hydrate the FAQ Header Text
            document.getElementById('faq-title').innerText = config.contactPage.faqSection.title;
            document.getElementById('faq-subtitle').innerText = config.contactPage.faqSection.subtitle;

                // Loop through and build the FAQ layout grid dynamically
            const faqGrid = document.getElementById('faq-grid');
            if (faqGrid)
            {
                faqGrid.innerHTML = ''; // Clear out placeholders
                
                config.contactPage.faqSection.questions.forEach(item => {
                    // Create an interactive accordion item container
                    const faqBlock = document.createElement('details');
                    faqBlock.className = 'faq-item';
                    
                    faqBlock.innerHTML = `
                        <summary class="faq-question">
                            <span>🤔 ${item.q}</span>
                            <span class="faq-icon">＋</span>
                        </summary>
                        <div class="faq-answer-content">
                            <p class="faq-answer">${item.a}</p>
                        </div>
                    `;
                    faqGrid.appendChild(faqBlock);
                });
            }
            

            //SKSK08/06/26 ADDED code below
            // =========================================================================
            // 🎬 SYNCED CINEMATIC TEXT & BACKGROUND CROSS-FADER
            // =========================================================================
            const bgPrimary = document.getElementById('hero-bg-primary');
            const bgSecondary = document.getElementById('hero-bg-secondary');
            const heroContentBox = document.querySelector('.hero-content');
            const lblTitle = document.getElementById('lbl-hero-title');
            const lblDesc = document.getElementById('lbl-hero-desc');

            const slides = config.heroSlides && config.heroSlides.length > 0 ? config.heroSlides : [];
            let currentSlideIndex = 0;

            function getBgString(url) {
                // return `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url('${url}')`;
            // return `linear-gradient(rgba(44, 26, 17, 0.7), rgba(44, 26, 17, 0.7)), url('${url}')`;
            return `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.7)), url('${url}')`;
            }

            // Establish the initial static baseline slide on boot
            if (slides.length > 0) {
                bgPrimary.style.backgroundImage = getBgString(slides[currentSlideIndex].imgUrl);
                lblTitle.innerText = slides[currentSlideIndex].title;
                lblDesc.innerText = slides[currentSlideIndex].desc;
            }

            // Run the main slider cycle loop
            setInterval(() => {
                const nextSlideIndex = (currentSlideIndex + 1) % slides.length;
                const nextSlide = slides[nextSlideIndex];

                // 1. Initiate text fade-out sequence
                heroContentBox.classList.add('fade-out');

                // 2. Queue upcoming image background onto hidden layer
                bgSecondary.style.backgroundImage = getBgString(nextSlide.imgUrl);

                // 3. Wait for text to fade clear, then safely execute background dissolve
                setTimeout(() => {
                    bgSecondary.style.opacity = "1";

                    // Rewrite text headers while hidden out of view
                    lblTitle.innerText = nextSlide.title;
                    lblDesc.innerText = nextSlide.desc;

                    // 4. Once background dissolve completes, swap baselines and restore text
                    setTimeout(() => {
                        bgPrimary.style.backgroundImage = getBgString(nextSlide.imgUrl);
                        bgSecondary.style.opacity = "0";

                        // Bring text smoothly back into viewport light
                        heroContentBox.classList.remove('fade-out');
                        currentSlideIndex = nextSlideIndex;
                    }, 1500);

                }, 1000); // Trigger midpoint precisely when opacity zero threshold hits

            }, 7000); // Upped to 8 seconds so users have ample time to read your value pitches!


            // The code that sets up the Schema SEO
            // --- SCALABLE AGENCY SEO SCHEMA COMPILER ---
            if (siteConfig.contactPage) {
                const cp = siteConfig.contactPage;
                const sp = siteConfig.servicesPage;

                // 1. Establish core baseline details 
                const schemaData = {
                    "@context": "https://schema.org",
                    "@type": "CafeOrCoffeeShop",
                    "name": siteConfig.businessName || "Copperwheats",
                    "description": siteConfig.homePage?.heroDesc || "Specialty coffee house right by the ferry terminal.",
                    "url": window.location.href,
                    "telephone": cp.contactTelephone || "",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": cp.address ? cp.address.replace("📍", "").trim() : "The Pier",
                        "addressLocality": cp.locality || "Brodick",
                        "addressRegion": cp.region || "Isle of Arran",
                        "postalCode": cp.postalCode || "KA27",
                        "addressCountry": cp.countryCode || "GB"
                    }
                };

                // 2. Add Geolocation Data (if available in the configuration payload)
                if (cp.latitude && cp.longitude) {
                    schemaData.geo = {
                        "@type": "GeoCoordinates",
                        "latitude": cp.latitude,
                        "longitude": cp.longitude
                    };
                }

                // 3. Dynamic Operating Hours Translation Engine
                // Pulls from servicesPage.openingHours and normalizes for Schema.org formats
                if (sp && sp.openingHours) {
                    const rawHours = sp.openingHours.monday || "10:00 AM – 4:30 PM"; // Fallback safety
                    
                    // Split times and parse them into clean 24-hour markers (e.g., "10:00" and "16:30")
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
                        } catch (e) {
                            // Keep default backups if string splitting behaves unexpectedly
                        }
                    }

                    schemaData.openingHoursSpecification = [{
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": opens,
                        "closes": closes
                    }];
                }

                // 4. Safely package and push into the DOM target element
                const schemaElement = document.getElementById('seo-schema');
                if (schemaElement) {
                    schemaElement.textContent = JSON.stringify(schemaData, null, 2);
                }
            }

            // 🚀 Clean, readable, and perfectly isolated!
            populateSchemaSEO(config);

        };

        // =========================================================================
        // MULTI-PAGE SINGLE PAGE ROUTER SPA FRAMEWORK
        // =========================================================================
        document.addEventListener('DOMContentLoaded', () => 
        {

            // Execute Config Hydrator Engine on standard setup initialization
            hydrateTemplateEngine(siteConfig);

            const routes = 
            {
                '': 'home', '/': 'home', 'home': 'home',
                '/about': 'about', 'about': 'about',
                '/services': 'services', 'services': 'services',
                '/contact': 'contact', 'contact': 'contact'
            };

            function navigateToPage(targetPage) {
                const normalizedTarget = routes[targetPage] || 'home';

                document.querySelectorAll('main-section').forEach(section => {
                    if (section.id === `section-${normalizedTarget}`) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });

                document.querySelectorAll('.nav-link').forEach(link => 
                    {
                        if (link.getAttribute('data-target') === normalizedTarget) {
                            link.classList.add('active');
                    } 
                else 
                    {
                        link.classList.remove('active');
                    }
                });

                window.scrollTo(0, 0);
            }

            function handleNavigationClick(e) 
            {
                const targetAttr = e.target.closest('[data-target]');
                if (!targetAttr) return;

                e.preventDefault();
                const targetPage = targetAttr.getAttribute('data-target');
                const href = targetAttr.getAttribute('href');

                try {
                    if (window.location.protocol !== 'file:') {
                        // Prefix the href path with your dynamic basePath variable!
                        window.history.pushState({ page: targetPage }, '', `${basePath}${href}`);
                    }
                } catch (error) {
                    console.warn("Routing engine history stack pushState fallback triggered safely.", error);
                }

                navigateToPage(targetPage);
            }

            document.addEventListener('click', handleNavigationClick);

            window.addEventListener('popstate', (e) => 
            {
                if (e.state && e.state.page) {
                    navigateToPage(e.state.page);
                } else {
                    const initialPath = window.location.pathname;
                    navigateToPage(routes[initialPath] || 'home');
                }
            });

            const currentPath = window.location.pathname;
            navigateToPage(routes[currentPath] || 'home');
        });
    

        // // ==========================================
        // // CENTRALIZED SLIDE CONTROLLER (SCOPE FIXED)
        // // ==========================================
        // window.changeSlide = function(direction) {
        //     // 1. Grab reference layout elements
        //     const bgPrimary = document.getElementById('hero-bg-primary');
        //     const bgSecondary = document.getElementById('hero-bg-secondary');
        //     const lblTitle = document.getElementById('lbl-hero-title');
        //     const lblDesc = document.getElementById('lbl-hero-desc');
        //     const heroContentBox = document.querySelector('.hero-content');
            
        //     // 2. Fetch the slide list cleanly from your top-level siteConfig
        //     const slidesList = window.siteConfig?.heroSlides || [];
        //     const totalSlides = slidesList.length;
        //     if (totalSlides === 0 || !bgPrimary || !bgSecondary) return;

        //     // 3. Track the active slide position safely in global window memory
        //     if (typeof window.mySwipeIndex === 'undefined') {
        //         window.mySwipeIndex = 0;
        //     }

        //     // 4. Increment/Decrement with mathematical wrapping
        //     window.mySwipeIndex = (window.mySwipeIndex + direction + totalSlides) % totalSlides;
        //     const nextSlide = slidesList[window.mySwipeIndex];

        //     // Helper matching your background filter layout
        //     const getBgString = (url) => `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.7)), url("${url}")`;

        //     // 5. Fire the visual cross-fade layout sequence
        //     if (heroContentBox) heroContentBox.classList.add('fade-out');
        //     bgSecondary.style.backgroundImage = getBgString(nextSlide.imgUrl);

        //     setTimeout(() => {
        //         bgSecondary.style.opacity = "1";
        //         if (lblTitle) lblTitle.innerText = nextSlide.title;
        //         if (lblDesc) lblDesc.innerText = nextSlide.desc;

        //         setTimeout(() => {
        //             bgPrimary.style.backgroundImage = getBgString(nextSlide.imgUrl);
        //             bgSecondary.style.opacity = "0";
        //             if (heroContentBox) heroContentBox.classList.remove('fade-out');
        //         }, 1500);
        //     }, 1000);
        // };

        // // ==========================================
        // // UNIFIED GHOST SWIPE ENGINE (TOUCH & MOUSE)
        // // ==========================================
        // const heroSection = document.querySelector('.hero-section');
        // let isDragging = false;
        // let startX = 0;
        // const swipeThreshold = 50; 

        // if (heroSection) {
        //     // Touch Screen Listeners (Mobile)
        //     heroSection.addEventListener('touchstart', (e) => {
        //         startX = e.changedTouches[0].screenX;
        //     }, { passive: true });

        //     heroSection.addEventListener('touchend', (e) => {
        //         const endX = e.changedTouches[0].screenX;
        //         handleSwipeDirection(startX, endX);
        //     }, { passive: true });

        //     // Mouse Drag Listeners (Desktop)
        //     heroSection.addEventListener('mousedown', (e) => {
        //         isDragging = true;
        //         startX = e.screenX;
        //         if(e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
        //             e.preventDefault(); 
        //         }
        //     });

        //     window.addEventListener('mouseup', (e) => {
        //         if (!isDragging) return;
        //         isDragging = false;
        //         const endX = e.screenX;
        //         handleSwipeDirection(startX, endX);
        //     });
        // }

        // // Processing Controller
        // function handleSwipeDirection(start, end) {
        //     const diff = start - end;
        //     if (Math.abs(diff) > swipeThreshold) {
        //         if (diff > 0) {
        //             window.changeSlide(1);  // Swiped Left -> Next
        //         } else {
        //             window.changeSlide(-1); // Swiped Right -> Previous
        //         }
        //     }
        // }
       
   