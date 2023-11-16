import React, { useState } from 'react'
import { Header, TagOptionType } from '@nx-next-app/components/F0002'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'

const Basic = () => {
	const { t } = useTranslation()
	const [searchText, setSearchText] = useState()
	const [isShowSearchInput, setIsShowSearchInput] = useState<boolean>(false)

	const onSearch = () => {
		console.log('onSearch Fn')
	}

	const handleInputClose = () => {
		console.log('Close Search Bar')
	}

	const SOME_TABS = [{ id: 1, displayKey: 'Label_LeaderBoard_Event' }]

	const quickSelect: TagOptionType[] = SOME_TABS.map(({ id, displayKey }) => ({
		key: id,
		label: t(displayKey),
	}))

	const onTabsChange = (id: number) => {
		console.log('some logic to render tabs')
	}

	// * back & title & search ex:slot
	const Tabs1 = () => {
		return (
			<Header className='header'>
				<Header.Tag
					title={t('Label_General_Slots') as string}
					back={paths.home.root}
					onSearchBarChange={onSearch}
					searchText={searchText}
					isShowSearchInput={isShowSearchInput}
					setIsShowSearchInput={() => setIsShowSearchInput(true)}
					onInputClose={handleInputClose}
				/>
			</Header>
		)
	}

	// * back & title & quickSelect ex: leaderBoard
	const Tabs2 = () => {
		return (
			<Header className='header'>
				<Header.Tag
					title={t('Label_General_LeaderBoard') as string}
					back={paths.home.root}
					quickSelect={quickSelect}
					onQuickSelectChange={key => {
						onTabsChange(key as number)
					}}
				/>
			</Header>
		)
	}

	// * 只有文字的 tabs Link 以及可從外部給 active
	const Tabs3 = () => {
		const pathname = '/announcement'
		return (
			<Header className='header'>
				{/* 第一層  */}
				<Header.Tags
					tags={[
						{ href: paths.profile.root, label: t('Label_Profile') },
						{
							href: paths.message.root,
							label: t('Label_Message'),
							active: Boolean(pathname.match(paths.announcement.root)),
						},
					]}
				/>
				{/* 第二層  */}
				<Header.Tags
					className='tag'
					tags={[
						{
							href: paths.message.root,
							label: t('Label_Message_PersonalMsg'),
						},
						{
							href: paths.announcement.root,
							label: t('Label_Announcement'),
						},
					]}
				/>
			</Header>
		)
	}

	return Tabs1
}

export default Basic
