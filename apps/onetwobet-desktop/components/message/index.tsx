import { Loading, SpinButton } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { usePersonalMessage } from '@nx-next-app/operations'
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Pagination from '../common/Pagination'
import { MessageItem } from './MessageItem'

const PersonalMessage = () => {
	const router = useRouter()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { msgId, popUpPageNumber } = router.query

	const {
		isLoading,
		paginationMode,
		msgList,
		selectedMessage,
		refetch,
		handleReadSelectedMsg,
		handleDeleteMessage,
		handleToggle,
		handleToggleAll,
	} = usePersonalMessage({
		mode: 'PaginationMode',
		id: msgId ? Number(msgId) : undefined,
		pageNumber: Number(popUpPageNumber || 1),
		errorCallback: modal.error,
	})

	const { currentPage, totalPages, onPageChange } = paginationMode

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
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-icon32px_openmail'>
						{t('Label_Message_PersonalMsg')}
					</span>
				</div>

				{/* eslint-disable-next-line no-nested-ternary */}
				{isLoading ? (
					<Loading />
				) : isEmpty(msgList) ? (
					<div className='nodata icon icon-nodata'>
						<div>{t('Label_General_NoData')}</div>
					</div>
				) : (
					<div className='personal'>
						<div className='list'>
							<div className='functionMenu'>
								<div className='checkbox'>
									<input
										type='checkbox'
										id='message-selectAll'
										onChange={handleToggleAll}
										checked={msgList.length === selectedMessage.length}
									/>
									<label
										htmlFor='message-selectAll'
										className='icon icon-checkbox-checked'
									/>
								</div>
								<div>
									<button
										className={classNames('icon icon-icon32px_openmail', {
											active: !isEmpty(selectedMessage),
										})}
										onClick={handleReadSelectedMsg}
									/>
									<button
										className={classNames('icon icon-bin', {
											active: !isEmpty(selectedMessage),
										})}
										onClick={onDelete}
									/>
								</div>
								<div>
									<SpinButton onClick={refetch} />
								</div>
							</div>
							{msgList.map(item => (
								<MessageItem
									key={item.id}
									{...item}
									isPopup={Number(msgId) === item.id}
									selectedMessage={selectedMessage}
									onCheckBox={handleToggle}
								/>
							))}
						</div>
						<div className='pagination'>
							<Pagination
								totalPage={totalPages}
								currentPage={currentPage}
								onPageChange={onPageChange}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default PersonalMessage
