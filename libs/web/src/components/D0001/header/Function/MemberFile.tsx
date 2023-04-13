import React from 'react'

const MemberFile = () => {
	return (
		<div className='memberfile'>
			<div className='vipAnimation'>
				<div />
			</div>
			<a href='/en/profile'>
				<img
					src='https://banner.0814media.net/desktop/img/vip/vip5.png'
					alt='vip05'
				/>
			</a>
			<button type='button'>qatest01</button>
			<div className='submenu'>
				<a className='' href='/en/profile'>
					Profile
				</a>
				<a className='' href='/en/crypto-wallet'>
					Crypto Wallet
				</a>
				<a className='icon  ' href='/en/referral'>
					Refer Friends
				</a>
				<a className='' href='/en/change-password'>
					Change Password
				</a>
			</div>
		</div>
	)
}

export default MemberFile
