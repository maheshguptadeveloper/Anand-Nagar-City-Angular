import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface MediaItem {
    id: number;
    fileName: string;
    fileType: 'Image' | 'Video' | 'Document';
    fileUrl: string;
    thumbnail: string;
    fileSize: string;
    altText: string;
    category: string;
    uploadedBy: string;
    uploadDate: string;
    status: 'Active' | 'Archived';
}

@Component({
    selector: 'app-media',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './media.html',
    styleUrl: './media.css'
})
export class Media {

    searchText = '';
    selectedType = '';
    selectedCategory = '';
    selectedStatus = '';

    currentPage = 1;
    pageSize = 8;

    viewMode: 'grid' | 'list' = 'grid';

    fileTypes = [
        'Image',
        'Video',
        'Document'
    ];

    categories = [
        'City',
        'Events',
        'Places',
        'News',
        'Gallery'
    ];

    statuses = [
        'Active',
        'Archived'
    ];

    mediaList: MediaItem[] = [

        {
            id: 1,
            fileName: 'anand-nagar-city.jpg',
            fileType: 'Image',
            fileUrl: '/Images\/anand-nagar-city.jpg',
            thumbnail: '/Images\/anand-nagar-city.jpg',
            fileSize: '1.2 MB',
            altText: 'Anand Nagar City',
            category: 'City',
            uploadedBy: 'Admin',
            uploadDate: '01 Oct 2026',
            status: 'Active'
        },

        {
            id: 2,
            fileName: 'railway-station.jpg',
            fileType: 'Image',
            fileUrl: '/Images\\/railway-station.jpg',
            thumbnail: '/Images\\/railway-station.jpg',
            fileSize: '850 KB',
            altText: 'Anand Nagar Railway Station',
            category: 'Places',
            uploadedBy: 'Admin',
            uploadDate: '28 Sep 2026',
            status: 'Active'
        },

        {
            id: 3,
            fileName: 'lehara-devi-temple.jpg',
            fileType: 'Image',
            fileUrl: '/Images/Farrenda Police Station Entrance Scene.png',
            thumbnail: '/Images/Farrenda Police Station Entrance Scene.png',
            fileSize: '2.1 MB',
            altText: 'Lehra Devi Temple',
            category: 'Places',
            uploadedBy: 'Admin',
            uploadDate: '25 Sep 2026',
            status: 'Active'
        },

        {
            id: 4,
            fileName: 'ganeshotsav.jpg',
            fileType: 'Image',
            fileUrl: '/Images/Farrenda Police Station Entrance Scene.png',
            thumbnail: '/Images/Farrenda Police Station Entrance Scene.png',
            fileSize: '1.4 MB',
            altText: 'Ganeshotsav Celebration',
            category: 'Events',
            uploadedBy: 'Admin',
            uploadDate: '20 Sep 2026',
            status: 'Active'
        },

        {
            id: 5,
            fileName: 'city-news.jpg',
            fileType: 'Image',
            fileUrl: '/Images/Farrenda Police Station Entrance Scene.png',
            thumbnail: '/Images/Farrenda Police Station Entrance Scene.png',
            fileSize: '920 KB',
            altText: 'Anand Nagar News',
            category: 'News',
            uploadedBy: 'Admin',
            uploadDate: '18 Sep 2026',
            status: 'Active'
        },

        {
            id: 6,
            fileName: 'market.jpg',
            fileType: 'Image',
            fileUrl: '/Images/Farrenda Police Station Entrance Scene.png',
            thumbnail: '/Images/Farrenda Police Station Entrance Scene.png',
            fileSize: '1.8 MB',
            altText: 'Anand Nagar Local Market',
            category: 'Gallery',
            uploadedBy: 'Admin',
            uploadDate: '15 Sep 2026',
            status: 'Active'
        },

        {
            id: 7,
            fileName: 'city-guide.pdf',
            fileType: 'Document',
            fileUrl: '#',
            thumbnail: '',
            fileSize: '3.5 MB',
            altText: 'Anand Nagar City Guide',
            category: 'City',
            uploadedBy: 'Admin',
            uploadDate: '10 Sep 2026',
            status: 'Active'
        },

        {
            id: 8,
            fileName: 'city-video.mp4',
            fileType: 'Video',
            fileUrl: '#',
            thumbnail: '',
            fileSize: '12.4 MB',
            altText: 'Anand Nagar City Video',
            category: 'City',
            uploadedBy: 'Admin',
            uploadDate: '05 Sep 2026',
            status: 'Archived'
        }
    ];

    constructor(private router: Router) { }


    // ============================================================
    // FILTERED MEDIA
    // ============================================================

    get filteredMedia(): MediaItem[] {

        const search = this.searchText
            .trim()
            .toLowerCase();

        return this.mediaList.filter(media => {

            const matchesSearch =
                !search ||
                media.fileName.toLowerCase().includes(search) ||
                media.altText.toLowerCase().includes(search) ||
                media.category.toLowerCase().includes(search);

            const matchesType =
                !this.selectedType ||
                media.fileType === this.selectedType;

            const matchesCategory =
                !this.selectedCategory ||
                media.category === this.selectedCategory;

            const matchesStatus =
                !this.selectedStatus ||
                media.status === this.selectedStatus;

            return (
                matchesSearch &&
                matchesType &&
                matchesCategory &&
                matchesStatus
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
                this.filteredMedia.length / this.pageSize
            )
        );
    }


    // ============================================================
    // PAGINATED MEDIA
    // ============================================================

    get paginatedMedia(): MediaItem[] {

        const start =
            (this.currentPage - 1) * this.pageSize;

        return this.filteredMedia.slice(
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
        this.selectedType = '';
        this.selectedCategory = '';
        this.selectedStatus = '';

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
    // EDIT
    // ============================================================

    editMedia(id: number): void {

        this.router.navigate([
            '/admin/media/edit',
            id
        ]);
    }


    // ============================================================
    // DELETE
    // ============================================================

    deleteMedia(id: number): void {

        const media =
            this.mediaList.find(x => x.id === id);

        if (!media) {
            return;
        }

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${media.fileName}"?`
            );

        if (!confirmed) {
            return;
        }

        this.mediaList =
            this.mediaList.filter(
                x => x.id !== id
            );

        if (
            this.currentPage > this.totalPages
        ) {
            this.currentPage =
                this.totalPages;
        }
    }


    // ============================================================
    // COPY URL
    // ============================================================

    copyUrl(media: MediaItem): void {

        navigator.clipboard
            .writeText(media.fileUrl)
            .then(() => {

                window.alert(
                    'Media URL copied successfully.'
                );

            })
            .catch(() => {

                window.alert(
                    'Unable to copy media URL.'
                );

            });
    }


    // ============================================================
    // STATUS CLASS
    // ============================================================

    getStatusClass(
        status: MediaItem['status']
    ): string {

        switch (status) {

            case 'Active':
                return 'status-active';

            case 'Archived':
                return 'status-archived';

            default:
                return '';
        }
    }


    // ============================================================
    // FILE TYPE CLASS
    // ============================================================

    getFileTypeClass(
        type: MediaItem['fileType']
    ): string {

        switch (type) {

            case 'Image':
                return 'file-image';

            case 'Video':
                return 'file-video';

            case 'Document':
                return 'file-document';

            default:
                return '';
        }
    }


    // ============================================================
    // TRACK BY
    // ============================================================

    trackById(
        index: number,
        media: MediaItem
    ): number {

        return media.id;
    }
}