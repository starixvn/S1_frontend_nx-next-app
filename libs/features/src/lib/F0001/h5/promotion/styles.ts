import styled from "styled-components";

export const PromotionPage = styled.div`
	justify-content: flex-start;
	width: calc(100% - 8vw);

	&.Expired {
		.promodule {
			background: #b2b2b2;
			img,
			div:not(.btn-group):not(.claimed) {
				filter: grayscale(1);
			}
			&.active {
				background: transparent;
				padding: 2vw 0;
				margin: 0;
			}
		}
		.expiredIcon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%) rotate(-20deg);
			background: #42424261;
			border-radius: 8px;
			border: 1px solid #fff;
			font-weight: bold;
			padding: 2.5vw 4vw;
			font-size: 6vw;
			font-style: italic;
			z-index: 1;
			color: #fff;
			&:before {
				content: 'Expired';
			}
		}
	}
	img {
		width: 100%;
		border-radius: 2.42vw;
	}
	.filterBtn {
		margin: 14vw 0 3vw;
	}

	.claimed,
	.new {
		position: absolute;
		justify-content: center;
		align-items: center;
		font-size: 3vw;
		z-index: 1;
		top: 3.5vw;
		left: -0.5vw;
		border-radius: 0px 4px 4px 0px;
		box-shadow: 0px 2.286px 0px 0px rgba(0, 0, 0, 0.25);
		width: 30px;
		height: 25px;
		padding: 0 20px;
		color: white;
		font-weight: bold;
		transform: rotate(-20deg) skewX(-20deg);
		font-style: initial;

		&:before {
			content: 'CLAIMED';
		}
	}

	.new {
		background: var(--Color-13, #f00);

		&:before {
			content: 'NEW';
			left: 3vw;
		}
	}

	.promodule,
	.proInfomodule {
		padding: 3.88vw;
		border: 0;
		background: #2e3965;
		line-height: 24px;
		position: relative;
		margin-bottom: 5.8vw;
		border-radius: 4.85vw;

		.btn-group {
			display: flex;
			gap: 3.88vw;
			margin-top: 3.88vw;

			button,
			a {
				font-weight: bold;
			}
		}

		&.active {
			.claimed {
				display: flex;
				background: #fbc208;
			}

			.rollover {
				border-color: #4f4f4f;
			}
		}

		&.expirModule {
			filter: grayscale(1);
		}

		.inputBox {
			margin: 0;
		}

		.protitle {
			margin: 5.82vw 0 1.94vw;
			font-size: 4.61vw;
			font-weight: 700;
		}

		.text {
			word-wrap: break-word;
			font-size: 3.39vw;
			font-weight: 400;
			line-height: 4.36vw;

			.text-link {
				color: $lightblue !important;
			}
		}
	}

	.proInfomodule {
		background: transparent;
		padding: 2vw 0;
		margin: 0;

		.new,
		.claimed {
			top: 2vw;
			left: 0;
		}

		&.active {
			background: transparent;

			.claimed + img {
				filter: grayscale(1);
			}
		}
	}

	.progressBarModule {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1.94vw;
		margin: 2vw 0 0;
		padding: 0;
		max-width: 100%;
		width: auto;

		.info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 2vw;
			color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
		}

		.bar {
			height: 2vw;
			background: #374375;
			border-radius: 10px;
			overflow: hidden;
			flex: auto;

			.progress {
				background: #ea6118;
				height: 100%;
				border-radius: 10px;
			}
		}

		.percentage {
			font-size: 2.91vw;
			font-weight: 400;
			flex: 0 0 auto;
			min-width: 6vw;
			color: #939dc5;
		}
	}

	.account {
		position: relative;
		border-radius: 2.42vw;
		background: #232b4f;
		line-height: initial;
		margin-top: 2.94vw;
		padding: 1.94vw;

		.info {
			display: flex;
			flex-direction: column;
			gap: 1.94vw;
			font-size: 2.91vw;
			color: var(--Color-9, #939dc5);

			.info-title {
				font-weight: 600;
			}

			.info-value {
				font-weight: 400;
			}
		}

		.clickBtn {
			position: absolute;
			right: 0.97vw;
			top: 5.48vw;
			margin: 0 0 0 2vw;
			width: 7vw;
			height: 7vw;

			&:before {
				color: #939dc5;
			}
		}
	}
`

export const ClaimAmountContainer = styled.div`
	.popTxt {
		margin-top: 5.82vw;
	}

	.btn-group {
		display: flex;
		gap: 3.88vw;
		margin-top: 5.82vw;
	}
`
