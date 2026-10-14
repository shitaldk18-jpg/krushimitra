# 🚀 Krushimitra Agro - AWS Free Tier Deployment Guide with Terraform

हा गाईड **कृषिमित्र ॲग्रो (Krushimitra Agro)** ची वेबसाईट **AWS Free Tier (१००% मोफत सेवा)** वर **Terraform** चा वापर करून कशी तैनात (Deploy) करावी याची संपूर्ण माहिती देतो.

---

## 🏛️ आर्किटेक्चर (Architecture Overview)

```
[ शेतकरी / युजर (Browser) ]
           │
           ▼ (HTTPS / Free SSL)
[ AWS CloudFront CDN (Global Edge Network) ]
           │ (Origin Access Control - OAC Secure)
           ▼
[ Amazon S3 Private Bucket (index.html, css/, js/) ]
```

### 💰 AWS Free Tier सेवांची सविस्तर माहिती (Zero Cost Breakdown):

| AWS Service | Free Tier मर्यादा | आपली वेबसाईट वापर | खर्च (Cost) |
|---|---|---|---|
| **Amazon S3** | **5 GB** Standard Storage मोफत (१२ महिने), २०,००० GET Requests/महिना | आपली वेबसाईट फक्त **~०.२ MB** (०.०१% पेक्षा कमी जागा) | **₹०.०० (Free)** |
| **Amazon CloudFront** | **Always Free (कायमस्वरूपी मोफत)**: **1 TB (1,000 GB)** डेटा ट्रान्सफर/महिना + १०,०००,००० Requests/महिना | साधारण ५,००० शेतकरी दररोज भेट दिल्यासही फक्त ~३ GB वापर होतो | **₹०.०० (Free)** |
| **Origin Access Control (OAC)** | अमर्यादित खाजगी ऑथेंटिकेशन | S3 बकेट सुरक्षित राहते (पब्लिक राहत नाही) | **₹०.०० (Free)** |
| **SSL / HTTPS Certificate** | CloudFront Default Wildcard Certificate (*.cloudfront.net) | मोफत HTTPS एनक्रिप्शन | **₹०.०० (Free)** |

> **⚠️ EC2 का वापरले नाही?**
> EC2 वर Linux/Nginx चालवल्यास १२ महिन्यांनंतर पैसे लागतात, सर्व्हर सुरक्षा/पॅचिंग करावी लागते. **S3 + CloudFront हे Serverless असल्यामुळे देखभाल शून्य, वेग अतिशय जलद (Mumbai Edge Cache) आणि कायमस्वरूपी मोफत राहते.**

---

## 📋 पूर्वतयारी (Prerequisites)

आपल्या कॉम्प्युटरवर फक्त **२ टूल्स** असणे आवश्यक आहे:
1. **Terraform**
2. **AWS CLI**

Windows PowerShell मध्ये खालील कमांड्स रन करून ही टूल्स अवघ्या १ मिनिटात इन्स्टॉल करू शकता:

```powershell
# १. Terraform इन्स्टॉल करा
winget install Hashicorp.Terraform --accept-source-agreements --accept-package-agreements

# २. AWS CLI इन्स्टॉल करा
winget install Amazon.AWSCLI --accept-source-agreements --accept-package-agreements
```
*(इन्स्टॉलेशन पूर्ण झाल्यावर PowerShell बंद करून पुन्हा उघडा.)*

---

## 🔑 पायरी १: AWS क्रेडेंशियल्स सेट करा (AWS Configure)

१. [AWS Management Console](https://aws.amazon.com/console/) मध्ये लॉगिन करा.
२. वर उजव्या बाजूला आपल्या नावावर क्लिक करून **Security Credentials** वर जा.
3. **Access Keys** विभागात जाऊन **Create Access Key** वर क्लिक करा.
४. मिळालेले **Access Key ID** आणि **Secret Access Key** खालीलप्रमाणे PowerShell मध्ये टाका:

```powershell
aws configure
```
प्रॉम्प्ट आल्यावर:
- **AWS Access Key ID:** [तुमची Access Key टाका]
- **AWS Secret Access Key:** [तुमची Secret Key टाका]
- **Default region name:** `ap-south-1` *(Mumbai Region - महाराष्ट्रासाठी सर्वात जलद)*
- **Default output format:** `json`

---

## 🚀 पायरी २: वेबसाईट डिप्लॉय करा (1-Click Deployment)

PowerShell मध्ये `terraform` फोल्डरमध्ये जा आणि डिप्लॉयमेंट स्क्रिप्ट चालवा:

```powershell
cd c:\Users\shital\OneDrive\Desktop\my-project\terraform

# स्वयंचलित डिप्लॉयमेंट स्क्रिप्ट चालवा:
.\deploy.ps1
```

किंवा आपण मॅन्युअली खालील कमांड्स रन करू शकता:

```powershell
# १. प्रोव्हायडर्स डाऊनलोड करा
terraform init

# २. रिसोर्सेस तपासा
terraform plan

# ३. S3 व CloudFront तयार करून फाईल्स अपलोड करा
terraform apply -auto-approve
```

---

## 🌐 पायरी ३: लाईव्ह वेबसाईट पाहा!

कमांड पूर्ण झाल्यावर शेवटी तुम्हाला लाईव्ह वेबसाईटची HTTPS लिंक मिळेल:

```
Outputs:

website_url = "https://d123456789abcd.cloudfront.net"
s3_bucket_name = "krushimitra-agro-a1b2c3"
```

👉 **टीप:** CloudFront CDN चे जगभरातील सर्व्हर अद्ययावत होण्यासाठी **२ ते ३ मिनिटे** लागतात. त्यानंतर ती लिंक ब्राऊझर किंवा मोबाईलमध्ये उघडून आपली वेबसाईट लाईव्ह पाहू शकता!

---

## 🔄 भविष्यात वेबसाईट अपडेट कशी करावी?

जेव्हा तुम्ही `index.html`, `css/style.css` किंवा `js/menu-data.js` मध्ये बदल कराल, तेव्हा फक्त खालील कमांड द्या:

```powershell
cd c:\Users\shital\OneDrive\Desktop\my-project\terraform
terraform apply -auto-approve
```
Terraform फक्त बदललेल्या फाईल्स S3 वर आपोआप अपडेट करेल!

---

## 🗑️ सर्व रिसोर्सेस काढून टाकणे (Cleanup / Teardown)

जर तुम्हाला कधीही सर्व क्लाऊड रिसोर्सेस पूर्णपणे बंद करायचे असतील:

```powershell
.\destroy.ps1
# किंवा
terraform destroy -auto-approve
```
याने S3 बकेट आणि CloudFront चे सर्व रिसोर्सेस काही मिनिटांत सुरक्षितपणे डिलीट होतात.
