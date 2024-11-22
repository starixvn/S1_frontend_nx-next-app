import { RECAPTCHAT_LANG_BY_LANG_ID } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	CaptchaActionTypeEnum,
	CaptchaTypeEnum,
	IRecaptchaInfoData,
	useGetRecaptchaInfoQuery,
} from '@nx-next-app/service'
import { isInApp } from '@nx-next-app/utils'
import {
	FC,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import {
	GoogleReCaptchaProvider,
	useGoogleReCaptcha,
} from 'react-google-recaptcha-v3'
import Turnstile from 'react-turnstile'
import { FallbackCaptcha } from './FallbackCaptcha'

interface ICaptchaContext {
	getToken: () => string | Promise<string> | undefined
	Captcha: FC
	captchaType?: CaptchaTypeEnum
}

export const CaptchaContext = createContext({} as ICaptchaContext)

interface ICaptchaProviderProps {
	children: ReactNode
	recaptchaInfoData?: IRecaptchaInfoData
	action?: CaptchaActionTypeEnum
}

const CaptchaProvider = ({
	children,
	recaptchaInfoData,
	action = CaptchaActionTypeEnum.signup,
}: ICaptchaProviderProps) => {
	const token = useRef('')
	const [captchaType, setCaptchaType] = useState<undefined | CaptchaTypeEnum>()
	const { siteKey, type, country } = recaptchaInfoData || {}
	const { executeRecaptcha } = useGoogleReCaptcha()

	const getToken = () => {
		switch (captchaType) {
			case CaptchaTypeEnum.Google:
				if (country === 'CN' || isInApp()) {
					return undefined
				}
				return executeRecaptcha?.(action)
			case CaptchaTypeEnum.Cloudflare:
				return token.current
			default:
				return undefined
		}
	}

	const components: Record<CaptchaTypeEnum, FC> = {
		[CaptchaTypeEnum.Number]: FallbackCaptcha,
		[CaptchaTypeEnum.Google]: () => null,
		[CaptchaTypeEnum.Cloudflare]: () => (
			<Turnstile
				sitekey={siteKey || ''}
				onVerify={turnstileToken => {
					token.current = turnstileToken
				}}
				onError={() => setCaptchaType(CaptchaTypeEnum.Number)}
			/>
		),
	}
	useEffect(() => {
		if (type !== undefined) {
			setCaptchaType(type)
		}
	}, [type])

	const value: ICaptchaContext = {
		getToken,
		Captcha: captchaType !== undefined ? components[captchaType] : () => null,
		captchaType,
	}
	return (
		<CaptchaContext.Provider value={value}>{children}</CaptchaContext.Provider>
	)
}

export const MultiCaptchaProvider = ({ children }: { children: ReactNode }) => {
	const { data: { data: recaptchaInfoData } = {} } = useGetRecaptchaInfoQuery()
	const { type, siteKey, country } = recaptchaInfoData || {}

	const {
		userInfo: { langId },
	} = useAuth()

	if (!siteKey)
		return (
			<CaptchaProvider recaptchaInfoData={recaptchaInfoData}>
				{children}
			</CaptchaProvider>
		)

	const isGoogleReCaptchaBadge =
		type === CaptchaTypeEnum.Google && country !== 'CN' && !isInApp()

	return (
		<GoogleReCaptchaProvider
			language={RECAPTCHAT_LANG_BY_LANG_ID[langId]}
			container={{
				element: 'g-reCaptcha',
				parameters: { badge: 'bottomleft' },
			}}
			reCaptchaKey={siteKey}
		>
			<CaptchaProvider recaptchaInfoData={recaptchaInfoData}>
				{children}
			</CaptchaProvider>
			<div
				id='g-reCaptcha'
				style={isGoogleReCaptchaBadge ? {} : { display: 'none' }}
			/>
		</GoogleReCaptchaProvider>
	)
}

export const useCaptchaContext = () => useContext(CaptchaContext)
