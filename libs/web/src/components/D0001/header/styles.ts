import styled from "styled-components";

export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-self: stretch;
	background: ${({ theme }) => theme.desktop.headerBg};
`

export const LogoContainer = styled.div`
	width: 110px;
	height: 46px;
`
export const FunctionContainer = styled.div`
	display: flex;
`
