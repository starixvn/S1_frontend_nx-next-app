import { TmpCookiesObj } from 'cookies-next/lib/types'
import { GReCaptchaProviders } from '@nx-next-app/features/F0001/providers/googleReCaptcha-provider'
import { Features } from '../common/Features'
import { Form } from '../common/form'

interface IJoinProps {
	cookies: TmpCookiesObj
}

const Join = ({ cookies }: IJoinProps) => {
	return (
		<div className='joinpop'>
			<div className='joinloginModule'>
				<Features />
				<GReCaptchaProviders>
					{/* 控制位置在 GoogleReCaptchaProvider */}
					<div id='g-reCaptcha' />
					<Form cookies={cookies} />
				</GReCaptchaProviders>
			</div>
		</div>
	)
}

export default Join
