// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function handler(req, res) {
    res.status(200).json({ BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME });
}
