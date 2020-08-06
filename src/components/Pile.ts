import axios from 'axios';
import { Card } from '../interfaces/Card';
import { Deck } from '../interfaces/Deck';
import { Response } from '../interfaces/Response';

export class Pile {
	public deck: Deck;
	private readonly deckCount: HTMLDivElement;

	public constructor() {
		this.deck = {} as Deck;
		this.deckCount = document.getElementById('deckCount')! as HTMLDivElement;
	}

	public async createAndShuffleDeck(): Promise<Deck> {
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

	public async drawCard(deckId: string, count: number): Promise<Response> {
		let card: any;
		let cards: Card[] = [];

		try {
			const response = (
				await axios.get(
					`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
				)
			).data;

			for (let i of response.cards) {
				let weight = Number(i.value);

				if (i.value === 'JACK') {
					weight = 2;
				}
				if (i.value === 'QUEEN') {
					weight = 3;
				}
				if (i.value === 'KING') {
					weight = 4;
				}
				if (i.value === 'ACE') {
					weight = 11;
				}

				card = { ...i, weight };
				cards.push(card);
			}

			return { ...response, cards };
		} catch (error) {
			return error;
		}
	}

	public async getDeckDetails(deckId: string): Promise<Deck> {
		try {
			const response = (
				await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}`)
			).data;
			return response;
		} catch (error) {
			return error;
		}
	}

	private getCardUI(card: string) {
		const image = document.createElement('img')!;
		image.className = 'card';
		image.src = card;
		return image;
	}

	public renderCard(card: string, player: number) {
		const hand = document.getElementById(`hand_${player}`)!;

		const image = this.getCardUI(card);
		if (hand !== null) {
			hand.appendChild(image);
		}
	}

	public async updateDeck(deckId: string) {
		let deckRemaining = await this.getDeckDetails(deckId);
		this.deckCount.innerHTML = `${deckRemaining.remaining}`;
	}
}
