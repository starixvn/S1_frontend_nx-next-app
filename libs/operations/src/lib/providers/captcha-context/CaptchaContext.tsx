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

const CaptchaContext = createContext<ICaptchaContext>({
	getToken: () => '',
	Captcha: () => null,
})

interface ICaptchaProviderProps {
	children: ReactNode
	recaptchaInfoData?: IRecaptchaInfoData
	action?: CaptchaActionTypeEnum
}

const isGoogleRecaptcha = (data?: IRecaptchaInfoData) =>
	data?.type === CaptchaTypeEnum.Google &&
	data.siteKey &&
	data.country !== 'CN' &&
	!isInApp()

const CaptchaProvider = ({
	children,
	recaptchaInfoData,
	action = CaptchaActionTypeEnum.Signup,
}: ICaptchaProviderProps) => {
	const token = useRef('')
	const [captchaType, setCaptchaType] = useState<undefined | CaptchaTypeEnum>()
	const { siteKey, type } = recaptchaInfoData || {}
	const { executeRecaptcha } = useGoogleReCaptcha()

	const getToken = () => {
		switch (captchaType) {
			case CaptchaTypeEnum.Google:
				if (isGoogleRecaptcha(recaptchaInfoData)) {
					return executeRecaptcha?.(action)
				}
				return undefined
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
	const { data: recaptchaInfoData } = useGetRecaptchaInfoQuery()?.data ?? {}
	const { siteKey } = recaptchaInfoData ?? {}
	const { langId } = useAuth()?.userInfo ?? {}

	const googleRecaptchaElementId = 'g-reCaptcha'

	return (
		<GoogleReCaptchaProvider
			language={RECAPTCHAT_LANG_BY_LANG_ID[langId]}
			container={{
				element: googleRecaptchaElementId,
				parameters: { badge: 'bottomleft' },
			}}
			reCaptchaKey={siteKey || ''}
		>
			<CaptchaProvider recaptchaInfoData={recaptchaInfoData}>
				{children}
			</CaptchaProvider>
			<div
				id={googleRecaptchaElementId}
				style={isGoogleRecaptcha(recaptchaInfoData) ? {} : { display: 'none' }}
			/>
		</GoogleReCaptchaProvider>
	)
}

export const useCaptchaContext = () => useContext(CaptchaContext)
