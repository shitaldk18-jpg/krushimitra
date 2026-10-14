/**
 * ===================================================================
 * KRUSHIMITRA AGRO, BANSAROLA (TA. KAIJ, DIST. BEED)
 * Agricultural Implements & Tractor-Operated Equipment Catalog
 * Inspired by Leading Corporate Equipment Standards (Champion Implements format)
 * Contact: 9545169002
 * ===================================================================
 */

const RESTAURANT_CONFIG = {
    name: "Krushimitra Agro",
    marathiName: "कृषिमित्र ॲग्रो",
    tagline: "आधुनिक ट्रॅक्टर शेती अवजारे आणि अधिकृत महाडीबीटी अनुदान केंद्र | Heavy-Duty Agricultural Implements",
    phone: "+91 95451 69002",
    whatsappNumber: "919545169002", // Official contact number for WhatsApp bookings
    email: "krushimitraagro.bansarola@gmail.com",
    address: "मेन रोड, बस स्टँड जवळ, बंसारोळा, ता. केज, जि. बीड, महाराष्ट्र - ४३१५१८",
    locationShort: "बंसारोळा, ता. केज, जि. बीड",
    currency: "₹",
    deliveryFee: 500.00, // Standard village delivery / transport
    freeDeliveryThreshold: 50000.00, // Free delivery for large implements
    taxRate: 0.12, // 12% GST on agro machinery
    openingHours: {
        weekdays: "सकाळी ०८:०० ते रात्री ०८:३०",
        weekends: "सकाळी ०८:०० ते रात्री ०९:०० (रविवार चालू)"
    }
};

// Machine Categories inspired by Champion Implements Corporate Grid
const MENU_CATEGORIES = [
    { 
        id: "all", 
        name: "सर्व अवजारे (All Equipment)", 
        icon: "fa-tractor",
        badge: "Complete Range",
        desc: "सर्व ट्रॅक्टर मॉडेल्ससाठी आवश्यक आधुनिक अवजारे"
    },
    { 
        id: "rotavators", 
        name: "रोटाव्हेटर (Rotary Tillers)", 
        icon: "fa-gear",
        badge: "Heavy Duty",
        desc: "मल्टि-स्पीड व सिंगल स्पीड हेवी ड्युटी रोटाव्हेटर्स",
        image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: "ploughs", 
        name: "नांगर व कल्टिव्हेटर (Tillage)", 
        icon: "fa-seedling",
        badge: "Boron Steel",
        desc: "हायड्रॉलिक रिव्हर्सिबल पलटी नांगर व स्प्रिंग कल्टिव्हेटर",
        image: "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: "sowing", 
        name: "पेरणी यंत्रे (Seed Drills)", 
        icon: "fa-wheat-awn",
        badge: "Precision Sowing",
        desc: "ऑटोमॅटिक खत-बियाणे पेरणी व मल्टी-क्रॉप टोकन यंत्र",
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: "sprayers", 
        name: "ट्रॅक्टर स्प्रेअर्स (Crop Protection)", 
        icon: "fa-faucet-drip",
        badge: "High Pressure",
        desc: "६००L ट्रॅक्टर बूम स्प्रेअर व ऑर्चर्ड ब्लोअर सिस्टीम",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: "harvesting", 
        name: "थ्रेशर व कुट्टी (Harvesting)", 
        icon: "fa-scissors",
        badge: "Multi-Crop",
        desc: "मल्टीक्रॉप ट्रॅक्टर थ्रेशर व हेवी ड्युटी कडबा कुट्टी",
        image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80"
    },
    { 
        id: "trailers", 
        name: "ट्रॉली व इतर (Trailers & Earth)", 
        icon: "fa-truck-pickup",
        badge: "Haulage",
        desc: "हायड्रॉलिक टिपिंग ट्रॉली व ट्रॅक्टर खड्डे यंत्र",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
    }
];

