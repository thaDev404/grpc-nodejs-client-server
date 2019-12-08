const grpc = require('grpc');

const protoPath = require('path').join(__dirname, '../', 'proto');
const proto = grpc.load({root: protoPath, file: 'thin_grpc.proto' });

//Creating a new client instance that binds to the grpc server.
const client = new proto.thin_grpc.ThinGrpcService('localhost:50050', grpc.credentials.createInsecure());

//dummy data to be sent from client to server
const client_request = {
    name: "test"
}

//get response from grpc server
client.GetTimestsampedData(client_request.name, (error, response) => {
  console.log(response);
});
