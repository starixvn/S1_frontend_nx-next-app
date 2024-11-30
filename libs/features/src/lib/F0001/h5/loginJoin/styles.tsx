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
	.features {
		background: ${({ theme }) => theme.mobile.rightModuleBg};
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
		border-radius: 20px;
		float: left;
		font-size: 1.4rem;
		padding: 0 0 1.6rem;
		width: 100%;
		overflow: hidden;
	}
	.features div,
	.features ul {
		padding: 1.6rem 1.6rem 0;
	}
	.features .title {
		text-align: left;
		color: ${({ theme }) => theme.mobile.hrefColorPrimary};
		margin: 0;
		font-size: 1.7rem;
	}
	.features .title:nth-child(1) {
		background: ${({ theme }) => theme.mobile.rightModuleTitleBg};
		color: white;
		font-size: 4vw;
		padding: 1.4rem 1.6rem;
	}
	.features .title span:before {
		font-size: 4vw;
		margin-right: 2vw;
	}
	.features li {
		list-style: disc;
		line-height: 2rem;
		margin-left: 3vw;
	}
	.features li span,
	.features li a {
		font-weight: bold;
	}
`
