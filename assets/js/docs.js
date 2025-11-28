// ConfNG Documentation JavaScript

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Highlight current section in TOC
    const sections = document.querySelectorAll('.content section');
    const tocLinks = document.querySelectorAll('.toc a');

    function highlightTOC() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.style.fontWeight = 'normal';
            if (link.getAttribute('href') === '#' + current) {
                link.style.fontWeight = 'bold';
            }
        });
    }

    window.addEventListener('scroll', highlightTOC);
    highlightTOC(); // Initial call
});
