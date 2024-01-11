import React, { useRef, useState } from 'react'
import classNames from 'classnames'
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
		<div className='infoModule'>
			<div className='inputInfo ' />
			<div className='inputBox' ref={ref}>
				<button
					onClick={() => {
						setIsShow(true)
					}}
					className='dropdown btn'
				>
					<div>
						<div className='flag undefined' />
						<span className='text'>{selectedOption.label}</span>
					</div>
					<i className='icon icon-keyboard_arrow_down' />
				</button>
				<div className={classNames('dropdown-container', { active: isShow })}>
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
	)
}

export default LeaderBoardSelect
