import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Address } from './Address'
import { AddressEdit } from './AddressEdit'
import { Info } from './Info'
import { InfoEdit } from './InfoEdit'
import { LineBinding } from './LineBinding'
import { Verification } from './Verification'

const Profile = () => {
	const { t } = useTranslation()
	const { push } = useRouter()

	const {
		auth: { isLogin },
	} = useAuth()

	const { isInApp } = useGlobalData()

	useEffect(() => {
		if (!isLogin) push(paths.home.root)
	}, [])

	return (
		<>
			<Header className='header'>
				<Header.Tags
					tags={[
						{ href: paths.profile.root, label: t('Label_General_Profile') },
						{ href: paths.message.root, label: t('Label_General_Message') },
					]}
				/>
			</Header>
			<main className='main'>
				<Verification />
				<AddressEdit />
				<InfoEdit />
				<Info />
				<Address />
				{isInApp === false && <LineBinding />}
			</main>
		</>
	)
}

export default Profile
