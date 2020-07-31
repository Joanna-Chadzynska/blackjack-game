import axios from 'axios';

export const request = axios.create({
	baseURL: 'https://deckofcardsapi.com/api/deck',
});
