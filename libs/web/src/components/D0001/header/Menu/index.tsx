/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Menu = () => {
	return (
		<div className='menu'>
			<div>
				<a className='icon icon-home' href='/en/'>
					<div />
				</a>

				<a className='icon icon-mobile' href='/en/app-download'>
					<div />
				</a>

				<a className='cryptobtn'>
					<div />
				</a>

				<a className='sportsbtn'>
					<div />
					SPORTS
				</a>
				<a className='eSportsbtn' href='/en/eSport'>
					<div />
					E-SPORTS
				</a>
				<a className='livecasinobtn icon icon-newicon' href='/en/live-casino'>
					<div className='icon icon-star-full'>NEW</div>CASINO
				</a>

				<a className='slotbtn' href='/en/slots'>
					<div className='icon icon-star-full'>NEW</div>SLOTS
				</a>

				<a className='' href='/en/game'>
					<div />
					GAMES
				</a>

				<a className='fishbtn' href='/en/fishing'>
					<div />
					FISHING
				</a>

				<a className='' href='/en/lottery'>
					<div />
					LOTTERY
				</a>

				<a className='' href='/en/promotion'>
					<div className='icon icon-mediafire'>HOT</div>PROMOS
				</a>

				<a className='' href='/en/vip'>
					<div />
					VIP
				</a>

				<a className='' href='/en/leaderBoard'>
					<div />
					LEADERBOARD
				</a>

				<div className='subMenu-Wrapper-new'>
					<div className='homeList'>
						<a className='' href='/en/vip'>
							<img
								className='ListBG-left'
								alt='ListBG-left'
								src='https://banner.0814media.net/desktop/img/subMenu-Wrapper-ListBG-left.png'
							/>
							<img
								className='ListBG-right'
								alt='ListBG-right'
								src='https://banner.0814media.net/desktop/img/subMenu-Wrapper-ListBG-right.png'
							/>
							<img
								className='ListBG-center'
								alt='ListBG-center'
								src='https://banner.0814media.net/desktop/img/subMenu-Wrapper-ListBG-center.png'
							/>
							<img
								className='List-npc'
								alt='listImgUrl'
								src='https://banner.0814media.net/desktop/img/home-vip.png'
							/>
							<img
								className='List-bg'
								alt='listImgUrl'
								src='https://banner.0814media.net/desktop/img/vipbg.png'
							/>
							<span>VIP</span>
							<div className='under'>Under Maintenance</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Menu
