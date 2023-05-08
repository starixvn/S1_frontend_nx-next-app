import {
	Header,
	useConfig,
	useGlobalModal,
} from '@nx-next-app/components/D0001'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '@nx-next-app/data-access'
import { useSetLanguageMutation } from '@nx-next-app/service'
import { setCookies } from 'cookies-next'
import { isEqual } from 'lodash'

export const Country = () => {
	const router = useRouter()
	const { modal } = useGlobalModal()
	const { pathname, asPath, query } = router
	const {
		langData: { langGroups: rawLangGroup, currencyToLangKey, langGroupCountry },
	} = useConfig()
	const {
		userInfo: { currencyId: currentCurrency, langId: currentLang },
		auth,
	} = useAuth()
	const langKey = currencyToLangKey[currentCurrency] ?? null

	const [langGroup, setLangGroup] = useState<{
		[key: string]: Array<{
			displayText: string
			value: string
			currencyId: number
		}>
	}>(rawLangGroup)

	const [setLanguage] = useSetLanguageMutation()

	const handleSetLanguage = async ({
		langCode,
		currencyId,
	}: {
		langCode: string
		currencyId: number
	}) => {
		// 選擇沒變則 return
		if (currencyId === currentCurrency && langCode === currentLang) return

		if (auth.isLogin) {
			// 有登入
			try {
				await setLanguage({ langId: langCode }).unwrap()
			} catch (error) {
				modal.error((error as Error).message)
			}
		} else {
			setCookies(`${process.env['NEXT_PUBLIC_SITE_NAME']}_langId`, langCode)
			setCookies(
				`${process.env['NEXT_PUBLIC_SITE_NAME']}_currencyId`,
				currencyId
			)
		}

		router.push({ pathname, query }, asPath, {
			locale: langCode,
		})
	}

	useEffect(() => {
		if (auth.isLogin) {
			// 登入後針對 langGroup 做篩選
			setLangGroup({ [langKey]: rawLangGroup[langKey] })
			// 未登入加入比對當前 langGroup 是否與初始 langGroup 相同，減少重複渲染
		} else if (!isEqual(langGroup, rawLangGroup)) {
			// 若不相符才 reset 至 rawLangGroup
			setLangGroup(rawLangGroup)
		}
	}, [auth.isLogin, currentCurrency])

	return (
		<Header.Function.Country
			icon={langKey}
			langGroup={langGroup}
			onSetLanguage={handleSetLanguage}
			langGroupCountry={langGroupCountry}
		/>
	)
}
