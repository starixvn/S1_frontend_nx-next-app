import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { isNaN } from 'lodash-es'
import classNames from 'classnames'
import { ANIMATION_LOOP_MILLISECOND, useJackPot } from '@nx-next-app/hooks'
import { takeJackItemList } from '@nx-next-app/utils'
import { useAuth } from '@nx-next-app/data-access'
import { JackpotItem } from '@nx-next-app/components/D0001/jackpot/JackpotItem'
import * as process from 'process'
import { DeviceTypeEnum } from '@nx-next-app/types'

const TEXT_HEIGHT = 22.08
interface IJackPotProps {
	// 判斷是否為首頁路徑
	isRoot?: boolean
	onClick: () => void
	animationLoopMillisecond?: number
}
const JackPot = ({
	isRoot = false,
	onClick,
	animationLoopMillisecond = ANIMATION_LOOP_MILLISECOND,
}: IJackPotProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const ref = useRef<HTMLSpanElement>(null)
	const [list, setList] = useState<string[]>([])
	const [jackpotItemList, setJackpotItemList] = useState<(string | number[])[]>(
		[]
	)
	const { isJackPotLoaded, currentText } = useJackPot(ref)

	const formatTextList = currentText.split('')

	useEffect(() => {
		const startList = [...list].reverse()
		const endList = [...formatTextList].reverse()

		const jackpotList: (string | number[])[] = []

		endList.forEach((endPoint, index) => {
			if (endPoint === ',' || endPoint === '.') {
				jackpotList.push(endPoint)
			}

			// 確認是 number string 才做數字處理
			if (!isNaN(Number(endPoint))) {
				// 沒有起始點的話預設給 0
				const startPoint = startList[index]
				jackpotList.push(
					takeJackItemList({
						startPoint: startPoint ? Number(startPoint) : 0,
						endPoint: Number(endPoint),
					})
				)
			}
		})

		setJackpotItemList(jackpotList.reverse())
		setList(formatTextList)
	}, [currentText])

	useEffect(() => {
		const nodes = document.querySelectorAll<HTMLElement>(
			'.jpot .number .numberRow > div.active'
		)

		// animation
		nodes.forEach(node => {
			const itemNodeCount = node.querySelectorAll('div').length

			const top = TEXT_HEIGHT * Number(itemNodeCount) - TEXT_HEIGHT

			if (node.animate) {
				node.animate(
					{ top: `-${top}px`, easing: 'ease' },
					animationLoopMillisecond
				)
			}

			Promise.all(
				node.getAnimations().map(animation => animation.finished)
			).then(() => {
				node.style.top = `-${top}px`
			})
		})
	}, [animationLoopMillisecond, jackpotItemList])

	return (
		<>
			<span style={{ display: 'none' }} id='jpot-id' ref={ref} />
			<div
				className={classNames('jpot', {
					active: !isJackPotLoaded,
				})}
				onClick={onClick}
			>
				{isRoot && (
					<>
						<div className='jpot-btn'>
							<button>{t('Label_General_PlayNow')}</button>
						</div>
						<div className='jpot-item'>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
									Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) ===
									DeviceTypeEnum.Desktop
										? 'desktop'
										: 'h5'
								}/img/homepage/jpot-item.png`}
								alt=''
							/>
						</div>
					</>
				)}
				<div className='number'>
					<div>{t(`Label_General_Currency_${currencyId}`)}</div>
					{isRoot ? (
						<div className='numberRow-module'>
							<JackpotItem itemList={jackpotItemList} />
						</div>
					) : (
						<JackpotItem itemList={jackpotItemList} />
					)}
				</div>
				{!isJackPotLoaded && (
					<div className='under'>{t('Label_General_UnderMaintenance')}</div>
				)}
			</div>
		</>
	)
}

export default JackPot
