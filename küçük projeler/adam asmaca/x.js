const word_el = document.getElementById('d');
const popup = document.getElementById('popup');
const message_el = document.getElementById('f');
const wrongLetters_el = document.getElementById('c');
const items = document.querySelectorAll('.b');
const message = document.getElementById('mesaj');
const tekrar = document.getElementById('try');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
    const words = ["araba"];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `).join('')}    
    `;

    const w = word_el.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'win';
    }
}

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `;
    items.forEach((item, index) => {
        const errorCount = wrongLetters.length

        if (index < errorCount) {
            item.style.display = "block ";
        }
        else {
            item.style.display = 'none';
        }
    })
    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        message_el.innerText = 'kaybettin';
    }

}

function displayMessage() {
    message.classList.add("show");

    setTimeout(function () {
        message.classList.remove("show");
    }, 2000);
}

tekrar.addEventListener("click", function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);;

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = " none";
});

window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
            else {
                displayMessage()
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else {
                displayMessage();
            }
        }
    }
});

displayWord() 