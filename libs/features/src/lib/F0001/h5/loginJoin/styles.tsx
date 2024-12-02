import styled from 'styled-components'

export const WrapperLoginRegister = styled.div`
	.Login {
		height: 0;
		visibility: hidden;
		opacity: 0;
		transition: 0.7s;
		&.active {
			visibility: visible;
			opacity: 1;
			transition: 0.7s;
			height: auto;
		}
		.Terms {
			margin: 1.6rem 0;
			a {
				font-size: 1.4rem;
				font-style: normal;
				font-weight: 400;
				line-height: 1.8rem;
				text-decoration: none;
				color: ${({ theme }) => theme.mobile.white};
				display: block;
				text-align: center;
			}
		}
	}
	.inputInfo {
		background: ${({ theme }) => theme.mobile.tooltipBgColor};
		border: 1px solid ${({ theme }) => theme.mobile.tooltipBorderColor};
		color: ${({ theme }) => theme.mobile.tooltipColor};
		margin-top: 3vw;
		&:before {
			border-color: ${({ theme }) => theme.mobile.tooltipColor} transparent
				transparent;
			bottom: -2vw;
		}
	}
`
