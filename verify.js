// 这是 Vercel 的 serverless 函数，可以接收 POST！
let cards = [
    { card: "DAY-A1B2C", type: "day", device: "", status: "unbound" }
];

export default function handler(req, res) {
    // 只处理 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    let { action, card, device, type } = req.body;
    let result = { success: false };

    // 验证卡密
    if (action === 'verify' && card) {
        let c = cards.find(c => c.card === card);
        if (c) {
            result = {
                success: true,
                card: c.card,
                type: c.type,
                status: c.status,
                device: c.device || null
            };
        }
    }

    res.json(result);
}