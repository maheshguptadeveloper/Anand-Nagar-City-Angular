import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface PermissionGroup {
    name: string;
    permissions: Permission[];
}

interface Permission {
    id: number;
    name: string;
    checked: boolean;
}

@Component({
    selector: 'app-role-form',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './role-form.html',
    styleUrl: './role-form.css'
})
export class RoleForm implements OnInit {

    isEditMode = false;

    roleId: number | null = null;

    roleName = '';

    roleDescription = '';

    status: 'Active' | 'Inactive' = 'Active';


    permissionGroups: PermissionGroup[] = [

        {
            name: 'Dashboard',
            permissions: [
                {
                    id: 1,
                    name: 'View Dashboard',
                    checked: true
                }
            ]
        },

        {
            name: 'User Management',
            permissions: [
                {
                    id: 2,
                    name: 'View Users',
                    checked: false
                },
                {
                    id: 3,
                    name: 'Add Users',
                    checked: false
                },
                {
                    id: 4,
                    name: 'Edit Users',
                    checked: false
                },
                {
                    id: 5,
                    name: 'Delete Users',
                    checked: false
                }
            ]
        },

        {
            name: 'Roles & Permissions',
            permissions: [
                {
                    id: 6,
                    name: 'View Roles',
                    checked: false
                },
                {
                    id: 7,
                    name: 'Add Roles',
                    checked: false
                },
                {
                    id: 8,
                    name: 'Edit Roles',
                    checked: false
                },
                {
                    id: 9,
                    name: 'Delete Roles',
                    checked: false
                },
                {
                    id: 10,
                    name: 'Manage Permissions',
                    checked: false
                }
            ]
        },

        {
            name: 'Banners',
            permissions: [
                {
                    id: 11,
                    name: 'View Banners',
                    checked: false
                },
                {
                    id: 12,
                    name: 'Add Banners',
                    checked: false
                },
                {
                    id: 13,
                    name: 'Edit Banners',
                    checked: false
                },
                {
                    id: 14,
                    name: 'Delete Banners',
                    checked: false
                }
            ]
        },

        {
            name: 'Events',
            permissions: [
                {
                    id: 15,
                    name: 'View Events',
                    checked: false
                },
                {
                    id: 16,
                    name: 'Add Events',
                    checked: false
                },
                {
                    id: 17,
                    name: 'Edit Events',
                    checked: false
                },
                {
                    id: 18,
                    name: 'Delete Events',
                    checked: false
                }
            ]
        },

        {
            name: 'News / Updates',
            permissions: [
                {
                    id: 19,
                    name: 'View News',
                    checked: false
                },
                {
                    id: 20,
                    name: 'Add News',
                    checked: false
                },
                {
                    id: 21,
                    name: 'Edit News',
                    checked: false
                },
                {
                    id: 22,
                    name: 'Delete News',
                    checked: false
                }
            ]
        },

        {
            name: 'Pages',
            permissions: [
                {
                    id: 23,
                    name: 'View Pages',
                    checked: false
                },
                {
                    id: 24,
                    name: 'Add Pages',
                    checked: false
                },
                {
                    id: 25,
                    name: 'Edit Pages',
                    checked: false
                },
                {
                    id: 26,
                    name: 'Delete Pages',
                    checked: false
                }
            ]
        },

        {
            name: 'Albums',
            permissions: [
                {
                    id: 27,
                    name: 'View Albums',
                    checked: false
                },
                {
                    id: 28,
                    name: 'Add Albums',
                    checked: false
                },
                {
                    id: 29,
                    name: 'Edit Albums',
                    checked: false
                },
                {
                    id: 30,
                    name: 'Delete Albums',
                    checked: false
                }
            ]
        },

        {
            name: 'Media Library',
            permissions: [
                {
                    id: 31,
                    name: 'View Media',
                    checked: false
                },
                {
                    id: 32,
                    name: 'Upload Media',
                    checked: false
                },
                {
                    id: 33,
                    name: 'Delete Media',
                    checked: false
                }
            ]
        },

        {
            name: 'Business Directory',
            permissions: [
                {
                    id: 34,
                    name: 'View Businesses',
                    checked: false
                },
                {
                    id: 35,
                    name: 'Add Businesses',
                    checked: false
                },
                {
                    id: 36,
                    name: 'Edit Businesses',
                    checked: false
                },
                {
                    id: 37,
                    name: 'Delete Businesses',
                    checked: false
                }
            ]
        },

        {
            name: 'Categories',
            permissions: [
                {
                    id: 38,
                    name: 'View Categories',
                    checked: false
                },
                {
                    id: 39,
                    name: 'Add Categories',
                    checked: false
                },
                {
                    id: 40,
                    name: 'Edit Categories',
                    checked: false
                },
                {
                    id: 41,
                    name: 'Delete Categories',
                    checked: false
                }
            ]
        },

        {
            name: 'Products',
            permissions: [
                {
                    id: 42,
                    name: 'View Products',
                    checked: false
                },
                {
                    id: 43,
                    name: 'Add Products',
                    checked: false
                },
                {
                    id: 44,
                    name: 'Edit Products',
                    checked: false
                },
                {
                    id: 45,
                    name: 'Delete Products',
                    checked: false
                }
            ]
        },

        {
            name: 'Contact Enquiries',
            permissions: [
                {
                    id: 46,
                    name: 'View Enquiries',
                    checked: false
                },
                {
                    id: 47,
                    name: 'Update Enquiries',
                    checked: false
                },
                {
                    id: 48,
                    name: 'Delete Enquiries',
                    checked: false
                }
            ]
        },

        {
            name: 'Settings',
            permissions: [
                {
                    id: 49,
                    name: 'View Settings',
                    checked: false
                },
                {
                    id: 50,
                    name: 'Update Settings',
                    checked: false
                }
            ]
        }

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

            this.roleId = Number(id);

            this.loadRole(this.roleId);

        }

    }


    loadRole(id: number): void {

        /*
         * Temporary UI data.
         *
         * Later this will come from:
         *
         * GET /api/roles/{id}
         */

        if (id === 1) {

            this.roleName = 'Super Admin';

            this.roleDescription =
                'Full access to all portal features and settings.';

            this.status = 'Active';


            this.permissionGroups.forEach(group => {

                group.permissions.forEach(permission => {

                    permission.checked = true;

                });

            });

        }

        else if (id === 2) {

            this.roleName = 'Admin';

            this.roleDescription =
                'Manage content, users and portal operations.';

            this.status = 'Active';


            this.permissionGroups.forEach(group => {

                group.permissions.forEach(permission => {

                    permission.checked = true;

                });

            });

        }

    }


    toggleGroup(group: PermissionGroup): void {

        const allSelected =
            group.permissions.every(
                permission => permission.checked
            );


        group.permissions.forEach(permission => {

            permission.checked = !allSelected;

        });

    }


    isGroupSelected(group: PermissionGroup): boolean {

        return group.permissions.length > 0 &&
            group.permissions.every(
                permission => permission.checked
            );

    }


    get selectedPermissionCount(): number {

        return this.permissionGroups.reduce(
            (total, group) =>
                total +
                group.permissions.filter(
                    permission => permission.checked
                ).length,
            0
        );

    }


    saveRole(): void {

        if (!this.roleName.trim()) {

            alert('Please enter role name.');

            return;

        }


        /*
         * Later:
         *
         * POST /api/roles
         *
         * PUT /api/roles/{id}
         */

        console.log({
            id: this.roleId,
            name: this.roleName,
            description: this.roleDescription,
            status: this.status,
            permissions: this.permissionGroups
        });


        alert(
            this.isEditMode
                ? 'Role updated successfully.'
                : 'Role created successfully.'
        );


        this.router.navigate([
            '/admin/roles'
        ]);

    }


    cancel(): void {

        this.router.navigate([
            '/admin/roles'
        ]);

    }

}