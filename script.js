// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Document detail functionality
const documentItems = document.querySelectorAll('.document-item');
const documentDetails = document.querySelectorAll('.document-detail');

documentItems.forEach(item => {
    item.addEventListener('click', () => {
        const docId = item.getAttribute('data-doc');

        // Hide all document details
        documentDetails.forEach(detail => detail.classList.remove('active'));

        // Show selected document detail
        const detail = document.getElementById(docId);
        if (detail) {
            detail.classList.add('active');

            // Scroll to the document detail
            detail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    });
});

// Search functionality
const searchIcon = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-input');

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

// Initialize all document lists as visible
document.querySelectorAll('.document-list').forEach(list => {
    list.classList.remove('hidden');
});

// Add hover effects to all interactive elements
const interactiveElements = document.querySelectorAll('.tab-btn, .document-item, .doc-btn, .search-icon');
interactiveElements.forEach(el => {
    el.style.transition = 'all 0.3s ease';
});

// Animate books on mouse move
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const books = document.querySelectorAll('.book');
    books.forEach((book, index) => {
        const speed = 0.05 * (index + 1);
        const xOffset = (x - 0.5) * 20 * speed;
        const yOffset = (y - 0.5) * 20 * speed;
        
        book.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${xOffset}deg)`;
    });
});

// Header toggle functionality
function setupHeaderToggles() {
    // Master university header toggle
    const masterHeader = document.querySelector('.master-header');
    if (masterHeader) {
        masterHeader.addEventListener('click', function() {
            const universitySections = document.querySelector('.university-sections');
            const indicator = this.querySelector('.toggle-indicator');
            
            universitySections.classList.toggle('collapsed');
            indicator.classList.toggle('collapsed');
            
            // Remove pulse animation after first interaction
            this.classList.remove('attention-pulse');
        });
    }

    // Section header toggles (coding/forex classes)
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering master header
            
            const section = this.closest('.university-section');
            const documentList = section.querySelector('.document-list');
            const indicator = this.querySelector('.toggle-indicator');
            
            documentList.classList.toggle('hidden');
            indicator.classList.toggle('collapsed');
            
            // Remove pulse animation after first interaction
            this.classList.remove('attention-pulse');
        });
    });

    // Regular tab content headers
    const tabContentHeaders = document.querySelectorAll('.tab-content-header:not(.master-header):not(.section-header)');
    tabContentHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tabContent = this.closest('.tab-content');
            let documentList = this.nextElementSibling;

            // If next sibling is not a document list, try to find one
            if (!documentList || !documentList.classList.contains('document-list')) {
                documentList = tabContent.querySelector('.document-list');
            }

            if (documentList) {
                documentList.classList.toggle('hidden');
                const indicator = this.querySelector('.toggle-indicator');
                if (indicator) {
                    indicator.classList.toggle('collapsed');
                }

                // Remove pulse animation after first interaction
                this.classList.remove('attention-pulse');
            }
        });
    });
}

// Initialize all toggles when DOM is loaded
document.addEventListener('DOMContentLoaded', setupHeaderToggles);

