import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { IFooterData } from '@nx-next-app/types'

interface IPromotionTextProps {
	promotionTextList: IFooterData['promotionTextList']
}

const PromotionText = ({ promotionTextList }: IPromotionTextProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()
	const [isShow, setIsShow] = useState(false)

	return (
		<div className='footer-bottom'>
			{isShow ? (
				<div className='footer-hideinfo'>
					<button className='footer-btn' onClick={() => setIsShow(false)}>
						{t('Label_HideInfo')}
					</button>
					{promotionTextList?.map(({ title, content }) => (
						<React.Fragment key={title}>
							<h1>{t(title)}</h1>
							<p>{t(content)}</p>
							<br />
						</React.Fragment>
					))}
				</div>
			) : (
				<div className='footer-readmore'>
					<h1>{t(`Label_Sports_Betting_Online_${currencyId}`)}</h1>
					<p>
						{t(`Label_Sports_Betting_Online_Desc`)}
						<button className='footer-btn' onClick={() => setIsShow(true)}>
							{isShow ? null : `${t('Label_General_ReadMore')} >`}
						</button>
					</p>
				</div>
			)}
		</div>
	)
}

export default PromotionText
