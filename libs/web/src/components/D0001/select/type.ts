import { ReactNode } from 'react'

export type SelectOptionType = {
	className?: string
	value: string | number | undefined
	label: string | number | null | ReactNode
	disabled?: boolean
	prefixOptionIcon?: ReactNode
}
