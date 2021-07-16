const menu = document.querySelector('#hamburger')
const menuItems = document.querySelector('.mobile-menu')

menu.addEventListener('click', event => {
    if (menu.className.split(' ')[1]) {
        menu.classList.remove('open')
        menuItems.classList.remove('open')
        setTimeout(()=>{
            menuItems.style.display = 'none'
        }, 100)
    } else {
        menu.classList.add('open')
        menuItems.style.display = 'block'
        setTimeout(()=>{
            menuItems.classList.add('open')
        }, 100)
    }
})