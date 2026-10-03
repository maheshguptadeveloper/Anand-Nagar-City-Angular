import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Banner {
    id: number;
    title: string;
    description: string;
    image: string;
    buttonText: string;
    buttonLink: string;
    displayOrder: number;
    startDate: string;
    endDate: string;
    status: 'Active' | 'Inactive';
}

@Component({
    selector: 'app-banners',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './banners.html',
    styleUrl: './banners.css'
})
export class Banners {

    searchText = '';

    statusFilter = 'All';


    banners: Banner[] = [

        {
            id: 1,
            title: 'Welcome to Anand Nagar',
            description: 'Explore the beauty, culture and opportunities of our city.',
            image: '/Images/Golden River Valley Sunset.png',
            buttonText: 'Explore Now',
            buttonLink: '/explore.html',
            displayOrder: 1,
            startDate: '01/10/2026',
            endDate: '31/12/2026',
            status: 'Active'
        },

        {
            id: 2,
            title: 'Discover Our City',
            description: 'Discover important places and attractions around Anand Nagar.',
            image: '/Images/Golden River Valley Sunset.png',
            buttonText: 'Discover',
            buttonLink: '/explore.html',
            displayOrder: 2,
            startDate: '01/10/2026',
            endDate: '31/12/2026',
            status: 'Active'
        },

        {
            id: 3,
            title: 'Our Events',
            description: 'Stay updated with upcoming events and community activities.',
            image: '/Images/Golden River Valley Sunset.png',
            buttonText: 'View Events',
            buttonLink: '/events.html',
            displayOrder: 3,
            startDate: '01/10/2026',
            endDate: '30/11/2026',
            status: 'Active'
        },

        {
            id: 4,
            title: 'Local Businesses',
            description: 'Find local businesses, services and shops in Anand Nagar.',
            image: '/Images/Golden River Valley Sunset.png',
            buttonText: 'Explore Businesses',
            buttonLink: '/directory.html',
            displayOrder: 4,
            startDate: '01/10/2026',
            endDate: '31/12/2026',
            status: 'Inactive'
        },

        {
            id: 5,
            title: 'Explore & Experience',
            description: 'Experience the culture, places and lifestyle of Anand Nagar.',
            image: '/Images/Golden River Valley Sunset.png',
            buttonText: 'Explore',
            buttonLink: '/explore.html',
            displayOrder: 5,
            startDate: '01/10/2026',
            endDate: '31/12/2026',
            status: 'Active'
        }

    ];


    constructor(
        private router: Router
    ) {}


    get filteredBanners(): Banner[] {

        const search =
            this.searchText
                .trim()
                .toLowerCase();


        return this.banners.filter(banner => {

            const matchesSearch =
                !search ||

                banner.title
                    .toLowerCase()
                    .includes(search) ||

                banner.description
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                this.statusFilter === 'All' ||

                banner.status === this.statusFilter;


            return matchesSearch && matchesStatus;

        });

    }


    addBanner(): void {

        this.router.navigate([
            '/admin/banners/add'
        ]);

    }


    editBanner(id: number): void {

        this.router.navigate([
            '/admin/banners/edit',
            id
        ]);

    }


    deleteBanner(id: number): void {

        const banner =
            this.banners.find(
                item => item.id === id
            );


        if (!banner) {
            return;
        }


        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${banner.title}"?`
            );


        if (!confirmed) {
            return;
        }


        this.banners =
            this.banners.filter(
                item => item.id !== id
            );

    }


    toggleStatus(banner: Banner): void {

        banner.status =
            banner.status === 'Active'
                ? 'Inactive'
                : 'Active';

    }

}