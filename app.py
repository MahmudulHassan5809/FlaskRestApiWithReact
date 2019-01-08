from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


#Product Class/Model
class Product(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(50),nullable=False,unique=True)
	description = db.Column(db.String(200))
	price = db.Column(db.Float)
	qty = db.Column(db.Integer)

	def __init__(self,name,description,price,qty):
		self.name = name
		self.description = description
		self.price = price
		self.qty = qty

#product Schema
class ProductSchema(ma.Schema):
	class Meta:
		fields = ('id','name','description','price','qty')

#init schema
product_schema  = ProductSchema(strict=True)
products_schema = ProductSchema(many=True,strict=True)


#create Product
@app.route('/product',methods=['POST'])
def add_product():
	name = request.json['name']
	description = request.json['description']
	price = request.json['price']
	qty = request.json['qty']
	new_product = Product(name,description,price,qty)
	db.session.add(new_product)
	db.session.commit()
	#return product_schema.jsonify(new_product)
	all_products = Product.query.all()
	result = products_schema.dump(all_products)
	return jsonify(result.data)





#get All Products
@app.route('/products',methods=['GET'])
def get_products():
	all_products = Product.query.all()
	result = products_schema.dump(all_products)
	return jsonify(result.data)

#get Single Product
@app.route('/product/<id>',methods=['GET'])
def get_product(id):
	product = Product.query.get(id)
	return product_schema.jsonify(product)

#update Product
@app.route('/product/<id>',methods=['PUT'])
def update_product(id):
	product = Product.query.get(id)

	name = request.json['name']
	description = request.json['description']
	price = request.json['price']
	qty = request.json['qty']
	product.name = name
	product.description = description
	product.price = price
	product.qty = qty
	db.session.commit()
	all_products = Product.query.all()
	result = products_schema.dump(all_products)
	return jsonify(result.data)
	#return product_schema.jsonify(product)



#Delete Single Product
@app.route('/product/<id>',methods=['DELETE'])
def delete_product(id):
	product = Product.query.get(id)
	db.session.delete(product)
	db.session.commit()
	return product_schema.jsonify(product)


@app.route('/')
def index():
	return "Hello World"

if __name__=='__main__':
	app.run(debug=True)


