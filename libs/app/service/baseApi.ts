import axios from 'axios'

const isDevelopment = process.env.NODE_ENV !== 'production'

export const baseUrl = '/api/'

export const axiosWithSSRorSSG = axios.create({
	withCredentials: true,
	baseURL: `${
		isDevelopment ? process.env.DEVELOPMENT_ENV_DB_HOST : ''
	}${baseUrl}`,
})
