import styled from 'styled-components'

export const WrapperProfileAfterLogin = styled.div`
	display: flex;
	gap: 1.6rem;
	align-items: flex-start;
	.verification-user {
		flex: 0 0 25rem;
		border-radius: 20px;
		background: ${({ theme }) => theme.desktop.leftMenuHeaderBgAfterLogin};
		padding: 2rem 1.6rem;
	}
	.info-user {
		width: 100%;
		&-slogan {
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			font-size: 1.4rem;
			font-weight: 400;
			line-height: 1.8rem;
			padding-bottom: 1.6rem;
			margin-bottom: 1.6rem;
			border-bottom: 1px solid
				${({ theme }) => theme.desktop.rightModuleBorderColor};
			width: 100%;
		}
	}
`
