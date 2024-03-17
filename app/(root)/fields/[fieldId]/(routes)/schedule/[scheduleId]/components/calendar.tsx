import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { formattedTime } from "@/lib/utils";
import { AlertDialogDelete } from "@/components/shared/alert-delete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ActionDateForm } from "./action-date-form";
import idLocale from "@fullcalendar/core/locales/id";

interface CalendarProps {
  events: any[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const eventList = events.map((event, index) => ({
    start: event.timeStart,
    title: event.status,
    end: event.timeEnd,
    idSession: event._id,
    price: event.price,
    dateSelected: new Date(event.date).toDateString(), // Get the date of the session
    index: index + 1 // Get the index of the session (1-based)
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      timeZone="Asia/Jakarta"
      locale={idLocale}
      locales={[idLocale]}
      events={eventList}
      nowIndicator={false}
      headerToolbar={{
        left: "title",
        right: "prev,next"
      }}
      eventClick={(info) => console.log(info.event)}
      eventContent={(arg) => (
        <>
          <Dialog>
            <DialogTrigger className="w-full border bordsr-gray rounded">
              <div>
                <p>Session #{arg.event.extendedProps.index}</p>
                <p>
                  Time: {formattedTime(arg.event.startStr)} - {formattedTime(arg.event.endStr)}
                </p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{arg.event.extendedProps.dateSelected}</DialogTitle>
                <ActionDateForm data={arg.event} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      )}
    />
  );
};

export default Calendar;
