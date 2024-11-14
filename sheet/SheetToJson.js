/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const { extractSheets } = require('spreadsheet-to-json')
const path = require('path')
const fs = require('fs-extra')
const auth = require('../s1-resources-ggsheetkey.json')
const { SHEET_URL_ID } = require('./sheet')

// * URL: https://docs.google.com/spreadsheets/d/1g6nVrf-X6lEQ8Jk_GrSUfwm7R464A0lEyoout1ygI2w

// * Command example: node sheetSort.js nova88 common
const args = process.argv.slice(2)
console.log('Script started with arguments:', args)

const getContents = data => {
	const contents = {}

	for (const tab in data) {
		const entries = data[tab]
		console.log(`Processing tab: ${tab}`)
		const fileName = `${tab}.json`
		entries.sort((a, b) => (a.key > b.key ? 1 : -1))
		console.log(`Sorted entries for ${tab}:`, entries)

		for (const { key, ...translations } of entries) {
			for (const lang in translations) {
				const value = translations[lang]
				if (typeof value === 'string' && value.trim() !== '') {
					if (!contents[lang]) {
						contents[lang] = {}
					}
					if (!contents[lang][fileName]) {
						contents[lang][fileName] = {}
					}
					contents[lang][fileName][key] = value
				}
			}
		}
	}

	return contents
}

// * Sync Google Sheet version with optional specific tabs
extractSheets(
	{
		spreadsheetKey: SHEET_URL_ID,
		// eslint-disable-next-line global-require
		credentials: auth,
		sheetsToExtract: args.length !== 0 ? args : ['nova88', 'common'],
	},
	(err, data) => {
		if (err) throw err

		const contents = getContents(data)

		for (const lang in contents) {
			const location = `../public/locales/${lang}`
			console.log(
				`Ensuring directory for language: ${lang} at location: ${location}`
			)
			// * Ensure directory exists
			fs.ensureDirSync(path.dirname(path.resolve(__dirname, location, 'test')))

			for (const fileName in contents[lang]) {
				const content = contents[lang][fileName]
				console.log(`Writing file: ${fileName} for language: ${lang}`)
				// * Write file to './public/locales/${lang}'
				fs.writeJSONSync(path.resolve(__dirname, location, fileName), content, {
					spaces: 2,
				})
			}
		}
	}
)
