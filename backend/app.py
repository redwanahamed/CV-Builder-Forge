from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import stripe

app = Flask(__name__)
CORS(app)

# Configure your API keys
openai.api_key = "your-openai-key"
stripe.api_key = "your-stripe-secret-key"
import os
openai.api_key = os.environ.get("OPENAI_API_KEY")
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

@app.route('/generate_cv', methods=['POST'])
def generate_cv():
    data = request.json
    name = data.get('name')
    skills = data.get('skills')

    prompt = f"Generate a professional, clean CV layout for {name} with these skills: {skills}."

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "system", "content": prompt}]
        )
        cv_text = response['choices'][0]['message']['content']
        return jsonify({"cv_text": cv_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {'name': 'Pro CV Plan'},
                    'unit_amount': 999,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url="http://localhost:5500/success.html",
            cancel_url="http://localhost:5500/cancel.html"
        )
        return jsonify({"url": session.url})
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
