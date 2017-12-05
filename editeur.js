var frame = document.getElementById('commentaire').contentDocument;

/* Tableaux */

var tabSousMenu = ['file','edit'];
var tabMenuOptionDiv = ['exemple','information','question'];

/* Boutons édition */

var aside_edition = document.getElementById('menu_edition');

var button_file = document.getElementById('button_file');
var button_edit = document.getElementById('button_edit');

/* Boutons éditeur */

var button_g = document.getElementById('button_g');
var button_i = document.getElementById('button_i');
var button_u = document.getElementById('button_u');
var button_justifyLeft = document.getElementById('button_Jleft');
var button_justifyRight = document.getElementById('button_JRight');
var button_justifyCenter = document.getElementById('button_JCenter');

var button_color = document.getElementById('a_color');
var button_white = document.getElementById('a_blanc');
var button_black = document.getElementById('a_noir');
var button_red = document.getElementById('a_rouge');
var button_blue = document.getElementById('a_bleu');

var button_exemple = document.getElementById('button_exemple');

/*
|-------------------------------------------------
|création menu
|-------------------------------------------------
| Cette fonction permet de créer le menu déroulant des couleurs
*/

(function(){
    
    var tab_color = ['black','white','red','blue'];
    
    for(var i = 0 ; i < tab_color.length ; i++){
        
        var var_color = document.getElementById('a_'+tab_color[i]);
        var_color.className = tab_color[i];
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

        new_p.id = 'para';
        new_p.className = 'paragraphe';
        
        var textNode =  document.createTextNode('Commencer le cour ...'); 
        
        new_p.setAttribute('data-id','1');
        new_p.appendChild(textNode);
        
        frame.body.appendChild(new_p);

    }
   
    /*Cette fonction a été modifiée dans la branche tableau_paragraphe*/
    
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

function loadIframe(){
    commentaire.document.designMode = 'On';
    addParagraphe()
    
}

/* Permet de créer une nouvelle balise paragraphe si l'utilisateur supprime
tout le contenu de son texte*/

commentaire.addEventListener('keydown', function(e){  
    
    switch(e.keyCode){
           
        case 8:
            if(frame.body.firstChild.innerHTML == "<br>"){
                removeParagraphe();
            }
            break;
            
        case 13:
            addParagraphe();
            break;
            
    }
    
    console.log('keyDown');
    /*
    if(e.keyCode == "13"){
        addParagraphe();

    }
    
    if(e.keyCode == "8"){
        
        if(frame.body.firstChild.innerHTML == "<br>"){
            removeParagraphe();
        }
    }*/

},true);


button_g.addEventListener('click', function(){
    
    commentaire.document.execCommand('bold',false,null);
    
},false);

button_i.addEventListener('click', function(){
    
    commentaire.document.execCommand('italic',false,null);
    
},false);

button_u.addEventListener('click', function(){
    
    commentaire.document.execCommand('underline',false,null);
    
},false);

button_justifyLeft.addEventListener('click', function(){
    
    commentaire.document.execCommand('justifyLeft',false,null);
    
},false);

button_justifyRight.addEventListener('click', function(){
    
    commentaire.document.execCommand('justifyRight',false,null);
    
},false);

button_justifyCenter.addEventListener('click', function(){
    
    commentaire.document.execCommand('justifyCenter',false,null);
    
},false);

for(var i = 0 ; i < tabMenuOptionDiv.length ; i++){

    var listOptionDiv = [tabMenuOptionDiv.length];
    
    listOptionDiv[i] = document.getElementById('button_'+tabMenuOptionDiv[i]);

    listOptionDiv[i].addEventListener('click', function(){
        
        mainNameA = this;
        mainNameA = mainNameA.id.slice(7);
    
        if(frame.getElementById('div_focus')){
            alert('element focus (div_focus)');
        }
        else{
            
            var lastParagraphe = frame.lastChild;
            console.log(lastParagraphe.nodeValue);

            var mainDiv = document.createElement('div');

            var paraP = document.createElement('p');
                paraP.id = 'para_850';
            var balBr = document.createElement('br');

            var maDiv = '';

            paraP.appendChild(balBr);
            mainDiv.appendChild(paraP);

            if(frame.body.appendChild(mainDiv)){
                
                if(document.activeElement.id == 'button_'+mainNameA){
                    
                    
                    mainDiv.className = 'div_'+mainNameA+' div_option';
                    /*
                    maDiv = this;
                    this.id = 'div_focus'; */
                    
                    var paraFocus = frame.getElementById('para_850').focus;
                }
            }
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
        openUl.className = 'activeMenu';

    },false);
    
    listLi[i].addEventListener('blur', function(){

        mainLi = this;
        mainLi.className = '';
        mainLi = mainLi.id.slice(7);
        var openUl = document.getElementById('ul_'+mainLi);
        openUl.className = 'masquerMenu';

    },false);
    
}

/*

if(document.activeElement.id == 'button_'+mainNameA){

                mainDiv.className = 'div_'+mainNameA+' div_option';

                var tabDiv = frame.getElementsByClassName('div_'+mainNameA);
                var i = 0;
                var bcl_stop = 0;

                while(i < tabDiv.length && bcl_stop == 0){
                    
                    tabDiv[i].addEventListener('click', function(){

                        maDiv.id = '';
                        maDiv = this;
                        this.id = 'div_focus';

                        button_exemple.style.background = 'rgb(230,230,230)';

                    },false);

                    tabDiv[i].addEventListener('blur', function(){
                        alert('blur');
                        button_exemple.style.background = 'white';

                    },false);

                    i++;        
                }
            }*/

