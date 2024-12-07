import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { NoData } from '@nx-next-app/features/F0001/h5/deposit/common/NoData'
import { WrapperMessageH5 } from '@nx-next-app/features/F0001/h5/message/styles'
import { useGetAnnouncementQuery } from '@nx-next-app/service'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Announcement = () => {
	const { t } = useTranslation()
	const { pathname } = useRouter()
	const [selectedAnnouncement, setSelectedAnnouncement] = useState<
		number | null
	>(null)

	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const { data: { data: announcementList = [] } = {} } =
		useGetAnnouncementQuery({ langId, currencyId })

	const handleOpenItem = (announcementId: number) => {
		if (selectedAnnouncement === announcementId) {
			setSelectedAnnouncement(null)
		} else {
			setSelectedAnnouncement(announcementId)
		}
	}

	const arr = announcementList?.map(item => {
		const isOpen = selectedAnnouncement === item.id
		return (
			<div className={classNames('account', { active: isOpen })}>
				<div className='info'>
					<div className='introduction'>
						<span className='title'>{item.subject}</span>
						<span>{dayjs(item.startTime).format('L')}</span>
					</div>
					<button
						data-testid='displayBtn'
						className={classNames('icon icon-chevron_down', {
							active: isOpen,
						})}
						onClick={() => handleOpenItem(item.id)}
					/>
				</div>
				<div className='content'>
					<pre>{item.content}</pre>
				</div>
			</div>
		)
	})

	return (
		<WrapperMessageH5>
			<Header className='header'>
				<Header.Tags
					tags={[
						{
							href: paths.profile.root,
							label: t('Label_Profile'),
						},
						{
							href: paths.message.root,
							label: t('Label_Message'),
							active: Boolean(pathname.match(paths.announcement.root)),
						},
					]}
				/>

				<Header.Tags
					className='tag'
					tags={[
						{
							href: paths.message.root,
							label: t('Label_Message_PersonalMsg'),
						},
						{
							href: paths.announcement.root,
							label: t('Label_Announcement'),
						},
					]}
				/>
			</Header>

			<main className='main Announcement'>
				{!isEmpty(announcementList) ? arr : <NoData customClass='no-border' />}
			</main>
		</WrapperMessageH5>
	)
}

export default Announcement
