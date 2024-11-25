import { Header } from '@nx-next-app/components/D0006'
import { useLanguageGroup } from '@nx-next-app/hooks'

const Country = () => {
	const { icon, languageGroup, onSetLanguage } = useLanguageGroup()

	return (
		<Header.Function.Country
			icon={icon}
			langGroup={languageGroup}
			onSetLanguage={onSetLanguage}
		/>
	)
}

export default Country
