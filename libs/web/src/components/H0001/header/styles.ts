import styled from 'styled-components'

export const HeaderContainer = styled.div`
	width: 100%;
	position: sticky;
	top: 0;
	background: ${({ theme }) => theme.mobile.headerBg};
	flex-flow: wrap;
	display: flex;
	align-items: center;
	padding: 0;
	z-index: 9;
	justify-content: space-between;

	.btn-groups {
		display: flex;
	}

	.header-login {
		display: flex;
		gap: 2vw;
		margin-right: 1.5vw;
	}

	.icon-hamburger {
		font-size: 7.8vw;
	}

	.header-module {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 2vw 0;
		justify-content: space-between;

		.header-logo {
			position: relative;
			img {
				display: block;
				width: 25vw;
				margin-left: 3vw;
			}
		}
		.btn-menu {
			margin: 1vw 2.5vw 0 0;
			img {
				width: 6vw;
			}
		}
	}

	.header-info {
		display: flex;
		flex-direction: column;
		margin-right: 3.89vw;

		.user-info {
			color: ${({ theme }) => theme.mobile.txtThemeColor};
			font-size: 2.91vw;
			font-weight: 600;
		}

		.member-id {
			color: ${({ theme }) => theme.mobile.txtThemeColor};
		}
	}

	.header-balance {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		gap: 0.97vw;
		color: #fff;
		font-size: 3.39vw;
		font-weight: 700;

		.icon {
			font-size: 4.85vw;
		}

		.icon-plus_circle,
		.icon-minus_circle {
			position: relative;
			top: 1px;
		}

		.group-icons {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			gap: 0.97vw;
		}
	}

	button.clickBtn {
		display: flex;
		width: 5vw;
		height: 5vw;
		padding: 0;
		margin: 0 0 0 2.5vw;
		&::before {
			transform: scale(0.75);
		}
	}

	.title {
		width: 100%;
		height: 15.05vw;
		border-bottom: 1px solid ${({ theme }) => theme.mobile.headerTitleBorder};
		background: ${({ theme }) => theme.mobile.headerTitleBg};
		display: flex;
		align-items: center;
		font-size: 4.26vw;
		font-weight: 700;
		padding-left: 14vw;

		.icon-back {
			font-size: 8.25vw;
		}

		a {
			position: absolute;
			left: 1.88vw;
			width: 12vw;
			height: 100%;
			display: flex;
			flex-flow: column;
			align-items: center;
			justify-content: center;
			z-index: 1;
		}

		&.searchBar {
			position: relative;

			.icon-search {
				position: absolute;
				right: 3.88vw;
				top: 50%;
				transform: translateY(-50%);
				font-size: 4.85vw;
			}

			.infoModule {
				position: absolute;
				right: 3vw;
				top: 3.4vw;
				width: 0;
				opacity: 0;

				.inputBox {
					display: flex;
					align-items: center;
					border-radius: 24.27vw;
					border: none;
					height: 8.73vw;
					background: ${({ theme }) => theme.mobile.headerInputBg};
					padding: 0;
					input {
						padding: 0;
						height: 6vw;
						color: #fff;

						&::placeholder {
							color: ${({ theme }) => theme.mobile.headerInputPlaceHolderColor};
							text-align: left;
						}
					}
				}
				.icon-close-line {
					position: revert;
					display: none;
				}
				&.active {
					transition: 0.3s;
					width: 83.5vw;
					opacity: 1;
					.inputBox {
						padding: 0 2.9vw;
					}
					.icon-close-line {
						display: block;
					}
				}
			}
		}
	}
`
