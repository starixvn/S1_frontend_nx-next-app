import { Loading, SpinButton } from '@nx-next-app/components/D0001'
import Pagination from '@nx-next-app/components/D0001/pagination'
import { NoData } from '@nx-next-app/features/F0001/desktop/common/NoData'
import { WrapperMessage } from '@nx-next-app/features/F0001/desktop/message/styles'
import { useMessageFetcher } from '@nx-next-app/hooks'
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import MessageList from './MessageList'

const PersonalMessage = () => {
	const { t } = useTranslation()
	const { messageModeResponse } = useMessageFetcher({
		mode: 'PaginationMode',
	})

	const {
		isLoading,
		msgId,
		paginationMode,
		selectedMessage,
		msgList,
		refetch,
		onReadSelectedMsg,
		onToggleCheckedAll,
		onClickCheckBox,
		onDeleteMessage,
	} = messageModeResponse

	const { currentPage, totalPages, onPageChange } = paginationMode

	return (
		<div className='rightModule'>
			<WrapperMessage>
				<div className='infoModule'>
					<div className='inside-title'>
						<div className='group-icon-title'>
							<i className='icon icon-mail-line' />
							{t('Label_Message_PersonalMsg')}
						</div>
					</div>
					<div className='inside-body'>
						{!isEmpty(msgList) ? (
							<>
								{!isLoading ? (
									<div className='personal'>
										<div className='list'>
											<div className='functionMenu'>
												<div className='checkbox'>
													<input
														type='checkbox'
														id='message-selectAll'
														onChange={onToggleCheckedAll}
														checked={msgList.length === selectedMessage.length}
													/>
													<label
														htmlFor='message-selectAll'
														className='icon icon-checkbox-blank-line'
													/>
												</div>
												<div className='group-btn-message'>
													<div className='group-btn'>
														<button
															className={classNames('icon icon-mail-line', {
																active:
																	msgList.length === selectedMessage.length,
															})}
															onClick={onReadSelectedMsg}
														/>
														<button
															className={classNames(
																'icon icon-delete-bin-fill',
																{
																	active:
																		msgList.length === selectedMessage.length,
																}
															)}
															onClick={onDeleteMessage}
														/>
													</div>
													<div>
														<SpinButton onClick={refetch} />
													</div>
												</div>
											</div>
											{msgList.map(item => (
												<MessageList
													key={item.id}
													{...item}
													isPopup={Number(msgId) === item.id}
													selectedMessage={selectedMessage}
													onCheckBox={onClickCheckBox}
												/>
											))}
										</div>
									</div>
								) : (
									<Loading />
								)}

								{!isLoading && (
									<div className='pagination'>
										<Pagination
											totalPage={totalPages}
											currentPage={currentPage}
											onPageChange={onPageChange}
										/>
									</div>
								)}
							</>
						) : (
							<NoData />
						)}
					</div>
				</div>
			</WrapperMessage>
		</div>
	)
}

export default PersonalMessage
