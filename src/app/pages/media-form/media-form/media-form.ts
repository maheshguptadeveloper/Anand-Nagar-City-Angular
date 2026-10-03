import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface MediaFormModel {
    id: number;
    fileName: string;
    fileType: string;
    fileUrl: string;
    altText: string;
    category: string;
    fileSize: string;
    status: string;
}

@Component({
    selector: 'app-media-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './media-form.html',
    styleUrl: './media-form.css'
})
export class MediaForm {

    isEditMode = false;
    mediaId: number | null = null;

    selectedFile: File | null = null;
    previewUrl = '';

    categories = [
        'City',
        'Events',
        'Places',
        'News',
        'Gallery'
    ];

    fileTypes = [
        'Image',
        'Video',
        'Document'
    ];

    statuses = [
        'Active',
        'Archived'
    ];

    media: MediaFormModel = {

        id: 0,
        fileName: '',
        fileType: 'Image',
        fileUrl: '',
        altText: '',
        category: '',
        fileSize: '',
        status: 'Active'

    };


    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {

        this.route.paramMap.subscribe(params => {

            const id = params.get('id');

            if (id) {

                this.isEditMode = true;
                this.mediaId = Number(id);

                this.loadMedia(this.mediaId);

            }

        });

    }


    // ============================================================
    // LOAD MEDIA
    // ============================================================

    loadMedia(id: number): void {

        // Temporary frontend data.
        // API will replace this later.

        const sampleMedia: MediaFormModel[] = [

            {
                id: 1,
                fileName: 'anand-nagar-city.jpg',
                fileType: 'Image',
                fileUrl: '/images/anand-nagar-city.jpg',
                altText: 'Anand Nagar City',
                category: 'City',
                fileSize: '1.2 MB',
                status: 'Active'
            },

            {
                id: 2,
                fileName: 'railway-station.jpg',
                fileType: 'Image',
                fileUrl: '/images/railway-station.jpg',
                altText: 'Anand Nagar Railway Station',
                category: 'Places',
                fileSize: '850 KB',
                status: 'Active'
            }

        ];

        const existingMedia =
            sampleMedia.find(
                x => x.id === id
            );

        if (existingMedia) {

            this.media = {
                ...existingMedia
            };

            this.previewUrl =
                existingMedia.fileUrl;
        }
    }


    // ============================================================
    // FILE SELECT
    // ============================================================

    onFileSelected(event: Event): void {

        const input =
            event.target as HTMLInputElement;

        if (
            !input.files ||
            input.files.length === 0
        ) {
            return;
        }

        const file = input.files[0];

        this.selectedFile = file;

        this.media.fileName =
            file.name;

        this.media.fileSize =
            this.formatFileSize(file.size);

        this.media.fileType =
            this.getFileType(file);


        if (
            file.type.startsWith('image/')
        ) {

            const reader =
                new FileReader();

            reader.onload = () => {

                this.previewUrl =
                    reader.result as string;

            };

            reader.readAsDataURL(file);
        }

    }


    // ============================================================
    // FILE TYPE
    // ============================================================

    getFileType(file: File): string {

        if (file.type.startsWith('image/')) {
            return 'Image';
        }

        if (file.type.startsWith('video/')) {
            return 'Video';
        }

        return 'Document';
    }


    // ============================================================
    // FILE SIZE
    // ============================================================

    formatFileSize(bytes: number): string {

        if (bytes === 0) {
            return '0 Bytes';
        }

        const units = [
            'Bytes',
            'KB',
            'MB',
            'GB'
        ];

        const index =
            Math.floor(
                Math.log(bytes) /
                Math.log(1024)
            );

        return (
            parseFloat(
                (
                    bytes /
                    Math.pow(1024, index)
                ).toFixed(2)
            ) +
            ' ' +
            units[index]
        );
    }


    // ============================================================
    // SAVE
    // ============================================================

    saveMedia(): void {

        if (!this.media.fileName.trim()) {

            window.alert(
                'Please select a media file.'
            );

            return;
        }

        if (!this.media.altText.trim()) {

            window.alert(
                'Please enter alternative text.'
            );

            return;
        }

        if (!this.media.category) {

            window.alert(
                'Please select a category.'
            );

            return;
        }

        if (this.isEditMode) {

            console.log(
                'Updating media:',
                this.media
            );

        } else {

            console.log(
                'Creating media:',
                this.media
            );
        }

        window.alert(
            this.isEditMode
                ? 'Media updated successfully.'
                : 'Media uploaded successfully.'
        );

        this.router.navigate([
            '/admin/media'
        ]);
    }


    // ============================================================
    // CANCEL
    // ============================================================

    cancel(): void {

        this.router.navigate([
            '/admin/media'
        ]);
    }
}