class Post {
    constructor({title, content, id, postedBy}){
        this.title = title || 'Temporary Title (PlaceHolder)';
        this.content = content || 'Placeholder content and stuff';
        this.id = id;
        this.postedBy = postedBy || 'Adminnn';
        this.comments = [];
        this.datePosted = Date.now();
    }

    setPoster(poster){
        this.postedBy = poster.userInfo.account;
    }
}

export default Post;