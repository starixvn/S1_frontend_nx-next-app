import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { IFooterData } from '@nx-next-app/types'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { find } from 'lodash-es'
import { Img } from '../../image'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const PlatForm = ({
	platformList = [],
}: {
	platformList: IFooterData['platformList']
}) => {
	const [onMouseOverImg, setOnMouseOverImg] = useState({})
	const { modal } = useGlobalModal()
	const { menuData, onMenuOpen } = useMenu()

	const allSubMenu = Object.values(menuData).flatMap(item => item.subMenu)

	return (
		<div className='platform'>
			{platformList.map(({ productKey, imgName, hoverImgName }) => {
				const displayImgName =
					onMouseOverImg === imgName ? hoverImgName : imgName

				const subMenu = find(allSubMenu, { productKey })

				if (!subMenu?.desktop) return null

				const {
					desktop: { menuActionType },
					pathname,
					query,
					product,
				} = subMenu

				return (
					<button
						key={productKey}
						type='button'
						className={displayImgName}
						style={{ width: 'auto', height: '55px' }}
						onClick={() => {
							onMenuOpen(
								{ desktop: { menuActionType }, pathname, query, product },
								{
									loginCallback: () => modal.open(<LoginModal />),
									messageCallBack: message => modal.error(message),
								}
							)
						}}
					>
						<Img
							style={{ width: 'auto', height: '55px' }}
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/venderlogo/${displayImgName}.png`}
							alt={`logo ${displayImgName}`}
							onMouseOver={() => setOnMouseOverImg(imgName)}
							onMouseOut={() => setOnMouseOverImg({})}
						/>
					</button>
				)
			})}
		</div>
	)
}

export default PlatForm
