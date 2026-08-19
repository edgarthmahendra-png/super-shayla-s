// ============================================================
// SHAYLA'S LITTLE ADVENTURE - MARIO PIXEL VISUAL STYLE
// ============================================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ============================================================
// ASSETS
// ============================================================

// SHAYLA RUN
const shaylaImages = [];
for (let i = 1; i <= 5; i++) {
  const img = new Image();
  img.src = `assets/characters/shayla_run${i}.png`;
  shaylaImages.push(img);
}

// SHAYLA JUMP
const shaylaJumpImages = [];
for (let i = 1; i <= 6; i++) {
  const img = new Image();
  img.src = `assets/characters/shayla_jump${i}.png`;
  shaylaJumpImages.push(img);
}

// SHAYLA IDLE & SIT
const shaylaIdle = new Image();
shaylaIdle.src = "assets/characters/shayla_idle.png";

const shaylaSit = new Image();
shaylaSit.src = "assets/characters/shayla_sit.png";

const shaylaAttack = new Image();
shaylaAttack.src = "assets/characters/shayla_attack.png";

// SHAYLA ATTACK FRAMES
const shaylaAttackImages = [];
for (let i = 1; i <= 5; i++) {
  const img = new Image();
  img.src = `assets/characters/shayla_attack${i}.png`;
  shaylaAttackImages.push(img);
}

// SHAYLA HURT
const shaylaHurtImages = [];
for (let i = 1; i <= 3; i++) {
  const img = new Image();
  img.src = `assets/characters/shayla_hurt${i}.png`;
  shaylaHurtImages.push(img);
}

// SHAYLA FINISH
const shaylaSitFinish = new Image();
shaylaSitFinish.src = "assets/characters/shayla_sitFinish.png";

// KAFKA IDLE, LOVE, & SIT
const kafkaIdle = new Image();
kafkaIdle.src = "assets/characters/kafka_idle.png";

const kafkaLove = new Image();
kafkaLove.src = "assets/characters/kafka_love.png";

const kafkaSit = new Image();
kafkaSit.src = "assets/characters/kafka_sit.png";

// KAFKA ATTACK
const kafkaAttackImages = [];
for (let i = 1; i <= 3; i++) {
  const img = new Image();
  img.src = `assets/characters/kafka_attack${i}.png`;
  kafkaAttackImages.push(img);
}

// KAFKA FINISH
const kafkaSitFinish = new Image();
kafkaSitFinish.src = "assets/characters/kafka_sitFinish.png";

// KAFKA CROUCH
const kafkaCrouch = new Image();
kafkaCrouch.src = "assets/characters/kafka_crouch.png";

// KAFKA RUN
const kafkaRunImages = [];
for (let i = 1; i <= 5; i++) {
  const img = new Image();
  img.src = `assets/characters/kafka_run${i}.png`;
  kafkaRunImages.push(img);
}

// KAFKA JUMP
const kafkaJumpImages = [];
for (let i = 1; i <= 6; i++) {
  const img = new Image();
  img.src = `assets/characters/kafka_jump${i}.png`;
  kafkaJumpImages.push(img);
}

// BAHLIL IDLE & ANIMATIONS
const bahlilIdle = new Image();
bahlilIdle.src = "assets/characters/bahlil_idle.png";

const bahlilAttackImages = [];
for (let i = 1; i <= 4; i++) {
  const img = new Image();
  img.src = `assets/characters/bahlil_attack${i}.png`;
  bahlilAttackImages.push(img);
}

const bahlilHurtImages = [];
for (let i = 1; i <= 2; i++) {
  const img = new Image();
  img.src = `assets/characters/bahlil_hurt${i}.png`;
  bahlilHurtImages.push(img);
}

const bahlilWalkImages = [];
for (let i = 1; i <= 5; i++) {
  const img = new Image();
  img.src = `assets/characters/bahlil_walk${i}.png`;
  bahlilWalkImages.push(img);
}

// ============================================================
// ANIMATION VARIABLES
// ============================================================

let shaylaFrame = 0;
let shaylaFrameTimer = 0;

let shaylaAttacking = false;
let shaylaAttackTimer = 0;
let shaylaAttackFrame = 0;
let shaylaAttackFrameTimer = 0;

let shaylaJumpFrame = 0;
let shaylaJumpFrameTimer = 0;

let shaylaSitting = false;
let shaylaSitTimer = 0;

let shaylaHurt = false;
let shaylaHurtFrame = 0;
let shaylaHurtFrameTimer = 0;
let shaylaHurtTimer = 0;

// ============================================================
// BACKGROUND ANIMATION DATA (AWAN & KELOPAK PINK)
// ============================================================

const dynamicClouds = [
  { x: 50, y: 70, speed: 0.4, scale: 0.9 },
  { x: 300, y: 110, speed: 0.6, scale: 1.2 },
  { x: 600, y: 60, speed: 0.3, scale: 0.8 },
  { x: 950, y: 90, speed: 0.5, scale: 1.0 },
  { x: 1400, y: 75, speed: 0.4, scale: 1.1 }
];

const pinkPetals = [];
for (let i = 0; i < 20; i++) {
  pinkPetals.push({
    x: Math.random() * 2000,
    y: Math.random() * 600,
    size: Math.random() * 4 + 3,
    speedY: Math.random() * 0.8 + 0.4,
    speedX: Math.random() * 0.5 - 0.25,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.04
  });
}

// ============================================================
// CUTSCENE STATE
// ============================================================

let cutscenePhase = "none";

let finishCutscene = false;
let bossCutsceneStarted = false;
let finishTriggered = false;

let kafkaEntering = false;
let kafkaFighting = false;
let fightStarted = false;
let fightFinished = false;

let kafkaAttackFrame = 0;
let kafkaAttackFrameTimer = 0;
let kafkaFightTimer = 0;

let kafkaFacingLeft = false;
let screenFlash = 0;

// ============================================================
// FADE STATE
// ============================================================

let fadeAlpha = 0;
let fadeState = "none"; 
let fadeSpeed = 0.025;

// ============================================================
// ENDING & KAFKA PHYSICS / MOVEMENT
// ============================================================

let endingStarted = false;
let endingWalkTimer = 0;

let endingDoorX = 4750;
let kafkaTargetX = endingDoorX - 80;
let kafkaArrivedAtDoor = false;

