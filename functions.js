window.onload = (event) => {
    displayWeak();
};


async function generatePassword() {
    var includeUpper = document.querySelector('#includeUpper').checked;
    var includeLower = document.querySelector('#includeLower').checked;
    var includeNumbers = document.querySelector('#includeNumbers').checked;
    var includeSymbols = document.querySelector('#includeSymbols').checked;

    var length = document.querySelector('#passwrdLenghBox').value;
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

  }

  function updateComplexity(newValue) {
    document.querySelector('#passwrdLenghBox').innerHTML=newValue;
    let complexity= parseInt(newValue);
    switch (true){
        case complexity<=3: displayVeryWeak();break;
        case complexity>3 && complexity<=6: displayWeak();break;
        case complexity>6 && complexity<10: displayMedium();break;
        case complexity>=10: displayStrong();break;
    }
  }
  
  function copyToClipboard() {
    var actualPasswordTxt = document.querySelector('#actualPasswordTxt');
    navigator.clipboard.writeText(actualPasswordTxt.innerHTML);
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