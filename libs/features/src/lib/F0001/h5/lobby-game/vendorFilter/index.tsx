import { VendorFilterContainer } from "@nx-next-app/features/F0001/h5/lobby-game/vendorFilter/styles";
import VendorItem from "@nx-next-app/features/F0001/h5/slots/vendorFilter/VendorItem";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import { IVendorData } from '@nx-next-app/service'
import { ProviderEnum } from '@nx-next-app/types'
import { useEffect, useState } from 'react'

const VendorFilter = ({ pathRoot }: { pathRoot: string }) => {
	const {
		vendorList,
		activeVendorTpId,
		onVendorChange
	} = useLobby()

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
		setShowMaxPlay(isShowMaxPLay !== -1)

		const filterList = vendorList?.filter(
			vendor =>
				vendor.tpId !== ProviderEnum.MaxGame &&
				vendor.tpId !== ProviderEnum.Keno &&
				vendor.tpId !== ProviderEnum.Lottery &&
				vendor.tpId !== ProviderEnum.TableGame
		)

		setFilterProviderList(filterList)
	}, [vendorList])

	return (
		<VendorFilterContainer>
			{filterProviderList?.map(
				({
					tpId,
					displayText,
					openPath,
					pathRoot,
					tpName,
					imgName,
					...rest
				}) => {
					return (
						<VendorItem
							key={`slot-swiper-${tpId}`}
							displayText={displayText}
							imgName={imgName}
							isActive={activeVendorTpId === tpId}
							onClick={() =>
								onVendorChange({
									tpId,
									openPath,
									pathRoot,
								})
							}
						/>
					)
				}
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
		</VendorFilterContainer>
	)
}

export default VendorFilter
