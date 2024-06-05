const accordions = document.querySelectorAll('.accordion .icon');

for (let i=0;i<accordions.length;i++) {
    accordions[i].addEventListener('click', function() {
        this.closest('.accordion').classList.toggle('active');
    });
}

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
});