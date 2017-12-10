var frame = document.getElementById('commentaire').contentDocument;
var data_id_paragraphe_focus;

/* Tableaux */

var tabSousMenu = ['file','edit'];
var tabMenuOptionDiv = ['exemple','information','question'];
var tabColor = ['white','grey','black','red','blue','green','yellow','orange'];
var tabPolice = ['bold','italic','underline','justifyLeft','justifyRight','justifyCenter'];

/* Boutons édition */

var aside_edition = document.getElementById('menu_edition');

var button_save = document.getElementById('button_save');

var button_color = document.getElementById('a_color');

var button_exemple = document.getElementById('button_exemple');

/*
|-------------------------------------------------
|   Activation de l'édition de iframe
|-------------------------------------------------
*/

function loadIframe(){
    frame.designMode = 'On';
    addParagraphe();
}

/*
|-------------------------------------------------
|création menu
|-------------------------------------------------
| Cette fonction permet de créer le menu déroulant des couleurs
*/

(function(){
    
    for(var i = 0 ; i < tabColor.length ; i++){
        
        var var_color = document.getElementById('a_'+tabColor[i]);
        var_color.className = tabColor[i];
    }
    
})(); 

/*
|-------------------------------------------------
| Créer le bouton de couleur
|-------------------------------------------------
| Créer le bouton principal de couleur

*/

(function(){
    
    button_color.className = 'black';
    
})();

/*
|-------------------------------------------------
|Fonction d'un link
|-------------------------------------------------
| Ajout du lien link pour le fichier editeur.css
*/

(function(){
    
    var styleFile = document.createElement("Link");
    
    styleFile.setAttribute("rel", "stylesheet");
    styleFile.setAttribute("type", "text/css");
    styleFile.setAttribute("href", "css/editeur.css");  
    
    frame.head.appendChild(styleFile);
    
})();

/*
|-------------------------------------------------
|Fonction sur les boutons de police
|-------------------------------------------------
*/

(function (){
    
    var tabPoliceSecond = [];

    for(var i = 0 ; i < tabPolice.length ; i++){
        
        tabPoliceSecond[i] = document.getElementById('button_'+tabPolice[i]);
        
        tabPoliceSecond[i].addEventListener('click', function(e){
            var police = e.currentTarget.id.slice(7);
            frame.execCommand(police,false,null);
            
        },false);
        
    }
    
})();

/*
|-------------------------------------------------
|Fonction sur les paragraphe
|-------------------------------------------------
| Ajoute et supprimer le premier paragraphe de l'éditeur
*/

function addParagraphe(){
    
    if(frame.body.firstChild == null){
        
        var new_p = document.createElement("p");
        new_p.className = 'paragraphe';
        
        var textNode =  document.createTextNode('Commencer le cour ...'); 
        new_p.appendChild(textNode);
        
        frame.body.appendChild(new_p);

    }
    
    updateTabElm()
        
}

/*
|-------------------------------------------------
|Fonction mise a jour
|-------------------------------------------------
| Cette fonction met à jour le tableau tabParagraphes avec les nouveaux éléments ajouter
*/

function updateTabElm(){
     
    var tabParagraphes = frame.getElementsByTagName('p');

    for(var i = 0 ; i < tabParagraphes.length ; i++){
        
        tabParagraphes[i].setAttribute('data-id',i);
        tabParagraphes[i].setAttribute('id','para_'+i);

        tabParagraphes[i].addEventListener('click', function(){

            data_id_paragraphe_focus = this.getAttribute('data-id');

        },false);
    }   
}

/*Finir cette fonction */

function removeParagraphe(){

    var allPara = frame.getElementsByClassName('paragraphe');
    var allDiv = frame.getElementsByClassName('div_option');

    if(allPara.length == 1){
        
        if(allDiv.length == 0){
            frame.body.removeChild(allPara[0]);
            addParagraphe()
        }
    }
    else{
        frame.body.removeChild(allPara[0]);
        
    }
}

/*
|-------------------------------------------------------
|Fonction qui permet la récupération du paragraphe focus
|-------------------------------------------------------
*/

