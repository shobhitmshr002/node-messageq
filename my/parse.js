/** csv file
a,b,c
1,2,3
4,5,6
*/
const csvFilePath='/Users/shobhit/Downloads/user1.csv'
const csv=require('csvtojson');
var myCSV = [];
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj[0].field10.split(':')[1].replace('"',''));
    var obj;
    jsonObj.forEach(function(item){
        let obj = Object.assign({}, item);
        obj['sku'] = item.field9.split(':')[1].replace('"','');
        obj['id'] = item.field8.split(':')[2].replace('"','');
        myCSV.push(obj);
    })

    const json2csv = require('json2csv').parse;
const fields = Object.keys(jsonObj[0]);
fields.push('sku');
fields.push('id')

const opts = { fields };
 
try {
  const csv = json2csv(myCSV, opts);
  console.log("my new csv===",csv);
} catch (err) {
  console.error(err);
}
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})
 
// Async / await usage
