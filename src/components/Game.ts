import { Player } from '../interfaces/Player';
import { Card } from '../interfaces/Card';
// import { Response as IResponse } from '../interfaces/Response';
import { Player as IPlayer } from '../interfaces/Player';
import { drawCard, getDeckDetails } from './Cards';

export class Game {
	public players: Player[];
	public currentPlayer: number;
	public deckCount: HTMLDivElement;

	constructor() {
		this.players = new Array();
		this.currentPlayer = 0;
		this.deckCount = document.getElementById('deckCount')! as HTMLDivElement;
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
		this.updateDeck(deckId);
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

	async hitMe(deckId: string) {
		const newCard: Card = (await drawCard(deckId, 1)).cards[0];
		getDeckDetails(deckId);
		let currentPlayer = this.players[this.currentPlayer];

		currentPlayer.hand.push(newCard);
		currentPlayer.points = this.getPoints(currentPlayer.hand);
		this.renderCard(newCard.image, this.currentPlayer);
		this.updatePoints();
		this.checkWin();
		this.updateDeck(deckId);
	}

	checkWin() {
		const status = document.getElementById('status')!;
		if (this.players[this.currentPlayer].points >= 22) {
			status.innerHTML = `Player: ${this.players[this.currentPlayer].id} LOST`;
			status.style.display = 'inline-block';
			// this.endGame();
		}
	}

	endGame() {
		let winner = -1;
		let score = 0;

		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].points > score && this.players[i].points <= 22) {
				winner = i;
			}

			score = this.players[i].points;
		}

		document.getElementById(
			'status'
		)!.innerHTML = `Winner: Player${this.players[winner].id}`;
		document.getElementById('status')!.style.display = 'inline-block';
	}

	async updateDeck(deckId: string) {
		let deckRemaining = await getDeckDetails(deckId);
		this.deckCount.innerHTML = `${deckRemaining.remaining}`;
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
