// Import GSAP
import { gsap } from "gsap";

/*************************************
 * Declaring/Assigning variables
 *************************************/

// Rocket container
const rocketContainer = document.querySelector(".blocks");

// Rockets
const rockets = document.querySelectorAll(".block");

// Check if animation is playing
let animationPlaying = false;

/*************************************
 * Setting initial styles and content
 *************************************/

rockets.forEach((rocket) => {
  rocket.setAttribute("data-xPos", 0);
});

// Add a rocket to the container
rockets.forEach((rocket) => {
  const rocketIcon = document.createElement("span");
  rocketIcon.innerHTML = '<i class="fas fa-space-shuttle"></i>';
  rocketIcon.classList.add("rocket");

  rocket.appendChild(rocketIcon);
});

// Add a traveler to the container. Also ensure only the first has one
rockets.forEach((rocket, index) => {
  const traveler = document.createElement("span");
  traveler.innerHTML = '<i class="fas fa-male"></i>';
  traveler.classList.add("traveler");

  rocket.appendChild(traveler);

  if (index === 0) {
    rocket.classList.add("active-rocket");
  }
});

/*************************************
 * When a rocket is clicked, moved them
 * to the top of the stack
 *************************************/

rockets.forEach((rocket, index) => {
  // When a rocket is clicked, have it go to the top
  rocket.addEventListener("click", (event) => {
    // Check if animation is playing
    if (animationPlaying === true) {
      console.log("Animation is playing");
      return;
    } else if (rocket.classList.length > 2) {
      console.log("Active rocket", index);
      return;
    }

    // Get the rocket icon and traveler
    const rocketIcon = rocket.childNodes[0];
    const traveler = rocket.childNodes[1];

    // Set animation to playing once it begins
    animationPlaying = true;

    rockets.forEach((otherRockets, i) => {
      if (i !== index) {
        gsap.to(otherRockets, { y: 100, ease: "sine", duration: 2 });
        otherRockets.classList.remove("active-rocket");
      }
    });

    // Move rocket to side and remove border, prepare for takeoff
    gsap.to(rocketIcon, { x: rocket.offsetHeight, ease: "slow", duration: 2 });
    gsap.to(".block", { borderWidth: 0, ease: "sine", duration: 2 });
    gsap.to(".traveler", { opacity: 0, ease: "sine", duration: 1 });

    // Launch the rocket
    gsap.to(rocket, { y: -(rocket.offsetTop - 120), ease: "slow", duration: 2, delay: 2 });

    // Return rocket to position
    gsap.to(rocket, { borderWidth: 2, ease: "slow", duration: 2, delay: 4 });
    gsap.to(rocketIcon, { x: 0, ease: "slow", duration: 2, delay: 4 });

    setTimeout(function () {
      // Reset the position of rocket
      gsap.to(".block", { y: 0, duration: 0 });
      gsap.to(".traveler", { opacity: 1, duration: 0 });
      animationPlaying = false;
      rocket.classList.add("active-rocket");

      rocket.parentNode.removeChild(rocket);
      rocketContainer.prepend(rocket);
    }, 6000);
  });
});
