const NaiveBayesClassifier = require("naive-bayes-classifier").default
let nb = new NaiveBayesClassifier();
let fs = require("fs");
const readline = require('readline');


const getSpam = (request, response)=>{
    let input = request.body.spam
    console.log(request.query.spam)
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
    },{
        category: "ham",
        text: "	ham	I know! Grumpy old people. My mom was like you better not be lying. Then again I am always the one to play jokes...        "
    },{
        category: "spam",
        text: "GENT! We are trying to contact you. Last weekends draw shows that you won a £1000 prize GUARANTEED. Call 09064012160. Claim Code K52. Valid 12hrs only. 150ppm        "
    },{
        category: "spam",
        text: "	Free entry in 2 a wkly comp to win FA Cup final tkts 21st May 2005. Text FA to 87121 to receive entry question(std txt rate)T&C's apply 08452810075over18's"
    },{
        category: "ham",
        text: "Nah I don't think he goes to usf, he lives around here though        "
    },{
        category: "spam",
        text: "	FreeMsg Hey there darling it's been 3 week's now and no word back! I'd like some fun you up for it still? Tb ok! XxX std chgs to send, £1.50 to rcv        "
    },{
        category: "ham",
        text: "	For fear of fainting with the of all that housework you just did? Quick have a cuppa        "
    },{
        category: "ham",
        text: "	ham	Today is song dedicated day.. Which song will u dedicate for me? Send this to all ur valuable frnds but first rply me..."
    }
    ,{
        category: "ham",
        text: "	ham	What you thinked about me. First time you saw me in class."
    },{
        category: "ham",
        text: "	ham	Wow. I never realized that you were so embarassed by your accomodations. I thought you liked it, since i was doing the best i could and you always seemed so happy about    he cave I'm sorry I didn't and don't have more to give. I'm sorry i offered. I'm sorry your room was so embarassing.        "
    },{
        category: "ham",
        text: "	ham	Yes I started to send requests to make it but pain came back so I'm back in bed. Double coins at the factory too. I gotta cash in all my nitros.        "
    },{
        category: "ham",
        text: "	ham	Sorry to be a pain. Is it ok if we meet another night? I spent late afternoon in casualty and that means i haven't done any of y stuff42moro and that includes all my time sheets and that. Sorry.         "
    }
    ,{
        category: "spam",
        text: "Your free ringtone is waiting to be collected. Simply text the password MIX to 85069 to verify. Get Usher and Britney. FML, PO Box 5249, MK17 92H. 450Ppw 16        "
    }
    ,{
        category: "ham",
        text: "	ham	Aight, I'll hit you up when I get some cash"
    }
    ,{
        category: "spam",
        text: "spam	GENT! We are trying to contact you. Last weekends draw shows that you won a £1000 prize GUARANTEED. Call 09064012160. Claim Code K52. Valid 12hrs only. 150ppm"
    }
];
   
    nb.train(trainArray);
    let res = nb.categorize(input)
    console.log(res)
    response.send(res)
}

module.exports={
    getSpam
}
