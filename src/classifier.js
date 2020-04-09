const NaiveBayesClassifier = require("naive-bayes-classifier").default
let nb = new NaiveBayesClassifier();
let fs = require("fs");
const readline = require('readline');


const getSpam = (request, response)=>{
    let input = request.body.spam
    console.log(input)
    // test dataset
    let trainArray = [{
        category: "spam",
        text: "England v Macedonia - dont miss the goals/team news. Txt ur national team to 87077 eg ENGLAND to 87077 Try:WALES, SCOTLAND 4txt/ú1.20 POBOXox36504W45WQ 16+"
    },{
        category: "spam",
        text: "XXXMobileMovieClub: To use your credit, click the WAP link in the next txt message or click here>> http://wap. xxxmobilemovieclub.com?n=QJKGIGHJJGCBL"
    },{
        category: "spam",
        text: "WINNER!! As a valued network customer you have been selected to receivea £900 prize reward! To claim call 09061701461. Claim code KL341. Valid 12 hours only.    "
    },{
        category: "spam",
        text: "	Had your mobile 11 months or more? U R entitled to Update to the latest colour mobiles with camera for Free! Call The Mobile Update Co FREE on 08002986030    "
    },{
        category: "ham",
        text: "	Go until jurong point, crazy.. Available only in bugis n great world la e buffet... Cine there got amore wat..    "
    },{
        category: "ham",
        text: "I see the letter B on my car"
    }];
    let testArray = [{
        category: "ham",
        text: "Anything lor... U decide..."
    },{
        category: "ham",
        text: "Hello! How's you and how did saturday go? I was just texting to see if you'd decided to do anything tomo. Not that i'm trying to invite myself or anything!"
    }];
    nb.train(trainArray);
    let res = nb.categorize(input)
    console.log(res)
    response.send(res)
}

module.exports={
    getSpam
}
