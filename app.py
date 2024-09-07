from flask import Flask, render_template, request, redirect, jsonify, url_for, send_from_directory
import string
import random

app = Flask(__name__)

# Dictionary to store shortened URLs
url_database = {}

def generate_short_url():
    characters = string.ascii_letters + string.digits
    short_url = ''.join(random.choice(characters) for _ in range(6))
    return short_url

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        long_url = request.form['url']
        short_url = generate_short_url()
        url_database[short_url] = long_url
        full_short_url = request.host_url + short_url
        return jsonify({'short_url': full_short_url})
    return render_template('index.html')

@app.route('/<short_url>')
def redirect_to_url(short_url):
    long_url = url_database.get(short_url)
    if long_url:
        return redirect(long_url)
    else:
        return 'URL not found', 404

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)