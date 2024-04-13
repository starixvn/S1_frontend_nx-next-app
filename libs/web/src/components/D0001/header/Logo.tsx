import Link from 'next/link'
import { paths } from '../../../app/constants'

interface ILogoProps {
	logoUrl: string
	rewardsUrl: string
	showSpLogo: boolean
}

const Logo = ({ logoUrl, rewardsUrl, showSpLogo }: ILogoProps) => {
	return (
        <div className='logo'>
			<Link className='logo' href={paths.home.root}>

                <img src={logoUrl} alt='logo' />

            </Link>
			{showSpLogo && <a className='splogo' />}

			{process.env['NEXT_PUBLIC_SHOW_REWARD'] === 'true' && (
				(<Link
                    href='/rewards'
                    className='logo'
                    passHref
                    target='_blank'
                    rel='noopener noreferrer'>

                    <img src={rewardsUrl} alt='88reward' />

                </Link>)
			)}
		</div>
    );
}

export default Logo
