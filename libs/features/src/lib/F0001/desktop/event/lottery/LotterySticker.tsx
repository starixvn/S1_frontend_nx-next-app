import { STICKER_IDS_TO_ZODIAC_SIGNS } from '@nx-next-app/constants'
import { ChineseZodiacStickerId } from '@nx-next-app/service'
import classNames from 'classnames'

const LotterySticker = (props: {
	stickerId: ChineseZodiacStickerId
	active?: boolean
}) => (
	<div
		className={classNames(
			'icon',
			STICKER_IDS_TO_ZODIAC_SIGNS[props.stickerId],
			{ active: props.active }
		)}
	/>
)

export default LotterySticker
