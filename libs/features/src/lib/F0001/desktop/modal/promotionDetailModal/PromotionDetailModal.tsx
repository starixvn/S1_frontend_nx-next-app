/* eslint-disable react/no-danger */
import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { IPromotionData } from '@nx-next-app/service'
import { isUrl } from '@nx-next-app/utils'
import { ButtonGroup } from '@nx-next-app/features/F0001/desktop/modal/promotionDetailModal/ButtonGroup'
import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import { CashbackInfo } from '@nx-next-app/features/F0001/desktop/modal/promotionDetailModal/CashbankInfo'

interface IPromotionDetailModalProps {
	promotionDetail: IPromotionData
	// 是否隱藏全部優惠的 button , 預設為 false
	hideAllPromoButton?: boolean
}

// TODO
const PromotionDetailModal = ({
	promotionDetail,
	hideAllPromoButton = false,
}: IPromotionDetailModalProps) => {
	const { closeModal } = useGlobalModal()
	const { t } = useTranslation()
	const { banner, title, description, cashBackDetails, bonusCode, details } =
		promotionDetail

	const handleJoinPromotion = () => {
		//
	}

	return (
		<div className='promoInfoPop active'>
			<div className='promoInfoPopMask active' onClick={closeModal} />
			<div className='promotionsInfo'>
				<div className='icon icon-close' onClick={closeModal} />
				{isUrl(banner) ? (
					<Image src={banner} alt={title} width={1920} height={500} />
				) : null}
				<div className='proData'>
					<div className='proDataTitle'>
						<div className='txt-darkBlue'>
							{title}
							<div className='txt-gray'>{description}</div>
						</div>
						<div className='btnGroup'>
							<ButtonGroup
								promotionDetail={promotionDetail}
								onJoinPromotion={handleJoinPromotion}
							/>
							{!hideAllPromoButton && (
								<Link href={paths.promotion.root}>
									<button className='btn-check'>
										{t('Label_Promotion_AllPromos')}
									</button>
								</Link>
							)}
						</div>
						{cashBackDetails && (
							<CashbackInfo
								bonusCode={bonusCode}
								cashBackDetails={cashBackDetails}
							/>
						)}
						{details && (
							<div
								className='proDataBody'
								dangerouslySetInnerHTML={{
									__html: details,
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PromotionDetailModal
