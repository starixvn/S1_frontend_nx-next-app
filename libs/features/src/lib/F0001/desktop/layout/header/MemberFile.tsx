import React from 'react'
import { Header } from '@nx-next-app/components/D0001'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { DeviceTypeEnum } from '@nx-next-app/types'

const MemberFile = () => {
	const { userInfo } = useAuth()
	const { VIP_CLUB_IMAGES } = useStaticData()
	const userLevelImageInfo = VIP_CLUB_IMAGES(DeviceTypeEnum.Desktop)[
		userInfo?.userLevel ?? -1
	]

	return <Header.Function.MemberFile userLevelImageInfo={userLevelImageInfo} />
}

export default MemberFile
