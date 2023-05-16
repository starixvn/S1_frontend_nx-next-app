/* eslint-disable @typescript-eslint/no-unused-vars */
import dynamic from 'next/dynamic'
import { FieldErrors } from 'react-hook-form'
import { renderFieldError, renderFieldErrors } from '../../../../utils'
import { useGlobalModal } from '../../config-context'
import useModal from '../useModal'

const DemoModal = dynamic(() => import('./DemoModal'), { ssr: false })

const App = () => {
	const { modal } = useGlobalModal()
	const demoModal = useModal()

	const fnDefault = () => {
		// * function 的方式打開彈窗
		modal.open(
			<DemoModal
				onOpen={demoModal.onOpen}
				open={demoModal.open}
				onCancel={demoModal.onCancel}
				// * {...demoModal}
			/>
		)
	}

	const fnInfo = () => {
		modal.info('some message')

		modal.info('some message', {
			icon: 'icon icon-another',
			title: 'another title',
			onOK: () => {
				//
			},
		})
	}

	const fnError = (errors: FieldErrors) => {
		// * 只顯示第一筆錯誤訊息
		modal.error(renderFieldError(errors))

		// * 顯示全部錯誤訊息
		modal.error(renderFieldErrors(errors))
	}

	return (
		<button type='button' onClick={fnDefault}>
			CLICK
		</button>
	)
}

export default App
