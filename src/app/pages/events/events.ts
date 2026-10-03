import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface EventItem {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    location: string;
    organizer: string;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
}

@Component({
    selector: 'app-events',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './events.html',
    styleUrl: './events.css'
})
export class Events {

    searchText = '';

    statusFilter = 'All';

    categoryFilter = 'All';


    events: EventItem[] = [

        {
            id: 1,
            title: 'Ganeshotsav Celebration',
            description:
                'Community Ganeshotsav celebration with cultural activities and local programs.',
            category: 'Festival',
            image: '/Images/Golden River Valley Sunset.png',
            eventDate: '15/09/2026',
            startTime: '06:00 PM',
            endTime: '10:00 PM',
            location: 'Anand Nagar Main Ground',
            organizer: 'Anand Nagar Community',
            status: 'Completed'
        },

        {
            id: 2,
            title: 'Community Cleanliness Drive',
            description:
                'A community initiative to keep Anand Nagar clean and beautiful.',
            category: 'Community',
            image: '/Images/Golden River Valley Sunset.png',
            eventDate: '10/10/2026',
            startTime: '07:00 AM',
            endTime: '10:00 AM',
            location: 'Anand Nagar Market Area',
            organizer: 'Anand Nagar Municipality',
            status: 'Upcoming'
        },

        {
            id: 3,
            title: 'Festive Season Celebration',
            description:
                'Join the community for festive celebrations and cultural activities.',
            category: 'Festival',
            image: '/Images/Golden River Valley Sunset.png',
            eventDate: '20/10/2026',
            startTime: '05:00 PM',
            endTime: '09:00 PM',
            location: 'City Community Hall',
            organizer: 'Anand Nagar Cultural Committee',
            status: 'Upcoming'
        },

        {
            id: 4,
            title: 'Community Health Initiative',
            description:
                'Free health awareness and community wellness program.',
            category: 'Health',
            image: '/Images/Golden River Valley Sunset.png',
            eventDate: '05/11/2026',
            startTime: '09:00 AM',
            endTime: '01:00 PM',
            location: 'Anand Nagar Community Hall',
            organizer: 'Community Health Team',
            status: 'Upcoming'
        },

        {
            id: 5,
            title: 'Local Cultural Program',
            description:
                'A cultural evening celebrating local traditions and talent.',
            category: 'Cultural',
            image: '/Images/Golden River Valley Sunset.png',
            eventDate: '15/11/2026',
            startTime: '06:00 PM',
            endTime: '09:00 PM',
            location: 'Anand Nagar Town Hall',
            organizer: 'Local Cultural Committee',
            status: 'Upcoming'
        }

    ];


    constructor(
        private router: Router
    ) {}


    get categories(): string[] {

        return [
            ...new Set(
                this.events.map(
                    event => event.category
                )
            )
        ];

    }


    get filteredEvents(): EventItem[] {

        const search =
            this.searchText
                .trim()
                .toLowerCase();


        return this.events.filter(event => {

            const matchesSearch =
                !search ||

                event.title
                    .toLowerCase()
                    .includes(search) ||

                event.description
                    .toLowerCase()
                    .includes(search) ||

                event.location
                    .toLowerCase()
                    .includes(search) ||

                event.organizer
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                this.statusFilter === 'All' ||

                event.status === this.statusFilter;


            const matchesCategory =
                this.categoryFilter === 'All' ||

                event.category === this.categoryFilter;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesCategory
            );

        });

    }


    addEvent(): void {

        this.router.navigate([
            '/admin/events/add'
        ]);

    }


    editEvent(id: number): void {

        this.router.navigate([
            '/admin/events/edit',
            id
        ]);

    }


    deleteEvent(id: number): void {

        const event =
            this.events.find(
                item => item.id === id
            );


        if (!event) {
            return;
        }


        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${event.title}"?`
            );


        if (!confirmed) {
            return;
        }


        this.events =
            this.events.filter(
                item => item.id !== id
            );

    }

}