import { useBankInfo } from '@nx-next-app/features/F0006/providers'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'

const AddCardPanel = () => {
	const { step } = useBankInfo()

	return (
		<>
			{step === 1 && <Step1 />}
			{step === 2 && <Step2 />}
			{step === 3 && <Step3 />}
		</>
	)
}

export { AddCardPanel }
