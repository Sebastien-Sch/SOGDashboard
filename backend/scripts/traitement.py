import os
import gzip
import collections
import calendar
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import datetime

###### Constante ######

months = list(calendar.month_name)[1:]
dateID_key_vente = 0
prodID_key_vente = 1
catID_key_vente = 2
fabID_key_vente = 3
magID_key_vente = 4

dateID_key_produit = 0
prodID_key_produit = 1
catID_key_produit = 2
fabID_key_produit = 3

###### PENSE BETE #######
#{
#    "logID": 2,
#    "dateID": 20220101,
#    "prodID": 1,
#    "catID": 4,
#    "fabID": 541,
#    "magID": 61
#}
####################### 


############################# DONNEES GLOBALES ###############################

def top_categorie_par_vente(File, fabID, month, year): ### a mettre pour fabricant
    """
    Cette fonction categorise en pourcentage les ventes par categorie pour un mois d'une annee donnee
    """
    try:
        df = _read_file_pandas(File, 'produit')                                                         # Lecture du fichier, avec 4 colonnes (comme l'indique produit)
        filtered = df[(df['date'].dt.month == month) & (df['date'].dt.year == year) & (df['fabID'] == fabID)]                    # On prend les lignes contenant la bonne année et le bon mois
        
        cat_percentages = (filtered['catID'].value_counts(normalize=True) * 100).to_dict()              # On compte les occurrences de chaque catID, on normalise pour avoir des pourcentages, et on convertit en dictionnaire
        return dict(sorted(cat_percentages.items(), key=lambda item: item[1], reverse=True))            # On trie le dictionnaire par pourcentage decroissant
    except Exception as error:
        print(error)
        return {}

def top_fabriquant_par_vente(File, month, year):                                                        
    """
    Cette fonction categorise les meilleurs fabriquant en termes de ventes pour un mois d'une annee donnee
    """
    try:
        df = _read_file_pandas(File, 'produit')
        filtered = df[(df['date'].dt.month == month) & (df['date'].dt.year == year)]                    
        
        vente_counts = filtered['fabID'].value_counts().to_dict()                                       # Pour chaque fabID, on compte les occurence des ventes
        return vente_counts                                                                                                        
    except Exception as error:
        print(error)
        return {}

def nb_produit_fabrique(File, fabID, month, year):
    """
    Cette fonction compte le nombre de produit fabriqué, tout produit et catégorie confondus,
    par un fabriquant donné (fabID) pour un mois d'une année donnée (month, year).
    """
    try:
        df = _read_file_pandas(File, 'produit')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['fabID'] == fabID)]                                                            # On regarde si le fabID correspond
        return len(filtered)                                                                            # on retourne le nombre de lignes correspondantes == nombre de produits fabriqués
    except Exception as error:
        print(error)
        return 0


############################# DONNEES DE VENTES ##############################

def top_vente_par_produit(File, fabID, month, year): ### a mettre pour fabricant
    """
    Cette fonction creer un tableau qui classe le top vente de produit [nb ventes, prodID, catID] pour un mois sur une année donnée
    """
    try:
        df = _read_file_pandas(File, 'vente')                                                           
        filtered = df[(df['date'].dt.month == month) & (df['date'].dt.year == year) & (df['fabID'] == fabID)]
        
        grouped = filtered.groupby(['prodID', 'catID']).size().reset_index(name='nb_ventes')            # On groupe par prodID et catID, et on compte les occurrences (ventes)
        grouped = grouped.sort_values('nb_ventes', ascending=False)                                     # On trie par nb_ventes décroissant               
        
        return grouped[['nb_ventes', 'prodID', 'catID']].values.tolist()                                # On convertit en liste de listes [nb_ventes, prodID, catID]
    except Exception as error:
        print(error)
        return []

def evolution_vente_categorie_par_mois(File, catID, fabID, month, year):
    """
    Cette fonction analyse l'évolution des ventes pour une catégorie donnée (catID) pour un fabriquant
    sur une periode mensuelle d'une année donnée (year).
    """
    try:
        df = _read_file_pandas(File, 'vente')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['catID'] == catID) & 
                     (df['fabID'] == fabID)]
        
        vente_counts = filtered.groupby(filtered['date'].dt.day).size().to_dict()                           # On groupe par jour et on compte les occurrences (ventes)
        return collections.defaultdict(int, vente_counts)                                                   # On retourne un defaultdict pour gérer les jours sans ventes
    except Exception as error:
        print(error)
        return collections.defaultdict(int)

