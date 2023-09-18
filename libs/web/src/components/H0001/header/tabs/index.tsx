import classNames from 'classnames'
import React, { useState } from 'react'
import { head, includes, isUndefined } from 'lodash-es'
import Link from 'next/link'
import { useRouter } from 'next/router'

type TagOptionType = {
	key: string | number
	label: string
}

interface ITagProps {
	title?: string
	back?: string
	activeQuickSelect?: string | number
	quickSelect?: TagOptionType[]
	onQuickSelectChange?: (key: string | number) => void
	searchText?: string
	isShowSearchInput?: boolean
	setIsShowSearchInput?: () => void
	onInputClose?: () => void
	onSearchBarChange?: (searchText: string) => void
}

interface ITagsProps extends React.HTMLAttributes<HTMLDivElement> {
	tags: {
		href: string
		label: string
		isShow?: boolean
		active?: boolean
		subPaths?: string[]
	}[]
	className?: string
}

const Tag = ({
	title,
	back,
	activeQuickSelect,
	quickSelect,
	onQuickSelectChange,
	searchText,
	isShowSearchInput,
	setIsShowSearchInput,
	onInputClose,
	onSearchBarChange,
}: ITagProps) => {
	const { push } = useRouter()
	const [quickSelectValue, setQuickSelectValue] = useState(
		head(quickSelect)?.key
	)

	return (
		<>
			{!!title && (
				<div
					className={classNames('title', {
						searchBar: !!onSearchBarChange,
					})}
				>
					{back && (
						<a onClick={() => push(back)}>
							<i className='icon icon-keyboard_arrow_left' />
						</a>
					)}
					{title}
					{onSearchBarChange && (
						<>
							<i className='icon icon-search' onClick={setIsShowSearchInput} />
							<div
								className={classNames('infoModule', {
									active: isShowSearchInput,
								})}
							>
								<div className='inputBox'>
									<input
										placeholder='Search'
										value={searchText}
										onChange={e => onSearchBarChange(e.target.value)}
									/>
									<i className='icon icon-close' onClick={onInputClose} />
								</div>
							</div>
						</>
					)}
				</div>
			)}

			{quickSelect && (
				<div className='quickSelect'>
					{quickSelect.map(({ key, label }) => {
						return (
							<button
								key={key}
								className={classNames({
									active: activeQuickSelect === key || quickSelectValue === key,
								})}
								value={key}
								onClick={() => {
									if (!activeQuickSelect) {
										// * 觸發 uncontrolled component 元件邏輯
										setQuickSelectValue(key)
									}

									if (onQuickSelectChange) {
										onQuickSelectChange(key)
									}
								}}
							>
								{label}
							</button>
						)
					})}
				</div>
			)}
		</>
	)
}

const Tags = ({ tags = [], className = 'headerTag', ...props }: ITagsProps) => {
	const { pathname } = useRouter()

	return (
		<div className={className} {...props}>
			{tags.map(({ href, label, isShow = true, active, subPaths }) => {
				return (
					isShow && (
						<Link key={label} href={href}>
							<a
								className={classNames({
									active: isUndefined(active)
										? pathname.match(href) ||
										  includes(subPaths, pathname.split('/')[1])
										: active,
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

export { Tags, Tag }
export type { TagOptionType }
