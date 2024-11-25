import {
	NoGameIconWrapper,
	SpinnerBox,
} from '@nx-next-app/features/F0001/desktop/home/gameIcon/styles'

export const NoGameIcon: React.FC = () => {
	return (
		<NoGameIconWrapper>
			<span className='icon icon-no-image' />
		</NoGameIconWrapper>
	)
}

export const LoadingIcon: React.FC = () => {
	return (
		<SpinnerBox>
			<span className='icon icon-loading' />
		</SpinnerBox>
	)
}
