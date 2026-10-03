import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface UserFormModel {
    name: string;
    email: string;
    role: string;
    password: string;
    mobile: string;
    status: 'Active' | 'Inactive';
}

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink
    ],
    templateUrl: './user-form.html',
    styleUrl: './user-form.css'
})
export class UserForm {

    user: UserFormModel = {

        name: '',

        email: '',

        role: '',

        password: '',

        mobile: '',

        status: 'Active'

    };


    showPassword = false;


    profileImagePreview: string | null = null;


    constructor(
        private router: Router
    ) {}


    togglePassword(): void {

        this.showPassword =
            !this.showPassword;

    }


    onImageSelected(event: Event): void {

        const input =
            event.target as HTMLInputElement;


        if (!input.files || input.files.length === 0) {
            return;
        }


        const file =
            input.files[0];


        // Maximum 2 MB

        if (file.size > 2 * 1024 * 1024) {

            alert(
                'Profile image must be smaller than 2 MB.'
            );

            input.value = '';

            return;

        }


        // Allowed image types

        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ];


        if (!allowedTypes.includes(file.type)) {

            alert(
                'Please select a JPG, PNG or WEBP image.'
            );

            input.value = '';

            return;

        }


        const reader =
            new FileReader();


        reader.onload = () => {

            this.profileImagePreview =
                reader.result as string;

        };


        reader.readAsDataURL(file);

    }


    saveUser(): void {

        console.log(
            'User data:',
            this.user
        );


        console.log(
            'Profile image:',
            this.profileImagePreview
        );


        /*
         * API will be connected later.
         *
         * For now we only navigate back
         * to the Users list.
         */

        this.router.navigate([
            '/admin/users'
        ]);

    }


    cancel(): void {

        this.router.navigate([
            '/admin/users'
        ]);

    }

}