import { Player } from '../interfaces/Player';
import { Card } from '../interfaces/Card';
import { Player as IPlayer } from '../interfaces/Player';
import { drawCard, getDeckDetails } from './Cards';
import { Pile } from './Pile';
import { Autobind } from '../decorators/autobind';

export class Game {
	public deck: Pile;
	public players: Player[];
	public currentPlayer: number;
	public deckCount: HTMLDivElement;
	public status: HTMLDivElement;
	public startBtn: HTMLElement;
	public hitBtn: void;
	public stayBtn: void;

	public constructor() {
		this.players = new Array();
		this.currentPlayer = 0;
		this.deckCount = document.getElementById('deckCount')! as HTMLDivElement;
		this.status = document.getElementById('status')! as HTMLDivElement;
		this.startBtn = document.getElementById('btn__start')!;
		this.hitBtn = document
			.getElementById('btn__hit')!
			.addEventListener('click', this.hitMe.bind(this));
		this.stayBtn = document
			.getElementById('btn__stay')!
			.addEventListener('click', this.stay.bind(this));
		this.deck = new Pile();
	}

	async startGame() {
		this.startBtn.innerHTML = `Restart`;
		this.status.style.display = 'none';
		await this.deck.createAndShuffleDeck();
		this.currentPlayer;
		this.createPlayers(2);
		this.createPlayersUI();
		this.dealHands();
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
	}

	async dealHands() {
		const deckId = this.deck.deck.deck_id;
		// alternate handing cards to each player
		// 2 cards each
		for (let player of this.players) {
			const cards = (await drawCard(deckId, 2)).cards;
			player.hand = cards;
			player.points = this.getPoints(player.hand);

			player.hand.forEach((el) => this.renderCard(el.image, player.id - 1));

			this.updatePoints();
		}

		this.updateDeck();
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

	@Autobind
	async hitMe() {
		const newCard: Card = (await drawCard(this.deck.deck.deck_id, 1)).cards[0];
		let currentPlayer = this.players[this.currentPlayer];

		currentPlayer.hand.push(newCard);
		currentPlayer.points = this.getPoints(currentPlayer.hand);
		this.renderCard(newCard.image, this.currentPlayer);
		this.updatePoints();
		this.checkWin();
		this.updateDeck();
	}

	@Autobind
	stay() {
		// move to next player, if any
		if (this.currentPlayer !== this.players.length - 1) {
			document
				.getElementById(`player_${this.currentPlayer}`)!
				.classList.remove('active');
			this.currentPlayer += 1;
			document
				.getElementById(`player_${this.currentPlayer}`)!
				.classList.add('active');
		} else {
			console.log('end');
		}
	}

	checkWin() {
		if (this.players[this.currentPlayer].points >= 22) {
			this.status.innerHTML = `Player: ${
				this.players[this.currentPlayer].id
			} LOST`;
			this.status.style.display = 'inline-block';
			// end game
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

	async updateDeck() {
		let deckRemaining = await getDeckDetails(this.deck.deck.deck_id);
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
