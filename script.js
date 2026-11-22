
// =====================================
// 🌍 KIDDOLAND - LANGUAGE SWITCHING
// =====================================

const languageSelect = document.getElementById("language");

if (languageSelect) {
    languageSelect.addEventListener("change", function () {
        const language = languageSelect.value;

        document.documentElement.lang = language;

        document.querySelectorAll("[data-uz][data-en]").forEach(function(element) {
            element.textContent = element.getAttribute("data-" + language);
        });

        updateAgeMessage();
    });
}


// =====================================
// 👶 AGE SELECTION
// =====================================

let selectedAge = "";

const ageCards = document.querySelectorAll(".age-card");
const ageMessage = document.getElementById("age-message");

ageCards.forEach(function(card) {
    card.addEventListener("click", function() {
        selectedAge = card.dataset.age;

        ageCards.forEach(function(item) {
            item.classList.remove("selected");
        });

        card.classList.add("selected");

        updateAgeMessage();
    });
});

function updateAgeMessage() {
    if (!selectedAge || !ageMessage) return;

    const language = languageSelect ? languageSelect.value : "uz";

    if (language === "uz") {
        ageMessage.textContent =
            "🎉 Siz " + selectedAge + " yosh guruhini tanladingiz! Darslar siz uchun tayyor!";
    } else {
        ageMessage.textContent =
            "🎉 You selected the " + selectedAge + " age group! Your lessons are ready!";
    }
}

console.log("🌈 Welcome to KiddoLand!");


// =====================================
// 📚 SUBJECT CARD INTERACTIONS
// =====================================

document.querySelectorAll("#subjects .card").forEach(function(card) {
    card.addEventListener("click", function() {
        alert("Welcome to " + card.textContent.trim() + "! 🎉");
    });
});


// =====================================
// ⭐ KIDDOLAND STAR & LEVEL SYSTEM
// =====================================

let playerStars = Number(localStorage.getItem("playerStars")) || 0;

let totalEarnedStars = Number(
    localStorage.getItem("totalEarnedStars") ?? playerStars
);

function updateLevel() {
    const level = Math.floor(totalEarnedStars / 100) + 1;

    const oldLevel = Number(localStorage.getItem("lastLevel")) || 1;

    if (level > oldLevel) {
        showLevelUp(level);
    }

    localStorage.setItem("lastLevel", level);

    const progress = totalEarnedStars % 100;

    const starsElement = document.getElementById("player-stars");
    const levelElement = document.getElementById("player-level");
    const progressElement = document.getElementById("level-progress");
    const messageElement = document.getElementById("level-message");

    if (starsElement) starsElement.textContent = playerStars;
    if (levelElement) levelElement.textContent = level;

    if (progressElement) {
        progressElement.style.width = progress + "%";
    }

    if (messageElement) {
        messageElement.textContent =
            "Keyingi Level uchun yana " + (100 - progress) + " ⭐ kerak!";
    }

    localStorage.setItem("playerStars", playerStars);
    localStorage.setItem("totalEarnedStars", totalEarnedStars);

    updateShopStars();
}

function addStars(amount) {
    playerStars += amount;
    totalEarnedStars += amount;

    updateLevel();
}


// =====================================
// 🎉 LEVEL UP POPUP
// =====================================

