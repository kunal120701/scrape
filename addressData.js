const data = require("./address.json")

function main() {
    const {"current-round": round, "next-token": nextToken, transactions} = data;
    // console.log(nextToken);

    transactions.map((res) => {
        const receiver = res["asset-transfer-transaction"]["receiver"];
        const amount = res["asset-transfer-transaction"]["amount"];

        const inDecimal = insertDecimal(amount);
        const inJsonFormat = {
            "address": `${receiver}`,
            "amount": inDecimal + " XET"
        }
        console.log(inJsonFormat);
    })
}

function insertDecimal(num) {
    return Number((num / 1000000000).toFixed(9));
 }

main();