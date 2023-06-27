import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from '@nx-next-app/components/D0001'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import VipInfo from './VipInfo'
import VipPage from './VipPage'

const Vip = () => {
	const { userInfo, auth } = useAuth()
	const { VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY } = useStaticData()

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

			<VipPage />

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
