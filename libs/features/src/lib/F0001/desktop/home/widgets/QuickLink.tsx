import { useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useHover } from 'usehooks-ts'
import classNames from 'classnames'
import QRCode from 'qrcode.react'
import { ISocialChannelData } from '@nx-next-app/service'
import { LinkTypeEnum } from '@nx-next-app/types'
import { channelIconClass } from '@nx-next-app/features/F0001/types'

interface IQuickLinkProps {
	socialChannelList: ISocialChannelData[]
}

const QuickLink = ({ socialChannelList }: IQuickLinkProps) => {
	const { t } = useTranslation()
	const hoverRef = useRef(null)
	const isHover = useHover(hoverRef)

	// 這裡不能用 useHover 搭配 useRef , 因為 Icon 數量非固定的，透過 map 生成 hooks 可能會導致 hook 生成數量每次不固定進而報錯
	// Error: Rendered more hooks than during the previous render.

	const [activeIcon, setActiveIcon] = useState<string | null>(null)

	const iconList = socialChannelList.map(channel => {
		const { linkType, title, channelName, link, id } = channel
		const qrCode =
			linkType === LinkTypeEnum.QRCode ? (
				<div key={channelName}>
					{title}
					<QRCode value={link} renderAs='svg' size={120} includeMargin />
				</div>
			) : null

		return (
			<a
				key={id}
				href={link}
				target='_blank'
				rel='noreferrer'
				onMouseOver={() => setActiveIcon(channelName)}
				onMouseLeave={() => setActiveIcon(null)}
				onFocus={() => 0}
				className={classNames(channelIconClass[channelName], {
					active: activeIcon === channelName,
				})}
			>
				{qrCode}
			</a>
		)
	})
	return (
		<div ref={hoverRef}>
			<div className={classNames('quickLinkNew1', { active: isHover })}>
				<i className='icon icon-arrow-left2' />
				<div>{t('Label_ContactUs')}</div>
			</div>
			<div className={classNames('quickLinkNew2', { active: !isHover })}>
				<i className='icon icon-arrow-right2' />
				{iconList}
			</div>
		</div>
	)
}

export default QuickLink
