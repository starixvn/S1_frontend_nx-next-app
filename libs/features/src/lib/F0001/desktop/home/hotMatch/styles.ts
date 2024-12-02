import styled from "styled-components";

export const HotMatchContainer = styled.div`
	position: relative;
	margin-top: 4rem;

	&:after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 8rem;
		background: linear-gradient(270deg, #0f1428ed 0%, rgba(15, 20, 40, 0) 100%);
		z-index: 2;
	}

	.swiper-container {
		overflow: hidden;
		position: unset !important;
	}

	.swiper-slide {
		display: flex;
		align-items: center;
	}

	.match-item {
		width: 100%;
		background: ${({ theme }) => theme.desktop.hotMatchBg};
		box-shadow: ${({ theme }) => theme.desktop.hotMatchShadow};
		border-radius: 2rem;
		overflow: hidden;

		.match-item-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 4rem;
			padding-left: 1.6rem;
			position: relative;
			background: ${({ theme }) => theme.desktop.hotMatchHeaderBg};
			overflow: hidden;
			color: ${({ theme }) => theme.desktop.hotMatchHeaderColor};
			text-overflow: ellipsis;
			font-size: 1.5rem;
			font-weight: 700;

			p {
				font-weight: 600;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 15rem;
			}
			> div {
				display: flex;
				font-size: 1.2rem;
				div {
					margin-left: 1rem;
				}
			}
			&::after {
				position: absolute;
				display: block;
				content: '';
				width: 8rem;
				height: 4px;
				clip-path: polygon(0 0, 100% 0, 100% 100%, 3% 100%);
				background: linear-gradient(90deg, #ff7600 10%, #fff);
				top: 4rem;
			}
		}
		.match-item-center {
			position: relative;
			padding: 0.8rem 1.8rem;

			&:before {
				content: '';
				display: flex;
				position: absolute;
				top: 0;
				left: 0.2rem;
				width: 13.1rem;
				height: 15rem;
				background: url(${({ theme }) =>
						theme.assetUrl}/desktop/img/new-ui/match-bg.webp)
					no-repeat;
				z-index: 1;
			}

			.team-content {
				position: relative;
				z-index: 2;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 0.8rem;

				.team-item {
					display: flex;
					align-items: center;
					font-size: 1.4rem;
					font-weight: 500;

					img {
						width: 4rem;
						border-radius: 50%;
						margin-right: 0.8rem;
						background: ${({ theme }) => theme.desktop.hotMatchLogoBg};
					}

					div {
						width: 13rem;
						word-wrap: break-word;
						font-size: 1.3rem;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
				.odds {
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-radius: 5rem;
					background: ${({ theme }) => theme.desktop.hotMatchOddsBg};
					width: 11rem;
					height: 2.4rem;
					border-radius: 5rem;
					padding: 0 1.6rem;
					margin-top: 5px;
					font-size: 1.4rem;
					color: ${({ theme }) => theme.desktop.hotMatchOddsColor};

					span:nth-child(2) {
						color: ${({ theme }) => theme.desktop.hotMatchAwayOddsColor};
					}
				}
			}
		}

		.match-date {
			display: flex;
			gap: 1.2rem;
			color: ${({ theme }) => theme.desktop.hotMatchDateColor};
			text-overflow: ellipsis;
			font-size: 1.4rem;
			font-weight: 400;
		}

		.match-footer {
			display: flex;
			padding-left: 1.6rem;
			justify-content: space-between;
			align-items: center;
			align-self: stretch;
			height: 3.8rem;
		}

		.bet-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			border-radius: 2rem 0;
			padding: 1rem 2rem;
			background: ${({ theme }) => theme.desktop.hotMatchBtnBg};
			box-shadow: ${({ theme }) => theme.desktop.hotMatchBtnShadow};
			text-transform: uppercase;
			font-size: 1.7rem;
			font-weight: 600;
			letter-spacing: 0.85px;
			color: ${({ theme }) => theme.desktop.hotMatchBtnColor};

			&:hover {
				background: ${({ theme }) => theme.desktop.hotMatchBtnBgHover};
				box-shadow: ${({ theme }) => theme.desktop.hotMatchBtnShadowHover};
			}
		}
	}

	.swiper-button-next,
	.swiper-button-prev {
		font-size: 2.4rem;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2.8rem;
		width: 2.8rem;
		border-radius: 10rem;
		border: ${({ theme }) => theme.desktop.swiperBtnBorder};
		background: ${({ theme }) => theme.desktop.swiperBtnBg};
		font-size: 2.4rem;
		z-index: 3;

		&.swiper-button-disabled {
			opacity: 0.4 !important;
		}
	}

	.swiper-button-prev {
		position: absolute;
		left: -1.8rem;
	}

	.swiper-button-next {
		position: absolute;
		right: -1.8rem;
	}
`
