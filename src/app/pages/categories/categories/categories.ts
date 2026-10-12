import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface CategoryItem {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    businessCount: number;
    status: 'Active' | 'Inactive';
    featured: boolean;
    createdDate: string;
}

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './categories.html',
    styleUrl: './categories.css'
})
export class Categories {

    searchText = '';
    selectedStatus = '';
    selectedFeatured = '';

    currentPage = 1;
    pageSize = 8;

    statuses = [
        'Active',
        'Inactive'
    ];

    featuredOptions = [
        'Featured',
        'Not Featured'
    ];

    categories: CategoryItem[] = [

        {
            id: 1,
            name: 'Restaurants',
            slug: 'restaurants',
            description: 'Restaurants and food businesses in Anand Nagar.',
            icon: 'bi bi-cup-hot',
            businessCount: 24,
            status: 'Active',
            featured: true,
            createdDate: '01 Oct 2026'
        },

        {
            id: 2,
            name: 'Hotels',
            slug: 'hotels',
            description: 'Hotels, lodges and accommodation services.',
            icon: 'bi bi-building',
            businessCount: 12,
            status: 'Active',
            featured: true,
            createdDate: '29 Sep 2026'
        },

        {
            id: 3,
            name: 'Hospitals',
            slug: 'hospitals',
            description: 'Hospitals, clinics and healthcare services.',
            icon: 'bi bi-hospital',
            businessCount: 9,
            status: 'Active',
            featured: true,
            createdDate: '27 Sep 2026'
        },

        {
            id: 4,
            name: 'Education',
            slug: 'education',
            description: 'Schools, colleges, coaching and education services.',
            icon: 'bi bi-mortarboard',
            businessCount: 18,
            status: 'Active',
            featured: false,
            createdDate: '25 Sep 2026'
        },

        {
            id: 5,
            name: 'Shopping',
            slug: 'shopping',
            description: 'Shopping stores and retail businesses.',
            icon: 'bi bi-bag',
            businessCount: 32,
            status: 'Active',
            featured: false,
            createdDate: '22 Sep 2026'
        },

        {
            id: 6,
            name: 'Grocery',
            slug: 'grocery',
            description: 'Grocery stores and daily-use products.',
            icon: 'bi bi-cart3',
            businessCount: 27,
            status: 'Active',
            featured: false,
            createdDate: '20 Sep 2026'
        },

        {
            id: 7,
            name: 'Banks',
            slug: 'banks',
            description: 'Banks and financial services.',
            icon: 'bi bi-bank',
            businessCount: 8,
            status: 'Active',
            featured: false,
            createdDate: '18 Sep 2026'
        },

        {
            id: 8,
            name: 'Salons',
            slug: 'salons',
            description: 'Beauty salons, hair salons and grooming services.',
            icon: 'bi bi-scissors',
            businessCount: 15,
            status: 'Inactive',
            featured: false,
            createdDate: '15 Sep 2026'
        },

        {
            id: 9,
            name: 'Automobile',
            slug: 'automobile',
            description: 'Automobile dealers, garages and service centers.',
            icon: 'bi bi-car-front',
            businessCount: 11,
            status: 'Active',
            featured: false,
            createdDate: '12 Sep 2026'
        },

        {
            id: 10,
            name: 'Real Estate',
            slug: 'real-estate',
            description: 'Property dealers and real estate services.',
            icon: 'bi bi-house',
            businessCount: 7,
            status: 'Active',
            featured: false,
            createdDate: '10 Sep 2026'
        }
    ];


    constructor(
        private router: Router
    ) { }


    // ============================================================
    // FILTERED CATEGORIES
    // ============================================================

    get filteredCategories(): CategoryItem[] {

        const search =
            this.searchText
                .trim()
                .toLowerCase();

        return this.categories.filter(category => {

            const matchesSearch =
                !search ||
                category.name
                    .toLowerCase()
                    .includes(search) ||
                category.slug
                    .toLowerCase()
                    .includes(search) ||
                category.description
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                !this.selectedStatus ||
                category.status === this.selectedStatus;

            const matchesFeatured =
                !this.selectedFeatured ||
                (
                    this.selectedFeatured === 'Featured' &&
                    category.featured
                ) ||
                (
                    this.selectedFeatured === 'Not Featured' &&
                    !category.featured
                );

            return (
                matchesSearch &&
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
                this.filteredCategories.length /
                this.pageSize
            )
        );
    }


    // ============================================================
    // PAGINATED CATEGORIES
    // ============================================================

    get paginatedCategories(): CategoryItem[] {

        const start =
            (this.currentPage - 1) *
            this.pageSize;

        return this.filteredCategories.slice(
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

    addCategory(): void {

        this.router.navigate([
            '/admin/categories/add'
        ]);
    }


    // ============================================================
    // EDIT
    // ============================================================

    editCategory(id: number): void {

        this.router.navigate([
            '/admin/categories/edit',
            id
        ]);
    }


    // ============================================================
    // DELETE
    // ============================================================

    deleteCategory(id: number): void {

        const category =
            this.categories.find(
                x => x.id === id
            );

        if (!category) {
            return;
        }

        if (
            category.businessCount > 0
        ) {

            window.alert(
                `This category contains ${category.businessCount} businesses. Please move or remove those businesses before deleting the category.`
            );

            return;
        }

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${category.name}"?`
            );

        if (!confirmed) {
            return;
        }

        this.categories =
            this.categories.filter(
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
        category: CategoryItem
    ): void {

        category.featured =
            !category.featured;
    }


    // ============================================================
    // STATUS CLASS
    // ============================================================

    getStatusClass(
        status: CategoryItem['status']
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
        category: CategoryItem
    ): number {

        return category.id;
    }
}