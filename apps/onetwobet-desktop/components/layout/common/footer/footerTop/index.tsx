import { useGlobalData } from '@nx-next-app/data-access'
import { useLanguageGroup } from '@nx-next-app/hooks'
import { ISponsorsListdata } from '@nx-next-app/types'
import Link from 'next/link'

interface IFooterTopProps {
	sponsorsList: ISponsorsListdata[]
}

const FooterTop = ({ sponsorsList }: IFooterTopProps) => {
	const { getBannerUrl, getSportImageUrl } = useGlobalData()
	const { icon } = useLanguageGroup()
	return (
		<div className='footer-top'>
			<Link
				href={`https://tsprom.qqs77.com/sponsorship/index.php?act=gallery-photo&lang=${icon}`}
			>
				<a target='_blank'>
					<img
						src={getBannerUrl('/desktop/img/vip-icon.png')}
						alt='Sponsorship img'
					/>
					Sponsorship Events
				</a>
			</Link>

			{/* TODO: 對外連結ＰＭ後續提供 */}
			<a href=''>
				<img src={getBannerUrl('/desktop/img/affiliate-icon.png')} alt='' />
				Affiliate Program
			</a>
			<Link
				href={`https://tsprom.qqs77.com/sponsorship/index.php?act=home&lang=${icon}`}
			>
				<a target='_blank'>
					<img src={getBannerUrl('/desktop/img/lc-logo.png')} alt='' />
					OFFICIAL BETTING PARTNER
					<br />
					2024 - 2025
				</a>
			</Link>

			{/* <!-- fc-club--> */}
			<div className='fc-club-group'>
				<ul>
					{sponsorsList?.map(item => (
						<li key={item.imgUrl}>
							<img src={getSportImageUrl(item.imgUrl)} alt='' />
							<span>{item.year}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default FooterTop
