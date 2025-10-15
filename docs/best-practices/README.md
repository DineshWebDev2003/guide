# Best Practices Guide

This guide outlines best practices for full-stack React Native development.

## Table of Contents
1. [Code Organization](#code-organization)
2. [Error Handling](#error-handling)
3. [State Management](#state-management)
4. [Testing Strategies](#testing-strategies)
5. [Security Guidelines](#security-guidelines)

## Code Organization

### Project Structure
```
src/
├── assets/         # Images, fonts, etc.
├── components/     # Reusable components
│   ├── common/    # Shared components
│   ├── forms/     # Form-related components
│   └── layout/    # Layout components
├── config/        # Configuration files
├── hooks/         # Custom hooks
├── navigation/    # Navigation configuration
├── screens/       # Screen components
├── services/      # API services
├── store/         # State management
├── types/         # TypeScript definitions
└── utils/         # Utility functions
```

### Component Organization
```typescript
// components/Button/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ButtonProps } from './Button.types';
import { styles } from './Button.styles';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
}) => (
  <TouchableOpacity
    style={[styles.button, styles[variant]]}
    onPress={onPress}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

// components/Button/Button.types.ts
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

// components/Button/Button.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#5856D6',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

// components/Button/index.ts
export * from './Button';
export * from './Button.types';
```

## Error Handling

### Global Error Boundary
```typescript
import React, { Component, ErrorInfo } from 'react';
import { View, Text } from 'react-native';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error reporting service
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.state.error?.message}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### API Error Handling
```typescript
// services/api.ts
import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

## State Management

### Redux Setup
```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import rootReducer from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
```

## Testing Strategies

### Component Testing
```typescript
// components/__tests__/Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Button title="Press me" onPress={() => {}} />
    );
    expect(getByText('Press me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Press me" onPress={onPress} />
    );
    
    fireEvent.press(getByText('Press me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing
```typescript
// screens/__tests__/Login.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store';
import LoginScreen from '../LoginScreen';

describe('LoginScreen', () => {
  it('handles login flow correctly', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );

    fireEvent.changeText(
      getByPlaceholderText('Email'),
      'test@example.com'
    );
    fireEvent.changeText(
      getByPlaceholderText('Password'),
      'password123'
    );
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(store.getState().auth.user).toBeTruthy();
    });
  });
});
```

## Security Guidelines

### Secure Storage
```typescript
import EncryptedStorage from 'react-native-encrypted-storage';

export class SecureStorage {
  static async setItem(key: string, value: any): Promise<void> {
    try {
      await EncryptedStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  static async getItem(key: string): Promise<any> {
    try {
      const data = await EncryptedStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  }
}
```

### API Security
```typescript
// services/apiClient.ts
import axios from 'axios';
import { SecureStorage } from '../utils/secureStorage';

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
```

## Performance Optimization

### Memo and Callback Usage
```typescript
import React, { memo, useCallback, useMemo } from 'react';

interface ListItemProps {
  item: Item;
  onPress: (id: string) => void;
}

const ListItem = memo(({ item, onPress }: ListItemProps) => {
  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [item.id, onPress]);

  const itemStyle = useMemo(() => ({
    backgroundColor: item.isSelected ? '#E3F2FD' : '#FFFFFF',
  }), [item.isSelected]);

  return (
    <TouchableOpacity 
      style={itemStyle}
      onPress={handlePress}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
});

export default ListItem;
```

## Accessibility

### Accessible Components
```typescript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface AccessibleButtonProps {
  label: string;
  onPress: () => void;
  hint?: string;
}

const AccessibleButton = ({
  label,
  onPress,
  hint,
}: AccessibleButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    accessible={true}
    accessibilityLabel={label}
    accessibilityHint={hint}
    accessibilityRole="button"
  >
    <Text>{label}</Text>
  </TouchableOpacity>
);

export default AccessibleButton;
```

## Development Workflow

### Git Workflow
```bash
# Feature branch workflow
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# After code review
git checkout main
git pull origin main
git merge feature/new-feature
git push origin main
```

### Code Review Checklist
- [ ] Code follows style guide
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] Performance impact is considered
- [ ] Security implications are reviewed
- [ ] Accessibility guidelines are followed
- [ ] Error handling is implemented
- [ ] Dependencies are properly managed