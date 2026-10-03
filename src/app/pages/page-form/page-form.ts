import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    ActivatedRoute,
    Router,
    RouterLink
} from '@angular/router';

@Component({
    selector: 'app-page-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './page-form.html',
    styleUrl: './page-form.css'
})
export class PageForm {

    isEditMode: boolean = false;

    pageId: number | null = null;

    pageTitle: string = 'Add Page';

    pageDescription: string =
        'Create and manage a static city portal page.';


    // =====================================================
    // FORM FIELDS
    // =====================================================

    title: string = '';

    slug: string = '';

    summary: string = '';

    content: string = '';

    language: string = 'English';

    author: string = 'Admin';

    publishDate: string = '';

    status: string = 'Draft';

    featured: boolean = false;


    // =====================================================
    // COVER IMAGE
    // =====================================================

    coverImage: string = '';

    imageFile: File | null = null;


    // =====================================================
    // DROPDOWNS
    // =====================================================

    languages: string[] = [
        'English',
        'Hindi'
    ];

    statuses: string[] = [
        'Draft',
        'Published',
        'Archived'
    ];


    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {

        const id =
            this.route.snapshot.paramMap.get('id');


        if (id) {

            this.isEditMode = true;

            this.pageId =
                Number(id);

            this.pageTitle =
                'Edit Page';

            this.pageDescription =
                'Update the selected city portal page.';

            this.loadPage(
                this.pageId
            );

        } else {

            this.setDefaultPublishDate();
        }
    }


    // =====================================================
    // DEFAULT DATE
    // =====================================================

    private setDefaultPublishDate(): void {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, '0');

        const day =
            String(
                today.getDate()
            ).padStart(2, '0');

        this.publishDate =
            `${year}-${month}-${day}`;
    }


    // =====================================================
    // LOAD PAGE FOR EDIT
    // =====================================================

    private loadPage(
        id: number
    ): void {

        /*
         * Temporary frontend data.
         *
         * Later:
         *
         * GET /api/pages/{id}
         */

        const pageData: any = {

            1: {

                title:
                    'About Anand Nagar',

                slug:
                    'about-anand-nagar',

                summary:
                    'Learn about Anand Nagar, its history, people, culture and development.',

                content:
                    'Detailed information about Anand Nagar, including its history, culture, people, important places and development.',

                language:
                    'English',

                author:
                    'Admin',

                publishDate:
                    '2026-10-01',

                status:
                    'Published',

                featured:
                    true,

                coverImage:
                    '/Images/Golden River Valley Sunset.png'
            },


            2: {

                title:
                    'आनंद नगर के बारे में',

                slug:
                    'anand-nagar-ke-bare-mein',

                summary:
                    'आनंद नगर के इतिहास, संस्कृति, लोगों और विकास के बारे में जानें।',

                content:
                    'आनंद नगर के इतिहास, संस्कृति, लोगों और विकास से जुड़ी विस्तृत जानकारी।',

                language:
                    'Hindi',

                author:
                    'Admin',

                publishDate:
                    '2026-09-28',

                status:
                    'Published',

                featured:
                    false,

                coverImage:
                    '/Images/Golden River Valley Sunset.png'
            },


            3: {

                title:
                    'Explore Anand Nagar',

                slug:
                    'explore-anand-nagar',

                summary:
                    'Discover temples, attractions, important places and local experiences.',

                content:
                    'Explore the important places, temples, attractions and experiences available in Anand Nagar.',

                language:
                    'English',

                author:
                    'Admin',

                publishDate:
                    '2026-09-25',

                status:
                    'Published',

                featured:
                    true,

                coverImage:
                    '/Images/Golden River Valley Sunset.png'
            }

        };


        const page =
            pageData[id];


        if (!page) {

            this.router.navigate([
                '/admin/pages'
            ]);

            return;
        }


        this.title =
            page.title;

        this.slug =
            page.slug;

        this.summary =
            page.summary;

        this.content =
            page.content;

        this.language =
            page.language;

        this.author =
            page.author;

        this.publishDate =
            page.publishDate;

        this.status =
            page.status;

        this.featured =
            page.featured;

        this.coverImage =
            page.coverImage;
    }


    // =====================================================
    // GENERATE SLUG
    // =====================================================

    generateSlug(): void {

        if (
            !this.title.trim()
        ) {
            return;
        }

        this.slug =
            this.title
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


    // =====================================================
    // IMAGE SELECT
    // =====================================================

    onImageSelected(
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


        const file =
            input.files[0];


        if (
            !file.type.startsWith('image/')
        ) {

            alert(
                'Please select a valid image file.'
            );

            input.value = '';

            return;
        }


        this.imageFile =
            file;


        const reader =
            new FileReader();


        reader.onload = () => {

            this.coverImage =
                reader.result as string;
        };


        reader.readAsDataURL(
            file
        );
    }


    // =====================================================
    // REMOVE IMAGE
    // =====================================================

    removeImage(): void {

        this.coverImage = '';

        this.imageFile = null;
    }


    // =====================================================
    // SAVE PAGE
    // =====================================================

    savePage(): void {

        if (
            !this.title.trim()
        ) {

            alert(
                'Please enter page title.'
            );

            return;
        }


        if (
            !this.slug.trim()
        ) {

            this.generateSlug();
        }


        if (
            !this.summary.trim()
        ) {

            alert(
                'Please enter page summary.'
            );

            return;
        }


        if (
            !this.content.trim()
        ) {

            alert(
                'Please enter page content.'
            );

            return;
        }


        if (
            !this.language
        ) {

            alert(
                'Please select language.'
            );

            return;
        }


        if (
            !this.publishDate
        ) {

            alert(
                'Please select publish date.'
            );

            return;
        }


        /*
         * Temporary save.
         *
         * Later:
         *
         * POST /api/pages
         *
         * PUT /api/pages/{id}
         */

        console.log(
            'Page Data:',
            {
                id:
                    this.pageId,

                title:
                    this.title,

                slug:
                    this.slug,

                summary:
                    this.summary,

                content:
                    this.content,

                language:
                    this.language,

                author:
                    this.author,

                publishDate:
                    this.publishDate,

                status:
                    this.status,

                featured:
                    this.featured,

                coverImage:
                    this.coverImage,

                imageFile:
                    this.imageFile
            }
        );


        alert(
            this.isEditMode
                ? 'Page updated successfully.'
                : 'Page added successfully.'
        );


        this.router.navigate([
            '/admin/pages'
        ]);
    }


    // =====================================================
    // CANCEL
    // =====================================================

    cancel(): void {

        this.router.navigate([
            '/admin/pages'
        ]);
    }
}