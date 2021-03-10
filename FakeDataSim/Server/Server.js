import math from '../Utils/math.js';
import fakeDataBuilder from '../FakeDataBuilder.js';
import User from '../User.js';

class Server {
  constructor() {
    this.posts = [];
    this.users = [];
  }

  populateWithData({ numberOfUsers = 0 } = {}) {
    let userAmount = numberOfUsers ? numberOfUsers : math.rand(20, 70);

    function create(posts, users, postMethod, userMethod) {
      let amountOfPosts = math.rand(0, 10);

      let fakeUser = userMethod();
      users.push(fakeUser);

      for (amountOfPosts; amountOfPosts != 0; amountOfPosts--) {
        let fPost = postMethod(fakeUser);
        posts.push(fPost);
        fPost.setPoster(fakeUser)
        fPost.id = posts.length - 1;
        fakeUser.posts.push(fPost.id);
      }
    }

    if (userAmount === 0) {
      create(this.posts, this.users, this.createFakePost, this.createFakeUser);
    } else {
      for (userAmount; userAmount != 0; userAmount--) {
        create(this.posts, this.users, this.createFakePost, this.createFakeUser);
      }
    }
    // console.log(this.posts);
    // console.log(this.users);
  }

  createFakeUser() {
    let userData = fakeDataBuilder.personalData();
    let fakeUser = new User(userData);
    fakeUser.changeAccountName();
    return fakeUser;
  }

  createFakePost(user) {
    let fPost = fakeDataBuilder.post();
    fPost.setPoster(user);
    return fPost;
  }

  removePost(postId) {
    this.posts.pop();
    console.log(this.users);
    console.log(this.posts);
  }
}

const server = new Server();
export default server;