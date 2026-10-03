import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Role {

    id: number;

    name: string;

    code: string;

    description: string;

    permissionCount: number;

    status: 'Active' | 'Inactive';

}

@Component({
    selector: 'app-roles',
    standalone: true,

    imports: [
        FormsModule
    ],

    templateUrl: './roles.html',

    styleUrl: './roles.css'
})
export class Roles {

    searchText = '';


    roles: Role[] = [

        {
            id: 1,

            name: 'Super Admin',

            code: 'SUPER_ADMIN',

            description:
                'Full access to all portal features and settings.',

            permissionCount: 24,

            status: 'Active'
        },

        {
            id: 2,

            name: 'Admin',

            code: 'ADMIN',

            description:
                'Manage content, users and portal operations.',

            permissionCount: 20,

            status: 'Active'
        },

        {
            id: 3,

            name: 'Content Manager',

            code: 'CONTENT_MANAGER',

            description:
                'Manage website content, news, events and pages.',

            permissionCount: 12,

            status: 'Active'
        },

        {
            id: 4,

            name: 'Product Manager',

            code: 'PRODUCT_MANAGER',

            description:
                'Manage products, categories and product media.',

            permissionCount: 9,

            status: 'Active'
        },

        {
            id: 5,

            name: 'Editor',

            code: 'EDITOR',

            description:
                'View and edit assigned website content.',

            permissionCount: 7,

            status: 'Inactive'
        }

    ];


    constructor(
        private router: Router
    ) {}


    get filteredRoles(): Role[] {

        const search =
            this.searchText
                .trim()
                .toLowerCase();


        if (!search) {

            return this.roles;

        }


        return this.roles.filter(role =>

            role.name
                .toLowerCase()
                .includes(search)

            ||

            role.code
                .toLowerCase()
                .includes(search)

            ||

            role.description
                .toLowerCase()
                .includes(search)

        );

    }


    addRole(): void {

        this.router.navigate([
            '/admin/roles/add'
        ]);

    }


    editRole(id: number): void {

        this.router.navigate([
            '/admin/roles/edit',
            id
        ]);

    }


    viewPermissions(role: Role): void {

        this.router.navigate([
            '/admin/roles/edit',
            role.id
        ]);

    }


    deleteRole(id: number): void {

        const role =
            this.roles.find(
                item => item.id === id
            );


        if (!role) {
            return;
        }


        const confirmed =
            window.confirm(
                `Are you sure you want to delete the "${role.name}" role?`
            );


        if (!confirmed) {
            return;
        }


        this.roles =
            this.roles.filter(
                item => item.id !== id
            );

    }

}