let doorOpen = false;
let letterVisible = false;
let endingPath = [];

// ============================================================
// DIALOGUE SYSTEMS & TYPEWRITER EFEK
// ============================================================

let activeDialogueType = "intro";
let kafkaEndingDialogueIndex = 0;
let dialogueIndex = 0;
let gameStarted = false;

let currentTextTarget = "";
let currentTextDisplayed = "";
let typewriterIndex = 0;
let typewriterTimer = null;

const dialogues = [
  { speaker: "Shayla", text: "Loh... aku ada di mana?" },
  { speaker: "Shayla", text: "Apa lagi ini?" },
  { speaker: "Shayla", text: "Aaa...semoga aja nggak ketemu musuh." }
];

const kafkaEndingDialogues = [
  { speaker: "Kafka", text: "Hey, kamu gapapa?" },
  { speaker: "Shayla", text: "Aku gapapa..." },
  { speaker: "Kafka", text: "Ah untung aja aku datang" },
  { speaker: "Kafka", text: "Hampir aja kamu di telan bahlil" },
  { speaker: "Shayla", text: "Yayaya" },
  { speaker: "Kafka", text: "Hadeh, emang mau di makan keknya ini" },
  { speaker: "Shayla", text: "UDAH BAWA AKU PERGI!!!" },
  { speaker: "Kafka", text: "Sabar napa jirr" }
];

const doorEndingDialogues = [
  { speaker: "Kafka", text: "Ah, akhirnya sampai" },
  { speaker: "Shayla", text: "Pendek banget, sendiri juga aku bisa ini" },
  { speaker: "Kafka", text: "Gayanya jir tadi aja knock kena gebuk bahlil." },
  { speaker: "Shayla", text: "Hehehehe" },
  { speaker: "Kafka", text: "Hehehe bae" },
  { speaker: "Shayla", text: "Itu pintu apa?" },
  { speaker: "Kafka", text: "Buka aja, ntar otomatis dia yang design KAFKA soalnya" },
  { speaker: "Shayla", text: "DIHHH" }
];

// ============================================================
// DOM ELEMENTS & PINK THEME STYLING
// ============================================================

const titleScreen = document.getElementById("titleScreen");
const startButton = document.getElementById("startButton");
const dialogueBox = document.getElementById("dialogueBox");
const speaker = document.getElementById("speaker");
const dialogueText = document.getElementById("dialogueText");
const dialogueNext = document.getElementById("dialogueNext");

// Mengubah Tampilan Menu Utama & Elemen UI Menjadi Tema Pink Soft Romantic
if (titleScreen) {
  titleScreen.style.background = "linear-gradient(to bottom, #ffafbd 0%, #ffc3a0 50%, #ffe8e8 100%)";
}

if (startButton) {
  startButton.style.transition = "transform 0.2s, box-shadow 0.2s, background-color 0.2s";
  startButton.style.animation = "pinkPulse 1.8s infinite ease-in-out";
}

if (dialogueBox) {
  dialogueBox.style.animation = "floatBubble 2.5s infinite ease-in-out";
  dialogueBox.style.borderColor = "#ff8fb8";
  dialogueBox.style.backgroundColor = "rgba(255, 240, 245, 0.95)";
  dialogueBox.style.boxShadow = "0px 8px 25px rgba(255, 105, 180, 0.5)";
}

