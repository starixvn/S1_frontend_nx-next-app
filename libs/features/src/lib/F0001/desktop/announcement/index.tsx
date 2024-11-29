import { useAuth } from '@nx-next-app/data-access'
import { WrapperAnnountMent } from '@nx-next-app/features/F0001/desktop/announcement/styles'
import { NoData } from '@nx-next-app/features/F0001/desktop/common/NoData'
import { useGetAnnouncementQuery } from '@nx-next-app/service'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'

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
			<div key={`announcement-${item.id}`} className='group-list'>
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
			<WrapperAnnountMent>
				<div className='infoModule'>
					<div className='inside-title'>
						<div className='group-icon-title'>
							<i className='icon icon-notification-active' />
							{t('Label_Announcement')}
						</div>
					</div>
					<div className='inside-body'>
						{!isEmpty(announcementList) ? (
							<div className='announcement'>
								<div className='list'>{showAnnouncements}</div>
							</div>
						) : (
							<NoData customClass='no-border' />
						)}
					</div>
				</div>
			</WrapperAnnountMent>
		</div>
	)
}

export default Announcement
