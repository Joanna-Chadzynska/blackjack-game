export class Deck {
	public readonly success: boolean;
	public readonly deck_id: string;
	public readonly shuffled: boolean;
	public readonly remaining: number;

	public constructor(pile: Deck) {
		this.success = pile.success;
		this.deck_id = pile.deck_id;
		this.shuffled = pile.shuffled;
		this.remaining = pile.remaining;
	}
}
