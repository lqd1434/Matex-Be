import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	// @ts-ignore
	host: 'smtp.qq.com',
	secure: true,
	// port: 465, // 发邮箱的端口号
	secureConnection: true, // 使用SSL加密传输
	auth: {
		user: '1434288209@qq.com',
		pass: 'tnlwemsvyfxsgfga',
	},
})

const htmlContent = `
		<div>
			<div style='background-color: white;border-radius:25px;box-shadow: 0 0 10px #C0BFC0;padding: 10px;margin-left: 10px;margin-right: 10px'>
				<h2 style='color: darkcyan'>又是阳光明媚的一天,不知道今天的你开不开心捏,( 😡 不开心也给我起来背单词!)
				</h2>
			</div>
			<div style='margin-top: 25px;border-radius:25px;background-color: white;box-shadow: 0 0 10px #C0BFC0;padding: 18px;color: crimson'>
				背单词! 背单词! 背单词!
			</div>
		</div>
			`

const mailOptions = {
	from: '1434288209@qq.com', // 发邮件的账号
	to: '1850664158@qq.com', // 收邮件的账号
	subject: '每日提醒', // 标题
	html: htmlContent, // 邮寄的内容
}

export const sendEmail = async () => {
	try {
		await transporter.sendMail(mailOptions)
		console.log('邮件发送成功')
	} catch (error) {
		console.log(error)
	}
}