// Tractor Compatibility Matrix (Champion Implements Feature)
const TRACTOR_COMPATIBILITY_GUIDE = [
    {
        hpClass: "30 - 35 HP",
        tag: "मिनी व मध्यम ट्रॅक्टर",
        examples: "Mahindra 275 DI, Swaraj 735 FE, Massey Ferguson 1035, Eicher 380",
        rotavator: "५ ते ५.५ फूट (३६/४२ ब्लेड्स)",
        plough: "२-बॉटम मेकॅनिकल पलटी नांगर / ७-फाणी कल्टिव्हेटर",
        sowing: "५ किंवा ७-फाणी ऑटोमॅटिक सिड ड्रिल",
        sprayer: "४०० ते ५०० लिटर ट्रॅक्टर बूम स्प्रेअर",
        trolley: "३ ते ४ टन नॉन-टिपिंग / टिपिंग ट्रॉली"
    },
    {
        hpClass: "40 - 48 HP",
        tag: "सर्वात लोकप्रिय श्रेणी",
        examples: "Mahindra 575 DI, Swaraj 744 FE, Sonalika DI 42 RX, John Deere 5105",
        rotavator: "६ फूट मल्टि-स्पीड (४२/४८ ब्लेड्स)",
        plough: "२-बॉटम हायड्रॉलिक रिव्हर्सिबल नांगर / ९-फाणी हेवी कल्टिव्हेटर",
        sowing: "९-फाणी ऑटोमॅटिक पेरणी व खत यंत्र",
        sprayer: "६०० लिटर ४०-फूट बूम स्प्रेअर विथ गन",
        trolley: "५ टन हायड्रॉलिक टिपिंग ट्रॉली"
    },
    {
        hpClass: "50 - 65 HP",
        tag: "हेवी ड्युटी पॉवर ट्रॅक्टर",
        examples: "John Deere 5050 D, Swaraj 855 FE, Mahindra Arjun 555/605, New Holland 3630",
        rotavator: "७ ते ८ फूट हेवी ड्युटी मल्टि-स्पीड (५४/६० ब्लेड्स)",
        plough: "२ किंवा ३-बॉटम हेवी हायड्रॉलिक पलटी नांगर",
        sowing: "९ ते ११-फाणी सिड-कम-फर्टिलायझर ड्रिल / टोकन यंत्र",
        sprayer: "६०० ते १००० लिटर ब्लोअर / बूम स्प्रेअर",
        trolley: "५ ते ७ टन हायड्रॉलिक हेवी टिपिंग ट्रॉली"
    }
];

