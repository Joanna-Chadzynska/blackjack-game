import { Card } from '../interfaces/Card';
import { Pile } from './Pile';
import { Players } from './Players';

export class Game {
	public deck: Pile;
	public players: Players;
	public currentPlayer: number;
	private readonly status: HTMLDivElement;
	private startBtn: HTMLElement;
	public hitBtn: void;
	public stayBtn: void;

	public constructor() {
		this.players = new Players();
		this.currentPlayer = 0;
		this.deck = new Pile();

		this.status = document.getElementById('status')! as HTMLDivElement;
		this.startBtn = document.getElementById('btn__start')!;
		this.hitBtn = document
			.getElementById('btn__hit')!
			.addEventListener('click', async () => {
				await this.hitMe();
			});
		this.stayBtn = document
			.getElementById('btn__stay')!
			.addEventListener('click', this.stay.bind(this));
	}

	public async startGame(numOfPlayers: number) {
		this.startBtn.innerHTML = `Restart`;
		this.status.style.display = 'none';
		await this.deck.createAndShuffleDeck();

		// set deck id to local storage
		localStorage.setItem('deckId', this.deck.deck.deck_id);

		// create and render players

		this.players.createPlayers(numOfPlayers);
		this.players.createPlayersUI();

		// deal cards for each player
		await this.dealHands();

		document
			.getElementById('player_' + this.currentPlayer)!
			.classList.add('active');
	}

	private async dealHands() {
		if (
			localStorage.getItem('players') !== this.players.players.length.toString()
		)
			return;

		const deckId = this.deck.deck.deck_id;

		// alternate handing cards to each player
		// 2 cards each

		for (let player of this.players.players) {
			const cards = (await this.deck.drawCard(deckId, 2)).cards;
			player.hand = cards;
			player.points = this.getPoints(player.hand);

			player.hand.forEach((el) =>
				this.deck.renderCard(el.image, player.id - 1)
			);

			this.updatePoints();
		}

		this.deck.updateDeck(this.deck.deck.deck_id);
	}

	private getPoints(playerHand: Card[]) {
		const result = playerHand.reduce((a, b) => a + b.weight, 0);
		return result;
	}

	private updatePoints() {
		for (let i = 0; i < this.players.players.length; i++) {
			document.getElementById(
				`points_${i}`
			)!.innerHTML = `${this.players.players[i].points}`;
		}
	}

	private async hitMe() {
		if (this.deck.deck.deck_id === localStorage.getItem('deckId')) {
			const getCards = await this.deck.drawCard(this.deck.deck.deck_id, 1);
			const newCard: Card = getCards.cards[0];
			const currentPlayer = this.players.players[this.currentPlayer];

			currentPlayer.hand.push(newCard);
			currentPlayer.points = this.getPoints(currentPlayer.hand);

			this.deck.renderCard(newCard.image, this.currentPlayer);
			this.updatePoints();
			this.deck.updateDeck(this.deck.deck.deck_id);
			this.checkWin();
		} else {
			return;
		}
	}

	private stay() {
		// move to next player, if any
		if (this.currentPlayer !== this.players.players.length - 1) {
			document
				.getElementById(`player_${this.currentPlayer}`)!
				.classList.remove('active');
			this.currentPlayer += 1;
			document
				.getElementById(`player_${this.currentPlayer}`)!
				.classList.add('active');
		} else {
			this.endGame();
		}
	}

	private checkWin() {
		if (this.players.players[this.currentPlayer].points > 21) {
			this.status.innerHTML = `Player: ${
				this.players.players[this.currentPlayer].id
			} LOST`;
			this.status.style.display = 'inline-block';
			this.stay();
		}
	}

	private endGame() {
		let winner = -1;
		let score = 0;

		for (let i = 0; i < this.players.players.length; i++) {
			// let previous = this.players[i - 1];
			let current = this.players.players[i];
			// let next = this.players[i + 1];

			if (current.points > score && current.points < 22) {
				winner = i;
			}

			score = this.players.players[i].points;
		}

		if (
			score < 22 &&
			this.players.players[this.currentPlayer].points ===
				this.players.players[this.currentPlayer - 1].points
		) {
			this.status.innerHTML = 'Draw!';
			this.status.style.display = 'inline-block';
		} else {
			this.status.innerHTML = `Winner: Player ${this.players.players[winner].id}`;
			this.status.style.display = 'inline-block';
		}
	}
}
