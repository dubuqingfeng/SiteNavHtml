const Bmob = require('hydrogen-js-sdk');
const fs = require('fs');

const secret_key = process.env.BMOB_SECRET_KEY || '';
const app_security_key = process.env.BMOB_APP_SECURITY_KEY || '';
Bmob.initialize(secret_key, app_security_key);

// fetch the data from bmob
function fetchData(table, output_filename) {
    let lists = [];
    const query = Bmob.Query(table);
    query.limit(1000);
    query.order("sort");
    query.find().then(res => {
        console.log("fetched " + table);
        for (let i = 0; i < res.length; i++) {
            r = res[i];
            delete r.objectId;
            lists.push(r);
        }
        // convert JSON object to string
        const data = JSON.stringify(lists);
        console.log(data);
        // write JSON string to a file
        try {
            fs.writeFileSync("./outputs/" + output_filename +".json", data);
            console.log("JSON data is saved.");
        } catch (error) {
            console.error(err);
        }
    });
}

fetchData("left_links", "left_links");
fetchData("right_links", "right_links");
fetchData("recently_used", "recently_used");