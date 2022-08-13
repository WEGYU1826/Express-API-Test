const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { post } = require("request");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , (req, res) =>{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/" ,(req , res) => { 
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAccount = req.body.email;
    
    const data = {
        members: [
            {
                email_address: emailAccount,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/49ede0bd77";
    const option = {
        method: "POST",
        auth: "wegyu:23946cdfc94b9460346330dcf879dc18f-us11"
    }

    const request =  https.request(url,option,(response) => {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data" ,(data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/faliure" ,(req , res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || port, () => {
    console.log("Server is running at "+port);
})

// 3946cdfc94b9460346330dcf879dc18f-us11
// 49ede0bd77