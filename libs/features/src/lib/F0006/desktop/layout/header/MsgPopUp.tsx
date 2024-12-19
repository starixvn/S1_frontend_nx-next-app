import { paths } from '@nx-next-app/constants'
import { useGetMsgCountQuery, useGetPopupMsgQuery } from '@nx-next-app/service'
import classNames from 'classnames'
import { includes } from 'lodash-es'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useBoolean } from 'usehooks-ts'

const MsgPopUp = () => {
	const { value: isHided, setTrue } = useBoolean(false)
	const { data: { data: popupMsg } = {} } = useGetPopupMsgQuery(null)
	const { data: { data: msgCount = 0 } = {} } = useGetMsgCountQuery(null)

	const router = useRouter()

	const isMessagePage = // *  進入 message 頁面不顯示 popUp
		!includes(router.pathname, paths.message.root)

	const isPopupCountActive = msgCount > 0 && isMessagePage
	const isPopupMsgActive = !!popupMsg?.id && isMessagePage

	return (
		<Link
			href={{
				pathname: paths.message.root,
			}}
		>
			<a
				className={classNames('icon icon-email', {
					active: isPopupCountActive,
				})}
			>
				{isPopupMsgActive && !isHided && (
					<div className='msgPop'>
						<div
							onClick={() => {
								router.push({
									pathname: paths.message.root,
									query: {
										msgId: popupMsg?.id ? popupMsg.id : undefined,
										popUpPageNumber: popupMsg.pageNumber
											? popupMsg.pageNumber
											: undefined,
									},
								})
							}}
						>
							{popupMsg?.popupMessage}
						</div>

						<button
							className='icon icon-close'
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								setTrue()
							}}
						/>
					</div>
				)}
			</a>
		</Link>
	)
}

export default MsgPopUp
