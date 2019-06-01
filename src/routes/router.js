/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/1 15:14
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/1 15:14
 */

import Index from '../views/index/index'
import Publish from '../views/publish/publish'
import Edit from '../views/edit/edit'
import CatalogNew from '../views/catalog/catalognew'
import CatalogList from '../views/catalog/cataloglist'
import CatalogEdit from '../views/catalog/catalogedit'
import StarNew from '../views/star/starnew'
import StarList from '../views/star/starlist'
import StarEdit from '../views/star/staredit'

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = [
    {
        title: '编辑博客',
        path: '/app/blog/edit/:id',
        component: Edit
    },
    {
        title: '编辑分类',
        path: '/app/catalog/edit/:id',
        component: CatalogEdit
    },
    {
        title: '编辑收藏',
        path: '/app/collect/edit/:id',
        component: StarEdit
    }
];

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/app/index',
        title: '首页',
        icon: 'home',
        component: Index
    },
    {
        path: '/app/blog',
        title: '博客',
        icon: 'edit',
        sub: [{
            path: '/app/blog/publish',
            title: '发布博客',
            icon: '',
            component: Publish
        }],
    },
    {
        path: '/app/catalog',
        title: '分类',
        icon: 'exception',
        sub: [{
            path: '/app/catalog/list',
            title: '分类列表',
            icon: '',
            component: CatalogList
        }, {
            path: '/app/catalog/new',
            title: '创建分类',
            icon: '',
            component: CatalogNew
        }]
    },
    {
        path: '/app/collect',
        title: '收藏',
        icon: 'star',
        sub: [{
            path: '/app/collect/list',
            title: '收藏列表',
            icon: '',
            component: StarList
        }, {
            path: '/app/collect/new',
            title: '添加收藏',
            icon: '',
            component: StarNew
        }]
    }
];

export const appRouterMethod = (() => {
    let routes = [];

    return () => {
        appRouter.forEach(item => {
            item.component && routes.push(item);

            if (item.sub && item.sub.length)
                item.sub.map(sub => routes.push(sub))
        });

        return routes
    }
})();

export const routers = [
    ...otherRouter,
    ...appRouterMethod(),
];
