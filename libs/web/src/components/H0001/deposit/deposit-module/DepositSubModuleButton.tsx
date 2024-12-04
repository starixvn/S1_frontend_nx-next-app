import classNames from 'classnames'
import { useRouter } from 'next/router'
import { HTMLAttributes, ReactNode } from 'react'
import { Img } from '../../image'

interface IDepositSubModuleButtonProps extends HTMLAttributes<HTMLDivElement> {
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

	const fastIcon = icon.match('fast') ? 'fast' : ''
	return (
		<div className='block-grid'>
			<div
				className={classNames(className, fastIcon, 'bankName', {
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
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/paymentlogo/${imgName}`}
						/>
					)}

					<div className='check'>
						<i className='icon icon-check' />
					</div>
					<div
						className={classNames({
							mask: !canSubmit,
						})}
					/>
				</div>
			</div>

			<div className='subtitle'>{label}</div>
			<div className='subinfo'>{children}</div>
		</div>
	)
}

export default DepositSubModuleButton
