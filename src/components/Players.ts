import { Player } from '../interfaces/Player';
import { Card } from '../interfaces/Card';

export class Players {
	public players: Player[];
	public hand: Card[];
	private readonly playersBoard: HTMLDivElement;

	public constructor() {
		this.players = new Array();
		this.hand = new Array();
		this.playersBoard = document.getElementById('players')! as HTMLDivElement;
	}

	public createPlayers(numberOfPlayers: number) {
		for (let i = 1; i <= numberOfPlayers; i++) {
			const player: Player = {
				name: `Player${i}`,
				id: i,
				points: 0,
				hand: this.hand,
			};

			this.players.push(player);
		}
		return this.players;
	}

	public createPlayersUI() {
		this.playersBoard.innerHTML = '';
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

			this.playersBoard.appendChild(div_player);
		}
	}
}
