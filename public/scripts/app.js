(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.registerListeners();
    },
    cacheElements() {
      this.$arrowBtn = document.querySelector(".arrow-btn");
      this.$review = document.querySelector(".function__item--bottom");
    },
    registerListeners() {
      if(this.$arrowBtn) {
        this.$arrowBtn.addEventListener("click", (ev) => {
          if (this.$review.classList.contains("show-review")) {
            this.$review.classList.remove("show-review");
            this.$arrowBtn.classList.remove("rotate-btn");
          } else {
            this.$review.classList.add("show-review");
            this.$arrowBtn.classList.add("rotate-btn");
          }
          console.log("click");
        });
      }
    },
  };
  app.initialize();
})();
