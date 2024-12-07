import { LoadingContainer } from '@nx-next-app/components/H0001/loading/styles'
import { useTranslation } from 'next-i18next'

const Loading = () => {
	const { t } = useTranslation()
	return (
		<LoadingContainer id='Loading' className='active'>
			<div className='container'>
				<div className='cube'>
					<div className='sides'>
						<div className='top' />
						<div className='right' />
						<div className='bottom' />
						<div className='left' />
						<div className='front' />
						<div className='back' />
					</div>
				</div>
				<h1> </h1>
				<div className='text'>{t('Label_General_Loading')}...</div>
			</div>
		</LoadingContainer>
	)
}

export default Loading
