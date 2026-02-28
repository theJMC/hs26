from flask import Flask, request, render_template
import os

NUM_PER_BOARDING_GROUP = int(os.getenv("NUM_PER_BOARDING_GROUP", "5"))
GROUPS = ["A", "B", "C", "D", "E"]

app = Flask(__name__,
            template_folder='templates')

# dict of gate IDs, each containing a list of players attached to each gate.
all_players = {}

def refresh_boarding_groups(gate_id):
    if all_players.get(gate_id) is None:
        all_players[gate_id] = []
        return
    elif all_players[gate_id] == []:
        all_players.pop(gate_id)
        return

    all_players[gate_id].sort(key=lambda x: x["score"], reverse=True)

    for index, player in enumerate(all_players[gate_id]):
        group = index // NUM_PER_BOARDING_GROUP
        if group >= len(GROUPS):
            group = len(GROUPS) - 1

        player["boarding_group"] = GROUPS[group]
    return


@app.route('/')
def hello():
    gates = list(all_players.keys())
    return render_template('admin.html', gates=gates)

@app.route("/gate/<gate_id>")
def gate(gate_id):
    gate_players = all_players.get(gate_id, [])
    return render_template('gate.html', gate_id=gate_id, gate_players=gate_players)

@app.route("/<gate_id>/new_player")
def new_player(gate_id):
    name = request.args.get('name', default='Player', type=str)
    score = request.args.get('score', default=0, type=int)

    if all_players.get(gate_id) is None:
        all_players[gate_id] = []

    all_players[gate_id].append({
        "name": name,
        "score": score
    })
    return {"message": f"Player {name} added successfully."}

@app.route("/<gate_id>/delete", methods=["DELETE"])
def delete_gate(gate_id):
    if all_players.get(gate_id) is not None:
        all_players.pop(gate_id)
    return {"message": f"Gate {gate_id} deleted successfully."}

@app.route('/<gate_id>/data')
def get_data(gate_id):
    name = request.args.get('name', default='Player', type=str)
    score = request.args.get('score', default=0, type=int)
    
    refresh_boarding_groups(gate_id)

    current_player = {}

    for player in all_players[gate_id]:
        if player["name"] == name:
            player["score"] = score
            current_player = player
            break
    else: 
        return {"error": "Player not found"}, 404

    return {"boarding_group": current_player["boarding_group"], "players": all_players[gate_id]}













if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
