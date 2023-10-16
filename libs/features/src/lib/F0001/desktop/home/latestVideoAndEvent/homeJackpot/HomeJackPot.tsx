import Link from 'next/link'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import { useAuth } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'
import { JackPot } from '@nx-next-app/components/D0001'
import { useRouter } from 'next/router'
import { useHome } from '@nx-next-app/features/F0001/providers/home-context'

const HomeJackPot = () => {
	const { t } = useTranslation()
	const { jackPotCurrencies } = useHome()
	const { userInfo } = useAuth()
	const { currencyId, langId } = userInfo
	const { push } = useRouter()

	return (
		<div className='jpotModule'>
			{includes(jackPotCurrencies, currencyId) ? (
				<>
					<div className='moduleTitle'>{t('Label_General_Jackpot')}</div>
					<JackPot onClick={() => push(paths.slots.root)} isRoot />
				</>
			) : (
				<>
					<div className='moduleTitle'>{t('Label_General_Slots')}</div>
					<Link href={paths.slots.root}>
						<a className='slotsbox'>
							<Image
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/indexslots_bg_${langId}.jpg`}
								alt='slots-bg'
								width={605}
								height={215}
							/>
							<Image
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/indexslots_items.png`}
								alt='slots-items'
								width={362}
								height={291}
							/>
						</a>
					</Link>
				</>
			)}
		</div>
	)
}

export default HomeJackPot
