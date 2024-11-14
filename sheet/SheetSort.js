/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const { extractSheets } = require('spreadsheet-to-json')
const auth = require('../s1-resources-ggsheetkey.json')
const { outputData, sortData, SHEET_URL_ID } = require('./sheet')

// * URL：https://docs.google.com/spreadsheets/d/1g6nVrf-X6lEQ8Jk_GrSUfwm7R464A0lEyoout1ygI2w

// * Accepts parameters, e.g., node SheetSort.js nova88 common
const args = process.argv.slice(2)

console.log('Starting Google Sheets data extraction')
console.log('Using spreadsheet ID:', SHEET_URL_ID)
console.log('Tabs to extract:', args.length !== 0 ? args : ['nova88', 'common'])

// * Organizes the current Google Sheet sort order, allows specifying a tab
extractSheets(
	{
		spreadsheetKey: SHEET_URL_ID,
		// eslint-disable-next-line global-require
		credentials: auth,
		sheetsToExtract: args.length !== 0 ? args : ['nova88', 'common'],
	},
	(err, data) => {
		if (err) {
			console.error('Error during data extraction:', err)
			throw err
		}

		console.log('Data extraction successful.')
		Object.keys(data).forEach(tab => {
			const fileData = data[tab]
			console.log(`Processing tab: ${tab}`)
			console.log(
				`Number of entries in ${tab}:`,
				fileData ? fileData.length : 0
			)

			if (!fileData || fileData.length === 0) return

			const headerRow = Object.keys(fileData[0])
			const contents = {}

			fileData.forEach(item => {
				contents[item.key] = item
			})

			console.log(`Sorting data for tab: ${tab}`)
			outputData({ tab, headerRow, contents: sortData(contents) })
			console.log(`Data for tab: ${tab} processed and output successfully.`)
		})
	}
)
