import { GetServerSideProps } from 'next'
import { authApiUrl, axiosWithSSRorSSG } from '@nx-next-app/api'
import { useAuth } from '@nx-next-app/hooks'

const Index = ({ data }: { data: unknown }) => {
	const { isSignIn } = useAuth()

	return (
		<div>
			Home {JSON.stringify(data)}
			<div>isLogin {JSON.stringify(isSignIn)}</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const { data } = await axiosWithSSRorSSG.post(authApiUrl.checkSignIn)

	return {
		props: {
			data,
		},
	}
}

export default Index
