// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function handler(req, res) {
    res.status(200).json({ SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME });
}