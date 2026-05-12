import Board from "./Board";

const game = document.getElementById('game');
const your_scores = document.querySelector('.your_scores');
const your_failures = document.querySelector('.your_failures');

export default class Game {
    constructor() {
        this.board = new Board();
        this.score = 0;
        this.missed = 0;
        this.fatalScore = 5;
        this.currentIndex = -1;
        this.game = game;

        this.start();
        this.initClickHandler();
    }

    showModal(message) {
        const modal = document.getElementById('gameModal');
        const modalText = document.getElementById('modalText');
        modalText.innerText = message;
        modal.style.display = 'flex';

        document.getElementById('modalBtn').onclick = () => {
            modal.style.display = 'none';
            this.restartGame();
        };
    }
    initClickHandler() {
        this.game.addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (!cell) return;

            const clickedIndex = this.board.cells.indexOf(cell);

            if (clickedIndex === this.currentIndex) {
                ++this.score;
                your_scores.innerText = `Вы попали ${this.score} раз(а)`;
                cell.innerHTML = "";
                this.currentIndex = -1;
            }
        });
    }

    start() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    tick() {
        if (this.currentIndex !== -1) {
            this.missed++;
            your_failures.innerText = `Вы промахнулись ${this.missed} раз(а)`;
        }

        if (this.missed >= this.fatalScore) {
            clearInterval(this.interval);
            this.showModal('Вы проиграли!');
            return;
        }
    
        let newIndex = this.currentIndex;
        while (newIndex === this.currentIndex) {
            newIndex = Math.floor(Math.random() * this.board.boardSize);
        }

        this.currentIndex = newIndex;
        this.board.positionGoblin(newIndex);
    }
    restartGame() {
        clearInterval(this.interval);
        this.score = 0;
        this.missed = 0;
        this.currentIndex = -1;
        your_scores.innerText = 'Вы попали 0 раз(а)';
        your_failures.innerText = 'Вы промахнулись 0 раз(а)';
        this.start();
    }
}