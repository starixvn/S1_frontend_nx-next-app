import { paths } from '@nx-next-app/constants'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { isString } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SwitchButton from '../common/SwitchButton'
import Join from '../common/join'
import Login from '../common/login'

interface ILoginJoinProps {
	cookies: TmpCookiesObj
}

const LoginJoin = ({ cookies }: ILoginJoinProps) => {
	const { push, query, pathname } = useRouter()
	const { t } = useTranslation()
	const [formType, setFormType] = useState<'left' | 'right'>(
		pathname.match(paths.login.root) ? 'left' : 'right'
	)

	const fromRoute = isString(query['from']) ? query['from'] : paths.home.root

	return (
		<div className='logoSwitch active'>
			<button onClick={() => push(fromRoute)}>
				<div className='icon icon-close' />
			</button>
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/logo.png`}
				alt='logo'
			/>

			<SwitchButton
				checkedChildren={t('Label_General_LogIn')}
				unCheckedChildren={t('Label_General_Join')}
				defaultChecked={formType}
				onChange={type => {
					setFormType(type)
					if (type === 'left') {
						push(
							{ pathname: paths.login.root, query: { from: fromRoute } },
							undefined,
							{ shallow: true }
						)
					} else if (type === 'right') {
						push(
							{ pathname: paths.join.root, query: { from: fromRoute } },
							undefined,
							{ shallow: true }
						)
					}
				}}
			/>

			{formType === 'left' && <Login fromRoute={fromRoute} />}
			{formType === 'right' && <Join cookies={cookies} />}
		</div>
	)
}

export { LoginJoin }
