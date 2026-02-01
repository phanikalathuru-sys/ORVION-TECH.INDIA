// main.js - Working Version

// Mobile menu toggle

(function() {
    'use strict';

    // Create view toggle HTML
    const createViewToggle = () => {
        const toggleHTML = `
            <div class="view-toggle-container" id="viewToggleContainer">
                <button class="view-toggle-btn" data-view="system" title="System View">
                    <i class="fas fa-desktop"></i>
                </button>
                <button class="view-toggle-btn" data-view="desktop" title="Desktop (1200px)">
                    <i class="fas fa-laptop"></i>
                </button>
                <button class="view-toggle-btn" data-view="tablet" title="Tablet (768px)">
                    <i class="fas fa-tablet-alt"></i>
                </button>
                <button class="view-toggle-btn" data-view="mobile" title="Mobile (375px)">
                    <i class="fas fa-mobile-alt"></i>
                </button>
            </div>
            
            <div class="view-controls" id="viewControls" style="display: none;">
                <button class="view-control-btn" id="closeViewBtn">Close Preview</button>
                <button class="view-control-btn" id="refreshViewBtn">Refresh</button>
            </div>
            
            <div class="device-frame-overlay" id="deviceFrameOverlay">
                <div class="device-frame">
                    <div class="device-status-bar">
                        <span class="device-time">9:41</span>
                        <div class="device-signal">
                            <i class="fas fa-signal"></i>
                            <i class="fas fa-wifi"></i>
                            <i class="fas fa-battery-three-quarters"></i>
                        </div>
                    </div>
                    <div class="device-frame-content" id="deviceFrameContent">
                        <!-- Content will be loaded here -->
                    </div>
                    <div class="device-home-button"></div>
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = toggleHTML;
        document.body.appendChild(container.firstElementChild);
        document.body.appendChild(container.children[1]);
        document.body.appendChild(container.children[2]);

        // Set system view as active by default
        const systemBtn = document.querySelector('[data-view="system"]');
        if (systemBtn) {
            systemBtn.classList.add('active');
        }
    };

    // Load current page into frame
    const loadPageIntoFrame = () => {
        const frameContent = document.getElementById('deviceFrameContent');
        if (!frameContent) return;

        // Get current page content (excluding the toggle elements)
        const mainContent = document.querySelector('body').innerHTML;

        // Clean up content to remove toggle elements
        const cleanContent = mainContent
            .replace(/<div class="view-toggle-container[\s\S]*?<\/div>/, '')
            .replace(/<div class="view-controls[\s\S]*?<\/div>/, '')
            .replace(/<div class="device-frame-overlay[\s\S]*?<\/div>/, '');

        frameContent.innerHTML = cleanContent;

        // Re-inject CSS for the frame
        const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
        styles.forEach(style => {
            if (style.tagName === 'STYLE') {
                const newStyle = document.createElement('style');
                newStyle.innerHTML = style.innerHTML;
                frameContent.appendChild(newStyle);
            } else if (style.tagName === 'LINK') {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = style.href;
                frameContent.appendChild(newLink);
            }
        });
    };

    // Switch between views
    const switchView = (viewType) => {
        const overlay = document.getElementById('deviceFrameOverlay');
        const frame = document.querySelector('.device-frame');
        const controls = document.getElementById('viewControls');
        const body = document.body;

        // Remove all view classes
        body.classList.remove('view-mobile', 'view-tablet', 'view-desktop', 'view-system');

        // Update active button
        document.querySelectorAll('.view-toggle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${viewType}"]`).classList.add('active');

        // Handle each view type
        switch (viewType) {
            case 'mobile':
                body.classList.add('view-mobile');
                overlay.style.display = 'flex';
                controls.style.display = 'flex';
                frame.className = 'device-frame';
                loadPageIntoFrame();
                break;

            case 'tablet':
                body.classList.add('view-tablet');
                overlay.style.display = 'flex';
                controls.style.display = 'flex';
                frame.className = 'device-frame';
                loadPageIntoFrame();
                break;

            case 'desktop':
                body.classList.add('view-desktop');
                overlay.style.display = 'flex';
                controls.style.display = 'flex';
                frame.className = 'device-frame';
                loadPageIntoFrame();
                break;

            case 'system':
                body.classList.add('view-system');
                overlay.style.display = 'none';
                controls.style.display = 'none';
                break;
        }

        // Save preference to localStorage
        localStorage.setItem('preferredView', viewType);
    };

    // Initialize the view toggle system
    const initViewToggle = () => {
        // Create toggle elements
        createViewToggle();

        // Load saved preference
        const savedView = localStorage.getItem('preferredView') || 'system';

        // Set up event listeners
        document.querySelectorAll('.view-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const viewType = e.currentTarget.getAttribute('data-view');
                switchView(viewType);
            });
        });

        // Close button
        const closeBtn = document.getElementById('closeViewBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                switchView('system');
            });
        }

        // Refresh button
        const refreshBtn = document.getElementById('refreshViewBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                loadPageIntoFrame();
            });
        }

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                switchView('system');
            }
        });

        // Close when clicking outside the frame (only for mobile/tablet/desktop views)
        const overlay = document.getElementById('deviceFrameOverlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    switchView('system');
                }
            });
        }

        // Apply saved view
        setTimeout(() => {
            switchView(savedView);
        }, 100);
    };

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initViewToggle);
    } else {
        initViewToggle();
    }

    // Make functions available globally (optional)
    window.ViewToggle = {
        switchView,
        loadPageIntoFrame,
        initViewToggle
    };
})();
[file content end]