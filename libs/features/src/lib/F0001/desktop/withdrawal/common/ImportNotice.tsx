import { openLiveChat } from '@nx-next-app/utils'
import { Trans, useTranslation } from 'next-i18next'

const ImportNotice = () => {
	const { t } = useTranslation()
	return (
		<div className='important'>
			<div className='title'>
				<span className='icon icon-alert-fill' />
				{t('Label_General_ImportantNotice')}
			</div>
			<ul>
				<li>
					<Trans
						i18nKey='Label_Withdrawal_ImportantNoticeContent1'
						components={{
							Link: <a rel='noreferrer' target='_blank' href='https://line.me/ti/p/FKGAY68Tse' />,
						}}
					/>
				</li>
				<li>{t('Label_Withdrawal_ImportantNoticeContent2')}</li>
				<li>{t('Label_Withdrawal_ImportantNoticeContent3')}</li>
				<li>{t('Label_Withdrawal_ImportantNoticeContent4')}</li>
				<li>
					<Trans
						i18nKey='Label_Withdrawal_ImportantNoticeContent5'
						components={{
							Link: <a rel='noreferrer' target='_blank' href='https://line.me/ti/p/FKGAY68Tse' />,
						}}
					/>
				</li>
			</ul>
		</div>
	)
}

export { ImportNotice }
