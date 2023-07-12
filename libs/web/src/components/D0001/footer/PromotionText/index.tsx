import React from 'react'
import { useTranslation } from 'next-i18next'
import { IPromotionTextListData } from 'libs/web/src/app/types/footer'

const PromotionText = ({
	promotionTextList,
}: {
	promotionTextList: IPromotionTextListData[]
}) => {
	const { t } = useTranslation()
	return (
		<div className='item-wrapper'>
			{promotionTextList.map(({ key, content }) => (
				<div key={key}>
					{content.map(({ title, description }) => {
						return (
							<div key={title}>
								<div className='title'>{t(title)}</div>
								<div>{t(description)}</div>
							</div>
						)
					})}
				</div>
			))}
		</div>
	)
}

export default PromotionText
