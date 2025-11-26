import collections
import calendar
import pandas as pd

###### Constante ######

months = list(calendar.month_name)[1:]

############################# DONNEES GLOBALES ###############################

def top_categorie_par_vente(File, fabID, month, year): # Pie chart
    """
    Cette fonction categorise en pourcentage les ventes par categorie pour un mois d'une annee donnee
    """
    try:
        df = _read_file_pandas(File, 'produit')                                                                     # Lecture du fichier, avec 4 colonnes (comme l'indique produit)
        filtered = df[(df['date'].dt.month == month) & (df['date'].dt.year == year) & (df['fabID'] == fabID)]       # On prend les lignes contenant la bonne année et le bon mois
        
        cat_percentages = (filtered['catID'].value_counts(normalize=True) * 100).to_dict()                          # On compte les occurrences de chaque catID, on normalise pour avoir des pourcentages, et on convertit en dictionnaire
        return dict(sorted(cat_percentages.items(), key=lambda item: item[1], reverse=True))                        # On trie le dictionnaire par pourcentage decroissant
    except Exception as error:
        print(error)
        return {}

def top_fabriquant_par_vente(File, month, year): # Tableau                                                      
    """
    Cette fonction categorise les meilleurs fabriquant en termes de ventes pour un mois d'une annee donnee
    """
    try:
        df = _read_file_pandas(File, 'produit')
        filtered = df[(df['date'].dt.month == month) & (df['date'].dt.year == year)]                    
        
        vente_counts = filtered['fabID'].value_counts().to_dict()                                                   # Pour chaque fabID, on compte les occurence des ventes
        return vente_counts                                                                                         # On retourne le dictionnaire                                                                                                     
    except Exception as error:
        print(error)
        return {}

def nb_produit_fabrique(File, fabID, month, year): # Chiffre
    """
    Cette fonction compte le nombre de produit fabriqué, tout produit et catégorie confondus,
    par un fabriquant donné (fabID) pour un mois d'une année donnée (month, year).
    """
    try:
        df = _read_file_pandas(File, 'produit')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['fabID'] == fabID)]                                                                        # On regarde si le fabID, la date et le mois correspondent
        return len(filtered)                                                                                        # on retourne le nombre de lignes correspondantes == nombre de produits fabriqués
    except Exception as error:
        print(error)
        return 0


############################# DONNEES DE VENTES ##############################

def top_vente_par_produit(File, fabID, month, year): # Tableau
    """
    Cette fonction creer un tableau qui classe le top vente de produit [nb ventes, prodID, catID] pour un mois sur une année donnée
    """
    try:
        df = _read_file_pandas(File, 'vente')                                                                   # On read le file, on indique qu'il s'agit du fichier de vente donc le file va utiliser les colonnes correspondantes (voir read_file_pandas)                                                           
        filtered = df[(df['date'].dt.month == month) & (df['date'].dt.year == year) & (df['fabID'] == fabID)]   # On verifie la date ainsi que le fabID
        
        grouped = filtered.groupby(['prodID', 'catID']).size().reset_index(name='nb_ventes')                    # On groupe par prodID et catID, et on compte les occurrences (ventes)
        grouped = grouped.sort_values('nb_ventes', ascending=False)                                             # On trie par nb_ventes décroissant               
        
        return grouped[['nb_ventes', 'prodID', 'catID']].values.tolist()                                        # On convertit en liste de listes [nb_ventes, prodID, catID]
    except Exception as error:
        print(error)
        return []

