import { useAuth } from '@nx-next-app/data-access'
import Blessing from '@nx-next-app/features/F0001/desktop/newYearEvent/blessing'
import History from '@nx-next-app/features/F0001/desktop/newYearEvent/history'
import Info from '@nx-next-app/features/F0001/desktop/newYearEvent/info'
import Task from '@nx-next-app/features/F0001/desktop/newYearEvent/task'
import classNames from 'classnames'

const NewYearEvent = () => {
	const {
		auth: { isLogin },
		userInfo: { langId },
	} = useAuth()

	return (
		<main className={classNames('dragonegg-event', langId)}>
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
