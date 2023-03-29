/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useLocalStorage } from 'usehooks-ts'
import { LocalStorageNames } from '@nx-next-app/constants'
import { useLazyGetPromotionListV3Query } from '@nx-next-app/service'

interface IPromotionProps {
	initialPromotionList: unknown[]
}

const PromotionSSR = ({ initialPromotionList = [] }: IPromotionProps) => {
	const router = useRouter()
	const { pathname, asPath, query } = router
	const { t, i18n } = useTranslation()
	const [payload, setPayload] = useState({
		currencyId: 2,
		deviceType: 1,
	})
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setLocalLocale] = useLocalStorage<string | undefined>(
		LocalStorageNames.Locale,
		undefined
	)

	// * query example
	// const {
	// 	data: { data: promotionList = initialPromotionList } = {},
	// 	isLoading = false,
	// } = useGetPromotionListV3Query({
	// 	langId: 'en',
	// 	currencyId: 2,
	// 	deviceType: 1,
	// })

	// * lazy query example
	const [
		getPromotionListV3,
		{ data: { data: promotionList = initialPromotionList } = {}, isLoading },
	] = useLazyGetPromotionListV3Query()

	const handleGetPromotionListV3 = async (
		event: FormEvent<HTMLFormElement>
	) => {
		event.preventDefault()

		try {
			await getPromotionListV3({
				...payload,
				langId: i18n.language,
			}).unwrap()
		} catch (error) {
			// console.log(error)
		}
	}

	return (
		<div>
			<h1>{t('Label_Title')}</h1>

			<div>
				<form onSubmit={handleGetPromotionListV3}>
					<label>
						langId:
						<select
							// defaultValue={i18n.language}
							value={i18n.language}
							onChange={e => {
								// 僅替換 locale
								router.push({ pathname, query }, asPath, {
									locale: e.target.value,
								})
								setLocalLocale(e.target.value)
							}}
						>
							<option value='en'>en</option>
							<option value='cs'>cs</option>
							<option value='th'>th</option>
							<option value='en-th'>en-th</option>
						</select>
					</label>

					<br />

					<label>
						currencyId:
						<select
							value={payload.currencyId}
							onChange={e => {
								setPayload(prev => ({
									...prev,
									currencyId: Number(e.target.value),
								}))
							}}
						>
							<option value={4}>THB</option>
							<option value={15}>IDR</option>
							<option value={61}>INR</option>
						</select>
					</label>

					<br />

					<label>
						deviceType:
						<select
							value={payload.deviceType}
							onChange={e => {
								setPayload(prev => ({
									...prev,
									deviceType: Number(e.target.value),
								}))
							}}
						>
							<option value={1}>1</option>
							<option value={2}>2</option>
						</select>
					</label>

					<br />
					<input type='submit' value='Submit' />
				</form>
			</div>
			{isLoading && 'loading...'}
			<div>
				<h3>promotion content</h3>
				{promotionList.map((item: any) => {
					return <p key={item.bonusCode}>{item?.description}</p>
				})}
			</div>
		</div>
	)
}

export { PromotionSSR }