def evolution_vente_categorie_par_mois(File, fabID, month, year): # Graphique
    """
    Cette fonction analyse l'évolution des ventes pour TOUTES les catégories d'un fabriquant
    sur une periode mensuelle d'une année donnée (year).
    
    Returns:
        dict: {catID: {semaine: nb_ventes}}
    """
    try:
        print("month", month)
        print("file", File)
        print("year", year)
        print("fabID", fabID)
        df = _read_file_pandas(File, 'vente')                                                                   # On lit le fichier                                
        print("df", df )                          
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year)]                                                                    # On verifie que les lignes correspondes a nos parametres
        
        categories = filtered['catID'].unique()                                                                 # Récupérer toutes les catégories (une seule occurence dans la liste grace a unique)                  
        
        result = {}                                                                                             # Initialisation du dictionnaire de résultat
        print("ICIIIIIIIIIIIIIIIIIIIIII", filtered)
        for catID in categories:  
            print("ICIIIIIIIIIIIIIIIIIIIIII", catID)                                                                              # Pour chaque catégorie
            cat_filtered = filtered[filtered['catID'] == catID].copy()                                          # On fait une copie du filtered DataFrame pour éviter les modifications sur l'original, on prend les lignes de filtered qui avec catID qui correspond au catID de la boucle
            cat_filtered['week'] = cat_filtered['date'].dt.isocalendar().week                                   # on extrait la semaine de la date 
            vente_counts = cat_filtered.groupby('week').size().to_dict()
            print("vente",vente_counts)                                       # On groupe par semaine et on compte les occurrences (ventes)                        
            vente_counts = {int(k): int(v) for k, v in vente_counts.items()}                                    # Convertir pour JSON
            result[int(catID)] = vente_counts
        print("salut",result)
        return result
    except Exception as error:
        print(error)
        return {}

def nb_vente_fabriquant_sur_mois(File, fabID, month, year): # Chiffre
    """
    Cette fonction compte le nombre de ventes pour un fabriquant donné (fabID), sur une periode donnée (un mois d'une année).
    """
    try:
        df = _read_file_pandas(File, 'vente')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['fabID'] == fabID)]                                                                    # On verifie la date ainsi que le fabID
        return len(filtered)                                                                                    # On retourne le nombre de lignes correspondantes == nombre de ventes du fabriquant
    except Exception as error:
        print(error)
        return 0


############################# DONNEES MAGASINS ###############################

def nb_produit_par_magasin(File, fabID, month, year): # Bar chart
    """
    Cette fonction compte le nombre de produits par magasin pour un fabriquant donné
    sur une période donnée (mois/année).
    
    Returns:
        dict: {storeID: nb_produits}
    """
    try:
        df = _read_file_pandas(File, 'vente')                                                                   # On lit le fichier
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['fabID'] == fabID)]                                                                    # On verifie la date ainsi que le fabID                                 
        
        stores = filtered['magID'].unique()                                                                     # On fait une liste des magasins (une occ)
        
        result = {}
        for storeID in stores:                                                                                  # On parcourt la liste de magasins
            store_filtered = filtered[filtered['magID'] == storeID]                                             # On filtre les lignes correspondant au magasin
            result[int(storeID)] = len(store_filtered)                                                          # La clé sera le storeID, et la valeur la longueur du store filtered               
        
        return result
    except Exception as error:
        print(error)
        return {}

def pourcentage_produit_accord_vente(File_vente, file_produit, fabID, month, year): # donut chart
    """
    Cette fonction calcule le pourcentage de produits vendus par rapport au nombre total de produits fabriqués
    par un fabriquant donné (fabID) pour un mois d'une année donnée (month, year).
    """
    try:
        df_vente = _read_file_pandas(File_vente, 'vente')                                                       # Lecture du fichier de ventes
        df_produit = _read_file_pandas(file_produit, 'produit')                                                 # Lecture du fichier de produits
        
        ventes_filtered = df_vente[(df_vente['date'].dt.month == month) & 
                                (df_vente['date'].dt.year == year) & 
                                (df_vente['fabID'] == fabID)]
        nb_produit_vente = ventes_filtered['prodID'].nunique()
        nb_produit_produit = len(df_produit[(df_produit['date'].dt.month == month) & 
                                            (df_produit['date'].dt.year == year) & 
                                            (df_produit['fabID'] == fabID)])                                    # On compte le nombre total de produits fabriqués du fabriquant pour ce mois/année
        
        if nb_produit_produit == 0:                                                                             # Si il ya 0 produit, comme les div par 0 sont impossible on retourne 0 directement
            return 0.0
        return (nb_produit_vente / nb_produit_produit) * 100                                                    # on fait le pourcentage (produits vendu / produit total) * 100
    except Exception as error:
        print(error)
        return 0.0



def nb_accord_vente(File, fabID, month, year): # chiffre
    """
    """
    try:
        df = _read_file_pandas(File, 'vente')
        nb_ventes = len(df[(df['fabID'] == fabID)])                                                             # On verifie la date ainsi que le fabID
        return nb_ventes
    except Exception as error:                                                                               
        print(error)
        return 0


############################# DONNEES FABRIQUANT #############################

