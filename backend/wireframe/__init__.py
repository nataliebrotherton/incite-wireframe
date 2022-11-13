import os
import pathlib

from flask import Flask
from flask_cors import CORS


app = Flask(__name__)

application_root = pathlib.Path(__file__).resolve().parent.parent
app.config['DATA_DIR'] = application_root/'data'
CORS(app)
