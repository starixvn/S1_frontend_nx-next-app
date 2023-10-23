import { useTranslation } from 'next-i18next'
import { IFooterData } from '@nx-next-app/types'

const ProgramDescriptionList = ({
	promotionTextList = [],
}: {
	promotionTextList: IFooterData['programDescriptionList']
}) => {
	const { t } = useTranslation()

	if (promotionTextList.length === 0) return null

	return (
		<div className='item-wrapper'>
			{promotionTextList.map(({ contents }, index) => {
				const key = `key-${index}`
				return (
					<div key={key}>
						{contents.map(({ displayKey, description }) => {
							return (
								<div key={displayKey}>
									<div className='title'>{t(displayKey)}</div>
									<div>{t(description)}</div>
								</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}

export default ProgramDescriptionList
