import React from 'react'
import { useConfig } from '../../config-provider'

const App = () => {
	const { modal } = useConfig()

	const fn = () => {
		modal.info('some message')
	}

	return (
		<button type='button' onClick={fn}>
			CLICK
		</button>
	)
}

export default App
