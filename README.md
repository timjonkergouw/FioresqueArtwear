# Fiori - Fashion Brand Website

Een complete responsieve website voor het kledingmerk Fiori, gebouwd met alleen HTML, CSS en JavaScript.

## 🎯 Features

### Algemene Features
- **Responsive Design**: Werkt perfect op desktop, tablet en mobiel
- **Moderne UI**: Schone en professionele interface
- **Semantische HTML**: Goed gestructureerde markup
- **Gestructureerde CSS**: Modulaire en onderhoudbare styling
- **Interactieve JavaScript**: Dynamische functionaliteit zonder frameworks

### Pagina's
1. **Homepagina** (`index.html`)
   - Hero sectie met GIF
   - New Arrivals sectie met hover effecten
   - Nieuwe collectie sectie
   - About sectie
   - Footer met contactgegevens en social media

2. **Productoverzichtpagina** (`products.html`)
   - Filterbare producten (Shirts, Sweaters, Hoodies, Knitwear)
   - Product grid met hover effecten
   - JavaScript filtering zonder page refresh

3. **Productdetailpagina** (`product-detail.html`)
   - Dynamische product loading
   - Image gallery met thumbnails
   - Maatselectie
   - Quantity controls
   - Product details (materiaal, wasinstructies)

### Functionaliteit
- **Winkelwagen**: LocalStorage-based shopping cart
- **Login Systeem**: Basic authentication (client-side)
- **Product Filtering**: JavaScript-powered filters
- **Hover Effecten**: Voor/achterkant product images
- **Responsive Navigation**: Mobile-friendly menu
- **Newsletter Subscription**: Email validation

## 🚀 Installatie & Gebruik

### Vereisten
- Moderne webbrowser (Chrome, Firefox, Safari, Edge)
- Lokale webserver (voor beste ervaring)

### Setup
1. Download alle bestanden naar een lokale map
2. Open `index.html` in je browser
3. Of start een lokale webserver:
   ```bash
   # Met Python
   python -m http.server 8000
   
   # Met Node.js
   npx serve .
   
   # Met PHP
   php -S localhost:8000
   ```

### Bestandsstructuur
```
FioriArtwear/
├── index.html              # Homepagina
├── products.html           # Productoverzicht
├── product-detail.html     # Productdetails
├── css/
│   ├── style.css          # Hoofdstylesheet
│   ├── products.css       # Productpagina styling
│   └── product-detail.css # Productdetail styling
├── js/
│   ├── script.js          # Hoofd JavaScript
│   ├── products.js        # Productpagina functionaliteit
│   └── product-detail.js  # Productdetail functionaliteit
└── README.md              # Deze file
```

## 🎨 Design Features

### Kleurenschema
- **Primair**: #4ECDC4 (Turquoise)
- **Secundair**: #333333 (Donkergrijs)
- **Accent**: #FF6B6B (Coral)
- **Achtergrond**: #FFFFFF (Wit)
- **Footer**: #2C3E50 (Donkerblauw)

### Typografie
- **Logo & Headers**: 'Days One' (Google Fonts)
- **Body Text**: Arial, sans-serif
- **Icons**: Font Awesome 6.0

### Responsive Breakpoints
- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

## 🛠️ Technische Details

### JavaScript Functionaliteit
- **Cart Management**: LocalStorage voor persistentie
- **Login System**: Basic client-side authentication
- **Product Filtering**: Real-time filtering zonder refresh
- **Image Gallery**: Thumbnail navigation
- **Form Validation**: Email en required field validation

### CSS Features
- **Flexbox & Grid**: Moderne layout technieken
- **CSS Transitions**: Smooth hover en click effecten
- **Backdrop Filter**: Moderne glassmorphism effecten
- **Media Queries**: Responsive design
- **CSS Custom Properties**: Herbruikbare variabelen

### HTML Structuur
- **Semantische Tags**: `<header>`, `<nav>`, `<section>`, `<footer>`
- **Accessibility**: ARIA labels en alt text
- **SEO Optimized**: Meta tags en structured data
- **Cross-browser Compatible**: Moderne HTML5 features

## 📱 Responsive Design

### Desktop (> 768px)
- Full-width layout
- Side-by-side product details
- Hover effects
- Sticky navigation

### Tablet (768px - 480px)
- Adjusted grid layouts
- Simplified navigation
- Touch-friendly buttons
- Optimized image sizes

### Mobile (< 480px)
- Single column layout
- Collapsed navigation
- Larger touch targets
- Simplified product cards

## 🔧 Customization

### Kleuren Aanpassen
Bewerk de CSS custom properties in `css/style.css`:
```css
:root {
    --primary-color: #4ECDC4;
    --secondary-color: #333333;
    --accent-color: #FF6B6B;
    --background-color: #FFFFFF;
    --footer-color: #2C3E50;
}
```

### Producten Toevoegen
Voeg nieuwe producten toe aan `js/products.js`:
```javascript
{
    id: 13,
    name: "New Product",
    price: 49.99,
    category: "shirts",
    frontImage: "path/to/front.jpg",
    backImage: "path/to/back.jpg"
}
```

### Afbeeldingen Vervangen
- Vervang placeholder URLs met echte productafbeeldingen
- Zorg voor consistente afmetingen (300x400px aanbevolen)
- Gebruik geoptimaliseerde afbeeldingen voor snelle loading

## 🚀 Toekomstige Uitbreidingen

### Geplande Features
- **Database Integratie**: MySQL/PostgreSQL backend
- **Payment Gateway**: Stripe/PayPal integratie
- **User Accounts**: Registratie en profielbeheer
- **Wishlist**: Favorieten functionaliteit
- **Reviews**: Product reviews en ratings
- **Search**: Zoekfunctionaliteit
- **Admin Panel**: Productbeheer

### Backend Integratie
De website is voorbereid voor database integratie:
- Product data kan gemakkelijk vervangen worden door API calls
- Cart functionaliteit kan uitgebreid worden met server-side storage
- User authentication kan gekoppeld worden aan een backend systeem

## 📞 Support

Voor vragen of ondersteuning:
- **Email**: info@fiori.com
- **Phone**: +31 20 123 4567
- **Location**: Amsterdam, Netherlands

## 📄 Licentie

Dit project is ontwikkeld voor het kledingmerk Fiori. Alle rechten voorbehouden.

---

**Fiori** - Expressing creativity through fashion