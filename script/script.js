const burgerMenu = document.querySelector('.burger-menu');
const burgerBtn = document.querySelector('.burger-btn');
const burgerClose = document.querySelector('.burger-close');

function burgerMenuOpen() {
    burgerMenu.classList.add('active');
    if (window.innerWidth <= 767) {
        document.body.style.overflow = 'hidden';
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

function burgerMenuClose() {
    burgerMenu.classList.remove('active');
    if (window.innerWidth <= 767) {
        document.body.style.overflow = 'auto';
    }
}

burgerBtn.addEventListener('click', burgerMenuOpen);
burgerClose.addEventListener('click', burgerMenuClose);