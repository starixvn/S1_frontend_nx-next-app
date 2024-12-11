import { VendorFilterContainer } from '@nx-next-app/features/F0001/desktop/lobby-game/vendorFilter/styles'
import { useLobby } from '@nx-next-app/features/F0001/providers'
import { IVendorData } from '@nx-next-app/service'
import { ProviderEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import VendorItem from './VendorItem'

const VendorFilter = ({ pathRoot }: { pathRoot: string }) => {
	const {
		vendorList,
		activeVendorTpId,
		isActiveDropdown,
		onVendorChange,
		onToggleDropdown,
		providerSize,
	} = useLobby()

	const [providerCount, setProviderCount] = useState<number>(0)
	const [filterProviderList, setFilterProviderList] = useState<
		IVendorData[] | null
	>(null)
	const [showMaxPLay, setShowMaxPlay] = useState<boolean>(false)

	useEffect(() => {
		const isShowMaxPLay = vendorList?.findIndex(
			x =>
				x.tpId === ProviderEnum.MaxGame ||
				x.tpId === ProviderEnum.Keno ||
				x.tpId === ProviderEnum.Lottery ||
				x.tpId === ProviderEnum.TableGame
		)
		setShowMaxPlay(!!isShowMaxPLay)

		const filterList = vendorList?.filter(
			vendor =>
				vendor.tpId !== ProviderEnum.MaxGame &&
				vendor.tpId !== ProviderEnum.Keno &&
				vendor.tpId !== ProviderEnum.Lottery &&
				vendor.tpId !== ProviderEnum.TableGame
		)

		setFilterProviderList(filterList)

		const countMaxPlay = isShowMaxPLay ? 1 : 0
		setProviderCount(filterList.length + countMaxPlay)
	}, [vendorList])

	return (
		<VendorFilterContainer
			className={`${classNames({
				active: isActiveDropdown,
			})}`}
		>
			<div className='provider-list'>
				{filterProviderList?.map(
					({ tpId, openPath, tpName, imgName, displayText }) => (
						<VendorItem
							key={`lobby-vendor-${tpId}`}
							onClick={() =>
								onVendorChange({
									tpId,
									openPath,
									pathRoot,
								})
							}
							isActive={activeVendorTpId === tpId}
							displayText={displayText}
							imgName={imgName}
						/>
					)
				)}

				{showMaxPLay && (
					<VendorItem
						key={`lobby-vendor-${ProviderEnum.MaxPlay}`}
						onClick={() =>
							onVendorChange({
								tpId: ProviderEnum.MaxPlay,
								openPath: '',
								pathRoot,
							})
						}
						isActive={activeVendorTpId === ProviderEnum.MaxPlay}
						displayText='MaxPlay'
						imgName='maxplay'
					/>
				)}
			</div>
			{providerCount > providerSize && (
				<button className='btn-toggle' onClick={() => onToggleDropdown()}>
					<span className='icon icon-chevron_down' />
				</button>
			)}
		</VendorFilterContainer>
	)
}

export default VendorFilter
