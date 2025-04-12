const gameBoard = document.getElementById('gameBoard');
const startButton = document.getElementById('startGame');
const scoreElement = document.getElementById('score');

// Passover-themed images for the game
const passoverImages = [
    { src: 'https://dizzywine.co.il/wp-content/uploads/2022/10/1EBB8522-0FC0-4F61-929D-5DDDEBA9174C-1.png', name: 'כוס יין' },
    { src: 'https://chabadcarmeigat.org.il/wp-content/uploads/2020/03/56368741_555374338285684_2024991562970169344_n-300x300.png', name: 'מצה' },
    { src: 'https://images.kikar.co.il/cdn-cgi/image/format=jpeg,fit=contain,width=1200/2020/09/02/74307f30-01d2-11ef-8590-ed85b6ab3b94__h720_w1096.png', name: 'ביצה' },
    { src: 'https://www.naturopedia.com/uploads/img1456102162014.png', name: 'כרפס' },
    { src: 'https://cdn.shopify.com/s/files/1/0060/1466/4807/files/51_1024x1024.png', name: 'מלח' },
    { src: 'https://sforno.co.il/wp-content/uploads/%D7%94%D7%A1%D7%A4%D7%A8%D7%95%D7%94%D7%A9%D7%93%D7%A8%D7%94-copy-2-%D7%A2%D7%95%D7%AA%D7%A7.png', name: 'הגדה' },
    { src: 'https://www.pascalpr.co.il/wp-content/uploads/%D7%97%D7%A8%D7%95%D7%A1%D7%AA-%D7%90%D7%99%D7%99%D7%9C%D7%A7-696x466.png', name: 'חרוסת' },
    { src: 'https://www.dagim-batyam.co.il/wp-content/uploads/2020/11/%D7%9B%D7%92%D7%94%D7%9B%D7%94%D7%92%D7%A0.png', name: 'חזרת' },
    { src: 'https://mesibalend.co.il/wp-content/uploads/images/9c5224f0-fe57-11ef-85eb-5ad776fc2364.png', name: 'אפיקומן' },
    { src: 'https://foodgroups.co.il/wp-content/uploads/2024/03/chichen-thigh.png', name: 'עוף' }
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let canFlip = true;

// Create a pair of each image
function createCardPairs() {
    return [...passoverImages, ...passoverImages];
}

// Shuffle the cards
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create the game board
function createGameBoard() {
    gameBoard.innerHTML = '';
    cards = shuffleCards(createCardPairs());
    matchedPairs = 0;
    score = 0;
    updateScore();
    flippedCards = [];
    canFlip = true;

    cards.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.src = image.src;
        card.dataset.name = image.name;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip a card
function flipCard() {
    if (!canFlip || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    const img = document.createElement('img');
    img.src = this.dataset.src;
    img.alt = this.dataset.name;
    this.innerHTML = '';
    this.appendChild(img);
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        canFlip = false;
        checkMatch();
    }
}

// Check if the flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    const src1 = card1.dataset.src;
    const src2 = card2.dataset.src;

    if (src1 === src2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        score += 10;
        updateScore();
        
        if (matchedPairs === passoverImages.length) {
            setTimeout(() => {
                alert('כל הכבוד! סיימת את המשחק!');
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '';
            card2.innerHTML = '';
        }, 1000);
    }

    setTimeout(() => {
        flippedCards = [];
        canFlip = true;
    }, 1000);
}

// Update the score display
function updateScore() {
    scoreElement.textContent = score;
}

// Start a new game
startButton.addEventListener('click', createGameBoard);

// Initialize the game
createGameBoard(); 