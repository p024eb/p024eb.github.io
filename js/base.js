// Accordion ///////////////
(function () {
  class Accordion {
    constructor(el) {
      this.el = el;
      this.summary = el.querySelector("summary");
      this.content = el.querySelector(".content");

      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.summary.addEventListener("click", (e) => this.onClick(e));
    }

    onClick(e) {
      e.preventDefault();
      this.el.style.overflow = "hidden";
      if (this.isClosing || !this.el.open) {
        this.open();
      } else if (this.isExpanding || this.el.open) {
        this.shrink();
      }
    }

    shrink() {
      this.isClosing = true;
      const startHeight = `${this.el.offsetHeight - 20}px`;
      const endHeight = `${this.summary.offsetHeight + 20}px`;

      if (this.animation) {
        this.animation.cancel();
      }
      this.animation = this.el.animate(
        {
          height: [startHeight, endHeight],
        },
        {
          duration: 300,
          easing: "ease-in-out",
        }
      );

      this.animation.onfinish = () => this.onAnimationFinish(false);
      this.animation.oncancel = () => (this.isClosing = false);
    }

    open() {
      this.el.style.height = `${this.el.offsetHeight}px`;
      this.el.open = true;
      window.requestAnimationFrame(() => this.expand());
    }

    expand() {
      this.isExpanding = true;
      const startHeight = `${this.el.offsetHeight + 20}px`;
      const endHeight = `${
        this.summary.offsetHeight + this.content.offsetHeight + 20
      }px`;

      if (this.animation) {
        this.animation.cancel();
      }

      this.animation = this.el.animate(
        {
          height: [startHeight, endHeight],
        },
        {
          duration: 300,
          easing: "ease-in-out",
        }
      );
      this.animation.onfinish = () => this.onAnimationFinish(true);
      this.animation.oncancel = () => (this.isExpanding = false);
    }

    onAnimationFinish(open) {
      this.el.open = open;
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.el.style.height = this.el.style.overflow = "";
    }
  }

  document.querySelectorAll("details").forEach((el) => {
    new Accordion(el);
  });
})();

// Get year for copyright ///////////////
(function () {
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const setTargetYear = document.querySelector(".nowDateYear");
  setTargetYear.textContent = nowYear;
})();

// Go to Top ///////////////
(function () {
  const pagetop_btn = document.querySelector(".pagetop");
  if (pagetop_btn !== null) {
    pagetop_btn.addEventListener("click", scroll_top);
  }
  function scroll_top() {
    window.scroll({ top: 0, behavior: "smooth" });
  }
})();
(function () {
  window.addEventListener("scroll", scroll_event);
  function scroll_event() {
    const pagetop_btn = document.querySelector(".pagetop");
    if (window.pageYOffset > 100) {
      pagetop_btn.style.opacity = "1";
    } else if (window.pageYOffset < 100) {
      pagetop_btn.style.opacity = "0";
    }
  }
})();

// Tab Gallery ///////////////
(function () {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      const tabTargetList = [
        "tabContents0",
        "tabContents1",
        "tabContents2",
        "tabContents3",
      ];

      for (let i = 0; i < tabTargetList.length; i++) {
        if (document.getElementById(tabTargetList[i]) != null) {
          let tabMenus = document
            .getElementById(tabTargetList[i])
            .getElementsByClassName("tabMenuItem");
          let tabContents = document
            .getElementById(tabTargetList[i])
            .getElementsByClassName("tabContents");

          for (let i = 0; i < tabMenus.length; i++) {
            tabMenus[i].addEventListener(
              "click",
              function () {
                for (let j = 0; j < tabMenus.length; j++) {
                  tabMenus[j].classList.remove("active");
                  tabContents[j].classList.remove("active");
                }
                this.classList.add("active");
                tabContents[i].classList.add("active");
              },
              false
            );
          }
        }
      }
    },
    false
  );
})();

// Mobile Menu Toggle ///////////////
(function () {
  const navMenuBotton = document.querySelector(".headerNavMenu");
  const headerNavList = document.querySelector(".headerNavList");
  const navMenuBottonWrap = document.querySelector(".headerNavMenuWrap");

  navMenuBotton.addEventListener("click", toggle_open);
  function toggle_open() {
    let checkStatus = headerNavList.classList.contains("active");
    if (checkStatus === false) {
      headerNavList.classList.add("active");
      navMenuBottonWrap.classList.add("active");
    } else {
      headerNavList.classList.remove("active");
      navMenuBottonWrap.classList.remove("active");
    }
  }
})();
