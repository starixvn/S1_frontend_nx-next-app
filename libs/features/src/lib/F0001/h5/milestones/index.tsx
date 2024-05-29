import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Trans, useTranslation } from 'next-i18next'
// ts要求引入SwiperClass
import { Swiper as SwiperClass } from 'swiper'
import { IMilestone, ISlide } from '@nx-next-app/types'

interface IMilestoneContentProps {
	milestonesData: IMilestone[]
	slideData: ISlide
}

const MilestoneContent = ({
	milestonesData,
	slideData,
}: IMilestoneContentProps) => {
	const hostImgUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/milestones`
	const { t } = useTranslation()
	const [swiper, setSwiper] = useState<SwiperClass | null>(null)
	const [activeYear, setActiveYear] = useState<string>('2020')

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
		<div className='page-date'>
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

	const goBack = () => {
		window.history.back()
	}

	return (
		<>
			<div className='header'>
				<div className='title'>
					<a role='link' aria-hidden='true'>
						<i className='icon icon-keyboard_arrow_left' onClick={goBack} />
					</a>
					{t('Label_General_Milestone')}
				</div>
			</div>
			<main className='milestones'>
				<div className='milestones-home' id='homepage'>
					<div>
						<div>
							Nova<span>88</span>
						</div>
						<span>{t('Label_Milestone_Title')}</span>
						<div>{t('Label_Milestone_MainTitleDetail')}</div>
					</div>
					<a href='#page-two' className='top-btn' onClick={handleClickButton}>
						<img src={`${hostImgUrl}/top-btn.png`} alt='button-img' />
					</a>
				</div>
				<div className='milestones-swiper'>
					<Swiper
						{...swiperConfig}
						className='swiper-container'
						id='page-two'
						onSwiper={setSwiper}
					>
						{slideData.map(slide => (
							<SwiperSlide key={slide.imgSrc} className={slide.className}>
								<Date />
								<div className='page-title'>
									<div>{t(slide.title)}</div>
									<div>{t(slide.subtitle)}</div>
									<img
										className='page-img'
										src={`${hostImgUrl}/${slide.imgSrc}`}
										alt={`milestone-img-${slide.imgSrc}`}
									/>
								</div>
								<div className='page-text'>
									<div>
										<Trans
											i18nKey={t(slide.content)}
											components={{
												Link: (
													<a
														href='https://www.inter.it/en/news/inter-nova88-official-regional-partner-asia'
														rel='noreferrer'
														target='_blank'
														style={{
															color: 'rgb(230, 230, 230)',
															textDecoration: 'underline',
														}}
													/>
												),
											}}
										/>
									</div>
								</div>
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
			</main>
		</>
	)
}

export default MilestoneContent
