import pytest
from server import app


@pytest.fixture
def client():
    app.config['testing'] = True
    client = app.test_client()
    yield client


def test_solve_matrix(client):
    body = {
        'matrix': [
            [5, 4, None, None, 2, None, 8, None, 6],
            [None, 1, 9, None, None, 7, None, None, 3],
            [None, None, None, 3, None, None, 2, 1, None],
            [9, None, None, 4, None, 5, None, 2, None],
            [None, None, 1, None, None, None, 6, None, 4],
            [6, None, 4, None, 3, 2, None, 8, None],
            [None, 6, None, None, None, None, 1, 9, None],
            [4, None, 2, None, None, 9, None, None, 5],
            [None, 9, None, None, 7, None, 4, None, 2]
        ]
    }
    res = client.post('/solve', json=body)
    assert res.status_code == 200
    assert res.json.get('matrix') == [
        [5, 4, 3, 9, 2, 1, 8, 7, 6],
        [2, 1, 9, 6, 8, 7, 5, 4, 3],
        [8, 7, 6, 3, 5, 4, 2, 1, 9],
        [9, 8, 7, 4, 6, 5, 3, 2, 1],
        [3, 2, 1, 7, 9, 8, 6, 5, 4],
        [6, 5, 4, 1, 3, 2, 9, 8, 7],
        [7, 6, 5, 2, 4, 3, 1, 9, 8],
        [4, 3, 2, 8, 1, 9, 7, 6, 5],
        [1, 9, 8, 5, 7, 6, 4, 3, 2]
    ]

