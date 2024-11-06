import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useGlobalData } from '@nx-next-app/data-access'

interface IDepositLinePayModalProps {
	link?: string
}

const DepositLinePayModal = ({ link }: IDepositLinePayModalProps) => {
	const { closeModal } = useGlobalModal()
	const { getBannerUrl } = useGlobalData()
	return (
		<div className='linepop'>
			<i className='icon icon-close' onClick={closeModal} />
			<a href={link} target='_blank' rel='noreferrer'>
				<img
					// * 目前只有 en 版本
					src={getBannerUrl('/desktop/img/line/line-en.jpg')}
					alt='line'
				/>
			</a>
		</div>
	)
}

export default DepositLinePayModal
