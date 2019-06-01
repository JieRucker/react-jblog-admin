export const menus = [{
    path: '/app/index',
    title: '首页',
    icon: 'home'
},
    {
        path: '/app/blog',
        title: '博客',
        icon: 'edit',
        sub: [{
            path: '/app/blog/publish',
            title: '发布博客',
            icon: ''
        }],
    },
    {
        path: '/app/catalog',
        title: '分类',
        icon: 'exception',
        sub: [{
            path: '/app/catalog/list',
            title: '分类列表',
            icon: ''
        }, {
            path: '/app/catalog/new',
            title: '创建分类',
            icon: ''
        }]
    },
    {
        path: '/app/collect',
        title: '收藏',
        icon: 'star',
        sub: [{
            path: '/app/collect/list',
            title: '收藏列表',
            icon: ''
        }, {
            path: '/app/collect/new',
            title: '添加收藏',
            icon: ''
        }]
    }
]
