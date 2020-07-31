interface Images {
	svg: string;
	png: string;
}

export interface Card {
	image: string;
	value: string;
	suit: string;
	code: string;
	images: Images;
	weight: number;
}
