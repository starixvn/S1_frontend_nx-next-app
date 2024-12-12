import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import CategoryFilter from '@nx-next-app/features/F0001/h5/lobby-game/CategoryFilter'
import GameList from '@nx-next-app/features/F0001/h5/lobby-game/GameList'
import VendorFilter from '@nx-next-app/features/F0001/h5/lobby-game/vendorFilter'
import { useLobby } from '@nx-next-app/features/F0001/providers'
import { MenuKeyEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

const FourD = () => {
	const {
		searchCategoryText,
		navRef,
		isShowSearchInput,
		isNavInView,
		setIsShowSearchInput,
		onSearchCategoryTextChange,
		onInputClose,
	} = useLobby()
	const { t } = useTranslation()
	return (
		<>
			<Header className='header'>
				<Header.Tag
					title={t('Label_General_FourD') as string}
					back={`${paths.home.root}/?prevPageRecord=${MenuKeyEnum.FourD}`}
					onSearchBarChange={onSearchCategoryTextChange}
					searchText={searchCategoryText}
					isShowSearchInput={isShowSearchInput}
					setIsShowSearchInput={() => setIsShowSearchInput(true)}
					onInputClose={onInputClose}
				/>
			</Header>
			<main className='main casino'>
				{/* {!isGetBannerV3Fetching && (
					<CarouselBanner
						bannerList={bannerList}
						navigation={false}
						spaceBetween={100}
					/>
				)} */}

				<div className={classNames('functionList', { active: !isNavInView })}>
        <VendorFilter pathRoot='' />
					<CategoryFilter />
				</div>
				<div ref={navRef} />
				<GameList />
			</main>
		</>
	)
}

export default FourD
