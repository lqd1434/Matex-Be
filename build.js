const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

const Options = {
	sourcemap: 'inline',
	minify: true, // 压缩代码
	bundle: true, // 打包模块
	format: 'cjs', // 输出为 common JS
	platform: 'node', // 平台 node
	outdir: 'dist', // 输出到 build 文件夹
	plugins: [nodeExternalsPlugin()], // 不把主进程代码中引用的 node_modules 包代码打进主进程代码里
	entryPoints: ['src/app.ts'],
}

;(async () => {
	try {
		await esbuild.build(Options)
		console.log('❤ 打包完成 ❤')
	} catch (err) {
		console.error(err)
	}
})()
