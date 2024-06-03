import { useState } from 'react'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { includes } from 'lodash-es'
// import { useRetentionLandingPage } from '../../hooks'
import { useGetRetentionPromotionQuery } from '@nx-next-app/service'

const RetentionEntry = () => {
	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
	} = useAuth()
	const { ALLOWED_CURRENCIES } = useStaticData()
	const { push } = useRouter()
	const [display, setDisplay] = useState(true)

	const allowedCurrency = includes(ALLOWED_CURRENCIES['Retention'], currencyId)

	const { data: { data: { bonusCode = '' } = {} } = {} } =
		useGetRetentionPromotionQuery(
			{
				langId,
			},
			{
				skip: !langId || !isLogin,
			}
		)

	if (!allowedCurrency || !display) return null

	return (
		bonusCode && (
			<div className='eventLink'>
				<button
					type='button'
					aria-label='event-link'
					className='icon icon-close'
					onClick={() => setDisplay(false)}
				/>
				<div
					onClick={() => push(paths.retention.root)}
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
	)
}

export default RetentionEntry
