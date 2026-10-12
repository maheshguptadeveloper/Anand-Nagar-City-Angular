import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface BusinessItem {
    id: number;
    businessName: string;
    slug: string;
    category: string;
    contactPerson: string;
    mobile: string;
    email: string;
    city: string;
    locality: string;
    status: 'Active' | 'Inactive';
    featured: boolean;
    logo: string;
    createdDate: string;
}

@Component({
    selector: 'app-directory',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './directory.html',
    styleUrl: './directory.css'
})
export class Directory {

    searchText = '';
    selectedCategory = '';
    selectedStatus = '';
    selectedFeatured = '';

    currentPage = 1;
    pageSize = 8;

    categories = [
        'Restaurant',
        'Hotel',
        'Hospital',
        'Education',
        'Shopping',
        'Grocery',
        'Bank',
        'Salon',
        'Automobile',
        'Real Estate',
        'Professional Services',
        'Other'
    ];

    statuses = [
        'Active',
        'Inactive'
    ];

    featuredOptions = [
        'Featured',
        'Not Featured'
    ];

    businesses: BusinessItem[] = [

        {
            id: 1,
            businessName: 'Anand Restaurant',
            slug: 'anand-restaurant',
            category: 'Restaurant',
            contactPerson: 'Raj Kumar',
            mobile: '9876543210',
            email: 'info@anandrestaurant.com',
            city: 'Anand Nagar',
            locality: 'Main Market',
            status: 'Active',
            featured: true,
            logo: '/images/business-restaurant.jpg',
            createdDate: '01 Oct 2026'
        },

        {
            id: 2,
            businessName: 'City Care Hospital',
            slug: 'city-care-hospital',
            category: 'Hospital',
            contactPerson: 'Dr. Amit Singh',
            mobile: '9876543211',
            email: 'info@citycarehospital.com',
            city: 'Anand Nagar',
            locality: 'Station Road',
            status: 'Active',
            featured: true,
            logo: '/images/business-hospital.jpg',
            createdDate: '28 Sep 2026'
        },

        {
            id: 3,
            businessName: 'Anand Public School',
            slug: 'anand-public-school',
            category: 'Education',
            contactPerson: 'Sanjay Verma',
            mobile: '9876543212',
            email: 'contact@anandpublicschool.com',
            city: 'Anand Nagar',
            locality: 'College Road',
            status: 'Active',
            featured: false,
            logo: '/images/business-school.jpg',
            createdDate: '25 Sep 2026'
        },

        {
            id: 4,
            businessName: 'Gupta General Store',
            slug: 'gupta-general-store',
            category: 'Grocery',
            contactPerson: 'Manoj Gupta',
            mobile: '9876543213',
            email: 'guptastore@example.com',
            city: 'Anand Nagar',
            locality: 'Gandhi Chowk',
            status: 'Active',
            featured: false,
            logo: '/images/business-store.jpg',
            createdDate: '20 Sep 2026'
        },

        {
            id: 5,
            businessName: 'Hotel Anand Palace',
            slug: 'hotel-anand-palace',
            category: 'Hotel',
            contactPerson: 'Vivek Sharma',
            mobile: '9876543214',
            email: 'info@anandpalace.com',
            city: 'Anand Nagar',
            locality: 'Railway Road',
            status: 'Active',
            featured: true,
            logo: '/images/business-hotel.jpg',
            createdDate: '18 Sep 2026'
        },

        {
            id: 6,
            businessName: 'Shree Hair Studio',
            slug: 'shree-hair-studio',
            category: 'Salon',
            contactPerson: 'Rohit',
            mobile: '9876543215',
            email: 'shreestudio@example.com',
            city: 'Anand Nagar',
            locality: 'Main Market',
            status: 'Inactive',
            featured: false,
            logo: '/images/business-salon.jpg',
            createdDate: '15 Sep 2026'
        },

        {
            id: 7,
            businessName: 'Anand Auto Works',
            slug: 'anand-auto-works',
            category: 'Automobile',
            contactPerson: 'Pankaj Yadav',
            mobile: '9876543216',
            email: 'anandauto@example.com',
            city: 'Anand Nagar',
            locality: 'Gorakhpur Road',
            status: 'Active',
            featured: false,
            logo: '/images/business-auto.jpg',
            createdDate: '12 Sep 2026'
        },

        {
            id: 8,
            businessName: 'Gupta Properties',
            slug: 'gupta-properties',
            category: 'Real Estate',
            contactPerson: 'Amit Gupta',
            mobile: '9876543217',
            email: 'info@gupproperties.com',
            city: 'Anand Nagar',
            locality: 'Station Road',
            status: 'Active',
            featured: false,
            logo: '/images/business-property.jpg',
            createdDate: '10 Sep 2026'
        }
    ];


