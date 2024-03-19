import { useRouter } from 'next/router'
import { useState } from 'react'
import {
	LineLoginDirectTypeEnum,
	useLazyGetLineUserIdQuery,
} from '@nx-next-app/service'
import { useInterval } from 'usehooks-ts'
import { setCookie } from 'cookies-next'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '../app/constants/paths'
import { ENV_COOKIE_NAMES } from '../app/constants/Names'

/**
 * 決定透過 line 登入後，後續應倒轉至哪個頁面並完成登入
 *
 * ex: https://stage.nova88dev.com/callback?code=LPqM5A3VB5XYcthYHJP5&state=3d5c23b0-caae-4306-bab9-618833f0bfe0
 * 透過 query:code、state、error 來 fetch api 決定後續情境
 *
 */
export const useCheckLineDirect = ({ langId }: { langId: string }) => {
	const { modal } = useGlobalModal()
	const {
		query: {
			code = '',
			state = '',
			error = '',
			description = '',
			errormessage = '',
		},
	} = useRouter()
	const [isChecked, setIsChecked] = useState(false)
	const { push } = useRouter()
	const [getLineUserId] = useLazyGetLineUserIdQuery()

	// * 使用 useInterval 每秒輪詢，等抓得到 FPS 資訊 (di, bi, detecasAnalysis, sessionKey, token) 及 url query 就往下執行
	useInterval(
		() => {
			const handleLineDirectCheck = async () => {
				if (typeof window === undefined) return

				let redirectPath = paths.home.root

				const url = window.location.origin
				const { platform } = navigator
				const { userAgent } = navigator
				const screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`
				let di = ''
				let bi = ''
				let detecasAnalysis = ''
				let sessionKey = ''
				let token = ''

				// * di, bi, detecasAnalysis, sessionKey, token 引用第三方 js: //*/activator.ashx
				di = (document.getElementById('__di') as HTMLInputElement)?.value
				bi = (document.getElementById('__bi') as HTMLInputElement)?.value
				detecasAnalysis = (
					document.getElementById('detecas-analysis') as HTMLInputElement
				)?.value
				sessionKey = (document.getElementById('__fdi') as HTMLInputElement)
					?.value // * fdi = sessionKey
				token = (document.getElementById('__tk') as HTMLInputElement)?.value // * 默認為 empty

				// * di 為基準，等到 di 有值，才撈取 line path
				if (code || state || error) {
					try {
						const { data: lineRegisterData } = await getLineUserId({
							langId,
							lineLoginResponse: {
								code: code as string,
								state: state as string,
								error: error as string,
								description: description as string,
								errormessage: errormessage as string,
							},
							loginData: {
								isPersistent: true,
								url,
								platform,
								userAgent,
								screen,
								FPSRequest: {
									di,
									bi,
									detecasAnalysis,
									sessionKey,
									token,
								},
							},
						}).unwrap()

						const { type, userId } = lineRegisterData
						if (type === LineLoginDirectTypeEnum.Register) {
							redirectPath = paths.join.root
							setCookie(ENV_COOKIE_NAMES.LineUserId, userId)
						} else if (type === LineLoginDirectTypeEnum.Login) {
							redirectPath = paths.deposit.root
						} else if (type === LineLoginDirectTypeEnum.Binding) {
							redirectPath = paths.profile.root
						}
					} catch (error) {
						// eslint-disable-next-line no-console
						// * 不另外做錯誤處裡
						modal.error((error as Error)?.message)
					} finally {
						// * 不管成功與否都需導轉到某個路徑 ( 默認為首頁，或其他 )
						push(redirectPath)
						setIsChecked(true)
					}
				}
			}

			handleLineDirectCheck()
		},
		isChecked ? null : 1000
	)
}
