import fakeData from './data/index.js';
import math from './utils/math.js';
import User from './User.js';
import Post from './Post.js';

class FakeDataBuilder {

    constructor() {
        //this.sentanceExtractor = this.sentanceExtractor.bind(this);
    }

    build() {

    }
    
    //I sense an error in the parameters....
    personalData({ gender, age, clean } = { clean: false, age: 0 }) {

        //Randomly picks an array with names if the gender is not specified
        let firstNameGender;
        if (gender == undefined) {
            gender = math.rand(2) ? 'male' : 'female';
            if (gender == 'male') {
                firstNameGender = fakeData.maleNames;
            } else {
                firstNameGender = fakeData.femaleNames;
            }
        }

        //Creates personalInfo object
        const user = {
            fName: math.randOneFrom(firstNameGender),
            mName: math.randOneFrom(fakeData.unisexMiddle),
            lName: math.randOneFrom(fakeData.unisexLast)
        };

        user.age = age ? age : math.rand(18, 70);

        return user;
    }

    user({ amount = 0, posts = 0 } = {}) {
        if (amount !== 0) {
            const usersArray = [];

            for (let i = 0; i != amount; i++) {
                let user = new User(this.personalData());
                usersArray.push(user);
            }
            return usersArray;
        } else {
            return new User(this.personalData());
        }
    }

    post(amount = 0, sentanceAmount = 0, user = 'Admin') {


        const extractor = this.sentanceExtractor;
        function createPost() {
            let stcNumber = sentanceAmount ? sentanceAmount : math.rand(5, 20);
            let title = extractor();
            let content = extractor({ numSentances: stcNumber });
            let newPost = {
                title: title,
                content: content,
                //the IDs will repeat if I make multyple calls
                id: amount,
            }
            return new Post(newPost);
        }

        if (amount === 0) {
            return createPost();
        } else {
            let posts = [];
            for (amount; amount != 0; amount--) {
                posts.push(createPost());
            }
            return posts;
        }
    }

    //Needs more work and knowledge, it needs to be more generalized
    sentanceExtractor({ numSentances = 1, startIndex = false, text = fakeData.loremIpsum } = {}) {
        //Works only with big Chunks of text
        //Specifically made for the loremIpsum text from fakeData
        let start = startIndex ? startIndex : math.rand(0, Math.floor(text.length / 2));
        let outputText = '';
        function findNextSentance() {
            let temp = start;
            //The 'or' might be error prone
            while (text[start] !== '.' || (start - temp) < 4) {
                start++;
            }
        }

        //Search for beginning of next sentance
        if (text[start] !== '.') {
            findNextSentance();
            start += 2;
        } else {
            start += 2;
        }

        for (numSentances; numSentances != 0; numSentances--) {
            let sentStartIndex = start;
            findNextSentance();
            outputText += text.substring(sentStartIndex, start++) + '.';
        }
        return outputText;

        //String.indexOf(); maybe?
    }

}

const fakeDataBuilder = new FakeDataBuilder();

export default fakeDataBuilder;