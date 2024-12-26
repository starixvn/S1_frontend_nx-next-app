import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { includes } from 'lodash-es'
import { useRouter } from 'next/router'
import { useState } from 'react'

const NewYearEvent = () => {
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { ALLOWED_CURRENCIES } = useStaticData()
	const { push } = useRouter()
	const [display, setDisplay] = useState(true)
	const { getBannerUrl } = useGlobalData()
	const allowedCurrency = includes(
		ALLOWED_CURRENCIES['NewYearEvent'],
		currencyId
	)
	if (!allowedCurrency || !display) return null

	return (
		display && (
			<div className='eventLink dragonegg-float'>
				<button
					className='icon icon-close'
					onClick={() => {
						setDisplay(false)
					}}
				/>
				<div
					onClick={() => push(paths.newYearEvent.root)}
					className='wheelModule dragonegg-egg'
				>
					<img
						className='dragonegg-egg-img'
						src={getBannerUrl(`/h5/img/event/dragonegg/entrance-${langId}.png`)}
						alt='entrance'
					/>
				</div>
			</div>
		)
	)
}

export default NewYearEvent
