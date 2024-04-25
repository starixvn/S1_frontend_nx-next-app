import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { paths, PRODUCTS } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const LiveStreamingModalDesktop = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const UnderMaintenanceModal = dynamic(
	() => import('../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)

const LiveCasino = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { onStaticMenuOpen } = useMenu()
	const { modal } = useGlobalModal()

	// * 靜態遊戲
	const ppCasino = PRODUCTS.PragmaticPlayCasino
	const aeCasino = PRODUCTS.AESexy
	const evoCasino = PRODUCTS.EvolutionGaming
	const dgCasino = PRODUCTS.DreamGaming
	const sgCasino = PRODUCTS.SAGaming

	return (
		<div className='mainlivecasino'>
			<div className='maintitle'>
				{t('Label_General_CasinoWithLive').toUpperCase()}
				<Link href={paths.liveCasino.root} passHref>
					{/* 避免 More 文字低於圖片層級導致無法點擊 */}
					<a style={{ zIndex: 1 }}>{`${t(
						'Label_General_More'
					).toUpperCase()}`}</a>
				</Link>
			</div>
			{currencyId === CurrenciesEnum.INR ? (
				<div className='livecasino-bn'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-sg-2.png`}
						alt='casino_SA'
					/>
					<button
						className='all-btn'
						onClick={() => {
							onStaticMenuOpen(sgCasino, {
								loginCallback: () => modal.open(<LoginModal />),
								underMaintenanceCallback: () =>
									modal.open(<UnderMaintenanceModal />),
								messageCallBack: message => modal.error(message),
								liveStreamingCallback: () =>
									modal.open(<LiveStreamingModalDesktop />),
							})
						}}
					>
						{t('Label_General_PlayNow')}
					</button>
				</div>
			) : (
				<div className='livecasino-bn'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-pp.png`}
						alt='casino_PP'
					/>
					<button
						className='all-btn'
						onClick={() => {
							onStaticMenuOpen(ppCasino, {
								loginCallback: () => modal.open(<LoginModal />),
								underMaintenanceCallback: () =>
									modal.open(<UnderMaintenanceModal />),
								messageCallBack: message => modal.error(message),
								liveStreamingCallback: () =>
									modal.open(<LiveStreamingModalDesktop />),
							})
						}}
					>
						{t('Label_General_PlayNow')}
					</button>
				</div>
			)}

			<div className='main-livecasino-item'>
				<div className='hotlivecasino'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-sexy.png`}
						alt='casino_AE'
					/>
					<button
						className='all-btn'
						onClick={() => {
							onStaticMenuOpen(aeCasino, {
								loginCallback: () => modal.open(<LoginModal />),
								underMaintenanceCallback: () =>
									modal.open(<UnderMaintenanceModal />),
								messageCallBack: message => modal.error(message),
								liveStreamingCallback: () =>
									modal.open(<LiveStreamingModalDesktop />),
							})
						}}
					>
						{t('Label_General_PlayNow')}
					</button>
				</div>
				{currencyId === CurrenciesEnum.BRL ? (
					<div className='hotlivecasino'>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-sg.png`}
							alt='casino_SG'
						/>
						<button
							className='all-btn'
							onClick={() => {
								onStaticMenuOpen(sgCasino, {
									loginCallback: () => modal.open(<LoginModal />),
									underMaintenanceCallback: () =>
										modal.open(<UnderMaintenanceModal />),
									messageCallBack: message => modal.error(message),
									liveStreamingCallback: () =>
										modal.open(<LiveStreamingModalDesktop />),
								})
							}}
						>
							{t('Label_General_PlayNow')}
						</button>
					</div>
				) : (
					<div className='hotlivecasino'>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-evo.png`}
							alt='casino_EVO'
						/>
						<button
							className='all-btn'
							onClick={() => {
								onStaticMenuOpen(evoCasino, {
									loginCallback: () => modal.open(<LoginModal />),
									underMaintenanceCallback: () =>
										modal.open(<UnderMaintenanceModal />),
									messageCallBack: message => modal.error(message),
									liveStreamingCallback: () =>
										modal.open(<LiveStreamingModalDesktop />),
								})
							}}
						>
							{t('Label_General_PlayNow')}
						</button>
					</div>
				)}
				{/* // * BDT幣別不支援 DG，改為開始 SG 產品 */}
				{currencyId === CurrenciesEnum.BDT ? (
					<div className='hotlivecasino'>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-sg.png`}
							alt='casino_SG'
						/>
						<button
							className='all-btn'
							onClick={() => {
								onStaticMenuOpen(sgCasino, {
									loginCallback: () => modal.open(<LoginModal />),
									underMaintenanceCallback: () =>
										modal.open(<UnderMaintenanceModal />),
									messageCallBack: message => modal.error(message),
									liveStreamingCallback: () =>
										modal.open(<LiveStreamingModalDesktop />),
								})
							}}
						>
							{t('Label_General_PlayNow')}
						</button>
					</div>
				) : (
					<div className='hotlivecasino'>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-dg.png`}
							alt='casino_DG'
						/>
						<button
							className='all-btn'
							onClick={() => {
								onStaticMenuOpen(dgCasino, {
									loginCallback: () => modal.open(<LoginModal />),
									underMaintenanceCallback: () =>
										modal.open(<UnderMaintenanceModal />),
									messageCallBack: message => modal.error(message),
									liveStreamingCallback: () =>
										modal.open(<LiveStreamingModalDesktop />),
								})
							}}
						>
							{t('Label_General_PlayNow')}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default LiveCasino
