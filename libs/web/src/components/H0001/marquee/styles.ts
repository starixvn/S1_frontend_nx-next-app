import styled from 'styled-components'

export const HomeMarquee = styled.div`
	background: ${({ theme }) => theme.mobile.marqueeMessageBg};
	display: flex;
	align-items: center;
	width: 100%;
	overflow: hidden;
	padding: 2vw 0 1vw;
	position: relative;
	z-index: 1;

	.marquee-box {
		width: 95vw;
		height: 8vw;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		display: flex;
		overflow: hidden;
		margin-right: 2vw;

		.marquee-run {
			position: absolute;
			white-space: nowrap;
			margin-left: 19vw;

			button {
				-webkit-text-size-adjust: 100%;
				padding: 1vw;
				color: ${({ theme }) => theme.mobile.marqueeMessageColor};
			}
			&-container {
				overflow-x: hidden !important;
				display: flex !important;
				flex-direction: row !important;
				position: relative;
				width: 100%;
			}
		}
		&::before {
			display: block;
			content: 'NEW';
			background: #fff;
			border-radius: 24vw;
			padding: 0.7vw 2.6vw;
			margin-left: 3.8vw;
			color: #e13c29;
			font-size: 3.1vw;
			font-weight: 700;
			z-index: 1;
		}
	}
	// > div.active {
	// 	width: calc(100% - 5vw);
	// 	animation-name: marquee;
	// 	animation-duration: 4600ms;
	// 	animation-iteration-count: infinite;
	// }
	.btn-more {
		color: #9c9c9c;
		text-decoration: underline;
		font-weight: 600;
		margin-right: 2vw;
	}
`
