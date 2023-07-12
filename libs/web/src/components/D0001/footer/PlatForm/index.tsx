import React, { useState } from 'react'
import Image from 'next/future/image'
import { IPlatformListData } from 'libs/web/src/app/types/footer'

const PlatForm = ({ platformList }: { platformList: IPlatformListData[] }) => {
	const [onMouseOverImg, setOnMouseOverImg] = useState({})

	return (
		<div className='platform'>
			{platformList.map(({ key, imgName, hoverImgName }) => {
				const displayImgName =
					onMouseOverImg === imgName ? hoverImgName : imgName
				return (
					// todo:onClick事件
					<button
						key={key}
						type='button'
						className={displayImgName}
						style={{ width: '80px', height: '55px' }}
					>
						<Image
							style={{ width: '80px', height: '55px' }}
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/venderlogo/${displayImgName}.png`}
							alt={`logo ${displayImgName}`}
							width={80}
							height={55}
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
