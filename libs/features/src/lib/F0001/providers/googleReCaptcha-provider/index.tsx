import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Fragment, ReactNode } from 'react'
import { useGetRecaptchaInfoQuery } from '@nx-next-app/service'

interface IGoogleReCaptchaProvidersProps {
	children: ReactNode
}

export default function GReCaptchaProviders({
	children,
}: IGoogleReCaptchaProvidersProps): JSX.Element {
	const { data: { data: recaptchaInfo } = {} } = useGetRecaptchaInfoQuery()

	// 不直接 return 是確保 api 失效不會整個元件都被 block
	if (!recaptchaInfo?.siteKey) return <Fragment>{children}</Fragment>

	return (
		<GoogleReCaptchaProvider reCaptchaKey={recaptchaInfo?.siteKey}>
			{children}
		</GoogleReCaptchaProvider>
	)
}
