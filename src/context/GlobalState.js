import { useState, createContext } from 'react';
import UserAPI from './UserAPI';
import CartAPI from './CartAPI';
import ProductAPI from './ProductAPI';
import PostAPI from './PostAPI';
import AccountAPI from './AccountAPI';
import RateAPI from './RateAPI';
import BoughtAPI from './BoughtAPI';
import SellAPI from './SellAPI';
import TypeAPI from './TypeAPI';
import LoginAPI from './LoginAPI';
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const state = {
        loading: [loading, setLoading],
        UserAPI: UserAPI(),
        CartAPI: CartAPI(),
        ProductAPI: ProductAPI(),
        PostAPI: PostAPI(),
        AccountAPI: AccountAPI(),
        RateAPI: RateAPI(),
        BoughtAPI: BoughtAPI(),
        SellAPI: SellAPI(),
        TypeAPI: TypeAPI(),
        LoginAPI: LoginAPI(),
    };
    return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
