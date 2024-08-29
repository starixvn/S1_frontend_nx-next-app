import { TmpCookiesObj } from 'cookies-next/lib/types'
import { Features } from '../common/Features'
import { Form } from '../common/form'
import GReCaptchaProviders from '@nx-next-app/features/F0001/providers/googleReCaptcha-provider'

interface IJoinProps {
	cookies: TmpCookiesObj
}

const Join = ({ cookies }: IJoinProps) => {
	return (
		<div className='joinpop'>
			<div className='joinloginModule'>
				<Features />
				<GReCaptchaProviders>
					<Form cookies={cookies} />
				</GReCaptchaProviders>
			</div>
		</div>
	)
}

export default Join
