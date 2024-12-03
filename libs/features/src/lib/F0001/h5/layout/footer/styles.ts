import styled from 'styled-components'

export const WrapperFooterDock = styled.div`
	.footer {
		background: url('https://s1-static.nexdev.net/h5/img/new-ui/footer-bg.webp')
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
			.icon {
				&:before {
					font-size: 6.1vw;
					color: ${({ theme }) => theme.mobile.white};
				}
			}
		}
	}
	.footer-item.active :not(.plus) {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: red;
	}
	.footer-item.active :not(.plus).footer-title {
		border-bottom: 2.5px solid ${({ theme }) => theme.mobile.hrefColorPrimary};
		padding-bottom: 2vw;
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
		background: radial-gradient(
			76.92% 76.92% at 50% 23.08%,
			#ea9218 0%,
			#ea6118 100%
		);
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
		background: #182043;
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
		box-shadow: 0px -6px 30px 0px rgba(0, 0, 0, 0.5);
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
		color: #939dc5;
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
				color: #939dc5;
			}
		}
	}
	.footer-popup.active {
		transform: translateY(0);
		transition: 0.5s;
	}
`
