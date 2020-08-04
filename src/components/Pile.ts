import { Deck } from '../interfaces/Deck';
import axios from 'axios';

export class Pile {
	public deck: Deck;

	constructor() {
		this.deck = {} as Deck;
	}

	async createAndShuffleDeck(): Promise<Deck> {
		try {
			const response = (
				await axios.get(
					'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
				)
			).data;

			this.deck = response;
			return this.deck;
		} catch (error) {
			return error;
		}
	}
}
