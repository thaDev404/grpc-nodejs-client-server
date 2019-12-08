const grpc = require('grpc');

const proto = grpc.load('proto/thin_grpc.proto');
const server = new grpc.Server();

//define the callable methods that correspond to the methods defined in the protofile
server.addProtoService(proto.thin_grpc.ThinGrpcService.service, {
  /**
  Grant an employee leave days
  */
 GetTimestsampedData(call, callback) {
  //obtaining full blown explicit date time 
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time;

  //obtaining implicit time stamp
  let timeStamp = new Date().getTime();

  // set response to be sent by the server
  let response = call.request.name + " " + timeStamp;

  //sending a response from the server
  callback(null, {
    response
  });
  }
});

//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
