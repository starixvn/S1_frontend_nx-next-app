import { useState, useEffect } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { paths } from '@nx-next-app/constants'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useAuth } from '@nx-next-app/data-access'

interface ILogoProps {
	logoUrl: string
	rewardsUrl: string
}

const Logo = ({ logoUrl, rewardsUrl }: ILogoProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()

	// 判斷是否為奧運期間，若是，則使用沒有右邊分隔線的圖
	const [showSpLogo, setShowSpLogo] = useState(true)

	// TODO: 因為奧運結束後可能會有暫時沒有spLogo的情況，這時主Logo要改用沒有右邊分隔線的圖
	const noSpLogoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/logo_w_noline.png`

	/** 當前是否為巴西 */
	const isBRL = currencyId === CurrenciesEnum.BRL

	// 僅有巴西沒有贊助球隊，所以秀 nova 原始 Logo
	useEffect(() => {
		if (isBRL) setShowSpLogo(false)
	}, [currencyId])

	return (
		<div className={classNames('logo')}>
			<Link href={paths.home.root} style={{ cursor: 'pointer' }}>
				<a>
					<img src={showSpLogo ? logoUrl : noSpLogoUrl} alt='logo' />
				</a>
			</Link>

			{/* 僅有巴西沒有 Aston Villa 贊助球隊 */}
			{showSpLogo && <a className='splogo' />}

			{process.env['NEXT_PUBLIC_SHOW_REWARD'] === 'true' && (
				<Link href='/rewards' className='logo' passHref>
					<a target='_blank' rel='noopener noreferrer' className='rewardsLogo'>
						<img src={rewardsUrl} alt='88reward' />
					</a>
				</Link>
			)}
		</div>
	)
}

export default Logo
