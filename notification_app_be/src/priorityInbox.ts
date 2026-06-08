import { Notification } from "./types";

const WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function getTopNotifications(
  notifications: Notification[],
  limit: number = 10
) {
  const now = Date.now();

  return notifications
    .map((notification) => {
      const ageInMinutes =
        (now - new Date(notification.Timestamp).getTime()) /
        (1000 * 60);

      const recencyScore =
        Math.max(0, 10000 - ageInMinutes);

      const priority =
        WEIGHTS[notification.Type] +
        recencyScore;

      return {
        ...notification,
        priority,
      };
    })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);
}