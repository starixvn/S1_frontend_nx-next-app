/* eslint-disable no-console */
import React from 'react'
import { Modal } from '..'
import { ModalState } from '../useModal'

const DemoModal = (props: ModalState) => {
	const handleClicked = () => {
		console.log('handleClicked')
	}
	return (
		<Modal open={props.open} onCancel={props.onCancel}>
			<p>Some contents...</p>
			<div className='Success active'>
				<div className='icon icon-bell' />
				<div className='title'>Information</div>
				<div>Content</div>
				<div className='btnGroup'>
					<button type='button' className='btn-check' onClick={handleClicked}>
						OK
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default DemoModal
