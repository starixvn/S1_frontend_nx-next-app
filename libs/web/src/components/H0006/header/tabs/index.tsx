import classNames from 'classnames'
import React, { forwardRef, useState } from 'react'
import { head, includes, isUndefined } from 'lodash-es'
import Link from 'next/link'
import { useRouter } from 'next/router'

type TagOptionType = {
	key: string | number
	label: string
}

interface ITagProps {
	title?: string
	back?: string | boolean
	activeQuickSelect?: string | number
	quickSelect?: TagOptionType[]
	onQuickSelectChange?: (key: string | number) => void
	searchText?: string
	isShowSearchInput?: boolean
	setIsShowSearchInput?: () => void
	onInputClose?: () => void
	onSearchBarChange?: (searchText: string) => void
	onTabsScroll?: () => void
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

// * 這裡用 forwardRef 是因為 withdrawal history 需用到 ScrollToView 功能
// * 如果之後 tabs 一多也可以帶上 onTabsScroll & ref
const Tag = forwardRef(
	(
		{
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
			onTabsScroll,
		}: ITagProps,
		ref
	) => {
		const router = useRouter()
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
							<a
								role='link'
								aria-hidden
								onClick={() => {
									if (typeof back === 'boolean') {
										router.back()
									} else if (typeof back === 'string') {
										router.push(back)
									}
								}}
							>
								<i className='icon icon-keyboard_arrow_left' />
							</a>
						)}
						{title}
						{onSearchBarChange && (
							<>
								<i
									className='icon icon-search'
									onClick={setIsShowSearchInput}
								/>
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
					<div
						className='quickSelect'
						ref={ref as React.MutableRefObject<null | HTMLDivElement>}
					>
						{quickSelect.map(({ key, label }) => {
							return (
								<button
									key={key}
									className={classNames({
										active:
											activeQuickSelect === key || quickSelectValue === key,
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
						{!!onTabsScroll && (
							<i
								className='icon icon-keyboard_arrow_right'
								onClick={onTabsScroll}
							/>
						)}
					</div>
				)}
			</>
		)
	}
)

const Tags = ({ tags = [], className = 'headerTag', ...props }: ITagsProps) => {
	const { pathname } = useRouter()

	return (
		<div className={className} {...props}>
			{tags.map(({ href, label, isShow = true, active, subPaths }) => {
				return (
					isShow && (
						<Link key={label} href={href} passHref>
							<a
								className={classNames({
									active: isUndefined(active)
										? pathname === href || includes(subPaths, pathname)
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
