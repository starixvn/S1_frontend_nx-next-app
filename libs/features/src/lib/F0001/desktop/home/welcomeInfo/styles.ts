import styled from "styled-components";

export const WelcomeInfoContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 2rem;
	padding-bottom: 4rem;
	gap: 2rem;

	.welcomeinfo-content {
		position: relative;
		flex: 0 0 28.5rem;
		padding-top: 6.5rem;

		@media (min-width: 1450px) {
			flex: 0 0 33.2rem;
		}

		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			display: block;
			width: 13.4rem;
			height: 13.4rem;
		}

		img {
			width: 100%;
			height: 19.8rem;
		}

		&-text {
			position: absolute;
			left: 1.6rem;
			top: 14rem;

			.title {
				margin-bottom: 0.4rem;
				font-size: 2.5rem;
				font-weight: 700;
				color: ${({ theme }) => theme.desktop.welcomeInfoTitleColor};
			}

			.desc {
				font-size: 1.4rem;
				font-weight: 400;
				line-height: 1.8rem;
				color: ${({ theme }) => theme.desktop.welcomeInfoDescColor};
			}
		}

		.welcome-btn {
			position: absolute;
			right: 0;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			min-width: 14rem;
			padding: 1.2rem 2rem;
			border-radius: 2rem 0;
			font-size: 1.7rem;
			font-weight: 600;
			letter-spacing: 0.85px;
			text-transform: uppercase;
			transition: color 0.3s ease-in-out;
		}

		&.join {
			&:before {
				background: url(${({ theme }) =>
					theme.assetUrl}/desktop/img/new-ui/welcome-join-icon.webp);
			}

			&.after-login:before {
				background: url(${({ theme }) =>
					theme.assetUrl}/desktop/img/new-ui/welcome-affiliate-icon.webp);
			}

			.welcome-btn {
				background: ${({ theme }) => theme.desktop.welcomeAffiliateBtnBg};
				box-shadow: ${({ theme }) => theme.desktop.welcomeAffiliateBtnShadow};
				color: ${({ theme }) => theme.desktop.welcomeAffiliateBtnColor};

				&:hover {
					background: ${({ theme }) =>
						theme.desktop.welcomeAffiliateBtnBgHover};
					box-shadow: ${({ theme }) =>
						theme.desktop.welcomeAffiliateBtnShadowHover};
					color: ${({ theme }) => theme.desktop.welcomeAffiliateBtnColorHover};
				}
			}
		}

		&.winning {
			&:before {
				background: url(${({ theme }) =>
					theme.assetUrl}/desktop/img/new-ui/welcome-winning-icon.webp);
			}

			.welcome-btn {
				background: ${({ theme }) => theme.desktop.welcomeWinningBtnBg};
				box-shadow: ${({ theme }) => theme.desktop.welcomeWinningBtnShadow};
				color: ${({ theme }) => theme.desktop.welcomeWinningBtnColor};

				&:hover {
					background: ${({ theme }) => theme.desktop.welcomeWinningBtnBgHover};
					box-shadow: ${({ theme }) =>
						theme.desktop.welcomeWinningBtnShadowHover};
					color: ${({ theme }) => theme.desktop.welcomeWinningBtnColorHover};
				}
			}
		}

		&.reward {
			&:before {
				background: url(${({ theme }) =>
					theme.assetUrl}/desktop/img/new-ui/welcome-vip-icon.webp);
			}

			.welcome-btn {
				background: ${({ theme }) => theme.desktop.welcomeRewardBtnBg};
				box-shadow: ${({ theme }) => theme.desktop.welcomeRewardBtnShadow};
				color: ${({ theme }) => theme.desktop.welcomeRewardBtnColor};

				&:hover {
					background: ${({ theme }) => theme.desktop.welcomeRewardBtnBgHover};
					box-shadow: ${({ theme }) =>
						theme.desktop.welcomeRewardBtnShadowHover};
					color: ${({ theme }) => theme.desktop.welcomeRewardBtnColorHover};
				}
			}
		}

		&.referral {
			&:before {
				background: url(${({ theme }) =>
					theme.assetUrl}/desktop/img/new-ui/welcome-referral-icon.webp);
			}
			.welcome-btn {
				background: ${({ theme }) => theme.desktop.welcomeReferralBtnBg};
				box-shadow: ${({ theme }) => theme.desktop.welcomeReferralBtnShadow};
				color: ${({ theme }) => theme.desktop.welcomeReferralBtnColor};

				&:hover {
					background: ${({ theme }) => theme.desktop.welcomeReferralBtnBgHover};
					box-shadow: ${({ theme }) =>
						theme.desktop.welcomeReferralBtnShadowHover};
					color: ${({ theme }) => theme.desktop.welcomeReferralBtnColorHover};
				}
			}
		}
	}
`
