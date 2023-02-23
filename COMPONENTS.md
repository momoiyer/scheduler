# Scheduler project breakdown

## Components

- Button
- DayList
- DayListItem
- InterviewerList
- InterviewerListItem
- Appointment
- Appointment/Header
- Appointment/Empty
- Appointment/Show
- Appointment/Form
- Appointment/Status
- Appointment/Error
- Appointment/Confirm

### Button

- State: NO STATE
- Props: confirm (boolean), disabled (boolean), danger, boolean, onClick (function), clickable
- Used by: EVERYONE

### DayList

- State: NONE

- Props:
  * days:Array an array of objects (each object represents a day and includes an id, name, and spots)
  * day:String the currently selected day
  * setDay:Function sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday"

- Used by: Application

### DayListItem

- State: NONE

- Props:
  * name:String the name of the day
  * spots:Number the number of spots remaining
  * selected:Boolean true or false declaring that this day is selected
  * setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

- Used by: DayList

### InterviewerList

- State: NONE

- Props: 
  * id:number - the id of the interviewer
  * name:string - the name of the interviewer
  * avatar:url - a url to an image of the interviewer
  * elected:boolean - determines if an interviewer is selected or not and displays the name and applies appropriate styles if selected
  * setInterviewer:function - is run when the <InterviewerListItem> is clicked. This function receives the interviewer's id as an argument. It sets the selected interviewer.

- Used by: Application

### InterviewerListItem

- State: NONE

- Props:
  * id:number - the id of the interviewer
  * name:string - the name of the interviewer
  * avatar:url - a url to an image of the interviewer
  * selected:boolean - determines if an interviewer is selected or not and displays the name and applies appropriate styles if selected.
  * setInterviewer:function - is run when the <InterviewerListItem> is clicked. This function receives the interviewer's id as an argument. It sets the selected interviewer.

- Used by: InterviewerList

### Appointment

- State:
- Props:
- Used by:

### Appointment/Header

- State: NONE

- Props: 
  * time:String - the time of the appointment (e.g "12pm")
  
- Used by: Appointment

### Appointment/Empty

- State: NONE

- Props:
  * onAdd:Function - It should be called when the user clicks the Add button.

- Used by: Appointment

### Appointment/Show

- State: NONE

- Props:
  * student:String eg. "Lydia Miller-Jones"
  * interviewer:Object we can use the interview object that already exists in stories/index.js for this
  * onEdit:Function to be called when the user clicks the Edit button
  * onDelete:Function to be called when the user clicks the Delete button

- Used by: Appointment

### Appointment/Form

- State:
  * student:String
  * interviewer:Number

- Props:
  * student:String
  * interviewers:Array
  * interviewer:Number
  * onSave:Function
  * onCancel:Function

- Used by:

### Appointment/Status

- State: NONE

- Props:
  * message:String eg. "Deleting"

- Used by: Appointment

### Appointment/Error

- State: NONE

- Props:
  * message:String eg. "Could not delete appointment."
  * onClose:Function to be called when the user clicks the Close button

- Used by: Appointment

### Appointment/Confirm

- State: NONE

- Props:
  * message:String eg. "Delete the appointment?"
  * onConfirm:Function to be called when the user clicks the Confirm button
  * onCancel:Function to be called when the user clicks the Cancel button

- Used by: Appointment
