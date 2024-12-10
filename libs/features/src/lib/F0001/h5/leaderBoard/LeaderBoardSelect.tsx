import classNames from 'classnames'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

interface ILeaderBoardSelectProps {
	options: { label: string; value: string }[]
	onChange: (newPeriodId: string) => void
}

const LeaderBoardSelect = ({ options, onChange }: ILeaderBoardSelectProps) => {
	const [selectedOption, setSelectedOption] = useState<{
		label: string
		value: string
	}>(options[options.length > 1 ? options.length - 2 : 0])
	const [isShow, setIsShow] = useState(false)
	const ref = useRef(null)

	const handleOptionClick = (newOption: { label: string; value: string }) => {
		setSelectedOption(newOption)
		setIsShow(false)
		onChange(newOption.value)
	}

	useOnClickOutside(ref, () => {
		if (isShow) {
			setIsShow(false)
		}
	})

	return (
		<div className='infoModule select-date'>
			<div className='inputInfo ' />
			<div className='inputBox-blue'>
				<div className='dropdown' ref={ref}>
					<button
						onClick={() => {
							setIsShow(!isShow)
						}}
						className='btn'
					>
						<div>
							<div className='flag undefined' />
							<span className='text'>{selectedOption.label}</span>
						</div>
					</button>
					<div className={classNames('dropdown-container', { active: isShow })}>
						<div className='dropdown-wrapper'>
							{options.map(option => (
								<div
									onClick={() => handleOptionClick(option)}
									className='dropdown-item'
								>
									<span className='text'>{option.label}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LeaderBoardSelect
