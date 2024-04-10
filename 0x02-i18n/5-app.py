#!/usr/bin/env python3
"""Basic flask app"""
from flask import Flask, render_template, request, g
from typing import Any, Union, Dict
from flask_babel import Babel
from config import Config

app = Flask(__name__)


# use Config to set Babel's default locale "en"
# and timezones ("UTC")
# app.config.from_object(Config)


babel = Babel(app)

# user table
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> Union[Dict, None]:
    """returns a user dictionary or none"""
    user_id = request.args.get('login_as')
    print("hii: {}".format(user_id))
    if user_id:
        current_user = users.get(int(user_id))
        return current_user
    return None


@app.before_request
def before_request() -> None:
    """use get_user to find a user if any and set it as flask.g.user"""
    user_dict = get_user()
    if user_dict:
        g.user = user_dict


@babel.localeselector
def get_locale() -> Union[str, None]:
    """determine the best match of lang"""
    if 'locale' in request.args:
        user_locale = request.args.get('locale')
        if user_locale in Config.LANGUAGES:
            return user_locale
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/', strict_slashes=False)
def hello_ba() -> Any:
    """Display an html page"""
    if 'user' in g:
        user = g.user['name']
    else:
        user = None
    return render_template('5-index.html', user=user)


if __name__ == "__main__":
    """Main func"""
    app.run(host='0.0.0.0', port=5000, debug=True)
