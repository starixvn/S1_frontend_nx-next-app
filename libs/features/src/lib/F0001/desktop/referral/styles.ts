import styled from 'styled-components'

export const WrapperReferal = styled.div`
	.referstatus {
		width: 100%;
		max-width: 72rem;
		margin: 0 auto;
		.title {
			display: flex;
			justify-content: space-between;
			margin-bottom: 1.6rem;
			margin-top: 2.4rem;
			span {
				color: ${({ theme }) => theme.desktop.white};
			}
		}
		&-item {
			display: flex;
			justify-content: center;
			gap: 1.6rem;
			.card {
				border-radius: 10px;
				border: 1px solid ${({ theme }) => theme.desktop.bgCardRederralColor};
				background: ${({ theme }) => theme.desktop.bgCardRederralColor};
				padding: 0.8rem 1.6rem;
				width: 50%;
				text-align: center;
				&-title {
					font-size: 1.4rem;
					font-style: normal;
					font-weight: 400;
					line-height: 1.8rem;
					margin-bottom: 0.8rem;
				}
				&-body {
					font-size: 1.7rem;
					font-weight: 700;
					line-height: normal;
					color: #ea6118;
				}
			}
		}
	}
	.referinfo {
		display: flex;
		align-items: flex-start;
		gap: 1.6rem;
		width: 100%;
		max-width: 72.4rem;
		margin: 1.6rem auto;
		&-left {
			border-radius: 10px;
			border: 1px solid ${({ theme }) => theme.desktop.bgCardRederralColor};
			.title {
				color: ${({ theme }) => theme.desktop.white};
				font-size: 1.4rem;
				font-weight: 700;
				text-transform: uppercase;
				text-align: center;
				padding: 1.3rem 1.6rem;
				border-bottom: 1px solid
					${({ theme }) => theme.desktop.bgCardRederralColor};
			}
		}
		&-items {
			width: 50%;
		}
		&-body {
			padding: 1.6rem;
		}
		&-step {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			line-height: 1.2;
			margin-bottom: 2.4rem;
			gap: 0.8rem;
			.icon {
				width: 4rem;
				height: 4rem;
				position: relative;
				&:after {
					content: '';
					display: block;
					background: url(https://minio-api.lumigame.com/s1-nova88/desktop/img/refer-dashLine.svg)
						no-repeat center;
					padding: 5px 0px;
					width: 3px;
					height: 45px;
					position: absolute;
					top: 70px;
					left: calc(50% - 1.5px);
				}
			}
			.content {
				max-width: 25rem;
				width: 100%;
				.subtitle {
					font-size: 1.4rem;
					font-weight: 700;
					line-height: normal;
					margin-bottom: 0.4rem;
				}
				p {
					font-size: 1.2rem;
					font-weight: 400;
					line-height: normal;
					color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
					text-transform: lowercase;
				}
			}
		}
	}
`
