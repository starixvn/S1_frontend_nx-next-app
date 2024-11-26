import { Header } from '@nx-next-app/components/D0001'
import { useLanguageGroup } from '@nx-next-app/hooks'
import classNames from 'classnames'
import { useRef } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

const Country = () => {
	const { icon, languageGroup, onSetLanguage } = useLanguageGroup(['cs'])
	const ref = useRef(null)
	const { value: isActive, toggle, setFalse } = useBoolean(false)

	useOnClickOutside(ref, setFalse)

	return (
		<div ref={ref} className={classNames('country', { active: isActive })}>
			<Header.Function.Country
				icon={icon}
				toggle={toggle}
				isActive={isActive}
				langGroup={languageGroup}
				onSetLanguage={onSetLanguage}
			/>
		</div>
	)
}

export default Country
