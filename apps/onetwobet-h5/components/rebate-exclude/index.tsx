import { Loading } from '@12b-h5/components/common'
import { useRebateExclude } from '@nx-next-app/operations'
import { isArray, upperFirst } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const RebateExclude = () => {
	const { t } = useTranslation()
	const { loading, rebateExcludeGameList } = useRebateExclude()
	const year = new Date().getFullYear()
	const site = upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'])

	if (loading) return <Loading />

	return (
		<div>
			<div className='subheader'>
				<div className='subheader__container'>
					<Link href='/'>
						<a />
					</Link>
				</div>
			</div>

			<main className='exclude'>
				<div className='exclude__container'>
					<div className='exclude__title'>{t('Label_RebateExclude_Title')}</div>
					<div className='exclude__table'>
						<div className='exclude__table__item'>
							<div>{t('Label_General_Product')}</div>
							<div>
								<span>{t('Label_RebateExclude_GameName')}</span>
							</div>
						</div>

						{Object.values(rebateExcludeGameList || {}).map(
							({ tpGameTypeName, gameName }) => (
								<div key={tpGameTypeName} className='exclude__table__item'>
									<div>{tpGameTypeName}</div>
									<div>
										{isArray(gameName) &&
											gameName.map(value => <span key={value}>{value}</span>)}
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</main>

			<div className='subcopyright'>
				<span className='text'>
					<span className='text'>
						{t('Label_Footer_Copyright', { year, site })}
					</span>
				</span>
			</div>
		</div>
	)
}

export default RebateExclude
