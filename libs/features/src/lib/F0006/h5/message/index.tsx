import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useMessageFetcher } from '@nx-next-app/hooks'
import Loading from '@nx-next-app/components/H0006/loading'
import { Header, SpinButton } from '@nx-next-app/components/H0006'
import MessageList from './MessageList'

const PersonalMessage = () => {
	const { t } = useTranslation()
	const { messageModeResponse } = useMessageFetcher({
		mode: 'InfiniteScrollMode',
	})

	const {
		infiniteScrollMode,
		isLoading,
		msgId,
		selectedMessage,
		msgList,
		refetch,
		onReadSelectedMsg,
		onToggleCheckedAll,
		onClickCheckBox,
		onDeleteMessage,
	} = messageModeResponse

	const { msgListRef } = infiniteScrollMode

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

			{!isLoading ? (
				<main className='main Message'>
					<div className='functionList'>
						<label className='checkbox'>
							<input
								type='checkbox'
								id='message-selectAll'
								onChange={onToggleCheckedAll}
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
								onClick={onReadSelectedMsg}
							/>
							<button
								className='icon icon-bin'
								data-testid='deleteMsg'
								onClick={onDeleteMessage}
							/>
							<SpinButton className='icon icon-spinner11' onClick={refetch} />
						</div>
					</div>

					{msgList.map(item => {
						return (
							<MessageList
								key={item.id}
								{...item}
								popUpMsgId={msgId ? Number(msgId) : null}
								selectedMessage={selectedMessage}
								onCheckBox={onClickCheckBox}
							/>
						)
					})}
					<span ref={msgListRef} />
				</main>
			) : (
				<Loading />
			)}
		</>
	)
}

export default PersonalMessage
