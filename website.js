

document.addEventListener("DOMContentLoaded", function () {
    const productBoxes = document.querySelectorAll(".product-box, .store-product, .product-box-product-page");

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
    let menuOpen = false;

    function checkWidth() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth < 768) {
    mobileMenuIcon.style.display = "block";
    mobileMenu.classList.add("is-active");
    mobileMenu.style.display = "";
        } else {
            mobileMenu.classList.remove("is-active");
            mobileMenu.style.width = "0";
            mobileMenu.style.display = "";
            menuOpen = false;
        }
    }

    checkWidth(); 
    window.addEventListener("resize", checkWidth);

    function toggleMenu() {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    function openMenu() {
        mobileMenu.style.width = "100%";
        mobileMenuIcon.style.display = "none";
        menuOpen = true;
    }

    mobileMenuIcon.addEventListener("click", toggleMenu);

    function closeMenu() {
        mobileMenu.style.width = "0";
        mobileMenuIcon.style.display = "block";
        menuOpen = false;
    }

    const mobileMenuClose = document.querySelector(".mobile-menu-close");

    mobileMenuClose.addEventListener("click", closeMenu);


});
document.addEventListener("DOMContentLoaded", function() {
    const slideshowContainer = document.querySelector(".slideshow-container");

    const slideshowImages = slideshowContainer.querySelectorAll(".slideshow-image, #video"); 
    const caption = slideshowContainer.querySelector(".slide-caption");
    const slideNum = slideshowContainer.querySelector(".slide-number")
    const slideTitle = slideshowContainer.querySelector(".slide-title");
    const PrevBtn = document.querySelector(".slideshow-arrow-button-prev");
    const NextBtn = document.querySelector(".slideshow-arrow-button-next");
    
    let currentImage = 0;

    slideshowImages[0].classList.add("is-active");

    function updateImage() {
        
        caption.textContent = slideshowImages[currentImage].dataset.caption || "";
        slideTitle.textContent = slideshowImages[currentImage].dataset.slidetitle || "";
        slideTitle.dataset.text = slideTitle.textContent;
        slideNum.textContent = `Slide ${currentImage + 1} / ${slideshowImages.length}`;
        slideshowImages.forEach(function(img, i) {
            if(currentImage === i){
                img.classList.add("is-active");
            } else {
                img.classList.remove("is-active");
            }
        });
    }

    updateImage();

        NextBtn.addEventListener("click", function() {
            currentImage = (currentImage + 1) % slideshowImages.length;
            updateImage();
        });

        PrevBtn.addEventListener("click", function() {
            currentImage = (currentImage - 1 + slideshowImages.length) % slideshowImages.length;
            updateImage()
        });
    
})




var collapsible = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < collapsible.length; i++) {
    collapsible[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

const sortBtn = document.querySelector(".store-sort-btn"); 
const sortMenu = document.querySelector("#sort-menu");
const sortCloseBtn = document.querySelector(".sort-menu-close")

if (sortBtn && sortMenu && sortCloseBtn) {
    sortBtn.addEventListener("click", function() {
        function openSortMenu() {
            sortMenu.style.width = "250px";
        }
        openSortMenu();
    });

    sortCloseBtn.addEventListener("click", function(){
        function closeSortMenu() {
        sortMenu.style.width = "0px";
        }
        closeSortMenu();
    

    });
}

    const cartBtn = document.querySelector(".cart-icon");
    const cartMenu = document.querySelector("#cart-menu");
    const cartCloseBtn = document.querySelector(".cart-menu-close");

    cartBtn.addEventListener("click", function(){
        function openCartMenu() {
        cartMenu.style.width = "300px";
        }
        openCartMenu();
    });

    cartCloseBtn.addEventListener("click", function(){
        function closeCartMenu() {
        cartMenu.style.width = "0px";
        }
        closeCartMenu();
    });

document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.2});

    document.querySelectorAll(".onScrollReveal, .onScrollReveal2").forEach(function (element) {
        observer.observe(element);
    });
})