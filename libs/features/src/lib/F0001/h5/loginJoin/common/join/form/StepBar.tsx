import classNames from 'classnames'

interface IStepProps {
	step: number
}

const StepBar = ({ step }: IStepProps) => {
	return (
		<div className='step'>
			<div className='stepLine'>
				<div />
			</div>
			<div className={classNames('circle', { active: step === 1 })}>
				<div>
					{step <= 1 ? <div>1</div> : <div className='icon icon-check' />}
				</div>
			</div>
			<div className={classNames('circle', { active: step === 2 })}>
				<div>
					{step <= 2 ? <div>2</div> : <div className='icon icon-check' />}
				</div>
			</div>
			<div className={classNames('circle', { active: step === 3 })}>
				<div>
					{step < 3 ? <div>3</div> : <div className='icon icon-check' />}
				</div>
			</div>
		</div>
	)
}

export { StepBar }
