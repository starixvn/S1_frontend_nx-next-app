import { Header, SpinButton } from '@nx-next-app/components/H0001'
import Loading from '@nx-next-app/components/H0001/loading'
import { paths } from '@nx-next-app/constants'
import { WrapperMessageH5 } from '@nx-next-app/features/F0001/h5/message/styles'
import { useMessageFetcher } from '@nx-next-app/hooks'
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
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
		<WrapperMessageH5>
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
									'icon icon-checkbox-fill':
										msgList.length === selectedMessage.length,
									'icon icon-checkbox-blank-line':
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
								className='icon icon-mail-line'
								onClick={onReadSelectedMsg}
							/>
							<button
								className='icon icon-delete-bin-fill'
								data-testid='deleteMsg'
								onClick={onDeleteMessage}
							/>
							<SpinButton
								className='icon icon-refresh-fill'
								onClick={refetch}
							/>
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
		</WrapperMessageH5>
	)
}

export default PersonalMessage
