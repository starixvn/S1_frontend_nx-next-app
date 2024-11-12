import { useSiteMetaData } from "libs/web/src/app/hooks"

export const useSiteStaticData = () => {
    const metaData = useSiteMetaData();

    return {
        metaData
    }
}