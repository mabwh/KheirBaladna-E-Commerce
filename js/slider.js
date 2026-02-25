let currentSlide = 1;
const totalSlides = 3;
let autoPlayInterval;

function updateSlider() {
  const img = document.getElementById('sliderImage');
  
  img.classList.add('fade-out');
  
  setTimeout(() => {
    img.src = `img/Slider/Slide${currentSlide}-full.png`;
    document.getElementById('slideCounter').textContent = `${currentSlide} / ${totalSlides}`;
    
    img.classList.remove('fade-out');
  }, 250); 
}

function nextSlide() {
  currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
  updateSlider();
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

function prevSlide() {
  currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
  updateSlider();
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 3000); // Change every 3 seconds
}

// Reference to buttons
const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');

if (prevBtn) {
  prevBtn.addEventListener('click', prevSlide);
}

if (nextBtn) {
  nextBtn.addEventListener('click', nextSlide);
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  updateSlider();
  startAutoPlay();
});

// Fallback if script runs after DOM is loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  updateSlider();
  startAutoPlay();
}

window.nextSlide = nextSlide;
window.prevSlide = prevSlide;