import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	IReferralSummaryData,
	useGetReferralCodeQuery,
	useGetReferralSummaryQuery,
	useLazyGetReferralSettingDetailQuery,
} from '@nx-next-app/service'
import { createContext, ReactNode, useContext } from 'react'
import DesktopReferralDetailModal from '@nx-next-app/features/F0002/desktop/referral/ReferralDetailModal'
import H5ReferralDetailModal from '@nx-next-app/features/F0002/h5/referral/ReferralDetailModal'
import { DeviceTypeEnum } from '@nx-next-app/types'

export interface ReferralContextInterface {
	loading: boolean
	referralCode: string | undefined
	referralSummaryData: IReferralSummaryData | undefined
	referralInfoList: {
		img: string
		hoverImg?: string
		url: string
	}[]
	onGetReferralDetail: () => Promise<void>
}

interface IReferralProviderProps {
	children: ReactNode
	referralInfoList: {
		img: string
		hoverImg?: string
		url: string
	}[]
}

export const ReferralContext = createContext<ReferralContextInterface>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useReferral = () => {
	return useContext(ReferralContext)
}

const ReferralProvider = ({
	children,
	referralInfoList,
}: IReferralProviderProps) => {
	const { modal } = useGlobalModal()

	const {
		data: { data: referralCode } = {},
		isFetching: isGetReferralCodeFetching,
	} = useGetReferralCodeQuery(null)

	const {
		data: { data: referralSummaryData } = {},
		isFetching: isGetReferralSummaryFetching,
	} = useGetReferralSummaryQuery(null)

	const [getReferralSettingDetail] = useLazyGetReferralSettingDetailQuery()

	const loading = isGetReferralCodeFetching || isGetReferralSummaryFetching

	const onGetReferralDetail = async () => {
		try {
			const { data: referralSettingDetail } = await getReferralSettingDetail(
				null
			).unwrap()

			switch (Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])) {
				case DeviceTypeEnum.Desktop:
					modal.open(
						<DesktopReferralDetailModal
							referralSettingDetail={referralSettingDetail}
						/>
					)
					break

				case DeviceTypeEnum.Mobile:
					modal.open(
						<H5ReferralDetailModal
							referralSettingDetail={referralSettingDetail}
						/>,
						{
							className: 'promospop',
						}
					)
					break

				default:
					break
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const value: ReferralContextInterface = {
		loading,
		referralCode,
		referralSummaryData,
		referralInfoList,
		onGetReferralDetail,
	}

	return (
		<ReferralContext.Provider value={value}>
			{children}
		</ReferralContext.Provider>
	)
}

export { ReferralProvider }
