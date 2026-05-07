# Wellness Forever - React Homepage

A production-ready React.js homepage for Wellness Forever, a premium wellness and health products e-commerce platform.

## Features

✅ **Modern React Architecture**
- Functional components with hooks
- Clean component-based structure
- Reusable, props-based components

✅ **Responsive Design**
- Mobile-first approach
- Optimized for mobile, tablet, and desktop
- Smooth transitions and animations

✅ **Tailwind CSS Styling**
- No inline styles
- Custom color palette for wellness brand
- Semantic HTML (section, header, nav, etc.)

✅ **Performance Optimized**
- Image optimization with Unsplash CDN
- Lazy loading ready
- Production build ready

✅ **UI/UX Features**
- Hover effects and transitions
- Fade-in and slide animations
- Interactive components
- Smooth scrolling

## Project Structure

```
wellness/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductCard.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── Categories.jsx
│   │   ├── TestimonialCard.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Newsletter.jsx
│   │   └── Footer.jsx
│   ├── pages/               # Page components
│   │   └── Home.jsx
│   ├── data/                # Mock data
│   │   └── products.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles & animations
├── public/                  # Static files
│   └── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Components Overview

### Navbar
- Sticky navigation with logo
- Responsive mobile menu
- Cart icon indicator
- Quick shop button

### Hero Section
- Gradient background with decorative elements
- Key statistics
- Two-column layout with image
- Call-to-action buttons

### Featured Products
- Grid layout (3 columns on desktop, responsive)
- Product cards with images, ratings, and prices
- Badge system (Popular, Best Seller, New)
- Add to cart functionality
- Staggered animation

### Categories
- 6 wellness categories
- Icon-based design
- Hover effects with explore button
- Responsive grid

### Testimonials
- 3 customer reviews with ratings
- Customer statistics section
- Avatar images
- Star ratings

### Newsletter
- Email subscription form
- Success confirmation
- Gradient background
- Privacy notice

### Footer
- Multi-column layout
- Quick links and support
- Social media links
- Payment methods
- Legal links

## Styling

### Color Palette
- **Primary Green**: `#10b981` - Main brand color
- **Secondary Green**: `#059669` - Hover/active states
- **Accent Light**: `#f3f4f6` - Backgrounds
- **Dark**: `#1f2937` - Text

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800

### Spacing & Layout
- Max-width: 1280px (7xl)
- Responsive padding and gaps
- Mobile-first breakpoints

## Animations

- **Fade In**: Smooth opacity transition
- **Slide In Left**: Transform from left with fade
- **Hover Scale**: Product and category cards scale up
- **Transition Duration**: 300ms for smooth effects

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. Images are loaded from Unsplash CDN (optimized)
2. Tailwind CSS is minified in production
3. Component code-splitting ready with Vite
4. No unnecessary dependencies

## Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#10b981',  // Change this
  secondary: '#059669',
}
```

### Replace Dummy Data
Update `src/data/products.js` with real API calls:
```js
useEffect(() => {
  fetchProducts().then(setProducts);
}, []);
```

### Add More Sections
Create new components in `src/components/` and import in `Home.jsx`

## Next Steps

To extend this project:

1. **Add Product Detail Pages**
   - Create `ProductDetail.jsx`
   - Add React Router for navigation

2. **Implement Cart System**
   - Use Context API or Redux
   - LocalStorage for persistence

3. **Add Backend Integration**
   - Replace dummy data with API calls
   - Add user authentication

4. **E-commerce Features**
   - Wishlist
   - Product filters
   - Search functionality
   - Checkout flow

5. **Analytics**
   - Add Google Analytics
   - Track user behavior

## Code Quality

- Clean, readable code
- Consistent formatting
- Semantic HTML
- Accessibility considerations
- Mobile-first responsive design

## License

MIT

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.

---

**Built with ❤️ for wellness enthusiasts**
