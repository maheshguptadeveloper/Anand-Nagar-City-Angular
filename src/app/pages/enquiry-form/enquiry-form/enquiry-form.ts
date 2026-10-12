import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface EnquiryFormModel {

    id: number;

    name: string;
    email: string;
    phone: string;

    subject: string;
    message: string;

    enquiryType: string;

    status:
        | 'New'
        | 'In Progress'
        | 'Resolved'
        | 'Closed';

    priority:
        | 'Low'
        | 'Medium'
        | 'High';

    adminRemarks: string;

    createdDate: string;
}

@Component({
    selector: 'app-enquiry-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './enquiry-form.html',
    styleUrl: './enquiry-form.css'
})
export class EnquiryForm {

    enquiryId: number | null = null;

    statuses = [
        'New',
        'In Progress',
        'Resolved',
        'Closed'
    ];

    priorities = [
        'Low',
        'Medium',
        'High'
    ];

    enquiry: EnquiryFormModel = {

        id: 0,

        name: '',
        email: '',
        phone: '',

        subject: '',
        message: '',

        enquiryType: '',

        status: 'New',

        priority: 'Medium',

        adminRemarks: '',

        createdDate: ''
    };


    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {

        this.route.paramMap.subscribe(params => {

            const id = params.get('id');

            if (id) {

                this.enquiryId = Number(id);

                this.loadEnquiry(
                    this.enquiryId
                );

            }

        });

    }


    // ============================================================
    // LOAD ENQUIRY
    // ============================================================

    loadEnquiry(id: number): void {

        const sampleEnquiries: EnquiryFormModel[] = [

            {
                id: 1,

                name: 'Rajesh Kumar',

                email: 'rajesh@example.com',

                phone: '+91 98765 43210',

                subject: 'Business listing enquiry',

                message:
                    'I would like to add my shop to the Anand Nagar business directory.',

                enquiryType: 'Business Directory',

                status: 'New',

                priority: 'Medium',

                adminRemarks: '',

                createdDate:
                    '03 Oct 2026, 10:30 AM'
            },


            {
                id: 2,

                name: 'Priya Singh',

                email: 'priya@example.com',

                phone: '+91 91234 56789',

                subject: 'Upcoming events information',

                message:
                    'Please provide information about upcoming events in Anand Nagar.',

                enquiryType: 'Event',

                status: 'In Progress',

                priority: 'Low',

                adminRemarks:
                    'Information being collected from the events team.',

                createdDate:
                    '02 Oct 2026, 04:20 PM'
            },


            {
                id: 3,

                name: 'Amit Verma',

                email: 'amit@example.com',

                phone: '+91 99887 66554',

                subject: 'Incorrect business information',

                message:
                    'The address shown for a business in the directory appears to be incorrect.',

                enquiryType: 'Complaint',

                status: 'Resolved',

                priority: 'High',

                adminRemarks:
                    'Business owner contacted and information corrected.',

                createdDate:
                    '01 Oct 2026, 11:15 AM'
            }

        ];


        const existingEnquiry =
            sampleEnquiries.find(
                x => x.id === id
            );


        if (existingEnquiry) {

            this.enquiry = {
                ...existingEnquiry
            };

        }

    }


    // ============================================================
    // SAVE
    // ============================================================

    saveEnquiry(): void {

        if (
            !this.enquiry.status
        ) {

            window.alert(
                'Please select enquiry status.'
            );

            return;

        }


        if (
            !this.enquiry.priority
        ) {

            window.alert(
                'Please select enquiry priority.'
            );

            return;

        }


        console.log(
            'Updating enquiry:',
            this.enquiry
        );


        window.alert(
            'Enquiry updated successfully.'
        );


        this.router.navigate([
            '/admin/enquiries'
        ]);

    }


    // ============================================================
    // CANCEL
    // ============================================================

    cancel(): void {

        this.router.navigate([
            '/admin/enquiries'
        ]);

    }


    // ============================================================
    // EMAIL
    // ============================================================

    emailEnquirer(): void {

        window.location.href =
            `mailto:${this.enquiry.email}`;

    }


    // ============================================================
    // CALL
    // ============================================================

    callEnquirer(): void {

        window.location.href =
            `tel:${this.enquiry.phone}`;

    }

}