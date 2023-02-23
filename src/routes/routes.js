// import config from '~/config';

// //Layout
// import { HeaderOnly } from '~/layouts';
// import { useContext, useState } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import LayoutSidebar from '~/layouts/LayoutSidebar';
import LayoutAdmin from '~/layouts/LayoutAdmin';
import LayoutNoneHeader from '~/layouts/LayoutNoneHeader';
import LayoutManager from '~/layouts/LayoutManager';

//Pages
import Home from '~/pages/Home';
import { HomeAdmin } from '~/pages/Admin/Home';
import { PostAdmin } from '~/pages/Admin/Post';
import { UserAdmin } from '~/pages/Admin/User';
import { TypeAdmin } from '~/pages/Admin/Type';
import Login from '~/pages/Login';
import Search from '~/pages/Search';
import CreatePost from '~/pages/CreatePost';
import InformationPost from '~/pages/InformationPost';
import Information from '~/pages/Information';
import Notifications from '~/pages/Notifications';
import PostDetail from '~/pages/PostDetail';
import History from '../pages/History';
// import Chat from '~/pages/Chat';
import Policy from '~/pages/Policy';
import {PostReportManager} from '~/pages/Manager/PostReport';
import { ShopReportManager } from '~/pages/Manager/ShopReport';
import Chat from '~/pages/Chats/Chat';
import PostReport from '~/pages/PostReport'
import ShopReport from '~/pages/ShopReport';

const publicRoutes = [
    { path: '/', component: Login, layout: LayoutNoneHeader },
    { path: '/home', component: Home, layout: LayoutSidebar },
    { path: '/login', component: Login, layout: LayoutNoneHeader },
    { path: '/search', component: Search, layout: LayoutSidebar },
    { path: '/create_post', component: CreatePost, layout: LayoutSidebar },
    { path: '/information', component: Information, layout: LayoutSidebar },
    { path: '/information_post', component: InformationPost, layout: LayoutSidebar },
    { path: '/notifications', component: Notifications, layout: LayoutSidebar },
    { path: '/post_detail', component: PostDetail, layout: LayoutSidebar },
    { path: '/history', component: History, layout: LayoutSidebar },
    { path: '/chat', component: Chat, layout: LayoutSidebar },
    { path: '/post_report', component: PostReport, layout: LayoutSidebar },
    { path: '/shop_report', component: ShopReport, layout: LayoutSidebar },
    { path: '/policy', component: Policy, layout: LayoutSidebar },
    { path: '/admin/home', component: HomeAdmin, layout: LayoutAdmin },
    { path: '/admin/post', component: PostAdmin, layout: LayoutAdmin },
    { path: '/admin/user', component: UserAdmin, layout: LayoutAdmin },
    { path: '/admin/type', component: TypeAdmin, layout: LayoutAdmin },
    { path: '/manager/home', component: Home, layout: LayoutManager },
    { path: '/manager/search', component: Search, layout: LayoutManager },
    { path: '/manager/create_post', component: CreatePost, layout: LayoutManager },
    { path: '/manager/information', component: Information, layout: LayoutManager },
    { path: '/manager/information_post', component: InformationPost, layout: LayoutManager },
    { path: '/manager/notifications', component: Notifications, layout: LayoutManager },
    { path: '/manager/post_detail', component: PostDetail, layout: LayoutManager },
    { path: '/manager/history', component: History, layout: LayoutManager },
    { path: '/manager/chat', component: Chat, layout: LayoutManager },
    { path: '/manager/policy', component: Policy, layout: LayoutManager },
    { path: '/manager/post_report', component: PostReportManager, layout: LayoutManager },
    { path: '/manager/shop_report', component: ShopReportManager, layout: LayoutManager },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
