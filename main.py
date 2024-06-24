from flask import Flask, render_template, request, jsonify
import json
import math

app = Flask(__name__)

# Load books data from JSON file
with open('books.json', 'r') as file:
    books_data = json.load(file)
typing = 'post'

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Handle form submission
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        # You can handle the form data here (e.g., save it to a database or send an email)
        return render_template('contact.html', success=True)
    return render_template('contact.html', success=False)

@app.route('/about')
def about():
    return render_template('about.html')

def paginate_books(page, per_page):
    start = (page - 1) * per_page
    end = start + per_page
    return books_data[start:end]

@app.route('/books', methods=['GET', 'POST'])
def books():
    page = request.args.get('page', 1, type=int)
    search_query = request.args.get('search_query', '', type=str)
    per_page = 10
    if search_query != '':
        request.method, request.form = 'POST', {'search_query':search_query}
    if request.method == 'POST':
        search_query = request.form['search_query'].lower()
        filtered_books = [book for book in books_data if search_query in book['a'].lower()]
    else:
        search_query = ""
        filtered_books = books_data
    total_books = len(filtered_books)
    total_pages = math.ceil(total_books / per_page)
    start = (page - 1)*per_page
    end = start + per_page   
    books_to_display = filtered_books[start:end] 
        # return render_template('books.html', books=filtered_books, page=page, total_pages=total_pages)
    return render_template('books.html', search_query=search_query, books=books_to_display, page=page, total_pages=total_pages)

if __name__ == '__main__':
    app.run(debug=True)