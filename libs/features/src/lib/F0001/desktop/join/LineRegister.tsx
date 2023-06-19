import { useTranslation } from 'next-i18next'
import {
	LineLoginDirectTypeEnum,
	useLazyGetLineLoginDirectUrlQuery,
} from '@nx-next-app/service'

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
		<>
			<div className='register-line'>
				{t('Label_Join_RegisterWithLine')} ID
				<div className='btnGroup'>
					<button
						className='btn-line'
						type='button'
						onClick={handleLineRegister}
					>
						<i className='icon icon-line-bold' />
						{t('Label_Join_RegisterWithLine')}
					</button>
				</div>
			</div>
			<div>
				<span>OR</span>
			</div>
		</>
	)
}

export default LineRegister
