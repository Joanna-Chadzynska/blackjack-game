import './sass/index.scss';

import { Game } from './components/Game';

const startBtn = document.getElementById('btn__start')!;
const modeBtns = [
	...document.querySelectorAll<HTMLButtonElement>('.btn__mode')!,
];
const selectedMode = document.querySelector('.game__selected-mode')!;

const startGame = (players: number) => {
	const game = new Game();
	game.startGame(players);
};

const selectMode = (e: Event) => {
	const mode = (<HTMLButtonElement>e.currentTarget).dataset.mode;
	const modeName = (<HTMLButtonElement>e.currentTarget).innerText;
	selectedMode.classList.add('show');

	document.getElementById(
		'mode__info'
	)!.innerHTML = `Selected mode: ${modeName}`;
	startBtn.addEventListener('click', () => startGame(Number(mode)));
};

modeBtns.forEach((mode) => mode.addEventListener('click', selectMode));
