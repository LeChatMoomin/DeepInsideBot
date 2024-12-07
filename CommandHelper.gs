function ParseCommandType(text){
  let regs = Object.values(CommandTypeRegs);
  let keys = Object.keys(CommandTypeRegs);
  for(let i = 0; i < regs.length; i++){
    if(text.match(regs[i])){
      return CommandType[keys[i]];
    }
  }
  return CommandType.Unknown;
}

function HandlePostCommand(data){
  switch (data.commandType){
    case CommandType.BaseMenu:
      HandleMenuCommand(data);
    break;
    case CommandType.AddGuests:
      AddGuests(data);
    break;
    case CommandType.PostArrivalRecord:
      AddArrivalRec(data);
    break;
    case CommandType.PostLeaveRecord:
      AddLeaveRec(data);
    break;
    case CommandType.AddShiftRequest:
      AddShiftRequest(data);
    break;
    case CommandType.RemoveShiftRequest:
      RemoveShiftRequest(data);
    break;
    case CommandType.BlockShift:
      AddShiftBlock(data);
    break;
    default:
      SendUnknownCommandResponse(data.chat_id);
    break;
  }
}

function HandleMenuCommand(data){
  switch(data.text.replace("/", "")){
    case BaseMenuCommand.start:
    case BaseMenuCommand.changeRole:
      SendResponse(data.chat_id, "Как вас записать?", JobTitleKeyboard);
    break;
    case BaseMenuCommand.help:
      SendHelpInfoResponse(data.chat_id);
    break;
    case BaseMenuCommand.myId:
      SendResponse(data.chat_id, `Ваш telegram Id: ${data.chat_id}`);
    break;
    case JobTitle.admin:
      SetJobTitle(data, JobTitle.admin);
    break;
    case JobTitle.moderator:
      SetJobTitle(data, JobTitle.moderator);
    break;
    default:
     SendUnknownCommandResponse(data.chat_id);
    break;
  }
}