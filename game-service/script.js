const toggleMobileMenu = document.querySelector('#toggleNav');
const mobileNav = document.querySelector('#mobileNav');

toggleMobileMenu.addEventListener('click', function () {
    if (mobileNav.className.indexOf('active') !== -1) {
        mobileNav.className = 'mobile-nav';
    } else {
        mobileNav.className = 'mobile-nav active';
    }
});