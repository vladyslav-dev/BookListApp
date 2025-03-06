export const formatDate = (isoDateString: string) => {
    try {
        const date = new Date(isoDateString);

        if (isNaN(date.getTime())) {
            return null;
        }

        const day = date.getUTCDate(); // Get day of the month
        const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }); // Full month name
        const year = date.getUTCFullYear(); // Full year
        const hours = date.getUTCHours() % 12 || 12; // Convert to 12-hour format, handling midnight (0 → 12)
        const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Ensure 2-digit minutes
        const ampm = date.getUTCHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

        return `${day} ${month} ${year}, ${hours}:${minutes}${ampm}`;
    } catch (error) {
        console.error('Error while formatting date:', error);
        return null;
    }
};