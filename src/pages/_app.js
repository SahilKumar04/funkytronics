import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { wrapper } from "@/store/store";

import Navbar from "../../components/Navbar";

function MyApp({ Component, pageProps, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const persistor = persistStore(store);


  return (<>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navbar />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </>)
}
export default MyApp;