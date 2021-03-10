class User{
    constructor(info, userInfo){
        this.personalInfo = info;
        this.posts = [];
        this.userInfo = userInfo || {
            account: 'PlaceHolderAccount',
            password: 'PlaceHolderPassword',
            userID: 'placeHolderID',
            numberOfPosts: this.posts.length
        };
    }

    changeAccountName(newName){
        //this.userInfo.account = newName;
        this.userInfo.account = this.personalInfo.fName + this.personalInfo.lName;
    }

    changeID(newID){
        this.userInfo.userID = newID;
    }
}

export default User;