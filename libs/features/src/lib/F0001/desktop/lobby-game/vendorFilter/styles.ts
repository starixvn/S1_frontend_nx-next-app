import styled from "styled-components";

export const VendorFilterContainer = styled.div`
	position: relative;
	height: 8rem;
	width: 100%;
	overflow: hidden;

	.provider-list {
		display: flex;
		flex-wrap: wrap;

		&-item {
			display: flex;
			align-items: center;
			background: ${({ theme }) => theme.desktop.filterFormProviderBg};
			min-width: 21rem;
			height: 5.6rem;
			padding: 0 1.2rem;
			border-radius: 1rem;
			margin: 2.4rem 0 0 1.6rem;

			&:first-child {
				margin-left: 0;
			}

			.img-container {
				display: flex;
				width: 3.2rem;
				height: 3.2rem;
				border-radius: 10rem;
				background: ${({ theme }) => theme.desktop.filterFormProviderLogoBg};

				img {
					width: 100%;
				}
			}

			.name {
				margin-left: 1.2rem;
				font-size: 1.5rem;
				font-weight: 700;
				color: ${({ theme }) => theme.desktop.filterFormProviderColor};
			}

			&:hover {
				cursor: pointer;
				background: ${({ theme }) => theme.desktop.filterFormProviderBgHover};
			}

			&.active {
				background: ${({ theme }) => theme.desktop.filterFormProviderBgHover};
			}

			&.under {
				position: relative;
				&::after {
					position: absolute;
					display: block;
					content: '';
					background: url(${({ theme }) =>
							theme.assetUrl}/desktop/img/4.0/lobby-slots/under.png)
						no-repeat center / cover;
					height: 40px;
					width: 40px;
					right: 75px;
				}
				&::before {
					position: absolute;
					background: #000000a6;
					display: block;
					content: '';
					width: 100%;
					height: 55px;
					border-radius: 15px;
					left: 0;
					top: 0;
				}
			}
		}
	}

	&.active {
		height: auto;

		.btn-toggle {
			transition: 0.7s;
			transform: rotate(-180deg);
		}
	}

	.btn-toggle {
		position: absolute;
		top: 2.2rem;
		right: 0;
		background: ${({ theme }) => theme.desktop.filterFormProviderBg};
		border-radius: 10rem;
		height: 5.6rem;
		width: 5.6rem;

		transition: 0.7s;

		.icon {
			font-size: 2.4rem;
		}
	}
`
