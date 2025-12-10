import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AlertCircle, RotateCw } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorCount: number;
}

/**
 * Error Boundary Component
 * 
 * Captura erros em componentes filhos e exibe uma UI de fallback
 * em vez de deixar a aplicação quebrada.
 * 
 * @example
 * <ErrorBoundary onError={(error) => console.error(error)}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log erro para serviço de tracking (ex: Sentry)
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error Info:', errorInfo);

    // Chamar callback customizado se fornecido
    this.props.onError?.(error, errorInfo);

    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Enviar para serviço de error tracking em produção
    if (!__DEV__) {
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   body: JSON.stringify({ error: error.toString(), errorInfo }),
      // });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Usar fallback customizado se fornecido
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDevelopment = __DEV__;

      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.iconContainer}>
              <AlertCircle color={Colors.primary} size={48} />
            </View>

            <Text style={styles.title}>Oops! Algo deu errado</Text>

            <Text style={styles.message}>
              Desculpe, encontramos um erro inesperado. Tente recarregar a aplicação.
            </Text>

            {isDevelopment && this.state.error && (
              <>
                <View style={styles.errorContainer}>
                  <Text style={styles.errorTitle}>Detalhes do Erro (Dev):</Text>
                  <Text style={styles.errorText}>{this.state.error.toString()}</Text>

                  {this.state.errorInfo?.componentStack && (
                    <>
                      <Text style={[styles.errorTitle, { marginTop: 16 }]}>Stack:</Text>
                      <Text style={styles.stackText}>
                        {this.state.errorInfo.componentStack}
                      </Text>
                    </>
                  )}
                </View>

                {this.state.errorCount > 2 && (
                  <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>
                      ⚠️ Este erro ocorreu {this.state.errorCount} vezes. Pode haver um problema persistente.
                    </Text>
                  </View>
                )}
              </>
            )}
          </ScrollView>

          <TouchableOpacity
            style={styles.button}
            onPress={this.handleReset}
            activeOpacity={0.7}
          >
            <RotateCw color={Colors.white} size={20} />
            <Text style={styles.buttonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Inter-Bold',
  },
  message: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 32,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  errorContainer: {
    backgroundColor: Colors.darkBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    width: '100%',
  },
  errorTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  errorText: {
    fontSize: 12,
    color: Colors.text,
    fontFamily: 'Space-Mono',
    opacity: 0.8,
  },
  stackText: {
    fontSize: 10,
    color: Colors.text,
    fontFamily: 'Space-Mono',
    opacity: 0.6,
    lineHeight: 16,
  },
  warningContainer: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    width: '100%',
  },
  warningText: {
    fontSize: 13,
    color: '#ffc107',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    marginBottom: 32,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'Inter-Bold',
  },
});
