export function formatTime(timestamp?: number) {
    if (!timestamp) return;
    const date = new Date(timestamp);
    const hours = String(date.getHours());
    const minutes = String(date.getMinutes());

    return `${hours}:${minutes}`;
}
