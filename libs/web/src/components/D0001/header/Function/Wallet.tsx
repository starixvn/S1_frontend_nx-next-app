import React from 'react'

const Wallet = () => {
	return (
		<div className='wallet icon icon-balance'>
			<span>VNĐ 28,848.50 ('000)</span>
			<button type='button' className='icon icon-minus'>
				{' '}
			</button>
			<div className='submenu'>
				<div className='balance'>
					<span>VND</span>
					<span>
						28,848.50 ('000)
						<button type='button' className='icon icon-spinner11'>
							{' '}
						</button>
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
					<a className='orange' href='/en/deposit'>
						Deposit
					</a>
					<a className='orange' href='/en/transfer-funds'>
						Transfer Funds
					</a>
				</div>
				<div className='loginLog'>
					<span>Last Login</span>
					<span>4/12/2023 6:53:54 PM</span>
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
