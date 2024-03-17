interface ScheduleBoard {
  _id: string;
  dateStart: string;
  dateEnd: string;
  status: string;
  venue_id: string;
}

export interface ScheduleBoardResponse {
  data: ScheduleBoard[];
}
