let currentSlide = 0;
const transitionTime = 10000 //10 seconds

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-image');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Optional: Automatically switch to the next slide every 5 seconds
setInterval(nextSlide, transitionTime);

// Initialize the carousel by showing the first slide
showSlide(currentSlide);
