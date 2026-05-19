console.log("Gallery loaded.");

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-item img");
  const galleryLinks = Array.from(document.querySelectorAll(".gallery-item a"));
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");
  const prevButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");
  let currentIndex = 0;

  const slides = galleryLinks.map(link => ({
    src: link.href,
    alt: link.querySelector("img")?.alt || ""
  }));

  const setLightboxImage = (index) => {
    currentIndex = index;
    const slide = slides[currentIndex];
    lightboxImage.src = slide.src;
    lightboxImage.alt = slide.alt;
  };

  const openLightbox = (index) => {
    setLightboxImage(index);
    lightbox.classList.add("visible");
    lightbox.setAttribute("aria-hidden", "false");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("visible");
    lightbox.setAttribute("aria-hidden", "true");
  };

  const showSlide = (direction) => {
    const nextIndex = (currentIndex + direction + slides.length) % slides.length;
    setLightboxImage(nextIndex);
  };

  galleryLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(index);
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", () => showSlide(-1));
  nextButton.addEventListener("click", () => showSlide(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("visible")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }
    if (event.key === "ArrowLeft") {
      showSlide(-1);
    }
    if (event.key === "ArrowRight") {
      showSlide(1);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  images.forEach(img => observer.observe(img));
});
