import React, { createContext, useEffect, useState } from 'react';

interface LoadingContextData {
    isLoading: boolean | null;
    start(): void;
    stop(): void;
}

const LoadingContext = createContext<LoadingContextData>({} as LoadingContextData);

export const LoadingProvider = ({children}: {children: any}) => {
    const [isLoading, setIsLoading] = useState(false);

    function start(){
        setIsLoading(true);
    }  

    function stop(){
        setIsLoading(false);
    }
    

    return(
        <LoadingContext.Provider value={{isLoading, start, stop}}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => React.useContext(LoadingContext);