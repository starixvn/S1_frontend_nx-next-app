import styled from 'styled-components'

export const WrapperFooterDock = styled.div`
	.footer {
		background: url(${({ theme }) => theme.assetUrl}/h5/img/themes/${process
				.env['NEXT_PUBLIC_THEME_TYPE']}/footer-bg.webp)
			no-repeat center/cover;
		height: 28vw;
		width: 100%;
		display: flex;
		position: fixed;
		bottom: 0;
		z-index: 3;
		&-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 0 0 21vw;
			justify-content: center;
			padding-bottom: 1vw;
			font-weight: 500;
			gap: 1vw;
			position: relative;
			.icon {
				&:before {
					font-size: 5.5vw;
					color: ${({ theme }) => theme.mobile.white};
				}
			}
		}
	}
	.footer-item.active :not(.plus) {
		display: flex;
		flex-direction: column;
		align-items: center;
		&:after {
			content: '';
			display: block;
			position: absolute;
			width: 100%;
			height: 0.8vw;
			background: ${({ theme }) => theme.mobile.hrefColorPrimary};
			bottom: 5vw;
			left: 0;
		}
	}
	.footer-item.active :not(.plus).footer-title {
		color: ${({ theme }) => theme.mobile.hrefColorPrimary};
	}

	.footer-item.active :not(.plus).icon {
		&:before {
			color: ${({ theme }) => theme.mobile.hrefColorPrimary};
		}
	}
	.footer-title {
		color: ${({ theme }) => theme.mobile.white};
		text-align: center;
		line-height: 3vw;
		margin: 1vw 0 0;
		white-space: nowrap;
		font-size: 3.1vw;
	}
	.footer .plus {
		position: relative;
		background: ${({ theme }) => theme.mobile.fotterPlusBg};
		box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.47);
		border-radius: 50px;
		height: 12vw;
		flex: 0 0 12vw;
		padding: 2vw;
		margin-top: 2.5vw;
	}
	.footer .plus img {
		width: 6vw;
	}
	.footer .plus:before {
		content: '';
		position: absolute;
		height: 1vw;
		width: 6.5vw;
		border-radius: 20px;
		background-color: #fff;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) rotate(-90deg);
		transition: ease-out 0.2s all;
	}
	.footer .plus:after {
		content: '';
		position: absolute;
		height: 1vw;
		width: 6.5vw;
		border-radius: 20px;
		background-color: #fff;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) rotate(180deg);
		transition: ease-out 0.2s all;
	}
	.footer .plus.active:before {
		transform: translate(-50%, -50%) rotate(135deg);
	}
	.footer .plus.active:after {
		transform: translate(-50%, -50%) rotate(225deg);
	}
	.footer .plus span {
		color: white;
		padding-bottom: 1vw;
	}
	.footer .plus.close img {
		transform: translate(-50%, -50%) rotate(-45deg);
		transition: ease-out 0.3s all;
	}
	.footer .livechat img {
		width: 7vw;
	}
	.footer .me::after {
		top: 9vw;
		right: 7vw;
		position: absolute;
		display: block;
		content: '';
		background: red;
		width: 2vw;
		height: 2vw;
		border-radius: 10px;
		transition: all 0.2s ease-in-out;
		animation: 1.5s ease 0s infinite normal none move;
	}
	.footer-popup {
		background: ${({ theme }) => theme.mobile.footerPopupBg};
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 10vw;
		left: 0;
		border-radius: 20px 20px 0px 0px;
		padding: 6vw 0 18vw 0;
		z-index: 2;
		position: fixed;
		transform: translateY(50vw);
		width: 100%;
		box-shadow: ${({ theme }) => theme.mobile.footerPopupBoxShaDown};
	}
	.footer-popup img {
		width: 8vw;
	}
	.footer-popup-item {
		flex: 0 0 25vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.footer-popup-title {
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
		font-weight: 500;
		margin-top: 1.5vw;
		font-size: 1.4rem;
	}
	.footer-popup-img {
		border-radius: 50px;
		width: 9vw;
		height: 9vw;
		display: flex;
		align-items: center;
		justify-content: center;
		.icon {
			&:before {
				font-size: 5.8vw;
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			}
		}
	}
	.footer-popup.active {
		transform: translateY(0);
		transition: 0.5s;
	}
`
