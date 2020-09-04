// Your code goes here

/*************************************
 * Declaring/Assigning variables
 *************************************/

// Body selector
const body = document.querySelector("body");

// Header selector
const header = document.querySelector("header");

// Get intro section
const introSection = document.querySelector(".intro");

// Get intro section img
const introSectionImg = document.querySelector(".intro img");

// Get first and second main content text sections
const contentSection = document.querySelector(".content-section .text-content");
const inverseContentSection = document.querySelector(".inverse-content .text-content");

// Get first and second main content sections imgs
const contentSectionImg = document.querySelector(".content-section .img-content");
const inverseContentSectionImg = document.querySelector(".inverse-content .img-content");

// Smoothing variables
let fadeInVal = 0;
let fadeInVal2 = 0;
let bringInVal = 100;

// Use for interval functions
let fadeInContent;
let bringInContent;
let bringInContentTriggered = false;

/*************************************
 * Setting initial styles
 *************************************/

// Ensure the header has a high z-index
header.style.zIndex = 100;

// Ensure the body does not create a horizontal scrollbar
body.style.overflowX = "hidden";

// Setting opacity of elements to 0
introSection.style.opacity = fadeInVal;
contentSection.style.opacity = fadeInVal;
contentSectionImg.style.opacity = fadeInVal2;
inverseContentSection.style.opacity = fadeInVal;
inverseContentSectionImg.style.opacity = fadeInVal2;

// Setting up element that will come from left
contentSectionImg.style.transform = `translateX(-${bringInVal}vw)`;

// Setting up element that will come from right
inverseContentSectionImg.style.transform = `translateX(${bringInVal}vw)`;

/*************************************
 * Using mouseover/mouseleave event
 *************************************/

// Used on middle images
const contentImgs = document.querySelectorAll(".content-section .img-content img");

contentImgs.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    element.style.transform = "scale(1.2) rotate(10deg)";
    element.style.transition = "all 0.3s";
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "scale(1)";
  });
});

/*************************************
 * Using keydown event
 *************************************/

// Ensure user use scroll wheel
window.addEventListener("keydown", (event) => {});

/*************************************
 * Using wheel event
 *************************************/

// Used on the header bus img
body.addEventListener("wheel", (event) => {
  // Get direction of where the scroll wheel is going
  const getDirection = event.deltaY * -0.01;
  let moveImg;

  if (getDirection === -1) {
    moveImg = "50";
  } else {
    moveImg = "0";
  }

  introSectionImg.style.opacity = getDirection;
  introSectionImg.style.transform = `translateX(${moveImg}px)`;
  introSectionImg.style.transition = "all 0.3s";
});

/*************************************
 * Using load event
 *************************************/

// Load content in
window.addEventListener("load", (event) => {
  fadeInContent = setInterval(loadContent, 50);
});

function loadContent() {
  // slowly increase opacity value
  if (fadeInVal < 1) {
    fadeInVal += 0.1;
  } else {
    fadeInVal = 1;
  }

  // Fade in the intro content
  introSection.style.opacity = fadeInVal;
  introSection.style.transition = "all 0.3s";

  // Fade in other content
  contentSection.style.opacity = fadeInVal;
  contentSection.style.transition = "all 0.3s";
  inverseContentSection.style.opacity = fadeInVal;
  inverseContentSection.style.transition = "all 0.3s";

  if (fadeInVal === 1) {
    clearInterval(fadeInContent);
  }
}

/*************************************
 * Using scroll event
 *************************************/

// Used on the header bus img
window.addEventListener("scroll", (event) => {
  // Smoothly load content
  if (bringInContentTriggered === false) {
    bringInContent = setInterval(bringContent, 10);
  }
});

function bringContent() {
  // Make sure to identify the interval as triggeres
  bringInContentTriggered = true;

  // slowly increase opacity value
  if (fadeInVal2 < 1) {
    fadeInVal2 += 0.008;
  } else {
    fadeInVal2 = 1;
  }

  // slowly bring the elements in
  if (bringInVal > 0) {
    bringInVal -= 1;
  } else {
    bringInVal = 0;
  }

  // Bring in the other content
  contentSectionImg.style.opacity = fadeInVal2;
  contentSectionImg.style.transform = `translateX(${bringInVal}vw)`;
  contentSectionImg.style.transition = "all 0.3s";

  inverseContentSectionImg.style.opacity = fadeInVal2;
  inverseContentSectionImg.style.transform = `translateX(-${bringInVal}vw)`;
  inverseContentSectionImg.style.transition = "all 0.3s";

  // Make sure you stop the interval
  if (fadeInVal2 >= 1 && bringInVal === 0) {
    clearInterval(bringInContent);
  }
}
