        var size = 4;
        var score = 0;

(function($) // début du plugin
{
    $.fn.game2048 = function() //function game2048 du plugin
    {
        // $('header').append("<h1>2048</h1>");

        // génération du tableau (table, tr, td) vide (rempli de zéros)
        function generate_grid()
        {
            var table = $('<table></table>');
            for (var y = 0; y < size; y++)
            {
                var ligne = $('<tr></tr>');
                for (var x = 0; x < size; x++)
                {
                    var cells = $('<td></td>').attr('x', x).attr('y', y).attr('nbr', 0);
                    ligne.append(cells);
                }
                table.append(ligne);
            }
            return table;
        }

        // génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'
        function generate_cell(cells)
        {
            for (var i = 0; i < cells; i++)
            {
                var x = Math.floor((Math.random() * size));
                var y = Math.floor((Math.random() * size));
                var value =  2 * (Math.floor((Math.random() * 2) + 1));
                var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');

                if (value === 4 && Math.random() > 0.5)
                    value = 2;
                if (!elem[0])
                    generate_cell(cells - i);
                else {
                    elem.attr('nbr', value);
                    elem.text(value);
                }
            }
        }
        $('#score').text("Score: "+score); //permet d'afficher le score 0 à la génération de la grille

        // fonction de gestion des évenements (appuie de touches)
        $('html').keydown(function(event) {
            var l = false; //left
            var u = false; //up
            var r = false; //right
            var d = false; //down

            switch (event['key']) {
                case 'ArrowLeft':
                    l=ArrowLeft();
                    if(l == true){
                    generate_cell(1);}
                    $('td').attr('class', '');
                    break;
                case 'ArrowUp':
                    u=ArrowUp();
                    if(u == true){
                    generate_cell(1);}
                    $('td').attr('class', '');
                    break;
                case 'ArrowRight':
                    r=ArrowRight();
                    if(r == true){
                    generate_cell(1);}
                    $('td').attr('class', '');
                    break;
                case 'ArrowDown':
                    d=ArrowDown();
                    if(d == true){
                    generate_cell(1);}
                    $('td').attr('class', '');
                    break;
            }
            Color();
            win();
            gameOver();
            $('#score').text("Score: "+score);
        });

        // début du code lancé
        $(this).append(generate_grid()); // génération du tableau vide
        generate_cell(2); // génération aléatoire de deux cases pleines (2 ou 4)
        Color();
    }

    function ArrowLeft(){
        var move = false;

        for(y = 0; y < size; y++){

            for(x = 1; x < size; x++){   
            
                var filledCell = ($('[x="'+x+'"][y="'+y+'"]'));   

                if(parseInt(filledCell.attr('nbr')) !== 0)
                {
                    let condition=true;
                    while(condition)
                        //console.log(parseInt(filledCell.attr('x')));
                    {
                        var prevCell = ($('[x="'+(parseInt(filledCell.attr('x'))-1)+'"][y="'+y+'"]'));

                        if(parseInt(prevCell.attr('nbr')) == 0)
                        {
                            prevCell.attr('nbr',filledCell.attr('nbr'));
                            prevCell.text(filledCell.text());
                            filledCell.attr('nbr', 0);
                            filledCell.text("");
                            filledCell = prevCell;
                            move = true;
                        }
                    else //merge
                        {
                        if (parseInt(prevCell.attr('nbr')) == parseInt(filledCell.attr('nbr')) && (prevCell.attr('class')) != 'merged')
                        {
                            prevCell.attr('nbr',parseInt(filledCell.attr('nbr'))*2);
                            prevCell.text(filledCell.text()*2);
                            prevCell.attr('class', 'merged');
                            score += parseInt(prevCell.text());
                            filledCell.attr('nbr',0);
                            filledCell.text("");
                            move = true;
                        }
                        else{condition=false;}
                        }
                    }
                }
            }
        }
        return move;
    }


     function ArrowRight(){
        var move = false;

        for(y = 0; y < size; y++){

            for(x = size-2; x > -1; x--){   
                var filledCell = ($('[x="'+x+'"][y="'+y+'"]'));   

                if(parseInt(filledCell.attr('nbr')) !== 0)
                {
                    let condition=true;
                    while(condition)
                    {
                        var prevCell = ($('[x="'+(parseInt(filledCell.attr('x'))+1)+'"][y="'+y+'"]'));

                        if(parseInt(prevCell.attr('nbr')) == 0)
                        {
                            prevCell.attr('nbr',filledCell.attr('nbr'));
                            prevCell.text(filledCell.text());
                            filledCell.attr('nbr', 0);
                            filledCell.text("");
                            filledCell = prevCell;
                            move = true;
                        }
                    else //merge
                        {
                        if (parseInt(prevCell.attr('nbr')) == parseInt(filledCell.attr('nbr')) && (prevCell.attr('class')) != 'merged')
                        {
                            prevCell.attr('nbr',parseInt(filledCell.attr('nbr'))*2);
                            prevCell.text(filledCell.text()*2);
                            prevCell.attr('class', 'merged');
                            score += parseInt(prevCell.text());
                            filledCell.attr('nbr',0);
                            filledCell.text("");
                            move = true;
                        }
                        else{condition=false;}
                        }
                    }
                }
            }
        }
        return move;
    }
    function ArrowUp(){
        var move = false;

        for(y = 1; y < size; y++){

            for(x = 0; x < size; x++){   
            
                var filledCell = ($('[x="'+x+'"][y="'+y+'"]'));   

                if(parseInt(filledCell.attr('nbr')) !== 0)
                {
                    let condition=true;
                    while(condition)
                    {
                        var prevCell = ($('[y="'+(parseInt(filledCell.attr('y'))-1)+'"][x="'+x+'"]'));

                        if(parseInt(prevCell.attr('nbr')) == 0)
                        {
                            prevCell.attr('nbr',filledCell.attr('nbr'));
                            prevCell.text(filledCell.text());
                            filledCell.attr('nbr', 0);
                            filledCell.text("");
                            filledCell = prevCell;
                            move = true;
                        }
                    else //merge
                        {
                        if (parseInt(prevCell.attr('nbr')) == parseInt(filledCell.attr('nbr')) && (prevCell.attr('class')) != 'merged')
                        {
                            prevCell.attr('nbr',parseInt(filledCell.attr('nbr'))*2);
                            prevCell.text(filledCell.text()*2);
                            prevCell.attr('class', 'merged');
                            score += parseInt(prevCell.text());
                            filledCell.attr('nbr',0);
                            filledCell.text("");
                            move = true;
                        }
                        else{condition=false;}
                        }
                    }
                }
            }
        }
        return move;
    }
    function ArrowDown(){
        var move = false;

        for(y = size-2; y > -1; y--){

            for(x = 0; x < size; x++){   
                var filledCell = ($('[x="'+x+'"][y="'+y+'"]'));   

                if(parseInt(filledCell.attr('nbr')) !== 0)
                {
                    let condition=true;
                    while(condition)
                    {
                        var prevCell = ($('[y="'+(parseInt(filledCell.attr('y'))+1)+'"][x="'+x+'"]'));

                        if(parseInt(prevCell.attr('nbr')) == 0)
                        {
                            prevCell.attr('nbr',filledCell.attr('nbr'));
                            prevCell.text(filledCell.text());
                            filledCell.attr('nbr', 0);
                            filledCell.text("");
                            filledCell = prevCell;
                            move = true;
                        }
                        else //merge
                            {
                                if (parseInt(prevCell.attr('nbr')) == parseInt(filledCell.attr('nbr')) && (prevCell.attr('class')) != 'merged')
                                {
                                    prevCell.attr('nbr',parseInt(filledCell.attr('nbr'))*2);
                                    prevCell.text(filledCell.text()*2);
                                    prevCell.attr('class', 'merged');
                                    score += parseInt(prevCell.text());
                                    filledCell.attr('nbr',0);
                                    filledCell.text("");
                                    move = true;
                                }
                                else{condition=false;}
                            }
                    }
                }
            }
        }
        return move;
    }
    function Color(){
        for(y = 0; y < size; y++){

            for(x = 0; x < size; x++){

                var cellColor = ($('[x="'+x+'"][y="'+y+'"]'));

                if(parseInt(cellColor.attr('nbr')) == 0)
                {
                    $('td[nbr=0]').css("background-color", "#ffffff");
                }
                if(parseInt(cellColor.attr('nbr')) == 2)
                {
                    $('td[nbr=2]').css("background-color", "#ccccff");
                }
                if(parseInt(cellColor.attr('nbr')) == 4)
                {
                    $('td[nbr=4]').css("background-color", "#8080ff");
                }
                if(parseInt(cellColor.attr('nbr')) == 8)
                {
                    $('td[nbr=8]').css("background-color", "#1a1aff");
                }
                if(parseInt(cellColor.attr('nbr')) == 16)
                {
                    $('td[nbr=16]').css("background-color", "#6600cc");
                }
                if(parseInt(cellColor.attr('nbr')) == 32)
                {
                    $('td[nbr=32]').css("background-color", "#ff3399");
                }
                if(parseInt(cellColor.attr('nbr')) == 64)
                {
                    $('td[nbr=64]').css("background-color", "#00ffaa");
                }
                if(parseInt(cellColor.attr('nbr')) == 128)
                {
                    $('td[nbr=128]').css("background-color", "#009900");
                }
                if(parseInt(cellColor.attr('nbr')) == 256)
                {
                    $('td[nbr=256]').css("background-color", "#ffff00");
                }
                if(parseInt(cellColor.attr('nbr')) == 512)
                {
                    $('td[nbr=512]').css("background-color", "#cca300");
                }
                if(parseInt(cellColor.attr('nbr')) == 1024)
                {
                    $('td[nbr=1024]').css("background-color", "#ff6600");
                }
                if(parseInt(cellColor.attr('nbr')) == 2048)
                {
                    $('td[nbr=2048]').css("background-color", "#ff0000");
                }
            }
        }
    }

    function win(){
        for(y = 0; y < size; y++){

            for(x = 0; x < size; x++){

                var cellCheck = ($('[x="'+x+'"][y="'+y+'"]'));

                if(parseInt(cellCheck.attr('nbr')) == 2048){
                    setTimeout(function(){
                        alert("You WIN! :)");
                        },120);
                }
            }
        }    
    }
    function gameOver(){
        for(y = 0; y < size; y++){

            for(x = 0; x < size; x++){

                var filledCheck = parseInt(($('[x="'+x+'"][y="'+y+'"]')).attr('nbr'));
                var leftCell = parseInt(($('[x="'+(x-1)+'"][y="'+y+'"]')).attr('nbr'));
                var rightCell = parseInt(($('[x="'+(x+1)+'"][y="'+y+'"]')).attr('nbr'));
                var upperCell = parseInt(($('[x="'+x+'"][y="'+(y-1)+'"]')).attr('nbr'));
                var downCell = parseInt(($('[x="'+x+'"][y="'+(y+1)+'"]')).attr('nbr'));

                if(filledCheck !== 0){

                    if(filledCheck == rightCell && x>0){
                        return;
                    }
                    if((filledCheck == leftCell && x>=1)){
                        return;
                    }
                    if(filledCheck == upperCell && y>=1){
                        return;
                    }
                    if(filledCheck == downCell && y>0){
                        return;
                    }
                }
                else{return;
                }
            }
        }
        setTimeout(function(){
            alert("Game over :(");
            },120);
    }

})(jQuery); // fin du plugin
