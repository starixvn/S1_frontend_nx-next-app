import { useTranslation, Trans } from 'next-i18next'
import { openLiveChat } from '@nx-next-app/utils'
import { upperFirst } from 'lodash-es'

const DepositImportant = () => {
	const { t } = useTranslation()

	return (
		<div className='important'>
			<div className='title'>
				<span className='icon icon-warning' />
				{t('Label_General_ImportantNotice')}
			</div>
			<ul>
				<li>{t('Label_Deposit_ImportantNoticeContent1')}</li>
				<li>
					<Trans
						i18nKey='Label_Deposit_ImportantNoticeContent2'
						components={{
							span: <span />,
						}}
					/>
				</li>
				<li>{t('Label_Deposit_ImportantNoticeContent3', {})}</li>
				<li>
					<Trans
						i18nKey='Label_Deposit_ImportantNoticeContent4'
						components={{
							span: <span />,
						}}
						values={{
							site: upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'] || ''),
						}}
					/>
				</li>
				<li>
					<Trans
						i18nKey='Label_Deposit_ImportantNoticeContent5'
						components={{
							span: <span />,
						}}
					/>
				</li>
				<li>
					<Trans
						i18nKey='Label_Deposit_ImportantNoticeContent6'
						components={{
							a: <button onClick={() => openLiveChat()} />,
						}}
					/>
				</li>
			</ul>
		</div>
	)
}

export default DepositImportant
