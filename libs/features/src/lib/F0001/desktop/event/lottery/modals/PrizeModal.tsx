import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ICustLotteryHistoryWinnerData } from '@nx-next-app/service'
import LotteryPrize from '../LotteryPrize'

const PrizeModal = ({ data }: { data: ICustLotteryHistoryWinnerData }) => {
	const { closeModal } = useGlobalModal()
	return <LotteryPrize data={data} onClose={closeModal} allowClickToCopy />
}

export default PrizeModal
