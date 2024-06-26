const hamburger = document.querySelector('.hamburger')
const mobileNavigation = document.querySelector('.mobile-navigation')
const hamburgerClose = document.querySelector('.hamburger-close')

hamburger.addEventListener('click', () => {
    mobileNavigation.classList.add('active')
    hamburger.classList.add('active')
})

hamburgerClose.addEventListener('click', () => {
    mobileNavigation.classList.remove('active')
    hamburger.classList.remove('active')
})