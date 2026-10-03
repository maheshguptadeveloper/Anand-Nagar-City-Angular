import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface AlbumItem {
    id: number;
    title: string;
    slug: string;
    description: string;
    language: 'English' | 'Hindi';
    coverImage: string;
    photoCount: number;
    publishDate: string;
    author: string;
    status: 'Draft' | 'Published' | 'Archived';
    featured: boolean;
}

@Component({
    selector: 'app-albums',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './albums.html',
    styleUrl: './albums.css'
})
export class Albums {

    Math = Math;

    searchText = '';
    selectedLanguage = '';
    selectedStatus = '';

    currentPage = 1;
    pageSize = 5;

    languages = [
        'English',
        'Hindi'
    ];

    statuses = [
        'Draft',
        'Published',
        'Archived'
    ];

    albumsList: AlbumItem[] = [
        {
            id: 1,
            title: 'Anand Nagar City Life',
            slug: 'anand-nagar-city-life',
            description: 'A collection of photographs showing daily life and activities in Anand Nagar.',
            language: 'English',
            coverImage: '/Images/Anand Nagar Community Cleanup Drive.png',
            photoCount: 18,
            publishDate: '2026-09-15',
            author: 'Admin',
            status: 'Published',
            featured: true
        },
        {
            id: 2,
            title: 'आनंद नगर की झलकियां',
            slug: 'anand-nagar-ki-jhalkiyan',
            description: 'आनंद नगर के प्रमुख स्थानों और दैनिक जीवन की तस्वीरों का संग्रह।',
            language: 'Hindi',
            coverImage: '/Images/Anand Nagar Community Cleanup Drive.png',
            photoCount: 24,
            publishDate: '2026-09-10',
            author: 'Admin',
            status: 'Published',
            featured: true
        },
        {
            id: 3,
            title: 'Festivals & Celebrations',
            slug: 'festivals-celebrations',
            description: 'Photos from festivals, cultural programs and celebrations in Anand Nagar.',
            language: 'English',
            coverImage: '/Images/Anand Nagar Community Cleanup Drive.png',
            photoCount: 32,
            publishDate: '2026-09-05',
            author: 'Admin',
            status: 'Published',
            featured: false
        },
        {
            id: 4,
            title: 'Development Projects',
            slug: 'development-projects',
            description: 'Images showcasing infrastructure and development activities around the city.',
            language: 'English',
            coverImage: '/Images/Anand Nagar Community Cleanup Drive.png',
            photoCount: 15,
            publishDate: '2026-08-25',
            author: 'Admin',
            status: 'Draft',
            featured: false
        },
        {
            id: 5,
            title: 'शहर के प्रमुख स्थल',
            slug: 'shahar-ke-pramukh-sthal',
            description: 'आनंद नगर के प्रमुख स्थलों और आकर्षणों की तस्वीरें।',
            language: 'Hindi',
            coverImage: '/Images/Anand Nagar Community Cleanup Drive.png',
            photoCount: 20,
            publishDate: '2026-08-20',
            author: 'Admin',
            status: 'Published',
            featured: false
        },
        {
            id: 6,
            title: 'Old Anand Nagar',
            slug: 'old-anand-nagar',
            description: 'A collection of old photographs and memories of Anand Nagar.',
            language: 'English',
            coverImage: '/Images/Anand Nagar Community Cleanup Drive.png',
            photoCount: 12,
            publishDate: '2026-08-10',
            author: 'Admin',
            status: 'Archived',
            featured: false
        }
    ];

    constructor(
        private router: Router
    ) {}

    get filteredAlbums(): AlbumItem[] {

        const search = this.searchText
            .trim()
            .toLowerCase();

        return this.albumsList.filter(album => {

            const matchesSearch =
                !search ||
                album.title.toLowerCase().includes(search) ||
                album.slug.toLowerCase().includes(search) ||
                album.description.toLowerCase().includes(search);

            const matchesLanguage =
                !this.selectedLanguage ||
                album.language === this.selectedLanguage;

            const matchesStatus =
                !this.selectedStatus ||
                album.status === this.selectedStatus;

            return (
                matchesSearch &&
                matchesLanguage &&
                matchesStatus
            );
        });
    }

    get totalPages(): number {

        return Math.max(
            1,
            Math.ceil(
                this.filteredAlbums.length / this.pageSize
            )
        );
    }

    get paginatedAlbums(): AlbumItem[] {

        const startIndex =
            (this.currentPage - 1) * this.pageSize;

        return this.filteredAlbums.slice(
            startIndex,
            startIndex + this.pageSize
        );
    }

    get pageNumbers(): number[] {

        return Array.from(
            { length: this.totalPages },
            (_, index) => index + 1
        );
    }

    onSearch(): void {

        this.currentPage = 1;
    }

    onFilterChange(): void {

        this.currentPage = 1;
    }

    clearFilters(): void {

        this.searchText = '';
        this.selectedLanguage = '';
        this.selectedStatus = '';
        this.currentPage = 1;
    }

    goToPage(page: number): void {

        if (
            page >= 1 &&
            page <= this.totalPages
        ) {
            this.currentPage = page;
        }
    }

    editAlbum(id: number): void {

        this.router.navigate([
            '/admin/albums/edit',
            id
        ]);
    }

    deleteAlbum(id: number): void {

        const album = this.albumsList.find(
            item => item.id === id
        );

        if (!album) {
            return;
        }

        const confirmed = confirm(
            `Are you sure you want to delete "${album.title}"?`
        );

        if (!confirmed) {
            return;
        }

        this.albumsList =
            this.albumsList.filter(
                item => item.id !== id
            );

        if (
            this.currentPage > this.totalPages
        ) {
            this.currentPage = this.totalPages;
        }
    }

    toggleFeatured(album: AlbumItem): void {

        album.featured = !album.featured;
    }

    getStatusClass(
        status: AlbumItem['status']
    ): string {

        switch (status) {

            case 'Published':
                return 'published';

            case 'Draft':
                return 'draft';

            case 'Archived':
                return 'archived';

            default:
                return '';
        }
    }
}