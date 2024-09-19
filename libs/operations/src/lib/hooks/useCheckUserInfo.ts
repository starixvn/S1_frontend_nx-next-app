import { useAuth } from '@nx-next-app/data-access'
import { isUndefined } from 'lodash-es'

const useCheckUserInfo = () => {
	const {
		userInfo,
		auth: { isLogin },
	} = useAuth()

	const checkUserInfo = ({
		onSuccessCallback,
		// 有傳入才會觸發驗證手機，沒傳入則忽略
		optionalPhoneVerifiedCallback,
	}: {
		onSuccessCallback: () => void
		optionalPhoneVerifiedCallback?: () => void
	}) => {
		const { accountName, phoneNo, email, phoneVerified } = userInfo
		if (isLogin) {
			if (
				(!accountName && !isUndefined(accountName)) ||
				(!phoneNo && !isUndefined(phoneNo)) ||
				(!email && !isUndefined(email))
			) {
				onSuccessCallback()
			}
			if (!!optionalPhoneVerifiedCallback && !phoneVerified) {
				optionalPhoneVerifiedCallback()
			}
		}
	}

	return { checkUserInfo }
}

export { useCheckUserInfo }
