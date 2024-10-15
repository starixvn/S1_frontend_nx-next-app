import Carousel from '@12b-desktop/components/common/carousel'
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ReactIdSwiperProps } from 'react-id-swiper'

const MonthlyPicks = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()
	const { monthlyData = [] } = useHome()
	const {
		auth: { isLogin },
	} = useAuth()
	const [showNavigation, setShowNavigation] = useState(false)

	// 此參數在每次 navigation 狀態更新時也會觸發，會導致元件滾動異常，故僅有在資料更新時才開啟更新 swipper
	const [shouldSwiperUpdate, setShouldSwiperUpdate] = useState(false)
	const memoMonthlyData = useMemo(() => monthlyData, [monthlyData])

	const config: ReactIdSwiperProps = {
		slidesPerView: 1,
		shouldSwiperUpdate,
		rebuildOnUpdate: false,
		pagination: false,
		renderPrevButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className='swiper-button-prev'
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className='swiper-button-next'
			/>
		),
	}

	useEffect(() => {
		setShouldSwiperUpdate(true)
		const timeout = setTimeout(() => setShouldSwiperUpdate(false), 5000)
		return () => clearTimeout(timeout)
	}, [memoMonthlyData])

	return (
		<div
			className='home-picks'
			onMouseOver={() => setShowNavigation(true)}
			onMouseOut={() => setShowNavigation(false)}
			onFocus={() => 0}
			onBlur={() => 0}
		>
			<div className='title'>
				{t('Label_General_Monthly_Picks').toUpperCase()}
			</div>
			{monthlyData.length > 0 && (
				<>
					<div className='content'>
						<div className='picks-swiper'>
							<Carousel {...config}>
								{monthlyData.map(({ imgUrl, title, text }) => (
									<div className='swiper-slide' key={title}>
										<div className='picks-item'>
											<img src={getBannerUrl(imgUrl)} alt='' />
										</div>
										<div className='picks-info'>
											<span className='title'>{t(title)}</span>
											<p>{t(text)}</p>
										</div>
									</div>
								))}
							</Carousel>
						</div>
					</div>
					<div className='btnGroup'>
						<Link
							href={isLogin ? paths.deposit.root : paths.join.root}
							passHref
						>
							<button className='primary'>
								{isLogin
									? t('Label_Deposit_Now').toUpperCase()
									: t('Label_General_Register').toUpperCase()}
							</button>
						</Link>
						<button className='primary'>
							{t('Label_Promotion_MoreInfo').toUpperCase()}
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default MonthlyPicks
