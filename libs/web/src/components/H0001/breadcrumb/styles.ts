import styled from 'styled-components'

export const BreadcrumbContainer = styled.nav`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin: 3.88vw;
	padding-bottom: 3.88vw;
	text-transform: capitalize;
	border-bottom: 1px solid ${({ theme }) => theme.mobile.breadcrumbLineColor};

	.item {
		display: flex;
		align-items: center;
		color: ${({ theme }) => theme.mobile.breadcrumbTextColor};
		text-align: center;
		font-size: 3.39vw;
		font-weight: 400;
		white-space: nowrap;

		&.active {
			color: #fff;
		}

		& + a::before {
			font-family: 'S1NewIcons' !important;
			content: '\\e923';
			font-size: 3.88vw;
			color: ${({ theme }) => theme.mobile.breadcrumbTextColor};
		}
	}
`
