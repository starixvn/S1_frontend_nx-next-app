import {
	AREA_CODE,
	PREV_PAGE,
	PrevPageEnum,
	paths,
} from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { usePhoneError } from '@nx-next-app/operations'
import {
	useLazyExistsEmailQuery,
	useSendOTPEmailMutation,
	useSetProfileMutation,
} from '@nx-next-app/service'
import { DeviceTypeEnum } from '@nx-next-app/types'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ReactNode, createContext, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

interface IProfileInfoContext {
	watchedBirth: Date | null
	initialBirth: Date
	dayOptions: { label: string | number; value: string | number }[] | null
	yearOptions: { label: string | number; value: string | number }[] | null
	monthOptions: { label: string | number; value: string | number }[] | null
	formMethods: any
	showSubmitBtn: boolean
	phoneErrorTip: string | undefined
	legalBirthYear: number
	existsEmailLoading: boolean
	areaCodeSelectOptions: { value: string; label: string }[]
	checkEmail: () => Promise<void>
	checkPhone: () => Promise<void>
	onEmailVerify: (
		infoCallback: () => void,
		errorCallback: (error: string) => void
	) => Promise<void>
	selectAreaCode: (newAreaCode: string) => void
	handleSubmitForm: (
		confirmCallBack: () => void,
		errorCallBack: (message: string) => void,
		prevPageConfirmCallBack: (
			path: string,
			contentKey: string,
			submitKey: string
		) => void,
		profileModifyWarningCallBack: (setFormProfile: () => Promise<void>) => void
	) => Promise<void>
}

const ProfileInfoContext = createContext<IProfileInfoContext>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useProfileInfo = () => useContext(ProfileInfoContext)
/**
 * ProfileInfoProvider 處理手機跟桌機版的個人資料表單的邏輯，
 * 包含驗證電話號碼、電子郵件、生日等相關邏輯，
 * 並處理彈出視窗的功能。 */
