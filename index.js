const buttons = document.getElementById("choices");
const text = document.getElementById("text");

const userState = {
  id: 1,
  timePassed: 0,
  health: 100,
  passengers: 0,
};

const narrator = [
  {
    id: 1,
    text: `Início`,
    textChoice: `Voltar ao início`,
    time: 0,
    choices: [2, 3],
  },
  {
    id: 2,
    text: `Escolha 1`,
    textChoice: `Esse é o id 2`,
    time: 0,
    choices: [2, 3],
  },
  {
    id: 3,
    text: `Escolheu id 3`,
    textChoice: `Esse é o id 3`,
    time: 0,
    choices: [2, 3],
  },
  {
    id: 4,
    text: `Escolheu o id 4`,
    textChoice: `Esse é o id 4`,
    time: 0,
    choices: [1],
  },
];

/////
function startGame() {
  console.log("The game has begun.");
  //while (userState.timePassed <= 6 || userState.health > 0) {
  let currentState = narrator.find((time, index) => {
    if (time.id === userState.id) {
      return true;
    }
  });
  text.innerText = currentState.text;
  currentState.choices.forEach((c) => {
    let newButton = document.createElement("div");
    newButton.classList.add("choice");
    buttons.appendChild(newButton);
  });
}

startGame();
