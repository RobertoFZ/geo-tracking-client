import { notification, message } from 'antd';
import Breakpoints from './breakpoints';

message.config({ maxCount: 1 });

export enum NoticeType {
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type NotificationProps = {
  message: string;
  duration: number;
  description?: string;
}

export default function showMessage(title: string, text: string, type: NoticeType = NoticeType.SUCCESS, duration: number = 3) {
  if (window.innerWidth <= Breakpoints.tablet) {
    message[type]({
      duration: duration,
      content: text,
      style: {
        marginTop: '6vh',
      },
    });
  } else {
    let notificationData: NotificationProps = {
      message: title,
      duration: duration,
    }
    if (text) {
      notificationData.description = text;
    }
    notification[type](notificationData);
  }
}