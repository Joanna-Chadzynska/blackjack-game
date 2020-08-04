import './sass/index.scss';

import { Game } from './components/Game';

const startBtn = document.getElementById('btn__start')!;

const startGame = () => {
	let game = new Game();
	game.startGame();
};

startBtn.addEventListener('click', startGame);
