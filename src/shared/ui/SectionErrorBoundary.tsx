import React, { Component, ErrorInfo, ReactNode } from 'react';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

/**
 * Lightweight ErrorBoundary that prevents any section or lazy chunk error
 * on unstable mobile connections from unmounting the entire React tree.
 */
export class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Render boundary caught error:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto my-8 px-4">
          <div className="rounded-2xl bg-[#0e0e13] border border-white/10 p-6 text-center space-y-3">
            <p className="text-sm text-slate-300 font-medium">
              {this.props.fallbackTitle || 'تعذر تحميل هذا القسم مؤقتاً بسبب انقطاع الاتصال.'}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleRetry}
                className="px-4 py-2 rounded-xl bg-theme-primary text-white text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
              >
                إعادة المحاولة / Retry
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:text-white transition-all cursor-pointer"
              >
                تحديث الصفحة / Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;
