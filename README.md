# ConfNG Documentation Site

This is the official documentation website for ConfNG, hosted at [confng.org](https://confng.org).

## Structure

```
site/
├── index.html              # Homepage with features and quick start
├── guide/
│   └── index.html          # Complete user guide
├── api/
│   └── index.html          # API reference documentation
├── migration/
│   └── index.html          # Migration guide from other libraries
├── assets/
│   ├── css/
│   │   ├── style.css       # Main stylesheet
│   │   └── docs.css        # Documentation-specific styles
│   ├── js/
│   │   ├── main.js         # Main JavaScript functionality
│   │   └── docs.js         # Documentation-specific JavaScript
│   └── images/             # Site images and icons
└── README.md               # This file
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Code Highlighting**: Syntax highlighting for Java, JSON, and other languages
- **Copy Code**: One-click code copying functionality
- **Search**: Documentation search functionality
- **Navigation**: Smooth scrolling and active section highlighting
- **Performance**: Optimized for fast loading and smooth interactions

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for interactivity
- **Prism.js**: Code syntax highlighting
- **Responsive Design**: Mobile-first approach

## Development

### Local Development

To run the site locally:

1. Clone the repository
2. Navigate to the `site` directory
3. Serve the files using any HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

4. Open `http://localhost:8000` in your browser

### Building for Production

The site is static HTML/CSS/JS and can be deployed to any web server or CDN:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Connect repository and deploy
- **Vercel**: Import project and deploy
- **AWS S3**: Upload files to S3 bucket with static hosting
- **Traditional Web Server**: Upload files to web root

### Customization

#### Colors and Theming

Edit CSS custom properties in `assets/css/style.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    /* ... other variables */
}
```

#### Content Updates

- **Homepage**: Edit `index.html`
- **User Guide**: Edit `guide/index.html`
- **API Reference**: Edit `api/index.html`
- **Migration Guide**: Edit `migration/index.html`

#### Adding New Pages

1. Create new HTML file following the existing structure
2. Include navigation and footer
3. Link CSS and JavaScript files
4. Update navigation menus in all pages

## SEO and Analytics

### Meta Tags

Each page includes appropriate meta tags for SEO:

- Title tags
- Meta descriptions
- Open Graph tags (for social sharing)
- Canonical URLs

### Analytics Integration

To add analytics, include tracking code in each HTML file before the closing `</body>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Performance Optimization

The site is optimized for performance:

- **Minified CSS/JS**: Consider minifying for production
- **Image Optimization**: Compress images and use appropriate formats
- **CDN**: Use CDN for external libraries (Prism.js)
- **Caching**: Configure appropriate cache headers
- **Lazy Loading**: Images are lazy-loaded where appropriate

## Browser Support

The site supports:

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Accessibility

The site follows accessibility best practices:

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- Focus indicators
- Color contrast compliance

## Contributing

To contribute to the documentation:

1. Fork the repository
2. Make changes to the appropriate files in the `site/` directory
3. Test locally
4. Submit a pull request

## License

The documentation site is part of the ConfNG project and is licensed under the MIT License.