import { Header } from '@nx-next-app/components/H0001'
import { ENV_COOKIE_NAMES, paths } from '@nx-next-app/constants'
import classNames from 'classnames'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useBoolean } from 'usehooks-ts'

interface IHomeProps {
	persistAppDownloadHint: string
}

const Home = ({ persistAppDownloadHint }: IHomeProps) => {
	const { pathname } = useRouter()
	const {
		value: isAppDownloadHintActive,
		setFalse: setAppDownloadHintActiveFalse,
	} = useBoolean(!persistAppDownloadHint)

	const handleCloseAppDownloadHint = () => {
		setCookie(ENV_COOKIE_NAMES.AppDownloadHint, true)
		setAppDownloadHintActiveFalse()
	}

	return (
		<>
			<Header>
				{pathname === paths.home.root && (
					<Header.AppDownLoad
						isAppDownloadHintActive={isAppDownloadHintActive}
						onCloseAppDownloadHint={handleCloseAppDownloadHint}
					/>
				)}

				<Header.HeaderModule />
			</Header>

			<main
				// * 當 Header.AppDownLoad 顯示時要加入 'active' class name
				className={classNames({
					active: isAppDownloadHintActive,
				})}
			>
				home
			</main>
		</>
	)
}

export default Home
