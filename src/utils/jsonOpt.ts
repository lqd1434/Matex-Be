import jsonfile from 'jsonfile'

export const readJson = async (path: string) => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(path, function (err, obj) {
			if (err) reject(err)
			resolve(obj)
		})
	})
}
/**
 *
 * @param {string} path
 * @param {Object} obj
 * @returns {Promise<boolean>}
 */
export const writeJson = async (path: string, obj: Object) => {
	try {
		await jsonfile.writeFile(path, obj)
		return true
	} catch (e) {
		console.error(e)
		return false
	}
}
