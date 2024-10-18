// 因 12bet 的重設密碼為彈窗，在此帶上必要參數直接導回首頁，讓 useResetPasswordEffect 使用
import { paths } from '@nx-next-app/constants'
import { GetServerSideProps } from 'next'

const ResetPasswordPage: React.FC = () => null

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { key } = query

	const params = new URLSearchParams()
	if (key) params.set('reset_password', String(key))

	return {
		redirect: {
			permanent: false,
			destination: `${paths.home.root}?${params.toString()}`,
		},
	}
}

export default ResetPasswordPage
