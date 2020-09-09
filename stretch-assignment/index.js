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

// Used for the interval when traveler is moving
let travelerMovement;
let newDistance;
const distanceLimit = 300;

/*************************************
 * Setting initial styles and content
 *************************************/

rockets.forEach((rocket) => {
  rocket.setAttribute("data-distance", 0);
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

// Add a takeoff message alert
const takeOff = document.createElement("p");
takeOff.textContent = "Taking Off!";
takeOff.classList.add("take-off", "animate__animated", "animate__flash", "animate__infinite");

rocketContainer.appendChild(takeOff);

/*************************************
 * When a rocket is clicked, moved them
 * to the top of the stack
 *************************************/

rockets.forEach((rocket, index) => {
  // If the mouse button is held down, the traveler will move
  const rocketShip = rocket.childNodes[0];

  rocketShip.addEventListener("mousedown", (event) => {
    // Check to see if we have the active rocket class.If not, just return
    if (rocket.classList.length < 3) {
      console.log("Not an active rocket");
      return;
    }

    // Get the traveler
    const traveler = rocket.childNodes[1];

    // Get the distance travel attribute
    const distanceTraveled = parseInt(rocket.getAttribute("data-distance"));

    // Declare the new distance and make it equal to current distance
    let newDistance = distanceTraveled;

    // Get initial width of container
    let rocketWidth = rocket.offsetWidth;

    // Start the interval movement
    travelerMovement = setInterval(() => {
      // Check if we have reached our goal. If we did, set an alert and return
      if (newDistance >= distanceLimit) {
        alert("Goal Reached");
        gsap.to(".traveler", { rotation: 0, y: 0, duration: 1 });
        clearInterval(travelerMovement);
        return;
      }

      newDistance += 1;
      rocketWidth += 1;
      rocket.style.width = `${rocketWidth}px`;
      rocket.setAttribute("data-distance", newDistance);
      gsap.to(traveler, { rotation: 15, y: -10, x: newDistance, ease: "power", duration: 0.5 });
    }, 20);
  });

  // Once you release the mouse, stop the interval
  rocketShip.addEventListener("mouseup", (event) => {
    gsap.to(".traveler", { rotation: 0, y: 0, duration: 1 });
    clearInterval(travelerMovement);
  });

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

    // Make sure the distance traveled is reset back to 0 before coming in
    rocket.setAttribute("data-distance", 0);

    // Get the rocket icon and traveler
    const rocketIcon = rocket.childNodes[0];

    // Get the takeoff message and activate it
    const takeOffTxt = document.querySelector(".take-off");
    takeOffTxt.style.display = "block";

    // Set animation to playing once it begins
    animationPlaying = true;

    // For the other rockets, move them down
    rockets.forEach((otherRockets, i) => {
      if (i !== index) {
        gsap.to(otherRockets, { y: 95, opacity: 0.3, width: "auto", ease: "sine", duration: 2 });

        setTimeout(function () {
          otherRockets.classList.remove("active-rocket");
        }, 1000);
      }
    });

    // Move rocket to side and remove border, prepare for takeoff
    gsap.to(rocketIcon, { x: 60, ease: "slow", duration: 2 });
    gsap.to(".block", { borderWidth: 0, ease: "sine", duration: 2 });
    gsap.to(".traveler", { opacity: 0, x: 0, ease: "sine", duration: 1 });

    // Launch the rocket
    gsap.to(rocket, { y: -(rocket.offsetTop - 12), ease: "slow", duration: 2, delay: 2 });

    // Return rocket to position
    gsap.to(rocket, { borderWidth: 2, ease: "slow", duration: 2, delay: 4 });
    gsap.to(rocketIcon, { x: 0, ease: "slow", duration: 2, delay: 4 });

    setTimeout(function () {
      // Reset the position of rocket
      gsap.to(rocket, { y: 0, opacity: 1, duration: 0 });
      gsap.to(".block", { y: 0, opacity: 1, duration: 0.1 });
      gsap.to(".traveler", { opacity: 1, duration: 0 });
      animationPlaying = false;
      rocket.classList.add("active-rocket");
      takeOffTxt.style.display = "none";

      rocket.parentNode.removeChild(rocket);
      rocketContainer.prepend(rocket);
    }, 6000);
  });
});
