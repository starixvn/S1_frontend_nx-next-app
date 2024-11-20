import styled from "styled-components";

export const MenuContainer = styled.div`
	display: flex;
	height: 4.8rem;
	padding: 0 26rem;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	background: ${({ theme }) => theme.desktop.menuContainerBg};

	> div {
		width: 1400px;
		display: flex;
		align-items: center;
		margin: auto;
		height: 100%;
		justify-content: space-between;
		> a,
		> button {
			flex: 0 0 auto;
			display: flex;
			align-items: center;
			padding-left: 0;
			font-size: 16px;
			font-weight: 600;
			color: #0a1b38;
			height: 100%;
			position: relative;
			justify-content: center;

			&.tvbtn {
				padding: 0 60px 0 30px;
				justify-content: center;
			}

			&.reward {
				&::before {
					content: '';
					display: block;
					width: 45px;
					height: 45px;
					background: url(${process.env[
							'NEXT_PUBLIC_BANNER_HOST'
						]}/desktop/img/88rewards.png)
						no-repeat center / cover;
				}
			}

			&.eventbtn {
				&::before {
					display: block;
					content: '';
					width: 112px;
					height: 60px;
					background: url(${process.env[
							'NEXT_PUBLIC_BANNER_HOST'
						]}/desktop/img/event/worldcup/xs-logo.png)
						center no-repeat;
				}
			}
			&.rewardsbtn {
				&::before {
					display: block;
					content: '';
					width: 45px;
					height: 45px;
					background: url(${process.env[
							'NEXT_PUBLIC_BANNER_HOST'
						]}/desktop/img/88rewards_w.png)
						center top / cover;
					transition: 0.3s;
				}
				&:hover {
					&::before {
						background: url(${process.env[
								'NEXT_PUBLIC_BANNER_HOST'
							]}/desktop/img/88rewards.png)
							center top / cover;
						transition: 0.3s;
					}
				}
			}
			&.cryptobtn {
				&::before {
					display: block;
					content: '';
					width: 52px;
					height: 28.3px;
					background: url(${process.env[
							'NEXT_PUBLIC_BANNER_HOST'
						]}/desktop/img/cryptosports.png)
						no-repeat center top / cover;
					transition: 0.2s;
				}

				&:hover {
					&::before {
						background: url(${process.env[
								'NEXT_PUBLIC_BANNER_HOST'
							]}/desktop/img/cryptosportsa.png)
							no-repeat center top / cover;
					}
				}
				&.maintenance {
					&:hover {
						&::before {
							filter: grayscale(1);
							background: url(${process.env[
									'NEXT_PUBLIC_BANNER_HOST'
								]}/desktop/img/cryptosports.png)
								no-repeat center top / cover;
						}
					}
				}
			}

			&:after {
				content: '';
				display: block;
				background: #ff5e00;
				width: calc(100% - 3px);
				height: 3px;
				position: absolute;
				bottom: 0;
				z-index: 2;
				display: none;
			}

			&:hover,
			&.active {
				color: #ff5e00;
				cursor: pointer;

				&:after {
					display: block;
				}
			}

			&.icon-home,
			&.icon-mobile {
				font-size: 24px;
			}

			div {
				&.icon {
					position: absolute;
					top: -1px;
					background: #ff7600;
					font-size: 13px;
					padding: 1px 12px 0;
					font-weight: bold;
					transform: scale(0.95);
					display: flex;
					align-items: center;
					color: white;
					border-radius: 0 0 10px 10px;
					&.icon-new {
						left: 0;
						top: 0;
						&:after {
							content: '';
							display: block;
							width: 0;
							height: 0;
							border-style: solid;
							border-width: 0 0 18px 10px;
							border-color: transparent transparent transparent #f77900;
							position: absolute;
							background: 0 0;
							top: 0;
							left: 50px;
							transform: translateY(0);
						}
					}

					&:before {
						margin: 0 2px 0 0;
						font-weight: normal;
						color: white;
						// animation: star 1s 1s infinite linear;

						@keyframes star {
							0% {
								transform: rotate(0deg);
								color: white;
							}

							75% {
								transform: rotate(360deg);
								color: $red;
							}

							100% {
								transform: rotate(360deg);
								color: $red;
							}
						}
					}

					&.mediafire {
						background: $red;
						padding: 0 7px 1px 5px;
						&:before {
							display: block;
							content: '';
							height: 15px;
							width: 15px;
							// transform: rotate(90deg);
							// animation: fire 1s 1s infinite linear;
							z-index: 1;
							background: url(${process.env[
									'NEXT_PUBLIC_BANNER_HOST'
								]}/desktop/img/4.0/icon-fire.png)
								no-repeat center / cover;
						}

						// @keyframes fire {
						//   0% {
						//     transform: rotate(90deg) scale(1, 1);
						//     color: white;
						//   }

						//   50% {
						//     transform: rotate(90deg) scale(1.2);
						//     color: $orange;
						//   }

						//   100% {
						//     transform: rotate(90deg) scale(1, 1);
						//     color: white;
						//   }
						// }

						// &:after {
						//   border-color: transparent #750202 transparent transparent;
						// }
					}
				}

				&.live {
					position: absolute;
					top: -4px;
					left: 0;

					&:before {
						content: 'Live';
						font-family: $family;
						font-weight: bold;
					}

					i {
						position: absolute;
						top: 6px;
						left: 6px;
						width: 6px;
						height: 6px;
						border-radius: 6px;
						animation: livePoint 1s 1s infinite linear;

						@keyframes livePoint {
							from {
								background: white;
							}

							to {
								background: #fc0404;
							}
						}
					}

					&:before {
						background: #05bc0b;
						border-radius: 0;
						left: 0;
						top: 0;
						right: unset;
						animation: none;
						width: 36px;
						padding-left: 16px;
						padding-right: 0;
						border-radius: 3px;
					}

					&:after {
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-style: solid;
						border-width: 0 10px 10px 0;
						border-color: transparent #049809 transparent transparent;
						position: absolute;
						background: transparent;
						top: 6px;
						left: 2px;
						transform: translateY(100%);
					}
				}
			}
			&.reward {
				img {
					width: 50px;
				}
			}
		}
	}

	//新的
	.subMenu-Wrapper-new {
		position: absolute;
		width: $width;
		left: 0;
		top: 59px;
		background: #ffffffd9;
		z-index: -1;
		border-bottom: 1px solid #ccc;
		backdrop-filter: blur(4px);
		.icon:before {
			font-size: 30px;
		}

		.homeList,
		.sportsList,
		.exchangeList,
		.eSportsList,
		.casinoList,
		.livecasinoList,
		.pokerList,
		.tableList,
		.gameList,
		.fishList,
		.fourList,
		.promoList,
		.tvList,
		.vipList,
		.sponsorList,
		.rankingList,
		.eventList,
		.cryptoList {
			margin: auto;
			display: flex;
			visibility: hidden;
			justify-content: center;
			flex-flow: wrap;
			height: 0;
			width: 1400px;
			position: relative;
			&.maintenance {
				filter: grayscale(2);
			}
			a,
			button {
				flex: 1 1 155px;
				display: flex;
				flex-flow: column;
				align-items: center;
				justify-content: flex-end;
				height: 185px;
				transition: 0s;
				color: white;
				max-width: 155px;
				position: relative;
				text-transform: initial;
				margin: 0 10px 5px;
				opacity: 0;
				top: -10px;
				.under {
					display: none;
					position: absolute;
					z-index: 1;
					background: #555;
					padding: 5px 10px;
					border-radius: 5px;
					text-align: center;
				}

				&.active {
					filter: grayscale(1);

					.under {
						display: block;
					}
				}

				.live:before {
					bottom: 30px;
					top: auto;
					right: 15px;
					z-index: 1;
				}

				img {
					transition: 0.3s;
					position: absolute;
					width: 150px;

					&.List-npc {
						z-index: 1;
						margin: 0 0 -30px -30px;
						border-radius: 20px;
					}
				}

				&:hover {
					img {
						transition: $transition;
						opacity: 1;

						&.List-npc {
							margin: 0 0 0 10px;
						}

						&.List-bg {
							filter: grayscale(0);
							margin: 0 0 10px 0;
						}
					}
				}

				> span {
					position: absolute;
					font-size: 16px;
					width: 150px;
					height: 25px;
					transition: $transition;
					left: 10px;
					bottom: -30px;
					z-index: 2;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					// padding: 0 30px;
					line-height: 25px;
					color: #0a1b38;
					// margin-bottom: 6px;
					font-size: 14px;
				}

				&.icon-new {
					&:before {
						font-size: 12px;
						top: auto;
						bottom: 30px;
						z-index: 2;
						background: #f77900;
						padding: 10px;
						color: white;
						border-radius: 50px;
						display: flex;
						justify-content: center;
						align-items: center;
						animation: none;
					}
				}
			}

			&.active {
				opacity: 1;
				visibility: visible;
				height: auto;

				a,
				button {
					transition: $transition;
					opacity: 1;
					top: 0px;
					align-items: center;
					justify-content: center;

					img {
						transition: $transition;
						margin-left: 0;

						&.List-npc {
							margin-bottom: 20px;
						}
					}

					> span {
						transition: $transition;
						left: 0;
						bottom: 0;
					}
				}
			}
			.new-icon {
				background: #ff7600;
				border-radius: 50px;
				font-size: 12px;
				width: 30px;
				height: 30px;
				position: absolute;
				top: 10px;
				right: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 3px;
				z-index: 2;
			}
		}

		&
			> div:not(.homeList):not(.sportsList):not(.livecasinoList):not(
				.exchangeList
			):not(.gameList):not(.tvList):not(.tableList):not(.sponsorList)
			img.List-bg {
			z-index: 1;
			margin-left: -70px;
		}

		.gameList.active {
			a,
			button {
				.List-bg {
					margin-left: -90px;
				}
			}
		}

		.pokerList,
		.vipList,
		.rankingList,
		.promoList,
		.eventList {
			background: url(${process.env[
					'NEXT_PUBLIC_BANNER_HOST'
				]}/desktop/img/poker.jpg)
				no-repeat center / auto;
			padding: 0 calc((100% - 1400px) / 2);

			> div {
				width: 50%;
				height: 150px;
				padding: 32px 0;
				color: $blue4;
				display: flex;
				flex-flow: column;
				align-items: center;
				margin: 0 auto 0 0;
				font-size: 18px;

				> div {
					&:nth-child(2) {
						font-weight: bold;
					}

					&:last-child {
						color: #cdae8e;
						font-size: 12px;
					}

					&.btnGroup {
						margin: 15px 0;

						button,
						a {
							height: auto;
							border-radius: 5px;
							padding: 5px;
							font-size: 14px;
						}
					}
				}
			}
		}

		.pokerList {
			.under {
				display: none;
				width: auto;
				height: auto;
				position: absolute;
				z-index: 1;
				background: #555;
				padding: 5px 10px;
				border-radius: 5px;
				color: white;
				top: 120px;
				text-transform: capitalize;
			}

			&.um {
				filter: grayscale(1);
				display: flex;
				align-items: center;

				.under {
					display: block;
				}

				.btnGroup {
					display: none;
				}
			}
		}

		.promoList {
			background: url(${process.env[
					'NEXT_PUBLIC_BANNER_HOST'
				]}/desktop/img/4.0/pomobanner-en.jpg)
				no-repeat center / auto;
			&.en {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/pomobanner-en.jpg)
					no-repeat center / auto;
			}
			&.cs {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/pomobanner-cs.jpg)
					no-repeat center / auto;
			}
			&.my {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/pomobanner-my.jpg)
					no-repeat center / auto;
			}
			&.th {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/pomobanner-th.jpg)
					no-repeat center / auto;
			}
			&.id {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/pomobanner-id.jpg)
					no-repeat center / auto;
			}
			&.hi {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/pomobanner-hi.jpg)
					no-repeat center / auto;
			}
			&.bd {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/pomobanner-bd.jpg)
					no-repeat center / auto;
			}
			&.kh {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/pomobanner-kh.jpg)
					no-repeat center / auto;
			}
			&.vn {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/pomobanner-vn.jpg)
					no-repeat center / auto;
			}
			&.br {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/pomobanner-br.jpg)
					no-repeat center / auto;
			}
			&.ko {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/pomobanner-ko.jpg)
					no-repeat center / auto;
			}
			&.jp {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/pomobanner-jp.jpg)
					no-repeat center / auto;
			}

			> div {
				justify-content: center;

				.txt-orange {
					font-weight: bold;
					font-size: 24px;
				}
			}
		}

		.vipList {
			&.en {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-en.png)
					no-repeat center / auto;
			}

			&.my {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-my.png)
					no-repeat center / auto;
			}

			&.cs {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-cs.png)
					no-repeat center / auto;
			}

			&.id {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-id.png)
					no-repeat center / auto;
			}

			&.th {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-th.png)
					no-repeat center / auto;
			}

			&.vn {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-vn.png)
					no-repeat center / auto;
			}

			&.hi {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-hi.png)
					no-repeat center / auto;
			}

			&.bd {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-bd.png)
					no-repeat center / auto;
			}

			&.kh {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-kh.png)
					no-repeat center / auto;
			}

			&.br {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-br.png)
					no-repeat center / auto;
			}

			&.ko {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-ko.png)
					no-repeat center / auto;
			}

			&.jp {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/vipdropdown-jp.png)
					no-repeat center / auto;
			}

			> div {
				margin: 0 auto 0 100px;
				justify-content: center;
				font-weight: bold;
			}
		}

		.rankingList {
			background: url(${process.env[
					'NEXT_PUBLIC_BANNER_HOST'
				]}/desktop/img/4.0/leaderboard-newdropdown-en.jpg)
				no-repeat center / auto;
			&.en {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/leaderboard-newdropdown-en.jpg)
					no-repeat center / auto;
			}
			&.my {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/leaderboard-newdropdown-my.jpg)
					no-repeat center / auto;
			}
			&.cs {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/leaderboard-newdropdown-cs.jpg)
					no-repeat center / auto;
			}
			&.th {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/leaderboard-newdropdown-th.jpg)
					no-repeat center / auto;
			}
			&.id {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/leaderboard-newdropdown-id.jpg)
					no-repeat center / auto;
			}
			&.kh {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/leaderboard-newdropdown-kh.jpg)
					no-repeat center / auto;
			}
			&.vn {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/leaderboard-newdropdown-vn.jpg)
					no-repeat center / auto;
			}
			&.br {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/leaderboard-newdropdown-br.jpg)
					no-repeat center / auto;
			}
			&.ko {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/leaderboard-newdropdown-ko.jpg)
					no-repeat center / auto;
			}
			&.jp {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/4.0/leaderboard-newdropdown-jp.jpg)
					no-repeat center / auto;
			}

			> div,
			> a {
				margin: 0 auto 0 100px;
				justify-content: center;
				font-weight: bold;
				font-size: 22px;

				div:last-child {
					color: $blue4;
					font-size: 16px;
				}
			}
		}
	}
`
