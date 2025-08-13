document.addEventListener('DOMContentLoaded', function () {
    // ==============================
    // Navigation active state
    // ==============================
    const navLinks = document.querySelectorAll('.nav-link:not(.text-success):not(.text-danger)');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active state from all nav links
            navLinks.forEach(l => {
                l.classList.remove('text-dark', 'border-bottom', 'border-2', 'border-success');
                l.classList.add('text-muted');
            });

            // Add active state to clicked link
            this.classList.remove('text-muted');
            this.classList.add('text-dark', 'border-bottom', 'border-2', 'border-success');

            console.log('Navigation clicked:', this.textContent.trim());
        });
    });

    // ==============================
    // Mega dropdown hover functionality (Generic for all dropdowns)
    // ==============================
    const megaDropdowns = document.querySelectorAll('.nav-item.dropdown.position-static');

    megaDropdowns.forEach(megaDropdown => {
        const dropdownMenu = megaDropdown.querySelector('.dropdown-menu');
        const toggleLink = megaDropdown.querySelector('.nav-link');
        let hoverTimeout;

        if (!dropdownMenu || !toggleLink) return; // Safety check

        // Show dropdown on hover
        megaDropdown.addEventListener('mouseenter', function () {
            clearTimeout(hoverTimeout);
            dropdownMenu.classList.add('show');
            toggleLink.classList.add('show');
            toggleLink.setAttribute('aria-expanded', 'true');
        });

        // Hide dropdown on mouse leave
        megaDropdown.addEventListener('mouseleave', function () {
            hoverTimeout = setTimeout(() => {
                dropdownMenu.classList.remove('show');
                toggleLink.classList.remove('show');
                toggleLink.setAttribute('aria-expanded', 'false');
            }, 100);
        });

        // Prevent dropdown closing when hovering inside
        dropdownMenu.addEventListener('mouseenter', function () {
            clearTimeout(hoverTimeout);
        });

        dropdownMenu.addEventListener('mouseleave', function () {
            hoverTimeout = setTimeout(() => {
                dropdownMenu.classList.remove('show');
                toggleLink.classList.remove('show');
                toggleLink.setAttribute('aria-expanded', 'false');
            }, 100);
        });

        // Optional: Handle dropdown item clicks
        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Mega dropdown item clicked:', this.textContent.trim());
            });
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".category-link").forEach(function (link) {
        link.addEventListener("click", function (e) {
            let submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains("submenu")) {
                e.preventDefault(); // prevent link navigation
                submenu.style.display = submenu.style.display === "block" ? "none" : "block";
                this.parentElement.classList.toggle("open");
            }
        });
    });
});

const scrollContainer = document.getElementById('productScroll');
document.getElementById('prevBtn').addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('nextBtn').addEventListener('click', () => {
    scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
});

const scrollContainer1 = document.getElementById('productScroll1');
document.getElementById('prevBtn1').addEventListener('click', () => {
    scrollContainer1.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('nextBtn1').addEventListener('click', () => {
    scrollContainer1.scrollBy({ left: 300, behavior: 'smooth' });
});


// mobile sidebar
document.addEventListener('DOMContentLoaded', function () {
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
    const mobileCloseSidebar = document.getElementById('mobileCloseSidebar');

    // Function to open sidebar
    function openMobileSidebar() {
        mobileSidebar.classList.add('show');
        mobileSidebarOverlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent body scrolling
    }

    // Function to close sidebar
    function closeMobileSidebar() {
        mobileSidebar.classList.remove('show');
        mobileSidebarOverlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore body scrolling
    }

    // Event listeners for opening sidebar
    mobileSidebarToggle.addEventListener('click', function (e) {
        e.preventDefault();
        openMobileSidebar();
    });

    // Event listeners for closing sidebar
    mobileCloseSidebar.addEventListener('click', function (e) {
        e.preventDefault();
        closeMobileSidebar();
    });

    mobileSidebarOverlay.addEventListener('click', function () {
        closeMobileSidebar();
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('show')) {
            closeMobileSidebar();
        }
    });

    // Handle submenu toggles
    document.querySelectorAll('[data-toggle="mobile-submenu"]').forEach(function (toggleLink) {
        toggleLink.addEventListener('click', function (e) {
            e.preventDefault();

            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('mobile-submenu')) {
                const isOpen = submenu.classList.contains('show');

                // Find the parent container (ul or div) to get siblings at the same level
                const parentLi = this.closest('li');
                const parentContainer = parentLi.parentNode;

                // Close all other submenus at the same level only
                const directSiblings = Array.from(parentContainer.children).filter(child =>
                    child !== parentLi && child.tagName === 'LI'
                );

                directSiblings.forEach(function (siblingLi) {
                    const siblingSubmenu = siblingLi.querySelector(':scope > .mobile-category-link + .mobile-submenu');
                    if (siblingSubmenu && siblingSubmenu.classList.contains('show')) {
                        siblingSubmenu.classList.remove('show');
                        const siblingToggle = siblingSubmenu.previousElementSibling;
                        if (siblingToggle) {
                            siblingToggle.setAttribute('aria-expanded', 'false');
                        }
                        // Close all nested submenus within this sibling
                        siblingSubmenu.querySelectorAll('.mobile-submenu.show').forEach(function (nestedSubmenu) {
                            nestedSubmenu.classList.remove('show');
                            const nestedToggle = nestedSubmenu.previousElementSibling;
                            if (nestedToggle) {
                                nestedToggle.setAttribute('aria-expanded', 'false');
                            }
                        });
                    }
                });

                // Toggle current submenu
                if (isOpen) {
                    submenu.classList.remove('show');
                    this.setAttribute('aria-expanded', 'false');
                    // Close all nested submenus
                    submenu.querySelectorAll('.mobile-submenu.show').forEach(function (nestedSubmenu) {
                        nestedSubmenu.classList.remove('show');
                        const nestedToggle = nestedSubmenu.previousElementSibling;
                        if (nestedToggle) {
                            nestedToggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                } else {
                    submenu.classList.add('show');
                    this.setAttribute('aria-expanded', 'true');
                }
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            closeMobileSidebar();
        }
    });
});