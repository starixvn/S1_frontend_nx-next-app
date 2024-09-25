import { Img } from '@12b-h5/components/common'
import { useGlobalData } from '@nx-next-app/data-access'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { HTMLAttributes, ReactNode } from 'react'

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
	const { getPaymentUrl } = useGlobalData()

	const isActive = matchValue && query[matchKey || ''] === matchValue

	const fastIcon = icon.match('fast') ? 'fast' : ''
	return (
		<div>
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
						<Img alt={`img-${imgName}`} src={getPaymentUrl(`/${imgName}`)} />
					)}

					<i className='icon icon-icon32px_check' />
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
