import { useState } from 'react'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useRouter } from 'next/router'
// import { useRetentionLandingPage } from '../../hooks'
import { includes } from 'lodash-es'
import { paths } from '@nx-next-app/constants'
// import { useRetentionLandingPage } from '../../hooks'

const RetentionEntry = () => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { ALLOWED_CURRENCIES } = useStaticData()
	const router = useRouter()
	const [display, setDisplay] = useState(true)

	const allowedCurrency = includes(ALLOWED_CURRENCIES['Retention'], currencyId)
	// const { retentionBonusCode } = useRetentionLandingPage()
	// const { data: { data: { bonusCode = '' } = {} } = {} } =
	// 	useGetRetentionPromotionQuery(
	// 		{
	// 			langId,
	// 		},
	// 		{
	// 			skip: !langId,
	// 		}
	// 	)

	if (!allowedCurrency || !display) return null

	// console.log('retentionBonusCode', retentionBonusCode)

	return (
		<>
			(
			<div
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
					onClick={() => router.push(paths.retention.root)}
					className='wheelModule'
					style={{ cursor: 'pointer' }}
				>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/retention/eventlink.webp`}
						alt='home-chest'
					/>
				</div>
			</div>
			)
		</>
	)
}

export default RetentionEntry
