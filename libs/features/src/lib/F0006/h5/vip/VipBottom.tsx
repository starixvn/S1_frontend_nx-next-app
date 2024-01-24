import React from 'react'
import Link from 'next/link'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'

const VipBottom = () => {
	const { t } = useTranslation()
	const {
		auth: { isLogin },
	} = useAuth()
	return (
		<div className='vip-bottom'>
			<div className='vip-bottom-item' style={{ cursor: 'pointer' }}>
				{/* Link 包在最外層會覆蓋到 css 故分別包在裡面 */}
				<Link
					href={paths.join.root}
					style={isLogin ? { pointerEvents: 'none' } : {}}
				>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/benefit-1.png`}
						width={300}
						height={282}
						alt=''
					/>
				</Link>
				<span>{t('Label_Vip_TopPriorityServices')}</span>
			</div>
			<div className='vip-bottom-item' style={{ cursor: 'pointer' }}>
				<Link
					href={paths.join.root}
					style={isLogin ? { pointerEvents: 'none' } : {}}
				>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/benefit-2.png`}
						width={300}
						height={282}
						alt=''
					/>
				</Link>
				<span>{t('Label_Vip_ExclusivePromo')}</span>
			</div>
			<div className='vip-bottom-item' style={{ cursor: 'pointer' }}>
				<Link
					href={paths.join.root}
					style={isLogin ? { pointerEvents: 'none' } : {}}
				>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/benefit-3.png`}
						width={300}
						height={282}
						alt=''
					/>
				</Link>
				<span>{t('Label_Vip_BirthdaySpecialGifts')}</span>
			</div>
			<div className='vip-bottom-item' style={{ cursor: 'pointer' }}>
				<Link
					href={paths.join.root}
					style={isLogin ? { pointerEvents: 'none' } : {}}
				>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/benefit-4.png`}
						width={300}
						height={282}
						alt=''
					/>
				</Link>
				<span>{t('Label_Vip_LifetimeMembership')}</span>
			</div>
		</div>
	)
}

export default VipBottom
