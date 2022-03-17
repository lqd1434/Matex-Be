import express from 'express'
import path from 'path'
import fs from 'fs'
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('收到请求: ', Date.now().toLocaleString())
	next()
})

router.get('/check', function (req, res) {
	res.send('Birds home page')
})

router.post('/metadata', function (req, res) {
	const metadata = req.body
	console.log(metadata)
	// try {
	// 	fs.writeFileSync(path.resolve(process.cwd(), './update/updateMac.json'), versionInfo)
	// 	res.send({
	// 		code: 200,
	// 		msg: '更新成功',
	// 	})
	// } catch (e) {
	// 	res.send({
	// 		code: 200,
	// 		msg: '更新失败',
	// 	})
	// }
})

router.post('/uploadWin', (req: any, res) => {
	try {
		const chunks: any[] = []
		let size = 0
		req.on('data', (chunk: string | any[]) => {
			chunks.push(chunk)
			size += chunk.length
		})

		req.on('end', () => {
			const filepath = path.resolve(process.cwd(), '../update_asserts/win')
			if (!fs.existsSync(filepath)) {
				fs.mkdirSync(filepath)
			}
			console.log(filepath)
			fs.writeFile(filepath + '/win.zip', Buffer.concat(chunks), () => {
				console.log('写入成功')
			})
			res.send({
				status: 200,
				data: 'win文件上传成功',
			})
		})
	} catch (error) {
		console.log(error)
		res.send({
			status: 500,
			data: 'win文件写入失败',
		})
	}
})

router.post('/uploadMac', (req: any, res) => {
	try {
		const chunks: any[] = []
		let size = 0
		req.on('data', (chunk: string | any[]) => {
			chunks.push(chunk)
			size += chunk.length
		})

		req.on('end', () => {
			console.log(size)
			const filepath = path.resolve(process.cwd(), '../update_asserts/mac')
			if (!fs.existsSync(filepath)) {
				fs.mkdirSync(filepath)
			}
			console.log(filepath)
			fs.writeFile(filepath + '/mac.zip', Buffer.concat(chunks), () => {
				console.log('写入成功')
			})
			res.send({
				status: 200,
				data: 'mac文件上传成功',
			})
		})
	} catch (error) {
		console.log(error)
		res.send({
			status: 500,
			data: 'mac文件写入失败',
		})
	}
})

export default router
