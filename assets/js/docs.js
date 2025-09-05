// Documentation-specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Sidebar navigation highlighting
    function updateSidebarNavigation() {
        const sections = document.querySelectorAll('.docs-section');
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        
        function highlightCurrentSection() {
            let currentSection = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.id;
                }
            });
            
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSection) {
                    link.classList.add('active');
                }
            });
        }
        
        // Throttled scroll handler for performance
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    highlightCurrentSection();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll);
        highlightCurrentSection(); // Initial call
    }
    
    // Initialize sidebar navigation
    updateSidebarNavigation();
    
    // Search functionality for documentation
    function initializeDocumentationSearch() {
        const searchInput = document.getElementById('docs-search');
        if (!searchInput) return;
        
        const searchableElements = document.querySelectorAll('.docs-section');
        const originalContent = Array.from(searchableElements).map(el => ({
            element: el,
            content: el.innerHTML,
            textContent: el.textContent.toLowerCase()
        }));
        
        function performSearch(query) {
            const searchTerm = query.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Restore original content
                originalContent.forEach(item => {
                    item.element.innerHTML = item.content;
                    item.element.style.display = 'block';
                });
                return;
            }
            
            originalContent.forEach(item => {
                const isMatch = item.textContent.includes(searchTerm);
                
                if (isMatch) {
                    item.element.style.display = 'block';
                    // Highlight search terms
                    highlightSearchTerms(item.element, searchTerm);
                } else {
                    item.element.style.display = 'none';
                }
            });
        }
        
        function highlightSearchTerms(element, searchTerm) {
            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const textNodes = [];
            let node;
            
            while (node = walker.nextNode()) {
                if (node.parentElement.tagName !== 'SCRIPT' && 
                    node.parentElement.tagName !== 'STYLE') {
                    textNodes.push(node);
                }
            }
            
            textNodes.forEach(textNode => {
                const text = textNode.textContent;
                const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
                
                if (regex.test(text)) {
                    const highlightedText = text.replace(regex, '<mark>$1</mark>');
                    const span = document.createElement('span');
                    span.innerHTML = highlightedText;
                    textNode.parentNode.replaceChild(span, textNode);
                }
            });
        }
        
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        
        // Debounced search
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });
    }
    
    // Initialize search
    initializeDocumentationSearch();
    
    // Table of contents generation
    function generateTableOfContents() {
        const tocContainer = document.getElementById('table-of-contents');
        if (!tocContainer) return;
        
        const headings = document.querySelectorAll('.docs-section h2, .docs-section h3');
        if (headings.length === 0) return;
        
        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';
        
        headings.forEach(heading => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            // Generate ID if not present
            if (!heading.id) {
                heading.id = heading.textContent.toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');
            }
            
            a.href = '#' + heading.id;
            a.textContent = heading.textContent;
            a.className = heading.tagName.toLowerCase() === 'h2' ? 'toc-h2' : 'toc-h3';
            
            li.appendChild(a);
            tocList.appendChild(li);
        });
        
        tocContainer.appendChild(tocList);
    }
    
    // Generate TOC if container exists
    generateTableOfContents();
    
    // Code block enhancements
    function enhanceCodeBlocks() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(codeBlock => {
            const pre = codeBlock.parentElement;
            
            // Add language label
            const language = codeBlock.className.match(/language-(\w+)/);
            if (language) {
                const label = document.createElement('div');
                label.className = 'code-language-label';
                label.textContent = language[1].toUpperCase();
                label.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: rgba(0, 0, 0, 0.3);
                    color: #e2e8f0;
                    padding: 0.25rem 0.75rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border-bottom-right-radius: 0.25rem;
                `;
                pre.style.position = 'relative';
                pre.appendChild(label);
            }
            
            // Add line numbers for long code blocks
            const lines = codeBlock.textContent.split('\n');
            if (lines.length > 10) {
                addLineNumbers(pre, lines.length);
            }
        });
    }
    
    function addLineNumbers(pre, lineCount) {
        const lineNumbers = document.createElement('div');
        lineNumbers.className = 'line-numbers';
        lineNumbers.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3rem;
            background: rgba(0, 0, 0, 0.2);
            color: rgba(226, 232, 240, 0.5);
            font-size: 0.75rem;
            line-height: 1.5;
            padding: 1.5rem 0.5rem;
            text-align: right;
            user-select: none;
            border-right: 1px solid rgba(226, 232, 240, 0.1);
        `;
        
        for (let i = 1; i <= lineCount; i++) {
            const lineNumber = document.createElement('div');
            lineNumber.textContent = i;
            lineNumbers.appendChild(lineNumber);
        }
        
        pre.style.paddingLeft = '4rem';
        pre.appendChild(lineNumbers);
    }
    
    // Enhance code blocks after Prism loads
    setTimeout(enhanceCodeBlocks, 600);
    
    // Keyboard navigation
    function initializeKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('docs-search');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to clear search
            if (e.key === 'Escape') {
                const searchInput = document.getElementById('docs-search');
                if (searchInput && document.activeElement === searchInput) {
                    searchInput.value = '';
                    searchInput.dispatchEvent(new Event('input'));
                    searchInput.blur();
                }
            }
        });
    }
    
    initializeKeyboardNavigation();
    
    // Print functionality
    function initializePrintSupport() {
        const printButton = document.getElementById('print-docs');
        if (printButton) {
            printButton.addEventListener('click', function() {
                window.print();
            });
        }
        
        // Expand all collapsed sections before printing
        window.addEventListener('beforeprint', function() {
            const collapsedSections = document.querySelectorAll('.collapsed');
            collapsedSections.forEach(section => {
                section.classList.remove('collapsed');
            });
        });
    }
    
    initializePrintSupport();
    
    // Scroll to top functionality
    function initializeScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            font-size: 1.25rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        `;
        
        scrollButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.body.appendChild(scrollButton);
        
        // Show/hide scroll button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });
    }
    
    initializeScrollToTop();
    
    // External link handling
    function handleExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            if (!link.hostname.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                
                // Add external link icon
                const icon = document.createElement('span');
                icon.innerHTML = ' ↗';
                icon.style.fontSize = '0.75em';
                icon.style.opacity = '0.7';
                link.appendChild(icon);
            }
        });
    }
    
    handleExternalLinks();
    
    // Progress indicator
    function initializeProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 4rem;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--primary-color);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        }
        
        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial call
    }
    
    initializeProgressIndicator();
    
    console.log('Documentation enhancements loaded successfully! 📚');
});

// Utility functions for documentation
window.DocsUtils = {
    // Smooth scroll to section
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = section.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Copy text to clipboard
    copyToClipboard: async function(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    },
    
    // Generate anchor link for headings
    generateAnchorLink: function(heading) {
        return heading.textContent.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
    }
};