def nb_fab_pour_une_cat(File, month, year): # bar chart
    """"
    Cette fonction compte le nombre de fabricants uniques pour chaque catégorie
    sur une période donnée (mois/année).
    
    Returns:
        dict: {catID: nb_fabricants}
    """
    try:
        df = _read_file_pandas(File, 'produit')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year)]
        
        categories = filtered['catID'].unique()                                                                 # Récupérer toutes les catégories uniques

        
        result = {}
        for catID in categories:
            cat_filtered = filtered[filtered['catID'] == catID]
            result[int(catID)] = cat_filtered['fabID'].nunique() # le nombre de valeur unique
        
        return result
    except Exception as error:
        print(error)
        return {}


def evolution_nb_produit_du_fabriquant(File, fabID, month, year): # graphique
    """
    
    """
    try:
        df = _read_file_pandas(File, 'produit')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['fabID'] == fabID)]                                                                    # On verifie la date ainsi que le fabID                        
        
        dico_nb_produit_par_mois = filtered.groupby(filtered['date'].dt.day).size().to_dict()                   # dico des date et du nombre de produits fabriqués
        # Convertir les clés numpy en int Python pour la compatibilité JSON
        dico_nb_produit_par_mois = {int(k): int(v) for k, v in dico_nb_produit_par_mois.items()}
        return collections.defaultdict(int, dico_nb_produit_par_mois)                                           # On retourne un defaultdict pour gérer les jours sans produits                
    except Exception as error:
        print(error)
        return dict(collections.defaultdict(int))     

def evolution_nb_vente_semaine_sur_mois(File, fabID, month, year):
    """
    """
    try:
        df = _read_file_pandas(File, 'vente')
        filtered = df[(df['date'].dt.month == month) & 
                     (df['date'].dt.year == year) & 
                     (df['fabID'] == fabID)]                                                                    # On verifie la date ainsi que le fabID
        
        filtered = filtered.copy()                                                                              # Copier le DataFrame pour éviter les modifications sur l'original
        filtered['week'] = filtered['date'].dt.isocalendar().week                                               # Ajouter colonne semaine
        
        dico_nb_vente_par_semaine = filtered.groupby('week').size().to_dict()
        # Convertir les clés numpy en int Python pour la compatibilité JSON
        dico_nb_vente_par_semaine = {int(k): int(v) for k, v in dico_nb_vente_par_semaine.items()}
        return collections.defaultdict(int, dico_nb_vente_par_semaine)
    except Exception as error:
        print(error)
        return collections.defaultdict(int)

############################# SIDE REQUEST #############################

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
    

############################# CONVERSION POUR CHARTJS #######################

def dict_to_chartjs(data_dict): # dico to {labels: [], data: []}
    """
    Convertit un dictionnaire {catID: valeur} en format Chart.js
    Exemple:
        Input: {4: 45.5, 2: 30.2, 1: 24.3}
        Output: {"labels": [4, 2, 1], "data": [45.5, 30.2, 24.3]}
    """
    # Si le dico est vide
    if not data_dict:
        return {"labels": [], "data": []}
    
    labels = list(data_dict.keys())
    data = list(data_dict.values())
    
    return {
        "labels": labels,
        "data": data
    }

def evolution_to_chartjs(evolution_dict): # dico of dico to {labels: [], datasets: [{label: , data: []}, ...]}
    """
    Convertit l'évolution multi-catégories en format Chart.js pour graphique d'évolution
    Input: {3: {17: 8}, 1: {18: 83, 22: 70}, 6: {20: 72}}
    Output: {"labels": [17, 18, 20, 22], "datasets": [{"label": "Cat 1", "data": [0, 83, 0, 70]}, ...]}
    """
    if not evolution_dict:
        return {"labels": [], "datasets": []}
    
    # Collecter toutes les semaines et trier
    all_weeks = set()
    for week_data in evolution_dict.values():
        all_weeks.update(week_data.keys())
    labels = sorted(list(all_weeks))
    
    # Créer un dataset par catégorie
    datasets = []
    for catID in sorted(evolution_dict.keys()):
        dataset = {
            "label": f"Catégorie {catID}",
            "data": [evolution_dict[catID].get(week, 0) for week in labels]
        }
        datasets.append(dataset)
    
    return {
        "labels": labels,
        "datasets": datasets
    }