import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    ActivatedRoute,
    Router,
    RouterLink
} from '@angular/router';

interface AlbumFormModel {
    id: number;
    title: string;
    slug: string;
    description: string;
    language: 'English' | 'Hindi';
    content: string;
    author: string;
    publishDate: string;
    status: 'Draft' | 'Published' | 'Archived';
    featured: boolean;
    coverImage: string;
}

@Component({
    selector: 'app-album-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './album-form.html',
    styleUrl: './album-form.css'
})
export class AlbumForm {

    isEditMode = false;
    albumId: number | null = null;

    album: AlbumFormModel = {
        id: 0,
        title: '',
        slug: '',
        description: '',
        language: 'English',
        content: '',
        author: 'Admin',
        publishDate: '',
        status: 'Draft',
        featured: false,
        coverImage: ''
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {

        const id =
            this.route.snapshot.paramMap.get('id');

        if (id) {

            this.isEditMode = true;
            this.albumId = Number(id);

            this.loadAlbum(this.albumId);
        }
    }


    loadAlbum(id: number): void {

        const albums: Record<number, AlbumFormModel> = {

            1: {
                id: 1,
                title: 'Anand Nagar City Life',
                slug: 'anand-nagar-city-life',
                description:
                    'A collection of photographs showing daily life and activities in Anand Nagar.',
                language: 'English',
                content:
                    'Explore photographs showing the daily life, streets, markets and community activities of Anand Nagar.',
                author: 'Admin',
                publishDate: '2026-09-15',
                status: 'Published',
                featured: true,
                coverImage: '/images/album-city-life.jpg'
            },

            2: {
                id: 2,
                title: 'आनंद नगर की झलकियां',
                slug: 'anand-nagar-ki-jhalkiyan',
                description:
                    'आनंद नगर के प्रमुख स्थानों और दैनिक जीवन की तस्वीरों का संग्रह।',
                language: 'Hindi',
                content:
                    'आनंद नगर के प्रमुख स्थानों और शहर के दैनिक जीवन की तस्वीरों का संग्रह।',
                author: 'Admin',
                publishDate: '2026-09-10',
                status: 'Published',
                featured: true,
                coverImage: '/images/album-anand-nagar.jpg'
            },

            3: {
                id: 3,
                title: 'Festivals & Celebrations',
                slug: 'festivals-celebrations',
                description:
                    'Photos from festivals, cultural programs and celebrations in Anand Nagar.',
                language: 'English',
                content:
                    'A collection of photographs from festivals, cultural programs and community celebrations.',
                author: 'Admin',
                publishDate: '2026-09-05',
                status: 'Published',
                featured: false,
                coverImage: '/images/album-festivals.jpg'
            }
        };

        const selectedAlbum = albums[id];

        if (selectedAlbum) {

            this.album = {
                ...selectedAlbum
            };

        } else {

            this.router.navigate([
                '/admin/albums'
            ]);
        }
    }


    generateSlug(): void {

        if (!this.album.title.trim()) {
            return;
        }

        this.album.slug =
            this.album.title
                .toLowerCase()
                .trim()
                .replace(
                    /[^a-z0-9\s-]/g,
                    ''
                )
                .replace(
                    /\s+/g,
                    '-'
                )
                .replace(
                    /-+/g,
                    '-'
                );
    }


    onCoverImageSelected(
        event: Event
    ): void {

        const input =
            event.target as HTMLInputElement;

        if (
            !input.files ||
            input.files.length === 0
        ) {
            return;
        }

        const file = input.files[0];

        if (!file.type.startsWith('image/')) {

            alert(
                'Please select a valid image file.'
            );

            return;
        }

        const maxSize =
            5 * 1024 * 1024;

        if (file.size > maxSize) {

            alert(
                'Image size should not exceed 5 MB.'
            );

            return;
        }

        const reader =
            new FileReader();

        reader.onload = () => {

            this.album.coverImage =
                reader.result as string;
        };

        reader.readAsDataURL(file);
    }


    removeCoverImage(): void {

        this.album.coverImage = '';
    }


    saveAlbum(): void {

        if (!this.album.title.trim()) {

            alert(
                'Album title is required.'
            );

            return;
        }

        if (!this.album.slug.trim()) {

            alert(
                'Album slug is required.'
            );

            return;
        }

        if (!this.album.description.trim()) {

            alert(
                'Album description is required.'
            );

            return;
        }

        if (!this.album.publishDate) {

            alert(
                'Publish date is required.'
            );

            return;
        }

        if (!this.album.coverImage) {

            alert(
                'Please select a cover image.'
            );

            return;
        }


        if (this.isEditMode) {

            /*
             * Later API:
             *
             * PUT /api/albums/{id}
             *
             * Body:
             * this.album
             */

            alert(
                'Album updated successfully.'
            );

        } else {

            /*
             * Later API:
             *
             * POST /api/albums
             *
             * Body:
             * this.album
             */

            alert(
                'Album added successfully.'
            );
        }

        this.router.navigate([
            '/admin/albums'
        ]);
    }


    cancel(): void {

        this.router.navigate([
            '/admin/albums'
        ]);
    }
}