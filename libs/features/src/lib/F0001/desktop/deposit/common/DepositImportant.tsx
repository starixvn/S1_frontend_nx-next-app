import { openLiveChat } from '@nx-next-app/utils'
import { upperFirst } from 'lodash-es'
import { Trans, useTranslation } from 'next-i18next'

const DepositImportant = () => {
	const { t } = useTranslation()

	return (
		<div className='important'>
			<div className='title'>
				<span className='icon icon-alert-fill' />
				{t('Label_General_ImportantNotice')}
			</div>
			<ul>
				<li>1 . {t('Label_Deposit_ImportantNoticeContent1')}</li>
				<li>
					2 .
					<Trans
						i18nKey='Label_Deposit_ImportantNoticeContent2'
						components={{
							span: <span />,
						}}
					/>
				</li>
				<li>{t('Label_Deposit_ImportantNoticeContent3', {})}</li>
				<li>
					3 .
					<Trans
						i18nKey='Label_Deposit_ImportantNoticeContent4'
						components={{
							span: <span />,
						}}
						values={{
							site: upperFirst(process.env['NEXT_PUBLIC_BRAND_NAME'] || ''),
						}}
					/>
				</li>
				<li>
					4 .
					<Trans
						i18nKey='Label_Deposit_ImportantNoticeContent5'
						components={{
							span: <span />,
						}}
					/>
				</li>
				<li>
					5 .
					<Trans
						i18nKey='Label_Deposit_ImportantNoticeContent6'
						components={{
							Link: <a rel='noreferrer' target='_blank' href='https://line.me/ti/p/FKGAY68Tse' />,
						}}
					/>
				</li>
			</ul>
		</div>
	)
}

export default DepositImportant
