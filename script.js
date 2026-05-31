document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll("#nav-list li");
    const sections = document.querySelectorAll(".content-section");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            // Remove active from all nav items
            navItems.forEach(nav => nav.classList.remove("active"));
            // Add active to clicked nav item
            item.classList.add("active");

            // Hide all sections
            sections.forEach(sec => {
                sec.classList.remove("active-section");
            });

            // Show targeted section
            const targetId = item.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("active-section");
            }
        });
    });
});
