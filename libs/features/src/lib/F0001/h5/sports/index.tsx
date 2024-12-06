import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import LobbyPageBanner from '@nx-next-app/features/F0001/h5/lobby-game/LobbyPageBanner'
import { LobbyGamePage } from '@nx-next-app/features/F0001/h5/lobby-game/styles'
import SportGame from '@nx-next-app/features/F0001/h5/sport-game'
import SportList from '@nx-next-app/features/F0001/h5/sports/SportList'
import { MenuKeyEnum } from '@nx-next-app/types'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const Sports = () => {
	const { t } = useTranslation()

	const {
		query: { provider: queryProvider },
	} = useRouter()

	return queryProvider ? (
		<SportGame />
	) : (
		<LobbyGamePage>
			<Header>
				<Header.Tag
					title={t('Label_General_Sports') as string}
					back={`${paths.home.root}/?prevPageRecord=${MenuKeyEnum.Fishing}`}
				/>
			</Header>

			<LobbyPageBanner
				alt='Sports'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/sport-banner.webp`}
			/>
			<SportList />
		</LobbyGamePage>
	)
}

export default Sports
