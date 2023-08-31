import { compact } from 'lodash-es'

export const getSafetyLv = ({
	accountName,
	phoneVerified,
	emailVerified,
}: {
	accountName?: string
	phoneVerified?: boolean
	emailVerified?: boolean
}) => {
	const safetyLv = compact([accountName, phoneVerified, emailVerified]).length

	let safetyDisplayKey = ''
	switch (safetyLv) {
		case 1:
			safetyDisplayKey = 'Label_Profile_Weak'
			break
		case 2:
			safetyDisplayKey = 'Label_Profile_Normal'
			break
		case 3:
			safetyDisplayKey = 'Label_Profile_Excellent'
			break
		default:
			safetyDisplayKey = 'Label_Profile_Weak'
			break
	}

	return { safetyLv, safetyDisplayKey }
}
