import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface BusinessFormModel {
    id: number;
    businessName: string;
    slug: string;
    category: string;
    shortDescription: string;
    description: string;
    contactPerson: string;
    mobile: string;
    alternateMobile: string;
    email: string;
    website: string;
    address: string;
    locality: string;
    city: string;
    pinCode: string;
    googleMapsUrl: string;
    openingTime: string;
    closingTime: string;
    workingDays: string;
    status: 'Active' | 'Inactive';
    featured: boolean;
    logo: string;
    coverImage: string;
    metaTitle: string;
    metaDescription: string;
}

@Component({
    selector: 'app-directory-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './directory-form.html',
    styleUrl: './directory-form.css'
})
export class DirectoryForm {

    isEditMode = false;
    businessId: number | null = null;

    categories = [
        'Restaurant',
        'Hotel',
        'Hospital',
        'Education',
        'Shopping',
        'Grocery',
        'Bank',
        'Salon',
        'Automobile',
        'Real Estate',
        'Professional Services',
        'Other'
    ];

    statuses = [
        'Active',
        'Inactive'
    ];

    business: BusinessFormModel = {

        id: 0,

        businessName: '',
        slug: '',

        category: '',

        shortDescription: '',
        description: '',

        contactPerson: '',
        mobile: '',
        alternateMobile: '',
        email: '',
        website: '',

        address: '',
        locality: '',
        city: 'Anand Nagar',
        pinCode: '',
        googleMapsUrl: '',

        openingTime: '',
        closingTime: '',
        workingDays: 'Monday - Sunday',

        status: 'Active',
        featured: false,

        logo: '',
        coverImage: '',

        metaTitle: '',
        metaDescription: ''
    };


    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {

        this.route.paramMap.subscribe(params => {

            const id = params.get('id');

            if (id) {

                this.isEditMode = true;
                this.businessId = Number(id);

                this.loadBusiness(
                    this.businessId
                );

            }

        });

    }


    // ============================================================
    // LOAD BUSINESS
    // ============================================================

    loadBusiness(id: number): void {

        const sampleBusinesses: BusinessFormModel[] = [

            {
                id: 1,
                businessName: 'Anand Restaurant',
                slug: 'anand-restaurant',
                category: 'Restaurant',
                shortDescription:
                    'Family restaurant serving Indian cuisine.',
                description:
                    'Anand Restaurant provides quality food and family dining services in Anand Nagar.',
                contactPerson: 'Raj Kumar',
                mobile: '9876543210',
                alternateMobile: '',
                email: 'info@anandrestaurant.com',
                website: '',
                address: 'Main Market, Anand Nagar',
                locality: 'Main Market',
                city: 'Anand Nagar',
                pinCode: '273155',
                googleMapsUrl: '',
                openingTime: '10:00',
                closingTime: '22:00',
                workingDays: 'Monday - Sunday',
                status: 'Active',
                featured: true,
                logo: '/images/business-restaurant.jpg',
                coverImage: '',
                metaTitle: 'Anand Restaurant Anand Nagar',
                metaDescription:
                    'Find Anand Restaurant in Anand Nagar.'
            },

            {
                id: 2,
                businessName: 'City Care Hospital',
                slug: 'city-care-hospital',
                category: 'Hospital',
                shortDescription:
                    'Healthcare services in Anand Nagar.',
                description:
                    'City Care Hospital provides healthcare and medical services to the local community.',
                contactPerson: 'Dr. Amit Singh',
                mobile: '9876543211',
                alternateMobile: '',
                email: 'info@citycarehospital.com',
                website: '',
                address: 'Station Road, Anand Nagar',
                locality: 'Station Road',
                city: 'Anand Nagar',
                pinCode: '273155',
                googleMapsUrl: '',
                openingTime: '00:00',
                closingTime: '23:59',
                workingDays: 'Monday - Sunday',
                status: 'Active',
                featured: true,
                logo: '/images/business-hospital.jpg',
                coverImage: '',
                metaTitle: 'City Care Hospital Anand Nagar',
                metaDescription:
                    'Find City Care Hospital in Anand Nagar.'
            }

        ];

        const existingBusiness =
            sampleBusinesses.find(
                x => x.id === id
            );

        if (existingBusiness) {

            this.business = {
                ...existingBusiness
            };

        }

    }


    // ============================================================
    // BUSINESS NAME → SLUG
    // ============================================================

    generateSlug(): void {

        this.business.slug =
            this.business.businessName
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
    }


    // ============================================================
    // SAVE
    // ============================================================

    saveBusiness(): void {

        if (
            !this.business.businessName.trim()
        ) {

            window.alert(
                'Please enter business name.'
            );

            return;
        }


        if (!this.business.category) {

            window.alert(
                'Please select business category.'
            );

            return;
        }


        if (
            !this.business.contactPerson.trim()
        ) {

            window.alert(
                'Please enter contact person.'
            );

            return;
        }


        if (
            !this.business.mobile.trim()
        ) {

            window.alert(
                'Please enter mobile number.'
            );

            return;
        }


        if (!this.business.email.trim()) {

            window.alert(
                'Please enter email address.'
            );

            return;
        }


        if (!this.business.address.trim()) {

            window.alert(
                'Please enter business address.'
            );

            return;
        }


        if (!this.business.locality.trim()) {

            window.alert(
                'Please enter locality.'
            );

            return;
        }


        if (!this.business.pinCode.trim()) {

            window.alert(
                'Please enter PIN code.'
            );

            return;
        }


        if (!this.business.slug.trim()) {

            this.generateSlug();
        }


        if (this.isEditMode) {

            console.log(
                'Updating business:',
                this.business
            );

        } else {

            console.log(
                'Creating business:',
                this.business
            );

        }


        window.alert(
            this.isEditMode
                ? 'Business updated successfully.'
                : 'Business added successfully.'
        );


        this.router.navigate([
            '/admin/directory'
        ]);

    }


    // ============================================================
    // CANCEL
    // ============================================================

    cancel(): void {

        this.router.navigate([
            '/admin/directory'
        ]);

    }

}