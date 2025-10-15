# Performance Optimization Guide

This guide covers performance optimization techniques for React Native applications.

## Table of Contents
1. [Performance Metrics](#performance-metrics)
2. [Memory Management](#memory-management)
3. [Rendering Optimization](#rendering-optimization)
4. [Network Performance](#network-performance)

## Performance Metrics

### Key Performance Indicators (KPIs)
```javascript
// Using Performance API
import { PerformanceObserver, performance } from 'react-native';

const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});

observer.observe({ entryTypes: ['measure'] });

// Measure function execution time
performance.mark('functionStart');
// ... your function code
performance.mark('functionEnd');
performance.measure('functionDuration', 'functionStart', 'functionEnd');
```

### Load Time Benchmarks
- Launch Time: < 2 seconds
- Screen Transition: < 300ms
- API Response: < 1 second
- Image Loading: < 500ms

## Memory Management

### Component Lifecycle Management
```javascript
import React, { useEffect, useState } from 'react';

const MemoryEfficientComponent = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      const result = await api.getData();
      if (mounted) {
        setData(result);
      }
    };
    
    fetchData();
    
    return () => {
      mounted = false;
      // Clean up any subscriptions/listeners
    };
  }, []);
  
  return (/* component JSX */);
};
```

### Image Optimization
```javascript
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

// Use FastImage for better performance
const OptimizedImage = () => (
  <FastImage
    style={{ width: 200, height: 200 }}
    source={{
      uri: 'https://example.com/image.jpg',
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
);

// Preload important images
FastImage.preload([
  {
    uri: 'https://example.com/image.jpg',
  }
]);
```

## Rendering Optimization

### List Optimization
```javascript
import { FlatList } from 'react-native';

const OptimizedList = () => {
  const renderItem = useCallback(({ item }) => (
    <ListItem item={item} />
  ), []);

  const keyExtractor = useCallback((item) => 
    item.id.toString(), []
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );
};
```

### Memoization
```javascript
import React, { memo, useMemo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => /* expensive computation */);
  }, [data]);

  return (/* render component */);
});

// Usage
const Parent = () => (
  <ExpensiveComponent 
    data={data}
  />
);
```

## Network Performance

### API Caching
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

class APICache {
  static async get(key, ttl = 300000) { // 5 minutes TTL
    try {
      const stored = await AsyncStorage.getItem(key);
      if (!stored) return null;

      const { value, timestamp } = JSON.parse(stored);
      const age = Date.now() - timestamp;

      if (age > ttl) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return value;
    } catch (error) {
      return null;
    }
  }

  static async set(key, value) {
    try {
      const data = {
        value,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }
}
```

### Image Prefetching
```javascript
import { Image } from 'react-native';

const prefetchImages = (urls) => {
  return Promise.all(
    urls.map(url => Image.prefetch(url))
  );
};

// Usage
componentDidMount() {
  prefetchImages([
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
  ]);
}
```

## Performance Monitoring

### React Native Performance Monitor
```javascript
import Performance from 'react-native-performance';

Performance.start();

// Track render time
Performance.markStart('renderComponent');
// Component renders
Performance.markEnd('renderComponent');

// Get metrics
const metrics = Performance.getMetrics();
console.log(metrics);
```

### Custom Performance Hooks
```javascript
const usePerformanceTracking = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Log or send to analytics
      console.log(`${componentName} mounted for ${duration}ms`);
    };
  }, [componentName]);
};

// Usage
const MyComponent = () => {
  usePerformanceTracking('MyComponent');
  return (/* component JSX */);
};
```

## Best Practices Checklist

### Development Phase
- [ ] Use production builds for performance testing
- [ ] Implement code splitting
- [ ] Optimize images and assets
- [ ] Use appropriate component architecture
- [ ] Implement proper error boundaries

### Testing Phase
- [ ] Benchmark critical user paths
- [ ] Test on low-end devices
- [ ] Monitor memory usage
- [ ] Profile render performance
- [ ] Test network performance

### Production Phase
- [ ] Enable Hermes engine
- [ ] Configure ProGuard rules
- [ ] Implement crash reporting
- [ ] Set up performance monitoring
- [ ] Configure error tracking