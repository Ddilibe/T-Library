#!/usr/bin/python3

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET'])
def contact():
    return render_template('contact.html')

@app.route('/library', methods=['GET'])
def library():
    return render_template('library.html')

@app.route('/books', methods=['GET'])
def books():
    return render_template('books.html')

if __name__ == "__main__":
    app.run(debug=True)