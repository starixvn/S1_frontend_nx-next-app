import { Header } from '@12b-h5/components/common'
import { Loading, SpinButton } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { usePersonalMessage } from '@nx-next-app/operations'
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { MessageItem } from './MessageItem'

function PersonalMessage() {
	const router = useRouter()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { msgId, popUpPageNumber } = router.query

	const {
		isLoading,
		infiniteScrollMode,
		msgList,
		selectedMessage,
		refetch,
		handleReadSelectedMsg,
		handleDeleteMessage,
		handleToggle,
		handleToggleAll,
	} = usePersonalMessage({
		mode: 'InfiniteScrollMode',
		id: msgId ? Number(msgId) : undefined,
		pageNumber: Number(popUpPageNumber || 1),
		errorCallback: modal.error,
	})

	const { msgListRef } = infiniteScrollMode

	function onDelete() {
		modal.confirm(
			[
				t('Label_General_AreYouSureDelete'),
				t('Label_General_CantBeRestore'),
			] as string[],
			{ onOK: handleDeleteMessage }
		)
	}

	return (
		<>
			<Header className='header'>
				<Header.Tags
					tags={[
						{ href: paths.profile.root, label: t('Label_Profile') },
						{
							href: paths.message.root,
							label: t('Label_Message'),
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
			<main className='main Message'>
				{/* eslint-disable-next-line no-nested-ternary */}
				{isLoading ? (
					<Loading />
				) : isEmpty(msgList) ? (
					<div className='nodata icon icon-nodata'>
						<div className='txt-white'>{t('Label_General_NoData')}</div>
					</div>
				) : (
					<>
						<div className='functionList'>
							<label className='checkbox'>
								<input
									type='checkbox'
									id='message-selectAll'
									onChange={handleToggleAll}
								/>
								<i
									className={classNames({
										'icon icon-checkbox-checked':
											msgList.length === selectedMessage.length,
										'icon icon-checkbox':
											msgList.length !== selectedMessage.length,
									})}
								/>
								{t('Label_Message_SelectAll')}
							</label>

							<div
								className={classNames('smallBtn-group', {
									active: !isEmpty(selectedMessage),
								})}
							>
								<button
									data-testid='readMsg'
									className='icon icon-icon32px_openmail'
									onClick={handleReadSelectedMsg}
								/>
								<button
									className='icon icon-bin'
									data-testid='deleteMsg'
									onClick={onDelete}
								/>
								<SpinButton className='icon icon-spinner11' onClick={refetch} />
							</div>
						</div>
						{msgList.map(item => {
							return (
								<MessageItem
									key={item.id}
									{...item}
									popUpMsgId={msgId ? Number(msgId) : null}
									selectedMessage={selectedMessage}
									onCheckBox={handleToggle}
								/>
							)
						})}
						<span ref={msgListRef} />
					</>
				)}
			</main>
		</>
	)
}

export default PersonalMessage
