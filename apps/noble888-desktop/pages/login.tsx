import { GetServerSideProps } from 'next'

// 桌機版沒有實際的登陸頁面，新增 Login 直接導轉回首頁，使 entPage 時可以正常運行
const Login = () => {
	return <div>Login</div>
}

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	}
}
export default Login
