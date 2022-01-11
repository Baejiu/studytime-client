import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { axiosErrorHandler } from '../../../utils/axios-error.handler';
import request from '../../../utils/request';
import { IEventDetail } from '../../../utils/types/event-detail.interface';
import { IEvent } from '../../../utils/types/event.interface';
import { IPaginatedResult } from '../../../utils/types/paginated-result.interface';
import { EventAcionType } from '../../action-types/events/events.action-type';
import { EventActions } from '../../actions';

export const handleFetchAllEvents =
  (page: number, search?: string) =>
  async (dispatch: Dispatch<EventActions>) => {
    dispatch({ type: EventAcionType.FETCH_EVENTS });

    try {
      const { data } = await request<IPaginatedResult<IEvent>>(
        'GET',
        '/events',
        { search, page }
      );
      dispatch({ type: EventAcionType.FETCH_EVENTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EventAcionType.FETCH_EVENTS_ERROR,
        payload: axiosErrorHandler(error as AxiosError),
      });
    }
  };

export const handleCreateEvent =
  (dto: Partial<IEvent>) => async (dispatch: Dispatch<EventActions>) => {
    dispatch({ type: EventAcionType.CREATE_EVENT });

    try {
      const { data } = await request<IEvent>(
        'POST',
        '/events',
        {},
        {
          ...dto,
        }
      );

      dispatch({ type: EventAcionType.CREATE_EVENT_SUCCESS, payload: data });

      const { data: eventList } = await request<IPaginatedResult<IEvent>>(
        'GET',
        '/events',
        { page: 1 }
      );

      dispatch({
        type: EventAcionType.FETCH_EVENTS_SUCCESS,
        payload: eventList,
      });
    } catch (error) {
      dispatch({
        type: EventAcionType.CREATE_EVENT_ERROR,
        payload: axiosErrorHandler(error as AxiosError),
      });
    }
  };

export const handleFetchEventDetailsByEventId =
  (eventId: number) => async (dispatch: Dispatch<EventActions>) => {
    dispatch({ type: EventAcionType.FETCH_EVENT_DETAILS_BY_EVENT_ID });

    try {
      const { data } = await request<{
        event: IEvent;
        details: IEventDetail[];
      }>('GET', `/events/${eventId}`);

      dispatch({
        type: EventAcionType.FETCH_EVENT_DETAILS_BY_EVENT_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EventAcionType.FETCH_EVENT_DETAILS_BY_EVENT_ID_ERROR,
        payload: axiosErrorHandler(error as AxiosError),
      });
    }
  };

export const handleCreateEventDetail =
  (eventId: number, dto: any) => async (dispatch: Dispatch<EventActions>) => {
    dispatch({ type: EventAcionType.CREATE_EVENT_DETAIL });

    try {
      const { data } = await request<IEventDetail>(
        'POST',
        `/events/${eventId}/details`,
        {},
        dto
      );

      dispatch({
        type: EventAcionType.CREATE_EVENT_DETAIL_SUCCESS,
        payload: data,
      });

      const { data: eventDetails } = await request<{
        event: IEvent;
        details: IEventDetail[];
      }>('GET', `/events/${eventId}`);

      dispatch({
        type: EventAcionType.FETCH_EVENT_DETAILS_BY_EVENT_ID_SUCCESS,
        payload: eventDetails,
      });
    } catch (error) {
      dispatch({
        type: EventAcionType.CREATE_EVENT_DETAIL_ERROR,
        payload: axiosErrorHandler(error as AxiosError),
      });
    }
  };
