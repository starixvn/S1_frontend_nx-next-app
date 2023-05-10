import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { includes } from 'lodash'
import { useBoolean } from 'usehooks-ts'
import { paths } from '@nx-next-app/constants'
import { useGetPopupMsgQuery } from '@nx-next-app/service'

const MsgPopUp = () => {
	const { value: isHided, setTrue } = useBoolean(false)
	const { data: { data: popupMsg } = {} } = useGetPopupMsgQuery(null)
	const router = useRouter()

	const isActive =
		// *  進入 message 頁面不顯示 popUp
		!includes(router.pathname, paths.message.root) && !!popupMsg?.id

	return (
		<Link href={paths.message.root}>
			<a className={classNames('icon icon-email', { active: isActive })}>
				{isActive && !isHided && (
					<div className='msgPop'>
						<div
							onClick={() => {
								router.push(paths.message.root)
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
