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

                    <i className='icon icon-deposit' />
                    <span>{t('Label_General_Deposit')}</span>

                </Link>
				{(ALLOWED_CURRENCIES['TRANSFER'] as CurrenciesEnum[]).includes(
					currencyId
				) && (
					(<Link href={paths.transferFunds.root}>

                        <i className='icon icon-transfer' />
                        <span>{t('Label_General_Transfer')}</span>

                    </Link>)
				)}
				<Link href={paths.withdrawal.root}>

                    <i className='icon icon-withdrawal' />
                    <span>{t('Label_General_Withdrawal')}</span>

                </Link>
				<Link href={paths.promotion.root} passHref>

                    <i className='icon icon-gift' />
                    <span>{t('Label_General_Promotion')}</span>

                </Link>
				<Link href={paths.statement.root}>

                    <i className='icon icon-history' />
                    <span>{t('Label_General_Statement')}</span>

                </Link>
			</div>
		</div>
    );
}

export { HeaderQuickLink }
