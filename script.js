//toggle dark mode
const btn = document.getElementById("theme-toggle");

btn.addEventListener('click', () => {
  document.body.classList.toggle("dark-mode");
});

// Carousel functionality
const track = document.getElementById('track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Calculate how much to scroll based on card width
const scrollAmount = 220; // Card width + gap

nextBtn.addEventListener('click', () => {
  track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
  track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  
});

