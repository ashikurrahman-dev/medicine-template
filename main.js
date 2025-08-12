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




//   mobile sidebar
 console.log("Mobile sidebar script loaded");

        // Get elements
        const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
        const mobileSidebar = document.getElementById('mobileSidebar');
        const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
        const mobileCloseSidebar = document.getElementById('mobileCloseSidebar');

        // Verify elements exist
        if (!mobileSidebarToggle) console.error("Mobile sidebar toggle element not found");
        if (!mobileSidebar) console.error("Mobile sidebar element not found");
        if (!mobileSidebarOverlay) console.error("Mobile sidebar overlay element not found");
        if (!mobileCloseSidebar) console.error("Mobile close sidebar button not found");

        // Open sidebar
        mobileSidebarToggle.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Mobile sidebar toggle clicked");
            mobileSidebar.classList.add('active');
            mobileSidebarOverlay.classList.add('active');
        });

        // Close sidebar when clicking overlay
        mobileSidebarOverlay.addEventListener('click', () => {
            console.log("Mobile overlay clicked");
            mobileSidebar.classList.remove('active');
            mobileSidebarOverlay.classList.remove('active');
            // Close all submenus when sidebar closes
            document.querySelectorAll('.mobile-submenu.active').forEach(submenu => {
                submenu.classList.remove('active');
            });
            document.querySelectorAll('.mobile-arrow.active').forEach(arrow => {
                arrow.classList.remove('active');
            });
        });

        // Close sidebar when clicking close button
        mobileCloseSidebar.addEventListener('click', () => {
            console.log("Mobile close button clicked");
            mobileSidebar.classList.remove('active');
            mobileSidebarOverlay.classList.remove('active');
            // Close all submenus when sidebar closes
            document.querySelectorAll('.mobile-submenu.active').forEach(submenu => {
                submenu.classList.remove('active');
            });
            document.querySelectorAll('.mobile-arrow.active').forEach(arrow => {
                arrow.classList.remove('active');
            });
        });

        // Submenu toggle functionality
        document.querySelectorAll('[data-toggle="mobile-submenu"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log("Mobile submenu link clicked:", link.textContent);
                const submenu = link.nextElementSibling;
                const arrow = link.querySelector('.mobile-arrow');
                if (submenu && submenu.classList.contains('mobile-submenu')) {
                    const isActive = submenu.classList.contains('active');
                    // Close other submenus at the same level
                    link.parentElement.parentElement.querySelectorAll('.mobile-submenu.active').forEach(sibling => {
                        if (sibling !== submenu) {
                            sibling.classList.remove('active');
                            sibling.previousElementSibling.querySelector('.mobile-arrow').classList.remove('active');
                        }
                    });
                    // Toggle current submenu
                    submenu.classList.toggle('active');
                    if (arrow) arrow.classList.toggle('active', !isActive);
                } else {
                    console.warn("Mobile submenu not found for link:", link.textContent);
                }
            });
        });