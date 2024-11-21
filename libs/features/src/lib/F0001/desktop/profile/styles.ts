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
	}
`
