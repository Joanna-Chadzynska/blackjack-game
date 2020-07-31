import './components/footer';
import './sass/index.scss';
import { shuffleCards } from './components/Cards';
import { Players } from './components/Players';
import { Deck as IDeck } from './interfaces/Deck';

const startBtn = document.getElementById('btn__start')!;
const hitBtn = document.getElementById('btn__hit')!;
const stayBtn = document.getElementById('btn__stay')!;

let pile: IDeck;
let currentPlayer = 0;
const players = new Players();

const setDeck = async () => {
	const deck = await shuffleCards().then((resp) => resp);
	pile = await deck;
	return pile;
};

const startGame = async (_e: Event) => {
	document.getElementById('btn__start')!.innerHTML = 'Restart';
	document.getElementById('status')!.style.display = 'none';
	await setDeck();
	currentPlayer = 0;
	players.createPlayers(2);
	players.createPlayersUI();
	players.dealHands(pile.deck_id);

	document.getElementById(`player_${currentPlayer}`)!.classList.add('active');
};

startBtn.addEventListener('click', startGame);

hitBtn.addEventListener('click', () => {
	console.log('hit me');
});
stayBtn.addEventListener('click', () => {
	console.log('stay');
});
