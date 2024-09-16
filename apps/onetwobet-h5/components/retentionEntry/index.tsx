import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { useGetRetentionPromotionQuery } from '@nx-next-app/service'
import { includes } from 'lodash-es'
import { useRouter } from 'next/router'
import { useState } from 'react'

const RetentionEntry = () => {
	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
	} = useAuth()
	const { getBannerUrl } = useGlobalData()
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

	return bonusCode ? (
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
					src={getBannerUrl('/desktop/img/event/retention/eventlink.webp')}
					alt='home-chest'
				/>
			</div>
		</div>
	) : null
}

export default RetentionEntry
