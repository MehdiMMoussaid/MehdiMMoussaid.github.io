const checkoutBtn = document.querySelector(".cart-btn");
checkoutBtn.addEventListener("click", function(){
    console.log("Checkout")
    event.preventDefault();

    const items = Array.from(document.querySelectorAll(".cart-item")).map(item => ({
        id: item.dataset.productId,
        quantity: Number(item.dataset.quantity),
        size: item.querySelector('.cart-item-size').textContent.replace(/^SIZEL\s*/, "")
    }));
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items})
    }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({url}) => {
        window.location = url
    }).catch(e => {
       console.error(e.error) 
    })
})

const currentPage = document.body.getAttribute('data-page');

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
        menuOpen = true;    }

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
            sortMenu.style.width = window.innerWidth <= 768 ? "70%" : "60%";
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
    function openCartMenu() {
        cartMenu.style.width = window.innerWidth <= 768 ? "70%" : "60%";
        }

    cartBtn.addEventListener("click", function(){
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

document.addEventListener("DOMContentLoaded", function() {
    const promoBar = document.querySelector(".promo-bar");
    const promoBarHeight = promoBar?.offsetHeight ?? 16;
    const navBar = document.querySelector(".main-nav")
    function checkPromoBar() {
        if (window.scrollY > promoBarHeight) {
            navBar.classList.add("scrolled");
            promoBar?.classList.add("is-hidden");
            promoBar?.style && (promoBar.style.height = "0px");
        }

        if (window.scrollY <= promoBarHeight) {
            navBar.classList.remove("scrolled");
            promoBar?.classList.remove("is-hidden");
            promoBar?.style && (promoBar.style.height = "16px");
            if (window.scrollY === promoBarHeight) {
                navBar.classList.remove("scrolled");
            }
        }
    }
    window.addEventListener("scroll", checkPromoBar, {passive: true});
    checkPromoBar();
});

document.addEventListener("DOMContentLoaded", function() {
    if (currentPage === 'store') {
        const navBar = document.querySelector(".main-nav");
        const storeBar = document.querySelector(".store-title-wrapper");
        const storeNavHeight = (navBar.offsetHeight + storeBar.offsetHeight);
        const storeTitle = document.querySelector(".store-subtitle");

        let lastScrollY = window.scrollY;

        function reactiveStoreBar() {
            const currentScrollY = window.scrollY;
            const scrollingUp = currentScrollY < lastScrollY;
        
            if (scrollingUp || currentScrollY <= 0) {
            navBar.classList.remove("is-hidden");
            storeBar.style.top = "52px";
            storeTitle.style.fontSize = "15px";


        } else {
            navBar.classList.add("is-hidden");
            storeBar.style.top = "0px";
            storeTitle.style.fontSize = "13px";
        } 

        lastScrollY = currentScrollY;

        }
        window.addEventListener("scroll", reactiveStoreBar, {passive: true});
        reactiveStoreBar();
    }; 
})

const sizeBtn = document.querySelectorAll(".size-buttons")
const sizeButtons = document.querySelectorAll(".size-buttons");

sizeBtn.forEach(function(button) {
    button.addEventListener("click", function() {
        sizeButtons.forEach(function(sizeBtn) {
            const isActive = sizeBtn === button;
            sizeBtn.classList.toggle("is-active", isActive)
            sizeBtn.setAttribute("aria-pressed", sizeBtn.getAttribute("aria-pressed") === "true" ? "false" : "true");
        })
    })
})

const addToCartBtn = document.querySelector(".add-to-cart-button");
if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function() {
        const selectedSize = document.querySelector(".size-buttons.is-active");
        if (!selectedSize) {
            alert("Selected a size first.");
            return;
        }

        addItemToCart({id: currentProduct.id, image: currentProduct.mainImage, name: currentProduct.name, size: selectedSize.textContent.trim(), price: currentProduct.price});
            openCartMenu();

    });
}

function updateCartTitle(cartList) {
    const cartTitle = document.querySelector(".cart-menu-title");
    if (!cartTitle || !cartList) return;

    const itemCount = cartList.querySelectorAll(".cart-item").length;
    cartTitle.textContent = `BAG (${itemCount})`;

}

document.addEventListener("DOMContentLoaded", function() {
    const cartList = document.querySelector(".cart-items-list");
    if (!cartList) return;

    const savedProducts = JSON.parse(localStorage.getItem("cartItems") || "[]");
    for (const product of savedProducts){
        addItemToCart(product);
    }

    if (!cartList.querySelector(".cart-item")) {
            const emptyMessage = document.createElement("h1");
            emptyMessage.classList.add("cart-empty");
            emptyMessage.textContent = ("Your cart is empty.");
            cartList.append(emptyMessage);
    }
    updateCartTitle(cartList);
    updateCheckoutTotal(cartList);
});

