const config = {
	context : __dirname,
	entry : {
		index:'index.js'
	},
	output : {
		path: __dirname + '/assets/',
		filename: '[name].js',
	},
	module: {
		loaders : [
			{
				test:/\.jsx?$/,
				loader :'babel',
				exclude : /node_modules/,
				query: {
					presets:['es2015','react']
				}
			},
			{
				test:/\.css$/,
				loader:"style!css"
			}
		]
	}
};

export default config;