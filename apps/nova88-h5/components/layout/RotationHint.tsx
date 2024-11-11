import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useEventListener } from 'usehooks-ts'

const RotationHint = () => {
	const [rotateClass, setRotateClass] = useState<string>('')
	const { t } = useTranslation()
	const rotationChange = () => {
		switch (window.orientation) {
			case 0:
				return ''
			case -90:
				return 'in right'
			case 90:
				return 'in'
			case 180:
				return ''
			default:
				return ''
		}
	}

	const onRotate = () => {
		const rotateClass = rotationChange()
		setRotateClass(rotateClass)
	}

	useEventListener('orientationchange', onRotate)

	return (
		<div className={classNames('Straight-lock', rotateClass)}>
			<div className='icon icon-mobile img-rotate'>
				<i className='icon icon-spinner11' />
			</div>
			<div className='text'>
				{t('Label_General_RotationHint1')}
				<br />
				{t('Label_General_RotationHint2')}
				<br />
				<span className='text-org'>{t('Label_General_RotationHint3')}</span>
				<br />
				{t('Label_General_RotationHint4')}
			</div>
		</div>
	)
}

export default RotationHint
