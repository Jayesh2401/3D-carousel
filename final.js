function initializeSlider(
  containerSelector,
  nextButtonSelector,
  prevButtonSelector
) {
  const container = document.querySelector(containerSelector);
  const carousel = container.querySelector(".container");
  const nextButton = container.querySelector(nextButtonSelector);
  const prevButton = container.querySelector(prevButtonSelector);
  const elems = container.getElementsByClassName("pics");
  let detectDirection = true;

  const slider = document.querySelector(".container");
  firstImg = document.querySelectorAll("img")[0];
  var screenWidth = window.innerWidth || document.documentElement.clientWidth;
  var clickCount = 0;
  var isButtonDisabled = false;
  let isDown = false;
  let startX, x;
  let scrollLeft;
  var step = calculateStep();
  let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;
  var autoSlideInterval;

  function startAutoSlide() {
    if (window.innerWidth > 1200) {
      if(detectDirection){
        autoSlideInterval = setInterval(n, 2500);
      }else{
        autoSlideInterval = setInterval(p, 2500);
      }
    }
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  startAutoSlide();
  window.addEventListener("resize", function () {
    stopAutoSlide();
    handleScreenResize();
    startAutoSlide();
  });

  window.onload = function () {
    handleScreenResize();
    step = calculateStep();
  };

  const autoSlide = () => {
    if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
      return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = step - 20;
    let valDifference = firstImgWidth - positionDiff;
    if (carousel.scrollLeft > prevScrollLeft) {
      return n();
    }
    p();
  };

  const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");


    const newX = e.pageX || e.touches[0].pageX;
    const dragDistance = newX - startX;
    carousel.scrollLeft = scrollLeft - dragDistance;

    positionDiff = newX - prevPageX;

    if (positionDiff < -step / 4) {
      return n();
    } else if (positionDiff > step / 4) {
      p();
    }
  };
  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;
    // autoSlide();
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("touchstart", dragStart);

  carousel.addEventListener("mousemove", dragging);
  carousel.addEventListener("touchmove", dragging);

  carousel.addEventListener("mouseup", dragStop);
  carousel.addEventListener("mouseleave", dragStop);
  carousel.addEventListener("touchend", dragStop);

  function handleScreenResize() {
    clickCount = 0;
    if (window.innerWidth < 1200) {
      screenWidth = window.innerWidth || document.documentElement.clientWidth;
      updateTransformX();
      step = calculateStep();
    } else {
      for (var i = 0; i < elems.length; i++) {
        elems[i].style.transform = "";
        elems[i].style.transitionDuration = "";
        elems[i].style.zIndex = "";
        elems[i].style.width = "";
      }
    }
  }

  function calculateStep() {
    if (window.innerWidth < 380) {
      return 280;
    } else if (window.innerWidth < 768) {
      return 320;
    } else if (window.innerWidth < 1020) {
      return 400;
    } else {
      return 500;
    }
  }

  function updateTransformX() {
    var transformX = 10;
    for (var i = 0; i < elems.length; i++) {
      elems[i].style.transitionProperty = "transform";
      elems[i].style.transitionTimingFunction = "ease";
      elems[i].style.transform = `translateX(${transformX}px) `;
      elems[i].style.width = `${step - 20}px`;
      transformX += step;
      // transformX += step + 10;
    }
  }

  nextButton.addEventListener("click", n);
  prevButton.addEventListener("click", p);

  function n() {
    isDragStart = false;
    let clickLimit;
      detectDirection = true


    if (window.innerWidth <= 540) {
      clickLimit = elems.length - 1;
    } else if (window.innerWidth <= 1200) {
      clickLimit = elems.length - 2;
    } else {
      clickLimit = Infinity;
    }

    if (window.innerWidth < 1200 && !isButtonDisabled) {
      isButtonDisabled = true;
      setTimeout(function () {
        isButtonDisabled = false;
      }, 600);

      if (clickCount < clickLimit) {
        for (var i = elems.length - 1; i > 0; i--) {
          elems[i].style.transform = elems[i - 1].style.transform;
        }
        elems[0].style.transform = `translateX(${-step}px)`;
        clickCount++;
      }
    } else if (!isButtonDisabled) {
      isButtonDisabled = true;
      setTimeout(function () {
        isButtonDisabled = false;
      }, 600);
      var lastClassName = elems[elems.length - 1].className;
      for (var i = elems.length - 1; i > 0; i--) {
        elems[i].className = elems[i - 1].className;
      }
      elems[0].className = lastClassName;
    }

        stopAutoSlide();
    startAutoSlide();
  }

  function p() {
    isDragStart = false;
      detectDirection = false

    if (window.innerWidth < 1200 && !isButtonDisabled) {
      isButtonDisabled = true;
      setTimeout(function () {
        isButtonDisabled = false;
      }, 600);

      if (clickCount > 0) {
        for (var i = 0; i < elems.length - 1; i++) {
          elems[i].style.transform = elems[i + 1].style.transform;
        }
        elems[8].style.transform = `translateX(${
          step * (elems.length - clickCount)
        }px)`;

        if (clickCount === 1) {
          elems[0].style.transform = `translateX(${0}px)`;
        }
        clickCount--;
      }
    } else if (!isButtonDisabled) {
      isButtonDisabled = true;
      setTimeout(function () {
        isButtonDisabled = false;
      }, 600);
      var firstClassName = elems[0].className;
      for (var i = 0; i < elems.length - 1; i++) {
        elems[i].className = elems[i + 1].className;
      }
      elems[elems.length - 1].className = firstClassName;
    }
      stopAutoSlide();
    startAutoSlide();

  }
  return {
    startAutoSlide,
    stopAutoSlide,
    handleScreenResize,
    n,
    p,
  };
}

const slider1 = initializeSlider(".slider-container1", ".next1", ".prev1");

window.addEventListener("resize", function () {
  slider1.handleScreenResize();
});
window.onload = function () {
  slider1.handleScreenResize();
};
