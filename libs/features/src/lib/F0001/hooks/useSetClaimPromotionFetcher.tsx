import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	IGetCustSpecificBonusArgs,
	IPromotionData,
	ISetClaimPromotionArgs,
	updatePromotionData,
	updatePromotionDetail,
	useLazyGetCustSpecificBonusQuery,
	useSetClaimPromotionMutation,
} from '@nx-next-app/service'
import { useAppDispatch } from '@nx-next-app/store'
import {
	DeviceTypeEnum,
	PromotionTypeEnum,
	SelectOptionType,
} from '@nx-next-app/types'
import { numFormatToDigits } from '@nx-next-app/utils'
import { every, includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const LoginModal = dynamic(() => import('../desktop/modal/LoginModal'), {
	ssr: false,
})

const DesktopClaimAmountModal = dynamic(
	() => import('../desktop/promotion/common/ClaimAmountModal'),
	{
		ssr: false,
	}
)

const H5ClaimAmountModal = dynamic(
	() => import('../h5/promotion/common/ClaimAmountModal'),
	{
		ssr: false,
	}
)

const useSetClaimPromotionFetcher = () => {
	const {
		auth,
		userInfo: {
			langId,
			currencyId,
			accountName,
			phoneNo,
			email,
			birth_d: birthD,
			birth_m: birthM,
			birth_y: birthY,
		},
	} = useAuth()
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const { modal } = useGlobalModal()
	const { push } = useRouter()

	const [setClaimPromotion] = useSetClaimPromotionMutation()

	const [getCustSpecificBonus] = useLazyGetCustSpecificBonusQuery()

	const onSetClaimPromotion = async ({
		bonusCode,
		lockedAmount,
	}: Pick<ISetClaimPromotionArgs, 'bonusCode' | 'lockedAmount'>) => {
		try {
			await setClaimPromotion({
				langId,
				bonusCode,
				lockedAmount,
			}).unwrap()

			modal.info(t('Label_Promotion_SuccessClaimed2'), {
				title: t('Label_Promotion_SuccessClaimed1'),
			})
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const setClaimPromotionHandler = async (promotionData: IPromotionData) => {
		const {
			bonusCode,
			canJoin,
			promotionType,
			maxAmount = 0,
			canJoinTierAmountList,
		} = promotionData

		if (!auth.isLogin) {
			if (
				Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) ===
				DeviceTypeEnum.Desktop
			) {
				modal.open(<LoginModal />)
			} else {
				push(`${paths.login.root}?from=${paths.promotion.root}`)
			}
			return
		}

		// * 如果缺少 profile 資訊
		if (!every([accountName, phoneNo, email, birthD, birthM, birthY])) {
			modal.info(t('Label_General_UpdateProfileInfo'), {
				onOK: () => push(paths.profile.root),
			})

			return
		}

		// * 如果可以加入且 promotion 為 Redeposit 或 FirstDeposit 或 MissionBonus 需要先輸入金額彈窗才能進行下一步
		if (
			canJoin &&
			includes(
				[
					PromotionTypeEnum.Redeposit,
					PromotionTypeEnum.FirstDeposit,
					PromotionTypeEnum.MissionBonus,
				],
				promotionType
			)
		) {
			const tierAmountListSelectOptions: SelectOptionType[] =
				canJoinTierAmountList.map(item => {
					const displayText = item.requiredAmount
						? `${t('Label_General_DepositAmount')} ${numFormatToDigits(
								item.requiredAmount,
								0
						  )} / ${t('Label_General_BonusAmount')} ${numFormatToDigits(
								item.bonusAmount,
								0
						  )}`
						: `${t('Label_General_Turnover')} ${numFormatToDigits(
								item.requiredTurnover,
								0
						  )} / ${t('Label_General_BonusAmount')} ${numFormatToDigits(
								item.bonusAmount,
								0
						  )}`

					return {
						value:
							promotionType === PromotionTypeEnum.MissionBonus
								? String(item.bonusAmount)
								: String(item.lockedAmount),
						label: displayText,
					}
				})

			modal.open(
				Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) ===
					DeviceTypeEnum.Desktop ? (
					<DesktopClaimAmountModal
						bonusCode={bonusCode}
						// promotionType={promotionType}
						onSetClaimPromotion={onSetClaimPromotion}
						tierAmountListSelectOptions={tierAmountListSelectOptions}
					/>
				) : (
					<H5ClaimAmountModal
						bonusCode={bonusCode}
						// promotionType={promotionType}
						onSetClaimPromotion={onSetClaimPromotion}
						tierAmountListSelectOptions={tierAmountListSelectOptions}
					/>
				)
			)

			return
		}

		// * 如果不需要填寫 input 或 select，lockedAmount 帶最大值
		onSetClaimPromotion({
			bonusCode,
			lockedAmount: maxAmount,
		})
	}

	const onUpdatePromotionDetail = async ({
		bonusCode,
		tpId,
		promoCategoryId,
	}: IGetCustSpecificBonusArgs) => {
		try {
			const { data: custSpecificBonus } = await getCustSpecificBonus({
				bonusCode,
				tpId,
				promoCategoryId,
			}).unwrap()

			dispatch(
				updatePromotionData({
					langId,
					currencyId,
					bonusCode,
					bonusData: custSpecificBonus,
				})
			)

			dispatch(
				updatePromotionDetail({
					langId,
					currencyId,
					bonusCode,
					bonusData: custSpecificBonus,
				})
			)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	return { setClaimPromotionHandler, onUpdatePromotionDetail }
}

export { useSetClaimPromotionFetcher }
