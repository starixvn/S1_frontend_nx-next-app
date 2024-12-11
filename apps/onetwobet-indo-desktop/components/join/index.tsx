import { MultiCaptchaProvider } from '@nx-next-app/operations'
import Banner from './Banner'
import { Form } from './form'

const Join = () => (
	<div className='joinpop registration'>
		<div className='joinloginModule'>
			<Banner />
			<MultiCaptchaProvider>
				<Form />
			</MultiCaptchaProvider>
		</div>
	</div>
)

export default Join
