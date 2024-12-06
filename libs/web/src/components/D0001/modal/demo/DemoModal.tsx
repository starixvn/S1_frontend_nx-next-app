/* eslint-disable no-console */
import Modal from '../Modal'
import { ModalState } from '../useModal'

const DemoModal = (props: ModalState) => {
	const handleClicked = () => {
		console.log('handleClicked')
	}
	return (
		<Modal open={props.open}>
			<p>Some contents...</p>
			<div className='Success active'>
				<div className='icon icon-notification-active' />
				<div className='title'>Information</div>
				<div>Content</div>
				<div className='btnGroup'>
					<button type='button' className='btn-primary' onClick={handleClicked}>
						OK
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default DemoModal
