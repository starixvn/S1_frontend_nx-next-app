import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from 'next/document'
import { getGA4ID, getGTMId } from '@nx-next-app/site/nova88/data'

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
		const { host } = this.props
		const gtmId = getGTMId(host)
		const ga4Id = getGA4ID(host)
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

					{/* Yuri Track , 市場廣告商使用的追蹤碼 */}
					<script
						dangerouslySetInnerHTML={{
							__html: `!function(y,u,r,i){y._yuri_track||((n=y._yuri_track=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)}).queue=n.queue||[],y._yuri_track._fp||(y._yuri_track._fp=1,t=u.createElement(r),s=u.getElementsByTagName(r)[0],t.async=1,t.src=i,s.parentNode.insertBefore(t,s)))}(window,document,"script","https://cdn.jsdelivr.net/gh/adzon/assets/pixel.js?_rid={click_id}");`,
						}}
					/>

					{/* GA4 */}
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${ga4Id}');
              `,
						}}
					/>
					{/* Google Tag Manager - GTAG paste in the <head> */}
					<script
						dangerouslySetInnerHTML={{
							__html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
						}}
					/>
				</Head>
				<body>
					{/* Google Tag Manager (noscript) - GTAG paste in the <body> */}
					<noscript>
						<iframe
							src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
							height='0'
							width='0'
							style={{ display: 'none', visibility: 'hidden' }}
							title='Google Tag Manager'
						/>
					</noscript>

					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
