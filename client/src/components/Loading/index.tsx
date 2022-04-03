import { ReactElement } from "react";
import { useLoading } from "../../contexts/useLoading";

import "./styles.css";

const Loading: React.FC = (): ReactElement | null => {
    const {isLoading} = useLoading();

    if(!isLoading){
        return null;
    }

    return(
        <div className="loading">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default Loading;