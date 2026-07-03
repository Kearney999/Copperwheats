// config.js - Nardini's Coffee Shop Configuration
export const siteConfig = 
{

    customLogoUrl: "logo.png", // Points directly to your local coffee shop logo
    businessName: "Copperwheats",
    businessSub: "Island views, premium brews",
    // businessSub: "by the Ferry Terminal",
    metaTitle: "Copperwheats Coffee House | Brodick, Arran",
    contactEmail: "john.copperwheat69@gmail.com",
    contactEmailEncrypted: "4d2463d2c6d63e7e6405d18b973cb08c",
    locationShort: "just opposite from the Ferry Terminal",
    locationFull: "Brodick Ferry Terminal",
    themeColors: {
        textDark: "#2C1A11",
        darkNeutral: "#4A3525",
        midNeutral: "#8C6A50",
        lightNeutral: "#EADBC8",
        background: "#FAF6F0"
    },


    // =========================================================
    // FEATURE SWITCHES (Turn sections ON [true] or OFF [false])
    // =========================================================
    features: {
        showGoogleReviews: true,
        showTripAdvisor: true,
        showOpeningHours: true,

        //Images
        showGoogleReviewsSummaryBoard: true,
        showCompanyStoryboard: true
    },




    heroSlides: [
        
        {
            imgUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&fit=crop&q=80",
            title: "Premium coffee from Myrtle, est. 1984",
            desc: "For 20 years, Myrtle has been our signature brand, defined by a single promise: procuring coffee of the highest quality."
        },
        {
            // Magic Relative Path: Looks in the images folder right next door!
            imgUrl: "./images/ArranIceCream_WithLogo.png", 
            title: "Top awarding winning Arran Ice Cream",
            desc: "What's your favourite? A choice of flavours from the old time favourites to the more exotic."
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1600&fit=crop&q=80",
            title: "Choose your Coffee or Tea favourite",
            desc: "Cappuccino, Latte, Flat White, Mocha, Espresso, Iced Coffee, Guest coffee, and 12 brands of tea."
        },
        {
            imgUrl: "./images/cookiesandcakes.jpg",
            title: "Beautiful, freshly baked cakes, cookies, biscuits and pastries",
            desc: "Enjoy your quality time with that perfect accompaniment."
        },
        {
            imgUrl: "./images/coffeesyrups.jpg",
            title: "Flavour with your favourite syrup",
            desc: "Add a coffee syrup : Caramel, Coconut, Vanilla, Cinnamon, Honeycomb, Creme Brulee, Gingerbread, Butterscotch and Roasted Hazelnut"
        }
    ],
    homePage: {
    heroTitle: "The picturesque Island and Copperwheats' welcome you.",
    heroDesc: "A warm, cozy spot nestled right by the Brodick Ferry Terminal. Perfect for a refreshing break, delicious local treats, or relaxing while you wait for your ship to come in.",
    highlights: [
        { icon: "coffee", title: "Premium Coffee & Teas", desc: "Speciality brews, featuring the premium craft flavors of Myrtle alongside a rotating monthly guest coffee." },
        { icon: "luggage", title: "Left Luggage", desc: "Secure bag storage so you can freely explore Brodick without being weighed down." },
        { icon: "users", title: "Everyone Welcome", desc: "A fully wheelchair-accessible and spacious layout designed to easily accommodate families and groups." },
        { icon: "sun", title: "Outdoor Patio Area", desc: "Take in the beautiful island views of Goat Fell across the bay whilst breath in that fresh sea air from our comfortable outdoor seating patio." },
        { icon: "heart", title: "Dog Friendly", desc: "Four-legged friends are always welcome with a warm smile, fresh water bowls, and of course those doggy treats." },
        { icon: "wifi", title: "Free Wi-Fi", desc: "Stay connected while you relax; our customer Wi-Fi network password is freely available with our compliments." },
        { icon: "pound", title: "Payment", desc: "We take contactless payment, apple pay and of course notes and coins are more than welcome." }
    ],
        reviewsHeadline: "Loved by Travellers & Locals",
        reviewsSub: "Discover authentic guest insights with our Google Reviews",
        reviewsScoreText: "4.4 / 5.0 Rating (93)",
        googleReviews: [
            { initials: "JM", name: "James M.", "badge": "Local Guide", text: "\"The left luggage service here is a complete lifesaver! Dropped our heavy suitcases off secure and safe, allowing us to walk and enjoy Brodick hassle-free before our evening ferry home. Brilliant coffee too!\"" },
            { initials: "SR", name: "Sarah R.", "badge": "Ferry Passenger", text: "\"Incredible oat milk cappuccino—easily the best specialty coffee I've had on Arran. The atmosphere is lovely and warm, and the staff are wonderfully helpful while you're waiting for boarding to open.\"" },
            { initials: "DL", name: "David L.", "badge": "Family Traveller", text: "\"Very spacious, clean, and fully wheelchair accessible which made it so easy for our group. Great toasted sandwiches, delicious local ice cream, and exceptionally polite people behind the counter.\"" }
        ]
    },
    aboutPage: {
        title: "Our Story",
        subtitle: "What began as the simple dreams of a newly married couple, has blossomed into our family’s greatest pride and joy. We hope you grab a coffee, and wishfully invite you to read 'Our Story'...",
        
        storyParagraphs: [
            "Our story began in the 1990s. As a young couple eager to start a family and a business of our own, we took a leap of faith and opened our very first coffee shop at Brodick Home Farm, nestled right by the castle.",
            "It was there that we truly learned our trade, looking back now in awe at the fast-paced lessons and passion that fueled those early years.",
            "That foundation eventually gave us the opportunity to design our flagship coffee shop at the Brodick Ferry Terminal.",
            "Building it up from a bare, empty shell, we poured our hearts into creating more than just a café. We wanted a place where special memories are made, journeys begin, and travellers feel instantly at home.",
            "With decades of hard work, persistence, and patience, we have watched our business and our family thrive together. We have been incredibly fortunate to cross paths with so many wonderful customers over the years.",
            "Every year, we look forward to the magic of the summer months, welcoming back familiar faces to the beautiful island we get to call home."
        ],
        features: [
            { emoji: "🥪", title: "Food & Drinks", desc: "From artisan espresso to freshly pressed hot toasties, house-baked pastries, and authentic Arran ice cream flavours." },
            { emoji: "🧳", title: "Convenient Services", desc: "Take advantage of our handy on-site left luggage service to enjoy the island without being weighed down." },
            { emoji: "♿", title: "Accessibility For All", desc: "Thoughtfully equipped with complete wheelchair access across entries, seating layouts, and washrooms." },
            { emoji: "🌞", title: "Outdoor balcony", desc: "Imagine sitting on a summers day, as the warm breeze blows, whilst having that morning coffee with views across the bay to Goat Fell, and wondering where it all went wrong! 😉"}
        ]
        
    },
    servicesPage: {
        headline: "What We Offer?",
        sub: "We serve all types of Coffee from our signature coffee supplier 'Myrtle', 12 choices of tea, multiple flavoured ice creams, handmade biscuits, cookies, cakes and pastries.",
        
        openingHours: {

        title: "Opening Times",
        subtitle: "Pop in for that 'pick me up', right by the ferry terminal",
        // Or for a different client: "Our Operating Hours", "Drop by our showroom", etc.
        
        monday: "10:00 AM – 4:30 PM",
        tuesday: "10:00 AM – 4:30 PM",
        wednesday: "10:00 AM – 4:30 PM",
        thursday: "10:00 AM – 4:30 PM",
        friday: "10:00 AM – 4:30 PM",
        saturday: "10:00 AM – 4:30 PM",
        sunday: "10:00 AM – 4:30 PM"
        },
        
        
        menuList: [
            { emoji: "🍦", name: "Ice Cream" },
            { emoji: "☕", name: "Coffee & Tea" },
            { emoji: "🥪", name: "Toasties and Panini's" },
            { emoji: "🍰", name: "Cakes" },
            { emoji: "🍪", name: "Cookies"},
            { emoji: "🥧", name: "Pastries & Sausage Rolls" }
              
        ]
    },
    contactPage: {
        address : "📍 The Pier, Brodick, Isle of Arran",
        phoneIcon: "📞",  // Or whatever custom emoji/icon variable the client prefers
        contactTelephone: "+44 1770 303522",
        
        // 🚀 NEW ADDITIONS FOR AUTOMATED RICH-SEO SCHEMA TRACKING
        postalCode: "KA27 8AY",
        locality: "Brodick",
        region: "Isle of Arran",
        countryCode: "GB",
        latitude: "55.5772",
        longitude: "-5.1385",

        // 🚀 NEW RICH RESULTS ADDITIONS
        featuredImage: "https://www.copperwheats.co.uk/images/CopperwheatCoffeeShop_Shopfront.jpg", // Update to a live full URL once deployed
        priceRange: "£",
        servesCuisine: "Coffee, Cafe, Pastries, Bakery, Ice Cream, Sandwiches, Toasties, Light Bites, Scottish, British, Vegetarian options, Gluten-free options, Vegan options",

        mapUrl : "https://maps.google.com/maps?q=Copperwheats%20Coffee%20House,%20The%20Pier,%20Brodick,%20Isle%20of%20Arran&t=&z=16&ie=UTF8&iwloc=&output=embed",
        title: "Say Hello",
        desc: "Have questions about group bookings, dietary adjustments, or our left luggage storage? Drop us a line and we will get back to you within 48 hours. However, feel free to ring us if more urgent.",
        // The overview tab where people READ existing reviews

        googlePlaceId: "ChIJsR7E-07viUgRKh1IqQQ9mAc", // Copperwheats PlaceID
        googleViewReviewsUrl: "https://search.google.com/local/reviews?placeid=",
        googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=",
        tripAdvisorUrl: "https://www.tripadvisor.co.uk/UserReviewEdit-g551754-d3649538-Copperwheat_Coffee_House-Brodick_Isle_of_Arran_Scotland.html",
        
        faqSection: {
            title: "Questions and Answers",
            subtitle: "Got questions? We've got answers. Here is everything you need to know before stepping off the ferry.",
            questions: [
                {
                    q: "Where exactly are you located?",
                    a: "We are located directly by the Brodick Ferry Terminal on the Isle of Arran. It's the perfect first stop for a coffee when you step off the boat, or a comforting treat while you wait to head back to the mainland."
                },
                {
                    q: "Do you offer dietary adjustments?",
                    a: "We gladly cater to everyone with dairy-free oat milk, small selection of gluten-free bakes and a vegan option is also available daily."
                },
                {
                    q: "Can we store our left luggage with you?",
                    a: "Yes! If you are exploring the island before checking into your accommodation or waiting for the ferry after checking out, you can safely leave your bags and luggage with us while you wander."
                },
                {
                    q: "Do you take group bookings?",
                    a: "We do! Whether you are walking group conquering Goat Fell, a family gathering, or a tour group, drop us a line via our contact section or give us a call to arrange space for your party."
                }
            ]
        }
    }, // <-- Closes contactPage cleanly

    // ☕ THE FIXED FOOTER BLOCK (Added at the main configuration level)
    footer: {
        Tagline: "Relax in a great atmosphere, with friendly staff, "
    }
};
