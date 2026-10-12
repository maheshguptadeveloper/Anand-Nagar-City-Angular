import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface EnquiryItem {

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
    selector: 'app-enquiries',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './enquiries.html',
    styleUrl: './enquiries.css'
})
export class Enquiries {

    searchText = '';

    selectedStatus = '';

    selectedPriority = '';

    selectedType = '';

    currentPage = 1;

    pageSize = 8;


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


    enquiryTypes = [
        'General',
        'Business Directory',
        'Event',
        'News',
        'Website',
        'Complaint',
        'Suggestion',
        'Other'
    ];


    enquiries: EnquiryItem[] = [

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

            createdDate: '03 Oct 2026, 10:30 AM'
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

            createdDate: '02 Oct 2026, 04:20 PM'
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

            createdDate: '01 Oct 2026, 11:15 AM'
        },


        {
            id: 4,

            name: 'Neha Gupta',

            email: 'neha@example.com',

            phone: '+91 98760 12345',

            subject: 'Website suggestion',

            message:
                'It would be useful to have a section showing important emergency contacts.',

            enquiryType: 'Suggestion',

            status: 'New',

            priority: 'Medium',

            adminRemarks: '',

            createdDate: '30 Sep 2026, 09:45 AM'
        },


        {
            id: 5,

            name: 'Suresh Yadav',

            email: 'suresh@example.com',

            phone: '+91 90123 45678',

            subject: 'Contact information',

            message:
                'I need information about contacting the city administration.',

            enquiryType: 'General',

            status: 'Closed',

            priority: 'Low',

            adminRemarks:
                'Contact details shared with the user.',

            createdDate: '28 Sep 2026, 02:10 PM'
        },


        {
            id: 6,

            name: 'Anjali Mishra',

            email: 'anjali@example.com',

            phone: '+91 93456 78901',

            subject: 'Event submission',

            message:
                'I want to submit a community event for publication on the city portal.',

            enquiryType: 'Event',

            status: 'In Progress',

            priority: 'Medium',

            adminRemarks:
                'Waiting for event details and images.',

            createdDate: '27 Sep 2026, 01:35 PM'
        },


        {
            id: 7,

            name: 'Vikas Sharma',

            email: 'vikas@example.com',

            phone: '+91 97654 32109',

            subject: 'News update',

            message:
                'How can I submit local news to the Anand Nagar portal?',

            enquiryType: 'News',

            status: 'Resolved',

            priority: 'Low',

            adminRemarks:
                'Submission process explained.',

            createdDate: '25 Sep 2026, 05:50 PM'
        },


        {
            id: 8,

            name: 'Pooja Singh',

            email: 'pooja@example.com',

            phone: '+91 94567 81234',

            subject: 'Portal issue',

            message:
                'I am unable to open one of the directory pages from my mobile phone.',

            enquiryType: 'Website',

            status: 'New',

            priority: 'High',

            adminRemarks: '',

            createdDate: '24 Sep 2026, 08:25 AM'
        },


        {
            id: 9,

            name: 'Manoj Patel',

            email: 'manoj@example.com',

            phone: '+91 98876 54321',

            subject: 'Business verification',

            message:
                'I want to know how business listings are verified on the portal.',

            enquiryType: 'Business Directory',

            status: 'Closed',

            priority: 'Medium',

            adminRemarks:
                'Verification process explained.',

            createdDate: '22 Sep 2026, 12:40 PM'
        }

    ];


    constructor(
        private router: Router
    ) { }


    // ============================================================
    // FILTERED ENQUIRIES
    // ============================================================

    get filteredEnquiries(): EnquiryItem[] {

        const search =
            this.searchText
                .trim()
                .toLowerCase();


        return this.enquiries.filter(enquiry => {

            const matchesSearch =
                !search ||

                enquiry.name
                    .toLowerCase()
                    .includes(search) ||

                enquiry.email
                    .toLowerCase()
                    .includes(search) ||

                enquiry.phone
                    .toLowerCase()
                    .includes(search) ||

                enquiry.subject
                    .toLowerCase()
                    .includes(search) ||

                enquiry.message
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                !this.selectedStatus ||
                enquiry.status === this.selectedStatus;


            const matchesPriority =
                !this.selectedPriority ||
                enquiry.priority === this.selectedPriority;


            const matchesType =
                !this.selectedType ||
                enquiry.enquiryType === this.selectedType;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority &&
                matchesType
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
                this.filteredEnquiries.length /
                this.pageSize
            )
        );

    }


    // ============================================================
    // PAGINATED ENQUIRIES
    // ============================================================

    get paginatedEnquiries(): EnquiryItem[] {

        const start =
            (this.currentPage - 1) *
            this.pageSize;


        return this.filteredEnquiries.slice(
            start,
            start + this.pageSize
        );

    }


    // ============================================================
    // PAGE NUMBERS
    // ============================================================

    get pageNumbers(): number[] {

        return Array.from(
            {
                length: this.totalPages
            },

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
    // FILTER
    // ============================================================

    onFilterChange(): void {

        this.currentPage = 1;

    }


    // ============================================================
    // CLEAR
    // ============================================================

    clearFilters(): void {

        this.searchText = '';

        this.selectedStatus = '';

        this.selectedPriority = '';

        this.selectedType = '';

        this.currentPage = 1;

    }


    // ============================================================
    // PAGINATION
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
    // VIEW / EDIT
    // ============================================================

    viewEnquiry(id: number): void {

        this.router.navigate([
            '/admin/enquiries/view',
            id
        ]);

    }


    // ============================================================
    // DELETE
    // ============================================================

    deleteEnquiry(id: number): void {

        const enquiry =
            this.enquiries.find(
                x => x.id === id
            );


        if (!enquiry) {
            return;
        }


        const confirmed =
            window.confirm(
                `Are you sure you want to delete the enquiry from "${enquiry.name}"?`
            );


        if (!confirmed) {
            return;
        }


        this.enquiries =
            this.enquiries.filter(
                x => x.id !== id
            );


        if (
            this.currentPage >
            this.totalPages
        ) {

            this.currentPage =
                this.totalPages;

        }

    }


    // ============================================================
    // STATUS CLASS
    // ============================================================

    getStatusClass(
        status: EnquiryItem['status']
    ): string {

        switch (status) {

            case 'New':
                return 'status-new';

            case 'In Progress':
                return 'status-progress';

            case 'Resolved':
                return 'status-resolved';

            default:
                return 'status-closed';

        }

    }


    // ============================================================
    // PRIORITY CLASS
    // ============================================================

    getPriorityClass(
        priority: EnquiryItem['priority']
    ): string {

        switch (priority) {

            case 'High':
                return 'priority-high';

            case 'Medium':
                return 'priority-medium';

            default:
                return 'priority-low';

        }

    }


    // ============================================================
    // TRACK BY
    // ============================================================

    trackById(
        index: number,
        enquiry: EnquiryItem
    ): number {

        return enquiry.id;

    }

}