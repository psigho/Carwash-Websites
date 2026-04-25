/* ═══════════════════════════════════════════════════════════
   Money_Template v2 — config loader + cinematic behaviors
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    fetch('website_config.json')
        .then(r => r.json())
        .then(cfg => {
            applyConfig(cfg);
            initBehaviors();
        })
        .catch(err => {
            console.error('Config load failed:', err);
            document.body.innerHTML = '<div style="padding:40px;text-align:center;color:#F3F3F5;font-family:sans-serif">Site configuration failed to load. Please refresh.</div>';
        });
});

function applyConfig(cfg) {
    // Meta
    document.title = cfg.meta.title;
    const metaTitle = document.getElementById('meta-title');
    if (metaTitle) metaTitle.textContent = cfg.meta.title;
    document.getElementById('meta-description').setAttribute('content', cfg.meta.description);
    document.getElementById('og-title').setAttribute('content', cfg.meta.title);
    document.getElementById('og-description').setAttribute('content', cfg.meta.description);

    // Brand CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary', cfg.branding.primary_color);
    if (cfg.branding.secondary_color) root.style.setProperty('--secondary', cfg.branding.secondary_color);
    if (cfg.branding.accent_color) root.style.setProperty('--accent', cfg.branding.accent_color);
    if (cfg.branding.font_heading) root.style.setProperty('--font-heading', cfg.branding.font_heading);
    if (cfg.branding.font_body) root.style.setProperty('--font-body', cfg.branding.font_body);
    if (cfg.branding.font_display) root.style.setProperty('--font-display', cfg.branding.font_display);

    // Theme-color matches bg
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', getComputedStyle(root).getPropertyValue('--bg').trim() || '#07070A');

    // Navbar + footer brand
    const logo = cfg.branding.logo_text || cfg.branding.name.slice(0, 2).toUpperCase();
    setText('nav-logo', logo);
    setText('footer-logo', logo);
    setText('nav-name', cfg.branding.name);
    setText('footer-name', cfg.branding.name);
    setText('footer-name-2', cfg.branding.name);
    document.getElementById('year').textContent = new Date().getFullYear();

    // Hero
    setText('hero-headline', cfg.hero.headline);
    setText('hero-subheadline', cfg.hero.subheadline);
    setText('hero-cta', cfg.hero.cta_text);
    document.getElementById('hero-cta').setAttribute('href', cfg.hero.cta_link);
    const ctaSec = document.getElementById('hero-cta-secondary');
    if (cfg.hero.cta_secondary_text && ctaSec) {
        ctaSec.textContent = cfg.hero.cta_secondary_text;
        ctaSec.setAttribute('href', cfg.hero.cta_secondary_link);
    }

    // Hero video
    const video = document.getElementById('hero-video');
    if (video) {
        const src = cfg.hero.video_url || '';
        const poster = cfg.hero.video_poster || cfg.hero.background_image || '';
        if (poster) video.setAttribute('poster', poster);
        if (src) {
            video.setAttribute('src', src);
            video.load();
        } else if (cfg.hero.background_image) {
            // Fall back to still image hero if no video
            video.style.display = 'none';
            document.querySelector('.hero-video-wrap').style.background = `#07070A url('${cfg.hero.background_image}') center / cover no-repeat`;
        }
    }

    if (cfg.trust_signals && cfg.trust_signals.display_text) {
        setText('hero-trust-text', cfg.trust_signals.display_text);
    }

    // Contact
    const c = cfg.contact || {};
    const phoneEl = document.getElementById('contact-phone');
    if (c.phone) {
        phoneEl.textContent = c.phone;
        phoneEl.setAttribute('href', 'tel:' + c.phone.replace(/[^0-9+]/g, ''));
    }
    const emailEl = document.getElementById('contact-email');
    if (c.email) {
        emailEl.textContent = c.email;
        emailEl.setAttribute('href', 'mailto:' + c.email);
    }
    if (c.address) setText('contact-address', c.address);
    if (c.map_embed_url) document.getElementById('contact-map-frame').setAttribute('src', c.map_embed_url);

    const mobileCall = document.getElementById('mobile-bar-call');
    if (mobileCall && c.phone) mobileCall.setAttribute('href', 'tel:' + c.phone.replace(/[^0-9+]/g, ''));

    // Booking
    if (c.booking_embed_url) {
        document.getElementById('booking').removeAttribute('hidden');
        document.getElementById('booking-frame').setAttribute('src', c.booking_embed_url);
    }

    renderFeatures(cfg.features || []);
    renderServices(cfg.services || []);
    renderStats(cfg);
    renderReviews(cfg.reviews || []);
    renderGallery(cfg.gallery || [], cfg.branding.name);
    renderFAQ(cfg.faq || []);
    renderMarquee(cfg);
}

function setText(id, txt) {
    const el = document.getElementById(id);
    if (el && txt != null) el.textContent = txt;
}

function renderFeatures(items) {
    const c = document.getElementById('features-grid');
    c.innerHTML = '';
    items.forEach(f => {
        const el = document.createElement('article');
        el.className = 'feature-card';
        el.setAttribute('role', 'listitem');
        el.innerHTML = `
            <span class="icon" aria-hidden="true"><i class="${escapeAttr(f.icon || 'fas fa-star')}"></i></span>
            <h3>${escapeHtml(f.title)}</h3>
            <p>${escapeHtml(f.desc)}</p>
        `;
        el.addEventListener('pointermove', e => {
            const r = el.getBoundingClientRect();
            el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
            el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
        });
        c.appendChild(el);
    });
}

function renderServices(items) {
    const c = document.getElementById('service-stack');
    c.innerHTML = '';
    items.forEach((s, i) => {
        const el = document.createElement('article');
        el.className = 'service-card';
        el.style.zIndex = String(i + 1);
        el.innerHTML = `
            <div>
                <div class="num">0${i + 1} · Service</div>
                <h3>${escapeHtml(s.title)}</h3>
                <p class="desc">${escapeHtml(s.desc)}</p>
                ${s.price ? `<span class="price">${escapeHtml(s.price)}</span>` : ''}
            </div>
            <div class="image" role="img" aria-label="${escapeAttr(s.title)}" style="background-image:url('${escapeAttr(s.image || '')}')"></div>
        `;
        c.appendChild(el);
    });
}

function renderStats(cfg) {
    const c = document.getElementById('stats-grid');
    c.innerHTML = '';
    const stats = [];
    if (cfg.trust_signals && cfg.trust_signals.rating) stats.push({ value: cfg.trust_signals.rating + '★', label: 'Google rating' });
    if (cfg.trust_signals && cfg.trust_signals.review_count) stats.push({ value: cfg.trust_signals.review_count, label: 'Happy clients' });
    if (cfg.services && cfg.services.length) stats.push({ value: cfg.services.length, label: 'Services offered' });
    stats.push({ value: '48h', label: 'Typical turnaround' });
    stats.forEach(s => {
        const el = document.createElement('div');
        el.className = 'stat';
        el.innerHTML = `<div class="value">${escapeHtml(String(s.value))}</div><span class="label">${escapeHtml(s.label)}</span>`;
        c.appendChild(el);
    });
}

function renderReviews(items) {
    const c = document.getElementById('reviews-grid');
    c.innerHTML = '';
    items.forEach(r => {
        const el = document.createElement('figure');
        el.className = 'review-card';
        const stars = '<i class="fas fa-star"></i>'.repeat(Math.max(1, Math.min(5, parseInt(r.stars, 10) || 5)));
        el.innerHTML = `
            <span class="stars" role="img" aria-label="${r.stars || 5} out of 5 stars">${stars}</span>
            <blockquote>“${escapeHtml(r.text)}”</blockquote>
            <figcaption><cite>— ${escapeHtml(r.name)}</cite></figcaption>
        `;
        c.appendChild(el);
    });
}

function renderGallery(urls, brand) {
    const c = document.getElementById('gallery-grid');
    c.innerHTML = '';
    urls.forEach((url, i) => {
        const el = document.createElement('figure');
        el.className = 'gallery-item';
        el.innerHTML = `<img src="${escapeAttr(url)}" alt="${escapeAttr(brand)} — work sample ${i + 1}" loading="lazy" decoding="async">`;
        c.appendChild(el);
    });
}

function renderFAQ(items) {
    const c = document.getElementById('faq-grid');
    c.innerHTML = '';
    items.forEach(q => {
        const el = document.createElement('details');
        el.className = 'faq-item';
        el.innerHTML = `
            <summary class="faq-question"><h3>${escapeHtml(q.question)}</h3><i class="fas fa-chevron-down chevron" aria-hidden="true"></i></summary>
            <div class="faq-answer">${escapeHtml(q.answer)}</div>
        `;
        c.appendChild(el);
    });
}

function renderMarquee(cfg) {
    const row = document.getElementById('marquee-row');
    const words = [];
    (cfg.services || []).forEach(s => words.push(s.title));
    words.push(cfg.branding.name);
    if (cfg.trust_signals && cfg.trust_signals.rating) words.push('Rated ' + cfg.trust_signals.rating + '★');
    words.push('Austin');
    words.push('Mobile');

    // duplicate content 3× for seamless loop
    const block = words.map(w => `<span class="marquee-item">${escapeHtml(w)}<span class="dot" aria-hidden="true"></span></span>`).join('');
    row.innerHTML = block + block + block;
}

/* ─── Behaviors (post-config) ─── */