const ProfileInfoProvider = ({ children }: { children: ReactNode }) => {
	// ====== 常數 ======

	/** 滿 18 歲的最小出生年份 */
	const legalBirthYear = dayjs().subtract(18, 'year').year()

	/** 滿 18 歲的最小出生日期 */
	const legalBirth = dayjs().subtract(18, 'year').toDate()

	const isMobile =
		Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Mobile

	// ====== hook ======

	const { t } = useTranslation()
	const {
		userInfo: {
			email,
			phoneNo,
			areaCode,
			accountName,
			phoneVerified,
			birth_d: birthDay,
			birth_m: birthMonth,
			birth_y: birthYear,
		},
	} = useAuth()

	/** 使用者初始生日，如果有值就使用使用者的生日; 否則使用 滿 18 歲的最小出生日期 */
	const initialBirth = birthYear
		? dayjs(`${birthYear}-${birthMonth}-${birthDay}`).toDate()
		: legalBirth

	const formMethods = useForm({
		defaultValues: {
			// 通用
			formRealName: '',
			formPhone: '',
			formAreaCode: '',
			formEmail: '',

			// 桌機版使用
			birth: initialBirth,

			// 手機版使用
			formBirthDay: 1,
			formBirthMonth: 1,
			formBirthYear: legalBirthYear,
		},
	})

	const {
		watch,
		trigger,
		setValue,
		setError,
		getValues,
		clearErrors,
		getFieldState,
	} = formMethods

	const { handlePhoneErrorTip } = usePhoneError()

	const { query } = useRouter()

	const { prevPage } = query

	// ====== useState ======

	const [phoneErrorTip, setPhoneErrorTip] = useState<string | undefined>('')

	// ====== 常數 ======

	/** 是否顯示表單送出按鈕，當帳號名稱、電話號碼、生日、電子郵件等必要資料未填寫時，才會顯示送出按鈕。 */
	const showSubmitBtn = !accountName || !phoneNo || !birthDay || !email

	const areaCodeSelectOptions = Object.values(AREA_CODE).map(el => ({
		value: el.AreaCode,
		label: `${el.AreaCode} ${el.Name}`,
	}))

	/** 桌機版生日日期表單 */
	const watchedBirth = watch('birth')

	// 手機版生日日期表單
	const watchedFormBirthDay = watch('formBirthDay')
	const watchedFormBirthMonth = watch('formBirthMonth')
	const watchedFormBirthYear = watch('formBirthYear')

	// ====== api ======

	const [checkExistsEmail, { isFetching: existsEmailLoading }] =
		useLazyExistsEmailQuery()

	const [sendOTPEmail] = useSendOTPEmailMutation()

	const [setProfile] = useSetProfileMutation()

	// ====== 對外函數 ======

	/** 用於手機版生成日期選擇器預設選項的函數，手機版的日期選擇器為 年／月／日 三個 select 分開選擇，故僅在手機版時有值 */
	const { yearOptions, monthOptions, dayOptions } = isMobile
		? (() => {
				const yearOptions = []
				for (let y = legalBirthYear; y >= legalBirthYear - 59; y -= 1) {
					yearOptions.push({ label: y, value: y })
				}

				const monthOptions = []
				for (let m = 1; m <= 12; m += 1) {
					monthOptions.push({ label: t(`Label_Profile_Month${m}`), value: m })
				}

				const dayOptions = []
				const dayByMonth = dayjs()
					.year(watchedFormBirthYear)
					.month(watchedFormBirthMonth - 1) // 月份從 0 開始
					.daysInMonth()

				for (let d = 1; d <= dayByMonth; d += 1) {
					dayOptions.push({ label: d, value: d })
				}

				return { yearOptions, monthOptions, dayOptions }
		  })()
		: { yearOptions: null, monthOptions: null, dayOptions: null }

	/** 送出表單。
	 *
	 *  執行流程：
	 * 1. 填寫想要更新的表單資料
	 * 2. 如果表單資料有效，調用 `setProfile` 將資料提交至後端。
	 * 3. 如果電話未驗證，則顯示電話驗證的確認彈窗。
	 * 4. 如果存在 `prevPage` 參數，則該值顯示相應的頁面跳轉彈窗。
	 * 5. 如果發生錯誤，調用 `errorCallBack` 並顯示錯誤彈窗。
	 *
	 * @param confirmCallBack 當表單成功提交後，調用 CallBack 以顯示確認彈窗。
	 * @param errorCallBack 當發生錯誤時，調用 CallBack 以顯示錯誤彈窗。
	 * @param prevPageCallBack 當需要 prevPage 進行導向時，調用 CallBack 處理跳轉頁面和彈出確認彈窗。
	 * @param profileWarningCallBack 調用 CallBack 提交資料給後端。 */
	const handleSubmitForm = async (
		confirmCallBack: () => void,
		errorCallBack: (message: string) => void,
		prevPageConfirmCallBack: (
			path: string,
			contentKey: string,
			submitKey: string
		) => void,
		profileModifyWarningCallBack: (setFormProfile: () => Promise<void>) => void
	) => {
		const setFormProfile = async () => {
			const { formAreaCode, formPhone, formRealName, formEmail } = getValues()

			/** 手機版是使用 form 的 getValues 來取得生日資訊 ; 桌機版則是使用 formBirth state 來取得生日資訊 */
			const getBirthDateArgs = () => {
				if (isMobile)
					return {
						day: String(watchedFormBirthDay),
						month: String(watchedFormBirthMonth),
						year: String(watchedFormBirthYear),
					}
				return {
					day: dayjs(watchedBirth).format('DD'),
					month: dayjs(watchedBirth).format('MM'),
					year: dayjs(watchedBirth).format('YYYY'),
				}
			}

			const { day, month, year } = getBirthDateArgs()
			try {
				// 既有的資料依然需要傳進 api
				await setProfile({
					AccountName: accountName ?? formRealName,
					AreaCode: areaCode ?? formAreaCode,
					Birth_d: birthDay ?? day,
					Birth_m: birthMonth ?? month,
					Birth_y: birthYear ?? year,

					// 有發現有些 Email 為空字串，所以使用 || 判斷
					PhoneNo: phoneNo || formPhone,
					Email: email || formEmail,
				}).unwrap()

				if (!phoneVerified) {
					confirmCallBack()
				} else if (prevPage) {
					const { path, contentKey, submitKey } =
						PREV_PAGE[prevPage as PrevPageEnum]
					prevPageConfirmCallBack(path, contentKey, submitKey)
				}
			} catch (error) {
				errorCallBack((error as Error).message)
			}
		}
		profileModifyWarningCallBack(setFormProfile)
	}

	/**
	 * 驗證電子郵件並發送 OTP 驗證碼
	 * 該函數負責調用 API 發送 OTP 郵件驗證，並調用 Callback。
	 *
	 * 執行流程：
	 * 1. 調用 API 發送 OTP 郵件驗證。
	 * 2. 如果調用成功，調用 `infoCallback` 顯示成功彈窗。
	 * 3. 如果調用失敗，捕捉錯誤並將錯誤傳遞給 `errorCallback`，顯示錯誤彈窗。
	 *
	 * @param infoCallback - 成功發送 OTP 後調用的 Callback，顯示成功彈窗
	 * @param errorCallback - 當發生錯誤時調用的 Callback，顯示錯誤彈窗 */
	const onEmailVerify = async (
		infoCallback: () => void,
		errorCallback: (error: string) => void
	) => {
		try {
			const route = paths.profile.root.slice(1)
			await sendOTPEmail({ route }).unwrap()
			infoCallback()
		} catch (error) {
			errorCallback((error as Error).message)
		}
	}

	/**
	 * 檢查電話號碼的錯誤提示
	 * 如果有錯誤會顯示提示信息，否則清除錯誤 */
	const checkPhone = async () => {
		await trigger('formPhone')
		const { error } = getFieldState('formPhone')

		const errorTip = handlePhoneErrorTip({
			phoneError: error?.message,
			formAreaCode: getValues('formAreaCode'),
			formPhone: getValues('formPhone'),
		})

		if (errorTip) {
			setPhoneErrorTip(errorTip)
			return
		}
		setPhoneErrorTip('')
		clearErrors('formPhone')
	}

	/**
	 * 選擇區域代碼
	 * 當用戶選擇新的區域代碼時觸發，並重新檢查電話號碼
	 * @param newAreaCode - 新選擇的區域代碼 */
	const selectAreaCode = (newAreaCode: string) => {
		const formAreaCode = getValues('formAreaCode')
		if (newAreaCode !== formAreaCode) {
			setValue('formAreaCode', newAreaCode)
			const formPhone = getValues('formPhone')
			if (formPhone) checkPhone()
		}
	}

	/**
	 * 檢查電子郵件格式是否正確並發送 OTP 驗證碼
	 * 如果郵件格式正確，調用 API 來檢查郵箱是否重複 */
	const checkEmail = async () => {
		await trigger('formEmail')
		const { error } = getFieldState('formEmail')
		const formEmail = getValues('formEmail')
		if (error) return

		try {
			const { data: isExistsEmail } = await checkExistsEmail({
				email: formEmail,
			}).unwrap()

			if (isExistsEmail) {
				setError('formEmail', {
					type: 'duplicate',
					message: t('Label_Profile_MailExisted') ?? '',
				})
			}
		} catch (error) {
			// 處理錯誤
		}
	}

	const value: IProfileInfoContext = {
		watchedBirth,
		initialBirth,
		dayOptions,
		yearOptions,
		monthOptions,
		formMethods,
		showSubmitBtn,
		phoneErrorTip,
		legalBirthYear,
		existsEmailLoading,
		areaCodeSelectOptions,
		checkEmail,
		checkPhone,
		onEmailVerify,
		selectAreaCode,
		handleSubmitForm,
	}

	return (
		<ProfileInfoContext.Provider value={value}>
			{children}
		</ProfileInfoContext.Provider>
	)
}

export { ProfileInfoProvider }
