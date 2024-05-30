import { useState } from 'react'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { includes } from 'lodash-es'
import { useRetentionLandingPage } from '../../hooks'

const RetentionEntry = () => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { ALLOWED_CURRENCIES } = useStaticData()
	const { push } = useRouter()
	const [display, setDisplay] = useState(true)

	const allowedCurrency = includes(
		ALLOWED_CURRENCIES['Retention'],
		currencyId
	)
	if (!allowedCurrency || !display) return null

	const { retentionBonusCode } = useRetentionLandingPage()
	
	return (
		<>
			{retentionBonusCode ? (
				<div
					// className='eventLink'
					className='eventLink'
					style={{ borderLeft: '300px', background: 'aqua' }}
				>
					<button
						type='button'
						aria-label='event-link'
						className='icon icon-close'
						onClick={() => setDisplay(false)}
					/>
					<div
						onClick={() => push(paths.retention.root)}
						// className='wheelModule'
						className='123'
						style={{ cursor: 'pointer' }}
					>
						<img
							// src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/retention/eventlink.webp`}
							src='https://www.shutterstock.com/image-illustration/jakarta-indonesia-december-10-2020-260nw-1871169331.jpg'
							alt='home-chest'
						/>
					</div>
				</div>
			) : (
				''
			)}
		</>
	)
}

export default RetentionEntry