// Detailed Equipment Catalog with Industrial Specs
const SAMPLE_FOOD_ITEMS = [
    // --- ROTAVATORS & TILLERS ---
    {
        id: "rotavator-1",
        name: "Shaktiman 7 Feet Heavy Duty Rotavator",
        marathiName: "शक्तिमान ७ फूट हेवी ड्युटी रोटाव्हेटर",
        category: "rotavators",
        price: 115000,
        rating: 4.9,
        reviewsCount: 148,
        isVeg: true, // Used as In-Stock badge
        isSpecial: true, // Used as Subsidy Eligible badge
        hpRequired: "45 - 55 HP",
        workingWidth: "७ फूट (२.१ मीटर)",
        bladeType: "५४ L-Type बोरोन स्टील ब्लेड्स",
        gearbox: "Multi-Speed Heavy Duty Gearbox (४ गियर्स)",
        workingDepth: "६ ते ८ इंच खोल मशागत",
        weight: "४८५ किलोग्रॅम (हेवी ड्युटी फ्रेम)",
        ptoRpm: "540 RPM",
        hitchType: "Cat-II ३-पॉईंट लिंकेज",
        subsidyEligible: true,
        subsidyAmount: "५०% (₹४५,००० ते ५०,००० MahaDBT)",
        warranty: "२ वर्षे अधिकृत मॅन्युफॅक्चरर वॉरंटी",
        description: "मराठवाड्यातील काळ्या व घट्ट जमिनीसाठी खास शक्तिमान हेवी ड्युटी मल्टि-स्पीड रोटाव्हेटर. ढेकळांचा चुरा करून जमीन भुसभुशीत व पेरणीयोग्य बनवतो.",
        image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "rotavator-2",
        name: "6 Feet Multi-Speed Gear Rotavator",
        marathiName: "६ फूट मल्टि-स्पीड रोटाव्हेटर",
        category: "rotavators",
        price: 98000,
        rating: 4.8,
        reviewsCount: 112,
        isVeg: true,
        isSpecial: true,
        hpRequired: "35 - 45 HP",
        workingWidth: "६ फूट (१.८ मीटर)",
        bladeType: "४२ बोरोन स्टील ब्लेड्स (L/C Type)",
        gearbox: "Multi-Speed Heavy Gearbox",
        workingDepth: "६ ते ७ इंच",
        weight: "४२० किलोग्रॅम",
        ptoRpm: "540 RPM",
        hitchType: "Cat-II ३-पॉईंट लिंकेज",
        subsidyEligible: true,
        subsidyAmount: "५०% (₹४०,००० ते ४५,००० MahaDBT)",
        warranty: "१ वर्ष वॉरंटी + मोफत सर्व्हिस",
        description: "महिंद्रा ५७५, स्वराज ७४४ व ३५-४५ HP ट्रॅक्टरसाठी सर्वोत्तम रोटाव्हेटर. कमी डिझेल खप आणि दीर्घायुषी साइड गिअर ड्राइव्ह सिस्टीम.",
        image: "https://images.unsplash.com/photo-1589876735749-8b2b9576c66b?auto=format&fit=crop&w=800&q=80"
    },

    // --- PLOUGHS & CULTIVATORS ---
    {
        id: "plough-1",
        name: "2-Bottom Hydraulic Reversible MB Plough",
        marathiName: "२-बॉटम हायड्रॉलिक रिव्हर्सिबल पलटी नांगर",
        category: "ploughs",
        price: 78000,
        rating: 4.9,
        reviewsCount: 195,
        isVeg: true,
        isSpecial: true,
        hpRequired: "40 - 55 HP",
        workingWidth: "२ बॉटम (७० ते ८० सेमी रुंदी)",
        bladeType: "फोर्ज्ड हाय-कार्बन बोरोन स्टील शेअर्स",
        gearbox: "हेवी ड्युटी हायड्रॉलिक टर्निंग सिलिंडर",
        workingDepth: "१० ते १४ इंच खोल नांगरणी",
        weight: "३६० किलोग्रॅम",
        ptoRpm: "Tractor Hydraulic Operated",
        hitchType: "३-पॉईंट लिंकेज विथ लॉक पिन",
        subsidyEligible: true,
        subsidyAmount: "५०% (₹३०,००० ते ३५,००० MahaDBT)",
        warranty: "१ वर्ष फ्रेम व हायड्रॉलिक वॉरंटी",
        description: "ट्रॅक्टर सीटवरूनच हायड्रॉलिक लिव्हरने सहज पलटी होणारा मजबूत नांगर. वेळ व डिझेलची ३०% बचत करतो आणि जमिनीची खोल मशागत करतो.",
        image: "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "plough-2",
        name: "9-Tyne Heavy Duty Spring Loaded Cultivator",
        marathiName: "९-फाणी हेवी स्प्रिंग कल्टिव्हेटर",
        category: "ploughs",
        price: 36000,
        rating: 4.8,
        reviewsCount: 160,
        isVeg: true,
        isSpecial: false,
        hpRequired: "35+ HP",
        workingWidth: "७.५ फूट (२.३ मीटर)",
        bladeType: "९ रिव्हर्सिबल हार्डन्ड शॉव्हेल्स (Shovels)",
        gearbox: "ड्युअल हेवी स्प्रिंग मेकॅनिझम (१८ स्प्रिंग्स)",
        workingDepth: "६ ते ८ इंच",
        weight: "२८० किलोग्रॅम",
        ptoRpm: "Non-PTO Trailed/Mounted",
        hitchType: "Cat-II ३-पॉईंट लिंकेज",
        subsidyEligible: true,
        subsidyAmount: "शासकीय नियमानुसार अनुदान उपलब्ध",
        warranty: "१ वर्ष संपूर्ण फ्रेम वॉरंटी",
        description: "खडकाळ व कठीण जमिनीत दगड लागल्यास स्प्रिंग मागे होते आणि फाट तुटण्यापासून संरक्षण होते. तण काढण्यासाठी व जमिनीची मशागत करण्यासाठी उत्कृष्ट.",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "plough-3",
        name: "Automatic Hydraulic Ridger (सरी वरंबा / बेड मेकर)",
        marathiName: "ऑटोमॅटिक सरी वरंबा यंत्र (बेड मेकर)",
        category: "ploughs",
        price: 32000,
        rating: 4.9,
        reviewsCount: 88,
        isVeg: true,
        isSpecial: false,
        hpRequired: "30+ HP",
        workingWidth: "अ‍ॅडजस्टेबल २ ते ४ सरी रुंदी",
        bladeType: "रुंद मोल्डबोर्ड विंग्ज (Wings)",
        gearbox: "हेवी चॅनल फ्रेम विथ क्लॅम्प्स",
        workingDepth: "८ ते १२ इंच बेड उंची",
        weight: "२१० किलोग्रॅम",
        ptoRpm: "Mounted Implements",
        hitchType: "Cat-I & Cat-II सुसंगत",
        subsidyEligible: true,
        subsidyAmount: "MahaDBT अवजारे योजनेत पात्र",
        warranty: "१ वर्ष वॉरंटी",
        description: "ऊस, कापूस, अद्रक, हळद, सोयाबीन आणि भाजीपाल्यासाठी एकसारखे रुंद वरंबे (Broad Bed Furrow) तयार करणारे सर्वोत्तम अवजार.",
        image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=800&q=80"
    },

    // --- SOWING & PLANTERS ---
    {
        id: "sowing-1",
        name: "9-Tyne Automatic Seed-cum-Fertilizer Drill",
        marathiName: "९-फाणी ऑटोमॅटिक पेरणी व खत यंत्र",
        category: "sowing",
        price: 48000,
        rating: 4.9,
        reviewsCount: 210,
        isVeg: true,
        isSpecial: true,
        hpRequired: "35 - 50 HP",
        workingWidth: "७ फूट (२.१५ मीटर) - ९ फाणी",
        bladeType: "एकसारखे अंतर देणारे अ‍ॅल्युमिनियम दातेरी चकती",
        gearbox: "ग्राउंड व्हील ड्राइव्ह + मल्टि-स्पीड गिअर",
        workingDepth: "२ ते ४ इंच (नियंत्रित खोली)",
        weight: "२६० किलोग्रॅम",
        ptoRpm: "Wheel Drive Mechanism",
        hitchType: "३-पॉईंट लिंकेज",
        subsidyEligible: true,
        subsidyAmount: "५०% (₹२०,००० ते २५,००० MahaDBT)",
        warranty: "१ वर्ष मेकॅनिकल वॉरंटी",
        description: "सोयाबीन, हरभरा, गहू, ज्वारी व बाजरीसाठी बियाणे आणि खत एकाच वेळी अचूक अंतरावर पेरणी करणारे स्वयंचलित यंत्र. २५% बियाणे बचत.",
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "sowing-2",
        name: "Multi-Crop Planter / Tokan Yantra (टोकन यंत्र)",
        marathiName: "मल्टी-क्रॉप टोकन यंत्र (Cotton/Maize/Soybean)",
        category: "sowing",
        price: 62000,
        rating: 4.8,
        reviewsCount: 135,
        isVeg: true,
        isSpecial: true,
        hpRequired: "40+ HP",
        workingWidth: "४ ते ६ ओळी (समांतर अंतर)",
        bladeType: "सटीक टोकन कप मेकॅनिझम",
        gearbox: "अ‍ॅडजस्टेबल प्लांट-टू-प्लांट गिअरबॉक्स",
        workingDepth: "१.५ ते ३ इंच",
        weight: "२९० किलोग्रॅम",
        ptoRpm: "Ground Drive Chain",
        hitchType: "३-पॉईंट लिंकेज",
        subsidyEligible: true,
        subsidyAmount: "५०% शासकीय अनुदान पात्र",
        warranty: "१ वर्ष वॉरंटी",
        description: "कापूस, मका आणि सोयाबीन टोकन पेरणीसाठी उत्तम. झाडांमध्ये एकसारखे अंतर राहिल्यामुळे पिकांची वाढ जोमदार होते व उत्पादन वाढते.",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80"
    },

    // --- SPRAYERS ---
    {
        id: "sprayer-1",
        name: "Tractor-Mounted 600 Litre Boom Sprayer",
        marathiName: "ट्रॅक्टर ६०० लिटर बूम स्प्रेअर विथ गन",
        category: "sprayers",
        price: 65000,
        rating: 4.9,
        reviewsCount: 172,
        isVeg: true,
        isSpecial: true,
        hpRequired: "30+ HP",
        workingWidth: "४० फूट फोल्डिंग बूम (१२ मीटर कव्हरेज)",
        bladeType: "१८ इटालियन ब्रास नोजल्स + हाय प्रेशर गन",
        gearbox: "ट्रिपल पिस्टन HTP हेवी ब्रास पंप",
        workingDepth: "समान फवारा (Uniform Spray Atomization)",
        weight: "१९० किलोग्रॅम (रिक्त)",
        ptoRpm: "540 RPM PTO शाफ्ट",
        hitchType: "Cat-II ३-पॉईंट लिंकेज",
        subsidyEligible: true,
        subsidyAmount: "५०% (₹२५,००० ते ३०,००० MahaDBT)",
        warranty: "१ वर्ष पंप व टाकी वॉरंटी",
        description: "सोयाबीन, तूर, कापूस व हरभरा पिकांवर जलद फवारणीसाठी ६०० लिटर क्षमतेचा ट्रॅक्टर स्प्रेअर. एका तासात ५ ते ६ एकर फवारणी पूर्ण.",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "sprayer-2",
        name: "Tractor Trailed Orchard & Field Blower Sprayer",
        marathiName: "ऑर्चर्ड ब्लोअर स्प्रेअर (द्राक्ष/डाळिंब/मोसंबी)",
        category: "sprayers",
        price: 145000,
        rating: 4.8,
        reviewsCount: 79,
        isVeg: true,
        isSpecial: true,
        hpRequired: "45+ HP",
        workingWidth: "हाय-कॅनॉपी एअर-ब्लास्ट (Air-Blast Fan)",
        bladeType: "ट्विन स्पीड एअरोडायनामिक फॅन व ब्रास नोजल",
        gearbox: "हेवी ऑर्चर्ड गिअरबॉक्स विथ न्यूट्रल",
        workingDepth: "पानांच्या खालीपर्यंत १००% कव्हरेज",
        weight: "४५० किलोग्रॅम",
        ptoRpm: "540 RPM",
        hitchType: "ट्रेलिंग ड्रॉबार हिच",
        subsidyEligible: true,
        subsidyAmount: "५०% फलोत्पादन व SMAM अनुदान पात्र",
        warranty: "१ वर्ष पूर्ण वॉरंटी",
        description: "डाळिंब, मोसंबी, द्राक्ष व पेरू बागायतदारांसाठी आधुनिक एअर-ब्लास्ट ब्लोअर स्प्रेअर. औषधाचा थेंब न वाया घालवता पानांच्या खालीपर्यंत फवारा पोहोचतो.",
        image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80"
    },

    // --- HARVESTING & THRESHING ---
    {
        id: "harvest-1",
        name: "Multi-Crop High-Output Tractor Thresher",
        marathiName: "मल्टीक्रॉप ट्रॅक्टर थ्रेशर (मळणी यंत्र)",
        category: "harvesting",
        price: 185000,
        rating: 5.0,
        reviewsCount: 165,
        isVeg: true,
        isSpecial: true,
        hpRequired: "40 - 60 HP",
        workingWidth: "डबल स्क्रीन शेकर विथ हेवी ब्लोअर",
        bladeType: "हार्डन्ड बीटर्स व अ‍ॅडजस्टेबल जाळी",
        gearbox: "हेवी पुली व व्ही-बेल्ट ट्रान्समिशन",
        workingDepth: "९९.८% स्वच्छ दाणा आउटपुट",
        weight: "१४०० किलोग्रॅम",
        ptoRpm: "540 - 1000 RPM",
        hitchType: "हेवी टो-बार व टायर अ‍ॅक्सल",
        subsidyEligible: true,
        subsidyAmount: "५०% (₹५०,००० ते ६५,००० MahaDBT)",
        warranty: "२ वर्षे चेसिस व ट्रान्समिशन वॉरंटी",
        description: "सोयाबीन, हरभरा, गहू, ज्वारी, तूर आणि मूग या सर्व पिकांसाठी एकच थ्रेशर. दाणा फुटत नाही आणि भुसा लांब फेकला जातो.",
        image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "harvest-2",
        name: "Heavy Duty 3 HP Electric & PTO Chaff Cutter",
        marathiName: "कडबा कुट्टी मशीन (Chaff Cutter) हेवी ड्युटी",
        category: "harvesting",
        price: 32000,
        rating: 4.9,
        reviewsCount: 220,
        isVeg: true,
        isSpecial: false,
        hpRequired: "3 HP मोटर किंवा ट्रॅक्टर PTO",
        workingWidth: "हाय-स्पीड ३ हाय-कार्बन ब्लेड्स",
        bladeType: "रिव्हर्सिबल सेल्फ-शार्पनिंग ब्लेड्स",
        gearbox: "३-गिअर रोलर मेकॅनिझम (बारीक/मध्यम/मोठा)",
        workingDepth: "ताशी ६०० ते ८०० किलोग्रॅम कटिंग",
        weight: "११० किलोग्रॅम",
        ptoRpm: "Dual Drive (Motor / Tractor)",
        hitchType: "स्टॅटिक स्टँड विथ ट्रान्सपोर्ट व्हील्स",
        subsidyEligible: true,
        subsidyAmount: "MahaDBT पशुसंवर्धन अनुदान पात्र",
        warranty: "१ वर्ष वॉरंटी",
        description: "सुक्या व ओल्या कडब्याची (ज्वारी, मका, नेपियर गवत) जलद बारीक कुट्टी करते. चारा वाया जाणे ४०% कमी होते व दुधात वाढ होते.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
    },

    // --- TRAILERS & HAULAGE ---
    {
        id: "trailer-1",
        name: "Hydraulic Tipping 5-Tonne Tractor Trolley",
        marathiName: "५ टन हायड्रॉलिक टिपिंग ट्रॅक्टर ट्रॉली",
        category: "trailers",
        price: 175000,
        rating: 4.9,
        reviewsCount: 140,
        isVeg: true,
        isSpecial: true,
        hpRequired: "40 - 55 HP",
        workingWidth: "१० x ६ फूट हेवी बॉडी साईझ",
        bladeType: "१०-प्लाय अपोलो हेवी टायर्स व हेवी अ‍ॅक्सल",
        gearbox: "इटालियन सिंगल स्टेज हेवी हायड्रॉलिक जॅक",
        workingDepth: "५ टन सुरक्षित लोडिंग क्षमता",
        weight: "११०० किलोग्रॅम",
        ptoRpm: "Hydraulic Quick Coupling",
        hitchType: "हेवी फोर्ज्ड टोईंग डोळा",
        subsidyEligible: false,
        subsidyAmount: "बँक कर्ज व फायनान्स सुविधा उपलब्ध",
        warranty: "२ वर्षे चेसिस व हायड्रॉलिक जॅक वॉरंटी",
        description: "करुगेटेड जाड पत्र्याची हेवी बॉडी, मजबूत चॅनल चेसिस आणि जलद अनलोडिंग करणारा हायड्रॉलिक जॅक. ऊस व धान्य वाहतुकीसाठी सर्वोत्तम.",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "trailer-2",
        name: "Tractor Post Hole Digger (खड्डे खणण्याचे यंत्र)",
        marathiName: "ट्रॅक्टर पोस्ट होल डिगर (झाडे/कुंपण खड्डे यंत्र)",
        category: "trailers",
        price: 58000,
        rating: 4.8,
        reviewsCount: 95,
        isVeg: true,
        isSpecial: false,
        hpRequired: "35+ HP",
        workingWidth: "९ इंच व १२ इंच हेवी ऑगर (Auger Bit)",
        bladeType: "रिप्लेसेबल टंगस्टन कार्बाइड कटिंग टीप",
        gearbox: "हेवी ड्युटी ऑईल बाथ बेव्हल गिअरबॉक्स",
        workingDepth: "३ फूट खोल खड्डा फक्त ३० सेकंदात",
        weight: "१८० किलोग्रॅम",
        ptoRpm: "540 RPM विथ शिअर बोल्ट प्रोटेक्शन",
        hitchType: "Cat-II ३-पॉईंट लिंकेज",
        subsidyEligible: true,
        subsidyAmount: "शासकीय योजना पात्र",
        warranty: "१ वर्ष गिअरबॉक्स वॉरंटी",
        description: "फळबाग लागवड, कुंपणाचे खांब व सोलर पॅनेलचे खांब रोवण्यासाठी अवघ्या ३० सेकंदात अचूक ३ फूट खड्डा खणणारे आधुनिक यंत्र.",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80"
    }
];
