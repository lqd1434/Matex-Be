import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as path from "path";
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json(),bodyParser.text(),bodyParser.raw(),bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
	res.send({
		text: 'Hello World',
	})
})

app.listen(7888, () => {
	console.log("Server started on port 7888");
});
