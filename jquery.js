$(function() {
    let numArr = []

    $('.button').on('click', function(e) {
        if(numArr[numArr.length - 1] == '='){
            $('.screen').text("")
            $('.secondScreen').text("")
            $elNum = $(e.currentTarget)
            $('.screen').text($(".screen").text() + $elNum.data("value"))
            numArr = [];
        }
        else{
            $elNum = $(e.currentTarget)
            $('.screen').text($(".screen").text() + $elNum.data("value"))
        }
    });

    $('.button_operation').on('click', function(e){
        if(numArr[numArr.length - 1] == '='){
            numArr = []
            $operator = $(e.currentTarget)
            numArr.push(parseInt($('.screen').text()), $operator.data('oper'));
            $('.secondScreen').text(numArr.join(' '))
            $('.screen').text("")
        }
        
        else{
            $operator = $(e.currentTarget)
            numArr.push(parseInt($('.screen').text()), $operator.data('oper'));
            $('.secondScreen').text(numArr.join(' '))
            $('.screen').text("")

        }
    });


    $('.equal').on('click', function(){
        $operator = undefined
        numArr.push(parseInt($('.screen').text()))
        numArr.push('=')
        $('.secondScreen').text(numArr.join(' '))
        for(let key = 0; key<numArr.length;key++){
            if(numArr[key]=='*'){
                numArr.splice(key - 1, 3, numArr[key - 1] * numArr[key + 1])
                key = 0
            }

            else if(numArr[key] == '/'){
                numArr.splice(key - 1, 3, numArr[key - 1] / numArr[key + 1])
                key = 0
            }
        }

        numArr.reduce(function(previousValue, item, index){
            if(item != '+' && item != '-' && typeof previousValue == 'number'){
                $('.screen').text(previousValue)
                return previousValue;
            }

            else if(item == '+'){
                return previousValue + numArr[index + 1];
            }

            else if(item == '-'){
                return previousValue - numArr[index + 1];
            }

        })
    });
});