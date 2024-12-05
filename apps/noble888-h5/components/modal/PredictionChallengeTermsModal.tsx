import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useGetPromotionDetailQuery } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'

/**
 *
 * @param bonusCode
 * @returns
 */
const PredictionChallengeTermsModal = ({
	bonusCode,
}: {
	bonusCode: string
}) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const { data: { data: promotionDetail } = {} } = useGetPromotionDetailQuery({
		currencyId,
		langId,
		bonusCode,
	})

	const { details } = promotionDetail ?? {}

	return (
		<div className='pop'>
			<div className='result-pop active'>
				<div className='caption'>{t('Label_TermsConditions')}</div>
				<div className='content'>
					{details && (
						<div className='promotions' style={{ paddingTop: '4vw' }}>
							<div
								className='text'
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={{
									__html: `<pre>${details}</pre>`,
								}}
							/>
						</div>
					)}
				</div>
				<div className='btn-block'>
					<button className='btn-check' onClick={closeModal}>
						{t('Label_General_OK')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default PredictionChallengeTermsModal
