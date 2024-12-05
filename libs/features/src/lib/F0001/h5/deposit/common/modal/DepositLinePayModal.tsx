import { useGlobalModal } from '@nx-next-app/components/config-provider'

interface IDepositLinePayModalProps {
	link?: string
}

const DepositLinePayModal = ({ link }: IDepositLinePayModalProps) => {
	const { closeModal } = useGlobalModal()
	return (
		<div className='linepop'>
			<i className='close-popup icon icon-close-line' onClick={closeModal} />
			<a href={link} target='_blank' rel='noreferrer'>
				<img
					// * 目前只有 en 版本
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/line/line-en.jpg`}
					alt=''
				/>
			</a>
		</div>
	)
}

export default DepositLinePayModal
