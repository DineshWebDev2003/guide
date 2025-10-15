# Frontend Development Guide

This comprehensive guide covers frontend development using HTML, CSS, JavaScript, React.js, React Native, and Tailwind CSS.

## Table of Contents
1. [HTML & CSS Fundamentals](#html--css-fundamentals)
2. [JavaScript Essentials](#javascript-essentials)
3. [React.js Core Concepts](#reactjs-core-concepts)
4. [React Native Fundamentals](#react-native-fundamentals)
5. [Tailwind CSS Integration](#tailwind-css-integration)

## HTML & CSS Fundamentals

### Semantic HTML Structure
```html
<header>
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
</header>
<main>
  <section id="home">
    <h1>Welcome</h1>
    <article>Content here</article>
  </section>
</main>
<footer>
  <p>&copy; 2025 Your App</p>
</footer>
```

### CSS Best Practices
```css
/* Use CSS variables for consistency */
:root {
  --primary-color: #007AFF;
  --secondary-color: #5856D6;
  --font-main: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
}

/* Mobile-first responsive design */
.container {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}
```

## JavaScript Essentials

### Modern JavaScript Features

```javascript
// Destructuring
const { name, age } = user;

// Spread operator
const newArray = [...oldArray, newItem];

// Arrow functions
const handleClick = () => {
  console.log('Clicked!');
};

// Async/Await
const fetchData = async () => {
  try {
    const response = await fetch('api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Optional chaining
const userName = user?.profile?.name;
```

## React.js Core Concepts

### Functional Components
```jsx
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default UserProfile;
```

### Custom Hooks
```javascript
const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    // Add validation logic
    return Object.keys(errors).length === 0;
  };

  return { values, errors, handleChange, validate };
};
```

## React Native Fundamentals

### Basic Components
```jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity 
    style={styles.button}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### Navigation Setup
```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Welcome',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
```

## Tailwind CSS Integration

### Setup with React Native
```bash
npm install tailwind-react-native-classnames
```

### Usage Example
```jsx
import tw from 'tailwind-react-native-classnames';

const Card = ({ title, description }) => (
  <View style={tw`p-4 bg-white rounded-lg shadow-md`}>
    <Text style={tw`text-xl font-bold mb-2`}>{title}</Text>
    <Text style={tw`text-gray-600`}>{description}</Text>
  </View>
);
```

### Custom Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
};
```

## Performance Optimization Tips

1. Use `React.memo()` for pure components
2. Implement virtualized lists with `FlatList`
3. Optimize images with proper sizing and caching
4. Use proper key props in lists
5. Minimize bridge traffic between JS and native code

## Debugging Tools

1. React Native Debugger
2. Chrome Developer Tools
3. React Developer Tools
4. Performance Monitor

## Best Practices

1. Component organization
2. State management patterns
3. Error boundaries
4. Accessibility considerations
5. Testing strategies