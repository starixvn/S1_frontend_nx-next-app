import Script from 'next/script'
import process from 'process'

export const LiveChatScript = () => (
	<Script async id='liveChat-script'>
		{`window.__lc = window.__lc || {};
         window.__lc.license = ${process.env['NEXT_PUBLIC_LIVECHAT_LICENSE']};
         window.__lc.chat_between_groups = false;
         ; (function (n, t, c) { function i(n) { return e._h ? e._h.apply(null, n) : e._q.push(n) } var e = { _q: [], _h: null, _v: "2.0", on: function () { i(["on", c.call(arguments)]) }, once: function () { i(["once", c.call(arguments)]) }, off: function () { i(["off", c.call(arguments)]) }, get: function () { if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load."); return i(["get", c.call(arguments)]) }, call: function () { i(["call", c.call(arguments)]) }, init: function () { var n = t.createElement("script"); n.async = !0, n.type = "text/javascript", n.src = "https://cdn.livechatinc.com/tracking.js", t.head.appendChild(n) } }; !n.__lc.asyncInit && e.init(), n.LiveChatWidget = n.LiveChatWidget || e }(window, document, [].slice))
         `}
	</Script>
)

export const IovationScript = () => (
	<>
		<Script async id='iovation-script'>
			{`
                         window.IGLOO = window.IGLOO || {
                         "enable_flash" : false,
                         "loader" : {
                         "fp_dyn" : false,
                         "version" : "5.2.2"
                         }
                       };
                 `}
		</Script>

		<Script async src='/js/loader_only.js' />
	</>
)

export const PlayTechScript = () => (
	<Script
		async
		src='https://login-am.htsp123.com/jswrapper/hotspin88am/integration.js'
		type='text/javascript'
	/>
)

export const GTMScript = () => (
	<>
		<Script async id='GTM-script'>
			{`(function (w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({
					"gtm.start": new Date().getTime(),
					event: "gtm.js"
				});
				var f = d.getElementsByTagName(s)[0],
					j = d.createElement(s),
					dl = l != "dataLayer" ? "&l=" + l : "";
				j.async = true;
				j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
				f.parentNode.insertBefore(j, f);
			})(window, document, "script", "dataLayer", "GTM-5VD4484")`}
		</Script>
		<Script
			async
			src='https://www.googletagmanager.com/gtag/js?id=G-B22CGGG5KJ'
		/>
		<Script async id='dataLayer-script'>
			{`  window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-B22CGGG5KJ');`}
		</Script>
	</>
)

export const JackpotsScript = () => (
	<Script
		async
		type='text/javascript'
		src='https://tickers2.playtech.com/jackpots/new_jackpotjs.js'
	/>
)

export const GoogleTagManagerScript = () => (
	<noscript>
		<iframe
			src='https://www.googletagmanager.com/ns.html?id=GTM-5VD4484'
			title='GTM'
			height='0'
			width='0'
			style={{ display: 'none', visibility: 'hidden' }}
		/>
	</noscript>
)

export const PixelCodeScript = () => {
	return (
		<Script async defer id='PixelCode'>
			{`!(function (p, l, o, w, i, n, g) {
					if (!p[i]) {
						p.GlobalSnowplowNamespace =
							p.GlobalSnowplowNamespace || [];
						p.GlobalSnowplowNamespace.push(i);
						p[i] = function () {
							(p[i].q = p[i].q || []).push(arguments);
						};
						p[i].q = p[i].q || [];
						n = l.createElement(o);
						g = l.getElementsByTagName(o)[0];
						n.async = 1;
						n.src = w;
						g.parentNode.insertBefore(n, g);
					}
				})(
					window,
					document,
					"script",
					"//res-odx.op-mobile.opera.com/sp.js",
					"otag"
				)

				otag("init", "adv10336204001664")
			`}
		</Script>
	)
}
