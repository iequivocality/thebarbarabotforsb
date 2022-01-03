import React, { useEffect } from 'react';
import { Tabs } from 'react-bootstrap';
// import WidgetsService from '../services/WidgetsService';

const WidgetsCenter = () => {
    // let widgetService = useRef(WidgetsService.getInstance());
    // let [ widgetSettings, setWidgetSettings ] = useState(widgetService.current.getWidgetSettings());

    // let widgetSettings : WidgetSetting[] = useSelector((state : RootState) => state.widgetSettings);
    useEffect(() => {
        // let widgetServiceCurrent = widgetService.current;
        
        // widgetServiceCurrent.setWidgetCenterListener((widgetSettings : WidgetSetting[]) => {
        //     setWidgetSettings(widgetSettings);
        //     // console.log("widgets", widgetSettings);
        // });

        // return () => { widgetServiceCurrent.clearWidgetCenterListener(); }
    }, []);


    return (
        <div>
            <h4 style={{marginTop: 20, marginBottom: 20}}>Widgets Center</h4>
            <Tabs defaultActiveKey="profile">
                {/* {widgetSettings && widgetSettings.map(getTab)} */}
            </Tabs>
        </div>
    );
}
export default WidgetsCenter;