import { ref } from "vue";
import cornIcon from "@/images/icons/corn.png";
import tomatoIcon from "@/images/icons/tomato.png";
import wheatIcon from "@/images/icons/wheat.png";
import carrotIcon from "@/images/icons/carrot.png";
import cropIcon from "@/images/icons/crop.png";
import potatoIcon from "@/images/icons/potato.png";
import axios from "axios";

export interface Post {
  postId: string;
  title: string;
  price: number;
  cropType: string;
  amount: number;
  location: string;
  contact: string;
  description: string;
  createDate: string;
  expireDate: string;
  name: string;
  status: string;
  userId: string;
}



export default class GetUserPostService {
  // Post list is stored as a reactive reference to ensure reactivity in the view
  posts = ref<Post[]>([]);


  constructor(initialPosts: Post[] = []) {
    this.posts.value = initialPosts;
  }

  

  async fetchPosts(): Promise<void> {
    try {
      const acTo = await checkUser();
      console.log(acTo);

      const uIds = await getUser();
      console.log(uIds);
      const uIdurl = `https://localhost:7170/api/posts/user/${uIds}`;
      console.log(uIdurl);

      const response = await axios.get(uIdurl);
      if (response.status === 200) {
        this.posts.value = response.data;
        console.log(response.data);
      }
    } catch (error: any) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  }

  async EditCurrentPost(post : any): Promise<void> {
    try {
      const response = await axios.put(`https://localhost:7170/api/posts/${post.postID}`, {
        title: post.title,
        price: post.price,
        cropType: post.cropType,
        amount: post.amount,
        location: post.location,
        contact: post.contact,
        description: post.description,
        expireDate: this.convertExpireDate(post.expireDate, post.currentExpireDate),
        name: post.name,
        status: post.status,
        userId: post.userId,
      });
      if (response.status === 200) {
        alert("Post updated successfully");
      }
    } catch (error: any) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  }

  convertExpireDate = (expireValue: any, currentExpireDate: any): string => {
    if (expireValue === 0) {
      return currentExpireDate;
    }
    if (typeof expireValue === 'number') {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + expireValue);
      newDate.setHours(0, 0, 0, 0);
      return newDate.toISOString();
    }
    return expireValue;
  };



  // Function to create a new post
  async createPost(post: Post): Promise<void> {
    try {

      // getting the access token from the session storage
      // const acTo = await checkUser();
      // console.log(acTo);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${acTo}`;
      console.log(post);

      const response = await axios.post("https://localhost:7170/api/posts", {
        title: post.title,
        price: post.price,
        cropType: post.cropType,
        amount: post.amount,
        location: post.location,
        contact: post.contact,
        description: post.description,
        expireDate: post.expireDate,
        name: post.name,
        status: post.status,
        userId: post.userId,
      }
    );
      if (response.status === 201) {
        this.posts.value.push(response.data);
      }
    } catch (error : any) {
      if (error.response) {
        alert(error.response.data.title);
      } else if (error.request) {
        alert('No response from server. Please try again.');
      } else {
        alert('An unexpected error occurred.');
      }
    }
  }

  // Function to delete a post by its index
  deletePost(index: number): void {
    this.posts.value.splice(index, 1);
    console.log(index);
  }

  // Function to format the contact number (same logic as before)
  formatContact(contact: string): string {
    return contact.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  // Function to get the crop icon URL based on crop type
  getCropIcon(cropType: string | undefined | null): string {
    if (!cropType) return cropIcon; // handle post enter with swagger
    switch (cropType.toLowerCase()) {
      case "corn":
        return cornIcon;
      case "tomato":
        return tomatoIcon;
      case "wheat":
        return wheatIcon;
      case "carrot":
        return carrotIcon;
      case "potato":
        return potatoIcon;
      default:
        return cropIcon;
    }
  }
}


export const usersPost = new GetUserPostService();




const checkUser = () => {
  const aT = sessionStorage.getItem('AccessToken');
  if (aT != null || aT != undefined) {
    return sessionStorage.getItem('AccessToken');
  } else {
    alert("No AccessToken found in session storage");
    const rT = localStorage.getItem('AccessToken');
    if (rT != null || rT != undefined) {
    return localStorage.getItem('AccessToken');
  } else {
    alert("No AccessToken found in local storage");
    
  }
  }
};

const getUser = () => {
  const uId = sessionStorage.getItem('Id');
  if (uId != null || uId != undefined) {
    return sessionStorage.getItem('Id');
  } else {
    alert("No uId found in session storage");
  }
};