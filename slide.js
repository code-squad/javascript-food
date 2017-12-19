(function () {
    'use strict';

    const slidesPrev = qs('.slides_prev');
    const slidesNext = qs('.slides_next');
    const slides = qsa('.main_slides_list > li');
    const dots = qsa('.slides_dots > li > a');

    const slidesEnd = slides.length - 1;
    let slideIndex = 0;

    function setView() {
        showSlides(slideIndex);
        $on(slidesPrev, 'click', () => moveSlides(-1));
        $on(slidesNext, 'click', () => moveSlides(1));
        $delegate('.slides_dots', '.slides_dots > li > a', 'click', (e) => currentSlide(+e.delegateTarget.textContent));
    }

    function removeCurrentDisplay() {
        const currentIndex = slideIndex;
        slides[currentIndex].className = 'fadeout';
        setTimeout(() => {
            slides[currentIndex].style.display = 'none';
        }, 1000);
        dots[currentIndex].classList.remove("now");
    }

    function moveSlides(n) {
        removeCurrentDisplay();
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        removeCurrentDisplay();
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        if (n > slidesEnd) slideIndex = 0;
        if (n < 0) slideIndex = slidesEnd;

        slides[slideIndex].style.display = 'block';
        slides[slideIndex].className = 'fadein';
        slides[slideIndex].style.backgroundImage = `url('img/bng${slideIndex}.jpg')`;
        dots[slideIndex].className = "now";
    }

    $on(window, 'load', setView);
})();