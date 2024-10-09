import Country from '@12b-desktop/components/layout/common/header/userInfo/Country'
import UserProfile from '@12b-desktop/components/layout/common/header/userInfo/UserProfile'
import Wallet from '@12b-desktop/components/layout/common/header/userInfo/Wallet'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LoginModal = dynamic(
	() => import('@12b-desktop/components/modal/LoginModal'),
	{ ssr: false }
)

const UserInfo = () => {
	const { t } = useTranslation()
	const {
		userInfo: { userName, userLevel },
		auth,
		onSignOut,
	} = useAuth()
	const router = useRouter()
	const { modal } = useGlobalModal()
	const { getBannerUrl } = useGlobalData()
	const { VIP_CLUB_IMAGES } = useStaticData()

	const handleLogin = () => {
		modal.open(<LoginModal />)
	}

	const handleSignOut = async () => {
		try {
			await onSignOut()
			await router.push(paths.home.root).then(() => router.reload())
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	// * 當前 VIP 等級資訊
	const currentVipLevelInfo = VIP_CLUB_IMAGES[userLevel - 1]

	return (
		<div className='user-info'>
			{/* 💡登入後才有： */}
			{auth.isLogin && (
				<div className='info-container'>
					{/* <!-- user-status --> */}
					<div className='user-status'>
						<div className='status-content'>
							<div className='text'>
								<span>Welcome,</span>
								<span className='user-mark'>{userName}</span>
							</div>
							<div className='text'>
								{/* TODO: i18n翻譯 */}
								<span>
									{t('Label_General_VIP')} {t('Label_History_Status')}:
								</span>
								<span className='vip-mark'>
									{t(currentVipLevelInfo?.displayKey)}
								</span>
							</div>
						</div>
						<img
							className='icon'
							src={getBannerUrl(currentVipLevelInfo?.url)}
							alt='vip icon'
						/>
					</div>

					{/* <!-- balance-info --> */}
					<Wallet />

					{/* <!-- user-profile  --> */}
					<UserProfile />
				</div>
			)}

			{/* 💡登入前後都有 */}
			<div className='info-container'>
				<button
					onClick={() => {
						// 有登入導到personal message，沒有的話就disabled
						if (auth.isLogin) {
							router.push(paths.message.root)
						}
					}}
				>
					<img
						className='mail-icon'
						src={getBannerUrl('/desktop/img/mail-before-login.png')}
						alt='mail icon'
					/>
				</button>

				{/* <!-- language下拉選單 -->  */}
				<Country />

				{auth.isLogin ? (
					<button className='primary' onClick={handleSignOut}>
						{t('Label_General_LogOut')}
					</button>
				) : (
					<>
						<button className='primary' onClick={handleLogin}>
							{t('Label_General_LogIn')}
						</button>
						<Link href={paths.join.root}>
							<button className='green'>
								<img
									src={getBannerUrl('/desktop/img/joinnow-icon.png')}
									alt='join now icon'
								/>
								{t('Label_General_JoinNow')}
							</button>
						</Link>
					</>
				)}
			</div>
		</div>
	)
}

export default UserInfo
