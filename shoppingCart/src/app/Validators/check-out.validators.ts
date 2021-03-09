import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CheckOutValidators {

    static onlyContainNumber(control: AbstractControl)  {
        var numbers = /^[0-9]+$/;
        // let tmpStr = control.get("ccNumber");
        let tmpStr = control.value;
        if(tmpStr){
            if((tmpStr as string)!= null){
                if (!(tmpStr as string).match(numbers)) {
                    console.log("xxxx",tmpStr);
                    return { onlyContainNumber: true };
                } 
            }
           
        }
        
        return null;
    }

}