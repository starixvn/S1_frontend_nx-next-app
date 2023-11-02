import axios from 'axios'

// 這隻 json 取得後只需要拿 Maintain 布林出來使用
export const checkMaintain = async (): Promise<boolean> => {
	const maintainFile =
		process.env['NEXT_PUBLIC_ENV'] === 'DEV'
			? 'maintain_test.json'
			: 'maintain.json'
	const { data } = await axios.get(
		`${process.env['NEXT_PUBLIC_BANNER_HOST']}/${process.env[
			'NEXT_PUBLIC_SITE_NAME'
		]?.toUpperCase()}/${maintainFile}`
	)
	const { Maintain } = data as { Maintain: boolean }

	return Maintain
}
