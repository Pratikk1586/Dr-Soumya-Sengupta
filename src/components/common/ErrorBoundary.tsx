import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';
import { Container } from './Container';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isChunkLoadError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
    isChunkLoadError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    const message = error?.message?.toLowerCase() || '';
    const isChunkLoad =
      message.includes('dynamically imported module') ||
      message.includes('loading chunk') ||
      message.includes('failed to fetch') ||
      message.includes('network error');

    return {
      hasError: true,
      error,
      isChunkLoadError: isChunkLoad,
    };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Uncaught error in component tree:', error, errorInfo);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null, isChunkLoadError: false });
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { isChunkLoadError, error } = this.state;

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-[70vh] flex items-center justify-center bg-[#faf9f6] py-16 px-4"
        >
          <Container size="sm" className="text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto shadow-sm">
              <AlertTriangle className="w-8 h-8" aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06181f]">
                {isChunkLoadError
                  ? 'Update or Network Interruption'
                  : 'Unable to Display Clinical View'}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                {isChunkLoadError
                  ? 'A new version of the website was published, or your internet connection experienced a temporary interruption. Reloading will fetch the latest assets.'
                  : 'An unexpected application error occurred while preparing this section. Our patient services team has been notified.'}
              </p>
            </div>

            {import.meta.env.DEV && error && (
              <div className="text-left bg-slate-900 text-slate-100 p-4 rounded-lg text-xs font-mono overflow-auto max-h-40 border border-slate-700">
                <p className="font-semibold text-rose-400">{error.name}: {error.message}</p>
                {error.stack && <pre className="mt-2 text-slate-400 whitespace-pre-wrap">{error.stack}</pre>}
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={this.handleReload}
                className="gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                <span>Reload Page</span>
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  this.handleReset();
                  window.location.href = '/';
                }}
                className="gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>Return to Practice Home</span>
              </Button>
            </div>

            <p className="text-xs text-slate-500">
              For urgent consultations, contact the clinic desk directly.
            </p>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}
