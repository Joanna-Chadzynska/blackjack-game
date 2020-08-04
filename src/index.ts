import './sass/index.scss';

import { Game } from './components/Game';

const startBtn = document.getElementById('btn__start')!;

let game = new Game();

const startGame = () => {
	game.startGame();
};

startBtn.addEventListener('click', startGame);
