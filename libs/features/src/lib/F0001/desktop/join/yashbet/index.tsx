import { TmpCookiesObj } from 'cookies-next/lib/types'
import { Features } from './custom/Features'
import { Form } from '../common/form'

interface IJoinProps {
	cookies: TmpCookiesObj
}

const Join = ({ cookies }: IJoinProps) => {
	return (
		<div className='joinpop'>
			<div className='joinloginModule'>
				<Features />
				<Form cookies={cookies} />
			</div>
		</div>
	)
}

export { Join }
