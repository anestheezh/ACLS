// Define ACLS scenarios and corresponding correct actions
const scenarios = [
  {
    prompt: "Scenario 1: A patient is experiencing cardiac arrest. What is the first step in the ACLS algorithm?",
    options: [
      "Check for responsiveness",
      "Perform chest compressions",
      "Administer epinephrine"
    ],
    correctOption: 1
  },
  {
    prompt: "Scenario 2: You have confirmed that the patient is unresponsive. What is the next step?",
    options: [
      "Open the airway",
      "Check for a pulse",
      "Give breaths with a bag-mask device"
    ],
    correctOption: 0
  },
  {
    prompt: "Scenario 3: The patient is unresponsive, and the airway is open. What should you do next?",
    options: [
      "Administer high-concentration oxygen",
      "Check for breathing",
      "Attach an automated external defibrillator (AED)"
    ],
    correctOption: 1
  },
  {
    prompt: "Scenario 4: The patient is not breathing. What is the next step?",
    options: [
      "Perform chest compressions",
      "Administer epinephrine",
      "Give breaths with a bag-mask device"
    ],
    correctOption: 0
  },
  // Add more scenarios as needed to cover the ACLS algorithm
];

// Game state
let score = 0;
let currentScenario = 0;

// Function to display a scenario and prompt for player's choice
function displayScenario() {
  const scenario = scenarios[currentScenario];
  const promptElement = document.getElementById("prompt");
  const optionsElement = document.getElementById("options");

  promptElement.textContent = scenario.prompt;
  optionsElement.innerHTML = "";

  scenario.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.onclick = function() {
      evaluateChoice(index);
    };
    optionsElement.appendChild(optionButton);
  });
}

// Function to evaluate player's choice and provide feedback
function evaluateChoice(playerChoice) {
  const scenario = scenarios[currentScenario];
  const optionsElement = document.getElementById("options");
  const selectedOption = optionsElement.children[playerChoice];

  if (playerChoice === scenario.correctOption) {
    console.log("Correct!");
    score++;
    selectedOption.classList.add("correct");
  } else {
    console.log("Incorrect!");
    selectedOption.classList.add("incorrect");
    const correctOption = optionsElement.children[scenario.correctOption];
    correctOption.classList.add("correct");
  }
  currentScenario++;

  if (currentScenario < scenarios.length) {
    setTimeout(displayScenario, 1000);
  } else {
    setTimeout(endGame, 1000);
  }
}

// Function to display final score and end the game
function endGame() {
  const feedbackElement = document.getElementById("feedback");
  const scoreElement = document.getElementById("score");

  feedbackElement.textContent = "Game Over";
  scoreElement.textContent = `Your score: ${score} out of ${scenarios.length}`;
}

// Start the game
displayScenario();

// Function to display vital signs
function displayVitalSigns() {
  // Generate random vital sign values within a specific range
  const heartRate = Math.floor(Math.random() * (180 - 60 + 1)) + 60;
  const bloodPressure = Math.floor(Math.random() * (160 - 80 + 1)) + 80;
  const oxygenSaturation = Math.floor(Math.random() * (100 - 90 + 1)) + 90;

  // Display the vital signs on the page
  document.getElementById("heart-rate").textContent = ` ${heartRate} bpm`;
  document.getElementById("blood-pressure").textContent = ` ${bloodPressure} mmHg`;
  document.getElementById("oxygen-saturation").textContent = ` ${oxygenSaturation}%`;
}

// Call the displayVitalSigns function initially to show the initial vital signs
displayVitalSigns();

// Call the displayVitalSigns function every 2 seconds to update the vital signs
setInterval(displayVitalSigns, 2000);
