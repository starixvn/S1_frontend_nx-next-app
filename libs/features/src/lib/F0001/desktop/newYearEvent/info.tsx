import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { CurrenciesEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

export const prizeAmount = [
	{
		currency: CurrenciesEnum.MYR,
		min: '18',
		max: '68',
		blessing: '888',
		APPrize: '28',
	},
	{
		currency: CurrenciesEnum.THB,
		min: '130',
		max: '530',
		blessing: '5,888',
		APPrize: '200',
	},
	{
		currency: CurrenciesEnum.IDR,
		min: '58K',
		max: '200K',
		blessing: '2,888,000',
		APPrize: '100K',
	},
	{
		currency: CurrenciesEnum.VND,
		min: '88K',
		max: '338K',
		blessing: '4,588,000',
		APPrize: '150K',
	},
]

const Info = () => {
	const { t } = useTranslation()
	const {
		auth: { isLogin },
		userInfo: { currencyId, currencyName },
	} = useAuth()

	if (!currencyId || !Object.keys(prizeAmount).includes(String(currencyId)))
		return null

	const { getBannerUrl } = useGlobalData()

	return (
		<div className={classNames('event-info', { logbefore: !isLogin })}>
			<div className='event-info-tc'>
				<div className='event-title'>
					{t('Label_DragonEgg_Terms&Conditions')}
				</div>
				<div className='text'>- {t('Label_DragonEgg_Terms1')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms2')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms3')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms4')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms5')}</div>
				<div className='text'>
					-
					{t('Label_DragonEgg_Terms6', {
						currencyName,
						min: prizeAmount.find(x => x.currency === currencyId)?.min,
						max: prizeAmount.find(x => x.currency === currencyId)?.max,
						APPrize: prizeAmount.find(x => x.currency === currencyId)?.APPrize,
					})}
				</div>
				<div className='text'>
					-{' '}
					{t('Label_DragonEgg_Terms7', {
						currencyName,
						amount: prizeAmount.find(x => x.currency === currencyId)?.blessing,
					})}
				</div>
				<div className='text'>- {t('Label_DragonEgg_Terms8')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms9')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms10')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms11')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms12')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms13')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms14')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms15')}</div>
				<div className='text'>- {t('Label_DragonEgg_Terms16')}</div>
			</div>

			<div className='event-info-sponsor'>
				<div className='event-title'>{t('Label_DragonEgg_Sponsor')}</div>
				<div className='sponsor'>
					<div>
						<img
							src={getBannerUrl(
								'/desktop/img/event/dragonegg/sponsors_ap_logo.png'
							)}
							alt='sponsors_ap_logo'
						/>
					</div>
					<div>
						<img
							src={getBannerUrl(
								'/desktop/img/event/dragonegg/sponsors_pp_logo.png'
							)}
							alt='sponsors_pp_logo'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Info
