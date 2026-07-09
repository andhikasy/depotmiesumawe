document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const menuToggleIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        if (navLinks.classList.contains('open')) {
            menuToggleIcon.className = 'fa-solid fa-xmark';
        } else {
            menuToggleIcon.className = 'fa-solid fa-bars';
        }
    });

    const navLinksList = document.querySelectorAll('.nav-link');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggleIcon.className = 'fa-solid fa-bars';
        });
    });


    // ==========================================
    // 2. NAVBAR SCROLL STYLE
    // ==========================================
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // ==========================================
    // 3. MENU CATEGORY FILTER
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // ==========================================
    // 4. WHATSAPP CART SYSTEM
    // ==========================================
    let cart = {}; // format: { "Nama Item": { price: 12000, qty: 1 } }
    const cartBar = document.getElementById('cart-bar');
    const cartCountBadge = document.getElementById('cart-count');
    const cartTotalText = document.getElementById('cart-total');
    const cartSubmitBtn = document.getElementById('cart-submit-btn');

    // Click handlers for plus & minus buttons
    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'));
            
            if (!cart[name]) {
                cart[name] = { price: price, qty: 0 };
            }
            cart[name].qty += 1;
            updateCartUI(name);
        });
    });

    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            if (cart[name] && cart[name].qty > 0) {
                cart[name].qty -= 1;
                if (cart[name].qty === 0) {
                    delete cart[name];
                }
                updateCartUI(name);
            }
        });
    });

    // Update quantities, totals and show/hide cart bar
    function updateCartUI(itemName) {
        // Update specific item counter text
        const qtySpans = document.querySelectorAll(`.cart-qty[data-name="${itemName}"]`);
        const qty = cart[itemName] ? cart[itemName].qty : 0;
        qtySpans.forEach(span => {
            span.textContent = qty;
        });

        // Calculate totals
        let totalQty = 0;
        let totalPrice = 0;

        for (const item in cart) {
            totalQty += cart[item].qty;
            totalPrice += (cart[item].price * cart[item].qty);
        }

        // Update sticky bar UI
        cartCountBadge.textContent = totalQty;
        cartTotalText.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;

        // Show or hide cart bar
        if (totalQty > 0) {
            cartBar.classList.add('active');
        } else {
            cartBar.classList.remove('active');
        }
    }

    // WhatsApp Checkout Formatter
    cartSubmitBtn.addEventListener('click', () => {
        let totalOrderPrice = 0;
        let orderDetails = "Halo Depot Mie Sumawe 👋\nSaya ingin memesan menu berikut:\n\n";

        for (const item in cart) {
            const itemTotal = cart[item].price * cart[item].qty;
            totalOrderPrice += itemTotal;
            orderDetails += `• *${item}* (${cart[item].qty}x) = Rp ${itemTotal.toLocaleString('id-ID')}\n`;
        }

        orderDetails += `\nSubtotal: Rp ${totalOrderPrice.toLocaleString('id-ID')}`;
        orderDetails += `\nOngkos Kirim: (Menyesuaikan jarak pengiriman)`;
        orderDetails += `\n*Total Tagihan: Rp ${totalOrderPrice.toLocaleString('id-ID')} + Ongkir*\n`;
        orderDetails += `\nMohon diproses untuk pemesanan ini. Terima kasih!`;

        const encodedText = encodeURIComponent(orderDetails);
        const waUrl = `https://wa.me/6285162612323?text=${encodedText}`;
        
        // Open WA in a new window
        window.open(waUrl, '_blank');
    });

    // Clear Cart (Batal Pesan)
    const cartClearBtn = document.getElementById('cart-clear-btn');
    cartClearBtn.addEventListener('click', () => {
        for (const item in cart) {
            const qtySpans = document.querySelectorAll(`.cart-qty[data-name="${item}"]`);
            qtySpans.forEach(span => {
                span.textContent = 0;
            });
        }
        cart = {};
        cartBar.classList.remove('active');
        cartCountBadge.textContent = 0;
        cartTotalText.textContent = 'Rp 0';
    });


    // ==========================================
    // 5. ACCORDION FAQ
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            
            // Toggle active class on clicked item
            faqItem.classList.toggle('active');
            
            // Change chevron direction
            const icon = question.querySelector('i');
            if (faqItem.classList.contains('active')) {
                icon.className = 'fa-solid fa-chevron-up text-muted';
            } else {
                icon.className = 'fa-solid fa-chevron-down text-muted';
            }
        });
    });


    // ==========================================
    // 6. DARK & LIGHT THEME TOGGLE
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fa-solid fa-sun';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        let theme = 'light';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark';
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
        
        localStorage.setItem('theme', theme);
    });


    // ==========================================
    // 7. SCROLL SPY ACTIVE NAV LINK
    // ==========================================
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    
    console.log("Depot Mie Sumawe features initialized successfully: WhatsApp Cart, FAQ Accordion, Dark Mode Switcher.");
});
