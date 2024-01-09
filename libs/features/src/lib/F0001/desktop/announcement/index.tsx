import dayjs from 'dayjs'
import { isEmpty } from 'lodash-es'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useGetAnnouncementQuery } from '@nx-next-app/service'

const Announcement = () => {
	const { t } = useTranslation()
	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const { data: { data: announcementList = [] } = {} } =
		useGetAnnouncementQuery({ langId, currencyId })

	const showAnnouncements = announcementList?.map(item => {
		const isToday = dayjs(item.startTime).format('L') === dayjs().format('L')

		const displayTime = isToday
			? dayjs(item.startTime).format('LTS')
			: dayjs(item.startTime).format('L')

		return (
			<div key={`announcement-${item.id}`}>
				<div className='listHeader'>
					<div>{item.subject}</div>
					<div className={classNames({ 'txt-blue': isToday })}>
						{displayTime}
					</div>
				</div>
				<pre className='listBody'>{item.content}</pre>
			</div>
		)
	})

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-icon32px_openmail'>
						{t('Label_Announcement')}
					</span>
				</div>

				{!isEmpty(announcementList) ? (
					<div className='announcement'>
						<div className='list'>{showAnnouncements}</div>
					</div>
				) : (
					<div className='nodata icon icon-nodata'>
						<div>{t('Label_General_NoData')}</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Announcement
