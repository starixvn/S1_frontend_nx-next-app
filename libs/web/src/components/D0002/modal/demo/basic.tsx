/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import dynamic from 'next/dynamic'
import React from 'react'
import useModal from '../useModal'

const DemoModal = dynamic(() => import('./DemoModal'), { ssr: false })

const App: React.FC = () => {
	const demoModal = useModal()

	const showModal = () => {
		demoModal.onOpen()
	}

	const handleOk = () => {
		// eslint-disable-next-line no-console
		console.log('do something...', {})
	}

	const handleCancel = () => {
		demoModal.onCancel()
	}

	return (
		<>
			<button type='button' onClick={showModal}>
				Open Modal
			</button>

			<DemoModal {...demoModal} />
		</>
	)
}

export default App
