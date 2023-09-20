/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react'

const Spin = () => {
	return (
		<div id='Loading' className='active'>
			<div className='container'>
				<div className='cube'>
					<div className='sides'>
						<div className='top' />
						<div className='right' />
						<div className='bottom' />
						<div className='left' />
						<div className='front' />
						<div className='back' />
					</div>
				</div>

				<h1 />
				<div className='text'>Loading...</div>
			</div>
		</div>
	)
}

export { Spin }
