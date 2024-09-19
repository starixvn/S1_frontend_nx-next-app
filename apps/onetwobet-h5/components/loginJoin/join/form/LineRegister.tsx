import {
	LineLoginDirectTypeEnum,
	useLazyGetLineLoginDirectUrlQuery,
} from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'

const LineRegister = () => {
	const { t } = useTranslation()

	const [getLineLoginDirectUrl] = useLazyGetLineLoginDirectUrlQuery()

	const handleLineRegister = async () => {
		try {
			const { data: lineLoginDirectUrl } = await getLineLoginDirectUrl({
				type: LineLoginDirectTypeEnum.Register,
			}).unwrap()

			if (lineLoginDirectUrl) {
				window.location.href = lineLoginDirectUrl
			}
		} catch (error) {
			// error
		}
	}

	return (
		<div className='register-line'>
			{t('Label_Join_RegisterWithLine')} ID
			<div className='btn-group'>
				<button className='btn-line' type='button' onClick={handleLineRegister}>
					<i className='icon icon-line-bold' />
					{t('Label_Join_RegisterWithLine')}
				</button>
			</div>
		</div>
	)
}

export { LineRegister }
