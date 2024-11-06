import { Header } from '@12b-indo-h5/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import {
	useLazyGetPopUpDataListQuery,
	useLazyGetPopUpPromotionQuery,
} from '@nx-next-app/service'
import { CurrenciesEnum, DeviceTypeEnum } from '@nx-next-app/types'
import { getCookie, setCookie } from 'cookies-next'
import { includes } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Announcement = dynamic(() => import('./Announcement'))

const Banner = dynamic(() => import('./Banner'), {
	ssr: false,
})

const Menu = dynamic(() => import('./menu'))

const HotMatch = dynamic(() => import('./hotMatch'))

const InfoSwiper = dynamic(() => import('./InfoSwiper'))

const FooterBlock = dynamic(() => import('./footerBlock'))

// Popup Modals
const HomePromotionModal = dynamic(
	() => import('@12b-indo-h5/components/modal/HomePromotionModal'),
	{ ssr: false }
)

const BigWinProfitModal = dynamic(
	() => import('@12b-indo-h5/components/modal/BigWinProfitModal'),
	{ ssr: false }
)

const cookieMaxAge = 20 * 60 * 60

const Home = () => {
	const {
		auth: { isLogin },
		userInfo: { currencyId, langId, userName, accountName },
	} = useAuth()

	const { modal } = useGlobalModal()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery()

	const [getBigWinProfit] = useLazyGetPopUpDataListQuery()

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
					closeCallback={openNextPopup}
					bonusCode={bonusCode}
				/>,
				{
					className: 'promosback',
				}
			)
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
					deviceType: DeviceTypeEnum.Mobile,
				}).unwrap()

				// 該userName回傳null表示不顯示彈窗
				if (bigWinData.userName !== null) {
					setCookie(cookieName, '1', { maxAge: cookieMaxAge })
					modal.open(
						<BigWinProfitModal
							bigWinData={bigWinData}
							closeCallback={openNextPopup}
						/>,
						{ className: 'bigwinpop' }
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

	const popStack = [promotionPopup, bigWinProfitPopup]

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
		<>
			<Header>
				<Header.HeaderModule />
			</Header>

			<main className='index'>
				<Announcement />
				<Banner />
				<Menu />
				{includes(ALLOWED_CURRENCIES.SPORTS_SABA_CLUB, currencyId) && (
					<HotMatch />
				)}
				<InfoSwiper />
				<FooterBlock />
			</main>
		</>
	)
}

export default Home