def nb_vente_fabriquant_sur_mois(File, fabID, month, year):
    """
    Cette fonction compte le nombre de ventes pour un fabriquant donné (fabID), sur une periode donnée (un mois d'une année).
    """
    try:
        df = _read_file_pandas(File, 'vente')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['fabID'] == fabID)]                                                                # On verifie la date ainsi que le fabID
        return len(filtered)                                                                                # On retourne le nombre de lignes correspondantes == nombre de ventes du fabriquant
    except Exception as error:
        print(error)
        return 0


############################# DONNEES MAGASINS ###############################

def nb_produit_par_magasin(File, fabID, storeID, month, year): ### a mettre pour fabricant
    try:
        df = _read_file_pandas(File, 'vente')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['fabID'] == fabID) & 
                     (df['magID'] == storeID)]                                                           # On verifie la date ainsi que le magID                    
        return len(filtered)                                                                             # On retourne le nombre de lignes correspondantes == nombre de produits dans le magasin
    except Exception as error:
        print(error)
        return 0

def pourcentage_produit_accord_vente(File_vente, file_produit, fabID, month, year):
    """
    Cette fonction calcule le pourcentage de produits vendus par rapport au nombre total de produits fabriqués
    par un fabriquant donné (fabID) pour un mois d'une année donnée (month, year).
    """
    try:
        df_vente = _read_file_pandas(File_vente, 'vente')                                                # Lecture du fichier de ventes
        df_produit = _read_file_pandas(file_produit, 'produit')                                          # Lecture du fichier de produits
        
        nb_produit_vente = len(df_vente[(df_vente['date'].dt.month == month) & 
                                        (df_vente['date'].dt.year == year) & 
                                        (df_vente['fabID'] == fabID)])                                  # On compte les produits vendus du fabriquant
        nb_produit_produit = len(df_produit[df_produit['fabID'] == fabID])                              # On compte le nombre total de produits fabriqués du fabriquant
        
        if nb_produit_produit == 0:                                                                     # Si il ya 0 produit, comme les div par 0 sont impossible on retourne 0 directement
            return 0.0
        return (nb_produit_vente / nb_produit_produit) * 100                                            # on fait le pourcentage (produits vendu / produit total) * 100
    except Exception as error:
        print(error)
        return 0.0



def nb_accord_vente(File, fabID, month, year):
    """
    """
    try:
        df = _read_file_pandas(File, 'vente')
        nb_ventes = len(df[(df['date'].dt.month == month) & 
                          (df['date'].dt.year == year) & 
                          (df['fabID'] == fabID)])                                                      # On verifie la date ainsi que le fabID
        return nb_ventes                                                                                # On retourne le nombre de lignes correspondantes == nombre de ventes du fabriquant
    except Exception as error:
        print(error)
        return 0


############################# DONNEES FABRIQUANT #############################

def nb_fab_pour_une_cat(File, catID, month, year):
    """"
    Cette fonction lit un fichier d'entrée et compte le nombre de fabricants
    uniques pour une catégorie de produit donnée (catID).
    """
    try:
        df = _read_file_pandas(File, 'produit')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['catID'] == catID)]                                                            # On prendre les lignes avec la bonne date et la bonne catégorie
        return filtered['fabID'].nunique()                                                              # On retourne le nombre de fabriquants uniques grace a la fonction nunique()                                  
    except Exception as error:
        print(error)
        return 0


def evolution_nb_produit_du_fabriquant(File, fabID, month, year):
    """
    
    """
    try:
        df = _read_file_pandas(File, 'produit')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['fabID'] == fabID)]                                                            # On verifie la date ainsi que le fabID                        
        
        dico_nb_produit_par_mois = filtered.groupby(filtered['date'].dt.day).size().to_dict()           # dico des date et du nombre de produits fabriqués
        return collections.defaultdict(int, dico_nb_produit_par_mois)                                   # On retourne un defaultdict pour gérer les jours sans produits                
    except Exception as error:
        print(error)
        return collections.defaultdict(int)        

def evolution_nb_vente_semaine_sur_mois(File, fabID, month, year):
    """
    """
    try:
        df = _read_file_pandas(File, 'vente')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['fabID'] == fabID)]                                                            # On verifie la date ainsi que le fabID
        
        filtered = filtered.copy()                                                                      # Copier le DataFrame pour éviter les modifications sur l'original
        filtered['week'] = filtered['date'].dt.isocalendar().week                                       # Ajouter colonne semaine
        
        dico_nb_vente_par_semaine = filtered.groupby('week').size().to_dict()
        return collections.defaultdict(int, dico_nb_vente_par_semaine)
    except Exception as error:
        print(error)
        return collections.defaultdict(int)

