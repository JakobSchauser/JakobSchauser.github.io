// Component loader for research pages (in subfolder)
class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let html = await response.text();
            
            // Fix navbar links when loading from research subfolder
            if (componentPath.includes('navbar.html')) {
                html = this.fixNavbarLinks(html);
            }
            
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    static fixNavbarLinks(html) {
        // Fix the research dropdown links to use relative paths from research folder
        html = html.replace(/href="research\//g, 'href="');
        // Fix main navigation links to go back to parent directory
        html = html.replace(/href="index\.html"/g, 'href="../index.html"');
        html = html.replace(/href="about\.html"/g, 'href="../about.html"');
        html = html.replace(/href="links\.html"/g, 'href="../links.html"');
        html = html.replace(/href="contact\.html"/g, 'href="../contact.html"');
        
        return html;
    }

    static async loadAll() {
        // Load navbar and footer (from parent directory)
        await Promise.all([
            this.loadComponent('navbar-placeholder', '../components/navbar.html'),
            this.loadComponent('footer-placeholder', '../components/footer.html')
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
            
            // Check if this link matches the current page or research section
            if (linkHref && (linkHref.includes('research') || window.location.pathname.includes('research'))) {
                link.classList.add('active');
            }
        });
    }
}

// Load components when page loads
document.addEventListener('DOMContentLoaded', function() {
    ComponentLoader.loadAll();
});
