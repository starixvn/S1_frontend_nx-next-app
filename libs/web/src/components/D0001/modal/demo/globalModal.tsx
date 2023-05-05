/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldErrors } from 'react-hook-form'
import { renderFieldError, renderFieldErrors } from '../../../../utils'
import { useGlobalModal } from '../../config-context'

const App = () => {
	const { modal } = useGlobalModal()

	const fnDefault = () => {
		modal.open('message', {
			// * 自定義 icon 與 title, 不給默認值
			icon: 'icon icon-exit',
			title: 'title',
			onOK: () => {
				//
			},
		})
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
