import { useTranslation } from 'next-i18next'
import { IHighlightData } from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/data-access'
import { LatestVideo } from './LatestVideo'
import { CurrenciesEnum } from '@nx-next-app/types'

interface LatestVideoAndEventProps {
	latestHighlightVideo: IHighlightData
	jackPotCurrencies: CurrenciesEnum[]
}
const index = ({
	latestHighlightVideo,
	jackPotCurrencies,
}: LatestVideoAndEventProps) => {
	const { t } = useTranslation()
	const { userInfo } = useAuth()

	return (
		<div className='liveVideo'>
			<LatestVideo latestHighlightVideo={latestHighlightVideo} />
		</div>
	)
}

export { index as LatestVideAndEvent }
