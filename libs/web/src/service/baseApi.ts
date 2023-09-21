import axios from 'axios'

export const baseUrl = '/api/'

export const baseAxios = axios.create({
	withCredentials: true,
	baseURL: `${process.env['NEXT_PUBLIC_ENV_DB_HOST']}${baseUrl}`,
	headers: {
		common: {
			Referer: `${process.env['NEXT_PUBLIC_REFERER_HOST']}`, // 預設 referrer
		},
	},
})
