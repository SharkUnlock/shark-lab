from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Importante: Esto permite que tu web React se comunique con Python
CORS(app)

@app.route('/api/analizar', methods=['GET'])
def analizar():
    try:
        modelo = request.args.get('modelo', 'iphone_11')
        consumo_str = request.args.get('consumo', '0')
        consumo = int(consumo_str) if consumo_str else 0
        
        # --- MOTOR DE DIAGNÓSTICO SHARKUNLOCK ---
        # Coordenadas X/Y representan el punto en la placa (0-100)
        if consumo == 0:
            res = {"diagnostico": "Equipo sin consumo. Revisar Pin de Carga / Batería.", "x": 50, "y": 90}
        elif consumo > 0 and consumo < 80:
            res = {"diagnostico": "Falla en IC Hydra / Tristar (Carga).", "x": 65, "y": 25}
        elif consumo >= 80 and consumo < 250:
            res = {"diagnostico": "Falla en PMIC Principal / CPU no inicializa.", "x": 48, "y": 48}
        elif consumo >= 250 and consumo < 600:
            res = {"diagnostico": "Fuga en líneas secundarias (NAND/Display).", "x": 75, "y": 35}
        else:
            res = {"diagnostico": "Cortocircuito Total en VCC_MAIN.", "x": 35, "y": 42}
            
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("----------------------------------------------")
    print("🚀 SHARKUNLOCK BACKEND ACTIVO EN PUERTO 5000")
    print("----------------------------------------------")
    app.run(host='0.0.0.0', port=5000, debug=True)