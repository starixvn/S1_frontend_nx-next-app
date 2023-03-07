import axios from 'axios'

export const baseUrl = '/api/'

export const baseAxios = axios.create({
	withCredentials: true,
	baseURL: `${process.env['DEVELOPMENT_ENV_DB_HOST']}${baseUrl}`,
})
