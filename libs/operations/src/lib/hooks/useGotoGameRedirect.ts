import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { PRODUCTS } from '@nx-next-app/constants'
import { IAxiosError, useLazyGotoGameQuery } from '@nx-next-app/service'
import { LoginGameTypeEnum } from '@nx-next-app/types'
import { getDeviceType } from '@nx-next-app/utils'
import { some } from 'lodash-es'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useGotoGameRedirect = () => {
	const router = useRouter()
	const [gotoGame] = useLazyGotoGameQuery()
	const { modal } = useGlobalModal()

	useEffect(() => {
		const launch = async () => {
			try {
				const {
					tpId,
					langId,
					gameId,
					tpGameType,
					loginGameType,
					fun,
					gameType,
				} = router.query

				const isParamsMissing = some(
					[tpId, langId, gameId, tpGameType, loginGameType],
					param => param === undefined
				)
				if (isParamsMissing) throw new Error('Missing parameters')

				const { message } = await gotoGame({
					appType: getDeviceType(),
					tpId: Number(tpId),
					langId: String(langId),
					inputs: {
						fun: Number(fun) ? '1' : '0',
						gameType: String(gameType),
						gameId: String(gameId),
						tpGameType: String(tpGameType),
						loginGameType: String(loginGameType),
					},
				}).unwrap()

				if (message) {
					if (Number(tpId) === PRODUCTS.Nova88Exchange.tpId) {
						const { url, userId, key } = JSON.parse(message) ?? {}
						const form = document.createElement('form')
						form.setAttribute('method', 'post')
						form.setAttribute('action', url)

						const addIptField = ({
							name,
							value,
						}: {
							name: string
							value: string
						}) => {
							const hiddenField = document.createElement('input')
							hiddenField.setAttribute('type', 'hidden')
							hiddenField.setAttribute('name', name)
							hiddenField.setAttribute('value', value)
							form.appendChild(hiddenField)
						}

						addIptField({ name: 'userId', value: userId })
						addIptField({ name: 'key', value: decodeURIComponent(key) })
						document.body.appendChild(form)
						form.submit()
						form.remove()
					} else if (loginGameType !== '') {
						if (Number(loginGameType) === LoginGameTypeEnum.returnHtml) {
							const newDocument = document.open('text/html', 'replace')
							newDocument.write(message)
							newDocument.close()
						} else {
							document.open(message)
						}
					} else {
						window.open(
							message,
							'Under Maintenance',
							'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0'
						)
					}
				} else throw new Error()
			} catch (error) {
				const { message, errorCode } = error as IAxiosError

				if (errorCode === 3000) modal.error('Under Maintenance')
				else if (message) modal.error(message)
				else router.push('/')
			}
		}

		if (router.isReady) launch()
	}, [router])
}
