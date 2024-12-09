import styled from 'styled-components'

export const WrapperSurvayH5 = styled.div`
	.inputBox-blue {
		margin-top: 0;
		color: #939dc5;
	}
	main {
		padding: 5vw 0vw 40vw 0vw;
	}
	.survey {
		width: 100%;
		background: none;
		&-before {
			padding: 0 4.1vw;
		}
		.heading-survey {
			color: ${({ theme }) => theme.desktop.white};
			font-size: 4.5vw;
			font-weight: 700;
			line-height: normal;
			text-align: center;
			margin-bottom: 3vw;
		}
		.slogan-survey {
			color: #939dc5;
			font-weight: 400;
			font-size: 3.6vw;
		}
	}
	.survey,
	.survey * {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	.survey-before {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 6vw;
	}
	.survey-before .survey-input {
		margin-top: 3vw;
	}
	.survey-before fieldset {
		border: none;
		min-width: 100%;
		padding: 0;
		width: 100%;
		margin-top: 3vw;
	}
	.survey-before fieldset textarea {
		width: 100%;
		padding: 3vw;
		height: 50vw;
		max-width: 100%;
		resize: none;
		border-radius: 2vw;
		background: #232b4f;
		border: none;
		color: #939dc5;
		font-family: 'Montserrat', sans-serif;
	}
	.survey-before fieldset textarea::placeholder {
		color: #7883b4;
		font-size: 3.5vw;
		font-family: 'Montserrat', sans-serif;
	}
	.survey-before fieldset textarea:focus {
		outline: 0;
		border: none;
	}

	.survey-before fieldset .tip {
		display: none;
	}
	.survey-before fieldset .tip.active {
		display: block;
		color: red;
	}
	.survey-before fieldset.error textarea {
		border: 2px solid red;
	}
	.survey-before fieldset.error input {
		border: 2px solid red;
	}

	.survey-after {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.survey-after.close {
		display: none;
	}

	.icon-survey {
		width: 14vw;
		height: 14vw;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100px;
		border: 6px solid #1d2447;
		background: #232b4f;
		margin: auto;
		.icon {
			&:before {
				font-size: 8vw;
			}
		}
	}
	.thank-box {
		padding: 4vw 4vw;
		text-align: center;
		&-heading {
			font-size: 4.4vw;
			font-weight: 700;
			color: ${({ theme }) => theme.desktop.white};
			margin-bottom: 3vw;
		}
		&-body {
			font-size: 3.5vw;
			font-weight: 400;
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
		}
	}
`
