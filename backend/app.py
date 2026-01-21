from flask import Flask, jsonify
from flask_cors import CORS
from database import get_db_connection, init_db
from seed import seed_data

app = Flask(__name__)
CORS(app)

# Ensure DB is initialized on startup
init_db()
seed_data()

@app.route('/api/offers', methods=['GET'])
def get_offers():
    conn = get_db_connection()
    offers = conn.execute('SELECT * FROM offers').fetchall()
    conn.close()
    return jsonify([dict(ix) for ix in offers])

@app.route('/api/offers/<int:offer_id>', methods=['GET'])
def get_offer(offer_id):
    conn = get_db_connection()
    offer = conn.execute('SELECT * FROM offers WHERE id = ?', (offer_id,)).fetchone()
    conn.close()
    if offer is None:
        return jsonify({'error': 'Offer not found'}), 404
    return jsonify(dict(offer))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4002, debug=True)
