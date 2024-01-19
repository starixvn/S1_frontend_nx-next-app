import axios from 'axios'

export const baseUrl = '/api/'

// use in serverSide
export const baseAxios = axios.create({
	withCredentials: true,
	baseURL: `${process.env['NEXT_PUBLIC_ENV_DB_HOST']}${baseUrl}`,
	headers: {
		common: {
			'ai-host': `${process.env['NEXT_PUBLIC_REFERER_HOST']}`, // 預設 referrer
		},
	},
})
