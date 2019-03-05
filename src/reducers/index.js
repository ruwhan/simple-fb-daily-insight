import { combineReducers } from "redux";
import auth from "./authReducer";
import adAccounts from "./adAccountsReducer";
import campaigns from "./campaignsReducer";
import insights from "./insightsReducer";
import insightBreakDown from "./insightBreakDownReducer";
import profiles from "./profileReducer";
import visualPanels from "./visualPanelReducer";

export default combineReducers({
  auth,
  adAccounts,
  campaigns,
  insights,
  insightBreakDown,
  profiles,
  visualPanels
});
