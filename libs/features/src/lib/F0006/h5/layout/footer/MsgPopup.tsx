import React from 'react'
import { useRouter } from 'next/router'
import { includes } from 'lodash'
import { paths } from '@nx-next-app/constants'
import { useBoolean } from 'usehooks-ts'
import { useGetMsgCountQuery, useGetPopupMsgQuery } from '@nx-next-app/service'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'

const MsgPopup = ({ isWalletActive }: { isWalletActive: boolean }) => {
	const { t } = useTranslation()
	const {
		auth: { isLogin },
	} = useAuth()
	const { value: isHided, setTrue } = useBoolean(false)
	const { data: { data: popupMsg } = {} } = useGetPopupMsgQuery(null, {
		skip: !isLogin,
	})
	const { data: { data: msgCount = 0 } = {} } = useGetMsgCountQuery(null, {
		skip: !isLogin,
	})

	const router = useRouter()

	const isMessagePage = // *  進入 message 頁面不顯示 popUp
		!includes(router.pathname, paths.message.root)

	const isPopupMsgActive = !!popupMsg?.id && isMessagePage

	return (
		<a
			className={classNames('icon icon-menu', {
				active:
					router.pathname.startsWith(`/${paths.setting.root}`) &&
					!isWalletActive,
			})}
			role='link'
			aria-hidden
			onClick={() => router.push(paths.setting.root)}
		>
			{msgCount > 0 && <div className='icon icon-envelope' />}
			{isPopupMsgActive && !isHided && (
				<div
					className='msgPop'
					onClick={e => {
						e.preventDefault()
						e.stopPropagation()
					}}
				>
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
			<div className='circleAnimation' />
			<span>{t('Label_General_More')}</span>
		</a>
	)
}

export default MsgPopup
