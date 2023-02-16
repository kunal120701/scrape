const algosdk = require("algosdk");
const appData = require("./appData");
require("dotenv").config();

const baseServer = process.env.BASE_URL;
const token = {
  "X-API-Key": process.env.API_KEY,
};

const algodclient = new algosdk.Algodv2(token, baseServer);
// const address = "7M64XE5BEPFS44FTTQ6NEGK6UZWAZDCSNV5WQLGGBP3J3AWWWGRNJQA354";
const index = 879143542;

async function getData() {
  // console.log(data.address);
  appData.map(async (addr) => {
    const appState = await algodclient
    .accountApplicationInformation(addr, index)
    .do();
  
    // console.log(appState);

  const id = appState["app-local-state"]["key-value"];

  console.log("--------------*****-----------------");
  // console.log("round", appState.round);
  console.log(addr);
  // console.log("schema",appState["app-local-state"].schema);

  // console.log(id);
  id.map(async (res) => {
    try {
      const { key, value } = res;
      // console.log("time",value.uint);
      let buff = await new Buffer.from(key, "base64");
      let decodedString = buff.toString("utf8");

      // console.log(decodedString);

      if (decodedString != "stakedAmt") {
        console.log(decodedString, ":", convertToTime(value.uint));
      } else {
        console.log(decodedString, ":", value.uint);
      }
    } catch (error) {
      console.log(error);
    }
  });
  })
  
}

function convertToTime(timeStamp) {
  var theDate = new Date(timeStamp * 1000);
  return theDate;
}

async function main() {
  await getData();
}

main();
