import { LightningElement, track } from 'lwc';

export default class Calculator extends LightningElement {
    firstNumber;
    secondNumber;
    result;
    showResult = false;
    previousStoredResults = [];

    handleChange(event){
        const fieldName = event.target.name;
        if(fieldName === 'fnum'){
            this.firstNumber = event.target.value;
        }
        else if(fieldName === 'snum'){
            this.secondNumber = event.target.value;
        }
    }

    calculation(event){
        const fnum = parseInt(this.firstNumber);
        const snum = parseInt(this.secondNumber);

        if(event.target.name === 'add'){
            this.result = 'Sum of ' + fnum + ' and ' + snum + ' is ' + (fnum + snum);
            this.previousStoredResults.push(this.result);
        }
        else if(event.target.name === 'sub'){
            this.result = 'Subtraction of ' + fnum + ' and ' + snum + ' is ' + (fnum - snum);
            this.previousStoredResults.push(this.result);
        }
        else if(event.target.name === 'mul'){
            this.result = 'Multiplication of ' + fnum + ' and ' + snum + ' is ' + (fnum * snum);
            this.previousStoredResults.push(this.result);
        }
        else if(event.target.name === 'div'){
            this.result = 'Division of ' + fnum + ' and ' + snum + ' is ' + (fnum / snum);
            this.previousStoredResults.push(this.result);
        }
        
        if(event.target.name === 'preview'){
            this.showResult = !this.showResult;
        }
    }
}