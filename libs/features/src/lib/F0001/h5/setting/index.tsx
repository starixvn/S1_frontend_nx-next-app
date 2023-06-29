import { Header, SettingCollapse } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

interface ISettingProps {
	renderCollapse: ({
		isLogin,
		currencyId,
		langId,
	}: {
		isLogin?: boolean
		currencyId: number
		langId: string
	}) => ReactNode
}

const Setting = ({ renderCollapse }: ISettingProps) => {
	const { push } = useRouter()
	const { t } = useTranslation()
	const { userInfo, auth, onSignOut } = useAuth()

	const handleSignOut = async () => {
		await onSignOut()
		push(paths.home.root)
	}

	return (
		<>
			<Header className='header'>
				<div className='title'>{t('Label_General_More')}</div>
			</Header>

			<main className='more'>
				<div className='tag'>
					{auth.isLogin ? (
						<>
							<Link
								href={{
									pathname: paths.profile.root,
									query: { from: paths.setting.root },
								}}
							>
								<a className='icon icon-member'>{t('Label_General_Profile')}</a>
							</Link>
							<i />
							<Link href={paths.message.root}>
								<a className='icon icon-email' href='/cs/message'>
									{t('Label_General_Message')}
									<i className='quantity'>6</i>
								</a>
							</Link>
						</>
					) : (
						<>
							<Link
								href={{
									pathname: paths.join.root,
									query: { from: paths.setting.root },
								}}
							>
								<a>{t('Label_General_Join')}</a>
							</Link>
							<i />
							<Link
								href={{
									pathname: paths.login.root,
									query: { from: paths.setting.root },
								}}
							>
								<a>{t('Label_General_LogIn')}</a>
							</Link>
						</>
					)}
				</div>

				<SettingCollapse>
					{renderCollapse({
						isLogin: auth.isLogin,
						currencyId: userInfo.currencyId,
						langId: userInfo.langId,
					})}

					{auth.isLogin && (
						<SettingCollapse.Item
							header={() => (
								<button
									className='title icon icon-exit'
									onClick={handleSignOut}
								>
									{t('Label_General_LogOut')}
								</button>
							)}
						/>
					)}
				</SettingCollapse>
			</main>
		</>
	)
}

export default Setting
