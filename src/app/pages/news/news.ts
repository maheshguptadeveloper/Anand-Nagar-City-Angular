import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface NewsItem {
    id: number;
    title: string;
    summary: string;
    category: string;
    language: 'English' | 'Hindi';
    image: string;
    publishDate: string;
    author: string;
    status: 'Draft' | 'Published' | 'Archived';
    featured: boolean;
}

@Component({
    selector: 'app-news',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './news.html',
    styleUrl: './news.css'
})
export class News {

    // Used by the template for pagination calculation
    Math = Math;

    searchText: string = '';
    selectedCategory: string = '';
    selectedLanguage: string = '';
    selectedStatus: string = '';

    currentPage: number = 1;
    pageSize: number = 5;

    categories: string[] = [
        'Local News',
        'Development',
        'Community',
        'Events',
        'Transport',
        'Education',
        'Health',
        'Business',
        'Government',
        'Other'
    ];

    languages: string[] = [
        'English',
        'Hindi'
    ];

    statuses: string[] = [
        'Draft',
        'Published',
        'Archived'
    ];

    newsList: NewsItem[] = [
        {
            id: 1,
            title: 'Anand Nagar Development Update',
            summary: 'Latest development activities and important updates from Anand Nagar.',
            category: 'Development',
            language: 'English',
            image: '/Images/Golden River Valley Sunset.png',
            publishDate: '2026-10-01',
            author: 'Admin',
            status: 'Published',
            featured: true
        },
        {
            id: 2,
            title: 'आनंद नगर में स्वच्छता अभियान',
            summary: 'शहर में स्वच्छता और जागरूकता को बढ़ावा देने के लिए विशेष अभियान आयोजित किया गया।',
            category: 'Community',
            language: 'Hindi',
            image: '/Images/Golden River Valley Sunset.png',
            publishDate: '2026-09-28',
            author: 'Admin',
            status: 'Published',
            featured: false
        },
        {
            id: 3,
            title: 'New Railway Service Update',
            summary: 'Important information about railway services and connectivity from Anand Nagar.',
            category: 'Transport',
            language: 'English',
            image: '/Images/Golden River Valley Sunset.png',
            publishDate: '2026-09-25',
            author: 'Admin',
            status: 'Published',
            featured: true
        },
        {
            id: 4,
            title: 'Community Health Initiative',
            summary: 'A community health initiative is being organized for local residents.',
            category: 'Health',
            language: 'English',
            image: '/Images/Golden River Valley Sunset.png',
            publishDate: '2026-09-22',
            author: 'Admin',
            status: 'Draft',
            featured: false
        },
        {
            id: 5,
            title: 'स्थानीय सांस्कृतिक कार्यक्रम',
            summary: 'आनंद नगर में स्थानीय संस्कृति और प्रतिभाओं को बढ़ावा देने के लिए कार्यक्रम।',
            category: 'Events',
            language: 'Hindi',
            image: '/Images/Golden River Valley Sunset.png',
            publishDate: '2026-09-20',
            author: 'Admin',
            status: 'Published',
            featured: false
        },
        {
            id: 6,
            title: 'Education Awareness Program',
            summary: 'An education awareness program for students and parents in the local community.',
            category: 'Education',
            language: 'English',
            image: '/Images/Golden River Valley Sunset.png',
            publishDate: '2026-09-18',
            author: 'Admin',
            status: 'Archived',
            featured: false
        }
    ];

    constructor(
        private router: Router
    ) {
    }


    // ============================================
    // FILTERED NEWS
    // ============================================

    get filteredNews(): NewsItem[] {

        const search =
            this.searchText.trim().toLowerCase();

        return this.newsList.filter(news => {

            const searchMatch =
                !search ||
                news.title.toLowerCase().includes(search) ||
                news.summary.toLowerCase().includes(search);

            const categoryMatch =
                !this.selectedCategory ||
                news.category === this.selectedCategory;

            const languageMatch =
                !this.selectedLanguage ||
                news.language === this.selectedLanguage;

            const statusMatch =
                !this.selectedStatus ||
                news.status === this.selectedStatus;

            return (
                searchMatch &&
                categoryMatch &&
                languageMatch &&
                statusMatch
            );
        });
    }


    // ============================================
    // TOTAL PAGES
    // ============================================

    get totalPages(): number {

        return Math.max(
            1,
            Math.ceil(
                this.filteredNews.length /
                this.pageSize
            )
        );
    }


    // ============================================
    // PAGINATED NEWS
    // ============================================

    get paginatedNews(): NewsItem[] {

        const startIndex =
            (this.currentPage - 1) *
            this.pageSize;

        return this.filteredNews.slice(
            startIndex,
            startIndex + this.pageSize
        );
    }


    // ============================================
    // SEARCH
    // ============================================

    onSearch(): void {

        this.currentPage = 1;
    }


    // ============================================
    // FILTER CHANGE
    // ============================================

    onFilterChange(): void {

        this.currentPage = 1;
    }


    // ============================================
    // CLEAR FILTERS
    // ============================================

    clearFilters(): void {

        this.searchText = '';
        this.selectedCategory = '';
        this.selectedLanguage = '';
        this.selectedStatus = '';

        this.currentPage = 1;
    }


    // ============================================
    // PAGE CHANGE
    // ============================================

    goToPage(page: number): void {

        if (
            page >= 1 &&
            page <= this.totalPages
        ) {
            this.currentPage = page;
        }
    }


    // ============================================
    // EDIT
    // ============================================

    editNews(id: number): void {

        this.router.navigate([
            '/admin/news/edit',
            id
        ]);
    }


    // ============================================
    // DELETE
    // ============================================

    deleteNews(id: number): void {

        const news =
            this.newsList.find(
                item => item.id === id
            );

        if (!news) {
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete "${news.title}"?`
        );

        if (!confirmed) {
            return;
        }

        this.newsList =
            this.newsList.filter(
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


    // ============================================
    // FEATURED
    // ============================================

    toggleFeatured(news: NewsItem): void {

        news.featured =
            !news.featured;
    }


    // ============================================
    // STATUS CSS
    // ============================================

    getStatusClass(
        status: NewsItem['status']
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