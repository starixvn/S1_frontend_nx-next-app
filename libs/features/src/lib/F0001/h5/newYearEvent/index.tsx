import { useAuth } from '@nx-next-app/data-access'
import Blessing from '@nx-next-app/features/F0001/h5/newYearEvent/blessing'
import History from '@nx-next-app/features/F0001/h5/newYearEvent/history'
import Info from '@nx-next-app/features/F0001/h5/newYearEvent/info'
import Task from '@nx-next-app/features/F0001/h5/newYearEvent/task'
import { useTranslation } from 'next-i18next'
import router from 'next/router'

const NewYearEvent = () => {
	const {
		auth: { isLogin },
		userInfo: { langId },
	} = useAuth()

	const { t } = useTranslation()

	return (
		<main className={`dragonegg-event ${langId}`}>
			<div className='event-back'>
				<i className='icon-back' />
				<button className='back' onClick={() => router.back()}>
					{t('Label_General_Back')}
				</button>
			</div>
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
