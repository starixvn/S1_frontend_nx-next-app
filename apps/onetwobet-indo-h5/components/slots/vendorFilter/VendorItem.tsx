import { useGlobalData } from '@nx-next-app/data-access'
import { IVendorData } from '@nx-next-app/service'
import classNames from 'classnames'

interface IVendorItemProps {
	item: IVendorData
	tpId: number
	displayText: string
	activeVendorTpId?: string | number | null
	onClick: (provider: IVendorData) => void
}

const VendorItem = ({
	item,
	tpId,
	displayText,
	activeVendorTpId,
	onClick,
}: IVendorItemProps) => {
	const { getBannerUrl } = useGlobalData()
	return (
		<a
			onClick={() => onClick(item)}
			className={classNames({ active: tpId === activeVendorTpId })}
		>
			<img
				src={getBannerUrl(
					tpId === activeVendorTpId
						? `/h5/img/venderlogo/${item.imgName}a.png`
						: `/h5/img/venderlogo/${item.imgName}.png`
				)}
				alt={displayText}
			/>
		</a>
	)
}

export default VendorItem
