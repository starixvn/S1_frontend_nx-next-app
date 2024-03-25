import React from 'react'
import Banner from './Banner'
import Prediction from './Prediction'
import Reward from './Reward'
import ExtraRewardAndTerms from './ExtraRewardAndTerms'

const EuroCup = () => {
	return (
		<main className='euro'>
			<Banner />
			<Prediction />
			<Reward />
			<ExtraRewardAndTerms />
		</main>
	)
}

export default EuroCup
