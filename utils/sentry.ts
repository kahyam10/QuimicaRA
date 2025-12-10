/**
 * Sistema de Error Tracking
 *
 * Este arquivo pode ser integrado com:
 * - Sentry (npm install sentry-expo)
 * - Firebase Crashlytics (npm install @react-native-firebase/crashlytics)
 * - Backend customizado
 *
 * Por enquanto, implementa um sistema local de logging
 */

interface ErrorLog {
  timestamp: string;
  error: string;
  stack?: string;
  context?: Record<string, any>;
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
}

class ErrorTracker {
  private logs: ErrorLog[] = [];
  private maxLogs = 100;
  private isEnabled = true;

  init(config?: { enabled?: boolean; dsn?: string }) {
    this.isEnabled = config?.enabled !== false;

    if (__DEV__) {
      console.log('ErrorTracker initialized', { enabled: this.isEnabled });
    }

    // TODO: Integrar com Sentry quando instalado
    // if (config?.dsn) {
    //   import('sentry-expo').then(Sentry => {
    //     Sentry.init({ dsn: config.dsn, ... });
    //   });
    // }
  }

  captureException(
    error: Error | string,
    context?: Record<string, any>,
    level: 'fatal' | 'error' = 'error'
  ) {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      error: typeof error === 'string' ? error : error.message,
      stack: error instanceof Error ? error.stack : undefined,
      context,
      level,
    };

    if (!this.isEnabled) {
      console.warn('Error tracking disabled:', errorLog);
      return;
    }

    this.logs.push(errorLog);

    // Manter apenas os últimos N logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log em desenvolvimento
    if (__DEV__) {
      console.error(`[${level.toUpperCase()}]`, errorLog);
    }

    // TODO: Enviar para backend/Sentry
    // this.sendToBackend(errorLog);
  }

  captureMessage(
    message: string,
    level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'error'
  ) {
    if (!this.isEnabled) return;

    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      error: message,
      level,
    };

    this.logs.push(errorLog);

    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    if (__DEV__) {
      console.log(`[${level.toUpperCase()}]`, message);
    }
  }

  setUser(userId: string, userInfo?: Record<string, any>) {
    // TODO: Implementar rastreamento de usuário com Sentry
    if (__DEV__) {
      console.log('Set user:', { userId, ...userInfo });
    }
  }

  clearUser() {
    // TODO: Limpar contexto do usuário
    if (__DEV__) {
      console.log('User cleared');
    }
  }

  addBreadcrumb(message: string, category = 'user-action') {
    // TODO: Implementar breadcrumbs com Sentry
    if (__DEV__) {
      console.log(`[BREADCRUMB - ${category}]`, message);
    }
  }

  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }

  private async sendToBackend(errorLog: ErrorLog) {
    try {
      // TODO: Implementar envio para backend customizado
      // await fetch('https://your-api.com/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorLog),
      // });
    } catch (error) {
      console.warn('Failed to send error to backend:', error);
    }
  }
}

// Singleton instance
export const errorTracker = new ErrorTracker();

// Convenience functions
export function initErrorTracking(config?: {
  enabled?: boolean;
  dsn?: string;
}) {
  errorTracker.init(config);
}

export function captureException(
  error: Error | string,
  context?: Record<string, any>
) {
  errorTracker.captureException(error, context);
}

export function captureMessage(
  message: string,
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'error'
) {
  errorTracker.captureMessage(message, level);
}

export function setUser(userId: string, userInfo?: Record<string, any>) {
  errorTracker.setUser(userId, userInfo);
}

export function clearUser() {
  errorTracker.clearUser();
}

export function addBreadcrumb(message: string, category = 'user-action') {
  errorTracker.addBreadcrumb(message, category);
}

export function getLogs(): ErrorLog[] {
  return errorTracker.getLogs();
}

export function clearLogs() {
  errorTracker.clearLogs();
}
