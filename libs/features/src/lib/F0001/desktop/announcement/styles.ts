import styled from 'styled-components'

export const WrapperAnnountMent = styled.div`
	.announcement {
		.list {
			.group-list {
				border-radius: 8px;
				overflow: hidden;
				border: 1px solid
					${({ theme }) => theme.desktop.borderCardRederralColor};
				font-size: 1.4rem;
				font-weight: 600;
				line-height: normal;
				margin-bottom: 1.6rem;
				&:last-child {
					margin-bottom: 0;
				}
				.listHeader {
					display: flex;
					padding: 1.5rem 1.6rem;
					justify-content: space-between;
					border-bottom: 1px solid
						${({ theme }) => theme.desktop.borderCardRederralColor};
				}
				.listBody {
					padding: 1.6rem;
					font-size: 1.4rem;
					font-weight: 400;
					line-height: normal;
					color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				}
			}
		}
	}
`
