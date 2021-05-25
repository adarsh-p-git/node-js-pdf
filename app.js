let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");


let name = "Adarsh P";
let event = "classical music";


app.get("/generateReport", (req, res) => {
	ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), { name , event    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm",
                },
                "footer": {
                    "height": "20mm",
                },

            };
            pdf.create(data, options).toFile('./certificates/' +name+"."+event+'.pdf', function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("File created successfully");
                }
            });
        }
    });
})

app.listen(3000);
