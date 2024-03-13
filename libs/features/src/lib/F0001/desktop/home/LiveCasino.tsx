import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/future/image'
import { find, isUndefined } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const LiveCasino = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const {
		menuData: { Casino: { subMenu: liveCasinoMenu } = {} } = {},
		onMenuOpen,
	} = useMenu()
	const { modal } = useGlobalModal()

	const ppCasino = find(
		liveCasinoMenu,
		menu => menu.productKey === 'LIVE_CASINO_PP'
	)

	const aeCasino = find(
		liveCasinoMenu,
		menu => menu.productKey === 'LIVE_CASINO_AE'
	)

	const evoCasino = find(
		liveCasinoMenu,
		menu => menu.productKey === 'LIVE_CASINO_EVO'
	)

	const sgCasino = find(
		liveCasinoMenu,
		menu => menu.productKey === 'LIVE_CASINO_SA'
	)

	const dgCasino = find(
		liveCasinoMenu,
		menu => menu.productKey === 'LIVE_CASINO_DG'
	)

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
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-sg-2.png`}
						alt='casino_SA'
						width={1920}
						height={749}
					/>
					<button
						className='all-btn'
						onClick={() => {
							if (!isUndefined(sgCasino)) {
								onMenuOpen(sgCasino, {
									loginCallback: () => modal.open(<LoginModal />),
								})
							}
						}}
					>
						{t('Label_General_PlayNow')}
					</button>
				</div>
			) : (
				<div className='livecasino-bn'>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-pp.png`}
						alt='casino_PP'
						width={1920}
						height={749}
					/>
					<button
						className='all-btn'
						onClick={() => {
							if (!isUndefined(ppCasino)) {
								onMenuOpen(ppCasino, {
									loginCallback: () => modal.open(<LoginModal />),
								})
							}
						}}
					>
						{t('Label_General_PlayNow')}
					</button>
				</div>
			)}

			<div className='main-livecasino-item'>
				<div className='hotlivecasino'>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-sexy.png`}
						alt='casino_AE'
						width={900}
						height={602}
					/>
					<button
						className='all-btn'
						onClick={() => {
							if (!isUndefined(aeCasino)) {
								onMenuOpen(aeCasino, {
									loginCallback: () => modal.open(<LoginModal />),
								})
							}
						}}
					>
						{t('Label_General_PlayNow')}
					</button>
				</div>
				<div className='hotlivecasino'>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-evo.png`}
						alt='casino_EVO'
						width={900}
						height={602}
					/>
					<button
						className='all-btn'
						onClick={() => {
							if (!isUndefined(evoCasino)) {
								onMenuOpen(evoCasino, {
									loginCallback: () => modal.open(<LoginModal />),
								})
							}
						}}
					>
						{t('Label_General_PlayNow')}
					</button>
				</div>
				{/* // * BDT幣別不支援 DG，改為開始 SG 產品 */}
				{currencyId === CurrenciesEnum.BDT ? (
					<div className='hotlivecasino'>
						<Image
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-sg.png`}
							alt='casino_SG'
							width={900}
							height={602}
						/>
						<button
							className='all-btn'
							onClick={() => {
								if (!isUndefined(sgCasino)) {
									onMenuOpen(sgCasino, {
										loginCallback: () => modal.open(<LoginModal />),
									})
								}
							}}
						>
							{t('Label_General_PlayNow')}
						</button>
					</div>
				) : (
					<div className='hotlivecasino'>
						<Image
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-livecasino-dg.png`}
							alt='casino_DG'
							width={900}
							height={602}
						/>
						<button
							className='all-btn'
							onClick={() => {
								if (!isUndefined(dgCasino)) {
									onMenuOpen(dgCasino, {
										loginCallback: () => modal.open(<LoginModal />),
									})
								}
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
