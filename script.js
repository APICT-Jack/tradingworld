// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all sections as collapsed
    document.querySelectorAll('.university-sections, .document-list').forEach(el => {
        el.classList.add('collapsed', 'hidden');
    });

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Header toggle functionality
    document.querySelectorAll('.tab-content-header').forEach(header => {
        header.addEventListener('click', function() {
            const parent = this.closest('.tab-content, .university-section');
            const sections = parent.querySelector('.university-sections');
            const list = parent.querySelector('.document-list');
            const indicator = this.querySelector('.toggle-indicator');
            
            if (sections) sections.classList.toggle('collapsed');
            if (list) list.classList.toggle('hidden');
            if (indicator) indicator.classList.toggle('collapsed');
            
            this.classList.remove('attention-pulse');
        });
    });

    // Document item toggle functionality
    document.querySelectorAll('.document-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't toggle if clicking on chevron
            if (e.target.closest('.document-chevron')) return;
            
            const docId = this.getAttribute('data-doc');
            const detail = document.getElementById(docId);
            const isActive = detail.classList.contains('active');
            
            // Close all other details first
            document.querySelectorAll('.document-detail').forEach(d => {
                d.classList.remove('active');
            });
            
            // Toggle the clicked one if it wasn't active
            if (!isActive) {
                detail.classList.add('active');
                detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Chevron click handler to close details
    document.querySelectorAll('.document-chevron').forEach(chevron => {
        chevron.addEventListener('click', function(e) {
            e.stopPropagation();
            const item = this.closest('.document-item');
            const docId = item.getAttribute('data-doc');
            document.getElementById(docId).classList.remove('active');
        });
    });

    // Search functionality
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');

    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', () => {
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) {
                searchInput.focus();
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box') && searchInput.classList.contains('active')) {
                searchInput.classList.remove('active');
            }
        });
    }

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.tab-btn, .document-item, .doc-btn, .search-icon');
    interactiveElements.forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });

    // Animate books on mouse move
    const books = document.querySelectorAll('.book');
    if (books.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            books.forEach((book, index) => {
                const speed = 0.05 * (index + 1);
                const xOffset = (x - 0.5) * 20 * speed;
                const yOffset = (y - 0.5) * 20 * speed;
                
                book.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${xOffset}deg)`;
            });
        });
    }
});
