import Image from 'next/future/image'
import Link from 'next/link'
import { Carousel, IVipClubImage } from '@nx-next-app/components/D0001'
import { IImageData } from '@nx-next-app/components/D0001/config-context/type'
import { paths } from '@nx-next-app/constants'

import { useAuth } from '@nx-next-app/data-access'
import { IVipEventCurrenciesLimitationInfo } from './type'
import VipInfo from './VipInfo'
import VipPage from './VipPage'

const Vip = ({
	VIP_CLUB_IMAGES,
	VIP_EVENT_CURRENCIES_LIMITATION_INFO,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
}: {
	VIP_CLUB_IMAGES: IVipClubImage[]
	VIP_EVENT_CURRENCIES_LIMITATION_INFO: IVipEventCurrenciesLimitationInfo
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY: (
		langId: string | number
	) => IImageData[]
}) => {
	const { userInfo, auth } = useAuth()

	return (
		<main className='vip'>
			<Carousel pagination={false}>
				{VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY(userInfo.langId).map(item => (
					<div key={item.alt}>
						<Image src={item.url} alt={item.alt} height={365} width={1400} />
					</div>
				))}
			</Carousel>

			<VipInfo />

			<VipPage
				VIP_CLUB_IMAGES={VIP_CLUB_IMAGES}
				VIP_EVENT_CURRENCIES_LIMITATION_INFO={
					VIP_EVENT_CURRENCIES_LIMITATION_INFO
				}
			/>

			{auth.isLogin ? (
				<Image
					style={{ cursor: 'auto' }}
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/${userInfo.langId}/vip_program_${userInfo.langId}.jpg`}
					alt='vip-program-img'
					width={1400}
					height={365}
				/>
			) : (
				<Link href={paths.join.root}>
					<Image
						style={{ cursor: 'pointer' }}
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/vip/${userInfo.langId}/vip_program_${userInfo.langId}.jpg`}
						alt='vip-program-img'
						width={1400}
						height={365}
					/>
				</Link>
			)}
		</main>
	)
}

export default Vip
