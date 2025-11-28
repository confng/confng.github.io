# ConfNG Documentation Site

This is the official documentation website for ConfNG, hosted at [confng.org](https://confng.org).

## Structure

```
site/
├── index.html              # Single-page documentation site
├── 404.html                # Error page
├── assets/
│   ├── css/
│   │   └── main.css        # Main stylesheet
│   └── js/
│       └── docs.js         # Documentation JavaScript
├── netlify.toml            # Netlify deployment configuration
├── vercel.json             # Vercel deployment configuration
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine crawler rules
├── CNAME                   # Custom domain configuration
└── README.md               # This file
```

## Features

- **Single-Page Design**: TestNG-inspired documentation-first approach
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Clean UI**: Minimal, professional design focused on readability
- **Code Highlighting**: Syntax highlighting for Java, XML, JSON, Properties, Bash, and Groovy
- **Smooth Scrolling**: Smooth navigation between sections
- **TOC Highlighting**: Automatic highlighting of current section in table of contents
- **Performance**: Optimized for fast loading and smooth interactions

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for smooth scrolling and TOC highlighting
- **Prism.js**: Code syntax highlighting
- **Responsive Design**: Mobile-first approach

## Development

### Local Development

To run the site locally:

1. Clone the repository
2. Serve the files using any HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000

# Or simply open the file
open index.html
```

3. Open `http://localhost:8000` in your browser

### Building for Production

The site is static HTML/CSS/JS and can be deployed to any web server or CDN:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Connect repository and deploy
- **Vercel**: Import project and deploy
- **AWS S3**: Upload files to S3 bucket with static hosting
- **Traditional Web Server**: Upload files to web root

### Customization

#### Colors and Theming

Edit CSS in `assets/css/main.css`:

```css
/* Main colors */
body {
    color: #333;
    background: #fff;
}

.site-header {
    background: #f8f8f8;
}

a {
    color: #0066cc;
}
```

#### Content Updates

All content is in a single file:
- **All Documentation**: Edit `index.html`
- **Error Page**: Edit `404.html`

#### Adding New Sections

1. Add new section in `index.html` with unique `id`
2. Add corresponding link in table of contents sidebar
3. Update navigation if needed

## SEO and Analytics

### Meta Tags

The site includes appropriate meta tags for SEO:

- Title tags
- Meta descriptions
- Viewport settings for mobile

### Sitemap

The `sitemap.xml` file includes:
- Main page (https://confng.org/)
- All major sections (#welcome, #download, #documentation, #examples, #javadocs)
- JavaDoc site (https://docs.confng.org/)

### Analytics Integration

To add analytics, include tracking code in `index.html` before the closing `</body>` tag:

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

- **Minimal Dependencies**: Only Prism.js for syntax highlighting
- **Single Page**: No page reloads, fast navigation
- **CDN**: Prism.js loaded from CDN
- **Caching**: Configured in netlify.toml and vercel.json
- **Lightweight**: Small CSS and JS files

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
2. Make changes to `index.html` or other files
3. Test locally by opening `index.html` in a browser
4. Submit a pull request

## Deployment

The site is automatically deployed when changes are pushed to the main branch:

- **GitHub Pages**: Hosted at confng.github.io
- **Custom Domain**: Available at confng.org (via CNAME)
- **Netlify/Vercel**: Alternative deployment options configured

## License

The documentation site is part of the ConfNG project and is licensed under the MIT License.