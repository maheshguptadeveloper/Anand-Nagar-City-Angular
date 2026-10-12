import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface ProductFormModel {
    id: number;

    name: string;
    slug: string;
    sku: string;

    category: string;
    brand: string;

    shortDescription: string;
    description: string;

    price: number;
    salePrice: number;

    stock: number;
    unit: string;

    status: 'Active' | 'Inactive' | 'Draft';

    featured: boolean;

    image: string;
    gallery: string;

    weight: string;
    dimensions: string;

    metaTitle: string;
    metaDescription: string;
}

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './product-form.html',
    styleUrl: './product-form.css'
})
export class ProductForm {

    isEditMode = false;
    productId: number | null = null;

    categories = [
        'Electronics',
        'Clothing',
        'Grocery',
        'Food & Beverages',
        'Home & Kitchen',
        'Beauty & Personal Care',
        'Books & Stationery',
        'Automobile',
        'Agriculture',
        'Other'
    ];

    statuses = [
        'Active',
        'Inactive',
        'Draft'
    ];

    units = [
        'Piece',
        'Pack',
        'Box',
        'Bottle',
        'Kg',
        'Gram',
        'Litre',
        'Meter',
        'Set',
        'Kit',
        'Other'
    ];

    product: ProductFormModel = {

        id: 0,

        name: '',
        slug: '',
        sku: '',

        category: '',
        brand: '',

        shortDescription: '',
        description: '',

        price: 0,
        salePrice: 0,

        stock: 0,
        unit: 'Piece',

        status: 'Active',

        featured: false,

        image: '',
        gallery: '',

        weight: '',
        dimensions: '',

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
                this.productId = Number(id);

                this.loadProduct(
                    this.productId
                );
            }

        });

    }


    // ============================================================
    // LOAD PRODUCT
    // ============================================================

    loadProduct(id: number): void {

        const sampleProducts: ProductFormModel[] = [

            {
                id: 1,

                name: 'Premium Cotton Shirt',
                slug: 'premium-cotton-shirt',
                sku: 'ANP-1001',

                category: 'Clothing',
                brand: 'Anand Fashion',

                shortDescription:
                    'Premium cotton shirt for everyday use.',

                description:
                    'A comfortable premium cotton shirt suitable for casual and regular wear.',

                price: 1299,
                salePrice: 999,

                stock: 25,
                unit: 'Piece',

                status: 'Active',

                featured: true,

                image: '',
                gallery: '',

                weight: '250 GM',
                dimensions: '',

                metaTitle:
                    'Premium Cotton Shirt - Anand Nagar',

                metaDescription:
                    'Buy premium cotton shirts from Anand Nagar.'
            },

            {
                id: 2,

                name: 'Basmati Rice 5 KG',
                slug: 'basmati-rice-5kg',
                sku: 'ANP-1002',

                category: 'Grocery',
                brand: 'Local Choice',

                shortDescription:
                    'Premium quality basmati rice.',

                description:
                    'Premium quality basmati rice suitable for daily meals and special occasions.',

                price: 650,
                salePrice: 599,

                stock: 42,
                unit: 'Pack',

                status: 'Active',

                featured: true,

                image: '',
                gallery: '',

                weight: '5 KG',
                dimensions: '',

                metaTitle:
                    'Basmati Rice 5 KG - Anand Nagar',

                metaDescription:
                    'Buy quality basmati rice from Anand Nagar.'
            }

        ];

        const existingProduct =
            sampleProducts.find(
                x => x.id === id
            );

        if (existingProduct) {

            this.product = {
                ...existingProduct
            };

        }

    }


    // ============================================================
    // GENERATE SLUG
    // ============================================================

    generateSlug(): void {

        this.product.slug =
            this.product.name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
    }


    // ============================================================
    // GENERATE SKU
    // ============================================================

    generateSku(): void {

        if (
            !this.product.sku.trim()
        ) {

            const randomNumber =
                Math.floor(
                    1000 +
                    Math.random() * 9000
                );

            this.product.sku =
                `ANP-${randomNumber}`;
        }
    }


    // ============================================================
    // PRICE VALIDATION
    // ============================================================

    validatePrice(): boolean {

        if (
            this.product.salePrice >
            this.product.price
        ) {

            window.alert(
                'Sale price cannot be greater than regular price.'
            );

            return false;
        }

        return true;
    }


    // ============================================================
    // SAVE
    // ============================================================

    saveProduct(): void {

        if (
            !this.product.name.trim()
        ) {

            window.alert(
                'Please enter product name.'
            );

            return;
        }


        if (
            !this.product.category
        ) {

            window.alert(
                'Please select product category.'
            );

            return;
        }


        if (
            !this.product.sku.trim()
        ) {

            this.generateSku();
        }


        if (
            !this.product.shortDescription.trim()
        ) {

            window.alert(
                'Please enter short description.'
            );

            return;
        }


        if (
            !this.product.description.trim()
        ) {

            window.alert(
                'Please enter product description.'
            );

            return;
        }


        if (
            this.product.price <= 0
        ) {

            window.alert(
                'Please enter a valid regular price.'
            );

            return;
        }


        if (
            this.product.salePrice < 0
        ) {

            window.alert(
                'Sale price cannot be negative.'
            );

            return;
        }


        if (!this.validatePrice()) {
            return;
        }


        if (
            this.product.stock < 0
        ) {

            window.alert(
                'Stock cannot be negative.'
            );

            return;
        }


        if (
            !this.product.slug.trim()
        ) {

            this.generateSlug();
        }


        if (this.isEditMode) {

            console.log(
                'Updating product:',
                this.product
            );

        } else {

            console.log(
                'Creating product:',
                this.product
            );

        }


        window.alert(
            this.isEditMode
                ? 'Product updated successfully.'
                : 'Product added successfully.'
        );


        this.router.navigate([
            '/admin/products'
        ]);

    }


    // ============================================================
    // CANCEL
    // ============================================================

    cancel(): void {

        this.router.navigate([
            '/admin/products'
        ]);
    }

}