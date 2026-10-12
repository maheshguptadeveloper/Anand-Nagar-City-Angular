import { Component } from '@angular/core';
import {
    Router,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
} from '@angular/router';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './admin-layout.html',
    styleUrl: './admin-layout.css'
})
export class AdminLayout {

    // Desktop sidebar state
    sidebarCollapsed: boolean = false;

    // Mobile sidebar state
    mobileSidebarOpen: boolean = false;


    constructor(
        private router: Router
    ) { }


    /**
     * Toggle desktop sidebar
     */
    toggleSidebar(): void {

        this.sidebarCollapsed =
            !this.sidebarCollapsed;
    }


    /**
     * Open sidebar on mobile
     */
    openMobileSidebar(): void {

        this.mobileSidebarOpen = true;
    }


    /**
     * Close sidebar on mobile
     */
    closeMobileSidebar(): void {

        this.mobileSidebarOpen = false;
    }


    /**
     * Logout admin user
     */
    logout(): void {

        const confirmed = window.confirm(
            'Are you sure you want to logout?'
        );

        if (!confirmed) {
            return;
        }


        // Remove frontend login information
        localStorage.removeItem('adminUser');
        localStorage.removeItem('accessToken');

        sessionStorage.removeItem('adminUser');
        sessionStorage.removeItem('accessToken');


        // Close mobile sidebar if open
        this.mobileSidebarOpen = false;


        // Navigate to login page
        this.router.navigate([
            '/admin/login'
        ]);
    }
}