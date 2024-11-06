import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useHeaderLogo } from '@nx-next-app/hooks'
import { useGetMsgCountQuery } from '@nx-next-app/service'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const HeaderModule = () => {
	const { t } = useTranslation()
	const { back } = useRouter()
	const { getBannerUrl } = useGlobalData()
	const {
		auth: { isLogin },
	} = useAuth()
	const { data: { data: msgCount = 0 } = {} } = useGetMsgCountQuery(null, {
		skip: !isLogin,
	})
	const { logoUrl } = useHeaderLogo({
		mainLogoUrl: {
			original: getBannerUrl('/h5/img/logo.png'),
			special: getBannerUrl('/h5/img/logo.png'),
		},
	})

	return (
		<div className='header-module'>
			<Link href={paths.home.root}>
				<a className='header-logo'>
					<img src={logoUrl} alt='logo' />
				</a>
			</Link>

			{isLogin ? (
				<div className='header-info'>
					<Link href={paths.message.root}>
						<button className={classNames({ active: msgCount > 0 })}>
							<img
								src={getBannerUrl('/h5/img/mail-icon.png')}
								alt='mail-icon'
							/>
						</button>
					</Link>
					<Link href={paths.appDownload.root}>
						<button>
							<img
								src={getBannerUrl('/h5/img/download-icon.png')}
								alt='download-icon'
							/>
						</button>
					</Link>
					<button onClick={() => back()}>
						<img
							className='icon'
							src={getBannerUrl('/h5/img/return-icon.png')}
							alt='return-icon'
						/>
					</button>
				</div>
			) : (
				<div className='home-btn-group header-login'>
					<Link href={paths.login.root}>
						<button className='btn-login'>{t('Label_General_LogIn')}</button>
					</Link>
					<Link href={paths.join.root}>
						<button className='btn-register'>
							{t('Label_General_Register')}
						</button>
					</Link>
				</div>
			)}
		</div>
	)
}

export default HeaderModule
