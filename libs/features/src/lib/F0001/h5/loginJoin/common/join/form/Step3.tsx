import { paths } from '@nx-next-app/constants'
import { WrapperCongrats } from '@nx-next-app/features/F0001/h5/loginJoin/common/join/styles'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const Step3 = () => {
	const { t } = useTranslation()

	return (
		<WrapperCongrats>
			<div className='congrats'>
				<div className='group-icon-check'>
					<i className='icon icon-check' />
				</div>
				<p>{t('Label_Join_Congratulations')}</p>
				{t('Label_Join_BecomingDistinguishedPlayer')}
			</div>
			<div className='Terms'>{t('Label_Join_AfterJoinHint')}</div>
			<Link href={paths.deposit.root}>
				<a className='btnGroup'>
					<button className='btn-primary'>{t('Label_Join_DepositNow')}</button>
				</a>
			</Link>
		</WrapperCongrats>
	)
}

export { Step3 }
