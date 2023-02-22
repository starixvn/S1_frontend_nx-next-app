import { GetServerSideProps } from 'next'
import { authApiUrl, axiosWithSSRorSSG } from '@nx-next-app/api'
import { useAuth } from '@nx-next-app/hooks'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Index = (data: any) => {
	const { isSignIn } = useAuth()
	const { t } = useTranslation()

	return <div>{t('Label_Title')}</div>
}

export const getServerSideProps: GetServerSideProps = async context => {
	const { data } = await axiosWithSSRorSSG.post(authApiUrl.checkSignIn)

	return {
		props: {
			data,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default Index
