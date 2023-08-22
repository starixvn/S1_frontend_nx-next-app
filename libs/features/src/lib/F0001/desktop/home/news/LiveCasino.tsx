import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import Image from 'next/future/image'
import { paths } from '@nx-next-app/constants'

const LiveCasino = () => {
	const { t } = useTranslation()
	return (
		<div className='liveTv'>
			<div className='moduleTitle'>{t('Label_General_LiveCasino')}</div>
			<div className='liveCasinoBox'>
				<div className='content'>
					<div className='title'>{t('Label_General_CasinoWithLive')}</div>
					<div className='info'>{t('Label_General_LiveCasinoInfo1')}</div>
					<div className='info'>{t('Label_General_LiveCasinoInfo2')}</div>
					<div className='info'>{t('Label_General_LiveCasinoInfo3')}</div>
					<Link href={paths.liveCasino.root}>
						<button>{t('Label_General_PlayNow')}</button>
					</Link>
				</div>
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/homepage/livecasinobg.jpg`}
					alt=''
					width={605}
					height={331}
				/>
			</div>
		</div>
	)
}

export { LiveCasino }
