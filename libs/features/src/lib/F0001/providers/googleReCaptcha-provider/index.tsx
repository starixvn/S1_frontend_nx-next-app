import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Fragment, ReactNode } from 'react'
import { useGetRecaptchaInfoQuery } from '@nx-next-app/service'
import { RECAPTCHAT_LANG_BY_LANG_ID } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'

interface IGoogleReCaptchaProvidersProps {
	children: ReactNode
}

export default function GReCaptchaProviders({
	children,
}: IGoogleReCaptchaProvidersProps): JSX.Element {
	const { data: { data: recaptchaInfo } = {} } = useGetRecaptchaInfoQuery()
	const {
		userInfo: { langId },
	} = useAuth()

	// 不直接 return 是確保 api 失效不會整個元件都被 block
	// 中國地區不需驗證
	if (!recaptchaInfo?.siteKey && recaptchaInfo?.country !== 'CN')
		return <Fragment>{children}</Fragment>

	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={recaptchaInfo?.siteKey}
			language={RECAPTCHAT_LANG_BY_LANG_ID[langId]}
			container={{
				// optional to render inside custom element
				element: 'g-reCaptcha',
				parameters: {
					badge: 'bottomleft', // optional, default undefined
				},
			}}
		>
			{children}
		</GoogleReCaptchaProvider>
	)
}
