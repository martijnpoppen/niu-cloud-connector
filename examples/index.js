const dotenv = require("dotenv");
const niuCloudConnector = require("../index.js");

dotenv.config();
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const TOKEN = process.env.TOKEN;
if (!USERNAME || !PASSWORD) {
  throw new Error(
    `Please fill in 'USERNAME' & 'PASSWORD' values in your .env-file!`
  );
}

const main = async () => {
  const _niuClient = new niuCloudConnector.Client();
  await _niuClient.enableDebugMode(false);
  try {
    if(!TOKEN) {
        const token = await _niuClient.createSessionToken({account: USERNAME, password: PASSWORD, countryCode: '31'});
        console.log(token);
    } else {
        const token = await _niuClient.setSessionToken({token: TOKEN});
    }
    
    
    const vehicles = await _niuClient.getVehicles();
    console.log(vehicles);
  } catch (error) {
      console.log(error)
  }


//   const _token = await _niuClient.createSessionToken({account: USERNAME, password: PASSWORD});
//   console.log(_token);

};

main();
