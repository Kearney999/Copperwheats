// config.js - The Three Reasons Restaurant & Pub Configuration
export const siteConfig = 
{
    theme: "fun.css",  //choices are found in the styles folder

    navLabels: {
        "index.html": "Home",
        "about.html": "Our Story",
        "services.html": "Menu",
        "contact.html": "Find us"
    },

    repositoryName: 'TheThreeReasons', //This is where the files sit.

    customLogoUrl: "logo.png", 
    businessName: "The Three Reasons",
    businessSub: "Good Drink, Good Meal, Good Times!",
    metaTitle: "The Three Reasons Pub | Largs, Ayrshire, Scotland",
    contactEmail: "info@thethreereasonslargs.co.uk",
    contactEmailEncrypted: "5e3574e3d7e74f8f7516e29ca84dc19d",
    locationShort: "Opposite the pier",
    locationFull: "14 Gallowgate Street, Largs, KA30 8LX",
    
    // 🎨 REFINED BRAND COLOR SCHEMA (Based on back-glass design)
    themeColors: {
        textDark: "#2d1f21",       // Deep charcoal-purple for high-contrast, elegant body text
        darkNeutral: "#8f444e",    // The core brand Purple from your back-glass
        midNeutral: "#070706",     // Softened Sage-Olive that pairs beautifully with white/cream
        lightNeutral: "#faeaae",   // The signature Cream for warm container blocks and cards
        background: "#fdfcf9"      // A soft, premium off-white canvas that makes the brand colors pop
    },

    logoSettings: {
        showFrame: true,          /* Set to false to hide the background spotlight outline */
        frameWidth: "120px",      /* The width of the translucent wrapper */
        frameHeight: "120px",     /* The height of the translucent wrapper */
        frameRadius: "50%",       /* 50% for circle/ellipse, or use pixels like "12px" for squares */
        
        imageWidth: "125px",      /* The width of the actual image logo inside */
        imageHeight: "125px",      /* The height of the actual image logo inside */
        // 🌟 PRECISION NUDGING: Centering coordinates controlled by config
        imageTop: "57%",
        imageLeft: "49%"
    },

    // =========================================================
    // FEATURE SWITCHES (Turn sections ON [true] or OFF [false])
    // =========================================================
    features: {
        showGoogleReviews: true, //Show Goole Reviews buttons
        showTripAdvisor: true, //Shw TripAdvisor buttons
        showOpeningHours: true, //Show Opening Hours
        showGoogleReviewsSummaryBoard: true, //Show or Hide the SumamryBoard
        showCompanyStoryboard: true, //Show or Hide the Storyboard
        showMenu: true // Set to false to instantly hide the menu across the site
    },

    heroSlides: [
        {
            imgUrl: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1600&fit=crop&q=80",
            title: "Exceptional Meals Cooked Fresh Daily",
            desc: "From hearty pub favourites to modern kitchen creations, we pride ourselves on serving up premium quality comfort food on the Largs coast."
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&fit=crop&q=80",
            title: "Our Famous Traditional Sunday Roast",
            desc: "Fluffy Yorkshire puddings, perfectly roasted potatoes, rich homemade gravy, and served with a smile."
        },
        {
            imgUrl: "./images/GuestRealAles_33Percent.png",
            title: "Rotating Guest Real Ales brewed locally",
            desc: "We maintain a guest ale rotation from local breweries from Isle Of Arran, Kelburn, Orkney, Skye and many others over the years"
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=1600&fit=crop&q=80",
            title: "A Proud Family Legacy Since 2014",
            desc: "Pouring great pints, serving outstanding food, and maintaining the highest standards in North Ayrshire."
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&fit=crop&q=80",
            title: "A Warm Coastal Welcome For Everyone",
            desc: "Whether you are a local regular or a day-tripper arriving on the coast, Stewart and the team treat you like family."
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600&fit=crop&q=80",
            title: "Relax in a Great Seafront Atmosphere",
            desc: "Unwind with our exceptional selection of cold draft premium beers, guest ales, fine regional malt whiskies, and crisp gins."
        }
        ,
        {
            imgUrl: "./images/QuizNight_TheThreeReasons.png",
            title: "Quiz Night every Monday night",
            desc: ""
        }
    ],
    homePage: {
        heroTitle: "Welcome to The Three Reasons Restaurant & Pub.",
        heroDesc: "A bustling, cozy seafront tavern nestled right on Gallowgate Street in Largs. Established in 2014, we are renowned for exceptional daily meals, welcoming community atmosphere, and legendary weekend roasts.",
        highlights: [
            { icon: "utensils", title: "Exceptional Meals", desc: "A robust menu filled with hearty, locally sourced pub classics and chef specials designed to hit the spot." },
            { icon: "star", title: "Legendary Roasts", desc: "Join us for our famous traditional roasts, complete with all the classic trimmings and a deep, savory homemade gravy." },
            { icon: "users", title: "Family Tradition", desc: "A proudly independent free house with hospitality knowledge passed down through generations, maintaining exceptional standards for locals and visitors alike." },
            { icon: "martini", title: "Premium Gantry", desc: "A wide selection of rotating real ales, crisp cold lagers, artisan Scottish gins, and exceptional malt whiskies." },
            { icon: "heart", title: "Dog Friendly Bar", desc: "Four-legged friends are always welcome in our front bar section with a fresh bowl of water and a warm smile." },
            { icon: "wifi", title: "Free Customer Wi-Fi", desc: "Stay fully connected while you dine; our high-speed guest network password is completely complimentary." },
            { icon: "pound", title: "Payment", desc: "We accept all major contactless providers, Apple Pay, Google Pay, as well as traditional notes and coins." }
        ],
        reviewsHeadline: "Loved by Locals & Day-Trippers",
        reviewsSub: "Discover authentic guest insights left by our visitors on Google Reviews",
        reviewsScoreText: "4.6 / 5.0 Rating (1,097)",
        googleReviews: [
            { initials: "AM", name: "Andrew M.", "badge": "Local Guide", text: "\"The exceptional meals here never disappoint. The steak pie is legendary, the pastry is light, and the service is fast and friendly even when they are packed on a busy days.\"" },
            { initials: "HC", name: "Helen C.", "badge": "Family Diner", text: "\"Brought the family in for their traditional Sunday roast and it was easily the best we've had in Ayrshire. Lovely Yorkies and the beef melted in your mouth.\"" },
        { initials: "GR", name: "Graham R.", "badge": "Regular", text: "\"A proper pub with restaurant-standard food. we can boast being the very best restaurant of 35 in Largs as rated by visitors kind enough to leave a review on Tripadvisor. Thank you!\"" }
        ]
    },
    aboutPage: {
        title: "Our Story",
        subtitle: "Established in 2014, our diner represents a proud family legacy of coastal hospitality, great company, and exceptional cooking...",
        storyParagraphs: [
            "The story of The Three Reasons is rooted deeply in a passion for authentic Scottish hospitality. Established in 2014, the pub was built on the foundation of providing a vibrant community hub where exceptional meals and perfectly poured drinks meet.",
            "Today, the venue is solely run by owner Stewart Grant, who proudly follows in the footsteps of his locally well known publican and father, Colin. Carrying forward decades of family insight, standards, and dedication, Stewart has cemented the pub's reputation as a must-visit destination on the Largs front.",
            "We believe that a great pub relies on consistency: local ingredients handled with care, and an unyielding commitment to making every single day-tripper and local resident feel instantly at home.",
            "From our kitchen's famous traditional roasts to our signature daily specials, every dish represents our family's pride in serving the best that Ayrshire has to offer.",
            "We look forward to welcoming you through our doors to share in the lively chatter, exceptional food, and beautiful coastal views we get to look out on every day."
        ],
        features: [
            { emoji: "🥩", title: "Exceptional Dining", desc: "A diverse menu highlighting premium beef burgers, homemade steakpies using the best ingredients from A.D. Paton Est 1840, and excellent vegetarian alternatives." },
            { emoji: "🍺", title: "Seafront Bar Atmosphere", desc: "The perfect spot to unwind with a cold pint or sample an exceptional malt whisky after walking the promenade." },
            { emoji: "🤝", title: "A True Family Business", desc: "Solely run by Stewart Grant, delivering a personalized level of service that treats every single customer like an old friend." },
            { emoji: "🌅", title: "Beautiful Largs Location", desc: "Perfectly placed right against the scenic promenade, providing a warm refuge and a fantastic meal whatever the Scottish weather brings."}
        ]
    },
    servicesPage: {
        headline: "What We Offer?",
        sub: "We serve an extensive menu of hearty traditional pub food, premium chef specials, artisan desserts, children's portions, and a fully stocked gantry of draft beers, wines, and spirits.",
        openingHours: {
            title: "Operating Hours",
            subtitle: "Open daily for exceptional lunches, dinners finish at 7pm, and selection of traditional pub drinks",
            monday: "11:00 AM – 12:00 PM",
            tuesday: "11:00 AM – 12:00 PM",
            wednesday: "11:00 AM – 12:00 PM",
            thursday: "11:00 AM – 12:00 PM",
            friday: "11:00 AM – 12:00 AM",
            saturday: "11:00 AM – 12:00 AM",
            sunday: "12:30 PM – 10:30 PM"
        },
        menuList: [
            { emoji: "🥩", name: "Traditional Roasts" },
            { emoji: "🍔", name: "Gourmet Burgers & Steaks" },
            { emoji: "🥧", name: "Homemade Scottish Steak Pies" },
            { emoji: "🍺", name: "Real Ales & Lagers" },
            { emoji: "🍷", name: "Fine Wines & Malt Whiskies" },
            { emoji: "🧒", name: "Kids' Portions" }
        ]
    },
    contactPage: {
        address : "📍 14 Gallowgate Street, Largs, North Ayrshire",
        phoneIcon: "📞",
        contactTelephone: "+44 1475 672330",
        postalCode: "KA30 8LX",
        locality: "Largs",
        region: "North Ayrshire",
        countryCode: "GB",
        latitude: "55.7944",
        longitude: "-4.8692",
        featuredImage: "https://www.thethreereasonslargs.co.uk/images/threereasons_frontage.jpg", 
        priceRange: "££",
        servesCuisine: "Bar, Pub, Traditional Pub Food, British, Scottish, Roasts, Burgers, Steaks, Vegetarian options, Gluten-free options",
        mapUrl : "https://maps.google.com/maps?q=The%20Three%20Reasons,%2014%20Gallowgate%20Street,%20Largs&t=&z=16&ie=UTF8&iwloc=&output=embed",
        title: "Get In Touch",
        desc: "Planning a large family gathering, looking to secure a table for our famous weekend roast, or have a question about our options? Give Stewart and the team a ring or send an email, and we will be glad to help.",
        googlePlaceId: "ChIJXXvw3wG5iUgRKaCJ0OPH6oI", 
        googleViewReviewsUrl: "https://search.google.com/local/reviews?placeid=",
        googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=",
        tripAdvisorUrl: "https://www.tripadvisor.co.uk/UserReviewEdit-g551771-d7236393-The_Three_Reasons-Largs_North_Ayrshire_Ayrshire_Scotland.html",
        faqSection: {
            title: "Frequently Asked Questions",
            subtitle: "Everything you need to know about dining, drinking, and visiting us on the Largs coast.",
            questions: [
                {
                    q: "When do you serve your traditional roasts?",
                    a: "Our famous traditional roasts are prepared fresh every weekend, featuring premium cuts of meat, large Yorkshire puddings, and rich gravy. We recommend coming down early as it's a firm local favourite!"
                },
                {
                    q: "Are dogs allowed inside the venue?",
                    a: "Yes! Well-behaved four-legged friends are warmly welcome in our main front bar area. We have fresh water bowls and a treat ready behind the counter."
                },
                {
                    q: "Do we need to book a table for dinner?",
                    a: "We always keep space open for walk-ins in our lively bar area, but if you are bringing a large group or planning a family dinner on the weekend, we highly recommend calling ahead to reserve a table."
                },
                {
                    q: "Do you cater to dietary requirements and allergies?",
                    a: "Absolutely. Our menu features clearly marked vegetarian, vegan, and gluten-free choices. Please inform your server of any severe allergies before ordering so our kitchen team can take maximum care."
                }
            ]
        }
    },
    footer: {
        Tagline: "Relax in a great atmosphere, with exceptional food and traditional hospitality under the care of Stewart Grant."
    }
};