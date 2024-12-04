import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { WrapperParentProfileH5 } from '@nx-next-app/features/F0001/h5/profile/styles'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
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
				<WrapperParentProfileH5>
					<AddressEdit />
					<InfoEdit />
					<Info />
					<Address />

					<div className='group-btn-line'>
						<div className='btnGroup'>
							<Link href={paths.changePassword.root} passHref>
								<a className='btn-secondary'>
									<i className='icon icon-lock-2-fill' />
									{t('Label_General_ChangePassword')}
								</a>
							</Link>
						</div>
						{isInApp === false && <LineBinding />}
					</div>
				</WrapperParentProfileH5>
			</main>
		</>
	)
}

export default Profile
