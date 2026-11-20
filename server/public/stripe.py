#! /usr/bin/env python3.6

"""
server.py
Stripe Sample.
Python 3.6 or newer required.
"""
import os

from flask import Flask, jsonify, request
import stripe
# This is your test secret API key.
client = stripe.StripeClient(
    # Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
    os.environ["STRIPE_SECRET_KEY"],
    stripe_version='2026-10-28.endive',
)

app = Flask(__name__,
            static_url_path='',
            static_folder='public')

YOUR_DOMAIN = 'http://localhost:4242'

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        session = client.v1.checkout.sessions.create(params={
            'ui_mode': 'elements',
            'line_items': [
                {
                    # Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    'price': '{{PRICE_ID}}',
                    'quantity': 1,
                },
            ],
            'mode': 'payment',
            'return_url': YOUR_DOMAIN + '/complete.html?session_id={CHECKOUT_SESSION_ID}',
        })
    except Exception as e:
        return str(e)

    return jsonify(clientSecret=session.client_secret)

@app.route('/session-status', methods=['GET'])
def session_status():
  session = client.v1.checkout.sessions.retrieve(request.args.get('session_id'), params={'expand': ["payment_intent", "subscription"]})

  return jsonify(status=session.status, payment_status=session.payment_status, payment_intent_id=session.payment_intent.id if session.payment_intent else None, payment_intent_status=session.payment_intent.status if session.payment_intent else None, subscription_id=None if session.payment_intent else (session.subscription.id if session.subscription else None), subscription_status=None if session.payment_intent else (session.subscription.status if session.subscription else None))

if __name__ == '__main__':
    app.run(port=4242)