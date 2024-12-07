import styled from 'styled-components'

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
		display: none;
		justify-content: center;
		align-items: center;
		font-size: 3vw;
		z-index: 1;
		top: 3.5vw;
		left: -0.5vw;
		background: #fbc208;
		border-radius: 0 0 10px 0;
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
		background: #f00;
		border-color: #fbc208 transparent transparent transparent;
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
		.btn-cancel {
			background: white;
			padding: 0 2vw;
			border-radius: 3px;
			display: inline-flex;
			align-items: center;
			color: $orange;
		}
		.btn-check {
			background: linear-gradient(to bottom, #f1d5b6, #cdae8e);
			padding: 0 2vw;
			border-radius: 3px;
			display: inline-flex;
			align-items: center;
			margin: 0 0 0 1vw;
		}
		> button {
			line-height: 24px;
			vertical-align: bottom;
			margin: 0 0 0 1vw;
			font-size: 12px;
			&.ViewAllAmount {
				padding: 5px 10px;
				background: #002b6c;
				margin: -1px 0 2vw;
				width: 100%;
				border-radius: 0 0 10px 10px;
				display: flex;
				justify-content: center;
				span {
					display: flex;
					align-items: center;
					&.active {
						transform: rotate(180deg);
					}
				}
			}
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
			ol {
				padding: 0 0 0 5vw;
				li {
					list-style: decimal;
					a {
						text-decoration: underline;
					}
				}
			}
			ul {
				padding: 0 0 0 5vw;
				li {
					list-style: initial;
					a {
						text-decoration: underline;
					}
					ul {
						li {
							list-style: circle;
						}
					}
				}
			}
		}
		.account {
			line-height: initial;
			padding: 2vw;
			.info {
				justify-content: space-between;
				display: flex;
				span:first-child {
					font-weight: bold;
					color: #b2b2b2;
				}
			}
		}
		strong {
			font-weight: bold !important;
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
`

export const ClaimAmountContainer = styled.div`
	.btn-group {
		display: flex;
		gap: 3.88vw;
		margin-top: 5.82vw;
	}
`
