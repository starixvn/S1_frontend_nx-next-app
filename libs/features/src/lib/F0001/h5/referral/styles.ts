import styled from 'styled-components'

export const WrapperReferFrendsH5 = styled.div`
	.referral {
		padding: 0 0 20vw 0;
		width: 100%;
		.title {
			font-size: 4.5vw;
			color: #112240;
			text-align: center;
			padding: 8vw 0 5.5vw 0;
		}
		.subtitle {
			color: #112240;
			font-weight: bold;
			margin-bottom: 10px;
			font-size: 3.5vw;
		}
		.referral-topbanner {
			display: block;
		}
		.referstatus,
		.referinfo {
			text-align: center;
			position: relative;
			padding: 0 4.5vw;
		}
		&.recent {
			padding-right: 4vw;
			padding-left: 4vw;
		}
	}

	.custom-box {
		background: ${({ theme }) => theme.mobile.rightModuleBg};
		border-radius: 20px;
		overflow: hidden;
		margin-bottom: 3.4vw;
		&-title {
			background: ${({ theme }) => theme.mobile.rightModuleTitleBg};
			padding: 3.1vw 4.1vw;
			border-bottom: 1px solid
				${({ theme }) => theme.mobile.rightModuleBorderColor};
			text-align: left;
			font-size: 3.4vw;
			font-weight: 700;
		}
		&-body {
			padding: 4.1vw;
		}
	}

	.referstatus-item {
		.card {
			margin-bottom: 2.9vw;
			border-radius: 10px;
			border: 1px solid ${({ theme }) => theme.mobile.rightModuleBorderColor};
			background: ${({ theme }) => theme.mobile.rightModuleTitleBg};
			padding: 2vw 4.1vw;
			&:last-child {
				margin-bottom: 0;
			}
			&-title {
				font-size: 3.4vw;
				font-weight: 400;
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				margin-bottom: 2vw;
			}
			&-body {
				font-size: 4.1vw;
				font-weight: 700;
				color: ${({ theme }) => theme.mobile.hrefColorPrimary};
				span {
					margin-right: 1vw;
				}
			}
		}
	}

	.referinfo-step {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		line-height: 1.2;
		margin-bottom: 6.1vw;
		gap: 2vw;

		&-body {
			text-align: left;
			.subtitle {
				color: ${({ theme }) => theme.mobile.white};
				font-size: 3.4vw;
				font-weight: 700;
				margin-bottom: 1vw;
			}
			p {
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				margin-bottom: 0;
				font-size: 2.9vw;
			}
		}
	}
	.referinfo-step .icon {
		width: 10vw;
		height: 10vw;
		position: relative;
	}
	.referinfo-step .icon > img {
		width: 10vw;
		height: 10vw;
	}
	.referinfo-step .icon::after {
		content: '';
		display: block;
		padding: 1vw 0;
		height: 10vw;
		position: absolute;
		top: 10vw;
		left: calc(50% - 0vw);
		border: 1px dashed #374375;
	}
	.referinfo-step:last-child .icon::after {
		display: none;
	}
	.referinfo-list {
		margin-bottom: 4.1vw;
		padding: 0 0.8vw;
		text-align: center;
		.subtitle {
			font-size: 3.4vw;
			font-style: normal;
			font-weight: 600;
			color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			text-align: left;
		}
	}
	.referinfo-list .inputcopy {
		position: relative;
	}
	.referinfo-list .inputcopy input {
		color: ${({ theme }) => theme.mobile.white};
		font-size: 3.2vw;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.qr-code-group {
		text-align: left;
		background: ${({ theme }) => theme.mobile.white};
		padding: 1vw;
		border-radius: 10px;
		width: 128px;
	}

	.referinfo-list .inputcopy::after {
		content: '';
		display: inline-block;
		background: url(https://minio-api.lumigame.com/s1-nova88/h5/img/icon-copy.svg)
			no-repeat center/5vw 5vw;
		width: 5vw;
		height: 5vw;
		position: absolute;
		right: 2.3vw;
		bottom: calc(50% - 2.5vw);
		cursor: pointer;
	}
	.referinfo-list-qr {
		width: 90px;
		padding: 2px;
		border: 1px solid rgba(180, 180, 180, 0.9333333333);
		border-radius: 3px;
	}
	.referinfo-share {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 2vw;
	}
	.referinfo-share img {
		width: 8.7vw;
	}
`
