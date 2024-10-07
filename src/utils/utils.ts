// utils.ts


// Boiler plate, place holder code for reusable functions. 

/**
 * Utility function to format large numbers (like costs or metrics) into readable strings
 * with appropriate suffixes (K for thousand, M for million, B for billion).
 * @param num - The number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1) + 'B'; // Format as billions
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + 'M'; // Format as millions
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + 'K'; // Format as thousands
    } else {
        return num.toString(); // Return as is for numbers less than 1000
    }
}

/**
 * Utility function to capitalize the first letter of a string.
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Utility function to format a date object into a readable string.
 * @param date - The Date object to format
 * @returns Formatted date string (e.g., "January 1, 2024")
 */
export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

/**
 * Utility function to handle API errors by logging them to the console.
 * You can customize this to handle different error scenarios and add better logging.
 * @param error - The error object received from an API call
 */
export function handleApiError(error: any): void {
    console.error("API Error: ", error);
    // Add additional error handling/logging here if needed
}

