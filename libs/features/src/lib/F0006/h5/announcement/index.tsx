import dayjs from 'dayjs'
import { useState } from 'react'
import { isEmpty } from 'lodash-es'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useGetAnnouncementQuery } from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/data-access'
import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'

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

	const arr = announcementList.map(item => {
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
						className={classNames('icon icon-keyboard_arrow_down', {
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
		<>
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
				<div className='functionList' />
				{!isEmpty(announcementList) ? (
					arr
				) : (
					<div className='nodata icon icon-nodata'>
						<div className='txt-white'>{t('Label_General_NoData')}</div>
					</div>
				)}
			</main>
		</>
	)
}

export default Announcement
