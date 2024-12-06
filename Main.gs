class PostData{
  constructor(chat_id, text, username, commandType){
    this.chat_id = chat_id;
    this.text = text;
    this.username = username;
    this.commandType = commandType;
    this.dateTime = new Date(); 
  }
}

function DoPost(post){
  let data = GetPostData(JSON.parse(post.postData.contents));
  AppendRow(TechSheetId, "Debug", [data.username, data.text, data.commandType, data.dateTime.toLocaleString()]);
  HandlePostCommand(data);
}

function GetPostData(contents){
  let text;
  let chat_id;
  let username;
  if (contents.hasOwnProperty("callback_query")){
    text = contents.callback_query.data;
    chat_id = contents.callback_query.from.id;
    username = contents.callback_query.from.username;
  }else{
    text = contents.message.text;
    chat_id = contents.message.chat.id
    username =  contents.message.from.username;
  }
  let comandType = ParseCommandType(text);
  let result = new PostData(chat_id, text, username, comandType);
  return result;
}