    constructor(
        private router: Router
    ) { }


    // ============================================================
    // FILTERED BUSINESSES
    // ============================================================

    get filteredBusinesses(): BusinessItem[] {

        const search =
            this.searchText
                .trim()
                .toLowerCase();

        return this.businesses.filter(business => {

            const matchesSearch =
                !search ||
                business.businessName
                    .toLowerCase()
                    .includes(search) ||
                business.category
                    .toLowerCase()
                    .includes(search) ||
                business.contactPerson
                    .toLowerCase()
                    .includes(search) ||
                business.mobile
                    .includes(search) ||
                business.locality
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =
                !this.selectedCategory ||
                business.category === this.selectedCategory;

            const matchesStatus =
                !this.selectedStatus ||
                business.status === this.selectedStatus;

            const matchesFeatured =
                !this.selectedFeatured ||
                (
                    this.selectedFeatured === 'Featured' &&
                    business.featured
                ) ||
                (
                    this.selectedFeatured === 'Not Featured' &&
                    !business.featured
                );

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus &&
                matchesFeatured
            );
        });
    }


    // ============================================================
    // TOTAL PAGES
    // ============================================================

    get totalPages(): number {

        return Math.max(
            1,
            Math.ceil(
                this.filteredBusinesses.length /
                this.pageSize
            )
        );
    }


    // ============================================================
    // PAGINATED BUSINESSES
    // ============================================================

    get paginatedBusinesses(): BusinessItem[] {

        const start =
            (this.currentPage - 1) *
            this.pageSize;

        return this.filteredBusinesses.slice(
            start,
            start + this.pageSize
        );
    }


    // ============================================================
    // PAGE NUMBERS
    // ============================================================

    get pageNumbers(): number[] {

        return Array.from(
            { length: this.totalPages },
            (_, index) => index + 1
        );
    }


    // ============================================================
    // SEARCH
    // ============================================================

    onSearch(): void {

        this.currentPage = 1;
    }


    // ============================================================
    // FILTER CHANGE
    // ============================================================

    onFilterChange(): void {

        this.currentPage = 1;
    }


    // ============================================================
    // CLEAR FILTERS
    // ============================================================

    clearFilters(): void {

        this.searchText = '';
        this.selectedCategory = '';
        this.selectedStatus = '';
        this.selectedFeatured = '';

        this.currentPage = 1;
    }


    // ============================================================
    // PAGE CHANGE
    // ============================================================

    goToPage(page: number): void {

        if (
            page >= 1 &&
            page <= this.totalPages
        ) {
            this.currentPage = page;
        }
    }


    // ============================================================
    // ADD
    // ============================================================

    addBusiness(): void {

        this.router.navigate([
            '/admin/directory/add'
        ]);
    }


    // ============================================================
    // EDIT
    // ============================================================

    editBusiness(id: number): void {

        this.router.navigate([
            '/admin/directory/edit',
            id
        ]);
    }


    // ============================================================
    // DELETE
    // ============================================================

    deleteBusiness(id: number): void {

        const business =
            this.businesses.find(
                x => x.id === id
            );

        if (!business) {
            return;
        }

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${business.businessName}"?`
            );

        if (!confirmed) {
            return;
        }

        this.businesses =
            this.businesses.filter(
                x => x.id !== id
            );

        if (
            this.currentPage >
            this.totalPages
        ) {
            this.currentPage =
                this.totalPages;
        }
    }


    // ============================================================
    // FEATURED TOGGLE
    // ============================================================

    toggleFeatured(
        business: BusinessItem
    ): void {

        business.featured =
            !business.featured;
    }


    // ============================================================
    // STATUS CLASS
    // ============================================================

    getStatusClass(
        status: BusinessItem['status']
    ): string {

        return status === 'Active'
            ? 'status-active'
            : 'status-inactive';
    }


    // ============================================================
    // TRACK BY
    // ============================================================

    trackById(
        index: number,
        business: BusinessItem
    ): number {

        return business.id;
    }
}