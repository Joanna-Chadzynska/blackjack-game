const path = require('path');
const dotenv = require('dotenv');
const { SourceMapDevToolPlugin } = require('webpack');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

dotenv.config();

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'dist',
	},
	devtool: 'inline-source-map',
	devServer: {
		open: true,
		contentBase: path.resolve(__dirname),
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /\.module\.s(a|c)ss$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					// {
					// 	loader: 'postcss-loader',
					// 	options: {
					// 		sourceMap: true,
					// 	},
					// },
					{
						loader: 'sass-loader',
						options: {
							sourceMap: process.env.NODE_ENV === 'development',
							webpackImporter: false,
						},
					},
				],
			},
			{
				test: /\.s(a|c)ss$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: process.env.NODE_ENV === 'development',
							webpackImporter: false,
						},
					},
				],
			},
			{
				test: /\.(jpg|png|svg|gif|jpeg)$/,
				use: 'file-loader',
			},
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				use: 'source-map-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [
			'.tsx',
			'.ts',
			'.js',
			'.scss',
			'.gif',
			'.png',
			'.jpg',
			'.jpeg',
			'.svg',
		],
	},
	plugins: [
		// new MiniCssExtractPlugin({
		// 	filename: 'style.css',
		// }),
	],
};
