/* eslint-disable @typescript-eslint/no-unused-vars */
const fs = require('fs')
const { outputData, sortData } = require('./sheet/sheet')

// * 輸出當前版本，平常不會使用
const outputSheet = async tab => {
	const fileList = fs.readdirSync('public/locales') // ex: ['en','cs']
	const headerRow = ['key', ...fileList] // ex: ['key','en','cs']

	const contents = {}

	fileList.forEach(lang => {
		// * 讀取目前所有檔案
		const jsonFile = fs.readFileSync(`public/locales/${lang}/${tab}.json`)
		const fileData = JSON.parse(jsonFile) || {}

		Object.keys(fileData).forEach(key => {
			const content = fileData[key] || ''

			contents[key] = { ...contents[key], ...{ key, [lang]: content } }
		})
	})

	outputData({ tab, headerRow, contents: sortData(contents) })
}

// * 可吃參數 ex: node SheetSort.js nova88 common
const args = process.argv.slice(2)
const tabs = args.length !== 0 ? args : ['common', 'nova88']
tabs.forEach(tab => outputSheet(tab))
