import { shuffleCards } from '../components/Cards';
import { Deck } from '../interfaces/Deck';

export class Decks {
	public deck: Deck | null;
	constructor() {
		this.deck = null;
	}

	async createAndShuffleDeck() {
		const data = await shuffleCards().then((resp) => resp);
		this.deck = data;

		return this.deck;
	}
}
