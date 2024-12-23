import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { includes } from 'lodash-es'
import { useRouter } from 'next/router'
import { useState } from 'react'

const NewYear = () => {
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { ALLOWED_CURRENCIES } = useStaticData()
	const { push } = useRouter()
	const [display, setDisplay] = useState(true)

	const allowedCurrency = includes(
		ALLOWED_CURRENCIES['NewYearEvent'],
		currencyId
	)
	if (!allowedCurrency || !display) return null

	return (
		<div className='eventLink dragonegg-float'>
			<button
				className='icon icon-close'
				onClick={() => {
					setDisplay(false)
				}}
			/>
			<div
				onClick={() => push(paths.newYear.root)}
				className='wheelModule dragonegg-egg'
			>
				<img
					className='dragonegg-egg-img'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/dragonegg/entrance-${langId}.png`}
					alt='entrance'
				/>
			</div>
		</div>
	)
}

export default NewYear
