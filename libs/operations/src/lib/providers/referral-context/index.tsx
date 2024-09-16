import { paths } from '@nx-next-app/constants'
import {
	IReferralSettingDetailData,
	IReferralSummaryData,
	useGetReferralCodeQuery,
	useGetReferralSummaryQuery,
	useLazyGetReferralSettingDetailQuery,
} from '@nx-next-app/service'
import { isEmpty } from 'lodash-es'
import { ReactNode, createContext, useContext } from 'react'

interface IReferralContextProps {
	isLoading: boolean
	referralCode: string | undefined
	referralLink: string | undefined
	referralSummaryData: IReferralSummaryData | undefined
	onGetReferralDetail: (
		referralDetailModalCallback: (
			referralSettingDetail: IReferralSettingDetailData
		) => void,
		errorCallback: (errorMessage: string) => void
	) => Promise<void>
}

interface IReferralProviderProps {
	children: ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ReferralContext = createContext<IReferralContextProps>(null!)

export const useReferral = () => {
	return useContext(ReferralContext)
}

export const ReferralProvider = ({ children }: IReferralProviderProps) => {
	const {
		data: { data: referralCode } = {},
		isFetching: isGetReferralCodeFetching,
	} = useGetReferralCodeQuery(null)

	const {
		data: { data: referralSummaryData } = {},
		isFetching: isGetReferralSummaryFetching,
	} = useGetReferralSummaryQuery(null)

	const isLoading = isGetReferralCodeFetching || isGetReferralSummaryFetching

	const [getReferralSettingDetail] = useLazyGetReferralSettingDetailQuery()

	const onGetReferralDetail = async (
		referralDetailModalCallback: (
			referralSettingDetail: IReferralSettingDetailData
		) => void,
		errorCallback: (errorMessage: string) => void
	) => {
		try {
			const { data: referralSettingDetail } = await getReferralSettingDetail(
				null
			).unwrap()

			if (isEmpty(referralSettingDetail)) return

			referralDetailModalCallback(referralSettingDetail)
		} catch (error) {
			errorCallback((error as Error).message)
		}
	}

	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: ''

	const referralLink = `${origin}${paths.join.root}?AffId=${referralCode}`

	const value: IReferralContextProps = {
		isLoading,
		referralCode,
		referralLink,
		referralSummaryData,
		onGetReferralDetail,
	}

	return (
		<ReferralContext.Provider value={value}>
			{children}
		</ReferralContext.Provider>
	)
}
