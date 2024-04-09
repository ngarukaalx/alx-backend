#!/usr/bin/env python3
"""Basic flask app"""
from flask import Flask, render_template
from typing import Any

app = Flask(__name__)


@app.route('/', strict_slashes=False)
def hello_ba() -> Any:
    """Display an html page"""
    return render_template('0-index.html')


if __name__ == "__main__":
    """Main func"""
    app.run(host='0.0.0.0', port=5000, debug=True)
