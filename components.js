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
        
        // Add did you know boxes
        this.addDidYouKnowBoxes();
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

    static addDidYouKnowBoxes() {
        // Only add "Did you know?" boxes on the home page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage !== 'index.html' && currentPage !== '') {
            return;
        }
        
        const facts = [
            "There are more hydrogen atoms in a single water molecule than stars in the entire solar system!",
            "In a vacuum, the speed of sound is constant!",
        ];

        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            // Skip if it's an even section (has different styling)
            if (index % 2 === 1) return;
            
            const didYouKnowBox = document.createElement('div');
            didYouKnowBox.className = 'did-you-know-box';
            didYouKnowBox.innerHTML = `<strong>Did you know?</strong><br>${facts[0]}`;
            
            let currentFactIndex = 0;
            didYouKnowBox.addEventListener('click', () => {
                currentFactIndex = (currentFactIndex + 1) % facts.length;
                didYouKnowBox.innerHTML = `<strong>Did you know?</strong><br>${facts[currentFactIndex]}`;
                
                // Add a little animation on click
                didYouKnowBox.style.transform = 'translateX(-50%) scale(0.95)';
                setTimeout(() => {
                    didYouKnowBox.style.transform = 'translateX(-50%) scale(1)';
                }, 150);
            });
            
            section.appendChild(didYouKnowBox);
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
                alert("Thank you for filling out the form! I won't be getting back to you shortly!");
                // In a real implementation, you would send the form data to a server
            });
        }
    }, 100); // Small delay to ensure components are loaded
});
