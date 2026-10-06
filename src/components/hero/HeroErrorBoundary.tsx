import { Component, type ReactNode, type ErrorInfo } from 'react';
import { HeroStaticVisual } from './HeroStaticVisual';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class HeroErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.warn('Hero 3D Canvas error intercepted by HeroErrorBoundary:', error, errorInfo);
    }
  }

  public override render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <HeroStaticVisual isFallback={true} />;
    }

    return this.props.children;
  }
}
