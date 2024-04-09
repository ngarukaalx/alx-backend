#!/usr/bin/env python3
"""Basic flask app"""
from flask import Flask, render_template
from typing import Any
from flask_babel import Babel

app = Flask(__name__)


class Config:
    """list of available languages"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


# use Config to set Babel's default locale "en"
# and timezones ("UTC")
app.config.from_object(Config)


babel = Babel(app)


@app.route('/', strict_slashes=False)
def hello_ba() -> Any:
    """Display an html page"""
    return render_template('1-index.html')


if __name__ == "__main__":
    """Main func"""
    app.run(host='0.0.0.0', port=5000, debug=True)
