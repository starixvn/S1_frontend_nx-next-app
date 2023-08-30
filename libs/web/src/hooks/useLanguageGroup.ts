import { isEqual } from 'lodash-es'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useSetLanguageMutation } from '@nx-next-app/service'
import { setCookie } from 'cookies-next'
import { CURRENCY_TO_LANG_KEY, ENV_COOKIE_NAMES } from '@nx-next-app/constants'

/**
 * @description 處理設置語系相關邏輯
 * @example
 * ```
 * const { icon, languageGroup, onSetLanguage } = useLanguageGroup()
 * ```
 */
const useLanguageGroup = () => {
	const { push, pathname, asPath, query } = useRouter()
	const {
		userInfo: { currencyId: currentCurrency, langId: currentLang },
		auth,
	} = useAuth()
	const { LANG_GROUPS } = useStaticData()
	const [icon, setIcon] = useState<string | null>(null)
	const [languageGroup, setLanguageGroup] = useState<{
		[key: string]: Array<{
			displayText: string
			value: string
			currencyId: number
		}>
	}>(LANG_GROUPS)

	const [setLanguage] = useSetLanguageMutation()

	const onSetLanguage = async ({
		langCode,
		currencyId,
	}: {
		langCode: string
		currencyId: number
	}) => {
		// 選擇沒變則 return
		if (currencyId === currentCurrency && langCode === currentLang) return

		if (auth.isLogin) {
			// 有登入狀態，透過 setLang 完成語系切換，不在此處做 router.push
			await setLanguage({ langId: langCode }).unwrap()
		} else {
			setCookie(ENV_COOKIE_NAMES.LangId, langCode)
			setCookie(ENV_COOKIE_NAMES.CurrencyId, currencyId)
			push({ pathname, query }, asPath, {
				locale: langCode,
			})
		}
	}

	useEffect(() => {
		const langKey = CURRENCY_TO_LANG_KEY[currentCurrency]

		if (auth.isLogin) {
			// 登入後針對 langGroup 做篩選
			setLanguageGroup({ [langKey]: LANG_GROUPS[langKey] })
			// 未登入加入比對當前 langGroup 是否與初始 langGroup 相同，減少重複渲染
		} else if (!isEqual(languageGroup, LANG_GROUPS)) {
			// 若不相符才 reset 至 LANG_GROUPS
			setLanguageGroup(LANG_GROUPS)
		}

		if (langKey !== icon) {
			setIcon(langKey)
		}
	}, [auth.isLogin, currentCurrency])

	return { icon, languageGroup, onSetLanguage }
}

export { useLanguageGroup }
