import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import { Header } from '@nx-next-app/components/H0006'
import { Info } from './Info'
import { InfoEdit } from './InfoEdit'
import { Address } from './Address'
import { AddressEdit } from './AddressEdit'
import { Verification } from './Verification'
import { LineBinding } from './LineBinding'

const Profile = () => {
	const { t } = useTranslation()
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
				<LineBinding />
			</main>
		</>
	)
}

export default Profile
