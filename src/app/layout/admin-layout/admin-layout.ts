import { Component } from '@angular/core';
import {
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

    sidebarCollapsed: boolean = false;

    mobileSidebarOpen: boolean = false;


    toggleSidebar(): void {

        this.sidebarCollapsed =
            !this.sidebarCollapsed;
    }


    openMobileSidebar(): void {

        this.mobileSidebarOpen = true;
    }


    closeMobileSidebar(): void {

        this.mobileSidebarOpen = false;
    }


    logout(): void {

        console.log('Logout clicked');
    }
}