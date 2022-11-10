"""
Main view
"""

import flask
import wireframe

@wireframe.app.route('/')
def index():
    """Display main page"""
    return 'Hello'

