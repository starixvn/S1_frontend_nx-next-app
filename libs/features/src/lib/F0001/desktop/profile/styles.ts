import styled from 'styled-components'

export const WrapperProfileAfterLogin = styled.div`
	display: flex;
	gap: 1.6rem;
	align-items: flex-start;
	.verification-user {
		border-radius: 20px;
		background: ${({ theme }) => theme.desktop.leftMenuHeaderBgAfterLogin};
		padding: 2rem 1.6rem;
		flex: 0 0 21.8rem;
		> div.vipLv {
			margin: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-flow: column;
			.vipbg {
				img {
					width: 10rem;
					height: 8.4rem;
				}
			}
			.vipname {
				padding: 0.5rem 1.2rem;
				margin-top: 0.8rem;
				background: ${({ theme }) => theme.desktop.vipBg};
				border-radius: 100px;
				color: ${({ theme }) => theme.desktop.white};
			}
			.accountSafety {
				font-size: 1.2rem;
				font-weight: 400;
				line-height: 2rem;
				margin-top: 1.6rem;
				margin-bottom: 0.8rem;
				display: flex;
				gap: 0.2rem;
				> div {
					&:first-child {
						color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
					}
				}
			}
			.safetyLv {
				display: flex;
				gap: 0.8rem;
				span {
					width: 2.8rem;
					height: 0.6rem;
					background: #cacaca;
					border-radius: 50px;
					&:nth-child(1) {
						&.active {
							background: #ffe518;
						}
					}
					&:nth-child(2) {
						&.active {
							background: #7fca3a;
						}
					}
					&:nth-child(3) {
						&.active {
							background: #39b248;
						}
					}
				}
			}
			.userVerification {
				> div {
					&:first-child {
						font-size: 1.2rem;
						font-weight: 400;
						line-height: 2rem;
						margin: 0.8rem 0;
						text-align: center;
						color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
					}
					&:last-child {
						display: flex;
						align-items: center;
						position: relative;
						cursor: pointer;
						gap: 0.8rem;
						> div {
							width: 3.6rem;
							color: ${({ theme }) => theme.desktop.white};
							height: 3.6rem;
							background: ${({ theme }) =>
								theme.desktop.userVertificationDefaultBgIcon};
							border-radius: 100px;
							display: flex;
							align-items: center;
							justify-content: center;
							position: relative;
							&.icon {
								&:before {
									color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
									font-size: 2rem;
								}
							}
							&:after {
								content: '＄';
								background: #ffd21d;
								position: absolute;
								bottom: -2px;
								border-radius: 100%;
								width: 1.5rem;
								height: 1.5rem;
								display: flex;
								align-items: center;
								justify-content: center;
								right: 0;
								font-size: 1rem;
							}
							&.active {
								background: ${({ theme }) =>
									theme.desktop.userVertificationActiveBgIcon};
								&:before {
									color: ${({ theme }) => theme.desktop.white};
								}
								&:after {
									font-family: 'S1NewIcons';
									content: '\\e91a';
									background: #01b901;
								}
							}
							&:hover {
								.description {
									display: block;
								}
							}
						}
					}
				}
			}
			.txt-line {
				margin-top: 1.6rem;
				color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
			}
			.btn-line {
				background: ${({ theme }) => theme.desktop.headerLineLoginBtnBg};
				color: ${({ theme }) => theme.desktop.white};
				box-shadow: ${({ theme }) => theme.desktop.headerLineLoginBtnShadow};
				padding: 0.6rem 0.8rem;
				display: flex;
				align-items: center;
				gap: 0.5rem;
				&:hover {
					background: ${({ theme }) => theme.desktop.headerLineLoginBgHover};
					box-shadow: none;
				}
				img {
					width: 2.4rem;
					height: 2.4rem;
				}
			}
		}
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
		}
		.btnGroup {
			max-width: 10rem;
		}
		input {
			min-height: 3.6rem;
			padding-left: 0;
			padding: 0 1.2rem;
			border-radius: 100px;
			width: 100%;
		}
	}
	.group-control {
		display: flex;
		gap: 0.8rem;
		align-items: flex-start;
		margin-bottom: 1.4rem;
		font-size: 1.4rem;
		font-weight: 400;
		line-height: 1.8rem;
		.group-input {
			.iconModule {
				position: absolute;
				right: 8px;
				top: 8px;
				.icon {
					&:before {
						font-size: 1.8rem;
					}
				}
			}
		}
		.label-name {
			min-width: 15rem;
			color: ${({ theme }) => theme.desktop.labelColor};
		}
		.group-input {
			color: ${({ theme }) => theme.desktop.white};
			display: flex;
			align-items: flex-start;
			gap: 0.8rem;
			position: relative;
			&.have-input {
				flex-direction: column;
				min-width: 49rem;
			}
			.btnGroup {
				max-width: 100%;
				margin-top: 0;
				button {
					padding: 0 1rem;
					min-height: 2.8rem;
				}
			}
		}
	}
	.inputBox-blue {
		margin-top: 0;
		width: 100%;
	}
	.addressModule {
		padding-top: 1.6rem;
		border-top: 1px solid ${({ theme }) => theme.desktop.rightModuleBorderColor};
		.address-title {
			span,
			div {
				display: block;
				font-size: 1.4rem;
				font-weight: 700;
				line-height: normal;
				text-transform: uppercase;
				margin-bottom: 1.7rem;
			}
			div {
				font-weight: 400;
				text-transform: inherit;
			}
		}
		.address-list {
			.group-control {
				align-items: flex-start;
				.group-input {
					flex-direction: column;
					align-items: flex-start;
					min-width: 49.2rem;
				}
			}
			.icon {
				&:before {
					font-size: 2rem;
				}
			}
			.line-relative {
				position: relative;
				width: 100%;
				.inputBox-blue {
					background: ${({ theme }) => theme.desktop.inputBg};
					border-radius: 100px;
					min-height: 3.6rem;
					display: flex;
					align-items: center;
					padding: 0 1.2rem;
					input {
						min-height: 3.6rem;
						width: calc(100% - 5.5rem);
						padding: 0;
						border-radius: 0;
						margin-left: auto;
					}
				}
				.line-info {
					position: absolute;
					top: 10px;
					left: 20px;
					color: #7883b4;
					z-index: 1;
				}
			}
			.icon {
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}
	.custom-dropdown {
		.inputBox-blue {
			margin-bottom: 0.8rem;
		}
	}
`
