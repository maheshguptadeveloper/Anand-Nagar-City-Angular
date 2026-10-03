import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-banner-form',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './banner-form.html',
    styleUrl: './banner-form.css'
})
export class BannerForm implements OnInit {

    isEditMode = false;

    bannerId: number | null = null;


    title = '';

    description = '';

    buttonText = 'Explore Now';

    buttonLink = '';

    displayOrder = 1;

    startDate = '';

    endDate = '';

    status: 'Active' | 'Inactive' = 'Active';


    imagePreview = '';

    selectedImageName = '';


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}


    ngOnInit(): void {

        const id =
            this.activatedRoute.snapshot.paramMap.get('id');


        if (id) {

            this.isEditMode = true;

            this.bannerId = Number(id);

            this.loadBanner(this.bannerId);

        }

    }


    loadBanner(id: number): void {

        /*
         * Temporary UI data.
         *
         * Later:
         *
         * GET /api/banners/{id}
         */

        this.title = 'Welcome to Anand Nagar';

        this.description =
            'Explore the beauty, culture and opportunities of our city.';

        this.buttonText = 'Explore Now';

        this.buttonLink = '/explore.html';

        this.displayOrder = 1;

        this.startDate = '2026-10-01';

        this.endDate = '2026-12-31';

        this.status = 'Active';

        this.imagePreview =
            '/Images/Golden River Valley Sunset.png';

    }


    onImageSelected(event: Event): void {

        const input =
            event.target as HTMLInputElement;


        if (!input.files || input.files.length === 0) {
            return;
        }


        const file =
            input.files[0];


        this.selectedImageName =
            file.name;


        const reader =
            new FileReader();


        reader.onload = () => {

            this.imagePreview =
                reader.result as string;

        };


        reader.readAsDataURL(file);

    }


    removeImage(): void {

        this.imagePreview = '';

        this.selectedImageName = '';

    }


    saveBanner(): void {

        if (!this.title.trim()) {

            alert('Please enter banner title.');

            return;

        }


        if (!this.imagePreview) {

            alert('Please select banner image.');

            return;

        }


        /*
         * Later:
         *
         * POST /api/banners
         *
         * PUT /api/banners/{id}
         */

        console.log({
            id: this.bannerId,
            title: this.title,
            description: this.description,
            buttonText: this.buttonText,
            buttonLink: this.buttonLink,
            displayOrder: this.displayOrder,
            startDate: this.startDate,
            endDate: this.endDate,
            status: this.status,
            image: this.imagePreview
        });


        alert(
            this.isEditMode
                ? 'Banner updated successfully.'
                : 'Banner created successfully.'
        );


        this.router.navigate([
            '/admin/banners'
        ]);

    }


    cancel(): void {

        this.router.navigate([
            '/admin/banners'
        ]);

    }

}