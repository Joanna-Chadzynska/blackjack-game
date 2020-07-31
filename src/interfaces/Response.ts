import { Card } from './Card';

export interface Response {
	success: boolean;
	cards: Card[];
	deck_id: string;
	remaining: number;
}
