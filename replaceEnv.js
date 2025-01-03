const fs = require('fs')
const path = require('path')

const indexPath = path.resolve(
	__dirname,
	'apps/nova88-h5/public/BLOCKIP',
	'index.html'
)

const envVariables = {
	NEXT_PUBLIC_BANNER_HOST: process.env.NEXT_PUBLIC_BANNER_HOST || '',
	NEXT_PUBLIC_BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME || '',
	NEXT_PUBLIC_ERROR_HOST: process.env.NEXT_PUBLIC_ERROR_HOST || '',
	NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || '',
}

let content = fs.readFileSync(indexPath, 'utf8')

Object.keys(envVariables).forEach(key => {
	const placeholder = `%${key}%`
	const value = envVariables[key]
	content = content.replace(new RegExp(placeholder, 'g'), value)
})

fs.writeFileSync(indexPath, content, 'utf8')
