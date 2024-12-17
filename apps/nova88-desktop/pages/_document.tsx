/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/alt-text */
import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document'
import process from 'process'

interface CustomDocumentProps extends DocumentInitialProps {
	host?: string
}

class MyDocument extends Document<CustomDocumentProps> {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		const host = ctx.req && ctx.req.headers ? ctx.req.headers.host : ''
		return { ...initialProps, host }
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						href='https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@300;400;600&display=swap'
						rel='stylesheet'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'
						rel='stylesheet'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700&family=Poppins:wght@300;400;500;600&display=swap'
						rel='stylesheet'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500&display=swap'
						rel='stylesheet'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@900&display=swap'
						rel='stylesheet'
					/>

					{/* N88-RD-GTM , 其餘 script 均由此 gtm 控制，若無管理權限請洽 TL , GTM ID 不能用 env file , 在 _document load 不到 */}
					{process.env['NEXT_PUBLIC_ENV'] === 'PRD' && (
						<script
							dangerouslySetInnerHTML={{
								__html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer',"GTM-5BP7VT78");
            `,
							}}
						/>
					)}
					<script
						type='application/javascript'
						dangerouslySetInnerHTML={{
							__html: `
              !(function (t, e, a, r, n, s, d, l, o, i, u) {
                (t.Adjust = t.Adjust || {}), (t.Adjust_q = t.Adjust_q || []);
                for (var c = 0; c < l.length; c++) o(t.Adjust, t.Adjust_q, l[c]);
                (i = e.createElement(a)),
                  (u = e.getElementsByTagName(a)[0]),
                  (i.async = !0),
                  (i.src = "https://cdn.adjust.com/adjust-latest.min.js"),
                  (i.onload = function () {
                    for (var e = 0; e < t.Adjust_q.length; e++)
                      t.Adjust[t.Adjust_q[e][0]].apply(t.Adjust, t.Adjust_q[e][1]);
                    t.Adjust_q = [];
                  }),
                  u.parentNode.insertBefore(i, u);
              })(
                window,
                document,
                "script",
                0,
                0,
                0,
                0,
                [
                  "initSdk",
                  "getAttribution",
                  "getWebUUID",
                  "setReferrer",
                  "trackEvent",
                  "addGlobalCallbackParameters",
                  "addGlobalPartnerParameters",
                  "removeGlobalCallbackParameter",
                  "removeGlobalPartnerParameter",
                  "clearGlobalCallbackParameters",
                  "clearGlobalPartnerParameters",
                  "switchToOfflineMode",
                  "switchBackToOnlineMode",
                  "stop",
                  "restart",
                  "gdprForgetMe",
                  "disableThirdPartySharing",
                  "initSmartBanner",
                  "showSmartBanner",
                  "hideSmartBanner",
                ],
                function (t, e, a) {
                  t[a] = function () {
                    e.push([a, arguments]);
                  };
                },
              );
            `,
						}}
					/>
				</Head>
				<body>
					{/* N88-RD-GTM */}
					{process.env['NEXT_PUBLIC_ENV'] === 'PRD' && (
						<noscript>
							<iframe
								title='Google Tag Manager for RD'
								src='https://www.googletagmanager.com/ns.html?id=GTM-5BP7VT78'
								height='0'
								width='0'
								style={{ display: 'none', visibility: 'hidden' }}
							/>
						</noscript>
					)}

					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
