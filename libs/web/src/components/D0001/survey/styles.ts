import styled from 'styled-components'

export const WrapperServey = styled.div`
	#survey {
		position: fixed;
		bottom: 35px;
		right: 70px;
		width: 345px;
		border-radius: 10px;
		color: white;
		z-index: 5;
		transition: 0.5s;
	}
	#survey .survey-icon-btn {
		position: absolute;
		bottom: 60px;
		right: -60px;
		display: flex;
		align-items: center;
		background: #7883b4;
		border-radius: 100%;
		align-items: center;
		justify-content: center;
		width: 5.2rem;
		height: 5.2rem;
		box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.5);
		.icon {
			&:before {
				font-size: 2.8rem;
			}
		}
	}
	#survey .survey-box {
		position: absolute;
		bottom: 45px;
		right: -60px;
		visibility: hidden;
		background: #0f1428;
		border-radius: 10px;
		width: 400px;
		opacity: 0;
		box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.5);
	}
	#survey .survey-box.active {
		opacity: 1;
		-webkit-transition: all 1s ease;
		transition: all 1s ease;
		visibility: visible;
	}
	#survey .survey-before {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 4rem 2.8rem;
	}
	#survey .survey-before > div:nth-child(1) {
		color: #0a1b38;
		font-size: 17px;
		font-weight: 600;
		text-align: left;
		width: 100%;
	}
	#survey .survey-before > div:nth-child(2) {
		text-align: left;
		width: 100%;
		font-size: 1.7rem;
		font-weight: 700;
		line-height: normal;
		color: ${({ theme }) => theme.desktop.white};
		margin-bottom: 0.8rem;
	}

	#survey .survey-before > div:nth-child(3) {
		text-align: left;
		font-size: 1.4rem;
		font-style: normal;
		font-weight: 400;
		line-height: 1.8rem;
		color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
		margin-bottom: 2.4rem;
	}
	#survey .survey-before fieldset {
		border: medium none;
		min-width: 100%;
		padding: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#survey .survey-before fieldset textarea {
		width: 100%;
		height: 150px;
		border: none;
		background: #232b4f;
		padding: 10px 0 10px 8px;
		max-width: 100%;
		resize: none;
		border-radius: 5px;
		font-size: 1.4rem;
		color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
	}
	#survey .survey-before fieldset textarea::placeholder {
		color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
		font-family: ${({ theme }) => theme.desktop.fontFamily};
	}
	#survey .survey-before fieldset textarea:focus {
		outline: 0;
	}
	#survey .survey-before fieldset:nth-child(2) {
		margin-top: 25px;
	}
	#survey .survey-before fieldset .tip {
		display: none;
	}
	#survey .survey-before fieldset .tip.active {
		display: block;
		color: red;
		width: 100%;
		text-align: left;
	}
	#survey .survey-before fieldset.error textarea {
		border: 2px solid red;
	}
	#survey .survey-before fieldset.error input {
		border: 2px solid red;
	}
	#survey .survey-before .survey-input {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#survey .survey-before .survey-btn {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: right;
	}
	#survey .survey-before.close {
		display: done;
	}
	#survey .survey-after {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 8rem 3rem;
	}
	#survey .survey-after .icon {
		border: 6px solid #1d2447;
		background: #232b4f;
		border-radius: 100px;
		height: 52px;
		width: 52px;
		display: flex;
		align-items: center;
		justify-content: center;
		&:before {
			font-size: 3.2rem;
		}
	}
	#survey .survey-after .icon-close {
		position: absolute;
		background: rgba(128, 128, 128, 0.5803921569);
		color: white;
		border-radius: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 32px;
		width: 32px;
		font-size: 14px;
		right: 15px;
		top: 15px;
	}
	#survey .survey-after .icon-close:hover {
		background: rgba(171, 171, 171, 0.6);
	}
	#survey .survey-after > div:nth-child(2) {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #0a1b38;
		font-weight: 600;
		text-align: left;
	}
	#survey .survey-after > div:nth-child(2) > div {
		font-size: 1.4rem;
		color: ${({ theme }) => theme.desktop.white};
		margin: 0.8rem 0;
	}
	#survey .survey-after > div:last-child {
		color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
		font-size: 1.4rem;
		text-align: center;
		font-weight: 400;
	}
	#survey .survey-after.close {
		display: none;
	}
	.icon-close-line {
		position: absolute;
		right: 15px;
		top: 20px;
		cursor: pointer;
		&:before {
			font-size: 2.4rem;
		}
	}
	.group-input {
		display: flex;
		width: 100%;
	}
	.btnGroup {
		width: 100%;
	}
	.icon-like {
		margin-bottom: 2.4rem;
	}
`
