function getPriority(char){
        if(char === "(") return 1;
        else if(char === '+' || char === "-") return 2;
        else if(char === "*" || char === "/") return 3;
        else return 4
    }
    function calculate(stack,operation) {
        let num1,num2;
        num2 = stack.pop();
        num1 = stack.pop();
        if(operation === '+') num2 -= -num1;
        else if(operation === "-") num2 -= num1;
        else if(operation === "*") num2 *= num1;
        else if (operation === "/") num2 = num1 / num2;
        stack.push(num2)
    }
    function calculator(str) {
        let numList = [];
        let opList = [];
        let i = 0,j;
        let len = str.length;
        let operation;
        let tmp_str;
        while(i < len) {
            if(str[i] >= "0" && str[i] <= "9") {
                j = i;
                while(j < len && str[j] >= "0" && str[j] <= "9") j++;
                numList.push(str.slice(i, j));
                i = j;
            }else if(str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/') {
                if(opList.length === 0) {
                    opList.push(str[i])
                }else {
                    while(opList.length) {
                        tmp_str = opList[opList.length - 1];
                        if(getPriority(tmp_str) >= getPriority(str[i])) {
                            opList.pop()
                            calculate(numList,tmp_str)
                        }else break
                    }
                    opList.push(str[i])
                }
                i++
            }else {
                if(str[i] === "(") opList.push(str[i]);
                else {
                    while(opList[opList.length - 1] !== "(") {
                        tmp_str = opList.pop();
                        calculate(numList,tmp_str)
                    }
                    tmp_str = opList.pop();
                }
                i++
            }
        }
        while(opList.length) {
            tmp_str = opList.pop();
            calculate(numList,tmp_str)
        }
        console.log(numList)
        return numList
    }
    let a = "1+(23+3)*(0+2)/2"
    console.log(calculator(a))


function maxProfit(arr,fee) {
        let buyPrice = arr[0] + fee;
        let result = 0
        for(let i = 0; i < arr.length; i++) {
            if(buyPrice > arr[i] + fee) {
                buyPrice = arr[i] + fee;
            }else if(buyPrice < arr[i]) {
                result += arr[i] - buyPrice;
                buyPrice = arr[i]
            }
        }
        console.log(result)
        return result
    }
