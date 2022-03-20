import express from 'express'
import path from 'path'
import fs from 'fs'
import { ReceivedMetaDate } from '../type/res'
import { readJson, writeJson } from '../utils/jsonOpt'
import { matexTime } from '../utils/time'

const router = express.Router()
const winPath = path.resolve(process.cwd(), '../update_asserts/win/win.json')
const macPath = path.resolve(process.cwd(), '../update_asserts/mac/mac.json')

router.use((req, res, next) => {
	console.log('收到请求: ' + req.path, matexTime().format('YYYY-MM-DD HH:mm:ss'))
	next()
})

router.get('/check', async (req, res) => {
	const os = req.query.os
	let infoPath = ''
	if (os === 'win') {
		infoPath = winPath
	} else {
		infoPath = macPath
	}
	try {
		const metadata = (await readJson(infoPath)) as ReceivedMetaDate
		console.log(metadata)
		res.send({
			code: 200,
			data: metadata,
		})
	} catch (error) {
		res.send({
			code: 500,
			data: '检查更新失败:' + error,
		})
	}
})

router.post('/metadata', async (req, res) => {
	const metadata = req.body as ReceivedMetaDate
	console.log(metadata)
	let versionPath
	if (metadata.os === 'win') {
		versionPath = winPath
	} else {
		versionPath = macPath
	}
	if (!fs.existsSync(versionPath)) {
		fs.writeFileSync(versionPath, '')
	}
	try {
		await writeJson(versionPath, metadata)
		console.log('更新成功')
		res.send({
			code: 200,
			msg: '更新版本信息成功',
		})
	} catch (e: any) {
		res.send({
			code: 500,
			msg: e.toString(),
		})
	}
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
			console.log('size', size)
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
			data: 'win文件写入失败' + error,
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
