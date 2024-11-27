import styled from "styled-components";

export const MenuContainer = styled.div`
	position: relative;
	display: flex;
	height: 4.8rem;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	background: ${({ theme }) => theme.desktop.menuContainerBg};

	--transition: 0.6s;

	.icon-home,
	.icon-mobile {
		font-size: 2rem;

		&:hover:before {
			color: ${({ theme }) => theme.desktop.menuItemColorHover};
		}
	}

	> div {
		display: flex;
		align-items: center;
		margin: auto;
		width: ${({ theme }) => theme.desktop.contentWidth};
		height: 100%;
		justify-content: space-between;

		.menu-item,
		> button {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-left: 0.8rem;
			padding-right: 0.8rem;
			height: 100%;
			font-size: 1.4rem;
			font-weight: 700;
			text-transform: uppercase;
			color: ${({ theme }) => theme.desktop.menuItemColor};
			transition: color 0.3s ease-in-out;

			&:after {
				content: '';
				display: block;
				background: ${({ theme }) => theme.desktop.menuItemActiveLine};
				width: calc(100% - 3px);
				height: 3px;
				position: absolute;
				bottom: 0;
				z-index: 2;
				display: none;
			}

			&:hover,
			&.active {
				background: ${({ theme }) => theme.desktop.menuItemBgHover};
				color: ${({ theme }) => theme.desktop.menuItemColorHover};
				cursor: pointer;

				&:after {
					display: block;
				}
			}

			div {
				&.icon {
					position: absolute;
					right: -0.8rem;
					top: 0.2rem;
					display: flex;
					align-items: center;
					padding: 0.2rem 0.6rem;
					color: ${({ theme }) => theme.desktop.newLabelColor};
					border-radius: 5rem;
					background: ${({ theme }) => theme.desktop.newLabelBg};
					font-size: 0.8rem;
					font-weight: 700;

					&.icon-fire-fill {
						background: ${({ theme }) => theme.desktop.hotLabelBg};

						&:before {
							color: ${({ theme }) => theme.desktop.hotIconColor};
						}
					}

					&:before {
						margin: 0 2px 0 0;
						font-weight: normal;
						color: white;

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
					width: 5rem;
				}
			}
		}
	}

	.subMenu-Wrapper-new {
		position: absolute;
		width: 100%;
		left: 0;
		top: 4.8rem;
		background: rgba(15, 20, 40, 0.95);
		z-index: 2;

		.icon:before {
			font-size: 3rem;
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
			position: relative;
			display: none;
			justify-content: center;
			flex-flow: wrap;
			height: 0;
			width: ${({ theme }) => theme.desktop.contentWidth};
			margin: auto;
			padding: 4rem;

			&.maintenance {
				filter: grayscale(2);
			}

			a,
			button {
				flex: 1 1 14rem;
				display: flex;
				flex-flow: column;
				align-items: center;
				justify-content: flex-end;
				transition: 0s;
				position: relative;
				max-width: 14rem;
				margin: 0 1.5rem;
				opacity: 0;
				color: #fff;

				.under {
					display: none;
					position: absolute;
					z-index: 1;
					background: #555;
					padding: 0.5rem 1rem;
					border-radius: 0.5rem;
					text-align: center;
				}

				&.active {
					filter: grayscale(1);

					.under {
						display: block;
					}
				}

				.live:before {
					bottom: 3rem;
					top: auto;
					right: 1.5rem;
					z-index: 1;
				}

				img {
					transition: 0.3s;
					width: 14rem;
				}

				.name {
					display: block;
				}

				&:hover {
					img {
						transition: var(--transition);
						opacity: 1;

						&.List-npc {
							margin: 0 0 0 1rem;
						}

						&.List-bg {
							filter: grayscale(0);
							margin: 0 0 1rem 0;
						}
					}
				}

				.name {
					width: 100%;
					transition: var(--transition);
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					line-height: 1.8rem;
					font-size: 1.4rem;
					font-weight: 400;
					color: ${({ theme }) => theme.desktop.subMenuTextColor};
				}
			}

			&.active {
				display: flex;
				opacity: 1;
				height: auto;

				a,
				button {
					transition: var(--transition);
					opacity: 1;
					align-items: center;
					justify-content: center;

					img {
						transition: var(--transition);
						margin-left: 0;

						&.List-npc {
							margin-bottom: 1rem;
						}
					}

					.name {
						transition: var(--transition);
						left: 0;
						bottom: 0;
					}
				}
			}

			.new-icon {
				background: ${({ theme }) => theme.desktop.newLabelBg};
				border-radius: 5rem;
				font-size: 1.2rem;
				width: 3rem;
				height: 3rem;
				position: absolute;
				top: 1rem;
				right: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0.3rem;
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

		.promoList,
		.vipList,
		.rankingList {
			padding-top: 4rem;
			padding-bottom: 4rem;
		}

		.promoList {
			background: url(${process.env[
					'NEXT_PUBLIC_BANNER_HOST'
				]}/desktop/img/new-ui/promotion-banner/banner-en.webp)
				no-repeat center / auto;
			&.en {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-en.webp)
					no-repeat center / auto;
			}
			&.cs {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-cs.webp)
					no-repeat center / auto;
			}
			&.my {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-my.webp)
					no-repeat center / auto;
			}
			&.th {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-th.webp)
					no-repeat center / auto;
			}
			&.id {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-id.webp)
					no-repeat center / auto;
			}
			&.hi {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-hi.webp)
					no-repeat center / auto;
			}
			&.bd {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-bd.webp)
					no-repeat center / auto;
			}
			&.kh {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-kh.webp)
					no-repeat center / auto;
			}
			&.vn {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-vn.webp)
					no-repeat center / auto;
			}
			&.br {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-br.webp)
					no-repeat center / auto;
			}
			&.ko {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-ko.webp)
					no-repeat center / auto;
			}
			&.jp {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/promotion-banner/banner-jp.webp)
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
					]}/desktop/img/new-ui/vip-banner/banner-en.webp)
					no-repeat center / auto;
			}

			&.my {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/vip-banner/banner-my.webp)
					no-repeat center / auto;
			}

			&.cs {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/vip-banner/banner-cs.webp)
					no-repeat center / auto;
			}

			&.id {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/vip-banner/banner-id.webp)
					no-repeat center / auto;
			}

			&.th {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/vip-banner/banner-th.webp)
					no-repeat center / auto;
			}

			&.vn {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/vip-banner/banner-vn.webp)
					no-repeat center / auto;
			}

			&.hi {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/vip-banner/banner-hi.webp)
					no-repeat center / auto;
			}

			&.bd {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/vip-banner/banner-bd.webp)
					no-repeat center / auto;
			}

			&.kh {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/vip-banner/banner-kh.webp)
					no-repeat center / auto;
			}

			&.br {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/vip-banner/banner-br.webp)
					no-repeat center / auto;
			}

			&.ko {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/vip-banner/banner-ko.webp)
					no-repeat center / auto;
			}

			&.jp {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/vip-banner/banner-jp.webp)
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
				]}/desktop/img/new-ui/leader-board-banner/banner-en.webp)
				no-repeat center / auto;
			&.en {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/leader-board-banner/banner-en.webp)
					no-repeat center / auto;
			}
			&.my {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/leader-board-banner/banner-my.webp)
					no-repeat center / auto;
			}
			&.cs {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/leader-board-banner/banner-cs.webp)
					no-repeat center / auto;
			}
			&.th {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/leader-board-banner/banner-th.webp)
					no-repeat center / auto;
			}
			&.id {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/leader-board-banner/banner-id.webp)
					no-repeat center / auto;
			}
			&.kh {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/leader-board-banner/banner-kh.webp)
					no-repeat center / auto;
			}
			&.vn {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/leader-board-banner/banner-vn.webp)
					no-repeat center / auto;
			}
			&.br {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/leader-board-banner/banner-br.webp)
					no-repeat center / auto;
			}
			&.ko {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/leader-board-banner/banner-ko.webp)
					no-repeat center / auto;
			}
			&.jp {
				background: url(${process.env[
						'NEXT_PUBLIC_BANNER_HOST'
					]}/desktop/img/new-ui/leader-board-banner/banner-jp.webp)
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
