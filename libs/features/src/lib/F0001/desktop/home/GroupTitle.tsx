import { GroupTitleContainer } from '@nx-next-app/features/F0001/desktop/home/styles'
import Link from 'next/link'

type IGroupTitle = {
	title: string
	href?: string
}

const GroupTitle: React.FC<IGroupTitle> = ({ title, href }: IGroupTitle) => {
	return (
		<GroupTitleContainer>
			{title}
			{href && (
				<Link href={href} passHref>
					<a className='load-more'>
						All <span className='icon icon-arrow-right-line' />
					</a>
				</Link>
			)}
		</GroupTitleContainer>
	)
}

export default GroupTitle
