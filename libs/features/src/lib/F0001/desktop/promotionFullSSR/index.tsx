/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useLocalStorage } from 'usehooks-ts'
import { LocalStorageNames } from '@nx-next-app/constants'

interface IPromotionProps {
	initialPromotionList: unknown[]
	defaultCurrencyId: number
	defaultDeviceType: number
}

const PromotionFullSSR = ({
	initialPromotionList: promotionList = [],
	defaultCurrencyId,
	defaultDeviceType,
}: IPromotionProps) => {
	const router = useRouter()
	const { pathname, asPath, query, locale } = router
	const { t, i18n } = useTranslation()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setLocalLocale] = useLocalStorage<string | undefined>(
		LocalStorageNames.Locale,
		undefined
	)

	return (
		<div>
			<h1>{t('Label_Title')}</h1>
			<div>
				<form>
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
							defaultValue={defaultCurrencyId}
							onChange={e => {
								router.push(
									{
										pathname,
										query: {
											currencyId: e.target.value,
											deviceType: defaultDeviceType,
										},
									},
									// as Path 會隱藏 query 資訊 , 但仍會將 query params 帶給 nodeServer 解析
									// asPath,
									{
										pathname,
										query: {
											currencyId: e.target.value,
											deviceType: defaultDeviceType,
										},
									},
									{
										locale,
									}
								)
							}}
						>
							<option value={2}>MYR</option>
							<option value={4}>THB</option>
							<option value={15}>IDR</option>
							<option value={61}>INR</option>
						</select>
					</label>

					<br />

					<label>
						deviceType:
						<select
							defaultValue={defaultDeviceType}
							onChange={e => {
								router.push(
									{
										pathname,
										query: {
											currencyId: defaultCurrencyId,
											deviceType: e.target.value,
										},
									},
									// as Path 會隱藏 query 資訊 , 但仍會將 query params 帶給 nodeServer 解析
									// asPath,
									{
										pathname,
										query: {
											currencyId: defaultCurrencyId,
											deviceType: e.target.value,
										},
									},
									{
										locale,
									}
								)
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
			<div>
				<h3>promotion content</h3>
				{promotionList.map((item: any) => {
					return <p key={item.bonusCode}>{item?.description}</p>
				})}
			</div>
		</div>
	)
}

export { PromotionFullSSR }
