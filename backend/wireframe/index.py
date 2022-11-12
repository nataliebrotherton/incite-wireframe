"""
Main view
"""

import flask
import wireframe
import pathlib
import json

@wireframe.app.route('/data/<name>')
def get_data(name):
    """Retrieves dataset indicated by `name`. 

    Args:
        name (string): Indicates the name of the dataset to serve.
    """

    return get_json_file(name)

def get_json_file(filename):
    filename += '.json'
    filename = pathlib.Path(wireframe.app.config['DATA_DIR'])/filename
    with open(filename, 'r') as file:
        data = json.load(file)
        print(data)
    return data
