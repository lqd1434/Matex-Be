import express from 'express'
import path from 'path'
import fs from 'fs'
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now())
	next()
})

// define the home page route
router.get('/check', function (req, res) {
	res.send('Birds home page')
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
			console.log(chunks)
			console.log(size)
			const filepath = path.resolve(process.cwd(), './public/zip/win/win.zip')
			fs.writeFile(filepath, Buffer.concat(chunks), () => {
				console.log('写入成功')
			})
			res.send({
				status: 200,
				data: '文件上传成功',
			})
		})
	} catch (error) {
		console.log(error)
		res.send({
			status: 500,
			data: '文件写入失败',
		})
	}
})

export default router
