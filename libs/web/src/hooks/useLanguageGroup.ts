import { CURRENCY_TO_LANG_KEY, ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { useSetLanguageMutation } from '@nx-next-app/service'
import { IStaticLangGroups } from '@nx-next-app/types'
import { setCookie } from 'cookies-next'
import { isEqual, omit } from 'lodash-es'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { setAppCurrency, setAppLanguage } from '../utils'

/**
 * @description 處理設置語系相關邏輯
 * @example
 * ```
 * const { icon, languageGroup, onSetLanguage } = useLanguageGroup()
 * ```
 */
const useLanguageGroup = (filterLangs?: string[]) => {
	const { push, pathname, asPath, query } = useRouter()
	const {
		userInfo: { currencyId: currentCurrency, langId: currentLang },
		auth,
	} = useAuth()
	const { LANG_GROUPS } = useStaticData()

	const filteredLangGroups: IStaticLangGroups =
		filterLangs && filterLangs.length > 0 && !auth.isLogin
			? omit(LANG_GROUPS, filterLangs)
			: LANG_GROUPS

	const [icon, setIcon] = useState<string | null>(null)
	const [languageGroup, setLanguageGroup] = useState<{
		[key: string]: Array<{
			displayText: string
			value: string
			currencyId: number
			mainLanguage?: boolean
		}>
	}>(filteredLangGroups)

	const [setLanguage] = useSetLanguageMutation()
	const { isInApp } = useGlobalData()

	const onSetLanguage = async ({
		langCode,
		currencyId,
	}: {
		langCode: string
		currencyId: number
	}) => {
		// 選擇沒變則 return
		if (currencyId === currentCurrency && langCode === currentLang) return

		if (isInApp) {
			if (currencyId !== currentCurrency) {
				setAppCurrency(currencyId)
			}

			if (langCode !== currentLang) {
				setAppLanguage(langCode)
			}
		}

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
			setLanguageGroup({ [langKey]: filteredLangGroups[langKey] })
			// 未登入加入比對當前 langGroup 是否與初始 langGroup 相同，減少重複渲染
		} else if (!isEqual(languageGroup, filteredLangGroups)) {
			// 若不相符才 reset 至 filteredLangGroups
			setLanguageGroup(filteredLangGroups)
		}

		if (langKey !== icon) {
			setIcon(langKey)
		}
	}, [auth.isLogin, currentCurrency])

	return { icon, languageGroup, onSetLanguage }
}

export { useLanguageGroup }
