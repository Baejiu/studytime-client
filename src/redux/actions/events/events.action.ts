import { IEventDetail } from '../../../utils/types/event-detail.interface';
import { IEvent } from '../../../utils/types/event.interface';
import { IEvents } from '../../../utils/types/events.interface';
import { IPaginatedResult } from '../../../utils/types/paginated-result.interface';

import { EventAcionType } from '../../action-types/events/events.action-type';

interface IFetchEventsAction {
  type: EventAcionType.FETCH_EVENTS;
}

interface IFetchEventsSuccessAction {
  type: EventAcionType.FETCH_EVENTS_SUCCESS;
  payload: IPaginatedResult<IEvents>;
}

interface IFetchEventsErrorAction {
  type: EventAcionType.FETCH_EVENTS_ERROR;
  payload: string;
}

interface ICreateEventAction {
  type: EventAcionType.CREATE_EVENT;
}

interface ICreateEventSuccessAction {
  type: EventAcionType.CREATE_EVENT_SUCCESS;
  payload: IEvent;
}

interface ICreateEventErrorAction {
  type: EventAcionType.CREATE_EVENT_ERROR;
  payload: string;
}

interface IFetchEventDetailByEventIdAction {
  type: EventAcionType.FETCH_EVENT_DETAILS_BY_EVENT_ID;
}

interface IFetchEventDetailByEventIdSuccessAction {
  type: EventAcionType.FETCH_EVENT_DETAILS_BY_EVENT_ID_SUCCESS;
  payload: {
    event: IEvent;
    details: IEventDetail[];
  };
}

interface IFetchEventDetailByEventIdErrorAction {
  type: EventAcionType.FETCH_EVENT_DETAILS_BY_EVENT_ID_ERROR;
  payload: string;
}

export type EventActions =
  | IFetchEventDetailByEventIdAction
  | IFetchEventDetailByEventIdErrorAction
  | IFetchEventDetailByEventIdSuccessAction
  | ICreateEventAction
  | ICreateEventErrorAction
  | ICreateEventSuccessAction
  | IFetchEventsAction
  | IFetchEventsErrorAction
  | IFetchEventsSuccessAction;