frame.addEventListener('click', function(e){
    
    var paraFocus = e.target;
    //console.log(typeof(paraFocus));
    if(paraFocus.getAttribute('id') != null){
        data_id_paragraphe_focus = paraFocus.getAttribute('id');
    }
    else{
        data_id_paragraphe_focus = frame.body.lastChild.id;
    }
    
},false);

/**************************************************/

/* Permet de créer une nouvelle balise paragraphe si l'utilisateur supprime
tout le contenu de son texte*/

frame.addEventListener('keydown', function(e){  

    switch(e.keyCode){
           
        case 8:
            if(frame.body.firstChild.innerHTML == "<br>"){
                removeParagraphe();
            }
            break;
            
        case 13:
            /* Car l'ajout du paragraphe est effèctué aprés que les actions suivante soit effectuées */
            updateTabElm();

            console.log(data_id_paragraphe_focus);
            break;
            
        default:
            updateTabElm();
     
    }

},false);

/*
|-------------------------------------------------
| Boucle menu informations
|-------------------------------------------------
| Permet d'assigner une action aux boutons infos
*/

for(var i = 0 ; i < tabMenuOptionDiv.length ; i++){

    var listOptionDiv = [tabMenuOptionDiv.length];
    
    listOptionDiv[i] = document.getElementById('button_'+tabMenuOptionDiv[i]);

    listOptionDiv[i].addEventListener('click', function(e){
        
        var mainNameA = e.currentTarget;
            mainNameA = mainNameA.id.slice(7);
        
        var mainDiv = document.createElement('div');
        
        updateTabElm();
        
        if(frame.getSelection().toString()){
            
            var parentNodeTextSelect = frame.getSelection();
            var parentNodeRecup = parentNodeTextSelect.anchorNode.parentNode;

            if(parentNodeRecup.parentNode.className == 'div_'+mainNameA){

                frame.body.replaceChild(parentNodeRecup,parentNodeRecup.parentNode);
                parentNodeRecup.focus();
            }
            else{

                frame.body.insertBefore(mainDiv,parentNodeRecup);

                    mainDiv.appendChild(parentNodeRecup);
                    mainDiv.className = 'div_'+mainNameA;
            }
        }
        else{
            
            var elementFocus = frame.getElementById(data_id_paragraphe_focus);

            if(elementFocus.parentNode.className == 'div_'+mainNameA){
                var divParent = elementFocus.parentNode;
                frame.body.replaceChild(elementFocus,divParent);
            }
            else{

                frame.body.insertBefore(mainDiv,elementFocus);

                    mainDiv.appendChild(elementFocus);
                    mainDiv.className = 'div_'+mainNameA;
            }
        }
    },false);
}

/*
|-------------------------------------------------
| Boucle palette couleur et bouton couleur principal
|-------------------------------------------------
| Permet d'assigner une action aux boutons couleur
*/

for(var i = 0 ; i < tabColor.length ; i++){
    
    var tabAColor = [tabColor.length];
    
    tabAColor[i] = document.getElementById('a_'+tabColor[i]);
    tabAColor[i].addEventListener('click', function(e){
        
        var btnfirstColor = document.getElementById('a_color');
        
        mainAColor = e.currentTarget;
        mainAColor = mainAColor.id.slice(2);
        
        frame.execCommand('foreColor',false,mainAColor);
        btnfirstColor.setAttribute('class',mainAColor);
        
    },false);
    
}

/*
|-------------------------------------------------
|     Bouton de couleur principal
|-------------------------------------------------
*/
button_color.addEventListener('click', function(){
    
    var color = button_color.getAttribute('class');
    console.log(color);
    frame.execCommand('foreColor',false, color);
    
},false);

/*
|-------------------------------------------------
| Impression
|-------------------------------------------------
| Ajout de la fonction d'impression
*/

var print = document.getElementById('print');

print.addEventListener('click', function(){
    
    window.frames["commentaire"].focus();
    window.frames["commentaire"].print();
    
},true);

/*
|-------------------------------------------------
| Fonction de sauvegarde
|-------------------------------------------------
*/

button_save.addEventListener('click', function(){
    
    var com = document.getElementById('formEdit');
        com.elements['recupIframe'].value = window.frames['commentaire'].document.body.innerHTML;
        com.submit();
},false);