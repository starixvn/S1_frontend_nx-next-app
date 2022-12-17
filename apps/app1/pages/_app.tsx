import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@nx-next-app/store'
import { MetaData } from '@nx-next-app/components'
import Layout from '../components/Layout/Layout'
import './styles.css'

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<MetaData title='Welcome to app1!' />

			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</>
	)
}

export default CustomApp
