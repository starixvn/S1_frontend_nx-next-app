import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { includes } from 'lodash-es'
import { useRouter } from 'next/router'
import { useState } from 'react'

const LuckyWheel = () => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { ALLOWED_CURRENCIES } = useStaticData()
	const { push } = useRouter()
	const [display, setDisplay] = useState(true)

	const allowedCurrency = includes(
		ALLOWED_CURRENCIES['LUCKY_WHEEL'],
		currencyId
	)
	if (!allowedCurrency || !display) return null

	return (
		<div className='eventLink'>
			<button
				type='button'
				aria-label='event-link'
				className='icon icon-close'
				onClick={() => setDisplay(false)}
			/>

			<div onClick={() => push(paths.luckyWheel.root)} className='wheelModule'>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/wheel/eventlinkbg.png`}
					alt='luckywheel-img-eventlinkbg'
				/>
				<img
					className='eventlinkimg'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/wheel/eventlinkimg.png`}
					alt='luckywheel-img-eventlinkimg'
				/>
				<img
					className='eventlinkwin'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/wheel/eventlinkwin.png`}
					alt='luckywheel-img-eventlinkwin'
				/>
			</div>
		</div>
	)
}

export default LuckyWheel
