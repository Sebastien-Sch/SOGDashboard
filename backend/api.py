from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from scripts.traitement import (dict_to_chartjs,
                                evolution_to_chartjs,
                                top_categorie_par_vente,
                                top_fabriquant_par_vente,
                                nb_produit_fabrique,
                                top_vente_par_produit,
                                evolution_vente_categorie_par_mois,
                                nb_vente_fabriquant_sur_mois,
                                nb_produit_par_magasin,
                                pourcentage_produit_accord_vente,
                                nb_accord_vente,
                                nb_fab_pour_une_cat,
                                evolution_nb_produit_du_fabriquant,
                                evolution_nb_vente_semaine_sur_mois)

app = Flask(__name__)
CORS(app)

FILE_VENTE = os.path.join(os.path.dirname(__file__), 'data', 'pointsDeVente-tous.txt')
FILE_PRODUIT = os.path.join(os.path.dirname(__file__), 'data', 'produits-tous.txt')

@app.route('/api/health', methods=['GET'])
def health():
    """Endpoint pour vérifier que l'API fonctionne"""
    return jsonify({"status": "ok", "message": "API is running"})

@app.route('/api/dashboard/<int:fabID>/<int:month>/<int:year>', methods=['GET'])
def get_dashboard_data(fabID, month, year):
    """Récupère toutes les données pour le dashboard"""
    try:

        data = {
            "topCategories": dict_to_chartjs(top_categorie_par_vente(FILE_PRODUIT, fabID, month, year)),
            "topFabricants": dict_to_chartjs(top_fabriquant_par_vente(FILE_PRODUIT, month, year)),
            "nbProduitsFabriques": nb_produit_fabrique(FILE_PRODUIT, fabID, month, year),
            "evolutionVentes": evolution_to_chartjs(evolution_vente_categorie_par_mois(FILE_VENTE, fabID, month, year)),
            "nbVentes": nb_vente_fabriquant_sur_mois(FILE_VENTE, fabID, month, year),
            "produitsParMagasin": dict_to_chartjs(nb_produit_par_magasin(FILE_VENTE, fabID, month, year)),
            "pourcentageVendus": round(pourcentage_produit_accord_vente(FILE_VENTE, FILE_PRODUIT, fabID, month, year), 2),
            "nbFabParCategorie": dict_to_chartjs(nb_fab_pour_une_cat(FILE_PRODUIT, month, year)),
            "nbAccordVente": nb_accord_vente(FILE_VENTE, fabID, month, year),
            "topVentesProduits": top_vente_par_produit(FILE_VENTE, fabID, month, year),
            "evolutionProduitsFab": dict_to_chartjs(dict(evolution_nb_produit_du_fabriquant(FILE_PRODUIT, fabID, month, year))),
            "evolutionVentesSemaine": dict_to_chartjs(dict(evolution_nb_vente_semaine_sur_mois(FILE_VENTE, fabID, month, year)))
        }
        print("data",data)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("API démarrée sur http://0.0.0.0:5000")
    print("Accessible depuis votre réseau local")
    print("Testez: http://172.16.8.124:5000/api/dashboard/109/5/2022")
    app.run(debug=True, host='172.16.8.124', port=5000)