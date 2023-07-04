import React, { useEffect, useRef, useState } from 'react'
import CarouselBanner from '@nx-next-app/features/F0001/h5/common/carouselBanner'
import { useGetBannerV3Query } from '@nx-next-app/service'
import { DEVICE_TYPE, paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	IDisplayGameData,
	ISlotsGameData,
} from 'libs/web/src/service/gameApi/type'
import { useRouter } from 'next/router'
import VendorFilter from '@nx-next-app/features/F0001/h5/slots/vendorFilter'
import CategoryFilter from '@nx-next-app/features/F0001/h5/slots/CategoryFilter'
import GameList from '@nx-next-app/features/F0001/h5/slots/GameList'
import GameInfo from '@nx-next-app/features/F0001/h5/slots/GameInfo'
import { useTranslation } from 'next-i18next'
import { useSlotsVendorData } from '@nx-next-app/features/F0001/hooks/useSlotsVendorData'
import { useCategoryData } from '@nx-next-app/features/F0001/hooks/useSlotsCategoryData'
import { useSlotsGameData } from '@nx-next-app/features/F0001/hooks/useSlotsGameData'

const Slots = ({
	persistSlotsGameData,
	persistSlotsCategoryData,
}: {
	persistSlotsGameData: ISlotsGameData
	persistSlotsCategoryData: ISlotsGameData
}) => {
	const [isFixed, setIsFixed] = useState<boolean>(false)
	const [searchText, setSearchText] = useState<string>('')
	const [isShowSearchInput, setIsShowSearchInput] = useState(false)
	const [activeGame, setActiveGame] = useState<
		| (IDisplayGameData & {
				resultTpName?: string
				resultGameImgDisplayText?: string
				resultGameName?: string
		  })
		| null
	>(null)
	const gameListTpoRef = useRef<HTMLDivElement | null>(null)
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { push } = useRouter()
	const { t } = useTranslation()

	const {
		data: { data: bannerList = [] } = {},
		isFetching: isGetBannerV3Fetching,
	} = useGetBannerV3Query({
		bannerType: DEVICE_TYPE.Mobile,
		currencyId,
		langId,
	})

	const handleInputClose = () => {
		if (searchText !== '') {
			setSearchText('')
		} else {
			setIsShowSearchInput(false)
		}
	}
	const handleGameActive = (targetData: IDisplayGameData) => {
		setActiveGame(targetData)
	}

	const { vendorList, activeVendorTpId, onVendorChange } = useSlotsVendorData({
		persistProviderList: persistSlotsGameData.providerList || [],
	})

	const {
		categoryKeys,
		activeCategoryKey,
		searchCategoryText,
		onSearchCategoryTextChange,
		onCategoryChange,
	} = useCategoryData({
		persistSlotsCategoryData,
		loginCallback: () => push(paths.login.root),
	})

	const {
		slotsGameList,
		gameListRef,
		myFavorites,
		onFavoritesToggle,
		onGamePlay,
	} = useSlotsGameData({
		categoryKey: activeCategoryKey,
		searchCategoryText,
		persistSlotsCategoryData,
		loginCallback: () => push(paths.login.root),
	})

	// gameInfo更新isFavorite
	useEffect(() => {
		slotsGameList.forEach(({ tpId, gameId, isFavorite }: IDisplayGameData) => {
			if (activeGame?.tpId === tpId && activeGame?.gameId === gameId) {
				setActiveGame(prev => ({
					...(prev as IDisplayGameData & {
						resultTpName?: string
						resultGameImgDisplayText?: string
						resultGameName?: string
					}),
					isFavorite: !isFavorite,
				}))
			}
		})
	}, [myFavorites])

	// 監聽scrollbar固定vendorFilter & categoryFilter
	useEffect(() => {
		const handleScroller = () => {
			const gameListTop =
				gameListTpoRef?.current?.getBoundingClientRect().top ?? 0
			gameListTop >= 160 ? setIsFixed(false) : setIsFixed(true)
		}
		window.addEventListener('scroll', () => {
			handleScroller()
		})
		return () =>
			window.removeEventListener('scroll', () => {
				handleScroller()
			})
	}, [])

	return (
		<>
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
					<div className={`infoModule ${isShowSearchInput && 'active'}`}>
						<div className='inputBox'>
							<input
								placeholder={t('Label_SearchGames') as string}
								value={searchCategoryText}
								onChange={e => onSearchCategoryTextChange(e.target.value)}
							/>
							<i className='icon icon-close' onClick={handleInputClose} />
						</div>
					</div>
				</div>
			</header>
			<main className='main casino'>
				{!isGetBannerV3Fetching && <CarouselBanner bannerList={bannerList} />}
				<div className={`functionList ${isFixed ? ' active' : ''}`}>
					<VendorFilter
						vendorList={vendorList}
						activeVendorTpId={activeVendorTpId}
						onClick={onVendorChange}
					/>
					<CategoryFilter
						categoryList={categoryKeys}
						activeCategory={activeCategoryKey}
						onChange={onCategoryChange}
					/>
				</div>
				<GameList
					vendorList={vendorList}
					activeCategory={activeCategoryKey}
					slotsGameList={slotsGameList}
					gameListRef={gameListRef}
					gameListTpoRef={gameListTpoRef}
					imgUrl={persistSlotsGameData.imgUrl ?? ''}
					onActive={handleGameActive}
					onSetFavorites={onFavoritesToggle}
				/>
				{activeGame ? (
					<GameInfo
						imgUrl={persistSlotsGameData.imgUrl ?? ''}
						activeGame={activeGame}
						setActiveGame={setActiveGame}
						onSetFavorites={onFavoritesToggle}
						onPlay={onGamePlay}
					/>
				) : null}
			</main>
		</>
	)
}

export default Slots
