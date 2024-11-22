import { MultiCaptchaProvider } from '@nx-next-app/operations'
import { TmpCookiesObj } from 'cookies-next/lib/types'
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
				<MultiCaptchaProvider>
					<Form cookies={cookies} />
				</MultiCaptchaProvider>
			</div>
		</div>
	)
}

export default Join
