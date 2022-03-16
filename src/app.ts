import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as path from 'path'
const app = express()
import router from './router/update'
import fileUpload from 'express-fileupload'

app.use('/assets', express.static(path.resolve(process.cwd(), '../update_asserts/')))
app.use(
	bodyParser.json(),
	bodyParser.text(),
	bodyParser.raw(),
	bodyParser.urlencoded({ extended: true }),
)
app.use(cors())
app.use(fileUpload({}))

app.use('/update', router)

app.get('/', async (req, res) => {
	// await sendEmail()
	res.send({
		text: 'Hello World',
	})
})

app.listen(7888, () => {
	console.log('Server started on port 7888')
})
