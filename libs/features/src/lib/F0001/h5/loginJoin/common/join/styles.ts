import styled from 'styled-components'

export const WrapperJoinPage = styled.div`
	.infoModule {
		&.parts {
			display: flex;
			justify-content: space-between;
			gap: 0.8rem;
			.group-dropdown {
				width: 100%;
			}
		}
	}
	input {
		font-size: 3.1vw;
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
	}
	.phone {
		display: flex;
		align-items: center;
		.inputBox {
			width: auto;
		}
	}
	.logo {
		display: flex;
		justify-content: center;
	}
	.dropdown.btn > div {
		display: flex;
	}
	.dropdown .dropdown-item {
		padding: 2vw;
	}
	.flag:before {
		border: 1px solid #ccc;
		width: 16px;
		height: 16px;
	}
`

export const WrapperCongrats = styled.div`
	.congrats {
		text-align: center;
		color: #f77a00;
		margin: 4vw 0;
		position: relative;
		font-size: 3.4vw;
		font-weight: 400;
		color: #939dc5;
		text-align: center;
		p {
			font-weight: 700;
			color: #fff;
			margin-bottom: 1vw;
		}
	}
	.group-icon-check {
		width: 10.5vw;
		height: 10.5vw;
		overflow: hidden;
		border-radius: 100px;
		border: 6px solid rgba(1, 185, 1, 0.3);
		margin: 3vw auto;

		.icon {
			background: #01b901;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.Terms {
		text-align: center;
	}
`
