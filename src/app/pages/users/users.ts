import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
    id: number;
    name: string;
    email: string;
    mobile: string;
    role: string;
    status: 'Active' | 'Inactive';
}

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './users.html',
    styleUrl: './users.css'
})
export class Users {

    searchText = '';

    selectedStatus = 'All';


    users: User[] = [

        {
            id: 1,
            name: 'Admin',
            email: 'admin@anandnagar.com',
            mobile: '9876543210',
            role: 'Super Admin',
            status: 'Active'
        },

        {
            id: 2,
            name: 'Rahul Sharma',
            email: 'rahul@anandnagar.com',
            mobile: '9876543211',
            role: 'Admin',
            status: 'Active'
        },

        {
            id: 3,
            name: 'Priya Verma',
            email: 'priya@anandnagar.com',
            mobile: '9876543212',
            role: 'Content Manager',
            status: 'Active'
        },

        {
            id: 4,
            name: 'Amit Kumar',
            email: 'amit@anandnagar.com',
            mobile: '9876543213',
            role: 'Editor',
            status: 'Inactive'
        },

        {
            id: 5,
            name: 'Neha Patel',
            email: 'neha@anandnagar.com',
            mobile: '9876543214',
            role: 'Product Manager',
            status: 'Active'
        },

        {
            id: 6,
            name: 'Rakesh Singh',
            email: 'rakesh@anandnagar.com',
            mobile: '9876543215',
            role: 'Editor',
            status: 'Active'
        }

    ];


    constructor(
        private router: Router
    ) {}


    get filteredUsers(): User[] {

        const search =
            this.searchText
                .trim()
                .toLowerCase();


        return this.users.filter(user => {

            const matchesSearch =
                !search ||

                user.name
                    .toLowerCase()
                    .includes(search) ||

                user.email
                    .toLowerCase()
                    .includes(search) ||

                user.role
                    .toLowerCase()
                    .includes(search) ||

                user.mobile
                    .includes(search);


            const matchesStatus =
                this.selectedStatus === 'All' ||

                user.status === this.selectedStatus;


            return matchesSearch && matchesStatus;

        });

    }


    getInitials(name: string): string {

        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .substring(0, 2)
            .toUpperCase();

    }


    addUser(): void {

        this.router.navigate([
            '/admin/users/add'
        ]);

    }


    editUser(id: number): void {

        this.router.navigate([
            '/admin/users/edit',
            id
        ]);

    }


    deleteUser(id: number): void {

        const confirmed =
            window.confirm(
                'Are you sure you want to delete this user?'
            );


        if (!confirmed) {
            return;
        }


        this.users =
            this.users.filter(
                user => user.id !== id
            );

    }

}