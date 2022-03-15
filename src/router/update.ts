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
		const { name, data } = req.files.file
		console.log(name, 'uploadWin')
		console.log(data, 'uploadWin')
		const filepath = path.resolve(process.cwd(), './public/zip/win' + name)
		fs.writeFile(filepath, data, () => {
			console.log('文件写入成功')
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
