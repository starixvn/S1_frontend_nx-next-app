const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: './apps/nova88-desktop/.env' }) // Load environment variables

const envVariables = {
	NEXT_PUBLIC_BANNER_HOST: process.env.NEXT_PUBLIC_BANNER_HOST || '',
	NEXT_PUBLIC_BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME || '',
	NEXT_PUBLIC_ERROR_HOST: process.env.NEXT_PUBLIC_ERROR_HOST || '',
	NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || '',
}

// Function to replace placeholders in a file
function replaceContent(filePath) {
	let content = fs.readFileSync(filePath, 'utf8')

	Object.keys(envVariables).forEach(key => {
		const placeholder = `%${key}%`
		const value = envVariables[key]
		content = content.replace(new RegExp(placeholder, 'g'), value)
	})

	fs.writeFileSync(filePath, content, 'utf8')
}

// Function to recursively search for all index.html files in a directory
function processAllIndexHtml(directory) {
	const files = fs.readdirSync(directory)

	files.forEach(file => {
		const fullPath = path.join(directory, file)

		if (fs.statSync(fullPath).isDirectory()) {
			processAllIndexHtml(fullPath)
		} else if (file === 'index.html') {
			replaceContent(fullPath)
		}
	})
}

// Root directory to start the search
processAllIndexHtml(path.resolve(__dirname, 'apps', 'nova88-desktop', 'public'))
processAllIndexHtml(path.resolve(__dirname, 'apps', 'nova88-h5', 'public'))
