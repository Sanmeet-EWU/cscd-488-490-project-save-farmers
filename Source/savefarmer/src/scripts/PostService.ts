import { ref } from "vue";
import cornIcon from "@/images/icons/corn.png";
import tomatoIcon from "@/images/icons/tomato.png";
import wheatIcon from "@/images/icons/wheat.png";
import carrotIcon from "@/images/icons/carrot.png";
import cropIcon from "@/images/icons/crop.png";
import potatoIcon from "@/images/icons/potato.png";
import axios from "axios";

export interface Post {
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


export default class PostService {
  // Post list is stored as a reactive reference to ensure reactivity in the view
  posts = ref<Post[]>([]);

  constructor(initialPosts: Post[] = []) {
    this.posts.value = initialPosts;
  }

  async fetchPosts(): Promise<void> {
    try {
      const response = await axios.get("https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/posts");
      if (response.status === 200) {
        this.posts.value = response.data;
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


  // Function to create a new post
  async createPost(post: Post): Promise<void> {
    try {

      // getting the access token from the session storage
      // const acTo = await checkUser();
      // console.log(acTo);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${acTo}`;
      console.log(post);

      
      const response = await axios.post("https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/posts", {
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
      });

      


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

export const postSer = new PostService();




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