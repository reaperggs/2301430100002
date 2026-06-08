const WEIGHTS: Record<string, number> = {
    Placement: 3,
    Result: 2,
    Event: 1,
};

export function getPriorityNotifications(
    notifications: any[],
    limit: number
) {
    return [...notifications]
        .sort((a, b) => {
            const weightB = WEIGHTS[b.Type] || 0;
            const weightA = WEIGHTS[a.Type] || 0;
            const weightDiff = weightB - weightA;

            if (weightDiff !== 0)
                return weightDiff;

            return (
                new Date(b.Timestamp).getTime() -
                new Date(a.Timestamp).getTime()
            );
        })
        .slice(0, limit);
}