import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import {
	useLazyGetPopUpDataListQuery,
	useLazyGetPopUpPromotionQuery,
	useLazyGetWalletInfoQuery,
} from '@nx-next-app/service'
import { CurrenciesEnum, DeviceTypeEnum } from '@nx-next-app/types'
import { getCookie, setCookie } from 'cookies-next'
import { includes } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

// Page Components
const Banner = dynamic(() => import('./Banner'))

const HotMatch = dynamic(() => import('./hotMatch'))

const Announcement = dynamic(() => import('./Announcement'), { ssr: false })

const PromotionSwiper = dynamic(() => import('./PromotionSwiper'))

const Information = dynamic(() => import('./information'), {
	ssr: false,
})

// Popup Modals
const DepositHintModal = dynamic(
	() => import('@12b-indo-desktop/components/modal/DepositHintModal'),
	{ ssr: false }
)

const HomePromotionModal = dynamic(
	() => import('@12b-indo-desktop/components/modal/HomePromotionModal'),
	{ ssr: false }
)

const BigWinProfitModal = dynamic(
	() => import('@12b-indo-desktop/components/modal/BigWinProfitModal'),
	{ ssr: false }
)

const cookieMaxAge = 20 * 60 * 60

const Home = () => {
	const { modal } = useGlobalModal()
	const {
		auth: { isLogin },
		userInfo: { currencyId, langId, userName, accountName },
	} = useAuth()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery()

	const [getWalletInfo] = useLazyGetWalletInfoQuery()

	const [getBigWinProfit] = useLazyGetPopUpDataListQuery()

	// 定義 popups 並且依順序開啟
	const promotionPopup = async () => {
		const cookieName = `popupPromotions${userName}`

		if (!isLogin || !accountName || getCookie(cookieName) === '1') {
			openNextPopup()
			return
		}
		const { data: { bonusCode = null } = {} } = await getPopUpPromotion({
			langId,
		}).unwrap()

		if (bonusCode) {
			setCookie(cookieName, '1', { maxAge: cookieMaxAge })
			modal.open(
				<HomePromotionModal
					bonusCode={bonusCode}
					closeCallback={openNextPopup}
				/>
			)
		} else {
			openNextPopup()
		}
	}

	const depositPopup = async () => {
		const cookieName = `balanceHint${userName}`
		if (!isLogin || !accountName || getCookie(cookieName) === '1') {
			openNextPopup()
			return
		}

		const { data: { balance = 0, tpWallets = [] } = {} } = await getWalletInfo(
			null
		).unwrap()

		const hasBalance =
			!!balance || tpWallets?.filter(tp => tp.balance > 0).length >= 1
		// 儲值彈窗只有桌機有
		if (!hasBalance) {
			modal.open(<DepositHintModal closeCallback={openNextPopup} />)
			setCookie(cookieName, '1', { maxAge: cookieMaxAge })
		} else {
			openNextPopup()
		}
	}

	const bigWinProfitPopup = async () => {
		const cookieName = `BigWinProfit${userName}`

		if (
			isLogin &&
			getCookie(cookieName) !== '1' &&
			currencyId === CurrenciesEnum.IDR
		) {
			try {
				const { data: bigWinData } = await getBigWinProfit({
					deviceType: DeviceTypeEnum.Desktop,
				}).unwrap()

				// 該userName回傳null表示不顯示彈窗
				if (bigWinData.userName !== null) {
					setCookie(cookieName, '1', { maxAge: cookieMaxAge })
					modal.open(
						<BigWinProfitModal
							bigWinData={bigWinData}
							closeCallback={openNextPopup}
						/>
					)
				} else {
					openNextPopup()
				}
			} catch (error) {
				modal.error((error as Error).message)
			}
		} else {
			openNextPopup()
		}
	}

	const popStack = [depositPopup, promotionPopup, bigWinProfitPopup]

	const openNextPopup = () => {
		if (popStack.length > 0) {
			const current = popStack.pop()
			if (current) {
				current()
			}
		}
	}

	useEffect(() => {
		openNextPopup()
		// 正確放入更新依賴確保正確觸發 effect
	}, [isLogin, accountName])

	return (
		<main className='index'>
			<Announcement />
			<div className='home-banner'>
				<Banner />
				{includes(ALLOWED_CURRENCIES.SPORTS_SABA_CLUB, currencyId) && (
					<HotMatch />
				)}
			</div>
			<PromotionSwiper />
			<Information />
		</main>
	)
}

export default Home
