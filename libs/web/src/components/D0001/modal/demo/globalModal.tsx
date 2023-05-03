import { useGlobalModal } from '../../config-context'

const App = () => {
	const { modal } = useGlobalModal()

	const fn = () => {
		modal.info('some message', {
			onOK: () => {
				//
			},
		})
	}

	return (
		<button type='button' onClick={fn}>
			CLICK
		</button>
	)
}

export default App
