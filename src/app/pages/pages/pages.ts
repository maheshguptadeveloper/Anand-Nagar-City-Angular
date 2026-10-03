import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface PageItem {
    id: number;
    title: string;
    slug: string;
    summary: string;
    language: 'English' | 'Hindi';
    coverImage: string;
    publishDate: string;
    author: string;
    status: 'Draft' | 'Published' | 'Archived';
    featured: boolean;
}

@Component({
    selector: 'app-pages',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './pages.html',
    styleUrl: './pages.css'
})
export class Pages {

    Math = Math;

    searchText: string = '';
    selectedLanguage: string = '';
    selectedStatus: string = '';

    currentPage: number = 1;
    pageSize: number = 5;

    languages: string[] = [
        'English',
        'Hindi'
    ];

    statuses: string[] = [
        'Draft',
        'Published',
        'Archived'
    ];


    // =====================================================
    // TEMPORARY PAGE DATA
    // =====================================================

    pagesList: PageItem[] = [

        {
            id: 1,

            title: 'About Anand Nagar',

            slug: 'about-anand-nagar',

            summary:
                'Learn about Anand Nagar, its history, people, culture and development.',

            language: 'English',

            coverImage:
                '/Images/Golden River Valley Sunset.png',

            publishDate:
                '2026-10-01',

            author:
                'Admin',

            status:
                'Published',

            featured:
                true
        },

        {
            id: 2,

            title: 'आनंद नगर के बारे में',

            slug: 'anand-nagar-ke-bare-mein',

            summary:
                'आनंद नगर के इतिहास, संस्कृति, लोगों और विकास के बारे में जानें।',

            language: 'Hindi',

            coverImage:
                '/Images/Golden River Valley Sunset.png',

            publishDate:
                '2026-09-28',

            author:
                'Admin',

            status:
                'Published',

            featured:
                false
        },

        {
            id: 3,

            title: 'Explore Anand Nagar',

            slug: 'explore-anand-nagar',

            summary:
                'Discover temples, attractions, important places and local experiences.',

            language: 'English',

            coverImage:
                '/Images/Golden River Valley Sunset.png',

            publishDate:
                '2026-09-25',

            author:
                'Admin',

            status:
                'Published',

            featured:
                true
        },

        {
            id: 4,

            title: 'City Information',

            slug: 'city-information',

            summary:
                'Important information and useful resources for Anand Nagar residents.',

            language: 'English',

            coverImage:
                '/Images/Golden River Valley Sunset.png',

            publishDate:
                '2026-09-22',

            author:
                'Admin',

            status:
                'Draft',

            featured:
                false
        },

        {
            id: 5,

            title: 'संपर्क करें',

            slug: 'sampark-karein',

            summary:
                'आनंद नगर शहर पोर्टल से संपर्क करने के लिए आवश्यक जानकारी।',

            language: 'Hindi',

            coverImage:
                '/Images/Golden River Valley Sunset.png',

            publishDate:
                '2026-09-20',

            author:
                'Admin',

            status:
                'Published',

            featured:
                false
        },

        {
            id: 6,

            title: 'Transport Information',

            slug: 'transport-information',

            summary:
                'Railway, road and other transportation information for Anand Nagar.',

            language: 'English',

            coverImage:
                '/Images/Golden River Valley Sunset.png',

            publishDate:
                '2026-09-18',

            author:
                'Admin',

            status:
                'Archived',

            featured:
                false
        }
    ];


    constructor(
        private router: Router
    ) {
    }


    // =====================================================
    // FILTERED PAGES
    // =====================================================

    get filteredPages(): PageItem[] {

        const search =
            this.searchText
                .trim()
                .toLowerCase();

        return this.pagesList.filter(page => {

            const searchMatch =
                !search ||
                page.title
                    .toLowerCase()
                    .includes(search) ||
                page.slug
                    .toLowerCase()
                    .includes(search) ||
                page.summary
                    .toLowerCase()
                    .includes(search);

            const languageMatch =
                !this.selectedLanguage ||
                page.language ===
                this.selectedLanguage;

            const statusMatch =
                !this.selectedStatus ||
                page.status ===
                this.selectedStatus;

            return (
                searchMatch &&
                languageMatch &&
                statusMatch
            );
        });
    }


    // =====================================================
    // TOTAL PAGES
    // =====================================================

    get totalPages(): number {

        return Math.max(
            1,
            Math.ceil(
                this.filteredPages.length /
                this.pageSize
            )
        );
    }


    // =====================================================
    // PAGINATED PAGES
    // =====================================================

    get paginatedPages(): PageItem[] {

        const startIndex =
            (this.currentPage - 1) *
            this.pageSize;

        return this.filteredPages.slice(
            startIndex,
            startIndex + this.pageSize
        );
    }


    // =====================================================
    // SEARCH
    // =====================================================

    onSearch(): void {

        this.currentPage = 1;
    }


    // =====================================================
    // FILTER
    // =====================================================

    onFilterChange(): void {

        this.currentPage = 1;
    }


    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    clearFilters(): void {

        this.searchText = '';

        this.selectedLanguage = '';

        this.selectedStatus = '';

        this.currentPage = 1;
    }


    // =====================================================
    // PAGE NAVIGATION
    // =====================================================

    goToPage(page: number): void {

        if (
            page >= 1 &&
            page <= this.totalPages
        ) {
            this.currentPage = page;
        }
    }


    // =====================================================
    // EDIT
    // =====================================================

    editPage(id: number): void {

        this.router.navigate([
            '/admin/pages/edit',
            id
        ]);
    }


    // =====================================================
    // DELETE
    // =====================================================

    deletePage(id: number): void {

        const page =
            this.pagesList.find(
                item => item.id === id
            );

        if (!page) {
            return;
        }

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${page.title}"?`
            );

        if (!confirmed) {
            return;
        }

        this.pagesList =
            this.pagesList.filter(
                item => item.id !== id
            );

        if (
            this.currentPage >
            this.totalPages
        ) {
            this.currentPage =
                this.totalPages;
        }
    }


    // =====================================================
    // FEATURED
    // =====================================================

    toggleFeatured(
        page: PageItem
    ): void {

        page.featured =
            !page.featured;
    }


    // =====================================================
    // STATUS CLASS
    // =====================================================

    getStatusClass(
        status: PageItem['status']
    ): string {

        switch (status) {

            case 'Published':
                return 'status-published';

            case 'Draft':
                return 'status-draft';

            case 'Archived':
                return 'status-archived';

            default:
                return '';
        }
    }
}