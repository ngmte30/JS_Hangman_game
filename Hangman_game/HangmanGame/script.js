const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const lengthSelector = document.getElementById('length-container')
const startBtn= document.getElementById('start-button')
const entered = document.getElementById('entered-container');
const resultMessage = document.getElementById('result-message');
const stickmanParts= document.querySelectorAll(".stickman-part");
const mainContainer = document.getElementById('main-container');
const keyboardText = document.getElementById('keyboard-text');
const lengthBtn = document.getElementById('start')
var slider = document.getElementById("range");
var output = document.getElementById("outputText");


const words =[
    "activity",
    "actually",
    "although",
    "american",
    "analysis",
    "anything",
    "approach",
    "attorney",
    "audience",
    "behavior",
    "building",
    "business",
    "campaign",
    "computer",
    "congress",
    "consider",
    "consumer",
    "continue",
    "cultural",
    "customer",
    "daughter",
    "decision",
    "democrat",
    "describe",
    "director",
    "discover",
    "economic",
    "election",
    "employee",
    "everyone",
    "evidence",
    "hospital",
    "identify",
    "increase",
    "indicate",
    "industry",
    "interest",
    "language",
    "magazine",
    "maintain",
    "majority",
    "marriage",
    "material",
    "military",
    "movement",
    "national",
    "official",
    "painting",
    "personal",
    "physical",
    "politics",
    "position",
    "positive",
    "possible",
    "practice",
    "pressure",
    "probably",
    "property",
    "question",
    "recently",
    "remember",
    "research",
    "resource",
    "response",
    "security",
    "shoulder",
    "somebody",
    "southern",
    "specific",
    "standard",
    "strategy",
    "suddenly",
    "thousand",
    "together",
    "training",
    "violence",
    "whatever",
    "yourself",
    "according",
    "agreement",
    "attention",
    "authority",
    "available",
    "beautiful",
    "candidate",
    "certainly",
    "challenge",
    "character",
    "community",
    "condition",
    "determine",
    "different",
    "difficult",
    "direction",
    "education",
    "establish",
    "everybody",
    "executive",
    "financial",
    "important",
    "including",
    "interview",
    "knowledge",
    "necessary",
    "newspaper",
    "operation",
    "political",
    "president",
    "professor",
    "recognize",
    "religious",
    "represent",
    "scientist",
    "situation",
    "something",
    "sometimes",
    "statement",
    "structure",
    "treatment",
    "collection",
    "commercial",
    "conference",
    "democratic",
    "difference",
    "discussion",
    "especially",
    "everything",
    "experience",
    "generation",
    "government",
    "individual",
    "investment",
    "management",
    "particular",
    "population",
    "production",
    "republican",
    "successful",
    "technology",
    "television",
    "themselves",
    "throughout",
    "understand",
    "development",
    "environment",
    "information",
    "institution",
    "interesting",
    "opportunity",
    "participant",
    "performance",
    "significant",
    "traditional",
    "organization",
    "particularly",
    "professional",
    "relationship",
    "environmental",
    "international",
    "administration",
    "responsibility"
  ]
  

const textLength = 5;
const selectedWords = [];
var rangeValue;
output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = this.value;
    rangeValue =slider.value;
  }
var selectedWord;
const correctLetters = [];
const wrongLetters = [];
function displayWord(){
    
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;
    const innerWord = wordE1.innerText.replace(/\n/g, '');
    if(innerWord === selectedWord){
        resultMessage.innerText = 'You Won!';
        popup.style.display= 'flex';
    }
}


function updateWrongLetterE1(){
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    stickmanParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });
    if(wrongLetters.length === stickmanParts.length){
        resultMessage.innerText = 'You Lost';
        popup.style.display = 'flex';
    }
}

function showentered(){
    entered.classList.add('show');
    setTimeout(() => {
        entered.classList.remove('show');
    }, 2000);
}


function setLengthOfWord(){
    lengthSelector.style.display='flex';
    mainContainer.style.display='none';
    keyboardText.style.display='none';
}

function gameStart(){
    rangeValue = slider.value;
    words.forEach(item => {
        if(item.length == rangeValue){
            selectedWords.push(item);
        }
    });
    selectedWord = selectedWords[Math.floor(Math.random() * selectedWords.length)];
}
window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            } else{
                showentered();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetterE1();
            } else{
                showentered();
            }
        }
    }
});

playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    setLengthOfWord();
    updateWrongLetterE1();
    popup.style.display = 'none';
    slider.value =8;
    output.innerHTML = 8;
    rangeValue = 8;
});
startBtn.addEventListener('click',() =>{
    gameStart();
    displayWord();
    lengthSelector.style.display='none';
    mainContainer.style.display ='block';
    keyboardText.style.display='block';
})


setLengthOfWord();

