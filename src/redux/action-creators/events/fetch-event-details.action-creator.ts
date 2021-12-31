import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { axiosErrorHandler } from '../../../utils/axios-error.handler';
import request from '../../../utils/request';
import { IEventWithDetails } from '../../../utils/types/events.interface';
import { FetchEventsActionType } from '../../action-types';
import { FetchEventsAction } from '../../actions';

export const onFetchEventDetailsByEventId =
  (eventId: number) => async (dispatch: Dispatch<FetchEventsAction>) => {
    dispatch({ type: FetchEventsActionType.FETCH_EVENT_DETAIL });
    try {
      const { data } = await request<IEventWithDetails>(
        'GET',
        `/events/${eventId}`
      );
      dispatch({
        type: FetchEventsActionType.FETCH_EVENT_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FetchEventsActionType.FETCH_EVENT_DETAIL_ERROR,
        payload: axiosErrorHandler(error as AxiosError),
      });
    }
  };
