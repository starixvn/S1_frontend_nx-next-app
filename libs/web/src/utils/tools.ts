/* eslint-disable @typescript-eslint/no-explicit-any */
export const openLiveChat = () =>
	(window as any).LiveChatWidget.call('maximize')
