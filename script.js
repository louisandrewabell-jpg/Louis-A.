console.log("Gallery loaded.");
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-item img");

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
