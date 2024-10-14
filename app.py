import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Database Configuration
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Models
class BetDescription(db.Model):
    __tablename__ = 'bet_description'
    bet_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    expiration_date = db.Column(db.Date, nullable=False)
    website = db.Column(db.String(255))
    status = db.Column(db.Enum('open', 'closed'))
    is_arbitrage = db.Column(db.Enum('yes', 'no'))

class ArbitrageOpportunities(db.Model):
    __tablename__ = 'arbitrage_opportunities'
    arb_id = db.Column(db.Integer, primary_key=True)
    bet_id1 = db.Column(db.Integer, db.ForeignKey('bet_description.bet_id'))
    bet_id2 = db.Column(db.Integer, db.ForeignKey('bet_description.bet_id'))
    timestamp = db.Column(db.DateTime)
    profit = db.Column(db.Numeric)

# Helper function to serialize SQLAlchemy objects
def serialize(model_instance):
    """Convert a SQLAlchemy model instance to a dictionary."""
    return {col.name: getattr(model_instance, col.name) for col in model_instance.__table__.columns}

# CRUD Operations for Bet Description

@app.route('/api/v1/bets', methods=['GET'])
def get_bets():
    bets = BetDescription.query.all()
    return jsonify([serialize(bet) for bet in bets])

@app.route('/api/v1/bets/<int:bet_id>', methods=['GET'])
def get_bet(bet_id):
    bet = BetDescription.query.get(bet_id)
    if bet:
        return jsonify(serialize(bet))
    return jsonify({'message': 'Bet not found'}), 404

@app.route('/api/v1/bets', methods=['POST'])
def create_bet():
    data = request.get_json()
    new_bet = BetDescription(
        name=data['name'],
        expiration_date=data['expiration_date'],
        website=data.get('website'),
        status=data['status'],
        is_arbitrage=data['is_arbitrage']
    )
    db.session.add(new_bet)
    db.session.commit()
    return jsonify(serialize(new_bet)), 201

@app.route('/api/v1/bets/<int:bet_id>', methods=['PUT'])
def update_bet(bet_id):
    bet = BetDescription.query.get(bet_id)
    if bet:
        data = request.get_json()
        bet.name = data.get('name', bet.name)
        bet.expiration_date = data.get('expiration_date', bet.expiration_date)
        bet.website = data.get('website', bet.website)
        bet.status = data.get('status', bet.status)
        bet.is_arbitrage = data.get('is_arbitrage', bet.is_arbitrage)
        db.session.commit()
        return jsonify(serialize(bet))
    return jsonify({'message': 'Bet not found'}), 404

@app.route('/api/v1/bets/<int:bet_id>', methods=['DELETE'])
def delete_bet(bet_id):
    bet = BetDescription.query.get(bet_id)
    if bet:
        db.session.delete(bet)
        db.session.commit()
        return jsonify({'message': 'Bet deleted'}), 200
    return jsonify({'message': 'Bet not found'}), 404

# CRUD Operations for Arbitrage Opportunities

@app.route('/api/v1/arbitrage', methods=['GET'])
def get_arbitrage_opportunities():
    opportunities = ArbitrageOpportunities.query.all()
    return jsonify([serialize(op) for op in opportunities])

@app.route('/api/v1/arbitrage/<int:arb_id>', methods=['GET'])
def get_arbitrage_opportunity(arb_id):
    opportunity = ArbitrageOpportunities.query.get(arb_id)
    if opportunity:
        return jsonify(serialize(opportunity))
    return jsonify({'message': 'Opportunity not found'}), 404

@app.route('/api/v1/arbitrage', methods=['POST'])
def create_arbitrage_opportunity():
    data = request.get_json()
    new_opportunity = ArbitrageOpportunities(
        bet_id1=data['bet_id1'],
        bet_id2=data['bet_id2'],
        timestamp=data['timestamp'],
        profit=data['profit']
    )
    db.session.add(new_opportunity)
    db.session.commit()
    return jsonify(serialize(new_opportunity)), 201

@app.route('/api/v1/arbitrage/<int:arb_id>', methods=['PUT'])
def update_arbitrage_opportunity(arb_id):
    opportunity = ArbitrageOpportunities.query.get(arb_id)
    if opportunity:
        data = request.get_json()
        opportunity.bet_id1 = data.get('bet_id1', opportunity.bet_id1)
        opportunity.bet_id2 = data.get('bet_id2', opportunity.bet_id2)
        opportunity.timestamp = data.get('timestamp', opportunity.timestamp)
        opportunity.profit = data.get('profit', opportunity.profit)
        db.session.commit()
        return jsonify(serialize(opportunity))
    return jsonify({'message': 'Opportunity not found'}), 404

@app.route('/api/v1/arbitrage/<int:arb_id>', methods=['DELETE'])
def delete_arbitrage_opportunity(arb_id):
    opportunity = ArbitrageOpportunities.query.get(arb_id)
    if opportunity:
        db.session.delete(opportunity)
        db.session.commit()
        return jsonify({'message': 'Opportunity deleted'}), 200
    return jsonify({'message': 'Opportunity not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=True)
