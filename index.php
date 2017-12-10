<?php
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=editeur;charset=utf8', 'root', 'Pau64ben/su00');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}

if(isset($_POST["recupIframe"])){
    
    $req = $bdd->prepare('INSERT INTO commentaire(text) VALUES(:commentaire)');
    $req->execute(array(
        'commentaire' => $_POST['recupIframe']
    ));
    
    $req = $bdd->query('SELECT * FROM commentaire');
   
    while($data = $req->fetch()){
        
        echo $data['text'];
        echo '<br>';

        
    }
}

/*************************************************************/
/*************************************************************/
/*************************************************************/

?>

<html>
<head>  
    <meta charset="utf-8" />
    <title>Titre</title>
    <link rel="stylesheet" href="css/index.css" />
</head>
<body onLoad="loadIframe()">
    
    <h1>Editeur de texte en Javascript</h1>
    
    <article>
        
        <form name="formEdit" id="formEdit" method="POST" action="index.php">
        
            <aside id="menu_edition">

                <div>

                    <li><a href="#" id="button_file">Fichier</a>

                        <ul id="ul_file">

                            <li><a href="#">Ouvrir</a></li>
                            <li><a href="#" id="button_save">Enregistré</a></li>
                            <li><a href="#">Nouveau projet</a></li>
                            <li><a href="#" id="print">Imprimé</a></li>

                        </ul>

                    </li>

                    <li><a href="#" id="button_edit">Edit</a>

                        <ul id="ul_edit">

                            <li><a href="#">Couper</a></li>
                            <li><a href="#">Copier</a></li>
                            <li><a href="#">Coller</a></li>

                        </ul>

                    </li>

                </div>

            </aside>

            <aside id="menu_editeur">

                <div id="div_police">

                    <li><a href="#" id="button_bold" class="btn_hover">G</a></li>
                    <li><a href="#" id="button_italic" class="btn_hover">I</a></li>
                    <li><a href="#" id="button_underline" class="btn_hover">U</a></li>

                </div>

                <div id="div_police_autre">

                    <nav id="nav_list_color">


                        <li><a href="#" id="a_color"></a>

                            <ul>
                                <h3>Palette de couleurs</h3>
                                <li><a href="#" id="a_white" class="btn"></a></li>
                                <li><a href="#" id="a_grey" class="btn"></a></li>
                                <li><a href="#" id="a_black" class="btn"></a></li>
                                <li><a href="#" id="a_red" class="btn"></a></li>
                                <li><a href="#" id="a_blue" class="btn"></a></li>
                                <li><a href="#" id="a_green" class="btn"></a></li>
                                <li><a href="#" id="a_yellow" class="btn"></a></li>
                                <li><a href="#" id="a_orange" class="btn"></a></li>
                            </ul>

                        </li>


                    </nav>

                </div>

                <div id="div_alignement">

                    <li><a href="#" id="button_justifyLeft" class="btn_hover"><img src="img/bouttons_editeur/gauche.png"></a></li>

                    <li><a href="#" id="button_justifyCenter" class="btn_hover"><img src="img/bouttons_editeur/centre.png"></a></li>

                    <li><a href="#" id="button_justifyRight" class="btn_hover"><img src="img/bouttons_editeur/right.png"></a></li>

                </div>

                <div id="div_alert">

                    <li><a href="#" id="button_exemple" class="btn_hover"><img src="img/btn_exemple.png"></a></li>

                    <li><a href="#" id="button_information" class="btn_hover"><img src="img/btn_exclamation.png"></a></li>

                    <li><a href="#" id="button_question" class="btn_hover"><img src="img/btn_informations.png"></a></li>

                </div>

            </aside>

            <iframe name="commentaire" id="commentaire"></iframe>
            <textarea name="recupIframe" id="recupIframe"></textarea>
            <script src="editeur.js"></script>
    
        </form>
        
    </article>
    
</body>  
</html>