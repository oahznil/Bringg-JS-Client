/**
 * Created by liorsion on 8/30/15.
 */
var BringgClient = require('./node_bringg_client')
  , bringgClient = new BringgClient({url:'127.0.0.1', accessToken: 'yguRVwczRyt69exGW2Vf' , secretKey: 'Yc49QFCaX_GYtjxnUVnt'})
  , taskDetails = {
    title: 'hello',
    formatted_note: [['header1','header2'],['row1','row1'],['row2','row2']]
  };

bringgClient.createTaskWithFormattedNote(taskDetails);

