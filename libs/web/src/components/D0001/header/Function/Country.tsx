import React from 'react'

const Country = () => {
	return (
		<div className='country'>
			<button type='button' className='flag th'>
				{' '}
			</button>

			<div className='countryList'>
				<div className='countryName'>Maiaysia</div>
				<div className='flag ch'>
					<button type='button'> English</button>
					<button type='button'> 简体中文</button>
				</div>
				<div className='countryName'>Thailand</div>
				<div className='flag th'>
					<button type='button'> English</button>
					<button type='button'> ไทย</button>
				</div>
				<div className='countryName'>Indonesia</div>
				<div className='flag id'>
					<button type='button'> English</button>
					<button type='button'> Bhs Indonesia</button>
				</div>
				<div className='countryName'>India</div>
				<div className='flag in'>
					<button type='button'> English</button>
					<button type='button'> Hindi</button>
				</div>
				<div className='countryName'>Bangladesh</div>
				<div className='flag bd'>
					<button type='button'> English</button>
					<button type='button'> বাংলা</button>
				</div>
				<div className='countryName'>China</div>
				<div className='flag cs'>
					<button type='button'> English</button>
					<button type='button'> 简体中文</button>
				</div>
				<div className='countryName'>Global</div>
				<div className='flag gb'>
					<button type='button'> English</button>
					<button type='button'> 简体中文</button>
				</div>
			</div>
		</div>
	)
}

export default Country
