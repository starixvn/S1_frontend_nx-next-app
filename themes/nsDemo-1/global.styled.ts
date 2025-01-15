import { createGlobalStyle } from 'styled-components'

export const GlobalStylesNsDemo1 = createGlobalStyle`
  /* Reset UI */
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */

  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul,li {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote {
    &:before, &:after {
      content: '';
      content: none;
    }
  }

  q {
    &:before, &:after {
      content: '';
      content: none;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button{
    background: transparent;
    border: none;
    padding:0;
    outline:none;
    cursor: pointer;
    font-family: ${({ theme }) => theme.desktop.fontFamily};
  }

  pre{
    white-space: break-spaces;
  }

  a{
    text-decoration: none;
    color: #5574A7;
    cursor: pointer;
  }

  img{
    width:100%;
    display: block;
    height: auto;
  }

  /* Common Class */

  .block {
    display: block
  }

  .inline-block {
      display: inline-block
  }

  .inline {
      display: inline
  }

  .flex {
      display: flex
  }

  .inline-flex {
      display: inline-flex
  }

  .flex-auto {
      flex: 1 1 auto
  }

  .grid {
      display: grid
  }

  .flex-auto {
      flex: 1 1 auto
  }


  html {
    font-size: 10px !important;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  input[type="password"]::-ms-reveal,
  input[type="password"]::-ms-clear {
    display: none;
  }


   #Loading{ 
    width : 100%;
    height : 100%;
    z-index : 9999;
    background: #0000005d;
  }

  body, main {
    background: ${({ theme }) => theme.desktop.primary};
    font-family: ${({ theme }) => theme.desktop.fontFamily};
    font-size: 1.4rem;
    color: ${({ theme }) => theme.desktop.white};
  }

  .main-content {
    min-width: ${({ theme }) => theme.desktop.minContentWidth};

    @media (min-width: 1450px) {
      min-width: ${({ theme }) => theme.desktop.contentWidth};
    }
  }

  .content-container {
    width:${({ theme }) => theme.desktop.minContentWidth};
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 1450px) {
      width: ${({ theme }) => theme.desktop.contentWidth};
    }
  }
  #popup {
      background: rgba(0, 0, 0, 0.6);
      position: fixed;
      z-index: 99;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      &::-webkit-scrollbar-track{
          background: rgba(0, 0, 0, 0.2);
      }
      &::-webkit-scrollbar-thumb{
        background: rgba(125, 125, 125, 0.7);
      }
      &.active{
        display : flex;

      }
      .pop{
        border-radius: 20px;
        max-height: calc(100% - 160px);
        box-shadow: ${({ theme }) => theme.desktop.popupBoxShadow};
        background : ${({ theme }) => theme.desktop.popupBg};
        position : relative;
        .close-popup{
          position : absolute;
          cursor: pointer;
          top: 20px;
          right: 20px;
          &:before{
            font-size : 2.4rem;
          }
        }
        .icon-notifi{
          border-radius: 100px;
          border: 6px solid ${({ theme }) =>
						theme.desktop.borderIconNotifiCationColor};
          background: ${({ theme }) => theme.desktop.bgIconNotifiCationColor};
          width : 4.8rem;
          height : 4.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom : 2.4rem;
          &:before{
            font-size : 3.2rem;
            color : ${({ theme }) => theme.desktop.iconNotifiCationColor} 
          }
        }
        .notifi-content{
          margin-top : 1.6rem;
          > div {
            font-size: 1.4rem;
            font-style: normal;
            font-weight: 400;
            text-align : center;
            margin-bottom : .5rem;
            line-height: 1.8rem;
            &:last-child{
              margin-bottom : 0;
            }
          }
        }
        .title{
          color: ${({ theme }) => theme.desktop.white};
          font-size: 1.7rem;
          font-weight: 700;
          line-height: normal;
          margin-bottom : .8rem;
        }
        .error-content{
          font-size: 1.4rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1.8rem;
        }
        .Success, ,poker,
        .duitnowPop,
        .angpaopop,
        .friend,
        .Cancel,
        .uploadSuccess,
        .updateSuccess,
        .Success,
        .tokyc,
        .addBankpop,
        .addAddresspop,
        .changePassWordpop,
        .editSuccess,
        .joinSuccess,
        .resetPassWordpop,
        .noticepop,.statuspop,.bankSlip{
          min-width: 40rem;
          padding: 4rem 2.8rem 2.8rem 2.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          .btnGroup{
            margin-top : 2.4rem;
            min-width : 20rem;
            button{
              width: 100%;
            }
          }
        }
        .loackAmount{
          .title{
            text-align : center;
            margin : 1rem 0;
          }
        }
      }
      .do-you-have {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: normal;
        margin-top: 0.8rem;
        color: #939dc5;
      }
      .resend{
        .btnGroup{
          justify-content: center;
          margin-top : .8rem !important;
          button{
            width : max-content !important;
          }
          .icon{
            &:before{
              font-size : 1.6rem;
            }
          }
        }
      }
    }

  .mobile-h5{
    .pop{
      min-width : unset !important;
      max-width: 80vw;
      width : 100%;
      padding-left: 6.79vw !important;
      padding-right: 6.79vw !important;

      .popTit{
        font-size: 4.1vw;;
        font-weight: 700;
        line-height: normal;
        color: ${({ theme }) => theme.mobile.white};
        margin-bottom : 2vw;
      }
      .txt{
        font-size : 3.1vw;
        margin-top : 1.5vw;
        color: ${({ theme }) => theme.mobile.white};
        font-weight: 400;
      }
    }
    .Success, ,poker,
        .duitnowPop,
        .angpaopop,
        .friend,
        .Cancel,
        .uploadSuccess,
        .updateSuccess,
        .Success,
        .tokyc,
        .addBankpop,
        .addAddresspop,
        .changePassWordpop,
        .editSuccess,
        .joinSuccess,
        .resetPassWordpop,
        .noticepop,.statuspop{
          min-width : unset !important;
        }
  }


  .promoInfoPop{
    max-height: calc(100% - 160px);
    overflow-y: auto;
    box-shadow: ${({ theme }) => theme.desktop.popupBoxShadow};
    background : ${({ theme }) => theme.desktop.popupBg};
    position : relative;
    width: 80rem;
    padding: 4rem 2.8rem 2.8rem 2.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    .btnGroup{
      margin-top : 2.4rem;
      min-width : 20rem;
      button{
          width: 100%;
      }
    }
    .icon-close,.icon-close-line{
      position: absolute;
      top: 10px;
      right: 20px;
      &:before{
        font-size : 2rem;
      }
    }
    .icon-gift{
      border: 6px solid rgba(234, 97, 24, 0.30);
      border-radius: 100px;
      overflow : hidden;
      width : 4.8rem;
      height : 4.8rem;
      margin-bottom : 2.4rem;
      .icon-gift-fill{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4.8rem;
        height: 4.8rem;
        background: ${({ theme }) => theme.desktop.hrefColorPrimary};
        &:before{
          font-size : 3.2rem;
        }
      }
    }

  }
  .tip {
    margin-top: 0.4rem;
    padding: 0;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: normal;
    color: ${({ theme }) => theme.desktop.tipColor};
  }
  .inputModule {
    margin-top: 0;
    .inputBox-row {
      display: flex;
      gap: 1.6rem;
      .inputBox-blue {
        width: 50%;
      }
    }
  }
  .inputBox-blue {
    min-height: 3.6rem;
    padding: 0 1.2rem;
    border-radius: 100px;
    background: ${({ theme }) => theme.desktop.inputBg};
    border: none;
    margin-top: 1.6rem;
    display: flex;
    align-items: center;
    position: relative;
    .icon {
      height: 2rem;
      width: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &:before {
        color: ${({ theme }) => theme.desktop.white};
        font-size: 1.8rem;
        margin: 0;
      }
    }
    .dropdown {
      .btn {
        color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
      }
    }
    &.error {
      border: 1px solid
        ${({ theme }) => theme.desktop.inputBorderColorError};
    }
    &.error + .tip {
      color: ${({ theme }) => theme.desktop.tipColorError} !important;
    }
  }
  .txt-red{
    color: ${({ theme }) => theme.desktop.tipColorError} !important;
  }

  .error-msg{
    color: ${({ theme }) => theme.desktop.tipColorError}
  }
  .txt-required{
    color: ${({ theme }) => theme.desktop.hrefColorPrimary}
  }


  .react-datepicker-wrapper{
    width : 100%;
  }
  .react-datepicker__input-container{
    input{
      width : 100% !important;
      font-size : 1.4rem;
      color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
      background: transparent;
      cursor: pointer;
      &::placeholder {
        font-size : 1.4rem;
      }
    }
  }




  .react-datepicker-popper[data-placement^=bottom]{
    padding-top : 1.5rem;
  }
  .react-datepicker{
    border-radius: 20px;
    background: ${({ theme }) => theme.desktop.datePickerHeaderBg};
    box-shadow: ${({ theme }) => theme.desktop.datePickerBoxShadow};
    border : none;
    min-width: 26.8rem;
    overflow: hidden;
    padding : 1.6rem;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &__header{
      background: ${({ theme }) => theme.desktop.datePickerHeaderBg};
      width : 100%;
      border : none;
      padding : 0;
      > div{
        justify-content: space-between !important;
        gap : .5rem;
        margin : 0;
        display: flex;
        select {
          outline : none;
          width : 50%;
          height : 24px;
          background : #1D2447;
          border : none;
          border-radius : 20px;
          padding : .2rem .5rem;
          color : ${({ theme }) => theme.desktop.white};
        }
        button{
          color : ${({ theme }) => theme.desktop.white} !important;
        }
      }
    }
    &__day-names{
      color : ${({ theme }) => theme.desktop.white};
      margin-top : 1.2rem;
    }
    &__month-container{
      float : none;
    }
    &__month{
      margin : .8rem 0;
    }
    &__week{
      display: flex;
    justify-content: space-between;
    }
    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name{
      width: 3rem;
      line-height: 3rem;
      color : ${({ theme }) => theme.desktop.white};
      font-size: 1.3rem !important;
      font-weight: 400;
      &:hover{
        background :#717FBA;
      }
    }
    &__day{
      &--in-range,&--in-selecting-range{
         background :#717FBA;
         &:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range){
          opacity : .7;
          background :${({ theme }) => theme.desktop.datePickerSelectRangeBg};
         }
      }
      &--selected{
        background :transparent;
        color : ${({ theme }) =>
					theme.desktop.datePickerSelectColor} !important;
      }
    }
    .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected{
      background :${({ theme }) => theme.desktop.datePickerSelectRangeBg};
    }
  }

  input {
    color: ${({ theme }) => theme.desktop.inputColor};
    background: ${({ theme }) => theme.desktop.inputBg};
    padding-left: 1rem;
    font-family: ${({ theme }) => theme.desktop.fontFamily};
    outline : none;
    box-shadow : none;
    border: none;
    width: 100%;
    &::placeholder {
      color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
      font-size : 1.4rem;
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 1000px ${({ theme }) =>
				theme.desktop.inputBg} inset !important;
      -webkit-text-fill-color: #ffffff;
      font-family: ${({ theme }) => theme.desktop.fontFamily} !important;
  }
  .rightModule {
    width: 100%;
  }
  .wrapper-profile {
    display: flex;
    width: ${({ theme }) => theme.desktop.minContentWidth};
    padding: 4rem 1.6rem 4rem;
    gap : 2.4rem;
    @media (min-width: 1450px) {
      width: ${({ theme }) => theme.desktop.contentWidth};
       margin: 0 auto;
    }
    #leftMenu {
      flex : 0 0 18%;
    }
    .rightModule{
      flex : 1;
      .infoModule{
        background: ${({ theme }) => theme.desktop.rightModuleBg};
        border-radius : 20px;
        .inside-title{
          border-bottom : 1px solid ${({ theme }) =>
						theme.desktop.rightModuleBorderColor};
          min-height : 5.2rem;
          display: flex;
          align-items: center;
          padding: 0 1.6rem;
          text-transform: uppercase;
          gap : .5rem;
          background: ${({ theme }) => theme.desktop.rightModuleTitleBg};
          border-radius: 20px 20px 0 0;
          .icon {
            &:before{
              font-size : 2.4rem;
              margin : 0;
            }
          }
        }
        .inside-body{
          padding : 2.4rem 1.6rem;
          .txt-blue {
            white-space: nowrap;
            color: ${({ theme }) => theme.desktop.txtThemeColor};
            font-weight : 400;
          }
        }
      }
    }
  }

  .btnGroup {
    display: flex;
    gap: 1.6rem;
    margin-top: 1.6rem;
    button {
      border-radius: 100px;
      min-height: 3.6rem;
      font-size: 1.4rem;
      font-weight: 600;
      line-height: normal;
      color: ${({ theme }) => theme.desktop.white};
      width: 100%;
      padding : 0 2.4rem;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
    }
      a{
        border-radius: 100px;
        min-height: 3.6rem;
        font-size: 1.4rem;
        font-weight: 600;
        line-height: normal;
        color: ${({ theme }) => theme.desktop.white};
        width: 100%;
        padding : 0 1.2rem;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    .custom-btn-title{
      min-height : 2.8rem;
      span{
        margin-left: .4rem;
        text-transform: capitalize;
      }
    }
  }
  .profile-unset-overflow{
    overflow : unset !important;
  }

  .heading-form {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: normal;
    color: ${({ theme }) => theme.desktop.white};
    margin-bottom: 1.6rem;
  }

  .button {
    display: flex;
		gap: 1rem;
    justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
		min-width: 6.2rem;
		height: 3.6rem;
		padding: 0 1.2rem;
		border-radius: 10rem;
    font-family: 'Montserrat', sans-serif;
	  font-weight: 500;
  }
  .custom-nodata{
    min-height : 10rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2.4rem;
    justify-content: center;
    padding-top: 1.6rem;
		margin-top: 1.6rem;
		border-top: 1px solid ${({ theme }) => theme.desktop.customNodataBorderColor};
    .icon {
      border-radius: 100px;
      border: 6px solid ${({ theme }) => theme.desktop.bgIconNotifiCationColor};
      background:  ${({ theme }) => theme.desktop.hoverAddBankName};
      width : 4.8rem;
      height : 4.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &:before{
        font-size : 3.2rem;
      }
    }
    > div{
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.8rem;
      color :  ${({ theme }) => theme.desktop.iconNotifiCationColor}
    }
    &.no-border{
      margin-top: 0;
      padding-top: 0;
      border-top: 0;
    }
  }

  .btn-primary {
		background: ${({ theme }) => theme.desktop.primaryBtnBg};
		box-shadow: ${({ theme }) => theme.desktop.primaryBtnShadow};
		color: ${({ theme }) => theme.desktop.primaryBtnColor};

		&:hover {
			background: ${({ theme }) => theme.desktop.primaryBtnBgHover};
      box-shadow: ${({ theme }) => theme.desktop.primaryBtnShadowHover};
		color: ${({ theme }) => theme.desktop.primaryBtnColorHover};
		}
	}

  .btn-secondary {
		background: ${({ theme }) => theme.desktop.secondaryBtnBg};
		box-shadow: ${({ theme }) => theme.desktop.secondaryBtnShadow};
		color: ${({ theme }) => theme.desktop.secondaryBtnColor};

		&:hover {
    background: ${({ theme }) => theme.desktop.secondaryBtnBgHover};
		box-shadow: ${({ theme }) => theme.desktop.secondaryBtnShadowHover};
		color: ${({ theme }) => theme.desktop.secondaryBtnColorHover};
		}
	}
  .btn-tabs {
      background: ${({ theme }) => theme.desktop.tabsBtnBg};
      color: ${({ theme }) => theme.desktop.tabsBtnColor} !important;
      min-height: 2.8rem !important;
      padding : 0 1.2rem !important;
		&:hover {
      background: ${({ theme }) => theme.desktop.tabsBtnHoverBg};
      color: ${({ theme }) => theme.desktop.tabsBtnHoverColor} !important;
		}
    &.active{
      background: ${({ theme }) => theme.desktop.tabsBtnHoverBg};
      color: ${({ theme }) => theme.desktop.tabsBtnHoverColor} !important;
    }
  }

  .btn-disable {
    cursor: no-drop;
    background: ${({ theme }) => theme.desktop.disabledBtnBg};
		box-shadow: ${({ theme }) => theme.desktop.disabledBtnShadow};
		color: ${({ theme }) => theme.desktop.disabledBtnColor} !important;
  }

  .custom-tooltip{
    position : relative;
    &-body{
      display : none;
      font-family: ${({ theme }) => theme.desktop.fontFamily};
      position: absolute;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.desktop.tooltipBorderColor};
      background: ${({ theme }) => theme.desktop.tooltipBgColor};
      box-shadow: ${({ theme }) => theme.desktop.tooltipBoxShadow};
      z-index : 1;
      top: 100%;
      min-width : 28.4rem;
      margin-top : 1rem;
    }
    &:hover{
      .custom-tooltip-body{
        display: block;
        > div {
          display: block;
          text-align : center;
          font-size: 1.2rem;
          font-weight: 400;
          line-height: 1.8rem;
          color : ${({ theme }) => theme.desktop.tooltipColor};
          &.title{
            margin-bottom : .8rem;
            font-weight: 700;
          }
        }
      }
    }
  }

  .custom-tooltip-click {
    position : relative;
    &-body{
      display : none;
      font-family: ${({ theme }) => theme.desktop.fontFamily};
      position: absolute;
      padding: 1.2rem;
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.desktop.tooltipBorderColor};
      background: ${({ theme }) => theme.desktop.tooltipBgColor};
      box-shadow: ${({ theme }) => theme.desktop.tooltipBoxShadow};
      z-index : 1;
      top: 100%;
      min-width : 28.4rem;
      margin-top : 1rem;
      right : 0;
      font-size : 1.2rem;
      color : ${({ theme }) => theme.desktop.tooltipColor};
      line-height: 1.8rem;
      &.active{
        display : block;
      }
    }

  }

  .dropdown {
		width: 100%;
		display: flex;
		align-items: center;
		flex-flow: wrap;
		.btn {
			width: 70%;
			text-align: left;
			margin-left: 0.8rem;
			font-family: ${({ theme }) => theme.desktop.fontFamily};
			color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
			&:before {
				font-family: 'S1NewIcons';
				content: '\\e925';
				position: absolute;
				right: 15px;
				top: 8px;
				font-size: 2rem;
				color: ${({ theme }) => theme.desktop.white};
			}
		}
		.dropdown-item {
			border-top: 1px solid
				${({ theme }) => theme.desktop.registerDropdownBorderColor};
			min-height: 4.2rem;
			cursor: pointer;
			display: flex;
			align-items: center;
			padding: 0 2.4rem;
			color: ${({ theme }) => theme.desktop.registerInputDropDownColor};
			font-size: 1.4rem;
			font-weight: 600;
			line-height: normal;
      text-align : left;
			&:first-child {
				border-top: none;
			}
			&:hover {
				color: ${({ theme }) => theme.desktop.registerInputDropDownColorHover};
			}
		}
		.dropdown-container {
			box-shadow: ${({ theme }) => theme.desktop.registerInputDropDownShadow};
			position: absolute;
			top: 40px;
			left: 0;
			border-radius: 20px;
			background: ${({ theme }) => theme.desktop.registerDropdownBg};
			overflow: hidden;
			z-index: 2;
      display : none;
      width: 100%;
      &.active{
        display : block;
      }
			.heading-search {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 1.3rem 1.6rem;
				border-bottom: 1px solid
					${({ theme }) => theme.desktop.registerDropdownBorderColor};
				.group-search {
					position: relative;
					input {
						min-height: 3.6rem;
						border-radius: 100px;
						padding: 0 1.2rem;
            width : auto;
					}
					.icon-search {
						position: absolute;
						top: 7px;
						right: 12px;
					}
				}
			}
			.dropdown-wrapper {
				overflow-x: hidden;
				max-height: 31.6rem;
				&::-webkit-scrollbar-track {
					background: transparent;
				}
				&::-webkit-scrollbar-thumb {
					border-radius: 15px;
				}
			}
		}
	}
    .swithModule {
		.switchBtn {
			width: 4rem;
			height: 2rem;
			background: ${({ theme }) => theme.desktop.switchBgOff};
			border-radius: 2.8rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			padding: 0.5rem;
			> div {
				position: absolute;
				background: ${({ theme }) => theme.desktop.white};
				width: 2rem;
				height: 2rem;
				left: 0;
				transition: 0.6s;
				border-radius: 26px;
				&.active {
					transition: 0.6s;
					left: calc(100% - 2rem);
				}
			}
			&.active {
				background: ${({ theme }) => theme.desktop.switchBgOn};
				> span {
					margin: 0;
					&:nth-child(2) {
						opacity: 0;
						transition: 0.6s;
					}
				}
			}
		}
	}
  .custom-table{
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.desktop.customTableBorderColor};
    overflow: hidden;
    display: grid;
    .icon{
      &:before{
        color : #939DC5;
      }
    }
    &-thead{
      display: flex;
      background: ${({ theme }) => theme.desktop.customTableTheadBg};
      .custom-th{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding : 1.8rem 0;
        text-align :center;
        border-right: 1px solid ${({ theme }) =>
					theme.desktop.customTableBorderColor};
        border-bottom: 1px solid ${({ theme }) =>
					theme.desktop.customTableBorderColor};
        font-size: 1.4rem;
        font-weight: 700;
        line-height: normal;
        &:first-child{
          width : 30%;
        }
        &:last-child{
          border-right : none;

        }
      }
    }
    &-tbody{
      background : ${({ theme }) => theme.desktop.customTableTbodyBg};
      font-size: 1.4rem;
      font-weight: 600;
      line-height: normal;
      color : ${({ theme }) => theme.desktop.customTableTdColor};
      .custom-td{
        display: flex;
        &:last-child{
          .td{
            border-bottom : none;
          }
        }
        .td{
          width: 100%;
          text-align : center;
          padding : 1.8rem 0;
          border-right: 1px solid ${({ theme }) =>
						theme.desktop.customTableBorderColor};
          border-bottom: 1px solid ${({ theme }) =>
						theme.desktop.customTableBorderColor};
          word-break: break-all;
          &:first-child{
            width : 30%;
          }
          &:last-child{
            border-right : none;
          }
        }
      }
    }
    .pending,.approved,.reject,.cancel,.undefined{
      font-size: 1.2rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      padding : .4rem 1.2rem;
      border-radius: 100px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      .infobtn{
        &:before{
          font-family: 'S1NewIcons';
          display : block;
          content : '\\e910';
          font-size : 1.5rem;
          color : #fff;
        }
      }
    }
    .pending,.undefined{
      color :  ${({ theme }) => theme.desktop.tableStatusPenddingColor};
      border : 1px solid ${({ theme }) =>
				theme.desktop.tableStatusPenddingColor};
      .infobtn{
        &:before{
          color :  ${({ theme }) => theme.desktop.tableStatusPenddingColor};
        }
      }
    }
    .approved{
      color :  ${({ theme }) => theme.desktop.tableStatusApprovedColor};
      border : 1px solid ${({ theme }) =>
				theme.desktop.tableStatusApprovedColor};
      .infobtn{
        &:before{
          color :  ${({ theme }) => theme.desktop.tableStatusApprovedColor};
        }
      }
    }
    .reject{
      color :  ${({ theme }) => theme.desktop.tableStatusRejetctColor};
      border : 1px solid ${({ theme }) =>
				theme.desktop.tableStatusRejetctColor};
      .infobtn{
        &:before{
          color :  ${({ theme }) => theme.desktop.tableStatusRejetctColor};
        }
      }
    }
    .cancel{
      color :  ${({ theme }) => theme.desktop.tableStatusCancelColor};
      border : 1px solid ${({ theme }) => theme.desktop.tableStatusCancelColor};
      .infobtn{
        &:before{
          color :  ${({ theme }) => theme.desktop.tableStatusCancelColor};
        }
      }
    }
    .btnGroup{
      flex-wrap: wrap;
      justify-content: center !important;
      margin-top : 0;
      .btn,button{
        width : max-content !important;
      }
    }
    .txt-blue{
      color: ${({ theme }) => theme.desktop.txtThemeColor} !ỉmportant;
      font-size: 1.4rem;
      font-weight: 600 !important;
      line-height: normal;
      margin-left : .8rem;
    }
    .total{
      padding : 2rem 1.6rem;
      color :  ${({ theme }) => theme.desktop.white};
      background : ${({ theme }) => theme.desktop.totalTableBg};
      font-size: 1.4rem;
      font-weight: 700;
      line-height: normal;
      .line{
        color : ${({ theme }) => theme.desktop.totalLineColor};
        margin : 0 1.6rem;
      }
    }
  }
  .pagination{
    gap : .8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top : 1.6rem;
    li{
      a{
      width : 3.2rem;
      height : 3.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
      color : ${({ theme }) => theme.desktop.paginationColor};
        &.active, &:hover{
          background : ${({ theme }) => theme.desktop.paginationBg};
          color : ${({ theme }) => theme.desktop.white};
        }
      }
    }
  }
  .checkbox{
    label {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    input[type=checkbox]{
      display : none;
    }
    input[type=checkbox]:checked + label.icon:before{
      display : block;
      content : '\\e91c'
    }
  }
  .inside-title {
    justify-content: space-between;
    .group-icon-title {
      display: flex;
      gap: 1rem;
      align-items: center;
      font-weight : 700;
    }
    .btnGroup {
      margin-top: 0;
    }
  }

  nav.breadcrumb ul {
    display: flex;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: normal;
    .breadcrumb-item{
      display: flex;
      align-items: center;
      a {
       color : ${({ theme }) => theme.desktop.bradcumbColor};
        text-transform: capitalize;
      }
    }
    .breadcrumb-item + .breadcrumb-item::before{
      content: '\\e923';
      font-family: 'S1NewIcons';
      margin: 0 5px;
      color: ${({ theme }) => theme.desktop.bradcumbColor};
    }
  }
  .quickSelect {
		display: flex;
		gap: 1.6rem;
		align-items: center;
		margin-top: 1.6rem;
		.inputBox-blue,
		.input-spacing {
			display: flex;
			margin-top: 0;
			justify-content: space-between;
			width: 100%;
		}
		.txt-blue {
			color: ${({ theme }) => theme.desktop.txtThemeColor};
			font-size: 1.4rem;
			font-weight: 400;
			line-height: 2rem;
			white-space: nowrap;
		}
		.dropdown {
			button {
				color: ${({ theme }) => theme.desktop.white};
				font-size: 1.4rem;
			}
		}
		.react-datepicker__input-container {
			input {
				color: ${({ theme }) => theme.desktop.white};
			}
		}
		.btnGroup {
			margin-top: 0;
		}
	}

  .flag:before {
    content: '';
    display: block;
    border-radius: 100%;
    margin-right: 0.5rem;
  }
  .flag.ch:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/ch.jpg)
      no-repeat top left/cover;
  }
  .flag.cs:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/cs.jpg)
      no-repeat top left/cover;
  }
  .flag.en:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/en.jpg)
      no-repeat top left/cover;
  }
  .flag.th:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/th.jpg)
      no-repeat top left/cover;
  }
  .flag.id:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/id.jpg)
      no-repeat top left/cover;
  }
  .flag.vn:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/vn.jpg)
      no-repeat top left/cover;
  }
  .flag.in:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/in.jpg)
      no-repeat top left/cover;
  }
  .flag.bd:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/bd.jpg)
      no-repeat top left/cover;
  }
  .flag.kh:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/kh.jpg)
      no-repeat top left/cover;
  }
  .flag.kh:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/kh.jpg)
      no-repeat top left/cover;
  }
  .flag.gb:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/gb.jpg)
      no-repeat top left/cover;
  }
  .flag.br:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/br.jpg)
      no-repeat top left/cover;
  }
  .flag.ko:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/ko.jpg)
      no-repeat top left/cover;
  }
  .flag.jp:before {
    background: url(${({ theme }) => theme.assetUrl}/desktop/img/flag/jp.jpg)
      no-repeat top left/cover;
  }

  .icon-refresh-fill {
    &:before {
      font-size: 2rem;
    }
    &.active {
      animation: reload 1s ease;
    }
  }

  @-webkit-keyframes reload {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

	@keyframes reload {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

  .directions {
		ul {
			li {
				font-weight: 400;
			}
		}
	}

  main section {
    display: flex;
    margin: auto;
    max-width: 1400px;
    width : 100%;
    &.inside{
      padding-top: 4rem;
    }
  }

  .wraper-client{
    width : ${({ theme }) => theme.desktop.minContentWidth};
    margin : 0 auto;
    padding : 0 1.2rem;
    @media (min-width: 1450px) {
      width: ${({ theme }) => theme.desktop.contentWidth};
    }
    .title-client{
      font-size: 3.3rem;
      font-weight: 700;
      line-height: normal;
      margin-bottom : 4rem;
    }
    .promotion-status{
      &.claimed {
        background : #FBC208;
        &:before{
          content: 'Claimed';
        }

      }
      &.new {
        background: ${({ theme }) => theme.desktop.tipColorError};
        &:before{
          content: 'New';
        }
      }
      &.active{
        background : #01B901;
        &:before{
          content: 'Active';
        }
      }
      &.expired {
        background: #6F7689;
        &:before{
          content: 'Expired';
        }
      }
    }

  }
  .progressBarModule {
		background: #232b4f;
		padding: 0.8rem;
		border-radius: 10px;
		max-width: 30rem;
		width: 100%;
		.bounsName {
			font-size: 1.2rem;
			font-weight: 600;
			line-height: 1.8rem;
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
		}
		.turnover {
			display: flex;
			justify-content: space-between;
			align-items: center;
			&-left {
				font-size: 1.2rem;
				font-weight: 400;
				line-height: normal;
				color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				span {
					color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				}
			}
			.icon {
				background: none;
				&:before {
					font-size: 1.6rem;
				}
			}
		}

		.progressBar {
			display: flex;
			align-items: center;
		}
		.progressBar .bar {
			height: 0.6rem;
			border-radius: 10px;
			background: #374375;
			margin-right: 10px;
			flex: auto;
			overflow: hidden;
		}
		.progressBar .bar .progress {
			background: ${({ theme }) => theme.desktop.hrefColorPrimary};
			height: 100%;
			border-radius: 10px;
		}
		.progressBar .percentage {
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			font-weight: 400;
			font-size: 1.2rem;
		}
	}
  .proData{
    .proDataTitle{
      margin-bottom : 2.4rem;
      text-align : center;
      .txt-darkBlue{
        color: ${({ theme }) => theme.desktop.white};
        font-size: 1.7rem;
        font-weight: 700;
        line-height: normal;

      }
      .txt-gray{
       margin-top : .8rem;
        color: ${({ theme }) => theme.desktop.white};
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.8rem;
      }
    }
  }

  .promoInfoPop{
    .custom-td{
      .td:first-child{
        width : 100%;
      }
    }
    strong{
      font-weight: 700 !important;
    }
    em{
      font-style: italic !important;
    }
  }
  .load-bo-config{
    strong{
      font-weight: 700 !important;
    }
    em{
      font-style: italic !important;
    }
  }


  .proDataBody {
    background-color : ${({ theme }) => theme.mobile.proDataBodyBg} !important;
    line-height: 3rem;
    padding : 1.6rem;
    border-radius: 20px;
    margin-top : 1.6rem;
      > * {
      background-color : ${({ theme }) =>
				theme.mobile.proDataBodyBg} !important;
    }
    colgroup col {
        width: 100% !important;
    }
    table {
      width: 100% !important;
      margin : 1.6rem 0 !important;
    }

    td {
      border: 1px solid ${({ theme }) =>
				theme.mobile.promotionGroupBorder} !important;
      background: ${({ theme }) => theme.mobile.promotionGroupBg} !important;
      color: ${({ theme }) => theme.mobile.promotionHeaderGroupColor};
    }

    tr:first-child {
      td {
        background: ${({ theme }) =>
					theme.mobile.promotionHeaderGroupBg} !important;
      }
    }
  }
  .backstage{
    background-color : ${({ theme }) => theme.mobile.proDataBodyBg} !important;
      > * {
      background-color : ${({ theme }) =>
				theme.mobile.proDataBodyBg} !important;
    }
    span,p,div,a,strong,h1,h2,h3,h4,h5,h6,h7,ul,li,ol,li{
      background-color : ${({ theme }) =>
				theme.mobile.proDataBodyBg} !important;
      padding : 0 !important;
      margin-bottom : 1.2rem !important;

    }
    colgroup col {
      width: 100% !important;
    }
  }


  //mobile
  .logoSwitch {
		padding: 0 1.6rem;
    overflow: scroll;
		visibility: hidden;
		opacity: 0;
		height: calc(100% - 2rem);
		background: ${({ theme }) => theme.mobile.bgLoginRegisterColor};
    position: relative;
		.switch {
			background: ${({ theme }) => theme.mobile.bgSwitchButtonLoginColor};
		}
    &.active{
      visibility: visible;
      opacity: 1;
      transition: 0.7s;
    }
    .logo-login {
      width: 18rem;
      height: 20rem;
      margin: 1rem auto;
    }
    .switch {
      width: 100%;
      background: ${({ theme }) => theme.mobile.bgSwitchButtonLoginColor};
      border-radius: 30px;
      display: flex;
      align-items: center;
      position: relative;
      font-size: 1.4rem;
      font-weight: 600;
      line-height: normal;
      > div {
        -ms-flex: 1;
        flex: 1;
        z-index: 1;
        padding: 1.1rem 1.2rem;
        a {
          color: ${({ theme }) => theme.mobile.switchButtonLoginColor};
        }
        &.active {
          a {
            color: ${({ theme }) => theme.mobile.switchButtonLoginColorActive};
          }
        }
        &.switchBg {
          position: absolute;
          background: ${({ theme }) => theme.mobile.switchButtonBgActive};
          box-shadow: ${({ theme }) =>
						theme.mobile.switchButtonBoxShadowActive};
          width: 50%;
          height: 100%;
          border-radius: 30px;
          left: 0;
          transition: 0.7s;
          padding: 0;
          &.right {
            left: 50%;
            transition: 0.7s;
          }
        }
      }
    }
    .close-popup-login {
      position: absolute;
      right: 20px;
      top: 20px;
      .icon {
        &:before {
          font-size: 2.4rem;
        }
      }
    }
    .btn-group{
      display : flex;
      width : 100%;
      margin : 1.6rem 0;
      button{
        padding : 1rem 1.2rem;
        font-size: 1.3rem;
        font-weight: 600;
        line-height: normal;
        border-radius: 100px;
        color : ${({ theme }) => theme.mobile.white}
      }
    }
	}
  .visit {
		color: ${({ theme }) => theme.mobile.white};
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 1.6rem 0;
		font-size: 1.4rem;
		font-style: normal;
		font-weight: 400;
		line-height: 1.8rem;
	}
  .btn-group button,
  .btn-group a,
  .btn-group .submit {
    width: 100%;
    border-radius: 100px;
    padding: 1rem 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1;
    position: relative;
    font-size: 1.3rem;
    font-weight : 600;
  }

  .step {
		display: flex;
		justify-content: space-between;
    max-width: 250px;
    margin: 0 auto;
		align-items: center;
		position: relative;
    padding-top : 1.6rem;
	}
	.step + .text {
		text-align: center;
		margin: 2rem 0;
	}
	.step .stepLine {
		background: ${({ theme }) => theme.mobile.stepBg};
		position: absolute;
		width: calc(100% - 3.6rem);
		height: 0.3rem;
		left: 1.6rem;
		display: flex;
		align-items: center;
	}
	.step .stepLine .stepBar50 {
		background: #5574a7;
		width: 50%;
		height: 100%;
	}
	.step .stepLine .stepBar100 {
		background: ${({ theme }) => theme.mobile.stepBg};
		width: 100%;
		height: 100%;
	}
	.step .stepLine ~ div {
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
    border: 3px solid ${({ theme }) => theme.mobile.stepBoder};
	}
	.step .circle {
		width: 3.2rem;
		height: 3.2rem;
		z-index: 1;
	}
	.step .circle div {
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.step .circle > div {
		width: 3rem;
		height: 3rem;
    background : ${({ theme }) => theme.mobile.stepBgItem};
	}
	.step .circle > div > div {
		font-weight: bold;
		color: white;
    font-size: 1.4rem;
    font-weight: 600;
	}
	.step .circle.active {
		border: 3px solid ${({ theme }) => theme.mobile.stepBorderActive};
    > div {
      width: 3rem;
      background : ${({ theme }) => theme.mobile.stepBgActive};
		  height: 3rem;
     }
	}
  .Join{
    .Terms{
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.8rem;
      margin : 1.6rem 0;
      color : ${({ theme }) => theme.mobile.white};
      a{
        color : ${({ theme }) => theme.mobile.hrefColorPrimary};
        text-decoration: underline;
      }
    }
    .inputInfo {
      background: ${({ theme }) => theme.mobile.tooltipBgColor};
      border: 1px solid ${({ theme }) => theme.mobile.tooltipBorderColor};
      color: ${({ theme }) => theme.mobile.tooltipColor};
      margin-top: 3vw;
      &:before {
        border-color: ${({ theme }) => theme.mobile.tooltipColor} transparent
          transparent;
          bottom: -2vw;
      }
    }
  }
    .features {
		background: ${({ theme }) => theme.mobile.rightModuleBg};
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
		border-radius: 20px;
		float: left;
		font-size: 1.4rem;
		padding: 0 0 1.6rem;
		width: 100%;
		overflow: hidden;
	}
	.features div,
	.features ul {
		padding: 1.6rem 1.6rem 0;
	}
	.features .title {
		text-align: left;
		color: ${({ theme }) => theme.mobile.hrefColorPrimary};
		margin: 0;
		font-size: 1.7rem;
    font-weight: 700;
	}
	.features .title:nth-child(1) {
		background: ${({ theme }) => theme.mobile.rightModuleTitleBg};
		color: white;
		font-size: 4vw;
		padding: 1.4rem 1.6rem;
    display: flex;
    align-items: center;
    gap: 2vw;
	}
	.features .title span:before {
		font-size: 4vw;
		margin-right: 2vw;
	}
	.features li {
		list-style: disc;
		line-height: 2rem;
		margin-left: 3vw;
	}
	.features li span,
	.features li a {
		font-weight: bold;
	}

  .features{
    .icon{
      &:before{
        font-size: 6vw;
      }
    }
  }

  .mobile-h5{
    .inputInfo {
      text-align: left;
      display: none;
      background: ${({ theme }) => theme.desktop.hrefColorPrimary};
      border-radius: 5px;
      padding: 2vw;
      position: relative;
      word-break: break-word;
      color: ${({ theme }) => theme.mobile.white};
      font-size : 3.1vw;
      &:before{
        content: '';
        width: 0;
        height: 0;
        border-width: 2vw 2vw 0 2vw;
        border-style: solid dashed dashed;
        border-color: ${({ theme }) =>
					theme.desktop.hrefColorPrimary} transparent transparent;
        position: absolute;
        bottom: -1.5vw;
        right: 3vw;
        z-index: 1;
      }
      &.active{
        display: block;
      }
    }
    .group-btn-line {
      padding: 0 5vw 0 5vw;
      .btnGroup {
        margin: 2vw 0;
        .icon {
          margin-right: 1.5vw;
        }
      }
      .btn-line{
        background: #01B901;
        box-shadow: 0px -2px 0px 0px rgba(255, 255, 255, 0.40) inset;
      }
      .txt-line {
        color: #939DC5;
        padding: 4vw 0;
        font-size: 3.5vw;
        font-weight: 400;
        text-align : center;
      }
      .icon-line {
        &:before {
          font-size: 5.5vw;
        }
      }
    }
    #header{
      overflow: unset;
    }
  }


  .inputBox-mobiile{
    .icon-module{
      display : flex;
    }
  }
  .custom-iframe {
    width: 100%;
    height: 100vh;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
  }

  .menu-center {
    font-weight: 500;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin: 5vw 3vw 0;
    gap : 1.5vw;
    a{
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 0 0 19vw;
      color: #0a1b38;
      background : ${({ theme }) => theme.desktop.rightModuleBg};
      border-radius: 10px;
      padding : 3.3vw 1.5vw;
      img{
        width: 11vw;
      }
      span{
        text-align: center;
        line-height: 4vw;
        margin-top: 1.5vw;
        font-size: 3.1vw;
        font-weight: 500;
        color : ${({ theme }) => theme.desktop.white};
      }
      .exclusion-icon{
        width: 10vw;
      }
      .icon{
        &:before{
          color : ${({ theme }) => theme.desktop.hrefColorPrimary};
          font-size : 6vw;
        }
      }
    }
  }


  .menu {
    padding: 0;
    position: relative;
  }


  .menu .close-btn {
    position: absolute;
    top: 3.5vw;
    right: 3.5vw;
    text-align: right;
    .icon{
      &:before{
        font-size : 6.1vw;
      }
    }
  }

  .menu-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 26.2vw;
    margin: 5vw auto;
  }
  .menu-logo > div {
    font-weight: 600;
  }
  .menu-logo > div:first-child {
    color: #989898;
  }
  .menu-logo > div:last-child {
    font-size: 8vw;
    color: #0a1b38;
    margin-top: -1vw;
    letter-spacing: -0.2vw;
  }
  .menu-logo > div:last-child span {
    color: #ff7600;
  }


  .menu-bottom {
    	margin: 5vw auto;
      padding-bottom : 30vw;
			&-item{
				.info {
					display: flex;
					justify-content: center;
					color: #585858;
					font-weight: 500;
					align-items: center;
					padding: 3vw 5vw;
					background : ${({ theme }) => theme.desktop.rightModuleTitleBg};
          border-bottom : 4px solid #12172A;
					&:after{
						display: block;
						content: '\\e925';
						font-family: 'S1NewIcons';
						width: 6vw;
    					height: 6vw;
						margin-left: 15vw;
						font-size : 6.1vw;
						color : ${({ theme }) => theme.desktop.rightModuleSloganColor};
					}
          .icon{
            &:before{
              font-size : 6.1vw;
              color : ${({ theme }) => theme.desktop.rightModuleSloganColor};
            }
          }
					img{
						width: 6vw;
					}
					> div{
					 	margin-left: 2vw;
						width: 100%;
						font-size: 3.3vw;
						color : ${({ theme }) => theme.desktop.rightModuleSloganColor};
					}
				}
				.option{
					display: none;
					background: ${({ theme }) => theme.desktop.white};
					color: #000;
					font-weight: 500;
          background : #12172A;
          border-bottom : 4px solid #12172A;
          div {
            font-size: 3.3vw;
			      font-weight: 600;
            color : ${({ theme }) => theme.desktop.white};
          }
          .country{
          	display: flex;
            flex-wrap: wrap;
            align-items: center;
            &-current{
              margin : 3vw 3.5vw;
              border-radius : 20px;
              overflow: hidden;
              .country-item{
                background-color: ${({ theme }) =>
									theme.desktop.rightModuleTitleBg};
                margin-left : 0;
                display: flex;
                align-items: center;
                padding : 3.5vw 3vw;
                border-bottom : 1px solid #374375;
                &:last-child{
                  border-bottom : none;
                }
                .group-button{
                  border-radius: 20px;
                  overflow : hidden;
                  margin-top: 1vw;
                  display: flex;
                  gap: 1px;
                  button{
                    color: ${({ theme }) =>
											theme.desktop.rightModuleSloganColor};
                    font-size: 3vw;
                    background : #374375;
                    padding : 1vw 2vw;

                    &.active{
                      background : ${({ theme }) =>
												theme.mobile.hrefColorPrimary};
                      color: ${({ theme }) => theme.mobile.white};
                    }
                  }
                }

                &-child{
                  background-color : #182043;
                  width: 100%;
                  .country-title{
                     background-color : #182043;
                     img{
                      width :5.5vw;
                      height :5.5vw;
                     }
                    > div{
                      background-color : #182043;
                    }
                  }

                }
              }

              .country-title{
                img{
                  width: 11.2vw;
                  border-radius: 50%;
                  border: 1px solid #d1d1d1;
                }
                &.after{
                  margin: 0;
			            padding: 0 6vw;
                }
              }
            }
            &-title{
              display: flex;
              align-items: center;
              padding: 0 2vw 0 0;
              background-color: ${({ theme }) =>
								theme.desktop.rightModuleTitleBg};
              > div{
                margin-bottom: 1vw;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: ${({ theme }) =>
									theme.desktop.rightModuleTitleBg};
               }
              img{
                width: 6vw;
                border-radius: 50%;
              }
            }
          }
				}
			}
		}
    .menu-bottom-item .info > div{
      color : #fff;
      font-weight : 700;
    }
		.menu-bottom-item .option a,.langs {
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			display: flex;
			flex-direction: column;
			align-items: flex-start;
      padding: 3vw 13vw;
      background : #182043;
      font-size: 3.6vw;
      font-weight: 600;
      line-height: normal;
		}
    .menu-bottom-item .option {
      .langs{
        flex-direction: row;
        align-items: center;
        gap : 3vw;
        &-name{
          color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
        }
        &-img{
          width : 6.2vw;
          height : 6.2vw;
          border-radius : 100px;
          overflow : hidden;
        }
      }
    }
		.menu-bottom-item.active .info {
			border: 0;
		}
		.menu-bottom-item.active .info::after {
			content: '\\e924';
      font-family: 'S1NewIcons';
		}
		.menu-bottom-item.active .option {
			display: block;
		}
		.menu-bottom-item:last-child .info {
			border: 0;
		}





    .header {
      justify-content: center;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
      padding: 0;
      font-size: 4vw;
      font-weight: bold;
      width: 100%;
      height: auto;
      flex-flow: column;
      background: transparent;
      .headerTag {
        background: #0F1428;
        display: flex;
        width: 100%;
        height: 12.3vw;
        border-bottom: 1px solid #374375;
        a,button{
          flex: 1;
          justify-content: center;
          color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
          height: 100%;
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 3.6vw;
          text-align: center;
          &.active{
            color: ${({ theme }) => theme.desktop.white};
            background: linear-gradient(0deg, #717FBA 0%, #A2AFE5 100%);
          }
        }
      }
    }
    .header .headerTag > a.active .quantity,
    .header .headerTag > button.active .quantity {
      color: white;
      background: #ff5e00;
    }
    .header .headerTag.promos {
      position: relative;
    }
    .header .headerTag.promos .arrow-icon {
      position: absolute;
      left: 8vw;
      top: 0.5vw;
    }
    .header .headerTag.promos .arrow-icon .icon-keyboard_arrow_left:after,
    .header .headerTag.promos .arrow-icon .icon-keyboard_arrow_left:before {
      content: '\e95d';
      font-family: 'icomoon';
      margin-left: -2.5vw;
      color: white;
    }
    .header .title {
      width: 100%;
      height: 12vw;
      background: #112240;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-weight: normal;
    }
    .header .title a {
      position: absolute;
      left: 0;
      color: white;
      width: 12vw;
      height: 12vw;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-flow: column;
      flex-flow: column;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-weight: bold;
      font-size: 3vw;
      font-size: 3vw;
      font-weight: bold;
      z-index: 1;
    }
    .header .title a i {
      letter-spacing: -2.5vw;
    }
    .header .title a i.icon-keyboard_arrow_left:after,
    .header .title a i.icon-keyboard_arrow_left:before {
      content: '\e95d';
      font-family: 'icomoon' !important;
      font-size: 4vw;
      font-weight: bold;
    }
    .header .title.searchBar {
      position: relative;
    }
    .header .title.searchBar .icon-search {
      position: absolute;
      right: 2vw;
      top: 3.5vw;
    }
    .header .title.searchBar .infoModule {
      position: absolute;
      right: 2vw;
      top: 0;
      width: 0;
      opacity: 0;
    }
    .header .title.searchBar .infoModule .inputBox,
    .header .title.searchBar .infoModule .euro .inputBox-event,
    .euro .header .title.searchBar .infoModule .inputBox-event,
    .header
      .title.searchBar
      .infoModule
      .worldcupEvent
      .event
      .event-content
      .inputBox-event,
    .worldcupEvent
      .event
      .event-content
      .header
      .title.searchBar
      .infoModule
      .inputBox-event {
      background: #c6d4f1;
      margin-left: 15vw;
      height: 8vw;
    }
    .header .title.searchBar .infoModule .inputBox input,
    .header .title.searchBar .infoModule .euro .inputBox-event input,
    .euro .header .title.searchBar .infoModule .inputBox-event input,
    .header
      .title.searchBar
      .infoModule
      .worldcupEvent
      .event
      .event-content
      .inputBox-event
      input,
    .worldcupEvent
      .event
      .event-content
      .header
      .title.searchBar
      .infoModule
      .inputBox-event
      input {
      padding: 0;
      height: 8vw;
    }
    .header .title.searchBar .infoModule .icon-close {
      position: revert;
    }
    .header .title.searchBar .infoModule.active {
      -webkit-transition: 0.3s;
      transition: 0.3s;
      width: 100%;
      opacity: 1;
    }
    .group-select-bank {
      border-radius: 20px;
      margin-bottom : 4vw;
        .title {
          border-bottom: 1px solid ${({ theme }) =>
						theme.desktop.rightModuleBorderColor};
          background: ${({ theme }) => theme.desktop.rightModuleTitleBg};
          padding : 3.1vw 4.1vw;
          font-size : 3.4vw;
          font-weight: 700;
          border-radius : 20px 20px 0 0;
          span{
            color : ${({ theme }) => theme.desktop.hrefColorPrimary};
            font-weight: 400;
          }
        }
        .selectModule{
          padding: 4vw;
          background: ${({ theme }) => theme.desktop.rightModuleBg};
          border-radius : 0 0 20px 20px;
        }
    }
    .desktop,.mobile-h5{
      #goTop {
        position: fixed;
        bottom: 175px;
        right: 10px;
        width: 52px;
        height: 52px;
        background: ${({ theme }) => theme.desktop.hrefColorPrimary};
        border-radius: 100%;
        z-index: 2;
        color: white;
      }
      #goTop i {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #goTop i:before {
        font-size: 1.8rem;
        font-weight: bold;
      }
    }
    .mobile-h5{
      #header{
        justify-content :center;
      }

      #popup .pop .popTxt {
        text-align: center;
      }

      #goTop{
        bottom: 70px;
        width: 10vw;
        height: 10vw;
      }
      .group-dropdown {
        .inputBox {
          display: flex;
          align-items: center;
          width: 100%;
          .dropdown {
            width: 100%;
            .text {
              width: 100%;
              display: block;
            }
            &-item {
              min-height: 12vw;
              font-size: 3.4vw;
              padding: 0 4vw;
            }
            &-container {
              max-height: 20rem;
              overflow-y: auto;
              border-radius: 20px ;
            }
          }
        }
      }
      .tag {
        width: 100%;
        display: flex;
        background: #0F1428;
      }
      .tag a,
      .tag button {
        flex: 1;
        align-items: center;
        display: flex;
        justify-content: center;
        height: 12vw;
        border-bottom: 1px solid #939DC5;
        color: #939DC5;
        font-size: 3.5vw;
        text-align: center;
      }
      .tag a.active,
      .tag button.active {
        color: ${({ theme }) => theme.desktop.hrefColorPrimary};
        border-color: ${({ theme }) => theme.desktop.hrefColorPrimary};
        font-weight: bold;
      }
        .vip_mark {
          margin: auto;
          position: relative;
          text-align: center;
          max-width: 35vw;
          &.infinity {
            div {
              background: ${({ theme }) => theme.desktop.gradeNovaBg};
            }
          }
          &.vintage {
            div {
              background: ${({ theme }) => theme.desktop.gradeVintageBg};
            }
          }
          &.silver {
            div {
              background: ${({ theme }) => theme.desktop.gradeSilverBg};
            }
          }
          &.gold {
            div {
              background: ${({ theme }) => theme.desktop.gradeGoldBg};
            }
          }
          &.titanium {
            div {
              background: ${({ theme }) => theme.desktop.gradeTitaniumBg};
            }
          }
          &.diamond {
            div {
              background: ${({ theme }) => theme.desktop.gradeDiamondBg};
            }
          }
          img {
            width: 25vw;
            z-index: 1;
            position: relative;
            margin: 0 auto;
          }
          div {
            background: #112240;
            padding: 1vw;
            margin-top: 3.1vw;
            border-radius: 15px;
            color: ${({ theme }) => theme.mobile.white};
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
    }
    .resetPassWordpop {
      max-width: 40rem;
      padding: 0 !important;
      .txt-blue {
        white-space: nowrap;
        color : ${({ theme }) => theme.mobile.txtThemeColor};
      }
      .title-pass{
        text-align : center;
      }
    }

  .desktop{
    #goTop{
      position : unset;
    }
    .group-fixed{
      position : fixed;
      right : 100px;
      bottom : 100px;
      z-index : 999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .icon-line-fixed{
        border-radius: 100px;
        background: #01B901;
        box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.50);
        width : 5.2rem;
        height : 5.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .icon{
          &:before{
            font-size : 2.8rem;
          }
        }
      }
    }
  }

  /* Using mobile*/
  .main {
		width: calc(100% - 8vw);
		min-height: 100%;
		height: auto;
		padding: 5vw 4vw 20vw 4vw;
	}
    .Straight-lock {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 5vw;
      background: #0F1428;
      z-index: 9999;
      display: none;
      justify-content: center;
      align-items: center;
      flex-flow: column;
    }
    .Straight-lock.in {
      display: flex;
    }
    .Straight-lock.right .img-rotate {
      transform: scaleX(-1);
      filter: FlipH;
    }
    .Straight-lock .icon-mobile-alt {
      position: relative;
    }
    .Straight-lock .icon-mobile-alt:before {
      font-size: 10vw;
    }
    .Straight-lock i.icon-refresh-fill {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    .Straight-lock i.icon-refresh-fill:before {
      font-size: 3vw;
      color: ${({ theme }) => theme.mobile.hrefColorPrimary};
      transform: scaleX(-1);
      animation-name: reload1;
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }
    .Straight-lock .text {
      margin: 2vw 0 0;
      text-align: center;
      line-height: 22px;
      color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
      font-size : 13px;
    }

    @-webkit-keyframes reload1 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
      }
    }

    @keyframes reload1 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
      }
    }
    .icon-file-damage-fill,.icon-refresh-fill,.icon-share-box-fill{
      &:before{
        color : ${({ theme }) => theme.desktop.nodataIconColor} !important;
      }
    }
    .icon-share-box-fill{
      &:before{
        color : ${({ theme }) => theme.desktop.iconColorWithThemes} !important;
      }
    }
`
