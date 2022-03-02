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
    text: `You are an hibernated space marine. 
    The federation sent you to a mission in the outer rims to retrieve a egg of an unknown species.
     You're returning home with your crew. The journey should take 5 light years, you've awakened in 6 months...`,
    textChoice: `Voltar ao início`,
    choices: [2, 3, 4],
    setState: {
      id: 1,
      passengers: 0,
      timePassed: 0,
    },
  },
  {
    id: 2,
    text: `Escolheu o id 2`,
    textChoice: `Esse é o id 2`,
    choices: [2, 3],
    setState: {
      id: 2,
      passengers: 1,
      timePassed: 1,
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
      passengers: 0,
    },
  },
  {
    id: 4,
    text: `Escolheu o id 4`,
    textChoice: `Esse é o id 4`,
    choices: [1],
    setState: {
      id: 4,
      timePassed: 2,
      passengers: 2,
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
  let currentScene = narrator.find((time, index) => {
    if (time.id === userState.id) {
      return true;
    }
  });
  text.innerText = currentScene.text;
  currentScene.choices.forEach((choice) => {
    // Cria um botão para cada escolha
    let newButton = document.createElement("button");
    newButton.classList.add("choice");
    let nextScene = narrator.find((value, index) => {
      if (value.id === choice) {
        return true;
      }
    });
    let { id, timePassed, passengers } = nextScene.setState;
    // Texto do botão será o texto da escolha
    newButton.innerText = nextScene.textChoice;
    //função para ir à escolha selecionada
    newButton.addEventListener("click", () => {
      //Atualiza o estado, roda de novo
      userState = {
        id: id,
        timePassed: userState.timePassed + timePassed,
        passengers: userState.passengers + passengers,
      };
      console.log(userState);
      startGame();
    });
    buttons.appendChild(newButton);
  });
}

startGame();