function addItemToCart(product){
    const cartList = document.querySelector(".cart-items-list");
    if (!cartList) return;
    cartList.querySelector(".cart-empty")?.remove();

    const item = document.createElement("div"); 
    item.classList.add("cart-item");

    const matchingproduct = products.find(candidate => candidate.name == product.name);
    item.dataset.productId =  product.id || matchingProduct?.id || "";
    item.dataset.price = product.price.replace(/[^\d.]/g, "");

    const image = document.createElement("img"); 
    image.classList.add("cart-item-image");
    image.src = product.image;

    const details = document.createElement("div");
    details.classList.add("cart.item-details");

    const name = document.createElement("h2"); 
    name.classList.add("cart-text");
    name.textContent = product.name;

    const size = document.createElement("h2")
    size.classList.add("cart-item-size")
    size.textContent = `SIZE: ${product.size}`

    const price = document.createElement("h2");
    price.classList.add("cart-price-text");
    price.textContent = product.price;

    const qtyBtn = document.createElement("quantity-input");
    qtyBtn.classList.add("quantity-input");

    const qtyPlus = document.createElement("button");
    qtyPlus.classList.add("plus");
    qtyPlus.textContent = "+"

    const qtyMinus = document.createElement("button");
    qtyMinus.classList.add("minus");
    qtyMinus.textContent = "-";

    const qty = document.createElement("h6");
    qty.classList.add("cart-text")
    qty.textContent = "QTY 1"

    let quantity = Number.isSafeInteger(product.quantity) && product.quantity > 0
        ? product.quantity
        : 1;
    item.dataset.quantity = quantity;
    qty.textContent = `QTY ${quantity}`;

    qtyPlus.addEventListener("click", function() {
        quantity = quantity + 1;
        qty.textContent = `QTY ${quantity}`;
        item.dataset.quantity = quantity
        updateCheckoutTotal(cartList)
        saveCart(cartList)
    });

        qtyMinus.addEventListener("click", function() {
        if (quantity > 1) {
            quantity = quantity - 1;
            qty.textContent = `QTY ${quantity}`;
            item.dataset.quantity = quantity
            updateCheckoutTotal(cartList)
            saveCart(cartList)
        }
    })

    qtyBtn.append(qtyMinus, qty, qtyPlus);


    const removeBtn = document.createElement("button");
    removeBtn.classList.add("cart-item-remove");
    removeBtn.textContent = "REMOVE";
    removeBtn.addEventListener("click", function(){
        item.remove();

        if (!cartList.querySelector(".cart-item")) {
            const emptyMessage = document.createElement("h1");
            emptyMessage.classList.add("cart-empty");
            emptyMessage.textContent = ("Your cart is empty.");
            cartList.append(emptyMessage);
        }
        updateCartTitle(cartList)
        updateCheckoutTotal(cartList);
        saveCart(cartList);
    })

    details.append(name, size, price, qtyBtn);
    item.append(image, details, removeBtn);
    cartList.append(item);
    updateCartTitle(cartList);
    updateCheckoutTotal(cartList);
    saveCart(cartList);
}

const grids = document.querySelectorAll(".store-product-grid");
const firstGridLimit = 6;
const products = [
({id: "brazil-away", mainImage: "product.webp", images: ["product1.jpg", "product.webp"], name: "Brazil National Team 2026 Stadium Away", size:"M", price: "$72.99 CAD" }),
({id: "canada-nocta", mainImage: "product2.webp", images: ["product2.2.avif","product2.webp"], name: "Canada x Nocta", size:"M", price: "$89.99 CAD" }),
({id: "barcelona-away", mainImage: "product3.3.jpg", images: ["product3.webp", "product3.3.jpg"], name: "F.C. Barcelona 2026/27 Stadium Away", size:"M", price: "$99.99 CAD" }),

({id: "canada-nocta", mainImage: "product2.webp", images: ["product2.2.avif","product2.webp"], name: "Canada x Nocta", size:"M", price: "$89.99 CAD" }),
({id: "brazil-away", mainImage: "product.webp", images: ["product1.jpg", "product.webp"], name: "Brazil National Team 2026 Stadium Away", size:"M", price: "$72.99 CAD" }),
({id: "barcelona-away", mainImage: "product3.3.jpg", images: ["product3.webp", "product3.3.jpg"], name: "F.C. Barcelona 2026/27 Stadium Away", size:"M", price: "$99.99 CAD" }),

({id: "barcelona-away", mainImage: "product3.3.jpg", images: ["product3.webp", "product3.3.jpg"], name: "F.C. Barcelona 2026/27 Stadium Away", size:"M", price: "$99.99 CAD" }),
({id: "canada-nocta", mainImage: "product2.webp", images: ["product2.2.avif","product2.webp"], name: "Canada x Nocta", size:"M", price: "$89.99 CAD" }),
({id: "brazil-away", mainImage: "product.webp", images: ["product1.jpg", "product.webp"], name: "Brazil National Team 2026 Stadium Away", size:"M", price: "$72.99 CAD" }),

({id: "brazil-away", mainImage: "product.webp", images: ["product1.jpg", "product.webp"], name: "Brazil National Team 2026 Stadium Away", size:"M", price: "$72.99 CAD" }),
({id: "canada-nocta", mainImage: "product2.webp", images: ["product2.2.avif","product2.webp"], name: "Canada x Nocta", size:"M", price: "$89.99 CAD" }),
({id: "barcelona-away", mainImage: "product3.3.jpg", images: ["product3.webp", "product3.3.jpg"], name: "F.C. Barcelona 2026/27 Stadium Away", size:"M", price: "$99.99 CAD" }),

({id: "canada-nocta", mainImage: "product2.webp", images: ["product2.2.avif","product2.webp"], name: "Canada x Nocta", size:"M", price: "$89.99 CAD" }),
({id: "brazil-away", mainImage: "product.webp", images: ["product1.jpg", "product.webp"], name: "Brazil National Team 2026 Stadium Away", size:"M", price: "$72.99 CAD" }),
({id: "barcelona-away", mainImage: "product3.3.jpg", images: ["product3.webp", "product3.3.jpg"], name: "F.C. Barcelona 2026/27 Stadium Away", size:"M", price: "$99.99 CAD" }),

({id: "barcelona-away", mainImage: "product3.3.jpg", images: ["product3.webp", "product3.3.jpg"], name: "F.C. Barcelona 2026/27 Stadium Away", size:"M", price: "$99.99 CAD" }),
({id: "canada-nocta", mainImage: "product2.webp", images: ["product2.2.avif","product2.webp"], name: "Canada x Nocta", size:"M", price: "$89.99 CAD" }),
({id: "brazil-away", mainImage: "product.webp", images: ["product1.jpg", "product.webp"], name: "Brazil National Team 2026 Stadium Away", size:"M", price: "$72.99 CAD" })
]

