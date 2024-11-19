import { WrapperRegister } from '@nx-next-app/features/F0001/desktop/join/nova88/styles'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { Features } from '../common/Features'
import { Form } from '../common/form'

interface IJoinProps {
	cookies: TmpCookiesObj
}

const Join = ({ cookies }: IJoinProps) => {
	return (
		<WrapperRegister>
			<div className='joinpop'>
				<div className='joinloginModule'>
					<Features />
					<Form cookies={cookies} />
				</div>
			</div>
		</WrapperRegister>
	)
}

export default Join
