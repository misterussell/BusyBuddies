export default class Activity {
  /*
    this will handle all activity methods
    todo: provision a SQL db for these
    MVP structure for an event:
      {
        id: unique ID, (ids generated with a library)
        calendarID: unique ID referencing the Calendar the activity is saved to, (defaults to a general calendar)
        title: str,
        description: str,
        externalURL: url,
        date: date,
        startAt: date/time
        endAt: date/time
        allDay: bool,
        private: bool,
        archived: bool,
        archivedAt: date/time
        tags: arr, (no more than 5 tags can be added to an activity, these are SQl db entries so can be shared between activities)
      }
  */
  constructor(calendarID) {
    this.calendarID = calendarID;

  }
}
