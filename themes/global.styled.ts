import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
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
  }

  body, main {
    background: ${theme.desktop.primary};
    font-size: 1.4rem;
  }

  #__next {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
    overflow-x : hidden;
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
      box-shadow: ${theme.desktop.popupBoxShadow};
      background : ${theme.desktop.popupBg};
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
        border: 6px solid ${theme.desktop.borderIconNotifiCationColor};
        background: ${theme.desktop.bgIconNotifiCationColor};
        width : 4.8rem;
        height : 4.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom : 2.4rem;
        &:before{
          font-size : 3.2rem;
          color : ${theme.desktop.iconNotifiCationColor}
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
      .noticepop,.statuspop{
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
  .promoInfoPop{
    max-height: calc(100% - 160px);
    overflow-y: auto;
    box-shadow: ${theme.desktop.popupBoxShadow};
    background : ${theme.desktop.popupBg};
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
        background: var(--Color-5, #EA6118);
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

  .react-datepicker__input-container{
    input{
      width : 88% !important;
      font-size : 1.4rem;
      color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
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
      -webkit-box-shadow: 0 0 0 30px ${({ theme }) =>
				theme.desktop.inputBg} inset !important;
      -webkit-text-fill-color: #ffffff;
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
            color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
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
		border-top: 1px solid #374375;
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
        padding : 1.8rem .8rem;
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
      color : #939DC5;
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
          padding : 1.8rem .8rem;
          border-right: 1px solid ${({ theme }) =>
						theme.desktop.customTableBorderColor};
          border-bottom: 1px solid ${({ theme }) =>
						theme.desktop.customTableBorderColor};
          display: inline-block !important;
          white-space: nowrap;
          overflow: hidden !important;
          text-overflow: ellipsis;
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
      justify-content: center;
      margin-top : 0;
      .btn{
        width : max-content;
      }
    }
    .txt-blue{
      color: ${({ theme }) => theme.desktop.rightModuleSloganColor} !ỉmportant;
      font-size: 1.4rem;
      font-weight: 600 !important;
      line-height: normal;
      margin-left : .8rem;
    }
    .total{
      padding : 2rem 1.6rem;
      color :  ${({ theme }) => theme.desktop.white};
      background : #232B4F;
      font-size: 1.4rem;
      font-weight: 700;
      line-height: normal;
      .line{
        color : #374375;
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
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
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
  .icon-refresh-fill{
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
      @-webkit-keyframes rotate {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
  .icon-refresh-fill {
    &:before {
      font-size: 2rem;
    }
    &.active {
      animation: rotate 0.5s linear 2;
    }
  }
	@keyframes rotate {
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
    max-width : 1400px;
    width : 100%;
    margin : 0 auto;
    padding : 0 1.2rem;
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
			background: #ea6118;
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
  .proDataBody {
    background-color : #182043 !important;
      padding : 1.6rem;
      border-radius: 20px;
      margin-top : 1.6rem;
      > * {
      font-size: 1.4rem !important;
      font-style: normal !important;
      font-weight: 400 !important;
      line-height: 1.8rem !important;
      background-color : #182043 !important;
      span,p,div,a{
        background-color : #182043 !important;
        font-family: ${({ theme }) => theme.desktop.fontFamily} !important;
        line-height: 1.6rem !important;
        color: #939DC5 !important;
        padding : 0 !important;
        margin-bottom : 1.2rem !important;

      }
      p,div,span{
        margin-bottom : 1.2rem !important;
        display : block !important;
      }
      a{
        font-weight: bold !important;
      }
      strong {
        color: #939DC5 !important;
      }
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
		height: calc(100% - 10rem);
		background: ${({ theme }) => theme.mobile.bgLoginRegisterColor};
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

  .inputInfo {
    text-align: left;
    display: none;
    background: #a5bbe0;
    border-radius: 5px;
    padding: 2vw;
    position: relative;
    word-break: break-word;
    color: #5574a7;
    &:before{
      content: '';
      width: 0;
      height: 0;
      border-width: 2vw 2vw 0 2vw;
      border-style: solid dashed dashed;
      border-color: #a5bbe0 transparent transparent;
      position: absolute;
      bottom: -1.5vw;
      right: 3vw;
      z-index: 1;
    }
    &.active{
       display: block;
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
			background: #f0f0f0;
    	margin: 5vw auto;
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
              display: flex;
              margin-bottom: 5vw;
              background-color: ${({ theme }) =>
								theme.desktop.rightModuleTitleBg};
              border-radius: 4vw;
              padding: 3.8vw 4vw;
              .country-item{
                background-color: ${({ theme }) =>
									theme.desktop.rightModuleTitleBg};
                margin-left : 0;
                button{
                  margin-top: 2vw;
                  color: #878787;
                  font-size: 3vw;
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
		.menu-bottom-item .option .country-current .country-title img {
			width: 10.7vw;
			border-radius: 50%;
			border: 1px solid #d1d1d1;
		}
		.menu-bottom-item .option .country-current.after {
			background-color: transparent;
			margin: 0;
			padding: 0 6vw;
		}
		.menu-bottom-item .option .country-item {
			display: flex;
			width: 100%;
			align-items: center;
			padding: 2vw 0;
			margin-left: 6vw;
		}
		.menu-bottom-item .option .country-item > div:last-child {
			width: 60vw;
		}
		.menu-bottom-item .option .country-item > div button.active {
			color: #ff7600;
		}
		.menu-bottom-item .option .country-item:first-child {
			padding-top: 0;
		}
		.menu-bottom-item .option .country-item:last-child {
			padding-bottom: 0;
		}
		.menu-bottom-item .option-item {
			padding: 5vw;
		}
		.menu-bottom-item .option div {
			font-size: 3.5vw;
			font-weight: 600;
		}
		.menu-bottom-item .option button {
			font-size: 3.5vw;
			color: #585858;
			font-weight: 500;
			border-right: 1px solid #d1d1d1;
			padding: 0 2vw;
		}
		.menu-bottom-item .option button:first-child {
			padding-left: 0;
		}
		.menu-bottom-item .option button:last-child {
			padding-right: 0;
			border-right: 0;
		}
		.menu-bottom-item .option a {
			color: #a7a7a7;
			font-size: 600;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding: 0 0 5vw 18vw;
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

`
