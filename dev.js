const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const nodemon = require('nodemon');

const Options = {
	sourcemap: 'inline',
	minify: true, // 压缩代码
	bundle: true, // 打包模块
	format: 'cjs', // 输出为 common JS
	platform: 'node', // 平台 node
	outdir: 'dist', // 输出到 build 文件夹
	plugins: [nodeExternalsPlugin()], // 不把主进程代码中引用的 node_modules 包代码打进主进程代码里
	entryPoints: ['src/app.ts'],
	watch: {
		onRebuild: (err) => {
			if (!err) {
				console.log('代码变更，重启服务器');
			}
		}
	}// 入口文件
};


(async () => {
	try {
		await esbuild.build(Options);
		console.log('❤ 编译完成 ❤');
		nodemon({
			script: 'dist/app.js',
			ext: 'js json'
		});

		nodemon.on('start', function () {
			console.log('nodemon 正在监听\n');
		}).on('quit', function () {
			console.log('nodemon 监听服务已退出');
			process.exit();
		}).on('restart', function (files) {
			console.log('※ 正在重启nodemon监听服务 ※ ');
		});
	}catch(e){
		console.error(e)
	}
})();
