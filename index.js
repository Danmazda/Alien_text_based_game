const buttons = document.getElementById("choices");
const text = document.getElementById("text");

//Criação de estado para controle do que está acontecendo no jogo.
let userState = {
  id: 1,
  timePassed: 0,
  passengers: 0,
};

const narrator = [
  {
    id: 1,
    text: `Início`,
    textChoice: `Voltar ao início`,
    choices: [2, 3, 4],
    setState: {
      id: 1,
    },
  },
  {
    id: 2,
    text: `Escolheu o id 2`,
    textChoice: `Esse é o id 2`,
    choices: [2, 3],
    setState: {
      id: 2,
    },
  },
  {
    id: 3,
    text: `Escolheu id 3`,
    textChoice: `Esse é o id 3`,
    choices: [2, 3, 4],
    setState: {
      id: 3,
      timePassed: 1,
    },
  },
  {
    id: 4,
    text: `Escolheu o id 4`,
    textChoice: `Esse é o id 4`,
    choices: [1],
    setState: {
      id: 4,
    },
  },
];

///// Jogo em si
function startGame() {
  //Quando a função é chamada os botões são deletados
  while (buttons.firstChild) {
    buttons.removeChild(buttons.firstChild);
  }
  //
  console.log("The game has begun.");
  console.log(userState);
  // A cena atual será a cena em que o jogador está
  let currentState = narrator.find((time, index) => {
    if (time.id === userState.id) {
      return true;
    }
  });
  text.innerText = currentState.text;
  currentState.choices.forEach((choice) => {
    // Cria um botão para cada escolha
    let newButton = document.createElement("button");
    newButton.classList.add("choice");
    let nextScene = narrator.find((value, index) => {
      if (value.id === choice) {
        return true;
      }
    });
    //> Texto do botão será o texto da escolha
    newButton.innerText = nextScene.textChoice;
    //função para ir à escolha selecionada
    newButton.addEventListener("click", () => {
      userState = { ...userState, ...nextScene.setState };
      console.log(userState);
      startGame();
    });
    buttons.appendChild(newButton);
  });
}

startGame();
