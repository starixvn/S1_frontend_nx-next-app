import { GroupTitleContainer } from "@nx-next-app/features/F0001/desktop/home/styles";
import { useTranslation } from "next-i18next";
import Link from "next/link";

type IGroupTitle = {
	title: string
	href?: string
}

const GroupTitle: React.FC<IGroupTitle> = ({ title, href }: IGroupTitle) => {
	const { t } = useTranslation()

	return (
		<GroupTitleContainer>
			{title}
			{href && (
				<Link href={href} passHref>
					<a className='load-more'>
						{t('Label_General_All')}
						<span className='icon icon-arrow-right-line' />
					</a>
				</Link>
			)}
		</GroupTitleContainer>
	)
}

export default GroupTitle
