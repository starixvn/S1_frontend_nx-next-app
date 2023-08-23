import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { CurrenciesEnum } from '@nx-next-app/types'

const HeaderQuickLink = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { ALLOWED_CURRENCIES } = useStaticData()

	return (
		<div className='submenu'>
			<div className='thBar'>
				<Link href={paths.deposit.root}>
					<a>
						<i className='icon icon-deposit' />
						<span>{t('Label_General_Deposit')}</span>
					</a>
				</Link>
				{(ALLOWED_CURRENCIES['TRANSFER'] as CurrenciesEnum[]).includes(
					currencyId
				) && (
					<Link href={paths.transferFunds.root}>
						<a>
							<i className='icon icon-transfer' />
							<span>{t('Label_General_Transfer')}</span>
						</a>
					</Link>
				)}
				<Link href={paths.withdrawal.root}>
					<a>
						<i className='icon icon-withdrawal' />
						<span>{t('Label_General_Withdrawal')}</span>
					</a>
				</Link>
				<Link href={paths.promotion.root}>
					<a>
						<i className='icon icon-gift' />
						<span>{t('Label_General_Promotion')}</span>
					</a>
				</Link>
				<Link href={paths.statement.root}>
					<a>
						<i className='icon icon-history' />
						<span>{t('Label_General_Statement')}</span>
					</a>
				</Link>
			</div>
		</div>
	)
}

export { HeaderQuickLink }
