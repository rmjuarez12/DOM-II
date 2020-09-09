// Import GSAP
import { gsap } from "gsap";

/*************************************
 * Declaring/Assigning variables
 *************************************/

// Body selector
const body = document.querySelector("body");

// Header selector
const header = document.querySelector("header");

// Navigation items
const navItems = document.querySelectorAll(".nav .nav-link");

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

// Get destination section
const contentDestination = document.querySelector(".content-destination");
const contentDestinationImg = document.querySelector(".content-destination");

// Get the pick section
const contentPick = document.querySelector(".content-pick");
const contentPickBTn = document.querySelectorAll(".content-pick .btn");
const contentPickDestination = document.querySelectorAll(".destination");

// Get the footer
const footer = document.querySelector("footer");

/*************************************
 * Setting initial styles and content
 *************************************/

// Ensure the header has a high z-index
header.style.zIndex = 100;

// Ensure the body does not create a horizontal scrollbar
body.style.overflowX = "hidden";

// Setting up some elements to start at opacity 0
contentSectionImg.style.opacity = 0;
inverseContentSectionImg.style.opacity = 0;

// Setting up element that will come from left
contentSectionImg.style.transform = `translateX(100vw)`;

// Setting up element that will come from right
inverseContentSectionImg.style.transform = `translateX(-100vw)`;

// Add a draggable container for the destination section
const newDestination = document.createElement("div");
newDestination.classList.add("drag-container");
newDestination.setAttribute("draggable", "true");
newDestination.textContent = "Drag Me Below!";

contentDestination.appendChild(newDestination);

// Add a droppable container for the above draggable container
contentPickDestination.forEach((element) => {
  const newDesinationPick = document.createElement("div");
  newDesinationPick.classList.add("drop-container");
  newDesinationPick.textContent = "Drop Here";

  element.prepend(newDesinationPick);
});

/*************************************
 * Using resize event
 *************************************/

window.addEventListener("resize", (event) => {
  contentSectionImg.querySelector("img").src = "https://picsum.photos/400/300";
});

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
window.addEventListener("keydown", (event) => {
  const keyPressed = event.key;

  if (keyPressed !== "d") {
    alert("Press the 'd' key for something awesome!");
  } else {
    if (body.className === "dark-mode") {
      body.classList.remove("dark-mode");
    } else {
      body.classList.add("dark-mode");
    }
  }
});

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

  gsap.to(".intro img", { opacity: getDirection, x: moveImg, duration: 1.5 });
});

/*************************************
 * Using load event
 *************************************/

// Load content in
window.addEventListener("load", (event) => {
  // fadeInContent = setInterval(loadContent, 50);
  gsap.from(".intro", { opacity: 0, y: -100, duration: 1.5 });
  gsap.from(".content-section .text-content", { opacity: 0, y: 100, duration: 1.5 });
});

/*************************************
 * Using scroll event
 *************************************/

// Bring in the content images from each side
window.addEventListener("scroll", (event) => {
  // Smoothly load content
  gsap.to(".content-section .img-content", { opacity: 1, x: 0, duration: 1.5 });
});

/*************************************
 * Using drag/drop events
 *************************************/

let dragged;

// Get the draggable element
document.addEventListener(
  "dragstart",
  function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;

    // make it half transparent
    if (dragged.className === "drag-container") {
      event.target.style.opacity = 0.5;
      event.target.style.transform = "rotate(15deg)";
    }
  },
  false
);

document.addEventListener(
  "dragend",
  function (event) {
    // reset the transparency
    event.target.style.opacity = "";
    event.target.style.transform = "";
  },
  false
);

/* events fired on the drop targets */
document.addEventListener(
  "dragover",
  function (event) {
    // prevent default to allow drop
    event.preventDefault();
  },
  false
);

document.addEventListener(
  "dragenter",
  function (event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "drop-container" && dragged.className === "drag-container") {
      event.target.style.background = "#17a2b8";
      event.target.style.opacity = 1;
    }
  },
  false
);

document.addEventListener(
  "dragleave",
  function (event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "drop-container" && dragged.className === "drag-container") {
      event.target.style.background = "";
      event.target.style.opacity = "";
      event.target.style.fontSize = "";
    }
  },
  false
);

document.addEventListener(
  "drop",
  function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "drop-container" && dragged.className === "drag-container") {
      event.target.style.background = "";
      event.target.style.fontSize = "0pt";
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
      dragged.textContent = "YAY!";
    } else if (dragged.className === "drag-container") {
      dragged.textContent = "DRAG ME BELOW!";
      contentDestination.appendChild(dragged);
    }
  },
  false
);

/*************************************
 * Using click events
 *************************************/

// Move the draggable container on click of the destination pick and alert the value
contentPickBTn.forEach((element) => {
  element.addEventListener("click", (event) => {
    const dropContainerElm = element.parentElement.querySelector(".drop-container");
    const allDropContainerElm = document.querySelectorAll(".drop-container");
    const draggableContainerElm = document.querySelector(".drag-container");
    const destinationPicked = element.parentElement.querySelector("h4");

    allDropContainerElm.forEach((elm) => {
      elm.style.fontSize = "";
      elm.style.opacity = "";
    });

    draggableContainerElm.parentNode.removeChild(draggableContainerElm);
    draggableContainerElm.textContent = "YAY!";
    dropContainerElm.appendChild(draggableContainerElm);
    dropContainerElm.style.fontSize = 0;
    dropContainerElm.style.opacity = 1;

    alert(`You picked ${destinationPicked.textContent}!`);
  });
});

/*************************************
 * Using dblclick events
 *************************************/

// Reset the position of the dragged object once it is double clicked
const draggableObj = document.querySelector(".drag-container");

draggableObj.addEventListener("dblclick", (event) => {
  const objectParent = event.target.parentNode;

  if (objectParent.className === "drop-container") {
    objectParent.style.background = "";
    objectParent.style.opacity = "";
    objectParent.style.fontSize = "";

    objectParent.removeChild(event.target);
    contentDestination.appendChild(event.target);
    event.target.textContent = "DRAG ME BELOW!";
  } else {
    alert("Drag me to a destination!");
  }
});

/*************************************
 * Nest two similar events somewhere in the site and prevent
 * the event propagation properly. Remember not all
 * event types bubble.
 *************************************/

const logoSection = document.querySelector(".logo-heading");

logoSection.addEventListener("click", (event) => {
  event.stopPropagation();
  logoSection.style.background = "tomato";
});

header.addEventListener("click", (event) => {
  header.style.background = "purple";
});

/*************************************
 * Using preventDefault() to stop nav items from triggerring
 *************************************/

navItems.forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
  });
});
