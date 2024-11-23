import { Loading, NoGameIconWrapper, SpinnerBox } from "@nx-next-app/features/F0001/desktop/home/gameIcon/styles";

export const NoGameIcon: React.FC = () => {
	return (
		<NoGameIconWrapper>
			<span className='icon icon-file-text-fill' />
		</NoGameIconWrapper>
	)
}

export const LoadingIcon: React.FC = () => {
	return (
		<SpinnerBox>
			<Loading />
		</SpinnerBox>
	)
}
