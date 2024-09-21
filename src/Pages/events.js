import EDialogues from "../Components/EventPageComp/Js/eDialogues";
import EventsHeadline from "../Components/EventPageComp/Js/eventHeadlines";
import EventHeader from "../Components/EventPageComp/Js/eventHeader";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";
import SacSummit from "../Components/EventPageComp/Js/sacSummit";
import UpcomingEvent from "../Components/EventPageComp/Js/upcomingevents";

export default function EventsPage() {
  return (
    <div>
      <MinimizedHeader />
      <EventHeader />
      <EventsHeadline />
      <UpcomingEvent />
      <SacSummit />
      <EDialogues />
    </div>
  );
}
