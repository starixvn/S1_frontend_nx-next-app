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
  #popup {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 6;
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
      overflow-y: auto;
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
      .Success,poker,
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
      .noticepop{
        width: 40rem;
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
    .inputBox-row {
      display: flex;
      gap: 1.6rem;
      .inputBox-blue {
        width: 50%;
      }
    }
  }
  .react-datepicker__input-container{
    input{
      width : 90%;
      color: ${({ theme }) => theme.desktop.inputPlaceHolderColor};
      &::placeholder {
        font-size : 1.4rem;
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
    &:-webkit-autofill{
      box-shadow: 0 0 0px 1000px ${({ theme }) => theme.desktop.inputBg} inset;
      -webkit-text-fill-color: ${({ theme }) => theme.desktop.inputColor};
    }
  }
  .wrapper-profile {
    display: flex;
    max-width: 140rem;
    margin: 0 auto;
    padding : 4rem 0;
    gap : 2.4rem;
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
          .icon {
            &:before{
              font-size : 2.4rem;
              margin : 0;
            }
          }
        }
        .inside-body{
          padding : 2.4rem 1.6rem;
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
    }
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

  .btn-disable {
    background: ${({ theme }) => theme.desktop.disabledBtnBg};
		box-shadow: ${({ theme }) => theme.desktop.disabledBtnShadow};
		color: ${({ theme }) => theme.desktop.disabledBtnColor};
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
`
