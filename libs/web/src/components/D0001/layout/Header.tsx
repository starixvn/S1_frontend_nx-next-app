import Link from 'next/link'
import React from 'react'
// use next/future/image but not next/image
import Image from 'next/future/image'

const Header = ({ logoUrl }: { logoUrl: string }) => {
	return (
		<header id='header'>
			<div className='header'>
				<div className='logo'>
					<Link className='logo' href='/'>
						<a>
							{/* <img src={logoUrl} alt='logo' /> */}
							{/* 先用原生 img 查看寬高，再給予定寬高 */}
							<Image src={logoUrl} alt='logo' width={150} height={66} />
						</a>
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
