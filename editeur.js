var frame = document.getElementById('commentaire').contentDocument;
var data_id_paragraphe_focus;
/* Tableaux */

var tabSousMenu = ['file','edit'];
var tabMenuOptionDiv = ['exemple','information','question'];
var tabColor = ['white','grey','black','red','blue','green','yellow','orange'];

/* Boutons édition */

var aside_edition = document.getElementById('menu_edition');

/* Boutons éditeur */

var button_g = document.getElementById('button_g');
var button_i = document.getElementById('button_i');
var button_u = document.getElementById('button_u');
var button_justifyLeft = document.getElementById('button_Jleft');
var button_justifyRight = document.getElementById('button_JRight');
var button_justifyCenter = document.getElementById('button_JCenter');

var button_color = document.getElementById('a_color');

var button_exemple = document.getElementById('button_exemple');

function loadIframe(){
    frame.designMode = 'On';
    addParagraphe();
}

frame.addEventListener('click',function(){
    
    updateTabElm();
    
},false);

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
| Masquer les sous menu
|-------------------------------------------------
| Cette fonction permet de masquer les sous menu du menu déroulant

*/

(function(){
    
    for(var i = 0 ; i < tabSousMenu.length ; i++){
        
        var ulDisplayNone = document.getElementById('ul_'+tabSousMenu[i]);
        ulDisplayNone.className = 'masquerMenu';
        
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

    
    /*
    |-------------------------------------------------
    | Met le focus sur l'élément créer
    |-------------------------------------------------
    | console.log('para_'+data_id_paragraphe_focus);
    | var paraTest = frame.getElementById('para_'+data_id_paragraphe_focus);
    | paraTest.focus();
    | console.log(paraTest);
    */
    
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
            
            data_id_paragraphe_focus = parseInt(data_id_paragraphe_focus) + 1;
            break;
     
    }

},true);

button_g.addEventListener('click', function(){
    
    frame.execCommand('bold',false,null);
    
},false);

button_i.addEventListener('click', function(){
    
    frame.execCommand('italic',false,null);
    
},false);

button_u.addEventListener('click', function(){
    
    frame.execCommand('underline',false,null);
    
},false);

button_justifyLeft.addEventListener('click', function(){
    
    frame.execCommand('justifyLeft',false,null);
    
},false);

button_justifyRight.addEventListener('click', function(){
    
    frame.execCommand('justifyRight',false,null);
    
},false);

button_justifyCenter.addEventListener('click', function(){
    
    frame.execCommand('justifyCenter',false,null);
    
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

    listOptionDiv[i].addEventListener('click', function(){
        
        updateTabElm();
        
        mainNameA = this;
        mainNameA = mainNameA.id.slice(7);
        
        var elementFocus = frame.getElementById('para_'+data_id_paragraphe_focus);
        console.log('para_'+data_id_paragraphe_focus);

        if(elementFocus.parentNode.className == 'div_'+mainNameA){
            var divParent = elementFocus.parentNode;
            frame.body.replaceChild(elementFocus,divParent);
        }
        else{
            
            var mainDiv = document.createElement('div');

            frame.body.insertBefore(mainDiv,elementFocus);
            
                mainDiv.appendChild(elementFocus);
                mainDiv.className = 'div_'+mainNameA+' all_div_infos';
        }

            
    },false);
}


for(var i = 0 ; i < tabSousMenu.length ; i++){
    
    var listLi = [tabSousMenu.length];
    
    listLi[i] = document.getElementById('button_'+tabSousMenu[i]);
    
    listLi[i].addEventListener('click', function(){
        
        mainLi = this;
        mainLi.className = 'actionClicMenu';
        mainLi = mainLi.id.slice(7);
        var openUl = document.getElementById('ul_'+mainLi);
        openUl.style.display = 'block';
            

    },false);
    
    listLi[i].addEventListener('blur', function(){
        
        mainLi = this;
        mainLi.className = '';
        mainLi = mainLi.id.slice(7);
        var openUl = document.getElementById('ul_'+mainLi);
        openUl.style.display = 'none';
        
    },false)
    
    
    
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
    tabAColor[i].addEventListener('click', function(){
        
        var btnfirstColor = document.getElementById('a_color');
        
        mainAColor = this;
        mainAColor = mainAColor.id.slice(2);
        
        frame.execCommand('foreColor',false,mainAColor);
        btnfirstColor.setAttribute('class',mainAColor);
        
    },false);
    
}

/***********************************
     Bouton de couleur principal
************************************/

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