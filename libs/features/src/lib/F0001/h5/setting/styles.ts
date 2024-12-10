import styled from 'styled-components'

export const WrapperSettingPage = styled.div`
	.after {
		.vip-text-profile{
			font-weight: 700 !important;
			font-size: 5vw !important;
		}
		.menu-top {
			background: url(${({ theme }) =>
				theme.assetUrl}/h5/img/new-ui/menu-after-bg.webp);
				no-repeat center/cover;
			height: 42vw;
			border-radius: 0 0 20px 20px;
			background-position: top;
			.profile-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 6vw 4vw 3vw 4vw;
				> div {
					display: flex;
					align-items: center;
					gap: 1.2rem;
				}
				&-user {
					background: #d7dcef;
					width: 10vw;
					height: 10vw;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 100px;
					.icon-user-2-fill {
						&:before {
							font-size: 6.5vw;
						}
					}
				}
				.message {
					width: 10vw;
					height: 10vw;
					border-radius: 10px;
					background: #717fba;
					display: flex;
					align-items: center;
					justify-content: center;
					&.active {
						.icon {
							&:after {
								top: 0;
								left: 5vw;
								position: absolute;
								display: block;
								content: '';
								background: red;
								width: 2vw;
								height: 2vw;
								border-radius: 10px;
								-webkit-transition: all 0.2s ease-in-out;
								transition: all 0.2s ease-in-out;
								-webkit-animation: 1.5s ease 0s infinite normal none move;
								animation: 1.5s ease 0s infinite normal none move;
							}
						}
					}
					.icon {
						position: relative;
						&:before {
							font-size: 5.6vw;
							color: ${({ theme }) => theme.desktop.white};
						}
					}
				}
			}
			.group-user-name {
				.user-name {
					font-size: 3.4vw;
					font-weight: 700;
					line-height: normal;
				}
				a {
					display: flex;
					align-items: center;
					gap: 0.4rem;
					color: ${({ theme }) => theme.desktop.white};
					font-weight: 600;
					font-size: 1.2rem;
				}
			}
			&-balance {
				padding: 0 4vw;
				margin-top: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.balance-group {
					.balance-name {
						font-size: 3vw;
						font-weight: 600;
						line-height: normal;
					}
					.balance-number {
						font-size: 4.1vw;
						font-style: normal;
						font-weight: 700;
						line-height: normal;
					}
				}
				.btnGroup {
					margin-top: 0;
				}
			}
		}

		.wallet-box {
			background: ${({ theme }) => theme.desktop.rightModuleBg};
			margin: -11vw 4vw 0;
			border-radius: 15px;
			color: #0a1b38;
			border-radius: 20px;
			overflow: hidden;
			.bank-list {
				display: flex;
				justify-content: space-around;
			}
			.bank-list {
				padding: 4vw;
				> a {
					display: flex;
					flex-direction: column;
					align-items: center;
					flex: 0 0 19vw;
					line-height: 4vw;
					text-align: center;
					.icon {
						&:before {
							font-size: 6.1vw;
							color: ${({ theme }) => theme.desktop.hrefColorPrimary};
						}
					}
					> div {
						font-weight: 500;
						color: #0a1b38;
						color: ${({ theme }) => theme.desktop.white};
						margin-top: 2.5vw;
						font-size: 3.1vw;
					}
				}
			}
			.money-name {
				color: #ea6118;
				font-size: 3.4vw;
				font-weight: 700;
				line-height: normal;
			}
			.casino-wallet {
				padding : 0 4vw 4vw;
				&-item {
					background: #232B4F;
					border-radius: 10px;
					padding : 2vw;
					.money{
						display: flex;
						justify-content: space-between;
						font-weight: 500;
						margin-bottom: 2vw;
						> div{
						 	color : ${({ theme }) => theme.desktop.rightModuleSloganColor};
							font-size : 3.1vw;
						}
					}
					.group-progress{
						    display: flex;
							align-items: center;
							gap: 3vw;
						.progress{
							background: #374375;
							height: 2vw;
							border-radius: 20px;
							width: 100%;
						}
						.progress-number {
							color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
							font-size : 3.1vw;
						}
						.progress-bar {
							background : ${({ theme }) => theme.mobile.hrefColorPrimary};
							width: 50vw;
							height: 2vw;
							border-radius: 20px;
						}
					}
				}
			}
			.wallet-list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-weight: 500;
				padding: 3vw 3.5vw;
				font-size: 3.4vw;
				font-weight: 600;
				line-height: normal;
			}
			.wallet-list-item.main-wallet {
				border-bottom: 1px solid
					${({ theme }) => theme.desktop.rightModuleBorderColor};
				background: ${({ theme }) => theme.desktop.rightModuleTitleBg};
				color: ${({ theme }) => theme.desktop.white};
			}
			.wallet-list a {
				background: -webkit-gradient(
					linear,
					left top,
					right top,
					from(rgb(30, 62, 119)),
					to(rgb(50, 95, 177))
				);
				background: linear-gradient(
					90deg,
					rgb(30, 62, 119) 0%,
					rgb(50, 95, 177) 100%
				);
				padding: 2vw;
				border-radius: 50px;
				padding: 3vw;
				display: block;
				width: 100%;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				text-align: center;
			}
		}

		.profile-item .message-popup {
			position: absolute;
			right: 2vw;
    		top: 15vw;
			background: ${({ theme }) => theme.desktop.hrefColorPrimary};
			width: 35vw;
			height: 8vw;
			border-radius: 20px;
			color: ${({ theme }) => theme.desktop.white};
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
			opacity : 0.9;
			font-size : 3.1vw;
		}
		.profile-item .message-popup::before {
			position: absolute;
			display: block;
			content: '';
			border-style: solid;
			border-width: 0 6px 12px 6px;
			border-color: transparent transparent ${({ theme }) =>
				theme.desktop.hrefColorPrimary} transparent;
			top: -2vw;
			right: 4vw;
		}
		.profile-item .message-popup > div {
			width: 30vw;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}


		.menu-vip  {
			height: 25vw;
			border-radius: 15px;
			margin: 5vw 5vw 0;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			position: relative;
			overflow : hidden;
			.left{
				margin: 4vw 5.9vw 4vw 4vw;
				> div{
					 &:first-child{
						margin-bottom: 0.5vw;
						font-size : 3.1vw;
					}
					&:nth-child(2){
						font-size: 5vw;
						font-weight: 600;
					}
					&:last-child{
						font-weight: 400;
						color: white;
						margin-top: 0.5vw;
						display: flex;
						flex-wrap: wrap;
						font-size : 3.1vw;
					}
				 }
			}
			.right{
				border-radius: 50px 0 0 50px;
				padding: 2vw 3.5vw 2vw 3vw;
				display: flex;
				align-items: center;
				margin-top: 2vw;
				.dot-progress{
					float: left;
					width: 15vw;
					height: 5vw;
					margin: 0.5vw;
					text-align: center;
				}
				img{
					width: 14vw;
				}
			}
		}
		.menu-vip.nova .right {
			background: #efefef;
		}
		.menu-vip.nova .vip-text {
			color: #8d8d8d;
		}
		.menu-vip.nova .left {
			color: #8d8d8d;
		}
		.menu-vip.nova .left > div:last-child {
			color: #8d8d8d;
		}
		.menu-vip.nova .left > div:last-child div {
			color: #b9b9b9;
		}
		.menu-vip .left > div:last-child > div {
			color: #efefef;
			width: 10vw;
		}
		.menu-vip .right {
			border-radius: 50px 0 0 50px;
			padding: 2vw 3.5vw 2vw 3vw;
			display: flex;
			align-items: center;
		}
		.menu-vip .right .dot-progress .progress-now-vertical {
			background: url(${({ theme }) =>
				theme.assetUrl}/h5/img/new-ui/dot-progress.webp)
				no-repeat center;
				width: 100%;
			height: 5vw;
		}
		.menu-vip .vip-text {
			position: absolute;
			bottom: 0;
			right: 0;
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			background : #48558B;
			font-size: 3.1vw;
			font-weight: 600;
			line-height: normal;
			border-radius: 20px 0px 0px 0px;
			padding : .8vw 4vw;
			.icon{
				&:before{
					color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
					margin-left : 1vw;
				}
			}
		}
		.menu-vip .vip-text.next {
			display: flex;
			align-items: center;
		}
		.menu-vip .vip-text.next::after {
			display: block;
			content: '\\e928';
			font-family: 'S1NewIcons';
			width: 2vw;
			height: 3vw;
			margin-left: 1vw;
		}
		
		.menu-vip.infinity {
			background: url(${({ theme }) => theme.assetUrl}/h5/img/new-ui/platium-bg.webp)
				no-repeat center/cover;
		}
		.menu-vip.infinity .right {
			background: rgba(0, 0, 0, 0.10);
		}
		.menu-vip.silver {
			background: url(${({ theme }) => theme.assetUrl}/h5/img/new-ui/silver-bg.webp)
				no-repeat center/cover;
		}
		.menu-vip.silver .right {
			background: rgba(0, 0, 0, 0.10);
		}
		.menu-vip.gold {
			background: url(${({ theme }) => theme.assetUrl}/h5/img/new-ui/gold-bg.webp)
				no-repeat center/cover;
		}
		.menu-vip.gold .right {
			background: rgba(0, 0, 0, 0.10);
		}
		.menu-vip.titanium {
			background: url(${({ theme }) => theme.assetUrl}/h5/img/new-ui/titanium-bg.webp)
				no-repeat center/cover;
		}
		.menu-vip.titanium .right {
			background: rgba(0, 0, 0, 0.10);
		}
		.menu-vip.diamond {
			background: url(${({ theme }) => theme.assetUrl}/h5/img/new-ui/diamond-bg.webp)
				no-repeat center/cover;
		}
		.menu-vip.diamond .right {
			background: rgba(0, 0, 0, 0.10);
		}
		.menu-vip.vintage {
			background: url(${({ theme }) => theme.assetUrl}/h5/img/new-ui/nova-bg.webp)
				no-repeat center/cover;
		}

	
		.btn-logout {
			background: #505667;
			box-shadow: 0px -2px 0px 0px rgba(255, 255, 255, 0.40) inset;
			border-radius: 30px;
			width: 100%;
			max-width: 90vw;
			margin: 4vw auto;
			display: flex;
			justify-content: center;
			padding: 2.7vw 0;
    		font-size: 3.3vw;
		}

	}
	

	@-webkit-keyframes move {
		0% {
			opacity: 1;
		}
		10% {
			-webkit-transform: translate3d(-0.1vw, 0, 0);
			transform: translate3d(-0.1vw, 0, 0);
		}
		70% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.5vw;
			box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.5vw;
		}
		80% {
			-webkit-transform: translate3d(-0.1vw, 0, 0);
			transform: translate3d(-0.1vw, 0, 0);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.8vw;
			box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.8vw;
			opacity: 1;
		}
	}
	@keyframes move {
		0% {
			opacity: 1;
		}
		10% {
			-webkit-transform: translate3d(-0.1vw, 0, 0);
			transform: translate3d(-0.1vw, 0, 0);
		}
		70% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.5vw;
			box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.5vw;
		}
		80% {
			-webkit-transform: translate3d(-0.1vw, 0, 0);
			transform: translate3d(-0.1vw, 0, 0);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.8vw;
			box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.8vw;
			opacity: 1;
		}
	}
`
