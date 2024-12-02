import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { Marquee } from "@nx-next-app/components/D0001";
import { useHome } from "@nx-next-app/features/F0001/providers";
import dynamic from "next/dynamic";

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const Announcement = () => {
	const { announcementData, handleMarqueeClick } = useHome()
	const { modal } = useGlobalModal()

	return (
		<Marquee
			data={announcementData}
			onMarqueeClick={() =>
				handleMarqueeClick({
					loginCallback: () => modal.open(<LoginModal />),
				})
			}
		/>
	)
}

export default Announcement
