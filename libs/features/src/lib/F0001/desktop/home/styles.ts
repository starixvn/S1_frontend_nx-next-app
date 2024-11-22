import styled from "styled-components";

export const HomePage = styled.div`
	.homebanner {
		width: ${({ theme }) => theme.desktop.contentWidth};
		height: 39.4rem;
		border-radius: 2rem;

		.swiper-container {
			position: relative;

			> .swiper-wrapper {
				align-items: flex-start;
			}

			.banner {
				height: 36.4rem;

				img {
					border-radius: 2rem;
					height: 100%;
				}
			}

			.swiper-pagination {
				width: max-content;
				bottom: 0;
				right: unset;
				left: 50% !important;
				transform: translateX(-50%);
				z-index: 1;
				display: flex;
				align-items: center;

				.swiper-pagination-bullet {
					width: 1rem;
					height: 0.6rem;
					background: ${({ theme }) => theme.desktop.bannerBulletBg};
					margin: 0 4px;
					border-radius: 0.8rem;

					&.swiper-pagination-bullet-active {
						width: 4.5rem;
						height: 0.6rem;
						background: ${({ theme }) => theme.desktop.bannerBulletBgActive};
					}
				}
			}
		}
	}
`

export const WelcomeInfo = styled.div`
	width: ${({ theme }) => theme.desktop.contentWidth};
	margin: 30px auto 0;
	display: flex;
	justify-content: space-between;
	&-content {
		position: relative;
		display: flex;
		justify-content: center;
		img {
			width: 330px;
			border-radius: 0 0 20px 20px;
		}
		&-text {
			position: absolute;
			bottom: 50px;
			text-align: center;
			font-size: 20px;
			height: 75px;
			width: 200px;
			span {
				display: flex;
				justify-content: center;
				font-size: 12px;
				color: #b4b4b4;
			}
		}
		.welcome-btn {
			position: absolute;
			background: #407aeb;
			color: white;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			bottom: 0;
			border-radius: 20px 20px 0 0;
			padding: 0 40px;
		}
		&.join {
			.welcomeinfo-content-text {
				color: #407aeb;
			}
			.welcome-btn {
				background: #407aeb;
			}
		}
		&.winning {
			color: #47b452;
			.welcome-btn {
				background: #47b452;
			}
		}
		&.reward {
			color: #f84646;
			.welcome-btn {
				background: #f84646;
			}
		}
		&.referral {
			color: #c67af4;
			.welcome-btn {
				background: #c67af4;
			}
		}
	}
`
