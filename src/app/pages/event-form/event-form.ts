import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-event-form',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './event-form.html',
    styleUrl: './event-form.css'
})
export class EventForm implements OnInit {

    isEditMode = false;

    eventId: number | null = null;


    title = '';

    description = '';

    category = '';

    eventDate = '';

    startTime = '';

    endTime = '';

    location = '';

    organizer = '';

    status:
        'Upcoming' |
        'Completed' |
        'Cancelled' = 'Upcoming';


    imagePreview = '';

    selectedImageName = '';


    categories = [
        'Festival',
        'Community',
        'Cultural',
        'Health',
        'Sports',
        'Education',
        'Other'
    ];


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}


    ngOnInit(): void {

        const id =
            this.activatedRoute.snapshot.paramMap.get('id');


        if (id) {

            this.isEditMode = true;

            this.eventId = Number(id);

            this.loadEvent(this.eventId);

        }

    }


    loadEvent(id: number): void {

        /*
         * Temporary UI data.
         *
         * Later:
         *
         * GET /api/events/{id}
         */

        this.title =
            'Community Cleanliness Drive';

        this.description =
            'A community initiative to keep Anand Nagar clean and beautiful.';

        this.category =
            'Community';

        this.eventDate =
            '2026-10-10';

        this.startTime =
            '07:00';

        this.endTime =
            '10:00';

        this.location =
            'Anand Nagar Market Area';

        this.organizer =
            'Anand Nagar Municipality';

        this.status =
            'Upcoming';

        this.imagePreview =
            '/Images/Golden River Valley Sunset.png';

    }


    onImageSelected(event: Event): void {

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


    saveEvent(): void {

        if (!this.title.trim()) {

            alert('Please enter event title.');

            return;

        }


        if (!this.category) {

            alert('Please select event category.');

            return;

        }


        if (!this.eventDate) {

            alert('Please select event date.');

            return;

        }


        if (!this.location.trim()) {

            alert('Please enter event location.');

            return;

        }


        /*
         * Later:
         *
         * POST /api/events
         *
         * PUT /api/events/{id}
         */

        console.log({
            id: this.eventId,
            title: this.title,
            description: this.description,
            category: this.category,
            eventDate: this.eventDate,
            startTime: this.startTime,
            endTime: this.endTime,
            location: this.location,
            organizer: this.organizer,
            status: this.status,
            image: this.imagePreview
        });


        alert(
            this.isEditMode
                ? 'Event updated successfully.'
                : 'Event created successfully.'
        );


        this.router.navigate([
            '/admin/events'
        ]);

    }


    cancel(): void {

        this.router.navigate([
            '/admin/events'
        ]);

    }

}