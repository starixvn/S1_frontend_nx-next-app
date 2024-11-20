import styled from 'styled-components'

export const WrapperRegister = styled.div`
	max-width: 100rem;
	margin: 0 auto;
	padding: 4rem 2rem;
	.joinpop {
		.joinloginModule {
			display: flex;
			justify-content: center;
			gap: 2.4rem;
			.features {
				max-width: 45.2rem;
				border-radius: 20px;
				overflow: hidden;
				&-heading {
					background: ${({ theme }) => theme.desktop.footerBg};
					min-height: 5.2rem;
					padding: 0 1.6rem;
					display: flex;
					align-items: center;
					font-size: 1.4rem;
					gap: 1rem;
					.icon {
						&:before {
							font-size: 2.4rem;
						}
					}
				}
				&-body {
					background: ${({ theme }) => theme.desktop.registerBodyBg};
					padding: 1.6rem;
					height: 100%;
					.title-list {
						color: #ea6118;
						font-size: 1.7rem;
						font-weight: 700;
						line-height: normal;
						margin-bottom: 0.4rem;
					}
					.list {
						margin-bottom: 0.8rem;
						color: #939dc5;
					}
				}
			}
			.joinloginFunction {
				margin-left: 0;
				flex: 0 0 48.4rem;
				padding: 0 2rem;
				.heading-form {
					font-size: 2.5rem;
					font-weight: 700;
					line-height: normal;
					color: ${({ theme }) => theme.desktop.white};
					margin-bottom: 1.6rem;
				}
				.slogan-form {
					ont-size: 1.4rem;
					font-weight: 400;
					color: ${({ theme }) => theme.desktop.white};
					button {
						color: ${({ theme }) => theme.desktop.buttonSloganBg};
						font-size: 1.4rem;
						font-style: normal;
						font-weight: 700;
						margin-left: 0.5rem;
					}
				}
				.btnGroup {
					button {
						border-radius: 100px;
						min-height: 3.6rem;
						font-family: 'Anybody', sans-serif;
						font-size: 1.4rem;
						font-weight: 600;
						line-height: normal;
						color: ${({ theme }) => theme.desktop.white};
						&.btn-cancel {
							box-shadow: ${({ theme }) =>
								theme.desktop.registerCancelBtnShadow};
							background: ${({ theme }) => theme.desktop.registerCancelBtnBg};
							&:hover {
								background: ${({ theme }) =>
									theme.desktop.registerCancelBtnHover};
								box-shadow: none;
							}
						}
						&.btn-check {
							box-shadow: ${({ theme }) =>
								theme.desktop.registerSubmitBtnShadow};
							background: ${({ theme }) => theme.desktop.registerSubmitBtnBg};
							&:hover {
								background: ${({ theme }) =>
									theme.desktop.registerSubmitBtnHover};
								box-shadow: none;
							}
						}
					}
				}
				.inputModule {
					margin-top: 0;
					.tip {
						margin-top: 0.4rem;
						padding: 0;
						font-size: 1.2rem;
						font-weight: 400;
						line-height: normal;
						color: ${({ theme }) => theme.desktop.tipColor};
					}
					.inputBox-blue {
						min-height: 3.6rem;
						padding: 0 1.2rem;
						border-radius: 100px;
						background: ${({ theme }) => theme.desktop.registerInputBg};
						border: none;
						margin-top: 1.6rem;
						display: flex;
						align-items: center;
						position: relative;
						.icon {
							height: 2rem;
							width: 2rem;
							display: flex;
							align-items: center;
							justify-content: center;
							&:before {
								color: ${({ theme }) => theme.desktop.white};
								font-size: 1.8rem;
								margin: 0;
							}
						}
						input {
							color: ${({ theme }) => theme.desktop.registerInputColor};
							background: ${({ theme }) => theme.desktop.registerInputBg};
							padding-left: 1rem;
							font-family: 'Anybody', sans-serif;
							&::placeholder {
								color: ${({ theme }) =>
									theme.desktop.registerInputPlaceHolderColor};
							}
						}
						.dropdown {
							.btn {
								color: ${({ theme }) =>
									theme.desktop.registerInputPlaceHolderColor};
							}
						}
						&.error {
							border: 1px solid
								${({ theme }) => theme.desktop.inputBorderColorError};
						}
						&.error + .tip {
							color: ${({ theme }) => theme.desktop.tipColorError} !important;
						}
					}
					.inputBox-row {
						display: flex;
						gap: 1.6rem;
						.inputBox-blue {
							width: 50%;
						}
					}
				}
				.react-datepicker__day-name,
				.react-datepicker__day,
				.react-datepicker__time-name {
					width: 2.7rem;
					font-size: 1rem;
				}
				.dropdown {
					width: 100%;
					display: flex;
					align-items: center;
					flex-flow: wrap;
					.btn {
						width: 70%;
						text-align: left;
						margin-left: 0.8rem;
						&:after {
							content: '';
							width: 0;
							height: 0;
							border-style: solid;
							border-width: 5px 5px 0 5px;
							position: absolute;
							right: 15px;
							top: 15px;
							border-color: #5574a7 transparent transparent transparent;
						}
					}
					.dropdown-item {
						border-top: 1px solid
							${({ theme }) => theme.desktop.countryCurrentBorderColor};
						min-height: 4.2rem;
						cursor: pointer;
						display: flex;
						align-items: center;
						padding: 0 2.4rem;
						color: ${({ theme }) => theme.desktop.registerInputDropDownColor};
						font-size: 1.4rem;
						font-weight: 600;
						line-height: normal;
						&:first-child {
							border-top: none;
						}
						&:hover {
							color: ${({ theme }) =>
								theme.desktop.registerInputDropDownColorHover};
						}
					}
					.dropdown-container {
						box-shadow: ${({ theme }) =>
							theme.desktop.registerInputDropDownShadow};
						position: absolute;
						top: 40px;
						left: 0;
						border-radius: 20px;
						border-radius: 20px;
						background: ${({ theme }) => theme.desktop.countryOptionsItemBg};
						overflow: hidden;
						z-index: 1;
						.heading-search {
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 1.3rem 1.6rem;
							border-bottom: 1px solid
								${({ theme }) => theme.desktop.countryCurrentBorderColor};
							input {
								min-height: 3.6rem;
								border-radius: 100px;
							}
						}
						.dropdown-wrapper {
							overflow-x: hidden;
							max-height: 31.6rem;
							&::-webkit-scrollbar-track {
								background: transparent;
							}
							&::-webkit-scrollbar-thumb {
								border-radius: 15px;
							}
						}
					}
				}
			}
		}
	}
`
