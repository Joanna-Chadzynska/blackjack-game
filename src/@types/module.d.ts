declare module '*.module.scss' {
	const classes: { [key: string]: string };

	export default classes;
}

declare module '*.txt' {
	const content: string;
	export default content;
}

declare module '*.png' {
	const value: any;
	export = value;
}

declare module '*.jpg';
