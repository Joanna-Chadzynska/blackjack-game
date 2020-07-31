import { Card } from './Card';

export interface Player {
	name: string;
	id: number;
	points: number;
	hand: Card[];
}
