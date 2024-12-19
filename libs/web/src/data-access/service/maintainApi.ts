import * as Sentry from '@sentry/node'
import axios from 'axios'

// 這隻 json 取得後只需要拿 Maintain 布林出來使用
export const checkMaintain = async (): Promise<boolean> => {
	let url = ''
	try {
		const maintainFile =
			process.env['NEXT_PUBLIC_ENV'] === 'DEV'
				? 'maintain_test.json'
				: 'maintain.json'
		url = `${process.env['NEXT_INTERNAL_ERROR_HOST']}/${process.env[
			'NEXT_PUBLIC_SITE_NAME'
		]?.toUpperCase()}/${maintainFile}`
		const { data } = await axios.get(url, { timeout: 5000 })

		const { Maintain } = data as { Maintain: boolean }

		return Maintain
	} catch (error) {
		if (axios.isAxiosError(error) && error.name === 'CanceledError') {
			Sentry.captureException(
				`Request checkMaintain due to timeout, url: ${url}`
			)
		} else {
			Sentry.captureException(`Request failed: url: ${url}, error: ${error}`)
		}

		return false
	}
}
