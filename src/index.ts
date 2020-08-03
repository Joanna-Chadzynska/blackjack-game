import './components/footer';
import './sass/index.scss';
import { shuffleCards } from './components/Cards';
import { Game } from './components/Game';
import { Deck as IDeck } from './interfaces/Deck';

const startBtn = document.getElementById('btn__start')!;
const hitBtn = document.getElementById('btn__hit')!;
const stayBtn = document.getElementById('btn__stay')!;
// const deckCount = document.getElementById('deckCount')!;

let pile: IDeck;

const game = new Game();

const setDeck = async () => {
	const deck = await shuffleCards().then((resp) => resp);
	pile = await deck;
	return pile;
};

setDeck();

const startGame = async (_e: Event) => {
	document.getElementById('btn__start')!.innerHTML = 'Restart';
	document.getElementById('status')!.style.display = 'none';

	game.currentPlayer;
	game.createPlayers(2);
	game.createPlayersUI();
	game.dealHands(pile.deck_id);

	document
		.getElementById(`player_${game.currentPlayer}`)!
		.classList.add('active');
};

startBtn.addEventListener('click', startGame);

hitBtn.addEventListener('click', () => {
	console.log('hit me');
	game.hitMe(pile.deck_id);
});

stayBtn.addEventListener('click', () => {
	console.log('stay');
});
