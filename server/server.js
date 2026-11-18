require(`dotenv`).config()
const express = require(`express`)
const app = express()

app.use(express.json())
app.use(express.static(`public`))

const stripe = require(`stripe`)(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    ["brazil-away", {priceId: "price_1UcvfO1NBuECuLLe96lWnGV7", name: `Brazil National Team 2026 Stadium Away`}], 
    ["canada-nocta", {priceId: "price_1UcvhX1NBuECuLLeCzDJ50IE", name: `Canada x Nocta`}],
    ["barcelona-away", {priceId: "price_1UcvgH1NBuECuLLeLJ2Xye3S", name: `F.C. Barcelona 2026/27 Stadium Away`}]
]);

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id);
                if (!storeItem) throw new Error(`Unknown item: ${item.id}`);

                return {
                    price: storeItem.priceId,
                    quantity: item.quantity
                };
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        });

        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(3000)