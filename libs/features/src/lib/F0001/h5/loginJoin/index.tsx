import { paths } from '@nx-next-app/constants'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { isString } from 'lodash-es'
import SwitchButton from './SwitchButton'
import Login from './login'
import Join from './join'

interface ILoginJoinProps {
	cookies: TmpCookiesObj
}

const LoginJoin = ({ cookies }: ILoginJoinProps) => {
	const { push, query, pathname } = useRouter()
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()
	const [formType, setFormType] = useState<'left' | 'right'>(
		pathname.match(paths.login.root) ? 'left' : 'right'
	)

	// * 除了 cs 之外其餘的語系都用 en 版本
	const logoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/${
		langId === 'cs' ? 'logo_cs_w' : 'logo_en_w'
	}.png`

	const fromRoute = isString(query['from']) ? query['from'] : paths.home.root

	return (
		<div className='logoSwitch active'>
			<button onClick={() => push(fromRoute)}>
				<div className='icon icon-close' />
			</button>
			<img src={logoUrl} alt='logo' />

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

			{formType === 'left' && <Login />}
			{formType === 'right' && <Join cookies={cookies} />}
		</div>
	)
}

export default LoginJoin
