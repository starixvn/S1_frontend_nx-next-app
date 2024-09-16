import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useGlobalData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Address } from './Address'
import { AddressEdit } from './AddressEdit'
import { Info } from './Info'
import { InfoEdit } from './InfoEdit'
import { LineBinding } from './LineBinding'
import { Verification } from './Verification'

const Profile = () => {
	const { t } = useTranslation()

	const { isInApp } = useGlobalData()
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
						<a className='chang-btn secondary'>
							{t('Label_General_ChangePassword')}
						</a>
					</Link>
				</div>
				{!isInApp && <LineBinding />}
			</main>
		</>
	)
}

export default Profile
