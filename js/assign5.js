function validateFormOnSubmit() {
    // check if all other functions return true.
    var Education = validateEducation(document.forms["myForm"]["edu"]);
    var phone = validatePhone(document.forms["myForm"]["tel"]);
    var password = validatePassword(document.forms["myForm"]["password"], 'password-error');
    var retype = validatePassword(document.forms["myForm"]["retype"], 'retype-error');
    var fname = validateName(document.forms["myForm"]["fname"], 'fname-error');
    var lname = validateName(document.forms["myForm"]["lname"], 'lname-error');

    if (Education === true && phone === true && password === true && retype === true && fname === true && lname ===true) {
        return true;
    } else {
        alert("ERROR: One or more fields requires attention!");
        return false;
    }
}

function validateEducation(fld) {
    var eL = document.querySelector("#edu-error");   //selects education status error div element
    eL.innerHTML = "";

    var errorMsg = "<span>X</span> - Please select your Education Status.</br></br>";

    var notBlank = false;        // selected a radio button
    var count = 0;

    for (var i = 0; i < fld.length; i++) {
        if (fld[i].checked === true) {
            count++;            // counts number of radio buttons checked
        }
    }

    if (count === 1) {
        eL.innerHTML = "";
        notBlank = true;
    } else {
        eL.innerHTML += errorMsg;
        notBlank = false;
    }
    return notBlank;

}//end of validateEducation()

function validatePhone(fld) {
    var eL = document.querySelector("#tel-error");   // selects phone error div element
    eL.innerHTML = "";

    var notBlank = true;        // not blank field
    var format = true;          // all numeric and correct format
    var area = true;            // area code not all zeros
    var phone = true;           // phone number not all zeros

    var regFormat = /^([0-9]{3})-([0-9]{3})-([0-9]{4})$/; //begins with 3 numbers, ends in 4 numbers, 3 numbers in middle, delimted by hyphen(-)

    var inputValue = fld.value;
    var errorMsg = "";
    //var errorStatement = "Your Phone number has the following error(s).</br>";

    if (inputValue.trim() === "") {
        notBlank = false;
        errorMsg += "<span>X</span> - Phone number cannot be blank.</br></br>";
    } else {
        if (!(inputValue.match(regFormat))) {     //check format and numeric
            format = false;
            errorMsg += "<span>X</span> - Please enter phone number in the correct format.</br></br>";
        } else
            if (inputValue.match(/^0{3}/)) {     //check leading number not all zeros
                area = false;
                errorMsg += "<span>X</span> - Area code cannot be all '0'.</br></br>";
            } else
                if (inputValue.match(/0{3}-0{4}$/)) {
                    phone = false;
                    errorMsg += "<span>X</span> - Phone number cannot be all '0'.</br></br>";
                }
    }// end of iff

    // check if phone valid
    if (notBlank === false || format === false || area === false || phone === false) {
        eL.innerHTML += errorMsg;
        fld.style.background = "Yellow";
        return false;
    } else {
        eL.innerHTML = "";
        fld.style.background = "white";
        return true;
    }

}// end of validatePhone()

function passwordMatch(fld1, fld2) {
    return (fld1 === fld2) ? true : false;
}

function validatePassword(fld, id) {
    var eL1 = document.querySelector("#" + id); // selects password error div element
    eL1.innerHTML = "";

    var upper1 = true;       // one uppercase
    var lower1 = true;       // one lowercase
    var num1 = true;         // one number
    var long1 = true;        // 8 characters long; min    
    var notBlank1 = true;    // not a blank field

    var same = true;        // two passwords match

    var error1 = "";

    var inputValue1 = fld.value;   // passwords shouldn't be trimed

    // check password
    if (inputValue1.length === 0) {     // no trim() on password ' ' might be attempted password
        notBlank1 = false;
        error1 += "<span>X</span> - This field cannot be blank.</br></br>";
    } else if (inputValue1.length < 8) {
        long1 = false;
        error1 += "<span>X</span> - This password must contain at least 8 characters.</br></br>";
    } else if (/^[^0-9]+$/.test(inputValue1)) { // match one or more preceeding regexp case-insensitive(i)
        num1 = false;
        error1 += "<span>X</span> - This password must contain at least one number.</br></br>";
    }
    else if (/^[^a-z]+$/.test(inputValue1)) { // match one or more preceeding regexp
        lower1 = false;
        error1 += "<span>X</span> - This password must contain at least one lowercase letter.</br></br>";
    }
    else if (/^[^A-Z]+$/.test(inputValue1)) { // match one or more preceeding regexp
        upper1 = false;
        error1 += "<span>X</span> - This password must contain at least one uppercase letter.</br></br>";
    } else if (!passwordMatch(document.forms["myForm"]["password"].value, document.forms["myForm"]["retype"].value)) {
        if(document.forms["myForm"]["password"].value.length !== 0 && document.forms["myForm"]["retype"].value.length !== 0){
        same = false;
        error1 += "<span>X</span> - Your passwords don't match.</br></br>";
        }
    }    // end of iff

    // check password

    if (notBlank1 === false || num1 === false || upper1 === false || lower1 === false || same === false || long1 === false) {
        eL1.innerHTML = error1;
        fld.style.background = "Yellow";        
        return false;
    } else {
        eL1.innerHTML = "";
        fld.style.background = "white";        
        return true;
    }

}//end of validatePassword()

function validateName(fld, id) {
    var errorMsg = "";
    var notBlank = true;
    var allowChar = true;
    var oneAlpha = true;
    var eL = document.querySelector("#" + id); // selects name error div element
    eL.innerHTML = "";
    var inputValue = fld.value.trim();
    //inputValue = inputValue.toUpperCase();

    if (fld.value.trim().length === 0) {
        notBlank = false;
        errorMsg += "<span>X</span> - This field cannot be blank.</br></br>";
    } else if (/^[^a-zA-Z]+$/.test(inputValue)) {
        oneAlpha = false;
        errorMsg += "<span>X</span> - Name must contain at least one alphabetic character.</br></br>";
    } else if (((/^[a-zA-Z0-9\-\']+$/).test(inputValue)) === false) {
        allowChar = false;
        errorMsg += "<span>X</span> - Name can only contain alphanumeric characters, (-) and (').</br></br>";
    }
    if (notBlank === false || allowChar === false || oneAlpha === false) {
        eL.innerHTML = errorMsg;
        fld.style.background = "Yellow";
        return false;
    } else {
        eL.innerHTML = "";
        fld.style.background = "White";
        return true;
    }
} //end of validateName()