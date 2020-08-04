import axios from 'axios';
import { Deck } from '../interfaces/Deck';
import { Response as IResponse } from '../interfaces/Response';
import { Card } from '../interfaces/Card';

export const drawCard = async (
	deck_id: string,
	countNr: number
): Promise<IResponse> => {
	// let userDeck: Response;
	let card: any;
	let cards: Card[] = [];

	try {
		const response = (
			await axios.get(
				`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${countNr}`
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
};

export const getDeckDetails = async (deckId: string): Promise<Deck> => {
	const response = await axios.get(
		`https://deckofcardsapi.com/api/deck/${deckId}`
	);
	const data = await response.data;

	return data;
};
