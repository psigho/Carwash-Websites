document.addEventListener('DOMContentLoaded', () => {
    fetch('website_config.json')
        .then(response => response.json())
        .then(config => {
            applyConfig(config);
        })
        .catch(error => console.error('Error loading config:', error));
});

function applyConfig(config) {
    // --- Meta & Branding ---
    document.title = config.meta.title;
    document.getElementById('meta-title').innerText = config.meta.title;
    document.getElementById('meta-description').content = config.meta.description;

    // Apply Colors
    document.documentElement.style.setProperty('--primary-color', config.branding.primary_color);
    document.documentElement.style.setProperty('--secondary-color', config.branding.secondary_color);
    document.documentElement.style.setProperty('--accent-color', config.branding.accent_color);
    document.documentElement.style.setProperty('--font-heading', config.branding.font_heading);
    document.documentElement.style.setProperty('--font-body', config.branding.font_body);

    // Navbar
    document.getElementById('nav-logo').innerText = config.branding.logo_text;
    document.getElementById('footer-logo').innerText = config.branding.logo_text;
    document.getElementById('footer-name').innerText = config.branding.name;
    document.getElementById('year').innerText = new Date().getFullYear();

    // Hero
    document.getElementById('hero-headline').innerText = config.hero.headline;
    document.getElementById('hero-subheadline').innerText = config.hero.subheadline;
    document.getElementById('hero-cta').innerText = config.hero.cta_text;
    document.getElementById('hero-cta').href = config.hero.cta_link;

    const ctaSecondary = document.getElementById('hero-cta-secondary');
    if (ctaSecondary && config.hero.cta_secondary_text) {
        ctaSecondary.innerText = config.hero.cta_secondary_text;
        ctaSecondary.href = config.hero.cta_secondary_link;
    }

    if (config.trust_signals) {
        const trustEl = document.getElementById('hero-trust-text');
        if (trustEl) {
            trustEl.innerText = config.trust_signals.display_text;
        }
    }

    document.querySelector('.hero').style.backgroundImage = `url('${config.hero.background_image}')`;

    // Contact
    updateContactInfo(config.contact);

    // --- Dynamic Lists ---
    renderFeatures(config.features);
    renderServices(config.services);
    renderReviews(config.reviews);
    renderGallery(config.gallery);
    renderFAQ(config.faq);
}

function updateContactInfo(contact) {
    const phoneLinks = document.querySelectorAll('a[href="#contact"]'); // Simple hook if needed, but we use IDs mainly

    // Header/Footer Buttons usually link to #contact, logic is CSS driven mostly

    // Contact Section
    document.getElementById('contact-phone').innerText = contact.phone;
    document.getElementById('contact-phone').href = `tel:${contact.phone}`;

    document.getElementById('contact-email').innerText = contact.email;
    document.getElementById('contact-email').href = `mailto:${contact.email}`;

    document.getElementById('contact-address').innerText = contact.address;

    document.getElementById('contact-map-frame').src = contact.map_embed_url;

    const bookingIframe = document.getElementById('booking-frame');
    if (bookingIframe && contact.booking_embed_url) {
        bookingIframe.src = contact.booking_embed_url;
    }

    const mobileCall = document.getElementById('mobile-bar-call');
    if (mobileCall) {
        mobileCall.href = `tel:${contact.phone.replace(/[^0-9]/g, '')}`;
    }
}

function renderFeatures(features) {
    const container = document.getElementById('features-grid');
    container.innerHTML = '';
    features.forEach(feature => {
        const div = document.createElement('div');
        div.className = 'feature-card';
        div.innerHTML = `
            <i class="${feature.icon}"></i>
            <h3>${feature.title}</h3>
            <p>${feature.desc}</p>
        `;
        container.appendChild(div);
    });
}

function renderServices(services) {
    const container = document.getElementById('services-grid');
    container.innerHTML = '';
    services.forEach(service => {
        const div = document.createElement('div');
        div.className = 'service-card';
        div.innerHTML = `
            <div class="service-image" style="background-image: url('${service.image}')"></div>
            <div class="service-content">
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
                <div class="service-price">${service.price}</div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderReviews(reviews) {
    const container = document.getElementById('reviews-grid');
    container.innerHTML = '';
    reviews.forEach(review => {
        const stars = '<i class="fas fa-star"></i>'.repeat(review.stars);
        const div = document.createElement('div');
        div.className = 'review-card';
        div.innerHTML = `
            <div class="stars">${stars}</div>
            <p class="review-text">"${review.text}"</p>
            <p class="review-author">- ${review.name}</p>
        `;
        container.appendChild(div);
    });
}

function renderGallery(images) {
    const container = document.getElementById('gallery-grid');
    container.innerHTML = '';
    images.forEach(imgUrl => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `<img src="${imgUrl}" alt="Gallery Image" loading="lazy">`;
        container.appendChild(div);
    });
}

function renderFAQ(faqs) {
    const container = document.getElementById('faq-grid');
    container.innerHTML = '';
    faqs.forEach(item => {
        const div = document.createElement('div');
        div.className = 'faq-item';
        div.innerHTML = `
            <div class="faq-question">
                <h3>${item.question}</h3>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;

        // Simple toggle logic
        div.querySelector('.faq-question').addEventListener('click', () => {
            div.classList.toggle('active');
        });

        container.appendChild(div);
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});
