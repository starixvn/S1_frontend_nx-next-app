import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { paths } from '@nx-next-app/constants'
import { useBoolean } from 'usehooks-ts'
import MsgPopup from './MsgPopup'

const LayoutFooter = () => {
	const { t } = useTranslation()
	const { value: isWalletActive, toggle: onToggleWalletActive } = useBoolean()
	const router = useRouter()
	const { pathname } = router

	return (
		<>
			<footer id='footer'>
				<Link href={paths.home.root}>
					<a
						className={classNames('icon icon-home', {
							active: pathname === paths.home.root && !isWalletActive,
						})}
					>
						<div className='circleAnimation' />
						<span>{t('Label_General_Home')}</span>
					</a>
				</Link>

				<Link href={paths.promotion.root}>
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

				<a
					onClick={onToggleWalletActive}
					className={classNames('icon icon-icon32px_wallet', {
						'icon-close active': isWalletActive,
					})}
				>
					<div className='circleAnimation' />
					<span>{t('Label_General_Wallet')}</span>
				</a>

				<a
					rel='noreferrer'
					target='_blank'
					href='https://direct.lc.chat/11638088/'
					className='icon icon-contact'
				>
					<div className='circleAnimation' />
					<span>{t('Label_General_LiveChat')}</span>
				</a>

				<MsgPopup isWalletActive={isWalletActive} />
			</footer>

			<div
				className={classNames('walletMenu', {
					active: isWalletActive,
				})}
			>
				<div className='walletModule'>
					<Link href={paths.wallet.root}>
						<a className='icon icon-icon32px_wallet'>
							<div className='circleAnimation' />
							<span>My Wallet</span>
						</a>
					</Link>
					<Link href={paths.withdrawal.root}>
						<a className='icon icon-icon32px_Withdraw'>
							<div className='circleAnimation' />
							<span>Withdrawal</span>
						</a>
					</Link>
					<Link href={paths.deposit.root}>
						<a className='icon icon-icon32px_deposit'>
							<div className='circleAnimation' />
							<span>Deposit</span>
						</a>
					</Link>
					<Link href={paths.transferFunds.root}>
						<a className='icon icon-icon32px_Funds-transfer'>
							<div className='circleAnimation' />
							<span>Transfer</span>
						</a>
					</Link>
					<Link href={paths.statement.root}>
						<a className='icon icon-icon32px_History'>
							<div className='circleAnimation' />
							<span>Statement</span>
						</a>
					</Link>
				</div>
			</div>
		</>
	)
}

export default LayoutFooter
