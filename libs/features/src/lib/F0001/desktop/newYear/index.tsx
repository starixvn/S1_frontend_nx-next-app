import { useAuth } from '@nx-next-app/data-access'
import Blessing from '@nx-next-app/features/F0001/desktop/newYear/blessing'
import History from '@nx-next-app/features/F0001/desktop/newYear/history'
import Info from '@nx-next-app/features/F0001/desktop/newYear/info'
import Task from '@nx-next-app/features/F0001/desktop/newYear/task'
import { IEventPeriod } from '@nx-next-app/types'
// import { useGetRetentionPromotionQuery } from '@nx-next-app/service'

interface INewYearEventProps {
	eventPeriod: IEventPeriod
}

const NewYearEvent = ({ eventPeriod }: INewYearEventProps) => {
	const {
		auth: { isLogin },
		userInfo: { langId },
	} = useAuth()

	return (
		<main className={`dragonegg-event ${langId}`}>
			{isLogin && (
				<>
					<Task />
					<Blessing />
					<History />
				</>
			)}
			<Info />
		</main>
	)
}

export default NewYearEvent