############################# SIDE REQUEST #############################

def creer_tableau_fabid_produit(File, produit_ou_vente="produit"):
    """
    Cette fonction crée un tableau des identifiants de fabricants.
    Parfait pour automatiser
    """
    try:
        df = _read_file_pandas(File, produit_ou_vente)
        return df['fabID'].unique().tolist()
    except Exception as error:
        print(error)
        return []

def creer_tableau_catid_produit(File, produit_ou_vente="produit"):
    """
    Cette fonction crée un tableau des identifiants de catégories.
    Parfait pour automatiser
    """
    try:
        df = _read_file_pandas(File, produit_ou_vente)
        return df['catID'].unique().tolist()
    except Exception as error:
        print(error)
        return []

def creer_tableau_prodid_produit(File, produit_ou_vente="produit"):
    """
    Cette fonction crée un tableau des identifiants de produits.
    Parfait pour automatiser
    """
    try:
        df = _read_file_pandas(File, produit_ou_vente)
        return df['prodID'].unique().tolist()
    except Exception as error:
        print(error)
        return []

# Cache global pour les DataFrames
_dataframe_cache = {}

def _read_file_pandas(File, file_type='vente', use_cache=True):
    """Lit un fichier avec pandas et retourne un DataFrame optimisé avec cache"""
    # Vérifier le cache
    cache_key = (File, file_type)
    if use_cache and cache_key in _dataframe_cache:
        return _dataframe_cache[cache_key]
    
    # Lecture du fichier
    if File.endswith('.csv'):
        sep = ','
    else:
        sep = r'\s+'  # Espace(s) pour .txt
    
    if file_type == 'vente':
        columns = ['date', 'prodID', 'catID', 'fabID', 'magID']
    else:  # produit
        columns = ['date', 'prodID', 'catID', 'fabID']
    
    df = pd.read_csv(File, sep=sep, names=columns, header=None, engine='python')
    df['date'] = pd.to_datetime(df['date'], format='%Y%m%d')
    
    # Mettre en cache
    if use_cache:
        _dataframe_cache[cache_key] = df
    
    return df

def clear_dataframe_cache():
    """Vide le cache des DataFrames (utile pour libérer la mémoire)"""
    global _dataframe_cache
    _dataframe_cache.clear()

def calculer_liste_categorie(File, file_type='produit'):
    """
    Cette fonction lit un fichier d'entrée et crée une liste des catégories uniques présentes dans le fichier.
    """
    try:
        df = _read_file_pandas(File, file_type)
        return df['catID'].unique().tolist()
    except Exception as error:
        print(error)
        return []

def top_fab_par_nb_produit(File, week, catID, year, file_type='produit'):
    """
    Cette fonction lit un fichier d'entrée
    Elle classe les top fabricants pour une catégorie donnée (catID) et une semaine donnée (week) d'une année précise (year)
    """
    try:
        df = _read_file_pandas(File, file_type)
        # Ajouter la colonne semaine
        df['week'] = df['date'].dt.isocalendar().week
        
        # Filtrer par année, semaine et catégorie
        filtered = df[(df['date'].dt.year == year) & 
                     (df['week'] == week) & 
                     (df['catID'] == catID)]
        
        # Compter les produits par fabricant
        fab_counts = filtered['fabID'].value_counts()
        return [(fab, count) for fab, count in fab_counts.items()]
    except Exception as error:
        print(error)
        return []
    


def fab_par_categorie(File, catID, file_type='produit'):
    """
    Cette fonction lit un fichier d'entrée et compte le nombre de fabricants
    uniques pour une catégorie de produit donnée (catID), puis crée un dictionnaire
    associant chaque fabricant à l'ensemble de ses produits dans cette catégorie.
    Le probleme est que la fonction affiche du coup tous les fabriquants, car on ne filtre pas par année
    """
    try:
        df = _read_file_pandas(File, file_type)
        filtered = df[df['catID'] == catID]
        
        # Créer un dictionnaire fabID -> set de prodIDs
        prods = {}
        for fab in filtered['fabID'].unique():
            prods[fab] = set(filtered[filtered['fabID'] == fab]['prodID'].unique())
        
        return prods
    except Exception as error:
        print(error)
        return {}