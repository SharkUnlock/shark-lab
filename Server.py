from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/analizar', methods=['GET'])
def analizar():
    try:
        modelo = request.args.get('modelo', 'iphone_11')
        consumo = int(request.args.get('consumo', 0))
        
        # LÓGICA SHARKUNLOCK IA
        if consumo == 0:
            res = {"diagnostico": "Sin Consumo (Revisar pin)", "x": 50, "y": 90}
        elif 10 <= consumo <= 100:
            res = {"diagnostico": "Falla IC de Carga (Tristar)", "x": 70, "y": 25}
        elif 101 <= consumo <= 400:
            res = {"diagnostico": "Falla PMIC Secundario", "x": 45, "y": 55}
        elif consumo > 400:
            res = {"diagnostico": "Corto en VCC_MAIN", "x": 30, "y": 45}
        else:
            res = {"diagnostico": "Consumo Anómalo Detectado", "x": 15, "y": 75}

        return jsonify(res)
    except:
        return jsonify({"error": "Dato inválido"}), 400

if __name__ == '__main__':
    print("🔥 SHARKUNLOCK API CLOUD CONNECTED")
    app.run(port=5000, debug=True)