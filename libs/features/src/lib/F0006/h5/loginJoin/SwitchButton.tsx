import classNames from 'classnames'
import { useState } from 'react'

type FormType = 'left' | 'right'

interface ISwitchButtonProps {
	checkedChildren: string
	unCheckedChildren: string
	defaultChecked: FormType
	onChange?: (type: FormType) => void
}

const SwitchButton = ({
	checkedChildren,
	unCheckedChildren,
	defaultChecked,
	onChange,
}: ISwitchButtonProps) => {
	const [type, setType] = useState<FormType>(defaultChecked)

	return (
		<button className='switch'>
			<div
				className={classNames('switchBg', {
					right: type === 'right',
				})}
			/>
			<div
				className={classNames('switchLogin', {
					active: type === 'left',
				})}
			>
				<a
					onClick={() => {
						setType('left')
						onChange && onChange('left')
					}}
				>
					{checkedChildren}
				</a>
			</div>
			<div
				className={classNames('switchJoin', {
					active: type === 'right',
				})}
			>
				<a
					onClick={() => {
						setType('right')
						onChange && onChange('right')
					}}
				>
					{unCheckedChildren}
				</a>
			</div>
		</button>
	)
}

export default SwitchButton
