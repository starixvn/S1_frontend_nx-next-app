import { useAuth } from '@nx-next-app/data-access'
import {
	useGetPredictionTeamInfoQuery,
	useGetPredictionWinnerListQuery,
	usePromotionPredictScoreMutation,
	type IPromotionPredictScoreArgs,
	type TGetPredictionWinnerListData,
	type TPromotionPredictionData,
} from '@nx-next-app/service'
import { ReactNode, createContext, useContext, useEffect } from 'react'

interface PredictionChallengeContextInterface {
	isLoading: boolean
	isNoPredictionActivity: boolean
	predictMatches: TPromotionPredictionData[]
	predictResult: TGetPredictionWinnerListData | undefined
	onPredictScore: (
		{ matchId, homeTeamScore, awayTeamScore }: IPromotionPredictScoreArgs,
		{
			loginCallback,
			successCallback,
			errorCallback,
		}: {
			loginCallback: () => void
			successCallback: () => void
			errorCallback: (message: string) => void
		}
	) => Promise<void>
}

export const PredictionChallengeContext =
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	createContext<PredictionChallengeContextInterface>(null!)

export const usePredictionChallengeContext = () => {
	return useContext(PredictionChallengeContext)
}

interface IPredictionChallengeProviderProps {
	children: ReactNode
}

export const PredictionChallengeProvider = ({
	children,
}: IPredictionChallengeProviderProps) => {
	const {
		auth: { isLogin },
		userInfo: { currencyId },
	} = useAuth()

	const [predictScore] = usePromotionPredictScoreMutation()

	// 取得賽事資訊
	const {
		data: { data: bonusData = [] } = {},
		refetch: refetchPredictionTeamInfo,
		isFetching: isGetPredictionTeamInfoFetching,
	} = useGetPredictionTeamInfoQuery(null)

	// 原則上只會有一組 bonusCode，但後台沒擋的狀況下人為失誤可能會有多組 bonusCode，所以這邊用 flatMap 處理
	const predictMatches = bonusData.flatMap(item => item.promotionPrediction)

	// 判斷是否有預測活動
	const isNoPredictionActivity = bonusData.length === 0

	// 取得前一次結束的比賽預測 Winners 資訊
	const {
		data: { data: predictResult } = {},
		isFetching: isGetPredictionWinnerListFetching,
	} = useGetPredictionWinnerListQuery({
		siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']),
		currencyId,
	})

	// 送出預測
	const onPredictScore = async (
		args: IPromotionPredictScoreArgs,
		{
			loginCallback,
			successCallback,
			errorCallback,
		}: {
			loginCallback: () => void
			successCallback: () => void
			errorCallback: (message: string) => void
		}
	) => {
		if (!isLogin) {
			loginCallback()
			return
		}
		try {
			await predictScore({ ...args }).unwrap()
			refetchPredictionTeamInfo()
			successCallback()
		} catch (error) {
			errorCallback((error as Error).message)
		}
	}

	// 登入後觸發 refetch 賽事資訊
	useEffect(() => {
		if (isLogin) {
			refetchPredictionTeamInfo()
		}
	}, [isLogin])

	const isLoading =
		isGetPredictionTeamInfoFetching || isGetPredictionWinnerListFetching

	const value: PredictionChallengeContextInterface = {
		isLoading,
		isNoPredictionActivity,
		predictMatches,
		predictResult,
		onPredictScore,
	}

	return (
		<PredictionChallengeContext.Provider value={value}>
			{children}
		</PredictionChallengeContext.Provider>
	)
}
