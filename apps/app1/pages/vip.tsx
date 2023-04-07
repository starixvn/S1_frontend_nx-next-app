import React from 'react'
import { Nova88 } from '@nx-next-app/features'

const { Vip } = Nova88.Desktop

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VipPage = ({ initialVipList }: { initialVipList: any[] }) => (
	<Vip initialVipList={initialVipList} />
)

export default VipPage
