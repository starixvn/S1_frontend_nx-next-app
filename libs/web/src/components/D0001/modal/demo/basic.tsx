import React from 'react'
import Modal from '../Modal'
import useModal from '../useModal'

const App: React.FC = () => {
	const demoModal = useModal()

	const showModal = () => {
		demoModal.onOpen()
	}

	const handleOk = () => {
		// eslint-disable-next-line no-console
		console.log('do something...')
	}

	const handleCancel = () => {
		demoModal.onCancel()
	}

	return (
		<>
			<button type='button' onClick={showModal}>
				Open Modal
			</button>
			<Modal open={demoModal.open} onCancel={handleCancel}>
				<p>Some contents...</p>
				<div className='Success active'>
					<div className='icon icon-bell' />
					<div className='title'>Information</div>
					<div>Content</div>
					<div className='btnGroup'>
						<button type='button' className='btn-check' onClick={handleOk}>
							OK
						</button>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default App
