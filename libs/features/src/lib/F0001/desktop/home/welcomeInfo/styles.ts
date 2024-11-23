import styled from "styled-components";

export const WelcomeInfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 2rem;
	padding-bottom: 4rem;

	.welcomeinfo-content {
		position: relative;

		img {
			width: 33.2rem;
			height: 25.7rem;
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
			border-radius: 2rem 0 0 0;
			font-size: 1.7rem;
			font-weight: 600;
			letter-spacing: 0.85px;
			text-transform: uppercase;
		}

		&.join .welcome-btn {
			background: ${({ theme }) => theme.desktop.welcomeAffiliateBtnBg};
			color: ${({ theme }) => theme.desktop.welcomeAffiliateBtnColor};
		}

		&.winning .welcome-btn {
			background: ${({ theme }) => theme.desktop.welcomeWinningBtnBg};
			color: ${({ theme }) => theme.desktop.welcomeWinningBtnColor};
		}

		&.reward .welcome-btn {
			background: ${({ theme }) => theme.desktop.welcomeRewardBtnBg};
			color: ${({ theme }) => theme.desktop.welcomeRewardBtnColor};
		}

		&.referral .welcome-btn {
			background: ${({ theme }) => theme.desktop.welcomeReferralBtnBg};
			color: ${({ theme }) => theme.desktop.welcomeReferralBtnColor};
		}
	}
`
