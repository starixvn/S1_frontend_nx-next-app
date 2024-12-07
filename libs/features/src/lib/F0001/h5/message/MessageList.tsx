import { paths } from '@nx-next-app/constants'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { some } from 'lodash-es'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	IBasicMsg,
	IMsgContentData,
	IMsgData,
	useGetMsgContentMutation,
} from '@nx-next-app/service'

interface IMessageListProps extends IMsgData {
	popUpMsgId: number | null
	selectedMessage: IBasicMsg[]
	onCheckBox: (id: number, isBatch: boolean) => void
}

const MessageList = ({
	flag,
	id,
	isBatch,
	title,
	createTime,
	selectedMessage,
	onCheckBox,
	popUpMsgId,
}: IMessageListProps) => {
	const router = useRouter()
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

	useEffect(() => {
		if (Number(popUpMsgId) === id) {
			handleFetchMsgContent(id, isBatch, true)
		}
	}, [popUpMsgId])

	return (
		<div
			className={classNames(
				'account',
				{ noread: !flag },
				{ active: isShowContent }
			)}
			ref={node => {
				if (node && id === popUpMsgId) {
					node.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
						inline: 'nearest',
					})
					// * 清除 query 避免觸發 scrollIntoView
					router.replace(paths.message.root, undefined, { shallow: true })
				}
			}}
		>
			<div className='info'>
				<label className='checkbox'>
					<input type='checkbox' onClick={() => onCheckBox(id, isBatch)} />
					<i
						data-testid='checkIcon'
						className={classNames({
							'icon icon-checkbox-fill': some(selectedMessage, {
								msgId: id,
							}),
							'icon icon-checkbox-blank-line': !some(selectedMessage, {
								msgId: id,
							}),
						})}
					/>
				</label>
				<div className='introduction'>
					<span className='title'>{title}</span>
					<span>{dayjs(createTime).format('MM/DD/YYYY h:mm:ss A')}</span>
				</div>
				<button
					className={classNames({
						'icon icon-chevron_down': { active: isShowContent },
					})}
					data-testid='openBtn'
					onClick={() => handleFetchMsgContent(id, isBatch, !isShowContent)}
				/>
			</div>
			<div
				className='content backstage'
				// eslint-disable-next-line
				dangerouslySetInnerHTML={{ __html: msgContentData.content }}
			/>
		</div>
	)
}

export default MessageList
