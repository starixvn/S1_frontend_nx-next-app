import { Header } from "@nx-next-app/components/H0001";
import { paths } from "@nx-next-app/constants";
import { useAuth } from "@nx-next-app/data-access";
import LobbyPageBanner from "@nx-next-app/features/F0001/h5/lobby-game/LobbyPageBanner";
import { LobbyGamePage } from "@nx-next-app/features/F0001/h5/lobby-game/styles";
import { MenuKeyEnum } from "@nx-next-app/types";
import { useTranslation } from "react-i18next";

import ESportList from "./ESportList";

const ESport = () => {
	const { t } = useTranslation()
	const { auth } = useAuth()

	return (
		<LobbyGamePage $isLogin={auth.isLogin}>
			<Header>
				<Header.Tag
					title={t('Label_General_ESports') as string}
					back={`${paths.home.root}/?prevPageRecord=${MenuKeyEnum.Fishing}`}
				/>
			</Header>
			<LobbyPageBanner
				alt='E-Sport'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/e-sport-banner.webp`}
			/>
			<ESportList />
		</LobbyGamePage>
	)
}

export default ESport
