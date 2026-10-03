import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-news-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './news-form.html',
    styleUrl: './news-form.css'
})
export class NewsForm {

    isEditMode: boolean = false;

    newsId: number | null = null;

    pageTitle: string = 'Add News';

    pageDescription: string =
        'Create and publish a news article or city update.';


    // ============================================
    // FORM DATA
    // ============================================

    title: string = '';

    summary: string = '';

    content: string = '';

    category: string = '';

    language: string = 'English';

    author: string = 'Admin';

    publishDate: string = '';

    status: string = 'Draft';

    featured: boolean = false;


    // ============================================
    // IMAGE
    // ============================================

    image: string = '';

    imageFile: File | null = null;


    // ============================================
    // DROPDOWN DATA
    // ============================================

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


    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {

        const id =
            this.route.snapshot.paramMap.get('id');

        if (id) {

            this.isEditMode = true;

            this.newsId =
                Number(id);

            this.pageTitle = 'Edit News';

            this.pageDescription =
                'Update the selected news article or city update.';

            this.loadNews(
                this.newsId
            );

        } else {

            this.setDefaultPublishDate();
        }
    }


    // ============================================
    // DEFAULT DATE
    // ============================================

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


    // ============================================
    // LOAD NEWS FOR EDIT
    // ============================================

    private loadNews(
        id: number
    ): void {

        /*
         * Temporary data.
         *
         * Later this will come from API:
         *
         * GET /api/news/{id}
         */

        const newsData: any = {

            1: {
                title: 'Anand Nagar Development Update',

                summary:
                    'Latest development activities and important updates from Anand Nagar.',

                content:
                    'Detailed information about the latest development activities and important updates from Anand Nagar.',

                category: 'Development',

                language: 'English',

                author: 'Admin',

                publishDate: '2026-10-01',

                status: 'Published',

                featured: true,

                image:
                    '/Images/Golden River Valley Sunset.png'
            },


            2: {
                title:
                    'आनंद नगर में स्वच्छता अभियान',

                summary:
                    'शहर में स्वच्छता और जागरूकता को बढ़ावा देने के लिए विशेष अभियान आयोजित किया गया।',

                content:
                    'आनंद नगर में स्वच्छता और जागरूकता को बढ़ावा देने के लिए विशेष अभियान आयोजित किया गया।',

                category: 'Community',

                language: 'Hindi',

                author: 'Admin',

                publishDate: '2026-09-28',

                status: 'Published',

                featured: false,

                image:
                    '/Images/Golden River Valley Sunset.png'
            },


            3: {
                title:
                    'New Railway Service Update',

                summary:
                    'Important information about railway services and connectivity from Anand Nagar.',

                content:
                    'Important information regarding railway services, connectivity and travel updates from Anand Nagar.',

                category: 'Transport',

                language: 'English',

                author: 'Admin',

                publishDate: '2026-09-25',

                status: 'Published',

                featured: true,

                image:
                    '/Images/Golden River Valley Sunset.png'
            }

        };


        const news =
            newsData[id];


        if (!news) {

            this.router.navigate([
                '/admin/news'
            ]);

            return;
        }


        this.title =
            news.title;

        this.summary =
            news.summary;

        this.content =
            news.content;

        this.category =
            news.category;

        this.language =
            news.language;

        this.author =
            news.author;

        this.publishDate =
            news.publishDate;

        this.status =
            news.status;

        this.featured =
            news.featured;

        this.image =
            news.image;
    }


    // ============================================
    // IMAGE SELECT
    // ============================================

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


        // Basic image validation

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

            this.image =
                reader.result as string;
        };


        reader.readAsDataURL(
            file
        );
    }


    // ============================================
    // REMOVE IMAGE
    // ============================================

    removeImage(): void {

        this.image = '';

        this.imageFile = null;
    }


    // ============================================
    // SAVE
    // ============================================

    saveNews(): void {

        if (
            !this.title.trim()
        ) {

            alert(
                'Please enter news title.'
            );

            return;
        }


        if (
            !this.summary.trim()
        ) {

            alert(
                'Please enter news summary.'
            );

            return;
        }


        if (
            !this.content.trim()
        ) {

            alert(
                'Please enter news content.'
            );

            return;
        }


        if (
            !this.category
        ) {

            alert(
                'Please select category.'
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
         * POST /api/news
         *
         * PUT /api/news/{id}
         */

        console.log(
            'News Data:',
            {
                id: this.newsId,

                title: this.title,

                summary: this.summary,

                content: this.content,

                category: this.category,

                language: this.language,

                author: this.author,

                publishDate: this.publishDate,

                status: this.status,

                featured: this.featured,

                image: this.image,

                imageFile: this.imageFile
            }
        );


        alert(
            this.isEditMode
                ? 'News updated successfully.'
                : 'News added successfully.'
        );


        this.router.navigate([
            '/admin/news'
        ]);
    }


    // ============================================
    // CANCEL
    // ============================================

    cancel(): void {

        this.router.navigate([
            '/admin/news'
        ]);
    }
}