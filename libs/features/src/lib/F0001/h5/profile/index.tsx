import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { Header } from '@nx-next-app/components/H0001'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { Info } from './Info'
import { InfoEdit } from './InfoEdit'
import { Address } from './Address'
import { AddressEdit } from './AddressEdit'
import { Verification } from './Verification'
import { LineBinding } from './LineBinding'

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
				<div className='btn-group'>
					<Link href={paths.changePassword.root} passHref>
						<a>{t('Label_General_ChangePassword')}</a>
					</Link>
				</div>
				{isInApp === false && <LineBinding />}
			</main>
		</>
	)
}

export default Profile
