import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation, Trans } from 'next-i18next'
// ts要求引入SwiperClass
import { Swiper as SwiperClass } from 'swiper'
import { IMilestone, ISlide } from 'libs/web/src/app/types/milestone'

interface IMilestoneContentProps {
	milestonesData: IMilestone[]
	slideData: ISlide
}

const MilestoneContent = ({
	milestonesData,
	slideData,
}: IMilestoneContentProps) => {
	const { t } = useTranslation()
	const [swiper, setSwiper] = useState<SwiperClass | null>(null)
	const [activeYear, setActiveYear] = useState<string>('2020')
	const hostImgUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/milestones`

	const swiperConfig = {
		slidesPerView: 1,
		spaceBetween: 30,
		centeredSlides: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		onSlideChange: (swiper: SwiperClass) => {
			const milestone = milestonesData[swiper.activeIndex]
			setActiveYear(milestone.year)
		},
	}

	const handleClickButton = (e: React.MouseEvent) => {
		e.preventDefault()
		const target = document.querySelector('#page-two')
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handleClickYear = (milestone: IMilestone) => {
		setActiveYear(milestone.year)
		if (swiper) {
			swiper.slideTo(milestone.index)
		}
	}

	const Date = () => (
		<div>
			{milestonesData.map(milestone => (
				<a
					key={milestone.year}
					className={activeYear === milestone.year ? 'active' : ''}
					onClick={() => handleClickYear(milestone)}
				>
					<span>{t(`Label_Milestone_${milestone.year}`)}</span>
				</a>
			))}
		</div>
	)

	return (
		<>
			<div className='milestones-home' id='homepage'>
				<div>
					<div>
						Nova<span>88</span>
					</div>
					<span>{t('Label_Milestone_Title')}</span>
					<div>{t('Label_Milestone_MainTitleDetail')}</div>
				</div>
				<a href='#page-two' className='top-btn' onClick={handleClickButton}>
					<img src={`${hostImgUrl}/top-btn.png`} alt='' />
				</a>
			</div>
			<div className='milestones-swiper' id='page-two'>
				<Swiper
					{...swiperConfig}
					className='swiper-container'
					onSwiper={setSwiper}
				>
					{slideData.map(slide => (
						<SwiperSlide key={slide.imgSrc} className={slide.className}>
							<div className='page-item'>
								<div>{t(slide.title)}</div>
								<div>
									<span>{t(slide.subtitle)}</span>
									<span>
										<Trans
											i18nKey={t(slide.content)}
											components={{
												Link: (
													<a href='https://www.inter.it/en/news/inter-nova88-official-regional-partner-asia' />
												),
											}}
										/>
									</span>
								</div>
								<Date />
							</div>
							<img
								className='page-img'
								src={`${hostImgUrl}/${slide.imgSrc}`}
								alt=''
							/>
						</SwiperSlide>
					))}
					<div className='swiper-button-next'>
						<div className='circle-outline' />
					</div>
					<div className='swiper-button-prev'>
						<div className='circle-outline' />
					</div>
				</Swiper>
			</div>
		</>
	)
}

export default MilestoneContent
