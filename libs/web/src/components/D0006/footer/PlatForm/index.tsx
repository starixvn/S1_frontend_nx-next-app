import { find } from 'lodash-es'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/future/image'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import type { IFooterData } from '@nx-next-app/types'

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
	const [onMouseOverImg, setOnMouseOverImg] = useState<string>('')
	const { modal } = useGlobalModal()
	const { menuList, onMenuOpen } = useMenu()

	const showPlatFormList = menuList.flatMap(mainMenuItem => {
		const { subMenu } = mainMenuItem || {}

		return subMenu?.flatMap(subMenuItem => {
			const defPlatformList = find(platformList, {
				tpGameIdNo: subMenuItem?.tpGameIdNo,
			})
			if (defPlatformList) {
				return {
					...subMenuItem,
					...defPlatformList,
				}
			}

			return []
		})
	})

	return (
		<div className='platform'>
			{showPlatFormList.map(prodictItem => {
				const { imgName, tpGameIdNo, hoverImgName } = prodictItem || {}
				const displayImgName =
					onMouseOverImg === imgName ? hoverImgName : imgName

				return (
					imgName && (
						<button
							key={tpGameIdNo}
							className={imgName}
							style={{ width: 'auto', height: '55px' }}
							onClick={() =>
								onMenuOpen(prodictItem, {
									loginCallback: () => modal.open(<LoginModal />),
									messageCallBack: message => modal.error(message),
								})
							}
						>
							<Image
								style={{ width: 'auto', height: '55px' }}
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/venderlogo/${displayImgName}.png`}
								alt={`logo ${imgName}`}
								width={80}
								height={55}
								onMouseOver={() => setOnMouseOverImg(imgName)}
								onMouseOut={() => setOnMouseOverImg('')}
							/>
						</button>
					)
				)
			})}
		</div>
	)
}

export default PlatForm
