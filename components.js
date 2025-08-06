// Component loader for navbar and footer
class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    static async loadAll() {
        // Load navbar and footer
        await Promise.all([
            this.loadComponent('navbar-placeholder', 'navbar.html'),
            this.loadComponent('footer-placeholder', 'footer.html')
        ]);
        
        // After components are loaded, set active navigation
        this.setActiveNavigation();
    }

    static setActiveNavigation() {
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Update active navigation link based on current page
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            // Check if this link matches the current page
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'JakobSchauser.github.io' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
}

// Load components when page loads
document.addEventListener('DOMContentLoaded', function() {
    ComponentLoader.loadAll();
    
    // Handle contact form submission (if on contact page)
    setTimeout(() => {
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message! This is a demo form.');
                // In a real implementation, you would send the form data to a server
            });
        }
    }, 100); // Small delay to ensure components are loaded
});
