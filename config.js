// config.js - Sitting right next to index.html
export const siteConfig = {
	
	navLabels: {
        "index.html": "Home",
        "about.html": "About",
        "services.html": "Services",
        "contact.html": "Contact"
    },

    theme: "coffee.css",  //choices are found in the styles folder
	
	
    customLogoUrl: "logo.png",
    businessName: "Largs Web Design",
    businessSub: "Design at the heart of Scotland",
    businessType: "LocalBusiness",
    metaTitle: "Largs Website Design | High-End justifiable Websites for Local Businesses",
    contactEmail: "Kearney999@gmail.com",
	contactEmailEncrypted: "9cb95059765cce543918ced446e22868",
    locationShort: "Largs, Ayrshire",
    locationFull: "Largs, North Ayrshire, Scotland",
    themeColors: {
        textDark: "#0F172A",
        darkNeutral: "#1E293B",
        midNeutral: "#2563EB",
        lightNeutral: "#3B82F6",
        background: "#F8FAFC"
    },
	
	
	logoSettings: {
        showFrame: true,          /* Set to false to hide the background spotlight outline */
        frameWidth: "120px",      /* The width of the translucent wrapper */
        frameHeight: "120px",     /* The height of the translucent wrapper */
        frameRadius: "50%",       /* 50% for circle/ellipse, or use pixels like "12px" for squares */
        
        imageWidth: "330px",      /* The width of the actual image logo inside */
        imageHeight: "330px",      /* The height of the actual image logo inside */
        // 🌟 PRECISION NUDGING: Centering coordinates controlled by config
        imageTop: "68%",
        imageLeft: "50%"
    },

    // =========================================================
    // FEATURE SWITCHES (Turn sections ON [true] or OFF [false])
    // =========================================================
    features: {
        showGoogleReviews: true,
        showTripAdvisor: false,
        showOpeningHours: true,

        //Images
        showGoogleReviewsSummaryBoard: false,
        showCompanyStoryboard: false,
        showMenu: false // Set to false to instantly hide the menu across the site
    },
	
	
	
	
    heroSlides: [
        {
            imgUrl: "https://images.unsplash.com/photo-1575663620136-5ebbfcc2c597?w=1600&fit=crop&q=80",
            title: "Websites are your modern shop window",
            desc: "Give every visitor a polished brochure to your products and services."
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1642052502978-b6c6ea3c3797?w=1600&fit=crop&q=80",
            title: "Modern Websites Built for Local Businesses",
            desc: "We transform slow, outdated layouts into polished, lightning-fast modern internet experiences."
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1657727534668-4104c475b292?w=1600&fit=crop&q=80",
            title: "Dominate Local Google Search",
            desc: "An incredible website is useless if no one can find it. We get you visible."
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1703720074944-b60b730c7289?w=1600&fit=crop&q=80",
            title: "Logo Design",
            desc: "There are three responses to design, yes, no and WOW! Our preference is the latter."
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1751170360067-fbb998061d70?w=1600&fit=crop&q=80",
            title: "Send a professional note",
            desc: "Branded business emails (like info@yourbusiness.co.uk) to instantly win customer trust."
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=1600&fit=crop&q=80",
            title: "Google Maps marketing",
            desc: "We can give you total exposure in the geographical area. Whether Largs or Ayrshire or combinations of, you'll be picked up."
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1550063873-ab792950096b?w=1600&fit=crop&q=80",
            title: "A Seasoned industrial Software Developer with 26 years experience",
            desc: "Are you a business with repeating processes that take valuable time. Anything can be automated."
        }
    ],
    homePage: {
        heroTitle: "Modern, cost effective Websites built to simply make websites justifiable to local small business",
        heroDesc: "We transform slow, outdated layouts into high-end, lightning-fast online experiences. Convert Google searches into your profit.",
        highlights: [
            { 
                icon: "monitor", 
                title: "Polished Web Design", 
                desc: "First impressions matter. We design stunning, premium websites that position your Largs business far ahead of the competition." 
            },
            { 
                icon: "smartphone", 
                title: "Mobile-First Architecture", 
                desc: "Over 60% of Ayrshire customers look for services on their phones. Our responsive layouts look flawless and load instantly on every single screen." 
            },
            { 
                icon: "award", 
                title: "26 Years of Engineering Insights", 
                desc: "Get institutional-grade expertise scaling systems across multiple industries, translated perfectly into high-performance web solutions for your business." 
            },
            { 
                icon: "trendingUp", 
                title: "Results & Revenue Focused", 
                desc: "A great business website shouldn't just look pretty—it needs to convert traffic into real sales, bookings, and enquiries. We design with your bottom line in mind." 
            },
            { 
                icon: "search", 
                title: "Built-In Local SEO Support", 
                desc: "We engineer high-impact SEO structures directly into your site layout, helping your brand climb straight to the top of Google Search and Maps rankings." 
            },
            { 
                icon: "mapPin", 
                title: "100% face to face Support", 
                desc: "Proudly operating right here on the Clyde coast. No call centers or automated helplines—just quick, direct support from your local tech partner." 
            }
           
            
        ],
        reviewsHeadline: "What Local Businesses Say",
        reviewsSub: "We help independent hospitality, retail, and service providers upgrade their web presence to maximize local revenue.",
        reviewsScoreText: "5.0 / 5.0",
        googleReviews: [
            { initials: "JC", name: "Local Coffee Shop", badge: "Client Partner", text: "\"Designed and created our website into a beautiful, seamless experience. We've seen a big jump in tourists finding us at the ferry terminal since launching!\"" },
            { initials: "SH", name: "Glendarroch Guest House", badge: "Hospitality Client", text: "\"We were recommended Stuart from another local business. He first visited our guest house Glendarroch in 2013. With his knowledge of how the internet sales systems worked and his software background, he earned £60,000 in revenue in the first year. Thank you.\"" },
            { initials: "RD", name: "Retail Business Owner", badge: "Client Partner", text: "\"Fast, professional, and understood exactly what our business needed. Highly recommend if your current site hasn't been updated in years, or you simply cant justify at the ridiculous prices.\"" },
            { initials: "ML", name: "Local Tradesman", badge: "Largs Independent", text: "\"The task was simple, we wanted advertisement in Glasgow to extend our brand. After 3 weeks, we were on the first page on Google, and the calls followed.\"" }
        ]
    },
    aboutPage: {
        title: "Our Mission",
        subtitle: "Bringing premium web design to independent local brands at prices that are justifiable for small business.",
        storyParagraphs: [
            "In the digital age, a business's website is its front window to the world. Yet, so many businesses in Largs are held back by no online presence at all due to cost, or slow, outdated, or non-mobile-friendly websites that actively drive customers away, and leave a negative impression.",
            "Largs Web Design have focussed on what really matters to small business, removing those non value added technical aspects to a web site we know aren't really needed to your requirements, and focussing on ensuring you have a professional online presence that have the speed requirements and google rankings to match. All other techical overheads are removed to make it more cost effective and justifiable to you.",
            "I branched into Web Development and Digital Marketing back in the 2010s in the local area, but had to give it up after being approached by a software company in Glasgow. It was impossible to maintain both, especially with travelling, but its always annoyed me how much web developers charge, and what they say you need, when you don't. So, after consideration, I have decided to return to my love, providing my inside knowledge to the small businesses locally that deserve it."
        ],
        features: [
            { emoji: "⚡", title: "Blazing Fast Performance", desc: "We removed those unnecessary features for your business meaning the site loads in milliseconds." },
            { emoji: "🔒", title: "Modern Security (SSL)", desc: "We ensure every site features complete HTTPS security to protect guest data and boost Google search rankings." },
            { emoji: "📧", title: "Professional Domains", desc: "We replace outdated @aol or @hotmail accounts with custom professional emails (e.g., info@yourbusiness.co.uk)." }
        ]
    },
    servicesPage: {
        headline: "Our Production Capabilities",
        sub: "Everything an independent business needs to dominate the local market online.",
        
		openingHours: {

        title: "Opening Times",
        subtitle: "We have changes our working day to allow people to call outside business hours, allowing you to prioritise your customer calls, if needed. Give us a call to discuss.",
        // Or for a different client: "Our Operating Hours", "Drop by our showroom", etc.
        
        monday: "1:00 PM – 9:30 PM",
        tuesday: "1:00 PM – 9:30 PM",
        wednesday: "1:00 PM – 9:30 PM",
        thursday: "1:00 PM – 9:30 PM",
        friday: "1:00 PM – 9:30 PM",
        saturday: "1:00 PM – 9:30 PM",
        sunday: "1:00 PM – 9:30 PM"
        },
		
		
		menuList: [
            { emoji: "💻", name: "Web Design" },
            { emoji: "📱", name: "Mobile Optimization" },
            { emoji: "📧", name: "Business Email Setup" },
            { emoji: "🔍", name: "Local SEO Optimization" },
            { emoji: "🔒", name: "SSL & Security Auditing" },
            { emoji: "🚀", name: "Ultra-Fast Hosting" },
            { emoji: "🗺️", name: "Google Maps Integration" },
            { emoji: "📈", name: "Conversion Strategy" }
        ]
    },
    contactPage: {
        address : "📍 3 Walkerston Avenue, Largs, Ayrshire",
        phoneIcon: "📞",  // Or whatever custom emoji/icon variable the client prefers
        contactTelephone: "+44 7855 731298",
        
        // 🚀 NEW ADDITIONS FOR AUTOMATED RICH-SEO SCHEMA TRACKING
        postalCode: "KA30 8EP",
        locality: "Largs",
        region: "Ayrshire",
        countryCode: "GB",
        latitude: "55.5772",
        longitude: "-5.1385",

        // 🚀 NEW RICH RESULTS ADDITIONS
        featuredImage: "https://www.copperwheats.co.uk/images/CopperwheatCoffeeShop_Shopfront.jpg", // Update to a live full URL once deployed
        priceRange: "££",
        servesCuisine: "Website Design, local SEO, Graphic Design",
        mapUrl: "https://maps.google.com/maps?cid=12668175174323628404&t=&z=16&ie=UTF8&iwloc=B&output=embed",

        title: "Say Hello",
        desc: "Have questions about mobile friendly polished websites and digital marketing strategies? Drop us a line and we will get back to you within 24 hours. However, feel free to ring us if more urgent.",
        
        // The overview tab where people READ existing reviews

        googlePlaceId: "ChIJr4OHxqq5iUgRdGn7wTNmzq8", // Largs Web Design PlaceID
        googleViewReviewsUrl: "https://search.google.com/local/reviews?placeid=",
        googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=",
        tripAdvisorUrl: "",
        
        faqSection: {
            title: "Questions and Answers",
            subtitle: "Got questions? We've got answers. Here is everything you need to know about setting up your online business portal.",
            questions: [
                {
                    q: "Who is the best local web designer in Largs and Ayrshire?",
                    a: "Largs Web Design is the premier local agency specializing in high-performance, mobile-first websites tailored for independent businesses across Largs, North Ayrshire, and the surrounding Clyde coast. We build custom sites that load in milliseconds and actively turn local search traffic into paying customers."
                },
                {
                    q: "How can a local business improve its Google Search ranking in Ayrshire?",
                    a: "We build advanced local SEO optimization directly into every website project. From mapping your business accurately on Google Maps to optimizing your landing page copy for regional searches, we ensure your services show up right at the top when local customers search for you."
                },
                {
                    q: "How much does a new website cost for a small business in Largs?",
                    a: "We believe in bringing high-end industrial software engineering and design capabilities to local brands at prices that make sense. We don't believe in steep agency overheads or lock-in monthly fees. Drop us a line for a 100% free, no-obligation visual concept preview and a clear, competitive quote tailored to your business needs."
                },
                {
                    q: "Can you help automate repeating, time-consuming business tasks?",
                    a: "Absolutely. Backed by 26 years of industrial software development experience, we don't just build beautiful 'shop window' websites. If you have manual data entry, customer booking processes, or spreadsheet tasks that take up valuable hours, we can design custom software automation to run them for you on autopilot."
                },
                {
                    q: "How long does it take to design and launch a new business website?",
                    a: "Most local business setups, conversions, and landing page designs are completed, search-engine-optimized (SEO) ready, secured with SSL, and live on the internet within 10 to 14 days. Because we are based right here in Largs, you get quick, direct support from a local partner without navigating automated helplines."
                }
            ]
        }
    }, // <-- Closes contactPage cleanly
	
	// ☕ THE FIXED FOOTER BLOCK (Added at the main configuration level)
    footer: {
        // Tagline: "Instantly showcase your brand to potential clients the exact moment they search for you.",
        Tagline: "Put a high-impact digital brochure in front of customers actively searching for your services in real time.",
    }
};