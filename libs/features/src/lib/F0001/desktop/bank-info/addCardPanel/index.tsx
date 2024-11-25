import { WrapperCardAddBank } from '@nx-next-app/features/F0001/desktop/withdrawal/common/walletPanel/styles'
import { useBankInfo } from '@nx-next-app/features/F0001/providers'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'

const AddCardPanel = () => {
	const { step } = useBankInfo()

	return (
		<WrapperCardAddBank>
			<div className='group'>
				{step === 1 && <Step1 />}
				{step === 2 && <Step2 />}
				{step === 3 && <Step3 />}
			</div>
		</WrapperCardAddBank>
	)
}

export { AddCardPanel }
