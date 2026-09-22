let player = {
    name: "",
    inventory: []
};

const artifacts = {
    book: "📖 Книга Первой Двери",
    deepstone: "💎 Deepstone",
    heart: "❤️ Сердце Архива",
    door: "🚪 Дверь Неизвестности"
};

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

function startCharacterCreation() {
    showScreen("character");

    setTimeout(() => {
        document.getElementById("playerName").focus();
    }, 100);
}

function createCharacter() {
    const input = document.getElementById("playerName");
    const name = input.value.trim();

    if (!name) {
        showMessage("Архив не может зарегистрировать персонажа без имени.");
        return;
    }

    player.name = name;

    document.getElementById("playerDisplay").textContent =
        "👤 " + player.name;

    showScreen("freeMode");

    document.getElementById("worldText").textContent =
        `Добро пожаловать, ${player.name}. Архив открыл для тебя свои двери.`;
}

function startFreeMode() {
    if (!player.name) {
        startCharacterCreation();
        return;
    }

    showScreen("freeMode");
}

function exploreWorld() {
    const events = [
        {
            title: "🌲 Тихое место",
            text: "Ты находишь небольшой участок леса. Вокруг необычно тихо."
        },
        {
            title: "🏚️ Заброшенное здание",
            text: "Ты обнаруживаешь старое здание. Дверь почему-то открыта."
        },
        {
            title: "📚 Старая библиотека",
            text: "Перед тобой появляется библиотека. Среди книг может скрываться что-то интересное..."
        },
        {
            title: "🌫️ Туман",
            text: "Внезапно всё вокруг покрывает густой туман. Через несколько секунд он исчезает."
        },
        {
            title: "👣 Следы",
            text: "На земле появляются странные следы. Они ведут куда-то дальше."
        }
    ];

    const event =
        events[Math.floor(Math.random() * events.length)];

    showEvent(event.title, event.text);

    checkForDeepstone();
    checkForNPC();
}

function waitForEvent() {
    const events = [
        "Ты ждёшь... но ничего не происходит.",
        "Где-то далеко раздаётся странный звук.",
        "Мимо проходит незнакомый человек.",
        "На несколько секунд всё вокруг становится совершенно тихим.",
        "Ты замечаешь движение краем глаза."
    ];

    const text =
        events[Math.floor(Math.random() * events.length)];

    showEvent("⏳ Ожидание", text);

    checkForNPC();
}

function showEvent(title, text) {
    document.getElementById("eventTitle").textContent = title;
    document.getElementById("eventText").textContent = text;

    document.getElementById("eventBox")
        .classList.remove("hidden");
}

function closeEvent() {
    document.getElementById("eventBox")
        .classList.add("hidden");
}

function showMessage(text) {
    document.getElementById("messageText").textContent = text;

    document.getElementById("message")
        .classList.remove("hidden");
}

function closeMessage() {
    document.getElementById("message")
        .classList.add("hidden");
}

function showInventory() {
    showScreen("inventory");

    const list = document.getElementById("inventoryList");

    if (player.inventory.length === 0) {
        list.textContent = "Пока здесь пусто.";
        return;
    }

    list.innerHTML = player.inventory
        .map(item => `<p>${item}</p>`)
        .join("");
}

/* =========================
   DEEPSTONE
   ========================= */

function checkForDeepstone() {

    // 0.001% шанс
    const chance = Math.random();

    if (chance < 0.00001) {

        if (!player.inventory.includes(artifacts.deepstone)) {

            player.inventory.push(artifacts.deepstone);

            showMessage(
                "💎 НЕВЕРОЯТНО!\n\n" +
                "Ты нашёл Deepstone.\n\n" +
                "Шанс обнаружить его здесь был всего 0,001%."
            );
        }
    }
}

/* =========================
   СЛУЧАЙНЫЙ NPC
   ========================= */

function checkForNPC() {

    // NPC появляется случайно.
    // Вероятность события сейчас 20%.
    if (Math.random() < 0.20) {

        setTimeout(() => {

            showEvent(
                "🎭 Незнакомец",
                "Из ниоткуда появляется странный NPC. " +
                "Он смотрит на тебя несколько секунд..."
            );

            checkForSecretSong();

        }, 500);
    }
}

/* =========================
   СЕКРЕТНАЯ ПЕСНЯ
   ========================= */

function checkForSecretSong() {

    // 10% шанс именно секретной песни.
    if (Math.random() < 0.10) {

        showMessage(
            "🎵 ПАСХАЛКА\n\n" +
            "Незнакомец начинает петь странную песню...\n\n" +
            "Эта песня связана с тайной Архива."
        );

    } else {

        showMessage(
            "🎵 NPC тихо напевает неизвестную мелодию..."
        );
    }
}


/* =========================
   СТАРТ
   ========================= */

console.log("АРХИВ запущен.");
console.log("Система готова.");
