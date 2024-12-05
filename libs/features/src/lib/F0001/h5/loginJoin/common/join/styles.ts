import styled from 'styled-components'

export const WrapperJoinPage = styled.div`
	.group-dropdown {
		.inputBox {
			display: flex;
			align-items: center;
			width: 100%;
			.dropdown {
				width: 100%;
				.text {
					width: 100%;
					display: block;
				}
				&-item {
					min-height: unset;
					font-size: 3.1vw;
				}
				&-container {
					max-height: 20rem;
					overflow-y: auto;
					border-radius: 0 0 20px 20px;
				}
			}
		}
	}
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
		font-size: 4vw;
		margin: 10vw 0;
		position: relative;
	}
	.congrats::before {
		content: '\\e996';
		font-family: 'icomoon';
		font-size: 20vw;
		color: #5574a7;
		margin: 5vw;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
	}
	.congrats > p {
		font-size: 5vw;
		color: #5574a7;
		font-weight: bold;
		margin: 2vw;
	}
	.congrats::after {
		position: absolute;
		width: 50vw;
		height: 48vw;
		content: '';
		background: url(https://minio-api.lumigame.com/s1-nova88/h5/img/spread.png)
			no-repeat;
		background-size: 100%;
		top: -5vw;
		left: 20vw;
		-webkit-animation: fire1 2.8s 3s infinite;
		animation: fire1 2.8s 3s infinite;
	}
`
