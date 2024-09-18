import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const Step3 = () => {
	const { t } = useTranslation()

	return (
		<>
			<div className='congrats'>
				<p>{t('Label_Join_Congratulations')}</p>
				{t('Label_Join_BecomingDistinguishedPlayer')}
			</div>
			<div className='Terms'>{t('Label_Join_AfterJoinHint')}</div>
			<Link href={paths.deposit.root}>
				<a className='btn-group'>
					<button>{t('Label_Join_DepositNow')}</button>
				</a>
			</Link>
		</>
	)
}

export { Step3 }
