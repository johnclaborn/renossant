/* navigation bar start*/
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const links = document.querySelectorAll('.nav-links a');

toggle.addEventListener('click', () => { /* open nav bar on click */
    navLinks.classList.toggle('active');
});

links.forEach(link => { /* close nav bar on click */
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navLinks.classList.remove('active');
        }
    });
});
/* navigation bar end */