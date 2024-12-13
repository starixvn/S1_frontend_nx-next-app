import styled from 'styled-components'

export const WrapperLeaderBoardPage = styled.div`
	.rankingNew {
		min-width: ${({ theme }) => theme.desktop.minContentWidth};
		margin: 0 auto;
		background: url(${({ theme }) =>
			theme.assetUrl}/desktop/img/new-ui/leaderboard_new_bg.webp);
			no-repeat top center;
		background-position: top center;
		background-size: auto 100%;
		min-height: 102.5rem;
		@media (min-width: 1450px) {
			min-width: ${({ theme }) => theme.desktop.contentWidth};
		}
        .btnGroup-leaderBoard{
            gap : 0;
            min-width: 76.8rem;
            margin: 0;
            flex-flow: wrap;
            align-self: flex-end;
            justify-content: flex-start;
            border-radius : 20px 20px 0 0;
            overflow : hidden;
            border-bottom : 1px solid ${({ theme }) =>
							theme.desktop.rightModuleBorderColor};
            button {
                white-space: nowrap;
                width: min-content;
                min-height : 4.8rem;
                flex: auto;
                background : #0F1428;
                border-radius : 0;
                &.active{
                    background: linear-gradient(0deg, #717FBA 0%, #A2AFE5 100%);
                }
            }
        }
        section{
            flex-flow: column;
            padding: 4rem 0;
            a{
                color: #f77900;
		        text-decoration: underline;
            }
            .champion,
            .eventRule,
            .lastevent {
                display: flex;
                flex-flow: column;
                line-height: 30px;
                width: 768px;
                align-self: flex-end;
                border-radius: 0 0 20px 20px;
                box-sizing: border-box;
                padding: 1.6rem;
                min-height: 72.5rem;
                position: relative;
                .title{
                    font-size: 2.5rem;
                    margin: 0 auto;
                    text-align: center;
                    font-weight : 700;
                    color :  ${({ theme }) => theme.desktop.white};
                    > div{
                        font-weight: 400;
                        color :  ${({ theme }) =>
													theme.desktop.rightModuleSloganColor};
                     }
                }
            }
            .rankList {
                background: ${({ theme }) => theme.desktop.rightModuleTitleBg};
                width: calc(100% - 3rem);
                text-align: center;
                padding: 0 1.6rem 1.2rem;
                max-height: unset;
                margin-top: 1.6rem;
                border-radius: 20px; 
                .title {
                    margin: 20px auto 5px;
                    font-size: 1.7rem;
                }
            }
			.lastevent,.champion{
				padding-top : 0;
				.rankList{
					padding-top : 1.2rem;
                    overflow: auto;
                    max-height: 66rem;
                    overflow-x: hidden;
					ul{
						li{
							div{
								min-width: 15rem;
							}
						}
					}
				}
				
			}
			.champion{
				.custom-nodata{
					border-top : none;
				}
			}
        }
        ul{
            li {
                display: flex;
                align-items: center;
                border-radius: 100px;
                margin-bottom: 10px;
                min-height: 4.2rem;
                color :  ${({ theme }) => theme.desktop.white};
                background : #182043;
                &:first-child {
                    align-items: flex-end;
                    height: 30px;
                    min-height: auto;
                    margin: 0;
                    border: 0;
                    font-size: 1.2rem;
                    color :  ${({ theme }) => theme.desktop.white};
                    background : none;
                    div {
                        font-size: 1.2rem;
                        display: flex;
                        align-items: flex-end;
                        justify-content: center;
						color : ${({ theme }) => theme.desktop.white};
                        &:first-child {
                            display: flex;
                            align-items: center;
                            min-width: 11rem;
                        }
                    }
                }
				&.userRank{
					background : #374375;
					> div{	
					 	color : #fff;
					 }
				}
                div {
                    padding: 0 1.5rem;
                    text-align: center;
                    font-weight: bold;
					color :  ${({ theme }) => theme.desktop.rightModuleSloganColor};
					min-width: 20rem;
					text-align : center;
					font-size: 1.2rem;
					text-transform: uppercase;
					&:first-child{
						flex: 1;
						display: flex;
						align-items: center;
						img{
							 min-width: 2.4rem;
							margin-right: 1rem;
							width: auto;
							max-height: 2.4rem;
							display: unset;
						}
					}
                }
            }
        }
	}
	.lastUpdate {
		font-size : 1.4rem;
		margin-top : 1.6rem;
		color :  ${({ theme }) => theme.desktop.rightModuleSloganColor};
		font-weight: 500;
		> div{
		 	&:last-child{
				color :  ${({ theme }) => theme.desktop.hrefColorPrimary};
			}
		 }
	}
	.rankingNew section > .btnGroup ~ div {
		display: none;
		background: #0F1428;
		min-height: 80rem;
	}
	.rankingNew section > .btnGroup ~ div.active {
		display: flex;
	}
	.rankingNew + footer .footerList > div a ~ div {
		display: none;
	}
	.rankTag{
		.btnGroup{
			margin : 0 -1.6rem;
			border-bottom : 1px solid ${({ theme }) =>
				theme.desktop.rightModuleBorderColor};
			button{
				min-height: 4.8rem;
				border-radius : 0;
				font-size: 1.4rem;
				text-transform: uppercase;
				&.active{
					color : ${({ theme }) => theme.desktop.hrefColorPrimary};
					border-bottom : 2px solid ${({ theme }) => theme.desktop.hrefColorPrimary};
				}
			}
		}
		.inputBox-blue{
			max-width : 20rem;
		}
	}
	#Loading{
		position : absolute;
	}
`
