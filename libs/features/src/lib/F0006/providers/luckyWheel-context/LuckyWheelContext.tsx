import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { delay, upperFirst } from 'lodash-es'
import {
	useCheckDrawPrizeQuery,
	useGetDisplayDrawPrizeListQuery,
	useDrawPrizeMutation,
	useGetCustDrawPrizeListQuery,
} from 'libs/web/src/service/eventsApi/api'
import {
	IAxiosError,
	ICustDrawPrizeData,
	IDisplayDrawPrizeData,
} from '@nx-next-app/service'
import { DEVICE_TYPE, paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'

const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0006/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const EVENT_ID = 9

enum DrawPrizeStatusEnum {
	canJoin = 0,
	isJoin = 100,
	drawOut = 101,
	notEligible = 102,
}

interface LuckWheelContextInterface {
	loading: boolean
	isCheckDrawPrizeError: boolean
	displayDrawPrizeList: IDisplayDrawPrizeData[]
	custDrawPrizeList: ICustDrawPrizeData[]
	onDrawPrize: () => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const LuckWheelContext = createContext<LuckWheelContextInterface>(null!)

export const useLuckWheelContext = () => {
	return useContext(LuckWheelContext)
}

interface ILuckWheelProviderProps {
	children: ReactNode
}

export const LuckWheelProvider = ({ children }: ILuckWheelProviderProps) => {
	const {
		auth: { isLogin },
		userInfo: { langId },
	} = useAuth()
	const { push } = useRouter()
	const { modal, closeModal } = useGlobalModal()
	const { t } = useTranslation()

	const {
		error: checkDrawPrizeError,
		isError: isCheckDrawPrizeError,
		isFetching: isCheckDrawPrizeFetching,
	} = useCheckDrawPrizeQuery({
		eventId: EVENT_ID,
	})

	const [drawPrize] = useDrawPrizeMutation()

	const {
		data: { data: displayDrawPrizeList = [] } = {},
		refetch: refetchDisplayDrawPrizeList,
		isFetching: iGetDisplayDrawPrizeListFetching,
	} = useGetDisplayDrawPrizeListQuery({
		eventId: EVENT_ID,
	})

	const { data: { data: custDrawPrizeList = [] } = {} } =
		useGetCustDrawPrizeListQuery({
			eventId: EVENT_ID,
		})

	// * 切換語系後 refetch 資料
	useEffect(() => {
		refetchDisplayDrawPrizeList()
	}, [langId])

	const onDrawPrize = () => {
		if (!isLogin) {
			if (deviceType === DEVICE_TYPE.Desktop) {
				modal.open(<LoginModal />)
			}

			if (deviceType === DEVICE_TYPE.Mobile)
				push({
					pathname: paths.login.root,
					query: { from: paths.luckyWheel.root },
				})

			return
		}

		if (isCheckDrawPrizeError) {
			const { errorCode, data } = checkDrawPrizeError as IAxiosError

			switch (errorCode) {
				case DrawPrizeStatusEnum.isJoin:
					if (deviceType === DEVICE_TYPE.Desktop) {
						modal.open(
							<div className='pop wheelPop active'>
								<div className='animation active'>
									<div className='coin' />
									<div className='coin' />
									<div className='coin' />
									<div className='coin' />
									<div className='coin' />
								</div>
								<div className='active'>
									<button
										className='icon icon-close'
										onClick={() => closeModal()}
									/>

									<div className='title'>
										{t('Label_LuckyWheel_Spin_Rewards')}
									</div>
									<div>
										{t('Label_LuckyWheel_Rewarded', {
											prizeName: data['prizeName'],
										})}
									</div>
									<div className='am'>{data['prizeName']}</div>
								</div>
							</div>
						)
					}

					if (deviceType === DEVICE_TYPE.Mobile)
						modal.info(
							t('Label_LuckyWheel_Rewarded', {
								prizeName: data['prizeName'],
							})
						)
					break

				default:
					modal.info(checkDrawPrizeError?.message)
					break
			}

			return
		}

		// * 等待 3000 毫秒的動畫時間
		delay(async () => {
			try {
				const { data: drawPrizeData } = await drawPrize({
					eventId: EVENT_ID,
				}).unwrap()

				// * 顯示使用者獲得的獎項
				modal.open(
					<div className='pop wheelPop active'>
						<div className='animation active'>
							<div className='coin' />
							<div className='coin' />
							<div className='coin' />
							<div className='coin' />
							<div className='coin' />
						</div>
						<div className='active'>
							<button
								className='icon icon-close'
								onClick={() => closeModal()}
							/>

							<div className='title'>{t('Label_LuckyWheel_Spin_Rewards')}</div>
							<div>
								{t('Label_LuckyWheel_Congratulation', {
									prizeName: drawPrizeData.prizeName,
									site: upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'] || ''),
								})}
							</div>
							<div className='am'>{drawPrizeData.prizeName}</div>
						</div>
					</div>
				)
			} catch (error) {
				modal.info((error as Error).message)
			}
		}, 3000)
	}

	const loading = iGetDisplayDrawPrizeListFetching || isCheckDrawPrizeFetching

	const value: LuckWheelContextInterface = {
		loading,
		isCheckDrawPrizeError,
		displayDrawPrizeList,
		custDrawPrizeList,
		onDrawPrize,
	}

	return (
		<LuckWheelContext.Provider value={value}>
			{children}
		</LuckWheelContext.Provider>
	)
}