function initBehaviors() {
    // Navbar scroll state
    const nav = document.querySelector('.navbar');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 24);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Hamburger
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const open = mobileMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', String(open));
            mobileMenu.toggleAttribute('hidden', !open);
            hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        });
        mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('hidden', '');
        }));
    }

    // Marquee infinite scroll via GSAP
    const row = document.getElementById('marquee-row');
    if (row && window.gsap) {
        // measure one-third (because we tripled)
        requestAnimationFrame(() => {
            const distance = row.scrollWidth / 3;
            gsap.to(row, {
                x: -distance,
                duration: 28,
                ease: 'none',
                repeat: -1,
                modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % -distance) }
            });
        });
    }

    // Reveal sections on scroll (gentle)
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.section-header, .feature-card, .review-card, .gallery-item').forEach(el => {
            gsap.from(el, {
                opacity: 0,
                y: 28,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            });
        });
    }

    // Hero video — scroll-scrub the last ~3 seconds
    initScrollScrubVideo();
}

function initScrollScrubVideo() {
    const video = document.getElementById('hero-video');
    const hero = document.querySelector('.hero');
    if (!video || !hero) return;

    // Respect reduced motion — show poster/first-frame, no scrub
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Skip on very narrow screens / data-saver to preserve battery & bandwidth
    const saveData = navigator.connection && navigator.connection.saveData;
    if (saveData) return;

    video.pause();

    const SCRUB_SECONDS = 3; // used only when the source is a long clip; local hero-scrub.mp4 is already trimmed

    const setup = () => {
        const dur = video.duration;
        if (!dur || isNaN(dur) || !isFinite(dur)) return;

        // If source is a pre-trimmed clip (≤ ~5s), scrub full length. Otherwise use last N seconds.
        const isPreTrimmed = dur <= 5;
        const startTime = isPreTrimmed ? 0 : Math.max(0, dur - SCRUB_SECONDS);
        const endTime = dur - 0.05; // avoid the absolute end (some browsers snap)

        // Park the video at the first frame of our window
        try { video.currentTime = startTime; } catch (_) { /* iOS race */ }

        // Nudge a play/pause so iOS Safari allows currentTime writes afterward
        const nudge = video.play();
        if (nudge && typeof nudge.then === 'function') {
            nudge.then(() => video.pause()).catch(() => {});
        } else {
            video.pause();
        }

        if (!window.gsap || !window.ScrollTrigger) return;

        // Smooth lerp loop: scroll sets a TARGET, RAF interpolates video.currentTime toward it
        // This decouples wheel jitter from video seeks and yields glassy motion with all-keyframe MP4s
        const state = { target: startTime, current: startTime };
        video.currentTime = startTime;

        gsap.to(state, {
            target: endTime,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.15,
                invalidateOnRefresh: true,
            },
        });

        // Independent RAF lerp — smooths between GSAP updates at display refresh rate
        const LERP = 0.22; // 0..1 — higher = snappier, lower = creamier
        const MIN_DELTA = 0.003;
        let rafId;
        const tick = () => {
            state.current += (state.target - state.current) * LERP;
            if (Math.abs(video.currentTime - state.current) > MIN_DELTA) {
                try { video.currentTime = state.current; } catch (_) {}
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        // Pause the RAF when hero is fully off-screen to save cycles
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver(([e]) => {
                if (e.isIntersecting && !rafId) {
                    rafId = requestAnimationFrame(tick);
                } else if (!e.isIntersecting && rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = 0;
                }
            }, { threshold: 0 });
            io.observe(hero);
        }
    };

    if (video.readyState >= 1 /* HAVE_METADATA */) {
        setup();
    } else {
        video.addEventListener('loadedmetadata', setup, { once: true });
    }
}

/* ─── helpers ─── */
function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function escapeAttr(s) {
    return String(s ?? '').replace(/"/g, '&quot;');
}