function showLevelUp(level) {
    const popup = document.createElement("div");

    popup.className = "level-popup";

    popup.innerHTML = `
        <div class="level-popup-card">
            <h1>🎉 LEVEL UP! 🎉</h1>
            <h2>🏆 LEVEL ${level} 🏆</h2>
            <div class="gift">🎁🌟🎁</div>
            <p>Ajoyib! Sen yangi darajaga chiqding!</p>
            <button id="close-level-popup">
                DAVOM ETISH 🚀
            </button>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("close-level-popup").addEventListener("click", function() {
        popup.remove();
    });
}


// =====================================
// 🎮 MATH CHALLENGE
// =====================================

let mathScore = 0;
let correctAnswer = 0;
let questionAnswered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const messageElement = document.getElementById("game-message");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-question");

function generateQuestion() {
    if (!questionElement || !answersElement || !messageElement || !nextButton) return;

    questionAnswered = false;
    nextButton.disabled = true;

    const number1 = Math.floor(Math.random() * 10) + 1;
    const number2 = Math.floor(Math.random() * 10) + 1;

    correctAnswer = number1 + number2;

    questionElement.textContent =
        number1 + " + " + number2 + " = ?";

    messageElement.textContent = "Javobingizni tanlang!";

    answersElement.innerHTML = "";

    let options = [correctAnswer];

    while (options.length < 4) {
        let randomAnswer = Math.floor(Math.random() * 20) + 1;

        if (!options.includes(randomAnswer)) {
            options.push(randomAnswer);
        }
    }

    options.sort(() => Math.random() - 0.5);

    options.forEach(function(answer) {
        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "answer-option";

        button.addEventListener("click", function() {
            if (questionAnswered) return;

            questionAnswered = true;

            const allButtons = answersElement.querySelectorAll("button");

            allButtons.forEach(function(item) {
                item.disabled = true;

                const itemAnswer = Number(item.textContent);

                if (itemAnswer === correctAnswer) {
                    item.classList.add("correct");
                }

                if (item === button && itemAnswer !== correctAnswer) {
                    item.classList.add("wrong");
                }
            });

            if (answer === correctAnswer) {
                mathScore++;

                addStars(10);

                messageElement.textContent = "🎉 Ajoyib! To‘g‘ri javob! +10 ⭐";
            } else {
                messageElement.textContent =
                    "😊 Bu noto‘g‘ri. To‘g‘ri javob: " + correctAnswer;
            }

            if (scoreElement) {
                scoreElement.textContent = "⭐ Ball: " + mathScore;
            }

            nextButton.disabled = false;
        });

        answersElement.appendChild(button);
    });
}

if (nextButton) {
    nextButton.addEventListener("click", function() {
        generateQuestion();
    });
}

generateQuestion();


// =====================================
// 👤 KIDDOLAND PROFILE
// =====================================

let selectedAvatar = localStorage.getItem("playerAvatar") || "🐼";

const avatarButtons = document.querySelectorAll(".avatar-option");
const selectedAvatarElement = document.getElementById("selected-avatar");
const playerNameInput = document.getElementById("player-name");
const saveProfileButton = document.getElementById("save-profile");
const welcomePlayer = document.getElementById("welcome-player");

avatarButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        selectedAvatar = button.textContent.trim();

        if (selectedAvatarElement) {
            selectedAvatarElement.textContent = selectedAvatar;
        }
    });
});

if (saveProfileButton) {
    saveProfileButton.addEventListener("click", function() {
        const playerName = playerNameInput.value.trim();

        if (playerName === "") {
            alert("Iltimos, ismingizni yozing!");
            return;
        }

        if (welcomePlayer) {
            welcomePlayer.textContent =
                "Salom, " + playerName + "! " + selectedAvatar;
        }

        localStorage.setItem("playerName", playerName);
        localStorage.setItem("playerAvatar", selectedAvatar);
    });
}

const savedName = localStorage.getItem("playerName");

if (savedName) {
    if (playerNameInput) {
        playerNameInput.value = savedName;
    }

    if (welcomePlayer) {
        welcomePlayer.textContent =
            "Salom, " + savedName + "! " + selectedAvatar;
    }
}

if (selectedAvatarElement) {
    selectedAvatarElement.textContent = selectedAvatar;
}


// =====================================
// 🦄 AVATAR SHOP SYSTEM
// =====================================

let ownedAvatars = JSON.parse(
    localStorage.getItem("ownedAvatars") || "[]"
);

// Hozirgi avatar ham o'quvchiga tegishli
if (!ownedAvatars.includes(selectedAvatar)) {
    ownedAvatars.push(selectedAvatar);
}

function updateShopStars() {
    const shopStars = document.getElementById("shop-stars");

    if (shopStars) {
        shopStars.textContent = playerStars;
    }
}

function updateShopButtons() {
    document.querySelectorAll(".shop-item").forEach(function(item) {
        const avatarElement = item.querySelector(".shop-avatar");
        const button = item.querySelector("button");

        if (!avatarElement || !button) return;

        const avatar = avatarElement.textContent.trim();

        if (ownedAvatars.includes(avatar)) {
            button.textContent = "Sotib olingan ✓";
            button.disabled = true;
        } else {
            button.textContent = "Sotib olish";
            button.disabled = false;
        }
    });
}

function buyAvatar(avatar, price) {
    if (ownedAvatars.includes(avatar)) {
        alert("Bu avatar sizda allaqachon bor! 😊");
        return;
    }

    if (playerStars < price) {
        alert("Yulduzlaringiz yetarli emas! ⭐");
        return;
    }

    playerStars -= price;

    ownedAvatars.push(avatar);

    localStorage.setItem("ownedAvatars", JSON.stringify(ownedAvatars));
    localStorage.setItem("playerStars", playerStars);

    selectedAvatar = avatar;

    localStorage.setItem("playerAvatar", selectedAvatar);

    if (selectedAvatarElement) {
        selectedAvatarElement.textContent = avatar;
    }

    const playerName = localStorage.getItem("playerName");

    if (playerName && welcomePlayer) {
        welcomePlayer.textContent =
            "Salom, " + playerName + "! " + avatar;
    }

    updateLevel();
    updateShopButtons();

    alert("🎉 Tabriklaymiz! Yangi avatar sotib olindi! " + avatar);
}


// =====================================
// 🚀 START KIDDOLAND
// =====================================

localStorage.setItem("ownedAvatars", JSON.stringify(ownedAvatars));

updateLevel();
updateShopStars();
updateShopButtons();

console.log("🚀 KiddoLand is ready!");
