from traitement import (top_categorie_par_vente, top_fabriquant_par_vente, nb_produit_fabrique, 
                        top_vente_par_produit, evolution_vente_categorie_par_mois, 
                        nb_vente_fabriquant_sur_mois, nb_produit_par_magasin, 
                        pourcentage_produit_accord_vente, nb_accord_vente, nb_fab_pour_une_cat, 
                        evolution_nb_produit_du_fabriquant, evolution_nb_vente_semaine_sur_mois, 
                        creer_tableau_catid_produit, creer_tableau_fabid_produit, 
                        creer_tableau_prodid_produit, clear_dataframe_cache, dict_to_chartjs, evolution_to_chartjs)

import os
import time

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(base_dir, "data")

file1 = os.path.join(data_dir, "pointsDeVente-tous.txt")
file2 = os.path.join(data_dir, "produits-tous.txt")
file3 = os.path.join(data_dir, "data_movies_clean.csv")
file4 = os.path.join(data_dir, "data.csv")

def main(fabID, month, year):
    tick = time.time()
    
    print("\n--- Données globales ---")
    print(f"Top catégories fab {fabID}: {dict_to_chartjs(top_categorie_par_vente(file2, fabID, month, year))}")
    print(f"Top fabricants: {dict_to_chartjs(top_fabriquant_par_vente(file2, month, year))}")
    print(f"Nb produits fab {fabID}: {nb_produit_fabrique(file2, fabID, month, year)}")

    print("\n--- Données de ventes ---")
    print(f"Top ventes produit fab {fabID}: {top_vente_par_produit(file1, fabID, month, year)}")
    evolution = evolution_to_chartjs(evolution_vente_categorie_par_mois(file1, fabID, month, year))
    print(f"Évolution ventes fab {fabID}: {evolution}")
    print(f"Nb ventes fab {fabID}: {nb_vente_fabriquant_sur_mois(file1, fabID, month, year)}")

    print("\n--- Données magasins ---")
    print(f"Nb produits fab {fabID} par magasin :  {dict_to_chartjs(nb_produit_par_magasin(file1, fabID, month, year))}")
    print(f"% produits vendus fab {fabID}: {pourcentage_produit_accord_vente(file1, file2, fabID, month, year):.2f}%")
    print(f"Nb accord vente fab {fabID}: {nb_accord_vente(file1, fabID, month, year)}")

    print("\n--- Données fabricants ---")
    print(f"Nb fabs pour cat 4: {dict_to_chartjs(nb_fab_pour_une_cat(file2, month, year))}")
    evolution_mois = dict_to_chartjs(evolution_nb_produit_du_fabriquant(file2, fabID, month, year))
    print(f"Évolution produits fab {fabID}: {evolution_mois}")
    #evolution_semaines = dict_to_chartjs(evolution_nb_vente_semaine_sur_mois(file1, fabID, month, year))
    #print(f"Évolution ventes/semaine fab {fabID}: {evolution_semaines}")

    tack = time.time()
    print("\n" + "=" * 60)
    print(f"⚡ TEMPS TOTAL: {tack - tick:.3f} secondes")
    print("=" * 60)


if __name__ == "__main__":
    print("=" * 60)
    print("Configuration de l'analyse")
    print("=" * 60)
    
    fabID = int(input("Entrez le FabID (fabricant): "))
    month = int(input("Entrez le mois (1-12): "))
    year = int(input("Entrez l'année: "))
    
    main(fabID, month, year)

## Historique des temps d'exécution:
# v1 (sans optimisation): 20.167 secondes
# v2 (Pandas sans cache): 15.971 secondes  
# v3 (Pandas + cache partiel): 10.932 secondes
# v4 (Pandas + cache complet): 2.552 secondes
# v5 (Avec filtrage catID et fabID) : 4.561 secondes (moins bien mais résultats corrects)