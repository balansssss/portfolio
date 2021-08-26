const hamburger = document.getElementById("hamburger")
const mobileNav = document.getElementById("mobile-nav")
hamburger.addEventListener("click", () => {
    if(mobileNav.classList.contains("show")) {
        mobileNav.style.opacity = "0"
        setTimeout(()=>{
            mobileNav.classList.remove("show")
        }, 500)
    } else {
        mobileNav.classList.add("show")
        setTimeout(()=>{
            mobileNav.style.opacity = "1"
        }, 500)
    }
})