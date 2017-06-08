module.exports = {
    entry: './src/js/root.js',
    output: {
        path: __dirname,
        filename: 'dist/build.js'
    },
    module: {
        rules: [{
		            test: /\.jsx?$/,
		            exclude: /node_modules/,
		            use: {
		                loader: 'babel-loader',
		                options: {
		                    presets: ['env', 'react'],
		                    "plugins": [
							    ["import", { libraryName: "antd", style: "css" }] // `style: true` 会加载 less 文件
							  ]
		                }
		            }
		        },{
		        	test:/\.css$/,
		        	use:[
		        		{loader:'style-loader'},
		        		{loader:'css-loader'}
		        	]
		        }]
    }
}
