from flask import Flask, render_template, request, jsonify
from solver import solve_matrix


app = Flask(__name__)

@app.route('/')
def start_sudoku():
    return render_template('sudoku.html')

@app.route('/solve', methods=['POST'])
def solve_sudoku():
    input_matrix = request.json.get('matrix', [])
    print(f'\ninput: {input_matrix}\n')
    solved_matrix = solve_matrix(input_matrix)
    return jsonify({
        'matrix': solved_matrix
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)