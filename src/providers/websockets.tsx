import React, { useContext, useEffect, useRef } from 'react';

/**
 * https://aravindballa.com/writings/custom-hook-to-listen-websockets/
 */
export const SocketContext = React.createContext<{ socket : WebSocket }>({ socket : null });

export const useSocketSubscribe = (eventName = "message", eventHandler : (event : any) => void) => {
    // Get the socket instance
    const { socket } = useContext(SocketContext);

    // when the component, *which uses this hook* mounts,
    // add a listener.
    useEffect(() => {
        console.log('SB: adding listener', eventName);
        socket.addEventListener(eventName, eventHandler);

        // Remove when it unmounts
        return () => {
            console.log('SB: removing listener', eventName);
            socket.removeEventListener(eventName, eventHandler);
        };

    // Sometimes the handler function gets redefined
    // when the component using this hook updates (or rerenders)
    // So adding a dependency makes sure the handler is
    // up to date!
    }, [eventHandler]);

};

const SocketProvider : React.FC = ({ children }) => {
    const socket = useRef(new WebSocket('ws://127.0.0.1:8080'));

    useEffect(() => {
        socket.current.onopen = () => {
          console.log('SB: Connected and authenticated');

          socket.current.send(JSON.stringify(
                {
                    "request": "Subscribe",
                    "events": {
                        "general": [
                            "Custom"
                        ],
                        "Twitch": [
                            "RewardRedemption",
                            "FirstWord"
                        ]
                    },
                    "id": "123"
                }
            ));
        };
    
        return () => {
          if (socket && socket.current) {
            socket.current.close();
          }
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket: socket.current }}>{children}</SocketContext.Provider>
    );
};

export default SocketProvider;