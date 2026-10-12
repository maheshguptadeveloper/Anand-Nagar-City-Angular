import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface CategoryFormModel {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    status: 'Active' | 'Inactive';
    featured: boolean;
    metaTitle: string;
    metaDescription: string;
}

@Component({
    selector: 'app-category-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './category-form.html',
    styleUrl: './category-form.css'
})
export class CategoryForm {

    isEditMode = false;
    categoryId: number | null = null;

    statuses = [
        'Active',
        'Inactive'
    ];

    category: CategoryFormModel = {

        id: 0,

        name: '',
        slug: '',
        description: '',
        icon: 'bi bi-folder',

        status: 'Active',

        featured: false,

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
                this.categoryId = Number(id);

                this.loadCategory(
                    this.categoryId
                );
            }

        });

    }


    // ============================================================
    // LOAD CATEGORY
    // ============================================================

    loadCategory(id: number): void {

        const sampleCategories: CategoryFormModel[] = [

            {
                id: 1,
                name: 'Restaurants',
                slug: 'restaurants',
                description:
                    'Restaurants and food businesses in Anand Nagar.',
                icon: 'bi bi-cup-hot',
                status: 'Active',
                featured: true,
                metaTitle:
                    'Restaurants in Anand Nagar',
                metaDescription:
                    'Find restaurants and food businesses in Anand Nagar.'
            },

            {
                id: 2,
                name: 'Hotels',
                slug: 'hotels',
                description:
                    'Hotels, lodges and accommodation services.',
                icon: 'bi bi-building',
                status: 'Active',
                featured: true,
                metaTitle:
                    'Hotels in Anand Nagar',
                metaDescription:
                    'Find hotels and accommodation services in Anand Nagar.'
            },

            {
                id: 3,
                name: 'Hospitals',
                slug: 'hospitals',
                description:
                    'Hospitals, clinics and healthcare services.',
                icon: 'bi bi-hospital',
                status: 'Active',
                featured: true,
                metaTitle:
                    'Hospitals in Anand Nagar',
                metaDescription:
                    'Find hospitals and healthcare services in Anand Nagar.'
            }

        ];

        const existingCategory =
            sampleCategories.find(
                x => x.id === id
            );

        if (existingCategory) {

            this.category = {
                ...existingCategory
            };

        }

    }


    // ============================================================
    // GENERATE SLUG
    // ============================================================

    generateSlug(): void {

        this.category.slug =
            this.category.name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
    }


    // ============================================================
    // SAVE
    // ============================================================

    saveCategory(): void {

        if (
            !this.category.name.trim()
        ) {

            window.alert(
                'Please enter category name.'
            );

            return;
        }


        if (
            !this.category.slug.trim()
        ) {

            this.generateSlug();
        }


        if (
            !this.category.description.trim()
        ) {

            window.alert(
                'Please enter category description.'
            );

            return;
        }


        if (
            !this.category.icon.trim()
        ) {

            window.alert(
                'Please enter category icon.'
            );

            return;
        }


        if (this.isEditMode) {

            console.log(
                'Updating category:',
                this.category
            );

        } else {

            console.log(
                'Creating category:',
                this.category
            );

        }


        window.alert(
            this.isEditMode
                ? 'Category updated successfully.'
                : 'Category added successfully.'
        );


        this.router.navigate([
            '/admin/categories'
        ]);

    }


    // ============================================================
    // CANCEL
    // ============================================================

    cancel(): void {

        this.router.navigate([
            '/admin/categories'
        ]);

    }

}