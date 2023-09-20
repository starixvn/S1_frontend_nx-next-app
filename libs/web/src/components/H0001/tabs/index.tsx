import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'

interface ITabsHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	tabsHeaderItem: { tabPath: string; label: string; isShow?: boolean }[]
	currentPath: string
	className?: 'headerTag'
}

interface ITabsTagProps extends React.HTMLAttributes<HTMLDivElement> {
	tabsTagItem: { tabPath: string; label: string; isShow?: boolean }[]
	currentPath: string
	className?: 'tag'
}

const TabsHeaderTag = ({
	tabsHeaderItem = [],
	currentPath,
	className = 'headerTag',
	...props
}: ITabsHeaderProps) => {
	return (
		<div className={className} {...props}>
			{tabsHeaderItem.map(({ tabPath, label, isShow = true }) => {
				return (
					isShow && (
						<Link href={tabPath}>
							<a
								className={classNames({
									active: currentPath.split('/')[1] === tabPath,
								})}
							>
								{label}
							</a>
						</Link>
					)
				)
			})}
		</div>
	)
}

const TabsTag = ({
	tabsTagItem = [],
	currentPath,
	className = 'tag',
	...props
}: ITabsTagProps) => {
	return (
		<div className={className} {...props}>
			{tabsTagItem.map(({ tabPath, label, isShow = true }) => {
				return (
					isShow && (
						<Link href={tabPath}>
							<a
								className={classNames({
									active: currentPath.split('/')[1] === tabPath,
								})}
							>
								{label}
							</a>
						</Link>
					)
				)
			})}
		</div>
	)
}

export { TabsHeaderTag, TabsTag }
