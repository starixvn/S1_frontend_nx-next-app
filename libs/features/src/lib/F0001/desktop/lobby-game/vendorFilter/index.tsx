import { VendorFilterContainer } from "@nx-next-app/features/F0001/desktop/lobby-game/vendorFilter/styles";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import classNames from "classnames";
import { ProviderEnum } from '@nx-next-app/types'
import VendorItem from "./VendorItem";

const VendorFilter = ({ pathRoot }: { pathRoot: string }) => {
	const {
		vendorList,
		activeVendorTpId,
		isActiveDropdown,
		onVendorChange,
		onToggleDropdown,
	} = useLobby()

	return (
		<VendorFilterContainer
			className={`${classNames({
				active: isActiveDropdown,
			})}`}
		>
			<div className='provider-list'>
				{vendorList?.map(({ tpId, openPath, tpName, imgName, displayText }) => (
            tpId !== ProviderEnum.MaxGame &&
            tpId !== ProviderEnum.Keno &&
            tpId !== ProviderEnum.Lottery &&
            tpId !== ProviderEnum.TableGame &&

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
				))}

          {
            vendorList.findIndex( x =>
              x.tpId === ProviderEnum.MaxGame ||
              x.tpId === ProviderEnum.Keno ||
              x.tpId === ProviderEnum.Lottery ||
              x.tpId === ProviderEnum.TableGame) !== -1 &&
              <VendorItem
                key={`lobby-vendor-${ProviderEnum.MaxPlay}`}
                onClick={() =>
                  onVendorChange({
                    tpId: ProviderEnum.MaxPlay,
                    openPath: "",
                    pathRoot,
                  })
                }
                isActive={activeVendorTpId === ProviderEnum.MaxPlay}
                displayText="MaxPlay"
                imgName="MaxPlay"
              />
          }
			</div>
			{vendorList?.length > 5 && (
				<button className='btn-toggle' onClick={() => onToggleDropdown()}>
					<span className='icon icon-chevron_down' />
				</button>
			)}
		</VendorFilterContainer>
	)
}

export default VendorFilter
