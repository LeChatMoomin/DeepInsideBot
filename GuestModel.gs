function AddGuests(data){
  let count = Number.parseInt(data.text.match(guestEnterReg));
  let sourceRowIndex = GetRowForSource(data.text.replace(guestEnterReg, ""), data.chat_id);
  if(sourceRowIndex != null){
    SendResponse(chat_id, data.text);
    let sourceText = PostGuestIncome(count, sourceRowIndex, (Utilities.formatDate(data.dateTime, 'Etc/GMT', 'dd.MM')));
    SendResponse(data.chat_id, `Добавлена запись о прибытии гостей.\nСколько: ${count}\nОткуда пришли: ${sourceText}`);
  }else{
    SendResponse(data.chat_id,"Не удалось распознать, откуда пришли гости, попробуйте еще раз");
  }
}

function GetRowForSource(text, chat_id){
  SendResponse(chat_id, text);
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
  // if(list.getRange(3,1).getValue == ""){
  //   FillNewGuestList(list);
  // }
  let column = GetOrCreateDateColumn(date, list);
  let range = list.getRange(row, column);
  let value = range.getValue();
  if(value == ""){
    range.setValue(`=${count}`);
  }else {
    range.setValue(`=${value}+${count}`);
  }
  return list.getRange(row, 1).getValue();
}

function GetOrCreateDateColumn(date, list){
  let lastColumn =  list.getLastColumn();
  let dateColumn = list.getRange(2, 2, 2, lastColumn).createTextFinder(date).matchCase(false).findNext().getColumn();
  return dateColumn;
}

function FillNewGuestList(list){
  //добавляет тут эти ебучие колонки с названиями источников
}