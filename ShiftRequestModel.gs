function AddShiftRequest(data) {
  let cell = GetRequestCell(data);
  cell.setValue("+");
}

function AddShiftBlock(data) {
  let cell = GetRequestCell(data);
  cell.setBackgroundRGB(200,200,200);
}

function RemoveShiftRequest(data){
  let cell = GetRequestCell(data);
  cell.setValue("");
}

function GetRequestCell(data){
  let rangeOffset = 0;
  if(data.text.match(eveningShiftReg)){
    rangeOffset = 1;
  }
  let list = SpreadsheetApp.openById(WorkTimeSheetId).getSheetByName(WorkShiftListName);
  let date = GetDatePost(data.dateTime, data.text);
  let column = GetColumnForWorkerNEWSheet(list, username);
  let row = GetDateRangeForWorkerNEW(list, date).getRow();
  let cell = list.getRange(row + rangeOffset, column);
  return cell;
}