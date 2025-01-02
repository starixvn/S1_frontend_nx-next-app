import styled from 'styled-components'

export const WrapperWithdrawalH5 = styled.div`
	.withdrawal{
		padding : 5vw 4vw 35vw 4vw;
	}
	.header-waiting {
		.title {
			font-size: 4.1vw;
			font-weight: 700;
			background: #0f1428;
			border-bottom: 1px solid #374375;
			height: 14.8vw;
		}
	}
	.kyc-text {
		text-align: center;
		margin: 3vw 0;
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
		&.title {
			font-size: 4.1vw;
			font-weight: 700;
		}
	}
	.icon-noti {
		width: 10vw;
		height: 10vw;
		margin: auto;
		border-radius: 100px;
		border: 6px solid #1d2447;
		background: #232b4f;
		display: flex;
		align-items: center;
		justify-content: center;
		.icon {
			&:before {
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				font-size: 7.8vw;
			}
		}
	}
	.vip_mark {
		margin: auto;
		position: relative;
		text-align: center;
		max-width: 35vw;
		&.infinity {
			div {
				background: ${({ theme }) => theme.desktop.gradeNovaBg};
			}
		}
		&.vintage {
			div {
				background: ${({ theme }) => theme.desktop.gradeVintageBg};
			}
		}
		&.silver {
			div {
				background: ${({ theme }) => theme.desktop.gradeSilverBg};
			}
		}
		&.gold {
			div {
				background: ${({ theme }) => theme.desktop.gradeGoldBg};
			}
		}
		&.titanium {
			div {
				background: ${({ theme }) => theme.desktop.gradeTitaniumBg};
			}
		}
		&.diamond {
			div {
				background: ${({ theme }) => theme.desktop.gradeDiamondBg};
			}
		}
		img {
			width: 25vw;
			z-index: 1;
			position: relative;
			margin: 0 auto;
		}
		div {
			background: #112240;
			padding: 1vw;
			margin-top: 3.1vw;
			border-radius: 15px;
			color: ${({ theme }) => theme.mobile.white};
			font-size: 3.1vw;
			font-weight: 700;
			line-height: normal;
		}
		.circleAnimation {
			display: flex;
			z-index: 0;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 15vw;
			height: 15vw;
			border-radius: 100%;
			&:before {
				width: 28vw;
				height: 28vw;
			}
			&:after {
				width: 24vw;
				height: 24vw;
				background: #112240;
			}
		}
	}
	.name {
		font-size: 3.5vw;
		font-weight: bold;
		text-align: center;
		margin: 2vw 0;
		color: ${({ theme }) => theme.mobile.white};
	}
	.name + .text-org {
		text-align: center;
		font-size: 2.9vw;
		font-weight: 400;
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
	}
	.icon-member {
		background: ${({ theme }) => theme.mobile.rightModuleBg};
		padding: 3vw;
		width: 13vw;
		height: 13vw;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100%;
		margin: 0 auto;
		position: relative;
	}
	.icon-member:before {
		font-size: 10vw;
		z-index: 1;
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
	}
	.icon-member .circleAnimation {
		display: flex;
		z-index: 0;
		top: auto;
	}
	.icon-member .circleAnimation:before {
		width: 26vw;
		height: 26vw;
	}
	.icon-member .circleAnimation:after {
		width: 22vw;
		height: 22vw;
		background: #112240;
	}
	.important {
		flex: 0 0 21.8rem;
		border-radius: 20px;
		padding: 2rem 1.6rem;
		background: ${({ theme }) => theme.desktop.importantBg};
		.title {
			text-align: center;
			margin-bottom: 0.8rem;
			font-size: 1.4rem;
			font-weight: 700;
			line-height: normal;
			color: ${({ theme }) => theme.desktop.inputBorderColorError};
			display: flex;
			align-items: center;
			gap: 0.8rem;
			justify-content: center;
			.icon {
				&:before {
					font-size: 2rem;
					color: ${({ theme }) => theme.desktop.inputBorderColorError};
				}
			}
		}
		ul {
			li {
				font-size: 1.2rem;
				font-weight: 400;
				line-height: 2rem;
				color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				a,
				span {
					color: #1b5bff;
					font-weight: 600;
				}
			}
		}
	}
	.balanceModule {
		display: flex;
		justify-content: space-between;
		margin: 3vw 0;
		gap: 2vw;
		.spin-button {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: space-between;
			background: #232b4f;
			border-radius: 5px;
			padding: 1vw 2vw;
			color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			font-weight: 600;
			font-size: 3.4vw;
			.icon {
				&:before {
					color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				}
			}
			&.active {
				.icon {
					animation: reload 1s ease;
				}
			}
		}
		.btn-secondary {
			min-width: 30vw;
			border-radius: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
			.icon {
				&:before {
					font-size: 4.5vw;
				}
			}
		}
	}
	.group-withdrawal {
		border-radius: 20px;
		background: ${({ theme }) => theme.mobile.rightModuleBg};
		padding: 3.9vw;
		.selectBank {
			display: flex;
			flex-direction: column;
			.btn-add-bank{
				width : 100%;
				background : #374375;
				margin-top : 2.9vw;
				border-radius: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
				.icon{
					&:before{
						color : ${({ theme }) => theme.mobile.rightModuleSloganColor};
						font-size: 10vw;
					}
				}
			}
		}
		.group-block-gird {
			display: flex;
			align-items: flex-start;
			gap: 4vw;
			flex-direction: column;
		}
		.block-grid {
			display: flex;
			gap: 2vw;
			align-items: center;
			position : relative;
			overflow: hidden;
			border-radius: 10px;
			.mask{
				position: absolute;
				background: rgba(55, 67, 117, 0.70);
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				z-index: 9;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 2.9vw;
				font-weight: 700;
			}
		}
		.bankName {
			height: 11.6vw;
			width: 11.6vw;
			background: ${({ theme }) => theme.mobile.rightModuleTitleBg};
			border-radius: 10px;
			padding: 0 0 0;
			margin: auto;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			overflow: hidden;
			img {
				border-radius: 10px;
			}
			.check {
				display: none;
			}
			&.active {
				border: 2px solid ${({ theme }) => theme.mobile.hrefColorPrimary};
				.icon {
					&:before {
						color: ${({ theme }) => theme.mobile.white};
					}
				}
				.check {
					display: flex;
					background: ${({ theme }) => theme.mobile.hrefColorPrimary};
					width: 4.4vw;
					height: 4.4vw;
					align-items: center;
					justify-content: center;
					position: absolute;
					right: -3px;
					bottom: -3px;
					border-radius: 5px;
					.icon {
						&:before {
							font-size: 3.1vw;
						}
					}
				}
			}
			.icon {
				&:before {
					font-size: 6vw;
					color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				}
			}
		}
		.subtitle {
			margin-top: 0;
			grid-column: 2 / 4;
			grid-row: 1;
			text-align: left;
			color: ${({ theme }) => theme.mobile.white};
			font-size: 3.4vw;
			max-width: 70vw;
			font-weight: 700;
		}
		.subinfo {
			grid-column: 2 / 4;
			grid-row: 2;
			text-align: left;
		}
		.group-subtitle {
			width: 60vw;
		}
	}
	.inputBox-blue {
		margin-top: 0;
	}
	.formula {
		border-radius: 3px;
		color: #5574a7;
		padding: 3.4vw 0;
		border-top: 1px solid #374375;
		margin-top: 3.4vw;
	}
	.formula > div {
		display: flex;
		justify-content: space-between;
		gap: 0.8rem;
	}
	.formula > div > div {
		flex: 1;
		display: flex;
		justify-content: center;
		flex-flow: column;
		font-weight: bold;
		font-size: 6vw;
		text-align: center;
		color: #939dc5;
	}
	.formula > div > div:nth-child(2) {
		font-size: 3vw;
		flex: 19;
		background: #232b4f;
		text-align: left;
		border-radius: 3px;
		margin-bottom: 2vw;
		padding: 2vw 3vw;
	}
	.formula > div > div:nth-child(2) > div:nth-child(1) {
		font-weight: normal;
	}
	.formula > div > div:nth-child(2) > div:nth-child(2) {
		color: #939dc5;
	}
	.formula > div > div:nth-child(2) > div:nth-child(2) span {
		color: ${({ theme }) => theme.desktop.hrefColorPrimary};
		margin: 0 0 0 1vw;
		font-size: 3.4vw;
	}
	.text-org,.text {
		font-size: 2.9vw;
		margin-top: 1vw;
		color: #7883b4;
		span {
			color: #FF4040;
			margin-right: 1vw;
		}
	}
	.recent{
		margin -bottom : 4vw;
	}
	.icon-module{
		.icon-information-fill{
			&:before{
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			}
		}
		.icon-close-line{
			&:before{
				color : #FF4040;
			}
		}
		.icon-check{
			&:before{
				color : #01B901;
			}
		}
	}
	.recentBtn{
		min-height : 8vw;
	}
	.submit-photo{
		.title{
			justify-content: flex-start;
			padding-left: 5vw;
			.icon{
				margin-right : 3vw;
				&:before{
					font-size : 7vw;
				}
			}
		}
		.inputBox {
			width: 22vw;
			height: 18vw;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			border-radius: 10px;
			border: 1px solid #374375;
			background: #1D2447;
			overflow: hidden;
			.icon {
				&:before{
					color: #939DC5;
					font-size: 6.1vw;
				}
			}
		}
		.text-org {
			text-align : left;
			display : block;
			margin : 3vw 0;
			color  :  ${({ theme }) => theme.mobile.white};
			font-size: 4.1vw;
			font-weight : 700;
		}
		.kyc-bottom{
			.title{
				padding-left : 0;
				text-align : left;
				display : block;
				margin : 3vw 0;
				color  :  ${({ theme }) => theme.mobile.white};
				font-size: 4.1vw;
				font-weight : 700;
			}
			ul{
				list-style : none;
				margin-left: 4vw;
				li{
					color: #939DC5;
					position: relative;
					&:after{
						content: '';
						display: block;
						width: 3px;
						height: 3px;
						position: absolute;
						left: -10px;
						top: 8px;
						background: #939DC5;
					}
				}
			}
		}
	}
`
