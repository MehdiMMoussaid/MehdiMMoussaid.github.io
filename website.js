document.addEventListener("DOMContentLoaded", function () {
    const productBoxes = document.querySelectorAll(".product-box, .store-product");

    productBoxes.forEach(function (box) {

            const carousel = box.querySelector(".product-carousel");

            if (!carousel) {
                return;
            }

            const images = carousel.querySelectorAll(".product-image");
            const prevBtn = box.querySelector(".product-arrow-button-prev");
            const nextBtn = box.querySelector(".product-arrow-button-next");

            if (images.length === 0 || !prevBtn || !nextBtn) {
                return;
            }

        let currentImage = 0;

        images[0].classList.add("is-active")

    function updateImage() {

        images.forEach(function(img, index) {

            if (index === currentImage) {
                img.classList.add("is-active");
            } else {
                img.classList.remove("is-active");
            }
        });
    }

    nextBtn.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();
        
        currentImage = (currentImage + 1) % images.length;
        updateImage();
    });

    prevBtn.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();
        
        currentImage = (currentImage - 1 + images.length) % images.length;
        updateImage();
    });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const mobileMenu = document.querySelector(".mobile-menu");
    const nav = document.querySelector(".main-nav");
    const mobileMenuIcon = document.querySelector(".mobile-menu-icon");

    function checkWidth() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth < 768) {
            mobileMenu.classList.add("is-active");
        } else {
            mobileMenu.classList.remove("is-active");
            mobileMenu.style.display = "none";
        }
    }

    checkWidth(); 
    window.addEventListener("resize", checkWidth);

    function toggleMenu() {
        if (mobileMenu.classList.contains("is-active")) {
            mobileMenu.style.width = "100%";
            mobileMenuIcon.style.display = "none";
        } else {
            mobileMenu.style.width = "0";
            mobileMenuIcon.style.display = "block";
        }
    }

    mobileMenuIcon.addEventListener("click", toggleMenu);

    function closeMenu() {
        mobileMenu.style.width = "0";
        mobileMenuIcon.style.display = "block";
    }

    const mobileMenuClose = document.querySelector(".mobile-menu-close");

    mobileMenuClose.addEventListener("click", closeMenu);

});