import WidgetSetting from "../../models/WidgetSetting";
import SetlistSong from "./SetlistSong";

export default interface SetlistSettings extends WidgetSetting {
    songs : SetlistSong[]
}