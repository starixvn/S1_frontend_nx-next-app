import styled from 'styled-components'

export const HeaderTop = styled.div`
	display: flex;
	height: 76px;
	padding: 14px 260px;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	background: ${({ theme }) => theme.desktop.headerBg};
	color: ${({ theme }) => theme.desktop.headerColor};

	input {
		display: flex;
		padding: 10px 24px 10px 12px;
		flex-direction: column;
		align-items: flex-start;
		gap: 30px;
		align-self: stretch;
		border-radius: 100px;
		background: ${({ theme }) => theme.desktop.headerInputBg};
		color: ${({ theme }) => theme.desktop.headerInputColor};
		font-size: 14px;

		&::placeholder {
			color: $inputword;
			text-align: center;
		}
		&:-webkit-autofill {
			box-shadow: 0 0 0px 1000px #0a1b38 inset;
			-webkit-text-fill-color: white;
		}

		&:focus-within {
			border: 1px solid $inputborder;
			outline: $inputborder;
		}
	}
`
