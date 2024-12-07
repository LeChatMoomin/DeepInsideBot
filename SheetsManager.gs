function PostValue(sheetId, listName, row, column, value){
    let list = SpreadsheetApp.openById(sheetId).getSheetByName(listName);
    let cell = list.getRange(row, column);
    cell.setValue(value);
}

function AppendRow(sheetId, listName, value){
  Logger.log(value);
  let sheet = SpreadsheetApp.openById(sheetId).getSheetByName(listName) 
  sheet.appendRow(value);
}

function GetCellValue(sheetId, listName, row, column){
  let list = SpreadsheetApp.openById(sheetId).getSheetByName(listName);
  let cell = list.getRange(row, column);
  return cell.getValue();
}

function GetOrCreateList(sheetId, listName){
  let spredSheet = SpreadsheetApp.openById(sheetId); 
  let list =  spredSheet.getSheetByName(listName);
  if (list == null){
    list = spredSheet.insertSheet();
    list.setName(listName);
  }
  return list;
}