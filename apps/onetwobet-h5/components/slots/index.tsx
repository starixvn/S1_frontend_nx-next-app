import { paths } from '@nx-next-app/constants'
import { useSlots } from '@nx-next-app/operations'
import { MenuKeyEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { Header } from '../common'
import Banner from './Banner'
import CategoryFilter from './CategoryFilter'
import GameInfo from './GameInfo'
import GameList from './GameList'
import VendorFilter from './vendorFilter'

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
					back={`${paths.home.root}/?prevPageRecord=${MenuKeyEnum.Slot}`}
					onSearchBarChange={onSearchCategoryTextChange}
					searchText={searchCategoryText}
					isShowSearchInput={isShowSearchInput}
					setIsShowSearchInput={() => setIsShowSearchInput(true)}
					onInputClose={onInputClose}
				/>
			</Header>
			<main className='main casino'>
				{!isGetBannerV3Fetching && (
					<Banner
						bannerList={bannerList}
						navigation={false}
						spaceBetween={100}
					/>
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
