# 🚜 कृषिमित्र ॲग्रो (Krushimitra Agro) - बंसारोळा, ता. केज, जि. बीड
### ट्रॅक्टर चलित आधुनिक शेती अवजारे आणि शासकीय अनुदान कोटेशन केंद्र
**संपर्क:** ९५४५१६९००२ (9545169002)

---

## 🌐 वेबसाइट कशी सुरू करावी (How to Access Localhost:3000)

### पर्याय १: १-क्लिक सर्व्हर (One-Click Localhost Server)
1. आपल्या फोल्डरमध्ये जा: `c:\Users\shital\OneDrive\Desktop\my-project`
2. **[`start-server.bat`](file:///c:/Users/shital/OneDrive/Desktop/my-project/start-server.bat)** फाईलवर डबल-क्लिक करा.
3. वेबसाइट आपोआप ब्राऊझरमध्ये सुरू होईल:
   👉 **`http://localhost:3000`**

### पर्याय २: थेट फाईल उघडा (No Server Needed)
- थेट **[`index.html`](file:///c:/Users/shital/OneDrive/Desktop/my-project/index.html)** वर डबल-क्लिक करा. कोणत्याही सर्व्हरशिवाय संपूर्ण वेबसाइट थेट ब्राऊझरमध्ये सुरळीत चालेल.

---

## 🛠️ अवजारे, किंमती व संपर्क कसा बदलावा (Catalog & Price Edit)

सर्व अवजारे आणि दुकानाची माहिती एकाच फाईलमध्ये आहे:
👉 **[`js/menu-data.js`](file:///c:/Users/shital/OneDrive/Desktop/my-project/js/menu-data.js)**

### १. दुकानाची माहिती बदलणे:
```javascript
const RESTAURANT_CONFIG = {
    name: "Krushimitra Agro",
    marathiName: "कृषिमित्र ॲग्रो",
    tagline: "दर्जेदार शेती अवजारे आणि ट्रॅक्टर साहित्य",
    phone: "+91 95451 69002",
    whatsappNumber: "919545169002",
    address: "मेन रोड, बस स्टँड जवळ, बंसारोळा, ता. केज, जि. बीड - 431518",
    currency: "₹"
};
```

### २. नवीन शेती अवजार जोडणे किंवा बदलणे:
[`js/menu-data.js`](file:///c:/Users/shital/OneDrive/Desktop/my-project/js/menu-data.js) मध्ये खालीलप्रमाणे सोपी रचना आहे:
```javascript
{
    id: "rotavator-1",
    name: "Shaktiman 7 Feet Heavy Duty Rotavator",
    marathiName: "शक्तिमान ७ फूट हेवी ड्युटी रोटाव्हेटर",
    category: "rotavators", // rotavators, ploughs, sowing, sprayers, harvesting, trailers
    price: 115000,
    hpRequired: "45 - 55 HP",
    bladeType: "48 / 54 L-Type Boron Blades",
    subsidyEligible: true, // महाडीबीटी अनुदान पात्र
    warranty: "2 Years Warranty",
    description: "हेवी ड्युटी रोटाव्हेटर, काळ्या भारी जमिनीसाठी अत्यंत उपयुक्त...",
    image: "https://images.unsplash.com/..."
}
```

---

## ✨ वेबसाइटमधील प्रमुख वैशिष्ट्ये (Key Features)

- **ट्रॅक्टर चलित अवजारे कॅटलॉग:** रोटाव्हेटर, रिव्हर्सिबल पलटी नांगर, पेरणी यंत्रे, कल्टिव्हेटर, ट्रॅक्टर स्प्रेअर पंप, मळणी यंत्र, बेड मेकर व ट्रॉली.
- **ट्रॅक्टर HP क्षमता व स्पेसिफिकेशन्स:** प्रत्येक अवजारासोबत आवश्यक ट्रॅक्टर हॉर्सपॉवर (HP) व ब्लेड माहिती.
- **महाडीबीटी (MahaDBT) शासकीय अनुदान टॅग:** शासनाच्या कृषी यांत्रिकीकरण योजनेसाठी अनुदान पात्र बॅज.
- **थेट व्हॉट्सॲप बुकिंग (WhatsApp Order):** शेतकरी अवजार निवडून एका क्लिकवर ९५४५१६९००२ या नंबरवर संपूर्ण तपशील (नाव, गाव, ट्रॅक्टर मॉडेल, अवजारे व कोटेशन) पाठवू शकतात.
- **अधिकृत कोटेशन पावती जनरेटर:** शेतकऱ्यांसाठी तात्काळ प्रिंट करण्यायोग्य कोटेशन पावती.
- **मोफत शेतावर डिलिव्हरी ट्रॅकर:** केज, बीड, अंबाजोगाई व परिसरासाठी वाहतूक पर्याय.
