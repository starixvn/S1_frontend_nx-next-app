import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation } from 'next-i18next'
// ts要求引入SwiperClass
import { Swiper as SwiperClass } from 'swiper'
import { IMilestone } from './type'
import { SlideData, milestones } from './data'

const MilestoneContent = () => {
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
			const milestone = milestones[swiper.activeIndex]
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
			{milestones.map(milestone => (
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
					{SlideData.map(slide => (
						<SwiperSlide key={slide.imgSrc} className={slide.className}>
							<div className='page-item'>
								<div>{t(slide.title)}</div>
								<div>
									<span>{t(slide.subtitle)}</span>
									<span>{t(slide.content)}</span>
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
