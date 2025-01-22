
import { ref } from 'vue';
import cornIcon from '@/images/icons/corn.png';
import tomatoIcon from '@/images/icons/tomato.png';
import wheatIcon from '@/images/icons/wheat.png';
import carrotIcon from '@/images/icons/carrot.png';
import cropIcon from '@/images/icons/crop.png';
import potatoIcon from '@/images/icons/potato.png';

export interface Post {
  title: string;
  price: number;
  crop_type: string;
  amount: number;
  location: string;
  contact: string;
  extra_info: string;
  date: string;
  expiry_date: string;
  email: string;
  vendor_name: string;
}

export class PostService {
  // Post list is stored as a reactive reference to ensure reactivity in the view
  posts = ref<Post[]>([]);

  constructor(initialPosts: Post[] = []) {
    this.posts.value = initialPosts;
  }

  // Function to create a new post
  createPost(post: Post): void {
    this.posts.value.push(post);
  }

  // Function to delete a post by its index
  deletePost(index: number): void {
    this.posts.value.splice(index, 1);
  }

  // Function to format the contact number (same logic as before)
  formatContact(contact: string): string {
    return contact.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  // Function to get the crop icon URL based on crop type
  getCropIcon(cropType: string): string {
    switch (cropType.toLowerCase()) {
      case 'corn':
        return cornIcon;
      case 'tomato':
        return tomatoIcon;
      case 'wheat':
        return wheatIcon;
      case 'carrot':
        return carrotIcon;
      case 'potato':
        return potatoIcon;
      default:
        return cropIcon;
    }
  }
}

export const postSer= new PostService([
    {
        title: 'Fresh Potatoes for Sale. Organic and Locally Grown.',
        price: 100,
        crop_type: 'Potato',
        amount: 100,
        location: 'Spokane, WA, USA',
        contact: '8496554654',
        vendor_name: 'Red Barn Farms',
        email: 'nowhere@somewhere.com',
        extra_info: 'Extra Info',
        date: '2021-09-01',
        expiry_date: '2021-09-30',
      },  
      {
        title: 'Carrots for Sale. Fresh and Organic.',
        price: 200,
        crop_type: 'Carrot',
        amount: 200,
        location: 'Seattle, WA, USA',
        contact: '2156548231',
        vendor_name: 'Blue Barn Farms',
        email: 'somewhere@nowhere.com',
        extra_info: 'Extra Info 2',
        date: '2021-09-02',
        expiry_date: '2021-09-29',
      },
      {
        title: 'Rotten Tomatoes for Sale. Cheap and Expired.',
        price: 10,
        crop_type: 'Tomato',
        amount: 200,
        location: 'Seattle, WA, USA',
        contact: '2424548231',
        vendor_name: 'Brown Barn Farms',
        email: 'somewhere2@nowhere.com',
        extra_info: 'Extra Info 2',
        date: '2021-09-02',
        expiry_date: '2021-09-29',
      },
      {
        title: 'Unripe Corn for Sale. Fresh and Raw.',
        price: 900,
        crop_type: 'Corn',
        amount: 1,
        location: 'Seattle, WA, USA',
        contact: '9999999999',
        vendor_name: 'Yellow Barn Farms',
        email: 'nowhere2@nowhere.com',
        extra_info: 'Extra Info 2',
        date: '2021-09-02',
        expiry_date: '2021-09-29',
      },
]);
