const buttons = document.getElementById("choices");
const text = document.getElementById("text");
const title = document.getElementById("title");
//Criação de estado para controle do que está acontecendo no jogo.
let userState = {
  id: 1,
  timePassed: 0,
  passengers: 0,
  viewedScenes: [],
};

const narrator = [
  {
    id: 1,
    title: `Hibernation room`,
    text: `You are a space marine from the Delta recon team. 
    The federation sent you to a mission in the outer rims to retrieve an egg of an unknown species.
    The journey should take 5 light years, to spare resources you and your crew were hibernated until you reach destination.
    You've been suddenly awakened, your pod opens up and you can barely catch a breath, the hibernation room is filled with darkness with the only source of light being the blue dim light of your pod.
    As far as you can see the other pods nearby are empty, there is a putrid smell in the air. Rotten food and sewer combined.
    There's a thudding sound coming from the end of the room. To your right you remember a corridor that leads to the cafeteria.
    To your left is a massive door that leads to the armory.
    `,
    textChoice: `Go back`,
    choices: [2, 3, 4],
    setState: {
      id: 1,
      passengers: 0,
      timePassed: 0,
    },
  },
  {
    id: 2,
    title: `Hibernation room - 2`,
    text: `You venture through the darkness, with the thudding sound as your guide, the wicked smell is getting worse, but you keep going.
    There's an unopened pod with no lights. A fellow crewmate is trapped inside of it, knocking the door to try to release himself. You press the button to open it.`,
    textChoice: `Follow the noise and investigate.`,
    choices: [3],
    setState: {
      id: 2,
      passengers: 1,
      timePassed: 1,
    },
  },
  {
    id: 3,
    title: `Cafeteria`,
    text: `You ignore the sound and go straight to the corridor, the smell of rotten food gets worse. You are presented with a partially opened door,
    you squeeze your body through the aperture. You're in the cafeteria`,
    textChoice: `Follow the corridor`,
    // Fazer nova escolha depois
    choices: [1],
    setState: {
      id: 3,
      timePassed: 1,
      passengers: 0,
    },
  },
  {
    id: 4,
    title: `Armory`,
    text: `You try to open the door, there's no power, the hibernation has left you weak and you can't force the door open, after a while you give up.`,
    textChoice: `Search for your weapons`,
    choices: [1],
    setState: {
      id: 4,
      timePassed: 1,
      passengers: 0,
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
  console.log(userState);
  // A cena atual será a cena em que o jogador está
  let currentScene = narrator.find((time, index) => {
    if (time.id === userState.id) {
      return true;
    }
  });
  // Se  o usuário já viu a cena, não mostra o texto novamente
  if (userState.viewedScenes.includes(currentScene.id)) {
    text.innerText = "";
  } else {
    text.innerText = currentScene.text;
    userState.viewedScenes.push(currentScene.id);
  }
  //
  title.innerText = currentScene.title;
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
        viewedScenes: userState.viewedScenes,
      };
      startGame();
    });
    buttons.appendChild(newButton);
  });
}

startGame();
