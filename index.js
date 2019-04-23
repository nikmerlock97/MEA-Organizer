let fs = require('fs');
let __ = require('lodash');

async function run() {
    let file = await fs.readFileSync(process.argv[2], {
        encoding: 'UTF-8'
    });
    let field1 = [];
    let field3 = [];
    let data = new Map();
    let lineSeperated = file.split('\n');
    lineSeperated.forEach(line => {
        let fields = line.split(',');
        // console.log(fields[1], fields[3], fields[9]);
        field1.push(fields[1]);
        field3.push(fields[3]);
        if (typeof data.get(fields[1] + ':' + fields[3]) === 'string') {
            let temp = data.get(fields[1] + ':' + fields[3]);
            data.set(fields[1] + ':' + fields[3], temp + '\n' + fields[9]);
        } else {
            data.set(fields[1] + ':' + fields[3], fields[9]);
        }
        
        // data.set(fields[1])
    });
    let uniqField1 = __.uniq(field1);
    let uniqField3 = __.uniq(field3);
    uniqField1 = uniqField1.slice(1, uniqField1.length-1);
    uniqField3 = uniqField3.slice(1, uniqField3.length-1);
    console.log(uniqField1);
    console.log(uniqField3);
    uniqField1.forEach(fld1 => {
        uniqField3.forEach(fld3 => {
            let key = `${fld1}:${fld3}`;
            console.log(key, data.get(key), '\n\n');
        })
    });
    // console.log(data.get('21:C1'));
}

run();