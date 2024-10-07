import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { openLiveChat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const UserFunction = () => {
	const { t } = useTranslation()
	const { auth } = useAuth()
	const { getBannerUrl } = useGlobalData()

	// 廣告商用的事件記錄器，綁在 DepositButton 底下
	const handleYuriAddToCartClick = () => {
		/* eslint no-underscore-dangle: 0 */
		if ((window as any)._yuri_track) {
			;(window as any)._yuri_track('AddToCart')
		}
	}

	return (
		<div className='user-function'>
			{/* 💡登入後才有： */}
			{auth.isLogin && (
				<div className='function-container'>
					<Link href={paths.deposit.root}>
						<button onClick={handleYuriAddToCartClick}>
							<img
								src={getBannerUrl('/desktop/img/deposit.png')}
								alt='deposit icon'
							/>
							{t('Label_General_Deposit')}
						</button>
					</Link>

					<hr />
					<Link href={paths.withdrawal.root}>
						<button>
							<img
								src={getBannerUrl('/desktop/img/withdrawal.png')}
								alt='withdrawal icon'
							/>
							{t('Label_General_Withdrawal')}
						</button>
					</Link>
					<hr />
					<Link href={paths.transferFunds.root}>
						<button>
							<img
								src={getBannerUrl('/desktop/img/transfer.png')}
								alt='transfer icon'
							/>
							{t('Label_General_TransferFunds')}
						</button>
					</Link>
				</div>
			)}

			{/* 💡登入前後都有 */}
			<div className='function-container'>
				{/* TODO: 還不確定download頁面 */}
				<button className='primary '>
					<img
						src={getBannerUrl('/desktop/img/download-icon.png')}
						alt='download icon'
					/>
					{t('Label_General_Download')}
				</button>
				<Link href={paths.promotion.root}>
					<button className='primary '>
						<img
							src={getBannerUrl('/desktop/img/promotion-icon.png')}
							alt='promotion icon'
						/>
						{t('Label_General_Promotion')}
					</button>
				</Link>
				<button className='primary' onClick={openLiveChat}>
					<img
						src={getBannerUrl('/desktop/img/livechat-icon.png')}
						alt='livechat icon'
					/>
					24/7 {t('Label_General_LiveChat')}
				</button>
			</div>
		</div>
	)
}

export default UserFunction
