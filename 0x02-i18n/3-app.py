#!/usr/bin/env python3
"""Basic flask app"""
from flask import Flask, render_template, request
from typing import Any, Union
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


@babel.localeselector
def get_locale() -> Union[str, None]:
    """determine the best match of lang"""
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/', strict_slashes=False)
def hello_ba() -> Any:
    """Display an html page"""
    return render_template('3-index.html')


if __name__ == "__main__":
    """Main func"""
    app.run(host='0.0.0.0', port=5000, debug=True)
