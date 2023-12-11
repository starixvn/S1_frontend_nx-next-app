import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Img } from '../../image'

interface IDepositSubModuleButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: string
	imgName?: string
	label: string
	matchKey?: string
	matchValue: string
	children: ReactNode
	canSubmit?: boolean
}

const DepositSubModuleButton = ({
	icon = '',
	imgName,
	label,
	children,
	matchKey,
	matchValue,
	className,
	canSubmit = true,
	onClick,
	...props
}: IDepositSubModuleButtonProps) => {
	const { push, pathname, query } = useRouter()
	const isActive = matchValue && query[matchKey || ''] === matchValue

	return (
		<button
			className={classNames(className, {
				active: isActive,
				pending: !canSubmit,
			})}
			{...props}
			onClick={e => {
				onClick
					? onClick(e)
					: query[matchKey || ''] !== matchValue &&
					  push(
							{
								pathname,
								query: { ...query, [String(matchKey)]: matchValue },
							},
							undefined,
							{ shallow: true }
					  )
			}}
		>
			<div className={classNames(icon)}>
				{imgName && (
					<Img
						alt={`img-${imgName}`}
						src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}/${imgName}`}
					/>
				)}

				<i className='icon icon-icon32px_check' />
				<div
					className={classNames({
						mask: !canSubmit,
					})}
				/>
			</div>
			<div className='bank'>
				<div>{label}</div>

				<div>{children}</div>
			</div>
		</button>
	)
}

export default DepositSubModuleButton
