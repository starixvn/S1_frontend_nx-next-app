import Image from 'next/future/image'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

interface IDepositLinePayModalProps {
	link?: string
}

const DepositLinePayModal = ({ link }: IDepositLinePayModalProps) => {
	const { closeModal } = useGlobalModal()

	return (
		<div className='linepop'>
			<i className='icon icon-close' onClick={closeModal} />
			<a href={link} target='_blank' rel='noreferrer'>
				<Image
					// * 目前只有 en 版本
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/line/line-en.jpg`}
					alt='line'
					width={1100}
					height={470}
				/>
			</a>
		</div>
	)
}

export default DepositLinePayModal
