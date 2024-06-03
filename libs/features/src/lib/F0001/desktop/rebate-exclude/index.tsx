import { isArray } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { Loading } from '@nx-next-app/components/D0001'
import { useRebateExclude } from '@nx-next-app/features/F0001/hooks'

const RebateExclude = () => {
	const { t } = useTranslation()
	const { loading, rebateExcludeGameList } = useRebateExclude()

	if (loading) return <Loading />

	return (
		<div>
			<div className='subheader'>
				<div className='subheader__container'>
					<a href='https://www.nova88.net/' />
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
				<span className='text'>{`© Copyright ${new Date().getFullYear()}. Nova88. All Rights Reserved.`}</span>
			</div>
		</div>
	)
}

export default RebateExclude
