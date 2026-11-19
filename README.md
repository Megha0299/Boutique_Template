# Ahalya's Boutique — Madurai Heritage Weaves & Bespoke Couture

A modern, culturally rooted e-commerce showcase, custom tailoring booking platform, and affiliate lookbook CMS built for **Ahalya's Boutique** (West Masi Street, Madurai, Tamil Nadu).

🌐 **Live Demo:** [https://boutique-template-8o9rw50bq-robo-web-technologies.vercel.app/](https://boutique-template-8o9rw50bq-robo-web-technologies.vercel.app/)

---

## ✨ Key Features

- **Heritage Storefront & Curated Catalogue:** Showcases authentic Madurai Sungudi cottons, Silk Mark certified Kanchipuram bridal pattu silks, Pavadai Dhavani sets, and festive ethnic collections.
- **Interactive Shopping Experience Selector:** Tailored dual-mode flow guiding customers between in-store flagship visits in Madurai and pan-Tamil Nadu/global online orders.
- **WhatsApp Direct Ordering & Consultation:** Frictionless, login-free inquiry and ordering workflow with pre-filled WhatsApp product messages, measurement booking details, and referral discount tracking.
- **Custom Stitching & Bridal Aari Booking:** Dedicated appointment and tailoring request flows for custom Aari embroidery blouses, designer blouses, and saree fall/pico services.
- **Live Instagram Lookbook & Affiliate Styling Feed:** Shoppable social lookbook cards supporting direct e-commerce affiliate links (Amazon, Flipkart, Myntra) with real-time updates from the Admin CMS.
- **Staff Admin CMS (`/admin`):** PIN-protected dashboard with Master Recovery Key support, client-side JPEG image compression, and live lookbook/banner/affiliate management backed by Firebase and LocalStorage fallback.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack) & React
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Lucide React Icons
- **Backend & Storage:** Firebase (Cloud Firestore & Storage) with resilient LocalStorage state synchronization
- **Deployment:** Vercel (Continuous Deployment via GitHub)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── about/              # Brand & Madurai weaver heritage story
│   ├── admin/              # PIN-protected Staff CMS dashboard
│   ├── book-appointment/   # In-store trial & video consultation booking
│   ├── contact/            # West Masi Street flagship location & contact details
│   ├── custom-stitching/   # Bespoke Aari & blouse tailoring request form
│   ├── product/[id]/       # Individual product detail view
│   ├── shop/               # Filterable boutique catalogue
│   ├── trending/           # Curated marketplace deals & social lookbook
│   ├── layout.tsx          # Global layout, metadata & navigation shell
│   └── page.tsx            # Main storefront homepage with live CMS listeners
├── components/
│   └── ShoppingExperience.tsx  # In-store vs. online shopping mode selector
└── lib/
    ├── cmsStore.ts         # Unified Firebase + LocalStorage CMS data layer
    ├── firebase.ts         # Guarded Firebase App, Firestore & Storage initialization
    └── products.ts         # Boutique catalogue & initial lookbook data
