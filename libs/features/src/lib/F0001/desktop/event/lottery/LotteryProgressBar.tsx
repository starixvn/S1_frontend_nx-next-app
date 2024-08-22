const LotteryProgressBar = ({ ratio = 0 }: { ratio?: number }) => {
	const percentage = (ratio > 1 ? 1 : ratio) * 100

	return (
		<div className='progress'>
			<div className='progress-bar' style={{ width: `${percentage}%` }} />
		</div>
	)
}

export default LotteryProgressBar
