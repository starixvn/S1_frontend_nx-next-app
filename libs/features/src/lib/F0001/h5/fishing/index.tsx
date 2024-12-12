import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import CategoryFilter from '@nx-next-app/features/F0001/h5/lobby-game/CategoryFilter'
import GameList from '@nx-next-app/features/F0001/h5/lobby-game/GameList'
import LobbyPageBanner from '@nx-next-app/features/F0001/h5/lobby-game/LobbyPageBanner'
import { LobbyGamePage } from '@nx-next-app/features/F0001/h5/lobby-game/styles'
import VendorFilter from '@nx-next-app/features/F0001/h5/lobby-game/vendorFilter'
import { useLobby } from '@nx-next-app/features/F0001/providers'
import { MenuKeyEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

const Fishing = () => {
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
		<LobbyGamePage>
			<Header>
				<Header.Tag
					title={t('Label_General_TpCategory4') as string}
					back={`${paths.home.root}/?prevPageRecord=${MenuKeyEnum.Fishing}`}
					onSearchBarChange={onSearchCategoryTextChange}
					searchText={searchCategoryText}
					isShowSearchInput={isShowSearchInput}
					setIsShowSearchInput={() => setIsShowSearchInput(true)}
					onInputClose={onInputClose}
				/>
			</Header>
			<LobbyPageBanner
				alt='Fishing'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/fishing-banner.webp`}
			/>
			<div className={classNames('functionList', { active: !isNavInView })}>
        <VendorFilter pathRoot='' />
				<CategoryFilter />
			</div>
			<GameList />
		</LobbyGamePage>
	)
}

export default Fishing