function saveCart(cartList) {
    const products = Array.from(cartList.querySelectorAll(".cart-item")).map(function(item) {
        return {
            id: item.dataset.productId,
            quantity: Number(item.dataset.quantity),
            image: item.querySelector(".cart-item-image").getAttribute("src"),
            name: item.querySelector(".cart-text").textContent,
            price: item.querySelector(".cart-price-text").textContent,
            size: item.querySelector(".cart-item-size").textContent.replace(/^SIZE:\s*/, "")
        };
    });

    localStorage.setItem("cartItems", JSON.stringify(products));
}


function updateCheckoutTotal (cartList) {
    const checkoutTotal = document.querySelector(".checkout-total"); 
    if(!cartList || !checkoutTotal) return;
    let total = 0;

    const nitems = cartList.querySelectorAll(".cart-item");
    for (const item of nitems){
        total += Number(item.dataset.price*item.dataset.quantity);
    }

    checkoutTotal.textContent = `Subtotal: ${new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD"
    }).format(total)}`;
}

function addToStore(product, storeList) {
    if (!storeList) return;

    const item = document.createElement("li");
    item.classList.add("store-product");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("store-image-container");

    const imageCarousel = document.createElement("div");
    imageCarousel.classList.add("product-carousel");

    const mainImage = document.createElement("img");
    mainImage.classList.add("product-image-main")
    mainImage.src = product.mainImage;

    product.images.forEach(function(src) {
        const image = document.createElement("img");
        image.classList.add("product-image");
        image.src = src;
        image.alt = product.name;
        imageCarousel.append(image);
    });

    
    const linkOverlay = document.createElement("a");
    linkOverlay.classList.add("image-link-overlay");
    linkOverlay.href = "product-page.html?id=" + encodeURIComponent(product.id);

    const name = document.createElement("h3");
    name.classList.add("store-product-title"); 
    name.textContent = product.name

    const price = document.createElement("p");
    price.classList.add("price-tag");
    price.textContent = product.price; 

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("product-arrow-button-prev");

    const nextBtn = document.createElement("button");
    nextBtn.classList.add("product-arrow-button-next");

    imageContainer.append(mainImage, imageCarousel, prevBtn, nextBtn, linkOverlay);
    item.append(imageContainer, name, price);
    storeList.append(item);
}

products.forEach(function (product, index) {
    const targetGrid = index < firstGridLimit ? grids[0] : grids[1];
    addToStore(product, targetGrid);
});

const productPage = document.querySelector(".product-page-section");

if (productPage) {
    const id = new URLSearchParams(location.search).get("id");
    currentProduct = products.find(function(product) {
        return product.id === id;
    });

    if (currentProduct) {
        productPage.querySelector(".pp-product-title").textContent =
            currentProduct.name;

        productPage.querySelector(".product-info .pp-price-tag span").textContent =
            currentProduct.price;
        
            const mainImage = productPage.querySelector(
                ".image-container-pp .product-image-main"
            );
            mainImage.src = currentProduct.mainImage;
            mainImage.alt = currentProduct.name;

            const carousel = productPage.querySelector(".image-container-pp .product-carousel");

            const images = currentProduct.images.map(function(src) {
                const image = document.createElement("img");
                image.className = "product-image";
                image.src = src;
                image.alt = currentProduct.name;
                return image;
            });

            carousel.replaceChildren(...images);
    }

}
