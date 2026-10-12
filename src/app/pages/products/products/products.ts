import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface ProductItem {
    id: number;
    name: string;
    slug: string;
    sku: string;
    category: string;
    brand: string;
    price: number;
    salePrice: number;
    stock: number;
    unit: string;
    status: 'Active' | 'Inactive' | 'Draft';
    featured: boolean;
    image: string;
    createdDate: string;
}

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './products.html',
    styleUrl: './products.css'
})
export class Products {

    searchText = '';
    selectedCategory = '';
    selectedStatus = '';
    selectedStock = '';

    currentPage = 1;
    pageSize = 8;

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

    stockOptions = [
        'In Stock',
        'Low Stock',
        'Out of Stock'
    ];

    products: ProductItem[] = [

        {
            id: 1,
            name: 'Premium Cotton Shirt',
            slug: 'premium-cotton-shirt',
            sku: 'ANP-1001',
            category: 'Clothing',
            brand: 'Anand Fashion',
            price: 1299,
            salePrice: 999,
            stock: 25,
            unit: 'Piece',
            status: 'Active',
            featured: true,
            image: '',
            createdDate: '01 Oct 2026'
        },

        {
            id: 2,
            name: 'Basmati Rice 5 KG',
            slug: 'basmati-rice-5kg',
            sku: 'ANP-1002',
            category: 'Grocery',
            brand: 'Local Choice',
            price: 650,
            salePrice: 599,
            stock: 42,
            unit: 'Pack',
            status: 'Active',
            featured: true,
            image: '',
            createdDate: '29 Sep 2026'
        },

        {
            id: 3,
            name: 'Wireless Bluetooth Speaker',
            slug: 'wireless-bluetooth-speaker',
            sku: 'ANP-1003',
            category: 'Electronics',
            brand: 'SoundPro',
            price: 2499,
            salePrice: 1999,
            stock: 8,
            unit: 'Piece',
            status: 'Active',
            featured: false,
            image: '',
            createdDate: '27 Sep 2026'
        },

        {
            id: 4,
            name: 'Notebook A4 200 Pages',
            slug: 'notebook-a4-200-pages',
            sku: 'ANP-1004',
            category: 'Books & Stationery',
            brand: 'Classmate',
            price: 180,
            salePrice: 160,
            stock: 60,
            unit: 'Piece',
            status: 'Active',
            featured: false,
            image: '',
            createdDate: '25 Sep 2026'
        },

        {
            id: 5,
            name: 'Organic Honey 500 GM',
            slug: 'organic-honey-500gm',
            sku: 'ANP-1005',
            category: 'Food & Beverages',
            brand: 'Pure Nature',
            price: 450,
            salePrice: 399,
            stock: 5,
            unit: 'Bottle',
            status: 'Active',
            featured: true,
            image: '',
            createdDate: '22 Sep 2026'
        },

        {
            id: 6,
            name: 'LED Ceiling Light',
            slug: 'led-ceiling-light',
            sku: 'ANP-1006',
            category: 'Home & Kitchen',
            brand: 'BrightHome',
            price: 1499,
            salePrice: 1199,
            stock: 0,
            unit: 'Piece',
            status: 'Inactive',
            featured: false,
            image: '',
            createdDate: '20 Sep 2026'
        },

        {
            id: 7,
            name: 'Face Wash 100 ML',
            slug: 'face-wash-100ml',
            sku: 'ANP-1007',
            category: 'Beauty & Personal Care',
            brand: 'Nature Care',
            price: 299,
            salePrice: 249,
            stock: 32,
            unit: 'Piece',
            status: 'Active',
            featured: false,
            image: '',
            createdDate: '18 Sep 2026'
        },

        {
            id: 8,
            name: 'Tractor Engine Oil',
            slug: 'tractor-engine-oil',
            sku: 'ANP-1008',
            category: 'Agriculture',
            brand: 'PowerMax',
            price: 850,
            salePrice: 799,
            stock: 12,
            unit: 'Litre',
            status: 'Draft',
            featured: false,
            image: '',
            createdDate: '15 Sep 2026'
        },

        {
            id: 9,
            name: 'Car Cleaning Kit',
            slug: 'car-cleaning-kit',
            sku: 'ANP-1009',
            category: 'Automobile',
            brand: 'AutoCare',
            price: 799,
            salePrice: 699,
            stock: 18,
            unit: 'Kit',
            status: 'Active',
            featured: false,
            image: '',
            createdDate: '12 Sep 2026'
        }
    ];


