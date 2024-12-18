import styled from 'styled-components'

export const HotMatchContainer = styled.div`
	position: relative;
	margin-left: 3.88vw;
	margin-bottom: 5.8vw;

	.home-hotmatch-swiper {
		overflow: hidden;
		position: unset !important;
	}

	.swiper-slide {
		display: flex;
		align-items: center;
	}

	.match-item {
		width: 100%;
		background: ${({ theme }) => theme.mobile.hotMatchBg};
		box-shadow: ${({ theme }) => theme.mobile.hotMatchShadow};
		border-radius: 4.8vw;
		overflow: hidden;
		position: relative;
		z-index: 1;
		.match-item-title {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 9.7vw;
			padding-left: 3.8vw;
			background: ${({ theme }) => theme.mobile.hotMatchHeaderBg};
			overflow: hidden;
			color: ${({ theme }) => theme.mobile.hotMatchHeaderColor};
			text-overflow: ellipsis;
			font-size: 3.6vw;
			font-weight: 700;

			p {
				font-weight: 600;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 26.4vw;
			}
			> div {
				display: flex;
				font-size: 2.9vw;
				div {
					margin-left: 2.42vw;
				}
			}
			&::after {
				position: absolute;
				display: block;
				content: '';
				width: 19.4vw;
				height: 0.97vw;
				clip-path: polygon(0 0, 100% 0, 100% 100%, 3% 100%);
				background: linear-gradient(90deg, #ff7600 10%, #fff);
				top: 9.7vw;
			}
		}
		.match-item-center {
			position: relative;
			padding: 1.94vw 4.36vw;

			&:before {
				content: '';
				display: flex;
				position: absolute;
				top: 0;
				left: 0.048vw;
				width: 31.8vw;
				height: 36.4vw;
				background: url(${({ theme }) =>
						theme.assetUrl}/h5/img/new-ui/match-bg.webp)
					no-repeat;
				z-index: 1;
			}

			.team-content {
				position: relative;
				z-index: 2;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 1.94vw;

				.team-item {
					display: flex;
					align-items: center;
					font-size: 2.39vw;
					font-weight: 500;

					img {
						width: 9.7vw;
						border-radius: 50%;
						margin-right: 1.94vw;
						background: ${({ theme }) => theme.mobile.hotMatchLogoBg};
					}

					div {
						width: 31.55vw;
						word-wrap: break-word;
						font-size: 3.15vw;
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
					border-radius: 12.13vw;
					background: ${({ theme }) => theme.mobile.hotMatchOddsBg};
					width: 26.69vw;
					height: 5.82vw;
					border-radius: 12.13vw;
					padding: 0 3.88vw;
					margin-top: 1.21vw;
					font-size: 3.39vw;
					color: ${({ theme }) => theme.mobile.hotMatchOddsColor};

					span:nth-child(2) {
						color: ${({ theme }) => theme.mobile.hotMatchAwayOddsColor};
					}
				}
			}
		}

		.match-date {
			display: flex;
			gap: 2.91vw;
			color: ${({ theme }) => theme.mobile.hotMatchDateColor};
			text-overflow: ellipsis;
			font-size: 3.39vw;
			font-weight: 400;
		}

		.match-footer {
			display: flex;
			padding-left: 3.89vw;
			justify-content: space-between;
			align-items: center;
			align-self: stretch;
			height: 9.2vw;
		}

		.bet-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			border-radius: 4.8vw 0;
			padding: 2.4vw 4.8vw;
			background: ${({ theme }) => theme.mobile.hotMatchBtnBg};
			box-shadow: ${({ theme }) => theme.mobile.hotMatchBtnShadow};
			text-transform: uppercase;
			font-size: 4.12vw;
			font-weight: 600;
			letter-spacing: 0.85px;
			color: ${({ theme }) => theme.mobile.hotMatchBtnColor};
		}
	}
`
