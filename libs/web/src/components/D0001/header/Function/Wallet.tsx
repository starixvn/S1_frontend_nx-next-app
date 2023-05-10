import Link from 'next/link'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'
import { useRef } from 'react'
import { ITpWalletData, IWalletBalanceData } from '@nx-next-app/service'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { SpinButton } from '../../button'

interface IWalletProps {
	onRefetchAllWallet: () => void
	walletBalance: IWalletBalanceData | undefined
	custBonusWallet: unknown
	tpWalletList: ITpWalletData[] | undefined
}

const Wallet = ({
	onRefetchAllWallet,
	walletBalance,
	custBonusWallet,
	tpWalletList,
}: IWalletProps) => {
	const ref = useRef(null)
	const { value: isActive, setFalse, toggle } = useBoolean(false)
	const {
		userInfo: { lastLogin },
	} = useAuth()

	useOnClickOutside(ref, setFalse)

	return (
		<div
			ref={ref}
			className={classNames('wallet icon icon-balance', {
				active: isActive,
			})}
			onClick={toggle}
		>
			<span>VNĐ 28,848.50 ('000)</span>

			<button type='button' className='icon icon-minus'>
				{' '}
			</button>

			<SpinButton onClick={onRefetchAllWallet} />

			<div className='submenu'>
				<div className='balance'>
					<span>VND</span>
					<span>
						28,848.50 ('000)
						<SpinButton onClick={onRefetchAllWallet} />
					</span>
				</div>
				<div className='walletBalance'>
					<div className='walletName'>
						<span>Main Wallet</span>
						<span>83.00 ('000)</span>
					</div>
				</div>
				<div className='walletBalance'>
					<div className='walletName'>
						<span>V8 Wallet</span>
						<span>28,765.50 ('000)</span>
					</div>
				</div>
				<div className='walletBalance'>
					<div className='walletName'>
						<span>PT Wallet</span>
						<span>0.00 ('000)</span>
					</div>
				</div>
				<div className='btnGroup'>
					<Link href={paths.deposit.root}>
						<a className='orange'>Deposit</a>
					</Link>
					<Link href={paths.transferFunds.root}>
						<a className='orange'>Transfer Funds</a>
					</Link>
				</div>
				<div className='loginLog'>
					<span>Last Login</span>
					<span>{dayjs(lastLogin).format('L LT')}</span>
				</div>
				<div className='transactionLog'>
					<span>Last Transaction</span>
					<span>2/12/2023 12:22:08 AM</span>
				</div>
			</div>
		</div>
	)
}

export default Wallet
