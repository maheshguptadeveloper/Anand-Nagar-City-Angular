import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  statistics = [
    {
      title: 'Total Users',
      value: '12',
      change: '+8%',
      label: 'vs last month',
      icon: 'bi-people-fill',
      iconClass: 'blue'
    },
    {
      title: 'Total Products',
      value: '48',
      change: '+12%',
      label: 'vs last month',
      icon: 'bi-box-seam-fill',
      iconClass: 'orange'
    },
    {
      title: 'Total Events',
      value: '16',
      change: '+25%',
      label: 'vs last month',
      icon: 'bi-calendar-event-fill',
      iconClass: 'purple'
    },
    {
      title: 'Total Albums',
      value: '32',
      change: '+5%',
      label: 'vs last month',
      icon: 'bi-images',
      iconClass: 'pink'
    },
    {
      title: 'New Enquiries',
      value: '21',
      change: '+40%',
      label: 'vs last month',
      icon: 'bi-envelope-fill',
      iconClass: 'green'
    }
  ];


  recentEvents = [
    {
      title: 'Ganeshotsav 2026',
      date: '02 Oct 2026',
      location: 'Anand Nagar Community Hall',
      image: '/Images/Golden River Valley Sunset.png',
      status: 'Published',
      statusClass: 'published'
    },
    {
      title: 'Cleanliness Drive',
      date: '28 Sep 2026',
      location: 'Main Road',
      image: '/Images/Golden River Valley Sunset.png',
      status: 'Published',
      statusClass: 'published'
    },
    {
      title: 'Health Camp',
      date: '20 Sep 2026',
      location: 'Anand Nagar Hospital',
      image: '/Images/Golden River Valley Sunset.png',
      status: 'Draft',
      statusClass: 'draft'
    }
  ];


  enquiries = [
    {
      initials: 'RS',
      name: 'Rahul Sharma',
      subject: 'Business Registration',
      time: 'Today, 01:15 PM',
      status: 'New',
      statusClass: 'new'
    },
    {
      initials: 'AV',
      name: 'Amit Verma',
      subject: 'Event Information',
      time: '01 Oct, 05:20 PM',
      status: 'Viewed',
      statusClass: 'viewed'
    },
    {
      initials: 'SP',
      name: 'Sneha Patil',
      subject: 'Local Business',
      time: '30 Sep, 02:10 PM',
      status: 'New',
      statusClass: 'new'
    },
    {
      initials: 'RK',
      name: 'Ramesh Kumar',
      subject: 'Business Website',
      time: '29 Sep, 11:40 AM',
      status: 'Contacted',
      statusClass: 'contacted'
    }
  ];


  products = [
    {
      name: 'Fresh Vegetables',
      category: 'Food & Grocery',
      price: '₹50 - ₹200',
      image: '/Images/Golden River Valley Sunset.png',
      status: 'Active'
    },
    {
      name: 'Handmade Crafts',
      category: 'Local Arts',
      price: '₹200 - ₹1,000',
      image: '/Images/Golden River Valley Sunset.png',
      status: 'Active'
    },
    {
      name: 'Home Appliances',
      category: 'Electronics',
      price: '₹5,000 - ₹25,000',
      image: '/Images/Golden River Valley Sunset.png',
      status: 'Active'
    }
  ];


  activityValues = [
    42,
    68,
    52,
    82,
    105,
    67,
    92
  ];


  quickActions = [
    {
      title: 'Add Banner',
      icon: 'bi-images',
      iconClass: 'purple'
    },
    {
      title: 'Add Event',
      icon: 'bi-calendar-plus',
      iconClass: 'red'
    },
    {
      title: 'Add Product',
      icon: 'bi-box-seam',
      iconClass: 'orange'
    },
    {
      title: 'Add Album',
      icon: 'bi-collection',
      iconClass: 'blue'
    },
    {
      title: 'New Page',
      icon: 'bi-file-earmark-plus',
      iconClass: 'green'
    },
    {
      title: 'View Enquiries',
      icon: 'bi-envelope',
      iconClass: 'cyan'
    }
  ];


  getActivityHeight(value: number): string {
    return `${Math.max(10, value * 0.75)}px`;
  }

}