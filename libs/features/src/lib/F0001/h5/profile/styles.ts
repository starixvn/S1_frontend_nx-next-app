import styled from 'styled-components'

export const WrapperVerificationH5 = styled.div`
	.vip_mark {
		margin: auto;
		position: relative;
		text-align: center;
		width: min-content;
		img {
			width: 32vw;
			z-index: 1;
			position: relative;
		}
		div {
			background: #112240;
			padding: 1vw;
			margin-top: 3.1vw;
			border-radius: 15px;
			color: ${({ theme }) => theme.desktop.white};
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
`
