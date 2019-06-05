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

// import ArticleList from '../views/article/list';
// import ArticleNew from '../views/article/new';
// import TagList from '../views/tag/list';
// import WorkList from '../views/work/list';
// import WorkNew from '../views/work/new';
// import FileUpload from '../views/upload/file-upload';
// import SettingMine from '../views/setting/mine';
// import SettingUpyun from '../views/setting/upyun';
// import SettingAbout from '../views/setting/about';

// 不显示在菜单路由里
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

// 显示在菜单路由里
export const appRouter = [
    {
        path: '/app/article',
        title: '文章',
        icon: 'article',
        sub: [{
            path: '/app/article/list',
            title: '文章列表',
            icon: '',
            // component: ArticleList
        }, {
            path: '/app/article/new',
            title: '写文章',
            icon: '',
            // component: ArticleNew
        }],
    },
    {
        path: '/app/tag',
        title: '标签',
        icon: 'tag',
        sub: [{
            path: '/app/tag/list',
            title: '标签列表',
            icon: '',
            // component: TagList
        }],
    },
    {
        path: '/app/work',
        title: '作品',
        icon: 'work',
        sub: [{
            path: '/app/work/list',
            title: '作品列表',
            icon: '',
            // component: WorkList
        }, {
            path: '/app/work/new',
            title: '写作品',
            icon: '',
            // component: WorkNew
        }],
    },
    {
        path: '/app/upload',
        title: '上传',
        icon: 'upload',
        sub: [{
            path: '/app/upload/list',
            title: '文件列表',
            icon: '',
            // component: FileUpload
        }],
    },
    {
        path: '/app/setting',
        title: '设置',
        icon: 'setting',
        sub: [{
            path: '/app/setting/mine',
            title: '个人信息',
            icon: '',
            // component: SettingMine
        }, {
            path: '/app/setting/upyun',
            title: '又拍云',
            icon: '',
            // component: SettingUpyun
        }, {
            path: '/app/setting/about',
            title: '关于',
            icon: '',
            // component: SettingAbout
        }],
    },
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
