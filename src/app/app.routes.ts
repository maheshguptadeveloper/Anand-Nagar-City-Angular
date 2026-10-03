import { Routes } from '@angular/router';

export const routes: Routes = [

    // ============================================
    // DEFAULT
    // ============================================

    {
        path: '',
        redirectTo: 'admin/login',
        pathMatch: 'full'
    },


    // ============================================
    // LOGIN
    // ============================================

    {
        path: 'admin/login',
        loadComponent: () =>
            import('./pages/login/login')
                .then(m => m.Login)
    },


    // ============================================
    // ADMIN LAYOUT
    // ============================================

    {
        path: 'admin',

        loadComponent: () =>
            import('./layout/admin-layout/admin-layout')
                .then(m => m.AdminLayout),

        children: [

            // =====================================
            // DASHBOARD
            // =====================================

            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./pages/dashboard/dashboard')
                        .then(m => m.Dashboard)
            },


            // =====================================
            // USERS - LIST
            // =====================================

            {
                path: 'users',
                loadComponent: () =>
                    import('./pages/users/users')
                        .then(m => m.Users)
            },


            // =====================================
            // USERS - ADD
            // =====================================

            {
                path: 'users/add',
                loadComponent: () =>
                    import('./pages/user-form/user-form')
                        .then(m => m.UserForm)
            },


            // =====================================
            // USERS - EDIT
            // =====================================

            {
                path: 'users/edit/:id',
                loadComponent: () =>
                    import('./pages/user-form/user-form')
                        .then(m => m.UserForm)
            },


            // =====================================
            // ROLES & PERMISSIONS - LIST
            // =====================================

            {
                path: 'roles',
                loadComponent: () =>
                    import('./pages/roles/roles')
                        .then(m => m.Roles)
            },


            // =====================================
            // ROLES & PERMISSIONS - ADD
            // =====================================

            {
                path: 'roles/add',
                loadComponent: () =>
                    import('./pages/role-form/role-form')
                        .then(m => m.RoleForm)
            },


            // =====================================
            // ROLES & PERMISSIONS - EDIT
            // =====================================

            {
                path: 'roles/edit/:id',
                loadComponent: () =>
                    import('./pages/role-form/role-form')
                        .then(m => m.RoleForm)
            },


            // =====================================
            // BANNERS - LIST
            // =====================================

            {
                path: 'banners',
                loadComponent: () =>
                    import('./pages/banners/banners')
                        .then(m => m.Banners)
            },


            // =====================================
            // BANNERS - ADD
            // =====================================

            {
                path: 'banners/add',
                loadComponent: () =>
                    import('./pages/banner-form/banner-form')
                        .then(m => m.BannerForm)
            },


            // =====================================
            // BANNERS - EDIT
            // =====================================

            {
                path: 'banners/edit/:id',
                loadComponent: () =>
                    import('./pages/banner-form/banner-form')
                        .then(m => m.BannerForm)
            },


            // =====================================
            // EVENTS - LIST
            // =====================================

            {
                path: 'events',
                loadComponent: () =>
                    import('./pages/events/events')
                        .then(m => m.Events)
            },


            // =====================================
            // EVENTS - ADD
            // =====================================

            {
                path: 'events/add',
                loadComponent: () =>
                    import('./pages/event-form/event-form')
                        .then(m => m.EventForm)
            },


            // =====================================
            // EVENTS - EDIT
            // =====================================

            {
                path: 'events/edit/:id',
                loadComponent: () =>
                    import('./pages/event-form/event-form')
                        .then(m => m.EventForm)
            },


            // =====================================
            // NEWS & UPDATES - LIST
            // =====================================

            {
                path: 'news',
                loadComponent: () =>
                    import('./pages/news/news')
                        .then(m => m.News)
            },


            // =====================================
            // NEWS & UPDATES - ADD
            // =====================================

            {
                path: 'news/add',
                loadComponent: () =>
                    import('./pages/news-form/news-form')
                        .then(m => m.NewsForm)
            },


            // =====================================
            // NEWS & UPDATES - EDIT
            // =====================================

            {
                path: 'news/edit/:id',
                loadComponent: () =>
                    import('./pages/news-form/news-form')
                        .then(m => m.NewsForm)
            },


            // =====================================
            // PAGES - LIST
            // =====================================

            {
                path: 'pages',
                loadComponent: () =>
                    import('./pages/pages/pages')
                        .then(m => m.Pages)
            },


            // =====================================
            // PAGES - ADD
            // =====================================

            {
                path: 'pages/add',
                loadComponent: () =>
                    import('./pages/page-form/page-form')
                        .then(m => m.PageForm)
            },


            // =====================================
            // PAGES - EDIT
            // =====================================

            {
                path: 'pages/edit/:id',
                loadComponent: () =>
                    import('./pages/page-form/page-form')
                        .then(m => m.PageForm)
            },


            // =====================================
// ALBUMS - LIST
// =====================================

{
    path: 'albums',
    loadComponent: () =>
        import('./pages/albums/albums/albums')
            .then(m => m.Albums)
},


// =====================================
// ALBUMS - ADD
// =====================================

{
    path: 'albums/add',
    loadComponent: () =>
        import('./pages/album-form/album-form/album-form')
            .then(m => m.AlbumForm)
},


// =====================================
// ALBUMS - EDIT
// =====================================

{
    path: 'albums/edit/:id',
    loadComponent: () =>
        import('./pages/album-form/album-form/album-form')
            .then(m => m.AlbumForm)
},


// =====================================
// MEDIA - LIST
// =====================================

{
    path: 'media',
    loadComponent: () =>
        import('./pages/media/media/media')
            .then(m => m.Media)
},


// =====================================
// MEDIA - ADD
// =====================================

{
    path: 'media/add',
    loadComponent: () =>
        import('./pages/media-form/media-form/media-form')
            .then(m => m.MediaForm)
},


// =====================================
// MEDIA - EDIT
// =====================================

{
    path: 'media/edit/:id',
    loadComponent: () =>
        import('./pages/media-form/media-form/media-form')
            .then(m => m.MediaForm)
},





        ]
    },


    // ============================================
    // UNKNOWN URL
    // ============================================

    {
        path: '**',
        redirectTo: 'admin/dashboard'
    }

];