import Link from 'next/link'
import classNames from 'classnames'
import { useBoolean } from 'usehooks-ts'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'
import MsgPopup from './MsgPopup'

const LayoutFooter = () => {
	const { t } = useTranslation()
	const { value: isWalletActive, toggle: onToggleWalletActive } = useBoolean()
	const {
		auth: { isLogin },
		userInfo: { langId },
	} = useAuth()
	const router = useRouter()
	const { pathname } = router
	const { LIVE_CHAT_ID_BY_LANG_ID } = useStaticData()

	// * 根據語系有不同的 LIVE CHAT ID, 默認為 en
	const liveChatUrl = `https://direct.lc.chat/${
		process.env['NEXT_PUBLIC_LIVECHAT_LICENSE']
	}/${LIVE_CHAT_ID_BY_LANG_ID[langId] || 'en'}`

	return (
		<>
			<footer id='footer'>
				<Link href={paths.home.root} passHref>
					<a
						className={classNames('icon icon-home', {
							active: pathname === paths.home.root && !isWalletActive,
						})}
					>
						<div className='circleAnimation' />
						<span>{t('Label_General_Home')}</span>
					</a>
				</Link>

				<Link href={paths.promotion.root} passHref>
					<a
						className={classNames('icon icon-gift', {
							active:
								pathname.startsWith(`/${paths.promotion.root}`) &&
								!isWalletActive,
						})}
					>
						<div className='circleAnimation' />
						<span>{t('Label_General_Promotion')}</span>
						<div className='icon icon-mediafire'>HOT</div>
					</a>
				</Link>

				{isLogin && (
					<a
						role='link'
						aria-hidden
						onClick={onToggleWalletActive}
						className={classNames('icon icon-icon32px_wallet', {
							'icon-close active': isWalletActive,
						})}
					>
						<div className='circleAnimation' />
						<span>{t('Label_General_Wallet')}</span>
					</a>
				)}

				<a
					rel='noreferrer'
					target='_blank'
					href={liveChatUrl}
					className='icon icon-contact'
				>
					<div className='circleAnimation' />
					<span>{t('Label_General_LiveChat')}</span>
				</a>

				<MsgPopup isWalletActive={isWalletActive} />
			</footer>

			<div
				className={classNames('walletMenu five-style', {
					active: isWalletActive,
				})}
			>
				<div className='walletModule'>
					<Link href={paths.wallet.root}>
						<a className='icon icon-icon32px_wallet'>
							<div className='circleAnimation' />
							<span>{t('Label_General_MyWallet')}</span>
						</a>
					</Link>
					<Link href={paths.withdrawal.root}>
						<a className='icon icon-icon32px_Withdraw'>
							<div className='circleAnimation' />
							<span>{t('Label_General_Withdrawal')}</span>
						</a>
					</Link>
					<Link href={paths.deposit.root}>
						<a className='icon icon-icon32px_deposit'>
							<div className='circleAnimation' />
							<span>{t('Label_General_Deposit')}</span>
						</a>
					</Link>
					<Link href={paths.transferFunds.root}>
						<a className='icon icon-icon32px_Funds-transfer'>
							<div className='circleAnimation' />
							<span>{t('Label_General_Transfer')}</span>
						</a>
					</Link>
					<Link href={paths.statement.root}>
						<a className='icon icon-icon32px_History'>
							<div className='circleAnimation' />
							<span>{t('Label_General_Statement')}</span>
						</a>
					</Link>
				</div>
			</div>
		</>
	)
}

export default LayoutFooter