    constructor(
        private router: Router
    ) { }


    // ============================================================
    // FILTERED PRODUCTS
    // ============================================================

    get filteredProducts(): ProductItem[] {

        const search =
            this.searchText
                .trim()
                .toLowerCase();

        return this.products.filter(product => {

            const matchesSearch =
                !search ||
                product.name
                    .toLowerCase()
                    .includes(search) ||
                product.sku
                    .toLowerCase()
                    .includes(search) ||
                product.brand
                    .toLowerCase()
                    .includes(search) ||
                product.category
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =
                !this.selectedCategory ||
                product.category === this.selectedCategory;

            const matchesStatus =
                !this.selectedStatus ||
                product.status === this.selectedStatus;

            const matchesStock =
                !this.selectedStock ||
                (
                    this.selectedStock === 'In Stock' &&
                    product.stock > 10
                ) ||
                (
                    this.selectedStock === 'Low Stock' &&
                    product.stock > 0 &&
                    product.stock <= 10
                ) ||
                (
                    this.selectedStock === 'Out of Stock' &&
                    product.stock === 0
                );

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus &&
                matchesStock
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
                this.filteredProducts.length /
                this.pageSize
            )
        );
    }


    // ============================================================
    // PAGINATED PRODUCTS
    // ============================================================

    get paginatedProducts(): ProductItem[] {

        const start =
            (this.currentPage - 1) *
            this.pageSize;

        return this.filteredProducts.slice(
            start,
            start + this.pageSize
        );
    }


    // ============================================================
    // PAGE NUMBERS
    // ============================================================

    get pageNumbers(): number[] {

        return Array.from(
            { length: this.totalPages },
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
    // CLEAR FILTERS
    // ============================================================

    clearFilters(): void {

        this.searchText = '';
        this.selectedCategory = '';
        this.selectedStatus = '';
        this.selectedStock = '';

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
    // EDIT
    // ============================================================

    editProduct(id: number): void {

        this.router.navigate([
            '/admin/products/edit',
            id
        ]);
    }


    // ============================================================
    // DELETE
    // ============================================================

    deleteProduct(id: number): void {

        const product =
            this.products.find(
                x => x.id === id
            );

        if (!product) {
            return;
        }

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${product.name}"?`
            );

        if (!confirmed) {
            return;
        }

        this.products =
            this.products.filter(
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
    // FEATURED
    // ============================================================

    toggleFeatured(
        product: ProductItem
    ): void {

        product.featured =
            !product.featured;
    }


    // ============================================================
    // STATUS CLASS
    // ============================================================

    getStatusClass(
        status: ProductItem['status']
    ): string {

        switch (status) {

            case 'Active':
                return 'status-active';

            case 'Inactive':
                return 'status-inactive';

            default:
                return 'status-draft';
        }
    }


    // ============================================================
    // STOCK CLASS
    // ============================================================

    getStockClass(stock: number): string {

        if (stock === 0) {
            return 'stock-out';
        }

        if (stock <= 10) {
            return 'stock-low';
        }

        return 'stock-good';
    }


    // ============================================================
    // STOCK TEXT
    // ============================================================

    getStockText(stock: number): string {

        if (stock === 0) {
            return 'Out of Stock';
        }

        if (stock <= 10) {
            return 'Low Stock';
        }

        return 'In Stock';
    }


    // ============================================================
    // TRACK BY
    // ============================================================

    trackById(
        index: number,
        product: ProductItem
    ): number {

        return product.id;
    }
}