import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { publicRoutes } from './routes';
// import { DefaultLayout } from './layouts';
import { useContext } from 'react';

import { GlobalState } from './context/GlobalState';
import ScrollToTop from '~/routes/ScrollToTop';
//import UserAPI from '~/context/UserAPI';

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
import History from '~/pages/History';
// import Chat from '~/pages/Chat';
import Policy from '~/pages/Policy';
import {PostReportManager} from '~/pages/Manager/PostReport';
import { ShopReportManager } from '~/pages/Manager/ShopReport';
import { InformationManager } from '~/pages/Manager/Information';
import { InformationPostManager } from '~/pages/Manager/InformationPost';
import { CreatePostManager } from '~/pages/Manager/CreatePost';
import Chat from '~/pages/Chats/Chat';
import PostReport from '~/pages/PostReport'
import ShopReport from '~/pages/ShopReport';
import Param from '~/pages/Param';
import { ParamAdmin } from '~/pages/Admin/Param';
import { ParamManager } from '~/pages/Manager/Param';
import { HomeManager } from '~/pages/Manager/Home';
import { SearchManager } from '~/pages/Manager/Search';
import { UserManager } from '~/pages/Manager/User';
import { ChatManager } from './pages/Manager/Chats';

function App() {
    const state = useContext(GlobalState);
    const isLogin = state.LoginAPI.isLogin[0];

    return (
        <Router>
            <div className="App">
                <ScrollToTop>
                <Routes>
                    <Route exact path="/" element={<LayoutNoneHeader><Login /></LayoutNoneHeader>} />
                    <Route exact path="/login" element={<LayoutNoneHeader><Login /></LayoutNoneHeader>} />
                    {/* User */}
                    <Route exact path="/home" element={isLogin ? <LayoutSidebar><Home /></LayoutSidebar> : <Navigate to='/' />} />
                    <Route exact path="/search" element={isLogin ? <LayoutSidebar><Search /></LayoutSidebar> : <Navigate to='/' />} />
                    <Route exact path="/create_post" element={isLogin ? <LayoutSidebar><CreatePost /></LayoutSidebar> : <Navigate to='/' />} />
                    <Route exact path="/information" element={isLogin ? <LayoutSidebar><Information /></LayoutSidebar> : <Navigate to='/' />} />
                    <Route exact path="/information_post" element={isLogin ? <LayoutSidebar><InformationPost /></LayoutSidebar> : <Navigate to='/' />} />
                    <Route exact path="/history" element={isLogin ? <LayoutSidebar><History /></LayoutSidebar> : <Navigate to='/' />} />
                    <Route exact path="/chat" element={isLogin ? <LayoutSidebar><Chat /></LayoutSidebar> : <Navigate to='/' />} />
                    <Route exact path="/post_report" element={isLogin ? <LayoutSidebar><PostReport /></LayoutSidebar> : <Navigate to='/' />} />
                    <Route exact path="/shop_report" element={isLogin ? <LayoutSidebar><ShopReport /></LayoutSidebar> : <Navigate to='/' />} />
                    <Route exact path="/policy" element={isLogin ? <LayoutSidebar><Policy /></LayoutSidebar> : <Navigate to='/' />} />
                    <Route exact path="/user_information/:email" element={isLogin ? <LayoutSidebar><Param /></LayoutSidebar> : <Navigate to='/' />} />
                    {/* Admin */}
                    <Route exact path="/admin/home" element={isLogin ? <LayoutAdmin><HomeAdmin /></LayoutAdmin> : <Navigate to='/' />} />
                    <Route exact path="/admin/post" element={isLogin ? <LayoutAdmin><PostAdmin /></LayoutAdmin> : <Navigate to='/' />} />
                    <Route exact path="/admin/user" element={isLogin ? <LayoutAdmin><UserAdmin /></LayoutAdmin> : <Navigate to='/' />} />
                    <Route exact path="/admin/type" element={isLogin ? <LayoutAdmin><TypeAdmin /></LayoutAdmin> : <Navigate to='/' />} />
                    <Route exact path="/admin/information/:email" element={isLogin ? <LayoutAdmin><ParamAdmin /></LayoutAdmin> : <Navigate to='/' />} />
                    {/* Manager */}
                    <Route exact path="/manager/home" element={isLogin ? <LayoutManager><HomeManager /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/search" element={isLogin ? <LayoutManager><SearchManager /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/chat" element={isLogin ? <LayoutManager><ChatManager /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/create_post" element={isLogin ? <LayoutManager><CreatePostManager /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/information" element={isLogin ? <LayoutManager><InformationManager /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/information_post" element={isLogin ? <LayoutManager><InformationPostManager /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/history" element={isLogin ? <LayoutManager><History /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/chat" element={isLogin ? <LayoutManager><Chat /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/post_report" element={isLogin ? <LayoutManager><PostReportManager /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/shop_report" element={isLogin ? <LayoutManager><ShopReportManager /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/policy" element={isLogin ? <LayoutManager><Policy /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/user" element={isLogin ? <LayoutManager><UserManager /></LayoutManager> : <Navigate to='/' />} />
                    <Route exact path="/manager/user_information/:email" element={isLogin ? <LayoutManager><ParamManager /></LayoutManager> : <Navigate to='/' />} />
                </Routes>
                </ScrollToTop>
            </div>
        </Router>
    );
}

export default App;
