import {
	ICountryListData,
	useGetCountryListQuery,
	useGetIpCountryQuery,
} from '@nx-next-app/service'
import { useEffect, useState } from 'react'

const useJoin = () => {
	const [initNationality, setInitNationality] = useState<string | undefined>('')
	const { data: { data: countryList = [] } = {} } = useGetCountryListQuery(null)

	const { data: { data: { code = '' } = {} } = {} } = useGetIpCountryQuery(null)

	// 緊急移除中國市場，不給中國人註冊
	const countrySelectOptions = countryList
		.filter(item => item.code !== 'CN')
		.map((item: ICountryListData) => {
			return {
				value: item.country,
				label: `Label_CountryName_${item.code}`,
			}
		})

	// 根據使用者所在IP，一進畫面先預設該國籍，他要改再改
	useEffect(() => {
		const initCountry = countryList.find(
			(item: ICountryListData) => item.code === code
		)
		setInitNationality(initCountry?.country)
	}, [code])

	return { initNationality, countrySelectOptions }
}

export { useJoin }
