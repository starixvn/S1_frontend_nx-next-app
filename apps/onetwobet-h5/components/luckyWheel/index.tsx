import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { includes } from 'lodash-es'
import { useRouter } from 'next/router'
import { useState } from 'react'

const LuckyWheel = () => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { getBannerUrl } = useGlobalData()
	const { ALLOWED_CURRENCIES } = useStaticData()
	const { push } = useRouter()
	const [display, setDisplay] = useState(true)

	const allowedCurrency = includes(
		ALLOWED_CURRENCIES['LUCKY_WHEEL'],
		currencyId
	)
	if (!allowedCurrency || !display) return null

	return (
		<div className='eventLink retentionlink'>
			<button
				type='button'
				aria-label='event-link'
				className='icon icon-close'
				onClick={() => setDisplay(false)}
			/>
			<a onClick={() => push(paths.luckyWheel.root)}>
				<img
					src={getBannerUrl('/desktop/img/event/retention/eventlink.webp')}
					alt='chest-eventlinkbg'
				/>
			</a>
		</div>
	)
}

export default LuckyWheel
