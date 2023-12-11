import dayjs from 'dayjs'
import { some } from 'lodash-es'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import {
	IBasicMsg,
	IMsgContentData,
	IMsgData,
	useGetMsgContentMutation,
} from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

interface IMessageListProps extends IMsgData {
	isPopup: boolean
	selectedMessage: IBasicMsg[]
	onCheckBox: (id: number, isBatch: boolean) => void
}

const MessageList = ({
	flag,
	id,
	isBatch,
	title,
	createTime,
	isPopup = false,
	selectedMessage,
	onCheckBox,
}: IMessageListProps) => {
	const { modal } = useGlobalModal()
	const [isShowContent, setIsShowContent] = useState<boolean>(false)
	const [
		getMsgContent,
		{ data: { data: msgContentData = {} as IMsgContentData } = {} },
	] = useGetMsgContentMutation()

	const handleFetchMsgContent = async (
		msgId: number,
		isBatch: boolean,
		isGetMsgContent = false
	) => {
		if (isGetMsgContent) {
			try {
				// jira 單被清除 還未能下 enums
				await getMsgContent({ msgId, isBatch: isBatch ? 1 : 0 }).unwrap()
				setIsShowContent(true)
			} catch (error) {
				modal.error((error as Error).message)
			}
		} else {
			setIsShowContent(false)
		}
	}

	const showTimeFormat = () => {
		if (isShowContent) {
			return dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
		}

		return dayjs().diff(createTime, 'day') < 1
			? dayjs(createTime).format('HH:mm:ss')
			: dayjs(createTime).format('YYYY-MM-DD')
	}
	useEffect(() => {
		if (isPopup) {
			handleFetchMsgContent(id, isBatch, true)
		}
	}, [isPopup])

	return (
		<div className={classNames({ haveRead: flag })}>
			<div className={classNames('listHeader', { active: isShowContent })}>
				<div className='checkbox'>
					<input
						type='checkbox'
						id={`msgList-checkBox-${id}`}
						onClick={() => onCheckBox(id, isBatch)}
						checked={some(selectedMessage, { msgId: id })}
					/>
					<label
						aria-label='msgList-checkBox'
						htmlFor={`msgList-checkBox-${id}`}
						className='icon icon-checkbox-checked'
					/>
				</div>
				<div onClick={() => handleFetchMsgContent(id, isBatch, !isShowContent)}>
					{title}
				</div>
				<div
					className='txt-blue'
					onClick={() => handleFetchMsgContent(id, isBatch, !isShowContent)}
				>
					{showTimeFormat()}

					<button className='icon icon-keyboard_arrow_down' />
				</div>
			</div>
			<div
				className={classNames('listBody backstage', {
					active: isShowContent,
				})}
				// eslint-disable-next-line
				dangerouslySetInnerHTML={{ __html: msgContentData.content }}
			/>
		</div>
	)
}

export default MessageList
