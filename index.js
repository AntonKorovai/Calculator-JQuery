document.addEventListener("DOMContentLoaded", function() {
    const screen = document.querySelector('.screen');
    const secondScreen = document.querySelector('.secondScreen')
    let operator;
    let numArr = [];

    document.querySelectorAll('.container_buttons_numbers  button').forEach(function(item) {onNumButtonClick(item)});

    document.querySelectorAll('.container_buttons_operations .button_operation').forEach(function(item){onOperationClick(item)});
    
    document.querySelector('.equal').addEventListener('click', function () {onResultClick()});


    
    function onNumButtonClick(item){
        item.addEventListener('click', function(){
            if (numArr[numArr.length - 1] == '='){
                screen.innerHTML = "";
                secondScreen.innerHTML = "";
                screen.innerHTML = screen.innerHTML + item.getAttribute('data-value');
                numArr = [];
            }

            else {
                screen.innerHTML = screen.innerHTML + item.getAttribute('data-value');
            }
        });
    };

    function onResultClick(){
        operator = undefined
        numArr.push(parseInt(screen.innerHTML));
        numArr.push('=');
        secondScreen.innerHTML = numArr.join(' ');

        for(let key = 0; key < numArr.length; key++) {
            if(numArr[key] == '*'){
                numArr.splice(key - 1,3, numArr[key - 1] * numArr[key + 1]);
                key = 0;
            }

            else if(numArr[key] == '/'){
                numArr.splice(key - 1,3, numArr[key - 1] / numArr[key + 1]);;
                key = 0;
            }
        };

        numArr.reduce(function(previousValue,item,index){
            if (item != '+' && item != '-' && typeof previousValue == "number"){
                screen.innerHTML = previousValue;
                return previousValue;
            }

            else if (item == '+') {
                return previousValue + numArr[index + 1];
            }

            else if (item == '-') {
                return previousValue - numArr[index + 1];
            }
        });
    };

    function onOperationClick(item){
        item.addEventListener('click', function(){
            if(numArr[numArr.length - 1] == '='){
                numArr = [];
                operator = item.getAttribute('data-oper');
                numArr.push(parseInt(screen.innerHTML), operator);
                secondScreen.innerHTML = numArr.join(' ');
                screen.innerHTML = '';
            }
            else{
                operator = item.getAttribute('data-oper');
                numArr.push(parseInt(screen.innerHTML), operator);
                secondScreen.innerHTML = numArr.join(' ');
                screen.innerHTML = '';
            }
        });  
    };
    

});    