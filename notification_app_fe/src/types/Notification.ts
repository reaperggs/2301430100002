export interface Notification {
    ID: string;
    Type: "Event" | "Result" | "Placement";
    Message: string;
    Timestamp: string;
}