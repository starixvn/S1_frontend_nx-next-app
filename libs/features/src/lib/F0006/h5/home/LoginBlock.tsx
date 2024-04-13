import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { paths } from '@nx-next-app/constants'

const LoginBlock = () => {
	const { t } = useTranslation()
	return (
        <div className='headerButton'>
			<Link href={paths.join.root} className='joinBtn'>
				{t('Label_Promotion_JoinNow').toUpperCase()}
			</Link>
			<Link href={paths.login.root} className='loginBtn'>
				{t('Label_General_LogIn').toUpperCase()}
			</Link>
		</div>
    );
}

export { LoginBlock }
