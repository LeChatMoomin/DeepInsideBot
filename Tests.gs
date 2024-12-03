function TestComandTypeParser() {
  let type = Utilities.formatDate(new Date(), 'Etc/GMT', 'dd.MM');
  Logger.log(MonthNamesLocalized[type.split(".")[1]]);
}

function TestTypes(){
  let num = 1;
  let char = 'a';
  let someNewType = {num, char};

  Logger.log(`num: ${typeof(num)}, char: ${typeof(char)} some: ${typeof(someNewType)}`);
}

function TestEnums(){
  let text = "Яндекс";
  let values = Object.values(GuestSourceRegs);
  for(let i = 0; i < values.length; i++){
    if(text.match(values[i])){
      Logger.log(GuestSourceRowIndex[Object.keys(GuestSourceRegs)[i]]);
    }
  }
  //GuestSourceRegs.forEach(  reg => {Logger.log(reg);});
}

function TestValueType(){
  let list = SpreadsheetApp.openById(GuestSheetId).getSheetByName("Декабрь");
  let date = "07.12";
  let lastColumn =  list.getLastColumn();

  let value =list.getRange(3,2).getValue(); //list.getRange(2, 2, 2, lastColumn).createTextFinder(date).matchCase(false).findNext().getColumn();
  Logger.log(value);
}