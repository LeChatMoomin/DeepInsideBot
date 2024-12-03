class SheetManager{
  static PostValue(sheetId, listName, row, column, value){
    let list = SpreadsheetApp.openById(sheetId).getSheetByName(listName);
    let cell = list.getRange(row, column);
    cell.setValue(value);
  }

  static AppendRow(sheetId, listName, value){
    let sheet = SpreadsheetApp.openById(sheetId).getSheetByName(listName) 
    sheet.appendRow(value);
  }

  static GetCellValue(sheetId, listName, row, column){
    let list = SpreadsheetApp.openById(sheetId).getSheetByName(listName);
    let cell = list.getRange(row, column);
    return cell.getValue();
  }

  static GetOrCreateList(sheetId, listName){
    let spredSheet = SpreadsheetApp.openById(sheetId); 
    let list =  spredSheet.getSheetByName(listName);
    if (list == null){
      list = spredSheet.insertSheet();
      list.setName(listName);
    }
    return list;
  }
}
