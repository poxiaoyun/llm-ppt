/* =========================================
   Enterprise Tech PPT Starter Navigation
   翻页、路由、进度条与水印控制
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const slideList = Array.from(slides);
    const totalSlides = slides.length;

    if (!totalSlides) {
        return;
    }

    let currentSlideIndex = 0;
    let lastWheelNavigationAt = 0;
    let isSyncingHash = false;

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const prevZone = document.querySelector('.nav-prev-zone');
    const nextZone = document.querySelector('.nav-next-zone');
    const progressBar = document.getElementById('progress-bar');
    const pageCounter = document.getElementById('current-page');
    const totalPages = document.getElementById('total-pages');
    const slideTitle = document.getElementById('slide-title');
    const globalWatermark = document.getElementById('global-watermark');

    if (totalPages) {
        totalPages.textContent = String(totalSlides);
    }

    function updateSlide(index) {
        let safeIndex = index;

        if (safeIndex < 0) safeIndex = 0;
        if (safeIndex >= totalSlides) safeIndex = totalSlides - 1;

        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'past');
            if (i < safeIndex) {
                slide.classList.add('past');
            }
        });

        slides[safeIndex].classList.add('active');
        currentSlideIndex = safeIndex;

        if (globalWatermark) {
            const shouldShow = !slides[safeIndex].classList.contains('no-watermark');
            globalWatermark.classList.toggle('show', shouldShow);
            globalWatermark.classList.toggle('on-dark', slides[safeIndex].classList.contains('theme-dark'));
        }

        if (pageCounter) {
            pageCounter.textContent = String(safeIndex + 1);
        }

        if (progressBar) {
            progressBar.style.width = `${((safeIndex + 1) / totalSlides) * 100}%`;
        }

        if (slideTitle) {
            slideTitle.textContent = slides[safeIndex].getAttribute('data-title') || `Slide ${safeIndex + 1}`;
        }

        const currentSlideId = slides[safeIndex].id;
        const targetHash = currentSlideId ? `#${currentSlideId}` : `#slide-${safeIndex + 1}`;

        if (window.location.hash !== targetHash) {
            isSyncingHash = true;
            window.history.replaceState(null, '', targetHash);
            window.setTimeout(() => {
                isSyncingHash = false;
            }, 0);
        }

        window.scrollTo(0, 0);
    }

    function nextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            updateSlide(currentSlideIndex + 1);
        }
    }

    function prevSlide() {
        if (currentSlideIndex > 0) {
            updateSlide(currentSlideIndex - 1);
        }
    }

    function initFromHash() {
        window.scrollTo(0, 0);

        if (window.location.hash) {
            const targetId = window.location.hash.replace(/^#/, '');
            const targetIndex = slideList.findIndex((slide) => slide.id === targetId);

            if (targetIndex >= 0 && targetIndex < totalSlides) {
                updateSlide(targetIndex);
                return;
            }

            const match = targetId.match(/slide-(\d+)/);
            if (match && match[1]) {
                const fallbackIndex = parseInt(match[1], 10) - 1;
                if (fallbackIndex >= 0 && fallbackIndex < totalSlides) {
                    updateSlide(fallbackIndex);
                    return;
                }
            }
        }

        updateSlide(0);
    }

    if (btnNext) {
        btnNext.addEventListener('click', nextSlide);
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', prevSlide);
    }

    if (nextZone) {
        nextZone.addEventListener('click', nextSlide);
    }

    if (prevZone) {
        prevZone.addEventListener('click', prevSlide);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
            nextSlide();
            return;
        }

        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'PageUp') {
            prevSlide();
        }
    });

    document.addEventListener('wheel', (event) => {
        const deltaY = event.deltaY;
        const threshold = 60;
        const cooldown = 650;

        if (event.ctrlKey || Math.abs(deltaY) < threshold) {
            return;
        }

        const now = Date.now();
        if (now - lastWheelNavigationAt < cooldown) {
            event.preventDefault();
            return;
        }

        lastWheelNavigationAt = now;
        event.preventDefault();

        if (deltaY > 0) {
            nextSlide();
            return;
        }

        prevSlide();
    }, { passive: false });

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;

        if (touchEndX < touchStartX - 50) {
            nextSlide();
            return;
        }

        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    });

    window.addEventListener('hashchange', () => {
        if (isSyncingHash) {
            window.scrollTo(0, 0);
            return;
        }

        initFromHash();
    });

    initFromHash();
});
