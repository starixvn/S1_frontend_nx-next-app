import React from 'react'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useMessageFetcher } from '@nx-next-app/hooks'
import Pagination from '@nx-next-app/components/D0006/pagination'
import { Loading, SpinButton } from '@nx-next-app/components/D0006'
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
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-icon32px_openmail'>
						{t('Label_Message_PersonalMsg')}
					</span>
				</div>

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
												className='icon icon-checkbox-checked'
											/>
										</div>
										<div>
											<button
												className='icon icon-icon32px_openmail'
												onClick={onReadSelectedMsg}
											/>
											<button
												className='icon icon-bin'
												onClick={onDeleteMessage}
											/>
										</div>
										<div>
											<SpinButton onClick={refetch} />
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
					<div className='nodata icon icon-nodata'>
						<div>{t('Label_General_NoData')}</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default PersonalMessage
