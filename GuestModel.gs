function AddGuests(data){
  let count = Number.parseInt(data.text.match(guestEnterReg));
  let sourceRowIndex = GetRowForSource(data.text.replace(guestEnterReg, ""));
  PostGuestIncome(count, sourceRowIndex, (Utilities.formatDate(data.date, 'Etc/GMT', 'dd.MM')));
  SendResponse(data.chat_id, "");
}

function GetRowForSource(text){
  let sourceRegs = Object.values(GuestSourceRegs);
  let keys = Object.keys(GuestSourceRegs);
  for(let i = 0; i < sourceRegs.length; i++){
    if(text.match(sourceRegs[i])){
      return GuestSourceRowIndex[keys[i]];
    }
  }
  return null;
}

function PostGuestIncome(count, row, date){
  let list = SheetManager.GetOrCreateList(GuestSheetId, MonthNamesLocalized[date.split(".")[1]]); 
  let column = GetOrCreateDateColumn(date, list);
  let range = list.getRange(row, column);
  let value = range.getValue();
  if(value == ""){
    range.setValue(`=${count}`);
  }else {
    range.setValue(`=${value}+${count}`);
  }
}

function GetOrCreateDateColumn(date, list){
  // if(list.getRange(3,1).getValue == ""){
  //   FillNewGuestList(list);
  // }
  let lastColumn =  list.getLastColumn();
  let dateColumn = list.getRange(2, 2, 2, lastColumn).createTextFinder(date).matchCase(false).findNext().getColumn();
  return dateColumn;
}

function FillNewGuestList(list){
  //добавляет тут эти ебучие колонки с названиями источников
}