document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".before img, .after img");
  let currentIndex = 0;

  // Create the lightbox container
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  const img = document.createElement("img");
  lightbox.appendChild(img);

  // Create navigation arrows
  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  prevBtn.className = "lightbox-arrow prev";
  nextBtn.className = "lightbox-arrow next";
  prevBtn.innerHTML = "&#10094;"; // Left arrow (‹)
  nextBtn.innerHTML = "&#10095;"; // Right arrow (›)
  lightbox.appendChild(prevBtn);
  lightbox.appendChild(nextBtn);

  // Function to show image
  function showImage(index) {
    const selected = images[index];
    if (!selected) return;
    img.src = selected.src;
    img.alt = selected.alt || "";
  }

  // Click event to open lightbox
  images.forEach((image, index) => {
    image.addEventListener("click", () => {
      currentIndex = index;
      lightbox.classList.add("active");
      showImage(currentIndex);
    });
  });

  // Navigation
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent closing
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  // Close lightbox when clicking outside image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    } else if (e.key === "Escape") {
      lightbox.classList.remove("active");
    }
  });

  // Touch swipe support (mobile)
  let startX = 0;
  lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      // Swipe left
      if (diff > 0) {
        currentIndex = (currentIndex + 1) % images.length;
      } else {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      }
      showImage(currentIndex);
    }
  });
});
