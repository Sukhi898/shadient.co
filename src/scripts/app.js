let locoScroll;
function initLocomotiveScroll() {
  if (!document.querySelector("#app")) return;

  gsap.registerPlugin(ScrollTrigger);

  locoScroll = new LocomotiveScroll({
    el: document.querySelector("#app"),
    smooth: true,
    lerp: 0.07,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#app", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#app").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

function initSwiper() {
  const swiper = document.querySelector("#testimonials");
  if (!swiper) return;

  new Swiper("#testimonials", {
    slidesPerView: 4,
    spaceBetween: 24,
    autoHeight: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    navigation: { prevEl: "#prev-button", nextEl: "#next-button" },
    breakpoints: {
      1024: { slidesPerView: 4, spaceBetween: 24 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      480: { slidesPerView: 1, spaceBetween: 10 },
      320: { slidesPerView: 1, spaceBetween: 10 },
    },
  });
}

function handleMobileMenu() {
  const mobileMenuItems = document.querySelectorAll("#mobile-menus .menu li");
  const hamburger = document.querySelector("#hamburger");
  const goToTop = document.querySelector("#goto_top");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      document.body.classList.toggle("mobile-menu-active");
    });
  }

  mobileMenuItems.forEach((menuItem) => {
    const anchor = menuItem.querySelector("a");
    if (anchor) {
      anchor.addEventListener("click", () => hamburger.click());
    }
  });

  if (goToTop && locoScroll) {
    goToTop.addEventListener("click", () => locoScroll.scrollTo(0, 0, 0));
  }
}

function runGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  let tl = gsap.timeline();

  tl.from("#logo", {
    opacity: 0,
    y: -50,
    ease: "elastic",
  });
  tl.from(
    "#menus > .nav-item",
    {
      opacity: 0,
      y: -50,
      stagger: 0.4,
      ease: "power2.out",
    },
    "-=0.2"
  );

  const graphicsAnimProps = {
    opacity: 0,
    scale: 1,
    ease: "slow",
  };
  tl.from("#graphics-top-right", graphicsAnimProps);
  tl.from("#graphics-bottom-left", graphicsAnimProps);

  if (document.querySelector("#hero-contents")) {
    tl.from("#hero-contents", {
      opacity: 0,
      y: "100%",
      scale: 0,
      rotate: -45,
      transformOrigin: "bottom right",
      duration: 2,
      ease: "slow",
    });
  }
  if (document.querySelector("hero-contents form")) {
    tl.from(
      "#hero-contents form",
      {
        opacity: 0,
        y: 100,
      },
      "-=1"
    );
  }

  const scrollAnimProps = {
    opacity: 0,
    duration: 1,
    ease: "power1.out",
  };

  const scrollAnim = (triggerElement, targetElements, options = {}) => {
    if (document.querySelector(triggerElement)) {
      gsap.from(targetElements, {
        scrollTrigger: {
          trigger: triggerElement,
          scroller: "#app",
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
          ...options,
        },
        ...scrollAnimProps,
        stagger: { amount: 1, from: "start" },
      });
    }
  };

  scrollAnim("#services", [
    "#services .section-intro > h2",
    "#services .section-intro > p",
    "#services .service",
  ]);

  scrollAnim("#works", "#works #projects");

  const whyChooseUsAnim = () => {
    if (document.querySelector("#why-choose-us")) {
      gsap.from("#why-choose-us #image", {
        scrollTrigger: {
          trigger: "#why-choose-us",
          scroller: "#app",
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
        },
        opacity: 0,
        x: -200,
        y: -200,
        duration: 1,
        ease: "power1.out",
      });

      gsap.from(
        [
          "#why-choose-us #details h2",
          "#why-choose-us #details p",
          "#why-choose-us #details button",
        ],
        {
          scrollTrigger: {
            trigger: "#why-choose-us",
            scroller: "#app",
            start: "top 20%",
            end: "bottom 80%",
            scrub: true,
          },
          opacity: 0,
          x: 200,
          y: 200,
          ease: "power1.out",
        }
      );
    }
  };
  whyChooseUsAnim();

  const aboutServicesHeroAnim = () => {
    const bannerDetails = document.querySelector("#banner-details");
    if (bannerDetails) {
      const elements = [
        bannerDetails.querySelector("#subtitle"),
        bannerDetails.querySelector("#title"),
        bannerDetails.querySelector("#description"),
        bannerDetails.querySelector("#cta"),
      ];
      if (elements.every((element) => element)) {
        gsap.from(elements, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power1.out",
          stagger: 0.3,
        });
      }
    }
  };
  aboutServicesHeroAnim();

  const aboutServicesAnim = () => {
    if (document.querySelector("#about")) {
      gsap.from(["#about .group", "#about #cta"], {
        scrollTrigger: {
          trigger: "#about",
          scroller: "#app",
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
        },
        opacity: 0,
        y: 100,
        ease: "slow",
        stagger: { amount: 1, from: "start", ease: "power1.out" },
      });
    }
  };
  aboutServicesAnim();

  const sampleWorksAnim = () => {
    if (document.querySelector("#sample_works_container")) {
      gsap.from("#sample_works_container article", {
        scrollTrigger: {
          trigger: "#sample_works",
          scroller: "#app",
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
        },
        opacity: 0,
        y: 50,
        ease: "slow",
        stagger: { amount: 1, from: "start", ease: "power1.out" },
      });
    }
  };
  sampleWorksAnim();
}

document.addEventListener("DOMContentLoaded", () => {
  initLocomotiveScroll();
  initSwiper();
  handleMobileMenu();
  runGSAPAnimations();
});
