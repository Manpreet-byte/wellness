# Quick Start Guide

## Installation & Running the Project

### Step 1: Install Dependencies

```bash
cd /home/sama/holidays/wellness
npm install
```

This will install:
- React & React DOM
- Vite (build tool)
- Tailwind CSS (styling)
- PostCSS & Autoprefixer (CSS processing)

### Step 2: Start Development Server

```bash
npm run dev
```

The application will automatically open in your browser at `http://localhost:3000`

### Step 3: Start Building

Edit files in `src/` directory. Changes will hot-reload automatically.

## Available Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build for production (creates dist/ folder)
npm run preview    # Preview production build locally
npm run lint       # Run ESLint (if configured)
```

## Project Features at a Glance

✅ **Fully Responsive** - Mobile, tablet, desktop optimized
✅ **Clean Components** - Reusable, well-organized code
✅ **Tailwind Styling** - No inline CSS, utility-first approach
✅ **Animations** - Fade-in, hover effects, smooth transitions
✅ **Dummy Data** - Real data structure ready for API integration
✅ **Production Ready** - Optimized, minified, ready to deploy

## Sections Included

1. **Navbar** - Sticky navigation with mobile menu
2. **Hero Section** - Eye-catching banner with stats
3. **Featured Products** - Grid display with 6 products
4. **Categories** - 6 wellness categories with icons
5. **Testimonials** - 3 customer reviews with ratings
6. **Newsletter** - Email subscription form
7. **Footer** - Multi-column with links and social media

## Customization Tips

### Change Brand Colors
Edit `tailwind.config.js` line 9:
```js
colors: {
  primary: '#10b981',      // Change from this
  secondary: '#059669',    // To your brand colors
}
```

### Update Product Data
Edit `src/data/products.js` - Replace with your own products or API calls

### Add New Components
1. Create `src/components/YourComponent.jsx`
2. Import in `src/pages/Home.jsx`
3. Add to JSX

### Replace Placeholder Images
All images are from Unsplash. Replace URLs in component files or use local images from `public/assets/`

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel** (recommended for Vite projects)
- **Netlify**
- **GitHub Pages**
- **Traditional hosting** (upload dist/ folder via FTP)

## Troubleshooting

### Port 3000 Already in Use?
The dev server will use the next available port automatically.

### CSS Not Loading?
Make sure you have Tailwind CSS installed:
```bash
npm install -D tailwindcss postcss autoprefixer
```

### Build Fails?
Clear cache and reinstall:
```bash
rm -rf node_modules dist
npm install
npm run build
```

## Next Steps

1. Test the site locally
2. Update dummy data with real products
3. Add API integration for product data
4. Implement cart functionality
5. Add authentication (for user accounts)
6. Deploy to production

## File Structure Summary

```
wellness/
├── src/
│   ├── components/        # React components (Navbar, Hero, etc.)
│   ├── pages/            # Page components (Home)
│   ├── data/             # Mock data (products, categories)
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles & animations
├── public/               # Static files
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite build configuration
└── README.md             # Full documentation
```

## Support

Refer to:
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

---

**Happy coding! 🚀**
