const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
		hot: true,
		inline: true,
	},
	module: {
		rules: [
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
							webpackImporter: true,
						},
					},
				],
			},
			{
				test: /\.(jpg|png|svg|gif|jpeg)$/,
				use: 'file-loader',
			},
			{
				test: /\.ts$/,
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
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
		}),
	],
};
