/**
 * Logger Utility
 *
 * Centralized logging utility that:
 * - Only logs in development mode
 * - Provides different log levels
 * - Can be easily replaced with a proper logging service (Sentry, LogRocket, etc.)
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogMetadata {
  [key: string]: any;
}

class Logger {
  private isDevelopment: boolean;
  private isEnabled: boolean;

  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.isEnabled = import.meta.env.VITE_ENABLE_LOGGING !== "false";
  }

  /**
   * Format log message with timestamp and context
   */
  private formatMessage(level: LogLevel, message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : "";
    return `[${timestamp}] [${level.toUpperCase()}]${contextStr} ${message}`;
  }

  /**
   * Log info message
   */
  info(message: string, metadata?: LogMetadata, context?: string): void {
    if (!this.isDevelopment || !this.isEnabled) return;

    const formattedMessage = this.formatMessage("info", message, context);
    if (metadata) {
      console.log(formattedMessage, metadata);
    } else {
      console.log(formattedMessage);
    }
  }

  /**
   * Log warning message
   */
  warn(message: string, metadata?: LogMetadata, context?: string): void {
    if (!this.isDevelopment || !this.isEnabled) return;

    const formattedMessage = this.formatMessage("warn", message, context);
    if (metadata) {
      console.warn(formattedMessage, metadata);
    } else {
      console.warn(formattedMessage);
    }
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error | LogMetadata, context?: string): void {
    if (!this.isDevelopment || !this.isEnabled) return;

    const formattedMessage = this.formatMessage("error", message, context);
    if (error instanceof Error) {
      console.error(formattedMessage, {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    } else if (error) {
      console.error(formattedMessage, error);
    } else {
      console.error(formattedMessage);
    }
  }

  /**
   * Log debug message
   */
  debug(message: string, metadata?: LogMetadata, context?: string): void {
    if (!this.isDevelopment || !this.isEnabled) return;

    const formattedMessage = this.formatMessage("debug", message, context);
    if (metadata) {
      console.debug(formattedMessage, metadata);
    } else {
      console.debug(formattedMessage);
    }
  }

  /**
   * Group logs together
   */
  group(label: string, callback: () => void): void {
    if (!this.isDevelopment || !this.isEnabled) {
      callback();
      return;
    }

    console.group(label);
    callback();
    console.groupEnd();
  }

  /**
   * Log API request
   */
  apiRequest(method: string, url: string, data?: any): void {
    this.debug(`API Request: ${method} ${url}`, data, "API");
  }

  /**
   * Log API response
   */
  apiResponse(method: string, url: string, status: number, data?: any): void {
    this.debug(`API Response: ${method} ${url} - ${status}`, data, "API");
  }

  /**
   * Log API error
   */
  apiError(method: string, url: string, error: any): void {
    this.error(`API Error: ${method} ${url}`, error, "API");
  }
}

// Export singleton instance
export const logger = new Logger();

// Export named functions for convenience
export const logInfo = logger.info.bind(logger);
export const logWarn = logger.warn.bind(logger);
export const logError = logger.error.bind(logger);
export const logDebug = logger.debug.bind(logger);
export const logGroup = logger.group.bind(logger);

export default logger;
