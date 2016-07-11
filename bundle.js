import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

const bundler = webpack(webpackConfig);

bundler.run((err,stats)=>{
	if(err) {
        console.error(err);
    }
    if(stats) {
        console.log(stats);
    }
});