document.addEventListener("DOMContentLoaded", () => {
  const dropdownButton = document.querySelector(".dropdown-button");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (dropdownButton && dropdownContent) {
    dropdownButton.addEventListener("click", () => {
      dropdownContent.classList.toggle("show");

      dropdownButton.textContent = dropdownContent.classList.contains("show")
        ? "Menu ▲"
        : "Menu ▼";
    });

    window.addEventListener("click", (e) => {
      if (
        !dropdownButton.contains(e.target) &&
        !dropdownContent.contains(e.target)
      ) {
        if (dropdownContent.classList.contains("show")) {
          dropdownContent.classList.remove("show");
          dropdownButton.textContent = "Menu ▼";
        }
      }
    });
  }

  const carouselContainer = document.querySelector(".carousel-container");
  const carouselTrack = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");
  const carouselItems = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;
  const totalItems = carouselItems.length;

  const indicatorsContainer = document.createElement("div");
  indicatorsContainer.classList.add("carousel-indicators");
  carouselContainer.appendChild(indicatorsContainer);

  for (let i = 0; i < totalItems; i++) {
    const indicator = document.createElement("button");
    indicator.classList.add("indicator-button");
    indicator.dataset.index = i;
    indicatorsContainer.appendChild(indicator);

    indicator.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
  }

  const indicatorButtons = document.querySelectorAll(".indicator-button");

  const updateCarousel = () => {
    if (carouselItems.length === 0) return;

    const itemWidth = carouselItems[0].offsetWidth;
    carouselTrack.style.transform = `translateX(-${
      currentIndex * itemWidth
    }px)`;

    indicatorButtons.forEach((btn, index) => {
      if (index === currentIndex) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (prevButton) {
      if (currentIndex === 0) {
        prevButton.classList.add("hidden");
      } else {
        prevButton.classList.remove("hidden");
      }
    }

    if (nextButton) {
      if (currentIndex === totalItems - 1) {
        nextButton.classList.add("hidden");
      } else {
        nextButton.classList.remove("hidden");
      }
    }
  };

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
  }

  window.addEventListener("resize", () => {
    updateCarousel();
  });

  updateCarousel();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });

      if (dropdownContent && dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
        dropdownButton.textContent = "Menu ▼";
      }
    });
  });

  const logo = document.querySelector(".navbar .logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});
