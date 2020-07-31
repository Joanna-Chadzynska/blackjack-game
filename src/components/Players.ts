import { Player } from '../interfaces/Player';
import { Card } from '../interfaces/Card';
// import { Response as IResponse } from '../interfaces/Response';
import { Player as IPlayer } from '../interfaces/Player';
import { drawCard, getDeckDetails } from '../components/Cards';

export class Players {
	public players: Player[];
	constructor() {
		this.players = new Array();
	}

	createPlayers(num: number) {
		for (let i = 1; i <= num; i++) {
			let hand: Card[] = new Array();
			let player: IPlayer = {
				name: `Player${i}`,
				id: i,
				points: 0,
				hand: hand,
			};
			this.players.push(player);
		}
		return this.players;
	}

	async dealHands(deckId: string) {
		for (let player of this.players) {
			const cards = (await drawCard(deckId, 2)).cards;

			player.hand = cards;
			player.points = this.getPoints(player.hand);

			for (let i = 0; i < player.hand.length; i++) {
				let img = player.hand[i].image;
				this.renderCard(img, player.id - 1);
			}

			this.updatePoints();
		}

		return this.players;
	}

	renderCard(card: string, player: number) {
		const hand = document.getElementById(`hand_${player}`)!;

		const image = this.getCardUI(card);
		if (hand !== null) {
			hand.appendChild(image);
		}
	}

	getCardUI(card: string) {
		const image = document.createElement('img')!;
		image.className = 'card';
		image.src = card;
		return image;
	}

	getPoints(playerHand: Card[]) {
		const result = playerHand.reduce((a, b) => a + b.weight, 0);
		return result;
	}

	updatePoints() {
		for (let i = 0; i < this.players.length; i++) {
			document.getElementById(
				`points_${i}`
			)!.innerHTML = `${this.players[i].points}`;
		}
	}

	updateDeck(deckId: string) {
		getDeckDetails(deckId);
	}

	createPlayersUI() {
		document.getElementById('players')!.innerHTML = '';

		for (let i = 0; i < this.players.length; i++) {
			const div_player = document.createElement('div')!;
			const div_playerId = document.createElement('div')!;
			const div_hand = document.createElement('div')! as HTMLDivElement;
			const div_points = document.createElement('div')!;

			div_points.className = 'points';
			div_points.id = `points_${i}`;
			div_player.className = 'player';
			div_player.id = `player_${i}`;
			div_hand.id = `hand_${i}`;
			div_hand.className = `hand`;

			div_playerId.innerHTML = `Player ${this.players[i].id}`;
			div_player.appendChild(div_playerId);
			div_player.appendChild(div_hand);
			div_player.appendChild(div_points);
			document.getElementById('players')!.appendChild(div_player);
		}
	}
}
