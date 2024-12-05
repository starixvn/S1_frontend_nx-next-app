import { IVendorData } from "@nx-next-app/service";
import classNames from "classnames";
import process from "process";

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
	return (
		<a
			onClick={() => onClick(item)}
			className={classNames({ active: tpId === activeVendorTpId })}
		>
			<div className='img-container'>
				<img
					src={`${
						process.env['NEXT_PUBLIC_BANNER_HOST']
					}/h5/img/new-ui/filter-form-provider-logo/${item.imgName}${
						tpId === activeVendorTpId ? 'a' : ''
					}.png`}
					alt={displayText}
				/>
			</div>
			<div className='provider-name'>{displayText}</div>
		</a>
	)
}

export default VendorItem
