window.onload = (event) => {
    displayWeak();
};


async function generatePassword() {
    var includeUpper = document.querySelector('#includeUpper').checked;
    var includeLower = document.querySelector('#includeLower').checked;
    var includeNumbers = document.querySelector('#includeNumbers').checked;
    var includeSymbols = document.querySelector('#includeSymbols').checked;

    var length = document.querySelector('#passwrdLenghBox').innerHTML;
    var excludeNumbers=(!includeNumbers).toString();
    var excludeSpecialChars=(!includeSymbols).toString();
    var url='https://api.api-ninjas.com/v1/passwordgenerator?length='+length+'&exclude_numbers='+excludeNumbers+'&exclude_special_chars='+excludeSpecialChars;

    const response = await fetch(url, {
      method: 'Get',
      headers: {
        'X-Api-Key': 'QMFtSrHPQuUVLTTngCmwZw==f3mAmtmaQeV5llWG'
      }
    });

    const jsonPassword =await response.json();
    var jsonPasswordStr= JSON.stringify(jsonPassword);
    var data=JSON.parse(jsonPasswordStr);
    document.querySelector('#actualPasswordTxt').innerHTML=data.random_password;
    document.querySelector('#copiedText').style.display='none';
  }

  function AllChecked()
  {
    var includeUpper = document.querySelector('#includeUpper').checked;
    var includeLower = document.querySelector('#includeLower').checked;
    var includeNumbers = document.querySelector('#includeNumbers').checked;
    var includeSymbols = document.querySelector('#includeSymbols').checked;

    return includeUpper && includeLower && includeNumbers && includeSymbols;
  }

  function updateComplexityFromChckBox()
  {
      let passwrdLength= document.querySelector('#passwordLengthRange').value;
      let complexity= parseInt(passwrdLength);
      updateComplexity(complexity);
  }

  function updateComplexity(newValue) {

    let allChecked=AllChecked();

    document.querySelector('#passwrdLenghBox').innerHTML=newValue;
    let complexity= parseInt(newValue);
    switch (true){
        case complexity<=4: displayVeryWeak();break;
        case complexity>4 && complexity<=8: displayWeak();break;
        case complexity>8: 
          if (allChecked) {
            displayStrong();
          }
          else
            displayMedium();break;
        
    }
  }
  
  function copyToClipboard() {
    let actualPasswordTxt = document.querySelector('#actualPasswordTxt');
    let copiedText= document.querySelector('#copiedText');
    
    navigator.clipboard.writeText(actualPasswordTxt.innerHTML);
    copiedText.style.display='block';
  }

  function displayVeryWeak()
  {
    UpdateStrengthBlockDisplay('#passwordtooWeak','flex')
    UpdateStrengthBlockDisplay('#passwordWeak','none')
    UpdateStrengthBlockDisplay('#passwordMedium','none')
    UpdateStrengthBlockDisplay('#passwordStrong','none')
    
  }

  function displayWeak()
  {
    UpdateStrengthBlockDisplay('#passwordtooWeak','none')
    UpdateStrengthBlockDisplay('#passwordWeak','flex')
    UpdateStrengthBlockDisplay('#passwordMedium','none')
    UpdateStrengthBlockDisplay('#passwordStrong','none')
 
  }

  function displayMedium()
  {
    UpdateStrengthBlockDisplay('#passwordtooWeak','none')
    UpdateStrengthBlockDisplay('#passwordWeak','none')
    UpdateStrengthBlockDisplay('#passwordMedium','flex')
    UpdateStrengthBlockDisplay('#passwordStrong','none')
  }

  
  function displayStrong()
  {
    UpdateStrengthBlockDisplay('#passwordtooWeak','none')
    UpdateStrengthBlockDisplay('#passwordWeak','none')
    UpdateStrengthBlockDisplay('#passwordMedium','none')
    UpdateStrengthBlockDisplay('#passwordStrong','flex')
  }

  function UpdateStrengthBlockDisplay(elementID, display)
  {
    var x = document.querySelector(elementID);
    x.style.display =display;
  }