// Injeksi CSS Keyframes Dinosaurus & Glow Pink
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes pinkPulse {
    0% { transform: scale(1) translateY(0px); box-shadow: 0 0 10px #ff69b4, 0 0 20px #ff1493; background-color: #ff4081; color: #fff; }
    50% { transform: scale(1.08) translateY(-6px); box-shadow: 0 0 22px #ff1493, 0 0 35px #ff8fb8; background-color: #ff1493; color: #fff; }
    100% { transform: scale(1) translateY(0px); box-shadow: 0 0 10px #ff69b4, 0 0 20px #ff1493; background-color: #ff4081; color: #fff; }
  }
  @keyframes floatBubble {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }
`;
document.head.appendChild(styleSheet);

// ============================================================
// CANVAS & RESIZE
// ============================================================

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (gameStarted) {
    createLevel();
    if (!endingStarted) {
      player.y = Math.min(player.y, groundY - player.height);
    }
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// ============================================================
// ENTITIES
// ============================================================

const gravity = 0.7;
let groundY = 0;

const player = {
  x: 100,
  y: 100,
  width: 45,
  height: 65,
  velocityX: 0,
  velocityY: 0,
  speed: 5,
  jumpPower: 13,
  grounded: false
};

const kafka = {
  x: 2300,
  y: 0,
  width: 60,
  height: 65,
  velocityX: 0,
  velocityY: 0,
  speed: 2.8,
  jumpPower: 13.5,
  grounded: false,
  active: false,
  runFrame: 0,
  runFrameTimer: 0,
  jumpFrame: 0,
  jumpFrameTimer: 0
};

const bahlil = {
  x: 4200,
  y: 0,
  width: 60,
  height: 65,
  active: false,
  speed: 1.5,
  direction: 1,
  patrolMin: 4050,
  patrolMax: 4850,
  state: "idle",
  attackTimer: 0,
  attackDelay: 40,
  attackFrame: 0,
  attackFrameTimer: 0,
  attackHit: false,
  hurtFrame: 0,
  hurtFrameTimer: 0,
  walkFrame: 0,
  walkFrameTimer: 0
};

const platforms = [];
const enemies = [];
const itemBlocks = [];
let checkpoint = { x: 100, y: 0 };

const decorations = [
  { type: "bush", x: 220, scale: 1 },
  { type: "bush", x: 920, scale: 1.2 },
  { type: "bush", x: 1550, scale: 1 },
  { type: "bush", x: 2150, scale: 1.1 },
  { type: "bush", x: 2850, scale: 1 },
  { type: "bush", x: 3600, scale: 1.2 },
  { type: "bush", x: 4250, scale: 1 }
];

// ============================================================
// LEVEL CREATION
// ============================================================

function createEnemies() {
  enemies.length = 0;
  enemies.push({ x: 850, y: groundY - 45, width: 45, height: 45, speed: 1.5, direction: 1, patrolMin: 750, patrolMax: 1200, hitEffect: 0, walkFrame: 0, walkFrameTimer: 0 });
  enemies.push({ x: 1450, y: groundY - 145, width: 45, height: 45, speed: 1.2, direction: -1, patrolMin: 1350, patrolMax: 1750, hitEffect: 0, walkFrame: 0, walkFrameTimer: 0 });
  enemies.push({ x: 2050, y: groundY - 45, width: 45, height: 45, speed: 1.7, direction: 1, patrolMin: 1900, patrolMax: 2600, hitEffect: 0, walkFrame: 0, walkFrameTimer: 0 });
  enemies.push({ x: 2800, y: groundY - 45, width: 45, height: 45, speed: 1.4, direction: -1, patrolMin: 2700, patrolMax: 3200, hitEffect: 0, walkFrame: 0, walkFrameTimer: 0 });
  enemies.push({ x: 3500, y: groundY - 125, width: 45, height: 45, speed: 1.8, direction: 1, patrolMin: 3400, patrolMax: 3850, hitEffect: 0, walkFrame: 0, walkFrameTimer: 0 });
}

function createLevel() {
  groundY = canvas.height - 120;
  platforms.length = 0;
  itemBlocks.length = 0;

  platforms.push({ x: 0, y: groundY, width: 600, height: 120 });
  platforms.push({ x: 750, y: groundY, width: 450, height: 120 });
  platforms.push({ x: 1350, y: groundY - 100, width: 400, height: 220 });
  platforms.push({ x: 1900, y: groundY, width: 700, height: 120 });
  platforms.push({ x: 2600, y: groundY, width: 700, height: 120 });
  platforms.push({ x: 3400, y: groundY - 80, width: 450, height: 200 });
  platforms.push({ x: 4050, y: groundY, width: 800, height: 120 });

  // Floating Mario Blocks
  itemBlocks.push({ x: 250, y: groundY - 120, size: 45 });
  itemBlocks.push({ x: 950, y: groundY - 130, size: 45 });
  itemBlocks.push({ x: 1010, y: groundY - 130, size: 45 });
  itemBlocks.push({ x: 2200, y: groundY - 140, size: 45 });
  itemBlocks.push({ x: 2850, y: groundY - 130, size: 45 });

  endingPath = [];
  endingPath.push({ x: 2400, y: groundY, width: 700, height: 120 });
  endingPath.push({ x: 3100, y: groundY - 80, width: 350, height: 200 });
  endingPath.push({ x: 3450, y: groundY, width: 600, height: 120 });
  endingPath.push({ x: 4050, y: groundY, width: 800, height: 120 });
}

// ============================================================
// UPDATES
// ============================================================

function updateEnemies() {
  if (cutscenePhase !== "none" && cutscenePhase !== "done") return;

  for (const enemy of enemies) {
    enemy.x += enemy.speed * enemy.direction;
    if (enemy.x <= enemy.patrolMin) {
      enemy.x = enemy.patrolMin;
      enemy.direction = 1;
    }
    if (enemy.x + enemy.width >= enemy.patrolMax) {
      enemy.x = enemy.patrolMax - enemy.width;
      enemy.direction = -1;
    }
    enemy.walkFrameTimer++;
    if (enemy.walkFrameTimer >= 6) {
      enemy.walkFrameTimer = 0;
      enemy.walkFrame++;
      if (enemy.walkFrame >= bahlilWalkImages.length) enemy.walkFrame = 0;
    }
  }
}

function updateBahlil() {
  if (!bahlil.active) return;
  if (cutscenePhase === "bahlilAttack" || cutscenePhase === "kafkaEnter" || cutscenePhase === "fight") return;
  if (fightFinished) return;

  bahlil.x += bahlil.speed * bahlil.direction;
  if (bahlil.x <= bahlil.patrolMin) {
    bahlil.x = bahlil.patrolMin;
    bahlil.direction = 1;
  }
  if (bahlil.x + bahlil.width >= bahlil.patrolMax) {
    bahlil.x = bahlil.patrolMax - bahlil.width;
    bahlil.direction = -1;
  }
  bahlil.walkFrameTimer++;
  if (bahlil.walkFrameTimer >= 6) {
    bahlil.walkFrameTimer = 0;
    bahlil.walkFrame++;
    if (bahlil.walkFrame >= bahlilWalkImages.length) bahlil.walkFrame = 0;
  }
}

function updateKafka() {
  if (!kafka.active) return;

  if (cutscenePhase === "kafkaEnter") {
    kafka.x -= kafka.speed;
    kafka.runFrameTimer++;
    if (kafka.runFrameTimer >= 5) {
      kafka.runFrameTimer = 0;
      kafka.runFrame++;
      if (kafka.runFrame >= kafkaRunImages.length) kafka.runFrame = 0;
    }

    if (kafka.x <= bahlil.x + bahlil.width + 25) {
      kafka.x = bahlil.x + bahlil.width + 25;
      kafkaEntering = false;
      kafkaFighting = true;
      cutscenePhase = "fight";
      kafkaAttackFrame = 0;
      kafkaAttackFrameTimer = 0;
      kafkaFightTimer = 35;
      kafkaFacingLeft = true;

      bahlil.direction = -1;
      bahlil.state = "attack";
      bahlil.attackFrame = 0;
      bahlil.attackFrameTimer = 0;
    }
    return;
  }

  if (cutscenePhase === "fight") {
    kafkaAttackFrameTimer++;
    if (kafkaAttackFrameTimer >= 6) {
      kafkaAttackFrameTimer = 0;
      kafkaAttackFrame++;
      if (kafkaAttackFrame >= kafkaAttackImages.length) kafkaAttackFrame = 0;
    }

    if (kafkaFightTimer > 0) kafkaFightTimer--;

    if (kafkaFightTimer <= 0 && bahlil.active && bahlil.state !== "hurt") {
      bahlil.state = "hurt";
      bahlil.hurtFrame = 0;
      bahlil.hurtFrameTimer = 0;
      screenFlash = 8;
    }

    if (bahlil.state === "hurt") {
      bahlil.hurtFrameTimer++;
      if (bahlil.hurtFrameTimer >= 8) {
        bahlil.hurtFrameTimer = 0;
        bahlil.hurtFrame++;
        if (bahlil.hurtFrame >= bahlilHurtImages.length) {
          bahlil.hurtFrame = bahlilHurtImages.length - 1;
          bahlil.active = false;
          bahlil.state = "idle";
          kafkaFighting = false;
          fightStarted = false;
          fightFinished = true;

          shaylaHurt = true;
          shaylaHurtFrame = shaylaHurtImages.length - 1;
          shaylaHurtTimer = 999999;

          fadeAlpha = 0;
          fadeState = "fadeOut";
          cutscenePhase = "fadeToBlack";
        }
      }
    }
    return;
  }

  // LOGIKA KAFKA JALAN DENGAN AUTO JUMP PADA TANJAKAN / JURANG
  if (cutscenePhase === "endingWalk" || cutscenePhase === "doorDialogue" || cutscenePhase === "doorOpen" || cutscenePhase === "letter") {
    if (!kafkaArrivedAtDoor) {
      kafkaFacingLeft = false;

      if (kafka.x < kafkaTargetX) {
        kafka.velocityX = kafka.speed;

        const lookAheadX = kafka.x + kafka.width + 15;
        let aheadPlatform = endingPath.find(p => lookAheadX >= p.x && lookAheadX <= p.x + p.width);

        if (kafka.grounded) {
          if (aheadPlatform && aheadPlatform.y < kafka.y) {
            kafka.velocityY = -kafka.jumpPower;
            kafka.grounded = false;
          } else if (!aheadPlatform) {
            kafka.velocityY = -kafka.jumpPower;
            kafka.grounded = false;
          }
        }

      } else {
        kafka.x = kafkaTargetX;
        kafka.velocityX = 0;
        kafkaArrivedAtDoor = true;
        kafkaFacingLeft = true;
      }
    } else {
      kafka.velocityX = 0;
      kafkaFacingLeft = true;
    }

    kafka.velocityY += gravity;
    kafka.x += kafka.velocityX;
    kafka.y += kafka.velocityY;

    kafka.grounded = false;
    for (const platform of endingPath) {
      const hCol = kafka.x < platform.x + platform.width && kafka.x + kafka.width > platform.x;
      const vCol = kafka.y + kafka.height >= platform.y && kafka.y + kafka.height <= platform.y + 30 && kafka.velocityY >= 0;

      if (hCol && vCol) {
        kafka.y = platform.y - kafka.height;
        kafka.velocityY = 0;
        kafka.grounded = true;
        break;
      }
    }

    if (!kafka.grounded) {
      kafka.jumpFrameTimer++;
      if (kafka.jumpFrameTimer >= 5) {
        kafka.jumpFrameTimer = 0;
        kafka.jumpFrame++;
        if (kafka.jumpFrame >= kafkaJumpImages.length) kafka.jumpFrame = kafkaJumpImages.length - 1;
      }
    } else {
      kafka.jumpFrame = 0;
      kafka.jumpFrameTimer = 0;

      if (Math.abs(kafka.velocityX) > 0.1) {
        kafka.runFrameTimer++;
        if (kafka.runFrameTimer >= 6) {
          kafka.runFrameTimer = 0;
          kafka.runFrame++;
          if (kafka.runFrame >= kafkaRunImages.length) kafka.runFrame = 0;
        }
      } else {
        kafka.runFrame = 0;
      }
    }
  }
}

function checkEnemyCollision() {
  if (cutscenePhase !== "none" && cutscenePhase !== "done") return;
  for (const enemy of enemies) {
    const collision = player.x < enemy.x + enemy.width &&
                      player.x + player.width > enemy.x &&
                      player.y < enemy.y + enemy.height &&
                      player.y + player.height > enemy.y;
    if (collision) {
      respawn();
      break;
    }
  }
}

function checkAttackHit() {
  if (!shaylaAttacking) return;
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    const attackRange = 35;
    const hit = player.x < enemy.x + enemy.width &&
                player.x + player.width + attackRange > enemy.x &&
                player.y < enemy.y + enemy.height &&
                player.y + player.height > enemy.y;
    if (hit) {
      enemy.hitEffect = 8;
      setTimeout(() => {
        const index = enemies.indexOf(enemy);
        if (index !== -1) enemies.splice(index, 1);
      }, 120);
      shaylaAttacking = false;
      break;
    }
  }
}

// ============================================================
// CONTROLS & EVENT LISTENERS
// ============================================================

const keys = {};

window.addEventListener("keydown", (event) => {
  keys[event.key.toLowerCase()] = true;
  if (event.key.toLowerCase() === "j") {
    if (cutscenePhase === "none") {
      shaylaAttacking = true;
      shaylaAttackTimer = 20;
      shaylaAttackFrame = 0;
      shaylaAttackFrameTimer = 0;
    }
  }
  if (event.key === " ") event.preventDefault();
});

window.addEventListener("keyup", (event) => {
  keys[event.key.toLowerCase()] = false;
});

startButton.addEventListener("click", () => {
  titleScreen.style.display = "none";
  canvas.style.display = "block";
  startDialogue("intro");
});

function startDialogue(type) {
  activeDialogueType = type;
  dialogueIndex = 0;
  kafkaEndingDialogueIndex = 0;
  dialogueBox.classList.remove("hidden");
  showDialogue();
}

function showDialogue() {
  let current;
  if (activeDialogueType === "intro") {
    current = dialogues[dialogueIndex];
  } else if (activeDialogueType === "firstEnding") {
    current = kafkaEndingDialogues[kafkaEndingDialogueIndex];
  } else if (activeDialogueType === "doorEnding") {
    current = doorEndingDialogues[kafkaEndingDialogueIndex];
  }

  if (current) {
    speaker.textContent = current.speaker;

    if (typewriterTimer) clearInterval(typewriterTimer);
    currentTextTarget = current.text;
    currentTextDisplayed = "";
    typewriterIndex = 0;
    dialogueText.textContent = "";

    typewriterTimer = setInterval(() => {
      if (typewriterIndex < currentTextTarget.length) {
        currentTextDisplayed += currentTextTarget.charAt(typewriterIndex);
        dialogueText.textContent = currentTextDisplayed;
        typewriterIndex++;
      } else {
        clearInterval(typewriterTimer);
      }
    }, 30);
  }
}

dialogueNext.addEventListener("click", () => {
  if (currentTextDisplayed.length < currentTextTarget.length) {
    clearInterval(typewriterTimer);
    currentTextDisplayed = currentTextTarget;
    dialogueText.textContent = currentTextTarget;
    return;
  }

  if (activeDialogueType === "intro") {
    dialogueIndex++;
    if (dialogueIndex >= dialogues.length) {
      dialogueBox.classList.add("hidden");
      startGame();
      return;
    }
    showDialogue();
  } else if (activeDialogueType === "firstEnding") {
    kafkaEndingDialogueIndex++;
    if (kafkaEndingDialogueIndex >= kafkaEndingDialogues.length) {
      dialogueBox.classList.add("hidden");
      cutscenePhase = "endingWalk";
      fadeState = "fadeIn";
      return;
    }
    showDialogue();
  } else if (activeDialogueType === "doorEnding") {
    kafkaEndingDialogueIndex++;
    if (kafkaEndingDialogueIndex >= doorEndingDialogues.length) {
      dialogueBox.classList.add("hidden");
      cutscenePhase = "doorOpen";
      doorOpen = true;
      return;
    }
    showDialogue();
  }
});

// ============================================================
// START GAME
// ============================================================

function startGame() {
  createLevel();
  createEnemies();

  finishTriggered = false;
  bossCutsceneStarted = false;
  finishCutscene = false;

  checkpoint.x = 100;
  checkpoint.y = groundY - player.height;

  player.x = checkpoint.x;
  player.y = checkpoint.y;
  player.velocityX = 0;
  player.velocityY = 0;

  kafka.x = 2300;
  kafka.y = groundY - kafka.height;
  kafka.velocityX = 0;
  kafka.velocityY = 0;
  kafka.active = false;
  kafkaEntering = false;
  kafkaFighting = false;

  fightStarted = false;
  fightFinished = false;

  bahlil.x = 4200;
  bahlil.y = groundY - bahlil.height;
  bahlil.active = false;
  bahlil.state = "idle";
  bahlil.direction = 1;

  cutscenePhase = "none";
  fadeAlpha = 0;
  fadeState = "none";

  endingStarted = false;
  doorOpen = false;
  letterVisible = false;
  shaylaHurt = false;
  shaylaSitting = false;
  kafkaArrivedAtDoor = false;

  gameStarted = true;
  gameLoop();
}

function checkPlatformCollision() {
  player.grounded = false;
  const collisionPlatforms = endingStarted ? endingPath : platforms;

  for (const platform of collisionPlatforms) {
    const horizontalCollision = player.x < platform.x + platform.width && player.x + player.width > platform.x;
    const verticalCollision = player.y + player.height >= platform.y && player.y + player.height <= platform.y + 30 && player.velocityY >= 0;

    if (horizontalCollision && verticalCollision) {
      player.y = platform.y - player.height;
      player.velocityY = 0;
      player.grounded = true;
      break;
    }
  }

  for (const block of itemBlocks) {
    const hCol = player.x < block.x + block.size && player.x + player.width > block.x;
    const vCol = player.y + player.height >= block.y && player.y + player.height <= block.y + 20 && player.velocityY >= 0;
    if (hCol && vCol) {
      player.y = block.y - player.height;
      player.velocityY = 0;
      player.grounded = true;
      break;
    }
  }
}

function updateCheckpoint() {
  if (endingStarted) return;
  if (player.x >= 500 && checkpoint.x < 500) { checkpoint.x = 500; checkpoint.y = groundY - player.height; }
  if (player.x >= 1100 && checkpoint.x < 1100) { checkpoint.x = 1100; checkpoint.y = groundY - player.height; }
  if (player.x >= 2000 && checkpoint.x < 2000) { checkpoint.x = 2000; checkpoint.y = groundY - player.height; }
}

function checkFall() {
  if (endingStarted) return;
  if (player.y > canvas.height + 200) respawn();
}

function respawn() {
  player.x = checkpoint.x;
  player.y = checkpoint.y;
  player.velocityX = 0;
  player.velocityY = 0;

  shaylaSitting = true;
  shaylaSitTimer = 60;

  const safePlatform = platforms.find(p => player.x >= p.x && player.x <= p.x + p.width);
  if (safePlatform) player.y = safePlatform.y - player.height;
}

// ============================================================
// ANIMATIONS
// ============================================================

function updateShaylaAnimation() {
  if (shaylaHurt) {
    shaylaHurtTimer--;
    shaylaHurtFrameTimer++;
    if (shaylaHurtFrameTimer >= 10) {
      shaylaHurtFrameTimer = 0;
      shaylaHurtFrame++;
      if (shaylaHurtFrame >= shaylaHurtImages.length) shaylaHurtFrame = shaylaHurtImages.length - 1;
    }
    if (shaylaHurtTimer <= 0 && cutscenePhase === "none") {
      shaylaHurt = false;
      shaylaHurtFrame = 0;
      shaylaHurtFrameTimer = 0;
    }
    return;
  }

  if (shaylaAttacking) {
    shaylaAttackTimer--;
    shaylaAttackFrameTimer++;
    if (shaylaAttackFrameTimer >= 4) {
      shaylaAttackFrameTimer = 0;
      shaylaAttackFrame++;
      if (shaylaAttackFrame >= shaylaAttackImages.length) shaylaAttackFrame = shaylaAttackImages.length - 1;
    }
    if (shaylaAttackTimer <= 0) {
      shaylaAttacking = false;
      shaylaAttackFrame = 0;
      shaylaAttackFrameTimer = 0;
    }
    return;
  }

  if (shaylaSitting) {
    shaylaSitTimer--;
    if (shaylaSitTimer <= 0) shaylaSitting = false;
    return;
  }

  if (!player.grounded) {
    shaylaJumpFrameTimer++;
    if (shaylaJumpFrameTimer >= 6) {
      shaylaJumpFrameTimer = 0;
      shaylaJumpFrame++;
      if (shaylaJumpFrame >= shaylaJumpImages.length) shaylaJumpFrame = shaylaJumpImages.length - 1;
    }
    return;
  }

  shaylaJumpFrame = 0;
  shaylaJumpFrameTimer = 0;

  const moving = Math.abs(player.velocityX) > 0.5;
  if (!moving) {
    shaylaFrame = 0;
    shaylaFrameTimer = 0;
    return;
  }

  shaylaFrameTimer++;
  if (shaylaFrameTimer >= 6) {
    shaylaFrameTimer = 0;
    shaylaFrame++;
    if (shaylaFrame >= shaylaImages.length) shaylaFrame = 0;
  }
}

// ============================================================
// MAIN UPDATE
// ============================================================

function update() {
  if (!gameStarted) return;

  if (cutscenePhase !== "none" && cutscenePhase !== "endingWalk") {
    player.velocityX = 0;
    player.velocityY = 0;
  }

  if (fadeState === "fadeOut") {
    fadeAlpha += fadeSpeed;
    if (fadeAlpha >= 1) {
      fadeAlpha = 1;
      fadeState = "none";

      if (cutscenePhase === "fadeToBlack") {
        cutscenePhase = "endingDialogue";

        endingStarted = true;
        shaylaHurt = false;
        bahlil.active = false;
        enemies.length = 0;

        kafka.active = true;
        kafka.x = player.x + player.width + 20;
        kafka.y = player.y;
        kafkaFacingLeft = true;

        startDialogue("firstEnding");
      }
    }
  } else if (fadeState === "fadeIn") {
    fadeAlpha -= fadeSpeed;
    if (fadeAlpha <= 0) {
      fadeAlpha = 0;
      fadeState = "none";
    }
  }

  if (cutscenePhase === "endingWalk") {
    if (player.x >= endingDoorX - 140) {
      player.velocityX = 0;
      player.velocityY = 0;
      cutscenePhase = "doorDialogue";
      startDialogue("doorEnding");
    }
  }

  if (cutscenePhase === "doorOpen") {
    player.velocityX = 0;
    player.velocityY = 0;

    endingWalkTimer++;
    if (endingWalkTimer >= 40) {
      endingWalkTimer = 0;
      cutscenePhase = "letter";
      letterVisible = true;
    }
    return;
  }

  if (cutscenePhase === "letter") {
    player.velocityX = 0;
    player.velocityY = 0;
    return;
  }

  if (cutscenePhase === "none" || cutscenePhase === "endingWalk") {
    if (keys["arrowleft"] || keys["a"]) {
      player.velocityX = -player.speed;
    } else if (keys["arrowright"] || keys["d"]) {
      player.velocityX = player.speed;
    } else {
      player.velocityX *= 0.8;
    }

    if ((keys[" "] || keys["arrowup"] || keys["w"]) && player.grounded) {
      player.velocityY = -player.jumpPower;
      player.grounded = false;
    }
  }

  player.velocityY += gravity;
  player.x += player.velocityX;
  player.y += player.velocityY;

  updateShaylaAnimation();
  checkPlatformCollision();

  if (cutscenePhase === "none") {
    updateEnemies();
    checkEnemyCollision();
    checkAttackHit();
  }

  updateKafka();
  updateBahlil();
  updateCheckpoint();
  checkFall();

  if (player.x < 0) player.x = 0;

  if (player.x + player.width >= 2400 && !finishTriggered) {
    finishTriggered = true;
    player.velocityX = 0;
    player.velocityY = 0;
  }

  if (player.x >= 2400 && !bossCutsceneStarted && !fightFinished && cutscenePhase === "none") {
    bossCutsceneStarted = true;
    finishCutscene = true;
    player.velocityX = 0;
    player.velocityY = 0;

    bahlil.active = true;
    bahlil.x = player.x + 65;
    bahlil.y = groundY - bahlil.height;
    bahlil.direction = -1;
    bahlil.state = "idle";

    shaylaHurt = true;
    shaylaHurtFrame = 0;
    shaylaHurtFrameTimer = 0;
    shaylaHurtTimer = 80;

    cutscenePhase = "bahlilAttack";
  }

  if (cutscenePhase === "bahlilAttack" && bahlil.active) {
    if (bahlil.state === "idle") {
      bahlil.attackDelay--;
      if (bahlil.attackDelay <= 0) {
        bahlil.state = "attack";
        bahlil.attackFrame = 0;
        bahlil.attackFrameTimer = 0;
      }
    }

    if (bahlil.state === "attack") {
      bahlil.attackFrameTimer++;
      if (bahlil.attackFrameTimer >= 8) {
        bahlil.attackFrameTimer = 0;
        bahlil.attackFrame++;
        if (bahlil.attackFrame >= bahlilAttackImages.length) bahlil.attackFrame = bahlilAttackImages.length - 1;
      }

      if (bahlil.attackFrame >= 2 && !bahlil.attackHit) {
        bahlil.attackHit = true;
        shaylaHurt = true;
        shaylaHurtFrame = 0;
        shaylaHurtFrameTimer = 0;
        shaylaHurtTimer = 60;
        screenFlash = 8;

        kafka.active = true;
        kafkaEntering = true;
        kafkaFighting = false;
        kafka.x = player.x + 250;
        kafka.y = groundY - kafka.height;
        kafka.runFrame = 0;
        kafka.runFrameTimer = 0;
        kafkaFacingLeft = true;

        cutscenePhase = "kafkaEnter";
      }
    }
  }
}

// ============================================================
// CAMERA
// ============================================================

let cameraX = 0;

function updateCamera() {
  const targetCamera = player.x - canvas.width * 0.35;
  cameraX += (targetCamera - cameraX) * 0.1;
  if (cameraX < 0) cameraX = 0;
}

// ============================================================
// DRAW (DESAIN PINK ROMANTIC, CLOUDS & PETALS)
// ============================================================

function draw() {
  // 1. Langit Pink Soft Gradient
  const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  skyGradient.addColorStop(0, "#ffafbd");
  skyGradient.addColorStop(0.5, "#ffc3a0");
  skyGradient.addColorStop(1, "#ffe8e8");
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Awan Bergerak
  drawDynamicClouds();

  // 3. Kelopak Bunga Pink Gugur
  drawPinkPetals();

  // 4. Awan Teks Spesial di Atas Pintu Ending "HAPPY MENSIVE BABY" & "19 November 2025"
  drawDateTextCloud(endingDoorX - 100 - cameraX, 100);

  // 5. Dekorasi Semak
  drawDecorations();

  // 6. Platform Batu Bata & Rumput
  for (const platform of platforms) drawMarioPlatform(platform);

  if (endingStarted) {
    for (const platform of endingPath) drawMarioPlatform(platform);
  }

  // 7. Floating Item Blocks
  for (const block of itemBlocks) drawItemBlock(block);

  drawCheckpoint();

  if (!endingStarted) {
    for (const enemy of enemies) drawEnemy(enemy);
  }

  if (bahlil.active) drawBahlil();
  if (kafka.active) drawKafka();
  drawShayla();

  if (!endingStarted) drawFinish();
  if (endingStarted) drawEndingDoor();

  if (cutscenePhase === "none" || cutscenePhase === "endingWalk") drawUI();

  if (screenFlash > 0) {
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    screenFlash--;
  }

  if (fadeAlpha > 0) {
    ctx.fillStyle = `rgba(0,0,0,${fadeAlpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (letterVisible) drawLetter();
}

// --- RENDERING HELPER ---

function drawDynamicClouds() {
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  dynamicClouds.forEach(c => {
    let cloudX = c.x - cameraX * 0.2;
    ctx.beginPath();
    ctx.arc(cloudX, c.y, 25 * c.scale, 0, Math.PI * 2);
    ctx.arc(cloudX + 20 * c.scale, c.y - 10 * c.scale, 20 * c.scale, 0, Math.PI * 2);
    ctx.arc(cloudX + 40 * c.scale, c.y, 25 * c.scale, 0, Math.PI * 2);
    ctx.fill();

    c.x += c.speed;
    if (c.x - 100 > canvas.width + cameraX * 0.2) {
      c.x = cameraX * 0.2 - 100;
    }
  });
}

function drawPinkPetals() {
  pinkPetals.forEach(p => {
    ctx.save();
    let renderX = p.x - cameraX * 0.5;
    ctx.translate(renderX, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = "#ff80ab";
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size / 1.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    p.y += p.speedY;
    p.x += Math.sin(p.y * 0.02) * 0.5;
    p.angle += p.spin;

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * (canvas.width + 3000);
    }
  });
}

function drawDateTextCloud(x, y) {
  ctx.save();
  // Latar belakang gumpalan awan putih beranimasi halus
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.beginPath();
  ctx.arc(x + 20, y, 35, 0, Math.PI * 2);
  ctx.arc(x + 100, y - 10, 45, 0, Math.PI * 2);
  ctx.arc(x + 200, y - 5, 40, 0, Math.PI * 2);
  ctx.arc(x + 280, y, 35, 0, Math.PI * 2);
  ctx.fill();

  // Teks "HAPPY MENSIVE BABY" & Tanggal
  ctx.font = "900 22px 'Segoe UI', sans-serif";
  ctx.fillStyle = "#ff1493";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.textAlign = "center";
  
  ctx.strokeText("HAPPY MENSIVE BABY", x + 150, y - 2);
  ctx.fillText("HAPPY MENSIVE BABY", x + 150, y - 2);

  ctx.font = "bold 16px 'Segoe UI', sans-serif";
  ctx.fillStyle = "#ff69b4";
  ctx.strokeText("19 November 2025", x + 150, y + 22);
  ctx.fillText("19 November 2025", x + 150, y + 22);
  ctx.restore();
}

function drawMarioPlatform(platform) {
  const x = platform.x - cameraX;
  const y = platform.y;
  const w = platform.width;
  const h = platform.height;

  ctx.fillStyle = "#d35e38";
  ctx.fillRect(x, y + 16, w, h - 16);

  ctx.strokeStyle = "#8b341a";
  ctx.lineWidth = 3;
  const brickH = 18;
  const brickW = 36;

  for (let py = y + 16; py < y + h; py += brickH) {
    ctx.beginPath();
    ctx.moveTo(x, py);
    ctx.lineTo(x + w, py);
    ctx.stroke();

    const offset = (Math.floor(py / brickH) % 2) * (brickW / 2);
    for (let px = x + offset; px < x + w; px += brickW) {
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, Math.min(py + brickH, y + h));
      ctx.stroke();
    }
  }

  ctx.fillStyle = "#72cb3b";
  ctx.fillRect(x, y, w, 16);

  ctx.fillStyle = "#a2ef56";
  ctx.fillRect(x, y, w, 4);

  ctx.fillStyle = "#72cb3b";
  for (let px = x; px < x + w; px += 12) {
    ctx.beginPath();
    ctx.moveTo(px, y + 16);
    ctx.lineTo(px + 6, y + 23);
    ctx.lineTo(px + 12, y + 16);
    ctx.fill();
  }
}

function drawItemBlock(block) {
  const x = block.x - cameraX;
  const y = block.y;
  const s = block.size;

  ctx.fillStyle = "#f88c38";
  ctx.fillRect(x, y, s, s);

  ctx.fillStyle = "#fcd078";
  ctx.fillRect(x, y, s, 4);
  ctx.fillRect(x, y, 4, s);

  ctx.fillStyle = "#a84010";
  ctx.fillRect(x + s - 4, y, 4, s);
  ctx.fillRect(x, y + s - 4, s, 4);

  ctx.strokeStyle = "#401808";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, s, s);

  ctx.fillStyle = "#401808";
  ctx.fillRect(x + 6, y + 6, 3, 3);
  ctx.fillRect(x + s - 9, y + 6, 3, 3);
  ctx.fillRect(x + 6, y + s - 9, 3, 3);
  ctx.fillRect(x + s - 9, y + s - 9, 3, 3);
}

function drawDecorations() {
  for (const dec of decorations) {
    const x = dec.x - cameraX * 0.9;
    const baseY = groundY;
    const s = dec.scale;

    ctx.fillStyle = "#48a028";
    ctx.beginPath();
    ctx.arc(x, baseY - 15 * s, 25 * s, 0, Math.PI * 2);
    ctx.arc(x - 22 * s, baseY - 10 * s, 18 * s, 0, Math.PI * 2);
    ctx.arc(x + 22 * s, baseY - 10 * s, 18 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#205010";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawCheckpoint() {
  const x = 500 - cameraX;
  const y = groundY - 80;
  ctx.fillStyle = "#404040";
  ctx.fillRect(x, y, 6, 80);
  ctx.fillStyle = "#ff3b30";
  ctx.beginPath();
  ctx.moveTo(x + 6, y);
  ctx.lineTo(x + 45, y + 18);
  ctx.lineTo(x + 6, y + 36);
  ctx.closePath();
  ctx.fill();
}

function drawFinish() {
  const x = 2400 - cameraX;
  const y = groundY - 100;
  ctx.fillStyle = "#404040";
  ctx.fillRect(x, y, 8, 100);
  ctx.fillStyle = "#ff9500";
  ctx.beginPath();
  ctx.moveTo(x + 8, y);
  ctx.lineTo(x + 65, y + 20);
  ctx.lineTo(x + 8, y + 40);
  ctx.closePath();
  ctx.fill();
}

function drawEnemy(enemy) {
  const image = bahlilWalkImages[enemy.walkFrame];
  if (!image || !image.complete || image.naturalWidth <= 0) return;

  ctx.save();
  if (enemy.direction === -1) {
    ctx.translate(enemy.x - cameraX + enemy.width, enemy.y);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(enemy.x - cameraX, enemy.y);
  }
  ctx.drawImage(image, 0, 0, enemy.width, enemy.height);
  ctx.restore();
}

function drawBahlil() {
  let image = bahlilIdle;
  if (bahlil.state === "attack") image = bahlilAttackImages[bahlil.attackFrame];
  else if (bahlil.state === "hurt") image = bahlilHurtImages[bahlil.hurtFrame];

  if (!image || !image.complete || image.naturalWidth <= 0) return;

  ctx.save();
  if (bahlil.direction === -1) {
    ctx.translate(bahlil.x - cameraX + bahlil.width, bahlil.y);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(bahlil.x - cameraX, bahlil.y);
  }
  ctx.drawImage(image, 0, -15, 75, 80);
  ctx.restore();
}

function drawKafka() {
  let image = kafkaIdle;

  if (cutscenePhase === "kafkaEnter") {
    image = kafkaRunImages[kafka.runFrame];
  } else if (cutscenePhase === "fight") {
    image = kafkaAttackImages[kafkaAttackFrame];
  } else if (cutscenePhase === "endingDialogue") {
    image = kafkaSitFinish;
  } else if (cutscenePhase === "endingWalk") {
    if (!kafka.grounded) {
      image = kafkaJumpImages[kafka.jumpFrame] || kafkaCrouch || kafkaRunImages[0];
    } else if (Math.abs(kafka.velocityX) > 0.1) {
      image = kafkaRunImages[kafka.runFrame];
    } else if (kafkaArrivedAtDoor) {
      image = kafkaSit;
    } else {
      image = kafkaIdle;
    }
  } else if (cutscenePhase === "doorDialogue" || cutscenePhase === "doorOpen" || cutscenePhase === "letter") {
    image = kafkaSit;
  }

  if (!image || !image.complete || image.naturalWidth <= 0) {
    image = kafkaIdle;
  }
  if (!image || !image.complete) return;

  ctx.save();
  if (kafkaFacingLeft) {
    ctx.translate(kafka.x - cameraX + kafka.width, kafka.y);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, 0, kafka.width, kafka.height);
  } else {
    ctx.drawImage(image, kafka.x - cameraX, kafka.y, kafka.width, kafka.height);
  }
  ctx.restore();
}

function drawShayla() {
  let image = shaylaIdle;

  if (shaylaHurt) {
    image = shaylaHurtImages[shaylaHurtFrame];
  } else if (cutscenePhase === "endingDialogue") {
    image = shaylaSitFinish;
  } else if (shaylaSitting) {
    image = shaylaSit;
  } else if (!player.grounded) {
    image = shaylaJumpImages[shaylaJumpFrame];
  } else if (Math.abs(player.velocityX) > 0.5) {
    image = shaylaImages[shaylaFrame];
  }

  if (shaylaAttacking && !shaylaHurt) {
    image = shaylaAttackImages[shaylaAttackFrame];
  }

  if (!image || !image.complete || image.naturalWidth <= 0) return;

  let drawWidth = 60;
  let drawHeight = 65;

  if (shaylaAttacking) {
    drawWidth = 75;
    drawHeight = 65;
  }

  ctx.drawImage(image, player.x - cameraX, player.y, drawWidth, drawHeight);
}

function drawEndingDoor() {
  const x = endingDoorX - cameraX;
  const y = groundY - 145;

  if (doorOpen) {
    ctx.fillStyle = "rgba(255,240,190,0.35)";
    ctx.beginPath();
    ctx.arc(x + 45, y + 70, 90, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#6b4631";
  ctx.fillRect(x, y, 90, 145);

  ctx.fillStyle = doorOpen ? "#d8c39a" : "#8b5a3c";
  ctx.fillRect(x + 10, y + 10, 70, 135);

  ctx.strokeStyle = "#5b3b2a";
  ctx.lineWidth = 4;
  ctx.strokeRect(x + 20, y + 25, 50, 45);
  ctx.strokeRect(x + 20, y + 82, 50, 45);

  ctx.fillStyle = "#e8c86a";
  ctx.beginPath();
  ctx.arc(x + 62, y + 77, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawLetter() {
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const width = 360;
  const height = 240;
  const x = canvas.width / 2 - width / 2;
  const y = canvas.height / 2 - height / 2;

  ctx.fillStyle = "#fff9e8";
  ctx.fillRect(x, y, width, height);

  ctx.strokeStyle = "#d8c49a";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, width, height);

  ctx.fillStyle = "#ff8fb8";
  ctx.font = "32px Arial";
  ctx.textAlign = "center";
  ctx.fillText("♡", canvas.width / 2, y + 45);

  ctx.fillStyle = "#4b4038";
  ctx.font = "18px Arial";
  ctx.fillText("BABYY HAHAHA", canvas.width / 2, y + 85);

  ctx.font = "15px Arial";
  ctx.fillText("Gimana?? seru gaa?", canvas.width / 2, y + 125);
  ctx.fillText("Maaf sedikit ada kesalahan", canvas.width / 2, y + 150);
  ctx.fillText("— Kafka, suratnya terpisahh", canvas.width / 2, y + 195);

  ctx.textAlign = "left";
  cutscenePhase = "done";
}

function drawUI() {
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "16px Arial";
  ctx.fillText("← → / A D  Move", 20, 30);
  ctx.fillText("SPACE / W  Jump", 20, 55);
  ctx.fillText("J  Attack", 20, 80);
}

function gameLoop() {
  update();
  updateCamera();
  draw();
  requestAnimationFrame(gameLoop);
}

canvas.style.display = "none";