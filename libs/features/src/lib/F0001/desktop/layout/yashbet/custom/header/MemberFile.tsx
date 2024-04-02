import { Header } from '@nx-next-app/components/D0006'
import { useAuth, useStaticData } from '@nx-next-app/data-access'

const MemberFile = () => {
	const { userInfo } = useAuth()
	const { VIP_CLUB_IMAGES } = useStaticData()

	const userLevelImageInfo =
		VIP_CLUB_IMAGES[(userInfo?.userLevel && userInfo.userLevel - 1) ?? -1]

	return <Header.Function.MemberFile userLevelImageInfo={userLevelImageInfo} />
}

export default MemberFile
