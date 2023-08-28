import React from 'react'
import classNames from 'classnames'
import CarouselBanner from '@nx-next-app/features/F0001/h5/common/carouselBanner'
import VendorFilter from '@nx-next-app/features/F0001/h5/slots/vendorFilter'
import CategoryFilter from '@nx-next-app/features/F0001/h5/slots/CategoryFilter'
import GameList from '@nx-next-app/features/F0001/h5/slots/GameList'
import GameInfo from '@nx-next-app/features/F0001/h5/slots/GameInfo'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import { Header } from '@nx-next-app/components/H0001'
import { useSlots } from '@nx-next-app/features/F0001/providers'

const Slots = () => {
	const {
		bannerList,
		searchCategoryText,
		navRef,
		activeGame,
		isGetBannerV3Fetching,
		isShowSearchInput,
		isNavInView,
		setIsShowSearchInput,
		onSearchCategoryTextChange,
		onInputClose,
	} = useSlots()
	const { t } = useTranslation()
	return (
		<>
			<Header className='header'>
				<Header.Tag
					title={t('Label_General_Slots') as string}
					back={paths.home.root}
					onSearchBarChange={onSearchCategoryTextChange}
					searchText={searchCategoryText}
					isShowSearchInput={isShowSearchInput}
					setIsShowSearchInput={() => setIsShowSearchInput(true)}
					onInputClose={onInputClose}
				/>
			</Header>

			<header className='header' id='header'>
				<div className='title searchBar'>
					<a href={paths.home.root}>
						<i className='icon icon-keyboard_arrow_left' />
					</a>
					{t('Label_General_Slots')}
					<i
						className='icon icon-search'
						onClick={() => setIsShowSearchInput(true)}
					/>
					<div
						className={classNames('infoModule', { active: isShowSearchInput })}
					>
						<div className='inputBox'>
							<input
								placeholder={t('Label_SearchGames') as string}
								value={searchCategoryText}
								onChange={e => onSearchCategoryTextChange(e.target.value)}
							/>
							<i className='icon icon-close' onClick={onInputClose} />
						</div>
					</div>
				</div>
			</header>

			<main className='main casino'>
				{!isGetBannerV3Fetching && (
					<CarouselBanner bannerList={bannerList} navigation={false} />
				)}

				<div className={classNames('functionList', { active: !isNavInView })}>
					<VendorFilter />
					<CategoryFilter />
				</div>
				<div ref={navRef} />
				<GameList />
				{activeGame && <GameInfo />}
			</main>
		</>
	)
}

export default Slots
