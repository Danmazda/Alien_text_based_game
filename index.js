const buttons = document.getElementById("choices");
const text = document.getElementById("text");
const title = document.getElementById("title");
const start = document.getElementsByClassName("start")[0];
const footer = document.querySelector("footer");

//Criação de estado para controle do que está acontecendo no jogo.
let userState = {
  id: 1,
  lurking: 0,
  passengers: 0,
  path: [1],
  health: 2,
  medkit: false,
  weapon: false,
};

const uniqueScenes = [2];

///// Jogo em si
function startGame() {
  //Quando a função é chamada os botões são deletados
  console.log(userState);
  while (buttons.firstChild) {
    buttons.removeChild(buttons.firstChild);
  }
  // A cena atual será a cena em que o jogador está
  let currentScene;
  if (userState.lurking > 8) {
    currentScene = narration(30, userState);
  } else {
    currentScene = narration(userState.id, userState);
  }
  // Se  o usuário já viu a cena, não mostra o texto novamente
  // Arrumar para aparecer as diferentes cenas com diferentes quantidades de passageiros
  // if (userState  path.includes(currentScene.id)) {
  //   text.innerText = "";
  // } else {}

  text.innerText = currentScene.text;
  title.innerText = currentScene.title;

  currentScene.choices.forEach((choice) => {
    // Cria um botão para cada escolha
    let newButton = buttonCreate(choice, currentScene);
    buttons.appendChild(newButton);
  });

  if (userState.path.length > 1) {
    let prevScene = userState.path[userState.path.length - 1];
    if (!uniqueScenes.includes(prevScene)) {
      let backButton = buttonCreate(prevScene, currentScene, (goBack = true));
      backButton.innerText = "Go back";
      buttons.appendChild(backButton);
    }
  }
}

function buttonCreate(id, currentScene, goBack = false) {
  let newButton = document.createElement("button");
  newButton.classList.add("choice");
  let nextScene = narration(id, userState);
  // Texto do botão será o texto da escolha
  newButton.innerText = nextScene.textChoice;
  //função para ir à escolha selecionada
  newButton.addEventListener("click", () => {
    //Atualizações de estado
    userState.id = nextScene.id;
    if (nextScene.hasOwnProperty("passengers")) {
      userState.passengers += nextScene.passengers;
    }
    if (nextScene.hasOwnProperty("lurking")) {
      userState.lurking += nextScene.lurking;
    }
    if (nextScene.hasOwnProperty("medkit")) {
      userState.medkit = true;
    }
    if (nextScene.hasOwnProperty("weapon")) {
      userState.weapon = true;
    }
    if (goBack) {
      userState.path.pop();
    } else {
      userState.path.push(currentScene.id);
    }
    startGame();
  });
  return newButton;
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
      scene = {
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
        textChoice: `Hibernation room `,
        choices: [2, 3, 4],
      };

      if (userState.path.includes(2)) {
        scene.choices.shift();
      }

      return scene;

    case 2:
      return {
        title: `Hibernation room - 2`,
        text: `You venture through the darkness, with the thudding sound as your guide, the wicked smell is getting worse, but you keep going.
        There's an unopened pod with no lights. A fellow crewmate is trapped inside of it, knocking the door to try to release himself. You help him open it.
        He asks what the hell happened, but you also have no idea. You two agree on searching for supplies.`,
        textChoice: `Follow the noise and investigate.`,
        choices: [],
        id: 2,
        passengers: 1,
        lurking: 1,
      };
    case 3:
      scene = {
        title: `Canteen and kitchen`,
        text: `You ignore the sound and go straight to the corridor, the smell of rotten food gets worse. You are presented with a partially opened door,
        you squeeze your body through the aperture. You're in the canteen, some lights are still on revealing a mess of stacked tables and chairs barricading the door to the bridge. There may be some supplies in the pantry.`,
        textChoice: `Follow the corridor`,
        // Fazer nova escolha depois
        choices: [5, 6],
        id: 3,
        lurking: 1,
        passengers: 0,
      };
      if (userState.passengers > 0) {
        scene.text = `You and your crewmate follow the corridor to the canteen, the smell of rotten food gets worse. You are presented with a partially opened door, you two squeeze
        yourselves through the aperture. You're in the canteen, some lights are still on revealing a mess of stacked tables and chairs barricading the door to the bridge. To your left there's a door that leaves to the pantry.
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
        choices: [],
        lurking: 1,
        passengers: 0,
      };
      if (userState.passengers == 1) {
        scene.text = `You both try to open the door, but is sealed shut, the hibernation has left you weak, and you can't force the door open, after a while you two give up.`;
      }
      if (userState.passengers == 2) {
        scene.text = `With the backup power online you can now open the door. You three pickup armors and weapons.
        Passenger 1: "Let the beast come."
        You: "Time to avenge our comrades"
        Passenger 2: "Don't get your hopes yet boys, the bridge is our objetive for now."
        `;
        scene.weapon = true;
      }
      return scene;
    case 5:
      scene = {
        id: 5,
        title: `Pantry`,
        text: `The door to the pantry is wide open, there's where the stink is coming from, there may have an problem with refrigeration, all food is rotten. Almost all first aid kits are taken except one. Beneath the filth there's a trapdoor that goes down to the Maintenance.`,
        textChoice: `Investigate Pantry`,
        choices: [7, 8],
        lurking: 1,
      };
      return scene;
    case 6:
      let captain = "";
      scene = {
        id: 6,
        title: `Briefing area`,
        text: `There's too much furniture blocking the passage, you can't move it all off the way, after a while you give up. `,
        textChoice: `Access briefing room`,
        choices: [],
        lurking: 1,
      };

      if (userState.passengers === 1) {
        scene.choices = [];
        if (userState.lurking < 100) {
          captain =
            "Your captain is in the desk bleeding heavily fighting to stay alive.";
          if (userState.medkit) {
            captain += " You can save him with your first aid kit.";
          } else {
            captain += " there's nothing you can do to save him.";
          }
        }
        scene.text =
          "With all your efforts combined you clear the way to the briefing area." +
          captain;
      }
      return scene;
    case 7:
      scene = {
        id: 7,
        title: `Pantry - 2`,
        text: `You took the first aid kit.`,
        textChoice: `Take first aid kit`,
        choices: [],
        medkit: true,
      };
      return scene;
    case 8:
      scene = {
        id: 8,
        title: `Maintenance`,
        text: `Opening the trap door you feel an unbearable heat coming from below, it's impossible to go down without proper protection`,
        textChoice: `Go down the trapdoor`,
        choices: [],
        lurking: 3,
      };
      if (userState.weapon) {
        scene.text = `The three of you go down to the Maintenance tunnels, the armor softens the heat.
        Captain - The core has gone to shit, it's only a matter of time before it explodes.
        You - There's no way to stabilize it?
        Captain - Not without the engineer.
        Passenger 2 - Maybe he's still around here.
        Captain - Or he's that pile of blood.`;
      }
      return scene;
    case 29:
      scene = {
        id: 29,
        title: `The end`,
        text: ``,
        textChoice: `Embrace your fate.`,
      };
      scene.text = ``;
      return scene;
    case 30:
      scene = {
        id: 30,
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
    `The gigantic creature got to you, with it's tail it grabs your leg and lifts you up, with it's elongated arms it rips your limbs, one at a time.`,
    `You feel something hit your chest, looking down you see a spear shaped tail has ripped through. The tail retracts, splattering your blood. You begin to fade while the creature feasts on your flesh. `,
  ];
  return deathScenes[choice];
}
