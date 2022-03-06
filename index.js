const buttons = document.getElementById("choices");
const text = document.getElementById("text");
const title = document.getElementById("title");
const start = document.getElementsByClassName("start")[0];
const footer = document.querySelector("footer");
//Criação de estado para controle do que está acontecendo no jogo.
let userState = {
  id: 1,
  timePassed: 0,
  passengers: 0,
  viewedScenes: [],
};

///// Jogo em si
function startGame() {
  //Quando a função é chamada os botões são deletados
  while (buttons.firstChild) {
    buttons.removeChild(buttons.firstChild);
  }
  //
  console.log(userState);
  // A cena atual será a cena em que o jogador está
  let currentScene;
  if (userState.timePassed >= 6) {
    currentScene = narration(10, userState);
  } else {
    currentScene = narration(userState.id, userState);
  }
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
    let nextScene = narration(choice, userState);
    // Texto do botão será o texto da escolha
    newButton.innerText = nextScene.textChoice;
    //função para ir à escolha selecionada
    newButton.addEventListener("click", () => {
      //Atualiza o estado, roda de novo
      userState.id = nextScene.id;
      if (nextScene.hasOwnProperty("passengers")) {
        userState.passengers += nextScene.passengers;
      }
      if (nextScene.hasOwnProperty("timePassed")) {
        userState.timePassed += nextScene.timePassed;
      }
      startGame();
    });
    buttons.appendChild(newButton);
  });
}

//Inicalizador
start.addEventListener("click", () => {
  startGame();
  start.remove();
  footer.remove();
});

// Narrator function - condições adicionais para textos e finais diferentes
function narration(id, userState) {
  let scene;
  switch (id) {
    case 1:
      return {
        id: 1,
        title: `Hibernation room`,
        text: `You are a space marine from the Delta recon team. 
        The federation sent you on a mission: Secure the egg of an unknown species and take it to a secure location in the outer rims.
        The journey should take 5 light years, to spare resources you and your crew were hibernated until you reach destination.
        You've been suddenly awakened, your pod opens up and you can barely catch a breath, the hibernation room is filled with darkness with the only source of light being the blue dim light of your pod.
        As far as you can see the other pods nearby are empty, there is a putrid smell in the air. Rotten food and sewer combined.
        There's a thudding sound coming from the end of the room. To your right you remember a corridor that leads to the cafeteria.
        To your left is a massive door that leads to the armory.
        `,
        textChoice: `Go back`,
        choices: [2, 3, 4],
      };
    case 2:
      return {
        title: `Hibernation room - 2`,
        text: `You venture through the darkness, with the thudding sound as your guide, the wicked smell is getting worse, but you keep going.
        There's an unopened pod with no lights. A fellow crewmate is trapped inside of it, knocking the door to try to release himself. You help him open it.
        He asks what the hell happened, but you also have no idea. You two agree on searching for supplies.`,
        textChoice: `Follow the noise and investigate.`,
        choices: [1],
        id: 2,
        passengers: 1,
        timePassed: 1,
      };
    case 3:
      scene = {
        title: `Cafeteria`,
        text: `You ignore the sound and go straight to the corridor, the smell of rotten food gets worse. You are presented with a partially opened door,
        you squeeze your body through the aperture. You're in the cafeteria, some lights are still on revealing a mess of stacked tables and chairs barricating the door to the command room. There may be some supplies in the pantry,  `,
        textChoice: `Follow the corridor`,
        // Fazer nova escolha depois
        choices: [1],
        id: 3,
        timePassed: 1,
        passengers: 0,
      };
      if (userState.passengers > 0) {
        scene.text = `You and your crewmate follow the corridor to the cafeteria, the smell of rotten food gets worse. You are presented with a partially opened door, you two squeeze
        yourselves through the aperture. You're in the cafeteria, some lights are still on revealing a mess of stacked tables and chairs barricating the door to the command room. To your left there's a door that leaves to the pantry.
        Passenger 1: "So the creature was let loose..."
        You: "There must be a really fierce creature to take down that much marines."
        Passenger 1: "We should get our weapons as soon as possible."`;
      }
      return scene;
    case 4:
      scene = {
        id: 4,
        title: `Armory`,
        text: `You try to open the door, there's no power, the hibernation has left you weak and you can't force the door open, after a while you give up.`,
        textChoice: `Search for your weapons`,
        choices: [1],
        timePassed: 1,
        passengers: 0,
      };
      if (userState.passengers == 1) {
        scene.text = `You both try to open the door, but is sealed shut, the hibernation has left you weak, and you can't force the door open, after a while you two give up.`;
      }
      if (userState.passengers == 2) {
        scene.text = `With the backup power online you can now open the door. You three pickup armors and weapons.
        Passenger 1: "Let the beast come."
        You: "Time to avenge our comrades"
        Passenger 2: "Don't get your hopes yet boys, the command room is our objetive for now."
        `;
      }
      return scene;
    case 10:
      scene = {
        id: 10,
        title: `No escape`,
      };
      scene.text = noEscape();
      return scene;
    default:
      console.log("Id not found");
      break;
  }
}

//Random death scenes
// Criar mais cenas de morte
function noEscape() {
  let choice = Math.floor(3 * Math.random());
  let deathScenes = [
    `A black thorned creature appear in front of you, with no weapon, you're just an easy prey. It opens its mouth and with one bite take your head off.
  The last passenger will arrive to it's destination.`,
    `The gigantic creature got to you, with it's tail it grabs your leg and lifts you up, with it's alongated arms it rips your limbs, one at a time.`,
    `You feel something hit your chest, lookin down you see a spear shaped tail has ripped through. The tail retracts, splattering your blood. You begin to fade while the creature feasts on your flesh. `,
  ];
  return deathScenes[choice];
}
